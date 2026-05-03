"use client";

import { useState } from "react";
import { FAQ_ITEMS } from "@/app/lib/data";

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="bg-[#fcfbf7] py-14 md:py-16">
      <div className="container-main">
        <div className="text-center mb-8 md:mb-10">
          <h2 className="text-[26px] sm:text-[32px] md:text-[40px] font-black text-[#121212]">
            Часто задаваемые вопросы
          </h2>
        </div>

        <div className="flex flex-col gap-3 max-w-3xl mx-auto">
          {FAQ_ITEMS.map((faq, i) => (
            <div
              key={i}
              className={`rounded-2xl transition-colors ${open === i ? "bg-[#FFE9D2]" : "bg-[#FFE9D2]/60 hover:bg-[#FFE9D2]"}`}
            >
              <button
                type="button"
                className="w-full flex items-center justify-between px-6 py-5 text-left gap-4"
                aria-expanded={open === i}
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className="font-bold text-[#121212] text-[14px] md:text-[16px]">
                  {i + 1}.{faq.q}
                </span>
                <span className={`flex-shrink-0 w-10 h-10 rounded-xl bg-[#F86704] flex items-center justify-center transition-transform ${open === i ? "rotate-45" : ""}`}>
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M9 4V14M4 9H14" stroke="white" strokeWidth="2.2" strokeLinecap="round"/>
                  </svg>
                </span>
              </button>
              {open === i && (
                <div className="px-6 pb-5 text-[#3d2b1f] text-[14px] md:text-[15px] leading-relaxed">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
