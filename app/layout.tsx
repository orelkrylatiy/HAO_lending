import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HAO — школа китайского языка",
  description: "Эффективные онлайн-курсы китайского языка: от нуля до уверенного общения, гибкие форматы и график.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className="h-full">
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  );
}
