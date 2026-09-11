import { appendFile, mkdir } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { NextRequest, NextResponse } from "next/server";
import {
  MAX_REQUEST_BYTES,
  createRateLimiter,
  escapeTelegramHtml,
  formatMoscowTimestamp,
  getSpamReason,
  normalizeLeadPayload,
  postJsonToIntegration,
  sanitizeSpreadsheetCell,
  validateLead,
} from "./lead-utils.mjs";

export const runtime = "nodejs";

const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1_000;
const checkRateLimit = createRateLimiter({
  limit: RATE_LIMIT_MAX,
  windowMs: RATE_LIMIT_WINDOW_MS,
});

type LogFields = Record<string, string | number | boolean | null | undefined>;

type TelegramResult = {
  configured: boolean;
  sent: number;
  failed: number;
  errors: string[];
};

function logEvent(level: "info" | "warn" | "error", event: string, fields: LogFields = {}) {
  const line = JSON.stringify({
    timestamp: new Date().toISOString(),
    level,
    event,
    ...fields,
  });

  if (level === "error") console.error(line);
  else if (level === "warn") console.warn(line);
  else console.info(line);
}

function errorMessage(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

function getClientKey(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() ?? "";
  return req.headers.get("x-real-ip")?.trim() ?? "";
}

function getFallbackFilePath(): string {
  if (process.env.FAILED_LEADS_FILE) return process.env.FAILED_LEADS_FILE;

  if (process.env.NODE_ENV === "production") {
    return join(tmpdir(), "hao-failed-leads.ndjson");
  }

  return join(process.cwd(), ".data", "failed-leads.ndjson");
}

async function persistFailedLeadLocally(
  leadId: string,
  lead: { name: string; phone: string; email: string },
  reason: string,
): Promise<string> {
  const filePath = getFallbackFilePath();
  await mkdir(dirname(filePath), { recursive: true, mode: 0o700 });

  const record = JSON.stringify({
    leadId,
    failedAt: new Date().toISOString(),
    reason,
    name: lead.name,
    phone: lead.phone,
    email: lead.email,
  });

  await appendFile(filePath, `${record}\n`, {
    encoding: "utf8",
    mode: 0o600,
  });

  return filePath;
}

function getTelegramChatIds(): string[] {
  const raw = process.env.TELEGRAM_CHAT_IDS ?? process.env.TELEGRAM_CHAT_ID ?? "";
  return raw
    .split(",")
    .map((id) => id.trim())
    .filter(Boolean);
}

async function sendTelegram(text: string): Promise<TelegramResult> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatIds = getTelegramChatIds();

  if (!token || chatIds.length === 0) {
    return { configured: false, sent: 0, failed: 0, errors: [] };
  }

  const telegramUrl = new URL(
    `/bot${encodeURIComponent(token)}/sendMessage`,
    "https://api.telegram.org",
  );

  let sent = 0;
  let failed = 0;
  const errors: string[] = [];

  for (const chatId of chatIds) {
    try {
      await postJsonToIntegration(telegramUrl, {
        chat_id: chatId,
        text,
        parse_mode: "HTML",
      });
      sent += 1;
    } catch (error) {
      failed += 1;
      errors.push(errorMessage(error));
    }
  }

  return { configured: true, sent, failed, errors };
}

async function persistToGoogleSheets(payload: Record<string, string>): Promise<void> {
  const rawUrl = process.env.GOOGLE_SCRIPT_URL;
  if (!rawUrl) throw new Error("GOOGLE_SCRIPT_URL is not configured");

  await postJsonToIntegration(new URL(rawUrl), payload);
}

