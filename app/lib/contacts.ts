// Контакты берутся из .env.local
// Редактируй там — сюда ничего не вписывай вручную

const DEFAULT_CONTACTS = {
  phone: "+7 (950) 6492906",
  phoneRaw: "+79506492906",
  email: "",
  telegram: "https://t.me/haoznaet",
  whatsapp: "https://wa.me/79506492906",
};

function formatDisplayPhone(phoneRaw: string, fallback: string) {
  const digits = phoneRaw.replace(/\D/g, "");

  if (digits.length === 11 && (digits.startsWith("7") || digits.startsWith("8"))) {
    const normalized = `7${digits.slice(-10)}`;
    return `+${normalized[0]} (${normalized.slice(1, 4)}) ${normalized.slice(4, 10)}`;
  }

  return fallback;
}

function normalizeEmail(email: string) {
  return email.trim().replace(/[.,;:]+$/, "");
}

export const CONTACTS = {
  phoneRaw: process.env.NEXT_PUBLIC_CONTACT_PHONE_RAW ?? DEFAULT_CONTACTS.phoneRaw,
  phone: formatDisplayPhone(
    process.env.NEXT_PUBLIC_CONTACT_PHONE_RAW ?? DEFAULT_CONTACTS.phoneRaw,
    process.env.NEXT_PUBLIC_CONTACT_PHONE ?? DEFAULT_CONTACTS.phone,
  ),
  email: normalizeEmail(process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? DEFAULT_CONTACTS.email),
  telegram: process.env.NEXT_PUBLIC_CONTACT_TELEGRAM ?? DEFAULT_CONTACTS.telegram,
  whatsapp: process.env.NEXT_PUBLIC_CONTACT_WHATSAPP ?? DEFAULT_CONTACTS.whatsapp,
};
