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
    <section id="teachers" className="bg-[#fcfbf7] py-14 md:py-20 overflow-x-hidden">
      <div className="container-main">
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-[30px] sm:text-[38px] md:text-[44px] font-black text-[#121212] mb-5 leading-tight">
            Вы сможете подобрать преподавателя под ваши цели и задачи
          </h2>
          <p className="text-[#6b5c4e] text-[17px] md:text-[20px] max-w-2xl mx-auto leading-relaxed">
            Преподаватели проходят строгий отбор: опыт от 3 лет, международные сертификаты, многие живут в Китае.
          </p>
        </div>

        {/* Wide desktop: 3 cards */}
        <div className="hidden xl:grid grid-cols-3 gap-5">
          {visible.map((t, i) => (
            <div key={t.name + i} className="bg-[#FFE9D2] rounded-2xl p-6 shadow-sm border border-[#f0e8e0] min-h-[260px] flex flex-col">
              <div className="mb-5">
                <div className="font-black text-[#121212] text-[20px] leading-tight">{t.name}</div>
                <div className="text-[14px] text-[#3d2b1f] font-semibold mt-1">{t.spec}</div>
              </div>
              <div className="grid grid-cols-[150px_1fr] gap-5 items-end flex-1">
                <div className="relative h-[190px] rounded-xl overflow-hidden bg-white/45">
                  <Image
                    src={t.img}
                    alt=""
                    fill
                    className="object-cover object-center blur-xl scale-110 opacity-45"
                    sizes="150px"
                    aria-hidden="true"
                    unoptimized
                  />
                  <Image
                    src={t.img}
                    alt={t.name}
                    fill
                    className="object-contain object-center relative z-10"
                    sizes="150px"
                    unoptimized
                  />
                </div>
                <div className="flex flex-col justify-between h-full">
                  <p className="text-[#3d2b1f] text-[15px] leading-snug">{t.desc}</p>
                  <div className="text-[12px] text-[#6b5c4e] mt-4">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Narrow and tablet: single card */}
        <div className="xl:hidden max-w-3xl mx-auto">
          {(() => {
            const t = TEACHERS[start];
            return (
              <div className="bg-[#FFE9D2] rounded-2xl p-6 shadow-sm border border-[#f0e8e0] flex flex-col gap-4">
                <div>
                  <div className="font-black text-[#121212] text-[20px]">{t.name}</div>
                  <div className="text-[14px] text-[#3d2b1f] font-semibold mt-1">{t.spec}</div>
                </div>
                <div className="relative h-72 md:h-[420px] rounded-xl overflow-hidden bg-white/45">
                  <Image
                    src={t.img}
                    alt=""
                    fill
                    className="object-cover object-center blur-xl scale-110 opacity-45"
                    sizes="100vw"
                    aria-hidden="true"
                    unoptimized
                  />
                  <Image src={t.img} alt={t.name} fill className="object-contain object-center relative z-10" sizes="100vw" unoptimized />
                </div>
                <p className="text-[#3d2b1f] text-[14px] leading-relaxed">{t.desc}</p>
                <div className="text-[11px] text-[#6b5c4e]">{t.role}</div>
              </div>
            );
          })()}
        </div>

        {/* Navigation */}
        <div className="relative z-30 flex items-center justify-center gap-4 mt-6 pointer-events-auto">
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
                className="relative z-30 w-7 h-7 flex items-center justify-center"
              >
                <span className={`carousel-dot ${i === start ? "carousel-dot-active" : "carousel-dot-inactive"}`} />
              </button>
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
