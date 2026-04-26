"use client";

import { useState } from "react";
import Image from "next/image";

const programs = [
  {
    id: "hsk",
    title: "HSK за 3 месяца",
    tag: "курс-бестселлер",
    features: ["Подготовка к HSK 1–6", "Авторские материалы НАО", "Еженедельные пробные тесты"],
    img: "/images/prog-hsk.webp",
  },
  {
    id: "kids",
    title: "Китайский для детей",
    tag: "от 7 лет",
    features: ["Игровая форма обучения", "Адаптированные материалы", "Терпеливые преподаватели"],
    img: "/images/prog-kids.webp",
  },
  {
    id: "work",
    title: "Китайский для работы",
    tag: "карьера и бизнес",
    features: ["Деловой китайский", "Переговоры и документы", "Профессиональная лексика"],
    img: "/images/prog-work.webp",
  },
  {
    id: "travel",
    title: "Китайский для путешествий",
    tag: "без границ",
    features: ["Разговорный китайский", "Туристические фразы", "Культура и традиции"],
    img: "/images/prog-travel.webp",
  },
  {
    id: "individual",
    title: "Индивидуальные занятия",
    tag: "под вашу цель",
    features: ["Личная программа", "Удобное расписание", "Максимальный результат"],
    img: "/images/prog-individual.webp",
  },
  {
    id: "group",
    title: "Мини-группы",
    tag: "с одним уровнем",
    features: ["Небольшие группы", "Живое общение", "Доступная цена"],
    img: "/images/program-group.png",
  },
];

export default function Programs() {
  const [active, setActive] = useState(0);

  const current = programs[active];

  return (
    <section id="programs" className="bg-[#fff8f3] py-16 md:py-20">
      <div className="container-main">
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-[28px] sm:text-[36px] md:text-[44px] font-black text-[#121212] mb-3">
            Программы для любых целей
          </h2>
          <p className="text-[#6b5c4e] text-[15px] md:text-[17px]">
            Занимайтесь онлайн с преподавателями прямо из Китая
          </p>
        </div>

        {/* Desktop 3-col layout */}
        <div className="hidden md:grid grid-cols-[280px_1fr_260px] gap-5">
          {/* Left: teacher card */}
          <div className="bg-[#FFE9D2] rounded-2xl overflow-hidden flex flex-col">
            <div className="flex-1 relative min-h-[280px]">
              <Image
                src="/images/peng-jin-photo.jpg"
                alt="Пэн Цзин"
                fill
                className="object-cover object-top"
                sizes="280px"
              />
            </div>
            <div className="p-5">
              <div className="font-black text-[#121212] text-[18px]">Пэн Цзин</div>
              <div className="text-[#6b5c4e] text-[13px] mt-1">Эксперт по HSK · знает экзамены изнутри</div>
              {active === 0 && (
                <div className="mt-2 inline-block bg-[#F86704] text-white text-[11px] font-bold px-3 py-1 rounded-full">
                  курс-бестселлер
                </div>
              )}
            </div>
          </div>

          {/* Center: active program */}
          <div className="bg-white rounded-2xl p-7 flex flex-col shadow-sm border border-[#f0e8e0]">
            <div className="mb-4">
              <span className="bg-[#F86704] text-white text-[12px] font-bold px-3 py-1.5 rounded-full">
                {current.tag}
              </span>
            </div>
            <h3 className="text-[26px] font-black text-[#121212] mb-5">{current.title}</h3>
            <div className="flex-1">
              {current.img && (
                <div className="w-full h-44 relative mb-5 rounded-xl overflow-hidden bg-[#FFE9D2]">
                  <Image src={current.img} alt={current.title} fill className="object-contain p-2" sizes="400px" unoptimized />
                </div>
              )}
              <ul className="flex flex-col gap-3">
                {current.features.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-[15px] text-[#3d2b1f]">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="flex-shrink-0">
                      <circle cx="10" cy="10" r="10" fill="#FFE9D2"/>
                      <path d="M6 10l3 3 5-5" stroke="#F86704" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right: program selector tabs */}
          <div className="flex flex-col gap-2">
            {programs.map((p, i) => (
              <button
                key={p.id}
                onClick={() => setActive(i)}
                className={`w-full text-left px-4 py-3.5 rounded-xl font-semibold text-[14px] transition-all ${
                  i === active
                    ? "bg-[#F86704] text-white shadow-sm"
                    : "bg-[#FFE9D2] text-[#121212] hover:bg-[#ffd9b3]"
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
          {programs.map((p, i) => (
            <div key={p.id} className={`rounded-2xl p-5 flex flex-col gap-3 ${i === 0 ? "bg-[#F86704] text-white" : "bg-white border border-[#f0e8e0]"}`}>
              {p.img && (
                <div className={`w-full h-36 relative rounded-xl overflow-hidden ${i === 0 ? "bg-white/20" : "bg-[#FFE9D2]"}`}>
                  <Image src={p.img} alt={p.title} fill className="object-contain p-2" sizes="300px" unoptimized />
                </div>
              )}
              <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full self-start ${i === 0 ? "bg-white/20 text-white" : "bg-[#FFE9D2] text-[#F86704]"}`}>
                {p.tag}
              </span>
              <h3 className={`font-black text-[17px] leading-tight ${i === 0 ? "text-white" : "text-[#121212]"}`}>{p.title}</h3>
            </div>
          ))}
        </div>

        {/* Full-width CTA */}
        <div className="mt-8">
          <a
            href="#pricing"
            className="flex items-center justify-center gap-3 w-full bg-[#F86704] text-white font-bold text-[17px] py-5 rounded-2xl hover:bg-[#e55a1f] transition-colors"
          >
            Записаться на бесплатный урок →
          </a>
        </div>
      </div>
    </section>
  );
}
