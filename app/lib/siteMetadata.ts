import type { Metadata } from "next";

const metadataBase = new URL("https://haochinese.ru");
const defaultImage = {
  url: "/icon.svg",
  width: 512,
  height: 512,
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
      images: ["/icon.svg"],
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
          ...defaultImage,
          alt: "HAO — Chinese Language School",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "HAO — Chinese Language School",
      description: "Effective online Chinese language courses: from zero to fluent communication, flexible formats and schedule.",
      images: ["/icon.svg"],
    },
  };
}
