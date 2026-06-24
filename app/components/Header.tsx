"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getDictionary, Lang } from "@/app/lib/dictionaries";

export default function Header({ lang = "ru", onSignup }: { lang?: Lang; onSignup?: () => void }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const dict = getDictionary(lang);

  const handleSignupClick = () => {
    setMenuOpen(false);
    onSignup?.();
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#fcfbf7] border-b border-[#e8ddd5]">
      <div className="container-main relative z-10 flex items-center justify-between h-[72px]">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 flex-shrink-0">
          <Image src="/icons/logo-x.svg" alt={dict.header.logoAlt} width={36} height={36} />
          <div className="flex flex-col leading-none">
            <span className="text-[22px] font-black text-[#121212] tracking-tight">{dict.header.title}</span>
            <span className="text-[10px] text-[#6b5c4e] font-medium leading-tight">{dict.header.subtitle}</span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-8 text-[14px] font-semibold text-[#121212]">
          <a href="#programs" className="hover:text-[#F86704] transition-colors">{dict.nav.programs}</a>
          <a href="#teachers" className="hover:text-[#F86704] transition-colors">{dict.nav.teachers}</a>
          <a href="#reviews" className="hover:text-[#F86704] transition-colors">{dict.nav.reviews}</a>
          <a href="#pricing" className="hover:text-[#F86704] transition-colors">{dict.nav.pricing}</a>
        </nav>

        {/* CTA button & Lang switcher */}
        <div className="hidden lg:flex items-center gap-4">
          <div className="flex gap-2 text-[14px] font-bold">
            <Link href="/" className={lang === "ru" ? "text-[#F86704]" : "text-[#121212] hover:text-[#F86704]"}>RU</Link>
            <span className="text-[#e8ddd5]">|</span>
            <Link href="/en" className={lang === "en" ? "text-[#F86704]" : "text-[#121212] hover:text-[#F86704]"}>EN</Link>
          </div>
          <button
            type="button"
            onClick={handleSignupClick}
            className="flex items-center gap-2 px-6 py-2.5 rounded-full border-2 border-[#121212] text-[#121212] text-[14px] font-semibold hover:bg-[#121212] hover:text-white transition-all cursor-pointer"
          >
            {dict.nav.cta}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        </div>

        {/* Mobile burger */}
        <button
          type="button"
          className="lg:hidden flex flex-col gap-1.5 p-2 cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={dict.nav.menu || "Menu"}
        >
          <span className={`block w-6 h-0.5 bg-[#121212] transition-all ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-6 h-0.5 bg-[#121212] transition-all ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-0.5 bg-[#121212] transition-all ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="relative z-10 lg:hidden bg-[#fcfbf7] border-t border-[#e8ddd5] px-5 py-5 flex flex-col gap-4">
          <div className="flex justify-end gap-2 text-[14px] font-bold mb-2">
            <Link href="/" className={lang === "ru" ? "text-[#F86704]" : "text-[#121212]"}>RU</Link>
            <span className="text-[#e8ddd5]">|</span>
            <Link href="/en" className={lang === "en" ? "text-[#F86704]" : "text-[#121212]"}>EN</Link>
          </div>
          <a href="#programs" className="text-[#121212] font-semibold text-[15px]" onClick={() => setMenuOpen(false)}>{dict.nav.programs}</a>
          <a href="#teachers" className="text-[#121212] font-semibold text-[15px]" onClick={() => setMenuOpen(false)}>{dict.nav.teachers}</a>
          <a href="#reviews" className="text-[#121212] font-semibold text-[15px]" onClick={() => setMenuOpen(false)}>{dict.nav.reviews}</a>
          <a href="#pricing" className="text-[#121212] font-semibold text-[15px]" onClick={() => setMenuOpen(false)}>{dict.nav.pricing}</a>
          <button
            type="button"
            className="mt-2 px-6 py-3 rounded-full border-2 border-[#121212] text-[#121212] font-semibold text-center hover:bg-[#121212] hover:text-white transition-all cursor-pointer"
            onClick={handleSignupClick}
          >
            {dict.nav.cta} →
          </button>
        </div>
      )}
    </header>
  );
}
