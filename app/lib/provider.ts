const DEFAULT_PROVIDER = {
  title: "Поставщик услуг:",
  name: "ИП Хелиспали К.Г.",
  registration: "ИНН/ОГРНИП. 667302881017/308667334600021",
  address: "г. Екатеринбург",
  faqLabel: "FAQ",
  faqHref: "#faq",
};

/** Provider details are deployment-specific: each server supplies its own ENV values. */
export const PROVIDER = {
  ...DEFAULT_PROVIDER,
  name: process.env.NEXT_PUBLIC_PROVIDER_NAME || DEFAULT_PROVIDER.name,
  registration: process.env.NEXT_PUBLIC_PROVIDER_REGISTRATION || DEFAULT_PROVIDER.registration,
  address: process.env.NEXT_PUBLIC_PROVIDER_ADDRESS || DEFAULT_PROVIDER.address,
};
