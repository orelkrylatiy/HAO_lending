"use client";

import { useState } from "react";
import { getDictionary, Lang } from "@/app/lib/dictionaries";
import { LEGAL_DOCUMENTS } from "@/app/lib/legal";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  lang?: Lang;
}

export default function LeadModal({ isOpen, onClose, title, lang = "ru" }: Props) {
  const dict = getDictionary(lang);
  const modalTitle = title || dict.modal.title;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState(lang === "en" ? "+1 " : "+7 ");
  const [isAgreementChecked, setIsAgreementChecked] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
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
        setErrorMsg(data.error || dict.modal.error_send);
        setStatus("error");
        return;
      }

      setStatus("success");
    } catch {
      setErrorMsg(dict.modal.error_conn);
      setStatus("error");
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      <div
        className="relative bg-[#FFE9D2] rounded-[28px] p-7 md:p-9 w-full max-w-[420px] shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-black/10 transition-colors"
          aria-label={dict.modal.close}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M4 4l10 10M14 4L4 14" stroke="#121212" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>

        <h2 className="text-[22px] md:text-[26px] font-black text-[#121212] text-center leading-tight mb-7">
          {modalTitle}
        </h2>

        {status === "success" ? (
          <div className="text-center py-6 flex flex-col items-center gap-4">
            <div className="w-16 h-16 bg-[#F86704] rounded-full flex items-center justify-center">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path d="M8 16l6 6 10-12" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <p className="text-[#121212] font-bold text-[18px]">{dict.modal.success_title}</p>
            <p className="text-[#6b5c4e] text-[14px]">{dict.modal.success_desc}</p>
            <button
              type="button"
              onClick={onClose}
              className="mt-2 w-full bg-[#F86704] text-white font-bold text-[16px] py-4 rounded-xl hover:bg-[#e55a1f] transition-colors"
            >
              {dict.modal.close}
            </button>
          </div>
        ) : (
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder={dict.modal.name}
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
              className="w-full bg-white rounded-xl px-4 py-4 text-[15px] font-medium text-[#121212] placeholder-[#a09080] outline-none border-2 border-transparent focus:border-[#F86704] transition-colors"
            />
            <input
              type="email"
              placeholder={dict.modal.email}
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full bg-white rounded-xl px-4 py-4 text-[15px] font-medium text-[#121212] placeholder-[#a09080] outline-none border-2 border-transparent focus:border-[#F86704] transition-colors"
            />
            <div className="flex items-center gap-2 bg-white rounded-xl px-4 py-4 border-2 border-transparent focus-within:border-[#F86704] transition-colors">
              <span className="text-[13px] font-semibold text-[#6b5c4e]">{lang === "en" ? "US" : "RU"}</span>
              <input
                type="tel"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                required
                className="flex-1 text-[15px] font-medium text-[#121212] placeholder-[#a09080] outline-none bg-transparent"
                placeholder={dict.modal.phone_placeholder}
              />
            </div>

            {status === "error" && <p className="text-red-600 text-[13px] text-center">{errorMsg}</p>}

            <label className="flex items-start gap-3 text-[12px] leading-relaxed text-[#6b5c4e]">
              <input
                type="checkbox"
                checked={isAgreementChecked}
                onChange={(event) => setIsAgreementChecked(event.target.checked)}
                required
                className="mt-0.5 h-4 w-4 flex-shrink-0 rounded border-[#d8c4b1] text-[#F86704] focus:ring-[#F86704]"
              />
              <span>
                {lang === "ru" ? "Я ознакомлен(а) и согласен(на) с условиями " : "I have read and agree to the "}
                <a
                  href={LEGAL_DOCUMENTS.offer.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-[#121212] underline underline-offset-2"
                >
                  {lang === "ru" ? "Договора-оферты" : "Terms of Offer"}
                </a>
                {lang === "ru" ? " и " : " and the "}
                <a
                  href={LEGAL_DOCUMENTS.policy.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-[#121212] underline underline-offset-2"
                >
                  {lang === "ru" ? "Политики конфиденциальности" : "Privacy Policy"}
                </a>
                .
              </span>
            </label>

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full bg-[#F86704] text-white font-bold text-[16px] py-4 rounded-xl hover:bg-[#e55a1f] transition-colors mt-2 disabled:opacity-60"
            >
              {status === "loading" ? dict.modal.sending : dict.modal.submit}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
