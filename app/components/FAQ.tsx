"use client";

import { useState } from "react";

const faqs = [
  {
    q: "Можно ли заниматься в удобное время?",
    a: "Да, мы подбираем расписание индивидуально. Занятия доступны 7 дней в неделю.",
  },
  {
    q: "Сколько длится одно занятие?",
    a: "Стандартное занятие — 60 минут. Возможны занятия по 45 минут для детей.",
  },
  {
    q: "Какие преподаватели у вас?",
    a: "Наши преподаватели — носители языка и русскоязычные эксперты, многие живут в Китае. Опыт от 3 лет, международные сертификаты.",
  },
  {
    q: "Сколько времени нужно, чтобы заговорить?",
    a: "При регулярных занятиях — первые результаты заметны уже через 2–3 месяца.",
  },
  {
    q: "Какие материалы используются?",
    a: "Авторские программы НАО + современные онлайн-ресурсы. Никаких скучных учебников.",
  },
  {
    q: "Подходит ли курс детям?",
    a: "Да, у нас есть программы для школьников от 7 лет и подростков. Игровой формат, адаптированные материалы.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="bg-[#fff8f3] py-14 md:py-16">
      <div className="container-main max-w-2xl">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#121212]">
            Часто задаваемые вопросы
          </h2>
        </div>

        <div className="flex flex-col gap-2">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="bg-white rounded-xl border border-[#f0e8e0] overflow-hidden"
            >
              <button
                className="w-full flex items-center justify-between px-5 py-4 text-left gap-4"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className="font-semibold text-[#121212] text-sm md:text-base">
                  {faq.q}
                </span>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  className={`flex-shrink-0 transition-transform ${open === i ? "rotate-180" : ""}`}
                >
                  <path d="M5 7.5L10 12.5L15 7.5" stroke="#F86704" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              {open === i && (
                <div className="px-5 pb-4 text-[#6b5c4e] text-sm leading-relaxed border-t border-[#f0e8e0] pt-3">
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
