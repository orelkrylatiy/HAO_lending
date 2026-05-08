"use client";

import { useState } from "react";
import Image from "next/image";
import { REVIEWS } from "@/app/lib/data";

const VISIBLE = 3;

export default function Reviews() {
  const [start, setStart] = useState(0);

  const prev = () => setStart((s) => (s - 1 + REVIEWS.length) % REVIEWS.length);
  const next = () => setStart((s) => (s + 1) % REVIEWS.length);

  const visible = Array.from({ length: VISIBLE }, (_, i) => REVIEWS[(start + i) % REVIEWS.length]);

  return (
    <section id="reviews" className="bg-[#fff8f3] py-16 md:py-24">
      <div className="container-main">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-[30px] sm:text-[38px] md:text-[44px] font-black text-[#121212] uppercase tracking-normal">
            Отзывы наших студентов
          </h2>
        </div>

        {/* Desktop: 3 cards */}
        <div className="hidden md:grid grid-cols-3 gap-5">
          {visible.map((r, i) => (
            <div key={r.name + i} className="bg-[#FFE9D2] rounded-none p-7 flex flex-col justify-between min-h-80">
              <p className="text-[#3d2b1f] text-[16px] leading-relaxed flex-1 mb-6">
                &ldquo;{r.text}&rdquo;
              </p>
              <div className="flex items-center gap-4 pt-4 border-t border-[#f0cfae]">
                <Image
                  src={r.photo}
                  alt={r.name}
                  width={44}
                  height={44}
                  className="h-11 w-11 rounded-full object-cover border border-[#f0cfae]"
                  unoptimized
                />
                <div>
                  <div className="font-bold text-[#121212] text-[16px]">{r.name}</div>
                  <div className="text-[13px] text-[#6b5c4e]">{r.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile: single card */}
        <div className="md:hidden">
          {(() => {
            const r = REVIEWS[start];
            return (
              <div className="bg-[#FFE9D2] rounded-2xl p-6 flex flex-col justify-between min-h-80">
                <p className="text-[#3d2b1f] text-[14px] leading-relaxed flex-1 mb-5">
                  &ldquo;{r.text}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-[#f0cfae]">
                  <Image
                    src={r.photo}
                    alt={r.name}
                    width={40}
                    height={40}
                    className="h-10 w-10 rounded-full object-cover border border-[#f0cfae]"
                    unoptimized
                  />
                  <div>
                    <div className="font-bold text-[#121212] text-[14px]">{r.name}</div>
                    <div className="text-[12px] text-[#6b5c4e]">{r.role}</div>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>

        {/* Navigation */}
        <div className="relative z-30 flex items-center justify-center gap-4 mt-8 pointer-events-auto">
          <button type="button" onClick={prev} aria-label="Предыдущий" className="carousel-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          <div className="flex items-center gap-2">
            {REVIEWS.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setStart(i)}
                aria-label={`Отзыв ${i + 1}`}
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
