const INTEGRATION_ALLOWLIST = new Set([
  "api.telegram.org",
  "script.google.com",
  "script.googleusercontent.com",
]);

export const MAX_NAME_LENGTH = 80;
export const MAX_PHONE_LENGTH = 40;
export const MAX_EMAIL_LENGTH = 120;
export const MAX_REQUEST_BYTES = 4_096;
export const MIN_FORM_FILL_MS = 600;

export function asString(value) {
  return typeof value === "string" ? value.trim() : "";
}

export function limitLength(value, maxLength) {
  return value.slice(0, maxLength);
}

export function escapeTelegramHtml(value) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export function sanitizeSpreadsheetCell(value) {
  if (!value) return value;
  return /^[=+\-@]/.test(value) ? `'${value}` : value;
}

export function normalizeLeadPayload(data) {
  return {
    name: limitLength(asString(data?.name), MAX_NAME_LENGTH),
    phone: limitLength(asString(data?.phone), MAX_PHONE_LENGTH),
    email: limitLength(asString(data?.email), MAX_EMAIL_LENGTH),
    website: asString(data?.website),
    formStartedAt: Number(data?.formStartedAt) || 0,
  };
}

export function validateLead(lead) {
  if (!lead.name || lead.name.length < 2) return "Введите имя";

  if (!lead.phone || lead.phone.replace(/\D/g, "").length < 10) {
    return "Введите корректный номер телефона";
  }

  if (lead.email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(lead.email)) {
    return "Введите корректный email";
  }

  return null;
}

export function getSpamReason(lead, now = Date.now()) {
  if (lead.website) return "honeypot";

  if (lead.formStartedAt > 0) {
    const fillTime = now - lead.formStartedAt;
    if (fillTime >= 0 && fillTime < MIN_FORM_FILL_MS) return "too_fast";
  }

  return null;
}

export function createRateLimiter({ limit, windowMs }) {
  const buckets = new Map();

  return function checkRateLimit(key, now = Date.now()) {
    if (!key) return { allowed: true, retryAfterSeconds: 0 };

    const cutoff = now - windowMs;
    const recent = (buckets.get(key) ?? []).filter((timestamp) => timestamp > cutoff);

    if (recent.length >= limit) {
      const retryAfterMs = Math.max(1, recent[0] + windowMs - now);
      buckets.set(key, recent);
      return {
        allowed: false,
        retryAfterSeconds: Math.ceil(retryAfterMs / 1_000),
      };
    }

    recent.push(now);
    buckets.set(key, recent);

    if (buckets.size > 2_000) {
      for (const [bucketKey, timestamps] of buckets) {
        if (timestamps.every((timestamp) => timestamp <= cutoff)) buckets.delete(bucketKey);
      }
    }

    return { allowed: true, retryAfterSeconds: 0 };
  };
}

export async function postJsonToIntegration(
  url,
  body,
  { fetchImpl = globalThis.fetch, timeoutMs = 8_000 } = {},
) {
  const target = url instanceof URL ? url : new URL(url);

  if (target.protocol !== "https:" || !INTEGRATION_ALLOWLIST.has(target.hostname)) {
    throw new Error(`Integration host is not allowed: ${target.hostname}`);
  }

  if (typeof fetchImpl !== "function") {
    throw new Error("Fetch implementation is unavailable");
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetchImpl(target, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`Integration request failed with HTTP ${response.status}`);
    }

    return response;
  } finally {
    clearTimeout(timeout);
  }
}

export function formatMoscowTimestamp(date = new Date()) {
  const msk = new Date(date.getTime() + 3 * 60 * 60 * 1_000);
  const pad = (value) => String(value).padStart(2, "0");

  return `${pad(msk.getUTCDate())}.${pad(msk.getUTCMonth() + 1)}.${msk.getUTCFullYear()} ${pad(msk.getUTCHours())}:${pad(msk.getUTCMinutes())} МСК`;
}
