import type { Metadata } from "next";
import "../../globals.css";
import YandexMetrika from "../../components/YandexMetrika";
import { montserrat } from "../../lib/fonts";
import { getEnMetadata } from "../../lib/siteMetadata";

export const metadata: Metadata = getEnMetadata();

export default function EnLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={`${montserrat.className} min-h-full flex flex-col antialiased`}>
        {children}
        <YandexMetrika />
      </body>
    </html>
  );
}
