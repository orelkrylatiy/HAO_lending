"use client";

import { useState } from "react";
import Link from "next/link";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#fcfbf7] border-b border-[#e8ddd5] shadow-sm">
      <div className="container-main flex items-center justify-between h-16 md:h-18">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold text-[#F86704]">好</span>
          <span className="text-lg font-bold text-[#121212]">HAO</span>
          <span className="hidden sm:block text-sm text-[#6b5c4e] ml-1">школа китайского</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-[#3d2b1f]">
          <a href="#programs" className="hover:text-[#F86704] transition-colors">Программы</a>
          <a href="#teachers" className="hover:text-[#F86704] transition-colors">Преподаватели</a>
          <a href="#reviews" className="hover:text-[#F86704] transition-colors">Отзывы</a>
          <a href="#pricing" className="hover:text-[#F86704] transition-colors">Стоимость</a>
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <a
            href="#pricing"
            className="px-5 py-2 rounded-full bg-[#F86704] text-white text-sm font-semibold hover:bg-[#e55a1f] transition-colors"
          >
            Записаться на занятие
          </a>
        </div>

        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Меню"
        >
          <span className={`block w-6 h-0.5 bg-[#121212] transition-all ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-6 h-0.5 bg-[#121212] transition-all ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-0.5 bg-[#121212] transition-all ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-[#fcfbf7] border-t border-[#e8ddd5] px-5 py-4 flex flex-col gap-4">
          <a href="#programs" className="text-[#3d2b1f] font-medium" onClick={() => setMenuOpen(false)}>Программы</a>
          <a href="#teachers" className="text-[#3d2b1f] font-medium" onClick={() => setMenuOpen(false)}>Преподаватели</a>
          <a href="#reviews" className="text-[#3d2b1f] font-medium" onClick={() => setMenuOpen(false)}>Отзывы</a>
          <a href="#pricing" className="text-[#3d2b1f] font-medium" onClick={() => setMenuOpen(false)}>Стоимость</a>
          <a
            href="#pricing"
            className="px-5 py-2 rounded-full bg-[#F86704] text-white text-sm font-semibold text-center hover:bg-[#e55a1f] transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            Записаться на занятие
          </a>
        </div>
      )}
    </header>
  );
}
