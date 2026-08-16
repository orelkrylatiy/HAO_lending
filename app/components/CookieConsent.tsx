"use client";

import { useEffect, useState } from "react";
import { getDictionary, Lang } from "@/app/lib/dictionaries";
import { getLegalDocuments } from "@/app/lib/legal";

const STORAGE_KEY = "hao-cookie-consent";

export default function CookieConsent({ lang = "ru" }: { lang?: Lang }) {
  const [visible, setVisible] = useState(false);
  const dict = getDictionary(lang);
  const legal = getLegalDocuments(lang);

  useEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY)) return;
    } catch {
      // localStorage может быть недоступен (приватный режим) — просто показываем баннер
    }
    const timer = setTimeout(() => setVisible(true), 600);
    return () => clearTimeout(timer);
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "accepted");
    } catch {
      // запись не удалась — баннер покажется при следующем визите
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className="fixed left-0 right-0 bottom-0 z-[70] p-4 pb-[max(16px,env(safe-area-inset-bottom))] md:right-auto md:bottom-6 md:left-6 animate-banner-in"
      role="dialog"
      aria-modal="false"
      aria-label={dict.cookies.aria}
    >
      <div className="mx-auto flex max-w-[520px] flex-col gap-4 rounded-[20px] border border-[#e8ddd5] bg-white p-4 shadow-[0_16px_32px_rgba(61,43,31,0.12)] sm:p-5 md:mx-0 md:max-w-[440px] md:flex-row md:items-center md:gap-5">
        <div className="flex items-start gap-3">
          <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#FFE9D2]">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5"
                stroke="#F86704"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path d="M8.5 8.5v.01M16 15.5v.01M12 12v.01M11 17v.01M7 14v.01" stroke="#F86704" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </span>
          <p className="text-[13px] leading-relaxed text-[#6b5c4e]">
            {dict.cookies.text}{" "}
            <a
              href={legal.policy.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[#121212] underline underline-offset-2"
            >
              {dict.cookies.link}
            </a>
            .
          </p>
        </div>
        <button
          type="button"
          onClick={handleAccept}
          className="btn-primary w-full flex-shrink-0 px-6 py-2.5 text-[13px] md:w-auto"
        >
          {dict.cookies.accept}
        </button>
      </div>
    </div>
  );
}
