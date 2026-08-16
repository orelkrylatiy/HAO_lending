import type { Metadata } from "next";
import { headers } from "next/headers";

const metadataBase = new URL("https://haochinese.ru");

// Only the .ru domain serves both language versions (/, /en);
// every other domain is English-only, same rule as ProviderDetails uses.
export async function isRussianDomain(): Promise<boolean> {
  const headerList = await headers();
  const hostname = (headerList.get("host") ?? "").split(":")[0].toLowerCase();
  // localhost — локальная разработка русской версии
  return hostname === "localhost" || hostname === "127.0.0.1" || hostname.includes(".ru");
}
const defaultImage = {
  url: "/og-image.png",
  width: 1200,
  height: 630,
};

export function getRuMetadata(): Metadata {
  return {
    metadataBase,
    title: "HAO — школа китайского языка",
    description: "Эффективные онлайн-курсы китайского языка: от нуля до уверенного общения, гибкие форматы и график.",
    alternates: {
      canonical: "/",
      languages: {
        ru: "/",
        en: "/en",
      },
    },
    openGraph: {
      title: "HAO — школа китайского языка",
      description: "Эффективные онлайн-курсы китайского языка: от нуля до уверенного общения, гибкие форматы и график.",
      url: "https://haochinese.ru/",
      siteName: "HAO",
      locale: "ru_RU",
      type: "website",
      images: [
        {
          ...defaultImage,
          alt: "HAO — школа китайского языка",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "HAO — школа китайского языка",
      description: "Эффективные онлайн-курсы китайского языка: от нуля до уверенного общения, гибкие форматы и график.",
      images: ["/og-image.png"],
    },
  };
}

export function getEnMetadata(): Metadata {
  return {
    metadataBase,
    title: "HAO — Chinese Language School",
    description: "Effective online Chinese language courses: from zero to fluent communication, flexible formats and schedule.",
    alternates: {
      canonical: "/en",
      languages: {
        ru: "/",
        en: "/en",
      },
    },
    openGraph: {
      title: "HAO — Chinese Language School",
      description: "Effective online Chinese language courses: from zero to fluent communication, flexible formats and schedule.",
      url: "https://haochinese.ru/en",
      siteName: "HAO",
      locale: "en_US",
      type: "website",
      images: [
        {
          url: "/og-image-en.png",
          width: 1200,
          height: 630,
          alt: "HAO — Chinese Language School",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "HAO — Chinese Language School",
      description: "Effective online Chinese language courses: from zero to fluent communication, flexible formats and schedule.",
      images: ["/og-image-en.png"],
    },
  };
}
