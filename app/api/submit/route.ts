import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { name, phone, email } = await req.json();

  if (!name || name.trim().length < 2) {
    return NextResponse.json({ error: "Введите имя" }, { status: 400 });
  }
  if (!phone || phone.replace(/\D/g, "").length < 10) {
    return NextResponse.json({ error: "Введите корректный номер телефона" }, { status: 400 });
  }

  const date = new Date().toLocaleString("ru-RU", { timeZone: "Europe/Moscow" });
  const text = `🆕 Новая заявка\n👤 Имя: ${name}\n📞 Телефон: ${phone}\n📧 Email: ${email || "—"}\n🕐 ${date}`;

  const results = await Promise.allSettled([
    // Telegram
    process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID
      ? fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ chat_id: process.env.TELEGRAM_CHAT_ID, text }),
        })
      : Promise.resolve(null),

    // Google Sheets
    process.env.GOOGLE_SCRIPT_URL
      ? fetch(process.env.GOOGLE_SCRIPT_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ date, name, phone, email }),
        })
      : Promise.resolve(null),
  ]);

  const allFailed = results.every(
    (r) => r.status === "rejected" || (r.status === "fulfilled" && r.value !== null && !(r.value as Response).ok)
  );

  if (allFailed) {
    return NextResponse.json({ error: "Не удалось отправить заявку" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
