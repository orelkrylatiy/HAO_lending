import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://haochinese.ru"),
  title: "HAO — школа китайского языка",
  description: "Эффективные онлайн-курсы китайского языка: от нуля до уверенного общения, гибкие форматы и график.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "HAO — школа китайского языка",
    description: "Эффективные онлайн-курсы китайского языка: от нуля до уверенного общения, гибкие форматы и график.",
    url: "https://haochinese.ru/",
    siteName: "HAO",
    locale: "ru_RU",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  );
}
