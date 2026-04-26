"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#fcfbf7] border-b border-[#e8ddd5]">
      <div className="container-main flex items-center justify-between h-[72px]">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 flex-shrink-0">
          <Image src="/images/logo-x.svg" alt="HAO логотип" width={36} height={36} />
          <div className="flex flex-col leading-none">
            <span className="text-[22px] font-black text-[#121212] tracking-tight">НАО</span>
            <span className="text-[10px] text-[#6b5c4e] font-medium leading-tight">онлайн школа китайского языка</span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-8 text-[14px] font-semibold text-[#121212]">
          <a href="#programs" className="hover:text-[#F86704] transition-colors">Форматы занятий</a>
          <a href="#teachers" className="hover:text-[#F86704] transition-colors">Преподаватели</a>
          <a href="#reviews" className="hover:text-[#F86704] transition-colors">Отзывы</a>
          <a href="#pricing" className="hover:text-[#F86704] transition-colors">Стоимость</a>
        </nav>

        {/* CTA button */}
        <a
          href="#pricing"
          className="hidden lg:flex items-center gap-2 px-6 py-2.5 rounded-full border-2 border-[#121212] text-[#121212] text-[14px] font-semibold hover:bg-[#121212] hover:text-white transition-all"
        >
          Записаться на занятие
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </a>

        {/* Mobile burger */}
        <button
          className="lg:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Меню"
        >
          <span className={`block w-6 h-0.5 bg-[#121212] transition-all ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-6 h-0.5 bg-[#121212] transition-all ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-0.5 bg-[#121212] transition-all ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden bg-[#fcfbf7] border-t border-[#e8ddd5] px-5 py-5 flex flex-col gap-4">
          <a href="#programs" className="text-[#121212] font-semibold text-[15px]" onClick={() => setMenuOpen(false)}>Форматы занятий</a>
          <a href="#teachers" className="text-[#121212] font-semibold text-[15px]" onClick={() => setMenuOpen(false)}>Преподаватели</a>
          <a href="#reviews" className="text-[#121212] font-semibold text-[15px]" onClick={() => setMenuOpen(false)}>Отзывы</a>
          <a href="#pricing" className="text-[#121212] font-semibold text-[15px]" onClick={() => setMenuOpen(false)}>Стоимость</a>
          <a
            href="#pricing"
            className="mt-2 px-6 py-3 rounded-full border-2 border-[#121212] text-[#121212] font-semibold text-center hover:bg-[#121212] hover:text-white transition-all"
            onClick={() => setMenuOpen(false)}
          >
            Записаться на занятие →
          </a>
        </div>
      )}
    </header>
  );
}
