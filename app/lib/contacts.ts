// Контакты берутся из .env.local
// Редактируй там — сюда ничего не вписывай вручную

const DEFAULT_CONTACTS = {
  phone: "+7 (950) 6492906",
  phoneRaw: "+79506492906",
  email: "",
  telegram: "https://t.me/haoznaet",
  whatsapp: "https://wa.me/79506492906",
};

export const CONTACTS = {
  phone:    process.env.NEXT_PUBLIC_CONTACT_PHONE    ?? DEFAULT_CONTACTS.phone,
  phoneRaw: process.env.NEXT_PUBLIC_CONTACT_PHONE_RAW ?? DEFAULT_CONTACTS.phoneRaw,
  email:    process.env.NEXT_PUBLIC_CONTACT_EMAIL    ?? DEFAULT_CONTACTS.email,
  telegram: process.env.NEXT_PUBLIC_CONTACT_TELEGRAM ?? DEFAULT_CONTACTS.telegram,
  whatsapp: process.env.NEXT_PUBLIC_CONTACT_WHATSAPP ?? DEFAULT_CONTACTS.whatsapp,
};
