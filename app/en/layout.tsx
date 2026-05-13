import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "HAO — Chinese Language School",
  description: "Effective online Chinese language courses: from zero to fluent communication, flexible formats and schedule.",
};

export default function EnLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div lang="en" className="h-full w-full">
      {children}
    </div>
  );
}
