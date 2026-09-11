"use client";

import { useEffect, useRef, useState } from "react";
import { YANDEX_METRIKA_COUNTER_ID } from "@/app/lib/analytics";
import { getDictionary, Lang } from "@/app/lib/dictionaries";
import { getLegalDocuments } from "@/app/lib/legal";

type MetrikaWindow = Window & {
  ym?: (counterId: number, method: string, goal: string, params?: Record<string, unknown>) => void;
};

function reachMetrikaGoal(goal: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined") return;

  try {
    (window as MetrikaWindow).ym?.(YANDEX_METRIKA_COUNTER_ID, "reachGoal", goal, params);
  } catch {
    // Analytics must never block or change the lead submission flow.
  }
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  lang?: Lang;
}

export default function LeadModal({ isOpen, onClose, title, lang = "ru" }: Props) {
  const dict = getDictionary(lang);
  const legal = getLegalDocuments(lang);
  const modalTitle = title || dict.modal.title;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState(lang === "en" ? "" : "+7 ");
  const [website, setWebsite] = useState("");
  const [isAgreementChecked, setIsAgreementChecked] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [errorReference, setErrorReference] = useState("");
  const dialogRef = useRef<HTMLDivElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);
  const formStartedAtRef = useRef(0);

  useEffect(() => {
    formStartedAtRef.current = Date.now();
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key === "Tab" && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]):not([tabindex="-1"]), [tabindex]:not([tabindex="-1"])',
        );
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const previouslyFocused = document.activeElement as HTMLElement | null;
    firstInputRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus();
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (status === "loading") return;

    setStatus("loading");
    setErrorMsg("");
    setErrorReference("");
    reachMetrikaGoal("lead_submit_attempt");

    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          email,
          website,
          formStartedAt: formStartedAtRef.current,
        }),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        const reference = typeof data.leadId === "string" ? data.leadId : "";
        setErrorReference(reference);
        setErrorMsg(typeof data.error === "string" ? data.error : dict.modal.error_send);
        setStatus("error");
        reachMetrikaGoal("lead_submit_failed", { status: res.status });
        return;
      }

      setStatus("success");
      reachMetrikaGoal("lead_submit_success");
    } catch {
      setErrorMsg(dict.modal.error_conn);
      setStatus("error");
      reachMetrikaGoal("lead_submit_failed", { status: "network" });
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={modalTitle}
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
                <path
                  d="M8 16l6 6 10-12"
                  stroke="white"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
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
              ref={firstInputRef}
              type="text"
              name="name"
              autoComplete="name"
              placeholder={dict.modal.name}
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
              maxLength={80}
              className="w-full bg-white rounded-xl px-4 py-4 text-[15px] font-medium text-[#121212] placeholder-[#a09080] outline-none border-2 border-transparent focus:border-[#F86704] transition-colors"
            />
            <input
              type="email"
              name="email"
              autoComplete="email"
              placeholder={dict.modal.email}
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              maxLength={120}
              className="w-full bg-white rounded-xl px-4 py-4 text-[15px] font-medium text-[#121212] placeholder-[#a09080] outline-none border-2 border-transparent focus:border-[#F86704] transition-colors"
            />
            <div className="flex items-center gap-2 bg-white rounded-xl px-4 py-4 border-2 border-transparent focus-within:border-[#F86704] transition-colors">
              {lang !== "en" && <span className="text-[13px] font-semibold text-[#6b5c4e]">RU</span>}
              <input
                type="tel"
                name="tel"
                autoComplete="tel"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                required
                maxLength={40}
                className="flex-1 text-[15px] font-medium text-[#121212] placeholder-[#a09080] outline-none bg-transparent"
                placeholder={dict.modal.phone_placeholder}
              />
            </div>

            <div className="absolute left-[-10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
              <label htmlFor="website">Website</label>
              <input
                id="website"
                name="website"
                type="text"
                value={website}
                onChange={(event) => setWebsite(event.target.value)}
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            {status === "error" && (
              <div
                role="alert"
                className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-center text-[13px] text-red-700"
              >
                <p>{errorMsg}</p>
                {errorReference && <p className="mt-1 text-[11px] opacity-80">ID: {errorReference}</p>}
              </div>
            )}

            <label className="flex items-start gap-3 text-[12px] leading-relaxed text-[#6b5c4e]">
              <input
                type="checkbox"
                checked={isAgreementChecked}
                onChange={(event) => setIsAgreementChecked(event.target.checked)}
                required
                className="mt-0.5 h-4 w-4 flex-shrink-0 rounded border-[#d8c4b1] text-[#F86704] focus:ring-[#F86704]"
              />
              <span>
                {lang === "ru"
                  ? "Я ознакомлен(а) и согласен(на) с условиями "
                  : "I have read and agree to the "}
                <a
                  href={legal.offer.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-[#121212] underline underline-offset-2"
                >
                  {lang === "ru" ? "Договора-оферты" : "Terms of Offer"}
                </a>
                {lang === "ru" ? " и " : " and the "}
                <a
                  href={legal.policy.href}
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
