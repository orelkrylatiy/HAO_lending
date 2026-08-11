const PROVIDER_RU = {
  name: "ИП Хелиспали К.Г.",
  registration: "ИНН/ОГРНИП. 667302881017/308667334600021",
  address: "г. Екатеринбург",
};

const PROVIDER_EN = {
  name: "I/E Kristina Khelisupali",
  registration: "01501134269",
  address: "Tbilisi, Bob Walsh st.30-96",
};

/** Each server selects one fixed provider profile with NEXT_PUBLIC_SITE_LOCALE=ru|en. */
export const PROVIDER = process.env.NEXT_PUBLIC_SITE_LOCALE === "en" ? PROVIDER_EN : PROVIDER_RU;
