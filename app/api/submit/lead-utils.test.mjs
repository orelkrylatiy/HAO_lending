import assert from "node:assert/strict";
import test from "node:test";

import {
  MIN_FORM_FILL_MS,
  createRateLimiter,
  escapeTelegramHtml,
  formatMoscowTimestamp,
  getSpamReason,
  normalizeLeadPayload,
  postJsonToIntegration,
  sanitizeSpreadsheetCell,
  validateLead,
} from "./lead-utils.mjs";

test("normalizes and limits lead fields", () => {
  const lead = normalizeLeadPayload({
    name: `  ${"A".repeat(100)}  `,
    phone: ` ${"1".repeat(60)} `,
    email: ` ${"a".repeat(130)} `,
    website: "  bot.example  ",
    formStartedAt: "12345",
  });

  assert.equal(lead.name.length, 80);
  assert.equal(lead.phone.length, 40);
  assert.equal(lead.email.length, 120);
  assert.equal(lead.website, "bot.example");
  assert.equal(lead.formStartedAt, 12345);
});

test("validates required fields and email format", () => {
  assert.equal(validateLead({ name: "A", phone: "+7 999 111-22-33", email: "" }), "Введите имя");
  assert.equal(
    validateLead({ name: "Anna", phone: "123", email: "" }),
    "Введите корректный номер телефона",
  );
  assert.equal(
    validateLead({ name: "Anna", phone: "+7 999 111-22-33", email: "bad-email" }),
    "Введите корректный email",
  );
  assert.equal(validateLead({ name: "Anna", phone: "+7 999 111-22-33", email: "a@example.com" }), null);
});

test("detects honeypot and suspiciously fast submissions", () => {
  const now = 10_000;
  assert.equal(getSpamReason({ website: "spam", formStartedAt: 0 }, now), "honeypot");
  assert.equal(
    getSpamReason({ website: "", formStartedAt: now - MIN_FORM_FILL_MS + 1 }, now),
    "too_fast",
  );
  assert.equal(getSpamReason({ website: "", formStartedAt: now - MIN_FORM_FILL_MS }, now), null);
});

test("rate limiter blocks repeated submissions inside the window", () => {
  const check = createRateLimiter({ limit: 2, windowMs: 1_000 });

  assert.equal(check("ip", 1_000).allowed, true);
  assert.equal(check("ip", 1_100).allowed, true);
  const blocked = check("ip", 1_200);
  assert.equal(blocked.allowed, false);
  assert.equal(blocked.retryAfterSeconds, 1);
  assert.equal(check("ip", 2_001).allowed, true);
});

test("spreadsheet sanitizer protects formula-like cells", () => {
  assert.equal(sanitizeSpreadsheetCell("+79991234567"), "'+79991234567");
  assert.equal(sanitizeSpreadsheetCell("=1+1"), "'=1+1");
  assert.equal(sanitizeSpreadsheetCell("@SUM(A1)"), "'@SUM(A1)");
  assert.equal(sanitizeSpreadsheetCell("Anna"), "Anna");
});

test("telegram escaping handles HTML metacharacters", () => {
  assert.equal(escapeTelegramHtml("A&B <test>"), "A&amp;B &lt;test&gt;");
});

test("integration helper rejects disallowed hosts", async () => {
  await assert.rejects(
    postJsonToIntegration("https://example.com/hook", {}, { fetchImpl: async () => new Response(null, { status: 200 }) }),
    /not allowed/,
  );
});

test("integration helper treats HTTP errors as failures", async () => {
  await assert.rejects(
    postJsonToIntegration("https://script.google.com/macros/s/test/exec", {}, {
      fetchImpl: async () => new Response("nope", { status: 500 }),
    }),
    /HTTP 500/,
  );
});

test("integration helper accepts successful responses", async () => {
  const response = await postJsonToIntegration("https://script.google.com/macros/s/test/exec", { ok: true }, {
    fetchImpl: async (_url, init) => {
      assert.equal(init.method, "POST");
      assert.equal(init.headers["Content-Type"], "application/json");
      assert.equal(init.body, JSON.stringify({ ok: true }));
      return new Response(null, { status: 204 });
    },
  });

  assert.equal(response.status, 204);
});

test("formats a deterministic Moscow timestamp", () => {
  assert.equal(formatMoscowTimestamp(new Date("2026-01-02T01:04:00.000Z")), "02.01.2026 04:04 МСК");
});
