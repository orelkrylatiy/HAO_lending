"use client";

import { useState } from "react";
import Image from "next/image";

const teachers = [
  {
    name: "Пэн Цзин",
    role: "Преподаватель китайского",
    spec: "Эксперт по HSK",
    desc: "Знает экзамены изнутри. Ведёт авторский курс «HSK за 3 месяца». Более 5 лет преподаёт онлайн.",
    img: "/images/peng-jin-photo.jpg",
  },
  {
    name: "Преподаватель 2",
    role: "Преподаватель китайского",
    spec: "Деловой китайский",
    desc: "Специализируется на бизнес-китайском, ведёт корпоративные группы и индивидуальные занятия.",
    img: null,
    initials: "П2",
  },
  {
    name: "Преподаватель 3",
    role: "Преподаватель китайского",
    spec: "Китайский для детей",
    desc: "Работает с детьми от 7 лет, игровые методики, адаптированные программы.",
    img: null,
    initials: "П3",
  },
  {
    name: "Преподаватель 4",
    role: "Преподаватель китайского",
    spec: "Разговорный китайский",
    desc: "Носитель языка, живёт и работает в Китае, ведёт разговорные клубы и индивидуальные уроки.",
    img: null,
    initials: "П4",
  },
];

export default function Teachers() {
  const [current, setCurrent] = useState(0);
  const total = teachers.length;

  const prev = () => setCurrent((c) => (c - 1 + total) % total);
  const next = () => setCurrent((c) => (c + 1) % total);

  return (
    <section id="teachers" className="bg-[#fcfbf7] py-16 md:py-20">
      <div className="container-main">
        <div className="text-center mb-10 md:mb-14">
          <h2 className="text-[26px] sm:text-[32px] md:text-[40px] font-black text-[#121212] mb-3">
            Вы можете выбрать преподавателя под любую цель
          </h2>
          <p className="text-[#6b5c4e] text-[14px] md:text-[16px] max-w-xl mx-auto">
            Преподаватели проходят строгий отбор: опыт от 3 лет, международные сертификаты, многие живут в Китае.
          </p>
        </div>

        <div className="relative max-w-2xl mx-auto">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${current * 100}%)` }}
            >
              {teachers.map((t) => (
                <div key={t.name} className="w-full flex-shrink-0 px-1">
                  <div className="bg-white rounded-2xl shadow-sm border border-[#f0e8e0] flex flex-col md:flex-row gap-0 overflow-hidden">
                    {/* Photo */}
                    <div className="md:w-52 flex-shrink-0">
                      <div className="w-full h-52 md:h-full relative bg-[#FFE9D2]">
                        {t.img ? (
                          <Image src={t.img} alt={t.name} fill className="object-cover object-top" sizes="208px" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-[#F86704] text-4xl font-black">
                            {t.initials}
                          </div>
                        )}
                      </div>
                    </div>
                    {/* Info */}
                    <div className="flex-1 p-6 md:p-8 flex flex-col justify-center">
                      <span className="inline-block px-3 py-1 rounded-full bg-[#FFE9D2] text-[#F86704] text-[11px] font-bold mb-3 self-start">
                        {t.spec}
                      </span>
                      <h3 className="text-[22px] font-black text-[#121212] mb-1">{t.name}</h3>
                      <p className="text-[#6b5c4e] text-[13px] mb-3">{t.role}</p>
                      <p className="text-[#3d2b1f] text-[14px] leading-relaxed">{t.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Arrows */}
          <button
            onClick={prev}
            aria-label="Назад"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 w-11 h-11 rounded-full bg-[#121212] flex items-center justify-center hover:bg-[#333] transition-colors shadow-md"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M4.748 11.416C4.417 11.738 4.417 12.262 4.748 12.584L9.554 17.258C9.886 17.581 10.424 17.581 10.756 17.258C11.088 16.935 11.088 16.412 10.756 16.09L7.4 12.826H18.65C19.12 12.826 19.5 12.456 19.5 12C19.5 11.544 19.12 11.174 18.65 11.174H7.4L10.756 7.91C11.088 7.588 11.088 7.065 10.756 6.742C10.424 6.419 9.886 6.419 9.554 6.742L4.748 11.416Z" fill="white"/></svg>
          </button>
          <button
            onClick={next}
            aria-label="Вперёд"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 w-11 h-11 rounded-full bg-[#121212] flex items-center justify-center hover:bg-[#333] transition-colors shadow-md"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M14.445 6.742L19.251 11.416C19.583 11.738 19.583 12.262 19.251 12.584L14.445 17.258C14.114 17.581 13.576 17.581 13.244 17.258C12.912 16.935 12.912 16.412 13.244 16.09L16.6 12.826H5.35C4.88 12.826 4.5 12.456 4.5 12C4.5 11.544 4.88 11.174 5.35 11.174H16.6L13.244 7.91C12.912 7.588 12.912 7.065 13.244 6.742C13.576 6.419 14.114 6.419 14.445 6.742Z" fill="white"/></svg>
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {teachers.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2.5 h-2.5 rounded-full transition-colors ${i === current ? "bg-[#F86704]" : "bg-[#e8ddd5]"}`}
              aria-label={`Преподаватель ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
