"use client";

import { useState } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

export default function LeadModal({ isOpen, onClose, title = "Записаться на консультацию" }: Props) {
  const [phone, setPhone] = useState("+7 ");

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative bg-[#FFE9D2] rounded-[28px] p-7 md:p-9 w-full max-w-[420px] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-black/10 transition-colors"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M4 4l10 10M14 4L4 14" stroke="#121212" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>

        <h2 className="text-[22px] md:text-[26px] font-black text-[#121212] text-center leading-tight mb-7">
          {title}
        </h2>

        <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
          <input
            type="email"
            placeholder="Email"
            className="w-full bg-white rounded-xl px-4 py-4 text-[15px] font-medium text-[#121212] placeholder-[#a09080] outline-none border-2 border-transparent focus:border-[#F86704] transition-colors"
          />
          <input
            type="text"
            placeholder="ФИО"
            className="w-full bg-white rounded-xl px-4 py-4 text-[15px] font-medium text-[#121212] placeholder-[#a09080] outline-none border-2 border-transparent focus:border-[#F86704] transition-colors"
          />
          <div className="flex items-center gap-2 bg-white rounded-xl px-4 py-4 border-2 border-transparent focus-within:border-[#F86704] transition-colors">
            <span className="text-[18px]">🇷🇺</span>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="flex-1 text-[15px] font-medium text-[#121212] placeholder-[#a09080] outline-none bg-transparent"
              placeholder="+7 (000) 000-00-00"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#F86704] text-white font-bold text-[16px] py-4 rounded-xl hover:bg-[#e55a1f] transition-colors mt-2"
          >
            Записаться
          </button>

          <p className="text-center text-[11px] text-[#6b5c4e] leading-relaxed">
            Нажимая &ldquo;записаться&rdquo; вы соглашаетесь с политикой конфиденциальности
          </p>
        </form>
      </div>
    </div>
  );
}
