import { getDictionary } from "@/app/lib/dictionaries";
import { CONTACTS } from "@/app/lib/contacts";

export default function JsonLd({ lang }: { lang: "ru" | "en" }) {
  const dict = getDictionary(lang);
  const baseUrl = "https://haochinese.ru";
  const pageUrl = lang === "en" ? `${baseUrl}/en` : `${baseUrl}/`;

  const organization = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "HAO",
    alternateName: lang === "ru" ? "НАО — онлайн школа китайского языка" : "HAO — online Chinese language school",
    url: pageUrl,
    logo: `${baseUrl}/og-image.png`,
    telephone: CONTACTS.phoneRaw,
    sameAs: [CONTACTS.telegram, CONTACTS.whatsapp].filter(Boolean),
  };

  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: lang,
    mainEntity: dict.data.FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }} />
    </>
  );
}
