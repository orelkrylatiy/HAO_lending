"use client";

import { useSyncExternalStore } from "react";
import type { Lang } from "@/app/lib/dictionaries";

const PROVIDER_RU = {
  name: "ИП Хелиспали К.Г.",
  registration: "ИНН/ОГРНИП. 667302881017/308667334600021",
  address: "г. Екатеринбург",
};

const PROVIDER_EN = {
  name: "I/E Kristina Khelisupali",
  registration: "01501134269",
  address: "Tbilisi, Bob Walsh st.30-96",
};

export default function ProviderDetails({ lang }: { lang: Lang }) {
  const isRussianDomain = useSyncExternalStore(
    () => () => {},
    () => window.location.hostname.includes(".ru"),
    () => false,
  );

  const provider = isRussianDomain ? PROVIDER_RU : PROVIDER_EN;
  const title = lang === "ru" ? "Поставщик услуг:" : "Service Provider:";

  return (
    <div className="flex-1">
      <h3 className="font-bold text-white text-[18px] mb-4">{title}</h3>
      <div className="flex flex-col gap-2 text-white/90 text-[15px]">
        <div className="font-medium">{provider.name}</div>
        <div className="italic">{provider.registration}</div>
        <div>{provider.address}</div>
        <a href="#faq" className="mt-2 text-white font-medium hover:text-white/80 transition-colors">FAQ</a>
      </div>
    </div>
  );
}
