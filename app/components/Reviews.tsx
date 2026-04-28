"use client";

import { useState } from "react";
import Image from "next/image";
import { REVIEWS } from "@/app/lib/data";
import { CarouselNav } from "@/app/components/ui/CarouselNav";

export default function Reviews() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c - 1 + REVIEWS.length) % REVIEWS.length);
  const next = () => setCurrent((c) => (c + 1) % REVIEWS.length);

  const r = REVIEWS[current];

  return (
    <section id="reviews" className="bg-[#fff8f3] py-14 md:py-20">
      <div className="container-main">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-[26px] sm:text-[32px] md:text-[40px] font-black text-[#121212]">
            Отзывы наших студентов
          </h2>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-sm border border-[#f0e8e0] p-7 md:p-9 flex flex-col h-[300px]">
            <p className="text-[#3d2b1f] text-[15px] md:text-[16px] leading-relaxed flex-1 overflow-hidden">
              &ldquo;{r.text}&rdquo;
            </p>

            <div className="flex items-center justify-between pt-5 border-t border-[#f0e8e0] flex-shrink-0 mt-5">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0 bg-[#FFE9D2]">
                  <Image src={r.photo} alt={r.name} width={36} height={36} className="object-cover w-full h-full" />
                </div>
                <div>
                  <div className="font-bold text-[#121212] text-[14px]">{r.name}</div>
                  <div className="text-[12px] text-[#6b5c4e]">{r.role}</div>
                </div>
              </div>

              <CarouselNav
                onPrev={prev}
                onNext={next}
                total={REVIEWS.length}
                current={current}
                onSelect={setCurrent}
                dotLabel="Отзыв"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
