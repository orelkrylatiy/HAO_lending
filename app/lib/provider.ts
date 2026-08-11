const PROVIDER_RU = {
  title: "Поставщик услуг:",
  name: "ИП Хелиспали К.Г.",
  registration: "ИНН/ОГРНИП. 667302881017/308667334600021",
  address: "г. Екатеринбург",
  faqLabel: "FAQ",
  faqHref: "#faq",
};

const PROVIDER_EN = {
  title: "Service Provider:",
  name: "I/E Kristina Khelisupali",
  registration: "01501134269",
  address: "Tbilisi, Bob Walsh st.30-96",
  faqLabel: "FAQ",
  faqHref: "#faq",
};

/** Each server selects one fixed provider profile with NEXT_PUBLIC_SITE_LOCALE=ru|en. */
export const PROVIDER = process.env.NEXT_PUBLIC_SITE_LOCALE === "en" ? PROVIDER_EN : PROVIDER_RU;
