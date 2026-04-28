"use client";

import { useState } from "react";
import Image from "next/image";
import { TEACHERS } from "@/app/lib/data";
import { CarouselNav } from "@/app/components/ui/CarouselNav";

export default function Teachers() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c - 1 + TEACHERS.length) % TEACHERS.length);
  const next = () => setCurrent((c) => (c + 1) % TEACHERS.length);

  const t = TEACHERS[current];

  return (
    <section id="teachers" className="bg-[#fcfbf7] py-16 md:py-20 overflow-x-hidden">
      <div className="container-main">
        <div className="text-center mb-10 md:mb-14">
          <h2 className="text-[26px] sm:text-[32px] md:text-[40px] font-black text-[#121212] mb-3">
            Вы можете выбрать преподавателя под любую цель
          </h2>
          <p className="text-[#6b5c4e] text-[14px] md:text-[16px] max-w-xl mx-auto">
            Преподаватели проходят строгий отбор: опыт от 3 лет, международные сертификаты, многие живут в Китае.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="bg-white shadow-sm border border-[#f0e8e0] rounded-2xl overflow-hidden flex flex-col md:flex-row min-h-[220px]">
            <div className="md:w-52 flex-shrink-0">
              <div className="w-full h-56 md:h-full relative bg-[#FFE9D2]">
                <Image
                  key={t.img}
                  src={t.img}
                  alt={t.name}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 100vw, 208px"
                  unoptimized
                />
              </div>
            </div>
            <div className="flex-1 p-6 md:p-8 flex flex-col justify-center">
              <span className="badge-light mb-3">{t.spec}</span>
              <h3 className="text-[22px] font-black text-[#121212] mb-1">{t.name}</h3>
              <p className="text-[#6b5c4e] text-[13px] mb-3">{t.role}</p>
              <p className="text-[#3d2b1f] text-[14px] leading-relaxed">{t.desc}</p>
            </div>
          </div>

          <div className="flex items-center justify-between mt-5 px-1">
            <CarouselNav
              onPrev={prev}
              onNext={next}
              total={TEACHERS.length}
              current={current}
              onSelect={setCurrent}
              dotLabel="Преподаватель"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
