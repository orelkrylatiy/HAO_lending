"use client";

import { getDictionary, Lang } from "@/app/lib/dictionaries";

export default function FloatingCTA({ lang = "ru", onClick }: { lang?: Lang; onClick?: () => void }) {
  const dict = getDictionary(lang);

  return (
    <button
      type="button"
      onClick={onClick}
      className="fixed bottom-4 right-4 z-[60] md:bottom-6 md:right-6 inline-flex items-center gap-3 rounded-full bg-[#F86704] px-5 py-4 text-white font-bold text-[15px] md:text-[16px] shadow-[0_12px_30px_rgba(248,103,4,0.32)] hover:bg-[#e55a1f] transition-all button-lift"
      aria-label={dict.nav.cta}
    >
      <span>{dict.nav.cta}</span>
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path d="M7 17L17 7M17 7H7M17 7V17" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </span>
    </button>
  );
}