export async function POST(req: NextRequest) {
  const leadId = crypto.randomUUID();
  const startedAt = Date.now();

  const contentType = req.headers.get("content-type") ?? "";
  if (!contentType.toLowerCase().startsWith("application/json")) {
    logEvent("warn", "lead.rejected", { leadId, reason: "unsupported_content_type" });
    return NextResponse.json({ error: "Ожидается JSON" }, { status: 415 });
  }

  const declaredContentLength = Number(req.headers.get("content-length") ?? 0);
  if (Number.isFinite(declaredContentLength) && declaredContentLength > MAX_REQUEST_BYTES) {
    logEvent("warn", "lead.rejected", {
      leadId,
      reason: "body_too_large",
      contentLength: declaredContentLength,
    });
    return NextResponse.json({ error: "Слишком большой запрос" }, { status: 413 });
  }

  let rawBody: string;
  try {
    rawBody = await req.text();
  } catch {
    logEvent("warn", "lead.rejected", { leadId, reason: "body_read_failed" });
    return NextResponse.json({ error: "Некорректный запрос" }, { status: 400 });
  }

  if (Buffer.byteLength(rawBody, "utf8") > MAX_REQUEST_BYTES) {
    logEvent("warn", "lead.rejected", { leadId, reason: "body_too_large" });
    return NextResponse.json({ error: "Слишком большой запрос" }, { status: 413 });
  }

  let body: unknown;
  try {
    body = JSON.parse(rawBody);
  } catch {
    logEvent("warn", "lead.rejected", { leadId, reason: "invalid_json" });
    return NextResponse.json({ error: "Некорректный запрос" }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    logEvent("warn", "lead.rejected", { leadId, reason: "invalid_body" });
    return NextResponse.json({ error: "Некорректный запрос" }, { status: 400 });
  }

  const lead = normalizeLeadPayload(body);
  const spamReason = getSpamReason(lead);

  // Honeypot gets a normal response so simple bots do not learn that they were detected.
  if (spamReason === "honeypot") {
    logEvent("info", "lead.blocked", { leadId, reason: spamReason });
    return NextResponse.json({ ok: true });
  }

  if (spamReason === "too_fast") {
    logEvent("warn", "lead.blocked", { leadId, reason: spamReason });
    return NextResponse.json(
      { error: "Форма отправлена слишком быстро. Повторите через пару секунд." },
      { status: 429, headers: { "Retry-After": "2" } },
    );
  }

  const validationError = validateLead(lead);
  if (validationError) {
    logEvent("warn", "lead.rejected", { leadId, reason: "validation" });
    return NextResponse.json({ error: validationError }, { status: 400 });
  }

  // Count only valid submissions so normal typo correction cannot lock out a real user.
  const clientKey = getClientKey(req);
  const rateLimit = checkRateLimit(clientKey);
  if (!rateLimit.allowed) {
    logEvent("warn", "lead.blocked", { leadId, reason: "rate_limit" });
    return NextResponse.json(
      { error: "Слишком много попыток. Попробуйте немного позже." },
      {
        status: 429,
        headers: { "Retry-After": String(rateLimit.retryAfterSeconds) },
      },
    );
  }

  const date = formatMoscowTimestamp();
  logEvent("info", "lead.accepted", { leadId });

  const sheetsStartedAt = Date.now();
  try {
    await persistToGoogleSheets({
      date,
      name: sanitizeSpreadsheetCell(lead.name),
      // Keep the production Sheets phone representation unchanged while preventing formula parsing.
      phone: ` ${lead.phone}`,
      email: sanitizeSpreadsheetCell(lead.email),
    });
    logEvent("info", "lead.sheets_saved", {
      leadId,
      durationMs: Date.now() - sheetsStartedAt,
    });
  } catch (error) {
    const reason = errorMessage(error);
    let fallbackSaved = false;

    try {
      const fallbackPath = await persistFailedLeadLocally(leadId, lead, reason);
      fallbackSaved = true;
      logEvent("warn", "lead.fallback_saved", { leadId, fallbackPath });
    } catch (fallbackError) {
      logEvent("error", "lead.fallback_failed", {
        leadId,
        error: errorMessage(fallbackError),
      });
    }

    logEvent("error", "lead.sheets_failed", {
      leadId,
      error: reason,
      fallbackSaved,
      durationMs: Date.now() - sheetsStartedAt,
    });

    return NextResponse.json(
      {
        error: "Не удалось надёжно сохранить заявку. Попробуйте ещё раз или свяжитесь с нами напрямую.",
        leadId,
      },
      { status: 503 },
    );
  }

  const tgText = [
    "🆕 Новая заявка с лендинга",
    `🆔 ID: ${leadId}`,
    `👤 Имя: ${escapeTelegramHtml(lead.name)}`,
    `📞 Телефон: ${escapeTelegramHtml(lead.phone)}`,
    `📧 Email: ${lead.email ? escapeTelegramHtml(lead.email) : "—"}`,
    `🕐 ${date}`,
  ].join("\n");

  const telegramStartedAt = Date.now();
  const telegram = await sendTelegram(tgText);

  if (!telegram.configured) {
    logEvent("warn", "lead.telegram_skipped", { leadId, reason: "not_configured" });
  } else if (telegram.failed > 0) {
    logEvent("warn", "lead.telegram_partial", {
      leadId,
      sent: telegram.sent,
      failed: telegram.failed,
      error: telegram.errors.join("; ").slice(0, 500),
      durationMs: Date.now() - telegramStartedAt,
    });
  } else {
    logEvent("info", "lead.telegram_sent", {
      leadId,
      sent: telegram.sent,
      durationMs: Date.now() - telegramStartedAt,
    });
  }

  logEvent("info", "lead.completed", {
    leadId,
    durationMs: Date.now() - startedAt,
  });

  return NextResponse.json({ ok: true, leadId });
}
