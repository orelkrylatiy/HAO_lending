"use client";

import { useState } from "react";
import Image from "next/image";

const teachers = [
  {
    name: "Пэн Цзин",
    role: "Преподаватель китайского",
    spec: "Эксперт по HSK",
    desc: "Знает экзамены изнутри. Ведёт авторский курс «HSK за 3 месяца». Более 5 лет преподаёт онлайн.",
    img: "/images/peng-jin.jpg",
  },
  {
    name: "Преподаватель 2",
    role: "Преподаватель китайского",
    spec: "Деловой китайский",
    desc: "Специализируется на бизнес-китайском, ведёт корпоративные группы и индивидуальные занятия.",
    img: null,
  },
  {
    name: "Преподаватель 3",
    role: "Преподаватель китайского",
    spec: "Китайский для детей",
    desc: "Работает с детьми от 7 лет, игровые методики, адаптированные программы.",
    img: null,
  },
  {
    name: "Преподаватель 4",
    role: "Преподаватель китайского",
    spec: "Разговорный китайский",
    desc: "Носитель языка, живёт и работает в Китае, ведёт разговорные клубы и индивидуальные уроки.",
    img: null,
  },
];

export default function Teachers() {
  const [current, setCurrent] = useState(0);
  const visible = 1;
  const total = teachers.length;

  const prev = () => setCurrent((c) => (c - 1 + total) % total);
  const next = () => setCurrent((c) => (c + 1) % total);

  return (
    <section id="teachers" className="bg-[#fcfbf7] py-16 md:py-20">
      <div className="container-main">
        <div className="text-center mb-10 md:mb-14">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#121212] mb-3">
            Вы можете выбрать преподавателя под любую цель
          </h2>
          <p className="text-[#6b5c4e] text-base max-w-xl mx-auto">
            Преподаватели проходят строгий отбор: опыт от 3 лет, международные сертификаты, многие живут в Китае.
          </p>
        </div>

        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-400 ease-in-out"
              style={{ transform: `translateX(-${current * 100}%)` }}
            >
              {teachers.map((t) => (
                <div key={t.name} className="w-full flex-shrink-0 px-2 sm:px-8">
                  <div className="bg-white rounded-2xl shadow-sm border border-[#f0e8e0] flex flex-col md:flex-row gap-6 p-6 md:p-8 max-w-2xl mx-auto">
                    <div className="flex-shrink-0 flex justify-center">
                      <div className="w-36 h-36 md:w-44 md:h-44 rounded-2xl overflow-hidden bg-[#FFE9D2] relative">
                        {t.img ? (
                          <Image
                            src={t.img}
                            alt={t.name}
                            fill
                            className="object-cover"
                            sizes="176px"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-5xl text-[#F86704]">
                            好
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col justify-center text-center md:text-left">
                      <span className="inline-block px-2 py-0.5 rounded-full bg-[#FFE9D2] text-[#F86704] text-xs font-semibold mb-2 self-center md:self-start">
                        {t.spec}
                      </span>
                      <h3 className="text-xl font-bold text-[#121212] mb-1">{t.name}</h3>
                      <p className="text-[#6b5c4e] text-sm mb-1">{t.role}</p>
                      <p className="text-[#3d2b1f] text-sm leading-relaxed">{t.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={prev}
            aria-label="Назад"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 md:-translate-x-5 w-10 h-10 rounded-full bg-white border border-[#e8ddd5] shadow flex items-center justify-center hover:bg-[#FFE9D2] transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M11 4L6 9L11 14" stroke="#F86704" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          <button
            onClick={next}
            aria-label="Вперёд"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 md:translate-x-5 w-10 h-10 rounded-full bg-white border border-[#e8ddd5] shadow flex items-center justify-center hover:bg-[#FFE9D2] transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M7 4L12 9L7 14" stroke="#F86704" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        </div>

        <div className="flex justify-center gap-2 mt-6">
          {teachers.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2.5 h-2.5 rounded-full transition-colors ${i === current ? "bg-[#F86704]" : "bg-[#e8ddd5]"}`}
              aria-label={`Слайд ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
