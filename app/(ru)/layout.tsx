import type { Metadata } from "next";
import "../globals.css";
import YandexMetrika from "../components/YandexMetrika";
import { montserrat } from "../lib/fonts";
import { getRuMetadata } from "../lib/siteMetadata";

export const metadata: Metadata = getRuMetadata();

export default function RuLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className="h-full">
      <body className={`${montserrat.className} min-h-full flex flex-col antialiased`}>
        {children}
        <YandexMetrika />
      </body>
    </html>
  );
}
