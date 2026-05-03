"use client";

import { useState } from "react";
import Image from "next/image";
import { TEACHERS } from "@/app/lib/data";

const VISIBLE = 3;

export default function Teachers() {
  const [start, setStart] = useState(0);

  const prev = () => setStart((s) => (s - 1 + TEACHERS.length) % TEACHERS.length);
  const next = () => setStart((s) => (s + 1) % TEACHERS.length);

  // 3 карточки, циклически
  const visible = Array.from({ length: VISIBLE }, (_, i) => TEACHERS[(start + i) % TEACHERS.length]);

  return (
    <section id="teachers" className="bg-[#fcfbf7] py-16 md:py-20 overflow-x-hidden">
      <div className="container-main">
        <div className="text-center mb-10 md:mb-14">
          <h2 className="text-[26px] sm:text-[32px] md:text-[40px] font-black text-[#121212] mb-3">
            Вы сможете подобрать преподавателя под ваши цели и задачи
          </h2>
          <p className="text-[#6b5c4e] text-[14px] md:text-[16px] max-w-xl mx-auto">
            Преподаватели проходят строгий отбор: опыт от 3 лет, международные сертификаты, многие живут в Китае.
          </p>
        </div>

        {/* Desktop: 3 cards */}
        <div className="hidden md:grid grid-cols-3 gap-5">
          {visible.map((t, i) => (
            <div key={t.name + i} className="bg-white rounded-2xl p-6 shadow-sm border border-[#f0e8e0] flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-full overflow-hidden flex-shrink-0 bg-[#FFE9D2]">
                  <Image
                    src={t.img}
                    alt={t.name}
                    width={56}
                    height={56}
                    className="object-cover object-top w-full h-full"
                    unoptimized
                  />
                </div>
                <div>
                  <div className="font-black text-[#121212] text-[16px] leading-tight">{t.name}</div>
                  <div className="text-[12px] text-[#F86704] font-semibold mt-0.5">{t.spec}</div>
                </div>
              </div>
              <p className="text-[#3d2b1f] text-[13px] leading-relaxed flex-1">{t.desc}</p>
              <div className="text-[11px] text-[#6b5c4e]">{t.role}</div>
            </div>
          ))}
        </div>

        {/* Mobile: single card */}
        <div className="md:hidden">
          {(() => {
            const t = TEACHERS[start];
            return (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#f0e8e0] flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-full overflow-hidden flex-shrink-0 bg-[#FFE9D2]">
                    <Image src={t.img} alt={t.name} width={56} height={56} className="object-cover object-top w-full h-full" unoptimized />
                  </div>
                  <div>
                    <div className="font-black text-[#121212] text-[16px]">{t.name}</div>
                    <div className="text-[12px] text-[#F86704] font-semibold mt-0.5">{t.spec}</div>
                  </div>
                </div>
                <p className="text-[#3d2b1f] text-[14px] leading-relaxed">{t.desc}</p>
                <div className="text-[11px] text-[#6b5c4e]">{t.role}</div>
              </div>
            );
          })()}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-4 mt-6">
          <button type="button" onClick={prev} aria-label="Предыдущий" className="carousel-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          <div className="flex items-center gap-2">
            {TEACHERS.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setStart(i)}
                aria-label={`Преподаватель ${i + 1}`}
                aria-pressed={i === start}
                className={`carousel-dot ${i === start ? "carousel-dot-active" : "carousel-dot-inactive"}`}
              />
            ))}
          </div>
          <button type="button" onClick={next} aria-label="Следующий" className="carousel-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        </div>
      </div>
    </section>
  );
}
