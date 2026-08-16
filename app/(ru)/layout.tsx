import type { Metadata } from "next";
import "../globals.css";
import YandexMetrika from "../components/YandexMetrika";
import { montserrat } from "../lib/fonts";
import { getEnMetadata, getRuMetadata, isRussianDomain } from "../lib/siteMetadata";

export async function generateMetadata(): Promise<Metadata> {
  if (await isRussianDomain()) return getRuMetadata();
  // Non-.ru domains serve the English version at "/", so canonical
  // must not point to /en.
  return { ...getEnMetadata(), alternates: { canonical: "/" } };
}

export default async function RuLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const lang = (await isRussianDomain()) ? "ru" : "en";
  return (
    <html lang={lang} className="h-full">
      <body className={`${montserrat.className} min-h-full flex flex-col antialiased`}>
        {children}
        <YandexMetrika />
      </body>
    </html>
  );
}
