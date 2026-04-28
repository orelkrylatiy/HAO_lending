import { NextRequest, NextResponse } from "next/server";

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
      fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
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
  await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

export async function POST(req: NextRequest) {
  const { name, phone, email } = await req.json();

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
    `👤 Имя: ${name}`,
    `📞 Телефон: ${phone}`,
    `📧 Email: ${email || "—"}`,
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
