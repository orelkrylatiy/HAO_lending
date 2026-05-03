"use client";

import { useState } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

export default function LeadModal({ isOpen, onClose, title = "Записаться на консультацию" }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("+7 ");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, email }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error || "Ошибка отправки");
        setStatus("error");
      } else {
        setStatus("success");
      }
    } catch {
      setErrorMsg("Ошибка соединения");
      setStatus("error");
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      <div
        className="relative bg-[#FFE9D2] rounded-[28px] p-7 md:p-9 w-full max-w-[420px] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
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

        {status === "success" ? (
          <div className="text-center py-6 flex flex-col items-center gap-4">
            <div className="w-16 h-16 bg-[#F86704] rounded-full flex items-center justify-center">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path d="M8 16l6 6 10-12" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <p className="text-[#121212] font-bold text-[18px]">Заявка отправлена!</p>
            <p className="text-[#6b5c4e] text-[14px]">Мы свяжемся с вами в ближайшее время.</p>
            <button
              type="button"
              onClick={onClose}
              className="mt-2 w-full bg-[#F86704] text-white font-bold text-[16px] py-4 rounded-xl hover:bg-[#e55a1f] transition-colors"
            >
              Закрыть
            </button>
          </div>
        ) : (
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Имя"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full bg-white rounded-xl px-4 py-4 text-[15px] font-medium text-[#121212] placeholder-[#a09080] outline-none border-2 border-transparent focus:border-[#F86704] transition-colors"
            />
            <input
              type="email"
              placeholder="Email (необязательно)"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white rounded-xl px-4 py-4 text-[15px] font-medium text-[#121212] placeholder-[#a09080] outline-none border-2 border-transparent focus:border-[#F86704] transition-colors"
            />
            <div className="flex items-center gap-2 bg-white rounded-xl px-4 py-4 border-2 border-transparent focus-within:border-[#F86704] transition-colors">
              <span className="text-[18px]">🇷🇺</span>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="flex-1 text-[15px] font-medium text-[#121212] placeholder-[#a09080] outline-none bg-transparent"
                placeholder="+7 (000) 000-00-00"
              />
            </div>

            {status === "error" && (
              <p className="text-red-600 text-[13px] text-center">{errorMsg}</p>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full bg-[#F86704] text-white font-bold text-[16px] py-4 rounded-xl hover:bg-[#e55a1f] transition-colors mt-2 disabled:opacity-60"
            >
              {status === "loading" ? "Отправляем..." : "Записаться"}
            </button>

            <p className="text-center text-[11px] text-[#6b5c4e] leading-relaxed">
              Нажимая &ldquo;Записаться&rdquo; вы соглашаетесь с политикой конфиденциальности
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
