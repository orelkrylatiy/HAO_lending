import type { Lang } from "./dictionaries";

export function getLegalDocuments(lang: Lang) {
  const locale = lang === "en" ? "en" : "ru";
  return {
    offer: { href: `/docs/offer-${locale}.pdf` },
    policy: { href: `/docs/privacy-${locale}.pdf` },
  };
}
