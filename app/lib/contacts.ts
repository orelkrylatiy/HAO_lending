// Контакты берутся из .env.local
// Редактируй там — сюда ничего не вписывай вручную

export const CONTACTS = {
  phone:    process.env.NEXT_PUBLIC_CONTACT_PHONE    ?? "",
  phoneRaw: process.env.NEXT_PUBLIC_CONTACT_PHONE_RAW ?? "",
  email:    process.env.NEXT_PUBLIC_CONTACT_EMAIL    ?? "",
  telegram: process.env.NEXT_PUBLIC_CONTACT_TELEGRAM ?? "#",
  whatsapp: process.env.NEXT_PUBLIC_CONTACT_WHATSAPP ?? "#",
};
