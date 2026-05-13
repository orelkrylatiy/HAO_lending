"use client";
import { useState } from "react";
import Image from "next/image";
import { getDictionary, Lang } from "@/app/lib/dictionaries";

export default function Programs({ lang = "ru" }: { lang?: Lang }) {
  const dict = getDictionary(lang);
  const [active, setActive] = useState(0);

  const current = dict.data.PROGRAMS[active];

  return (
    <section id="programs" className="bg-[#fff8f3] py-14 md:py-16">
      <div className="container-main">
        <div className="text-center mb-12 md:mb-14">
          <h2 className="text-[34px] sm:text-[42px] md:text-[56px] font-black text-[#121212] mb-4 leading-tight">
            {dict.programs_sec.title}
          </h2>
          <p className="text-[#6b5c4e] text-[17px] md:text-[20px]">
            {dict.programs_sec.desc}
          </p>
        </div>

        {/* Desktop 3-col layout */}
        <div className="hidden md:grid grid-cols-[280px_1fr_270px] gap-6 items-stretch">
          <div className="bg-[#FFE9D2] rounded-2xl overflow-hidden flex flex-col">
            <div className="flex-1 relative min-h-75">
              <Image src="/images/teachers/teacher-siqin.webp" alt={dict.programs_sec.teacher_name} fill className="object-cover object-center pointer-events-none" sizes="280px" unoptimized />
            </div>
            <div className="p-5">
              <div className="font-black text-[#121212] text-[18px]">{dict.programs_sec.teacher_name}</div>
              <div className="text-[#6b5c4e] text-[13px] mt-1">{dict.programs_sec.teacher_spec}</div>
              {active === 0 && (
                <div className="mt-2 badge-light">{dict.programs_sec.bestseller}</div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-7 flex flex-col shadow-sm border border-[#f0e8e0]">
            <div className="mb-4">
              <span className="bg-[#F86704] text-white text-[12px] font-bold px-3 py-1.5 rounded-full">
                {current.tag}
              </span>
            </div>
            <h3 className="text-[30px] font-black text-[#121212] mb-5">{current.title}</h3>
            <div className="flex-1">
              <div className="w-full h-48 relative mb-5 rounded-xl overflow-hidden bg-[#FFE9D2]">
                <Image src={current.img} alt={current.title} fill className="object-contain p-2 pointer-events-none" sizes="400px" unoptimized />
              </div>
              <ul className="flex flex-col gap-3">
                {current.features.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-[15px] text-[#3d2b1f]">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="shrink-0">
                      <circle cx="10" cy="10" r="10" fill="#FFE9D2"/>
                      <path d="M6 10l3 3 5-5" stroke="#F86704" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-[#FFE9D2] rounded-2xl p-3 flex flex-col gap-2">
            {dict.data.PROGRAMS.map((p, i) => (
              <button
                key={p.id}
                onClick={() => setActive(i)}
                className={`relative z-10 w-full text-left px-4 py-4 rounded-xl font-semibold text-[15px] transition-all ${
                  i === active ? "bg-[#F86704] text-white shadow-sm" : "bg-white/55 text-[#121212] hover:bg-white/80"
                }`}
              >
                <div className="font-bold">{p.title}</div>
                <div className={`text-[11px] mt-0.5 ${i === active ? "text-white/80" : "text-[#6b5c4e]"}`}>{p.tag}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Mobile: grid of cards */}
        <div className="md:hidden grid grid-cols-1 sm:grid-cols-2 gap-4">
          {dict.data.PROGRAMS.map((p, i) => (
            <div key={p.id} className={`rounded-2xl p-5 flex flex-col gap-3 ${i === 0 ? "bg-[#F86704] text-white" : "bg-white border border-[#f0e8e0]"}`}>
              <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full self-start ${i === 0 ? "bg-white/20 text-white" : "bg-[#FFE9D2] text-[#F86704]"}`}>
                {p.tag}
              </span>
              <h3 className={`font-black text-[17px] leading-tight ${i === 0 ? "text-white" : "text-[#121212]"}`}>{p.title}</h3>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <button 
            type="button"
            onClick={() => {
              document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="btn-primary relative z-10 flex w-full text-[17px] py-5 rounded-2xl gap-3 justify-center"
          >
            {dict.hero.cta} →
          </button>
        </div>
      </div>
    </section>
  );
}
