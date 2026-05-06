import { NextRequest, NextResponse } from "next/server";

const MAX_NAME_LENGTH = 80;
const MAX_PHONE_LENGTH = 40;
const MAX_EMAIL_LENGTH = 120;
const INTEGRATION_TIMEOUT_MS = 8_000;

function asString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function limitLength(value: string, maxLength: number): string {
  return value.slice(0, maxLength);
}

function escapeTelegramHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function fetchWithTimeout(url: string, init: RequestInit): Promise<Response> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), INTEGRATION_TIMEOUT_MS);

  return fetch(url, { ...init, signal: controller.signal }).finally(() => {
    clearTimeout(timeout);
  });
}

// Поддерживает несколько chat_id через запятую: TELEGRAM_CHAT_IDS=111,222,333
function getTelegramChatIds(): string[] {
  const raw = process.env.TELEGRAM_CHAT_IDS ?? process.env.TELEGRAM_CHAT_ID ?? "";
  return raw
    .split(",")
    .map((id) => id.trim())
    .filter(Boolean);
}

async function sendTelegram(text: string): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatIds = getTelegramChatIds();

  if (!token || chatIds.length === 0) return;

  await Promise.allSettled(
    chatIds.map((chatId) =>
      fetchWithTimeout(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: chatId, text, parse_mode: "HTML" }),
      })
    )
  );
}

async function sendGoogleSheets(payload: Record<string, string>): Promise<void> {
  const url = process.env.GOOGLE_SCRIPT_URL;
  if (!url) return;
  await fetchWithTimeout(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

export async function POST(req: NextRequest) {
  let body: unknown;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Некорректный запрос" }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Некорректный запрос" }, { status: 400 });
  }

  const data = body as Record<string, unknown>;
  const name = limitLength(asString(data.name), MAX_NAME_LENGTH);
  const phone = limitLength(asString(data.phone), MAX_PHONE_LENGTH);
  const email = limitLength(asString(data.email), MAX_EMAIL_LENGTH);

  if (!name || name.trim().length < 2) {
    return NextResponse.json({ error: "Введите имя" }, { status: 400 });
  }
  if (!phone || phone.replace(/\D/g, "").length < 10) {
    return NextResponse.json({ error: "Введите корректный номер телефона" }, { status: 400 });
  }

  // Время МСК (UTC+3) — считаем вручную, чтобы не зависеть от таймзоны сервера
  const now = new Date();
  const msk = new Date(now.getTime() + 3 * 60 * 60 * 1000);
  const p = (n: number) => String(n).padStart(2, "0");
  const date = `${p(msk.getUTCDate())}.${p(msk.getUTCMonth() + 1)}.${msk.getUTCFullYear()} ${p(msk.getUTCHours())}:${p(msk.getUTCMinutes())} МСК`;

  const tgText = [
    "🆕 Новая заявка с лендинга",
    `👤 Имя: ${escapeTelegramHtml(name)}`,
    `📞 Телефон: ${escapeTelegramHtml(phone)}`,
    `📧 Email: ${email ? escapeTelegramHtml(email) : "—"}`,
    `🕐 ${date}`,
  ].join("\n");

  await Promise.allSettled([
    sendTelegram(tgText),
    // Пробел перед телефоном — защита от #ERROR! в Google Sheets:
    // ячейки, начинающиеся с «+», интерпретируются как формула
    sendGoogleSheets({ date, name, phone: " " + phone, email: email || "" }),
  ]);

  return NextResponse.json({ ok: true });
}
