"use client";

import { useState } from "react";

const reviews = [
  {
    name: "Мария",
    role: "новичок",
    text: "Никогда раньше не учила китайский и думала, что это слишком сложно. Но с этой школой всё оказалось реально! Уроки простые, логичные, много практики. Преподаватели терпеливые, всегда отвечают на вопросы и поддерживают. Уже через месяц могу составлять простые предложения и понимать базовые фразы. Очень вдохновляет видеть прогресс!",
  },
  {
    name: "Алексей",
    role: "бизнес",
    text: "Нужен был деловой китайский для работы с партнёрами. Программа полностью под мои задачи — за 4 месяца смог провести первые переговоры на китайском. Преподаватель профессионал, занятия в удобное для меня время.",
  },
  {
    name: "Екатерина",
    role: "путешественница",
    text: "Готовилась к поездке в Китай и хотела хотя бы базовый разговорный уровень. Уже после 6 уроков могла общаться в магазинах и кафе. Преподаватель из Китая — это огромный плюс, сразу слышишь живой язык!",
  },
  {
    name: "Дмитрий",
    role: "студент",
    text: "Готовился к HSK 3 с нуля за 3 месяца по авторскому курсу. Сдал с первого раза! Еженедельные пробные тесты очень помогли привыкнуть к формату экзамена. Рекомендую всем, кто хочет быстрый результат.",
  },
];

export default function Reviews() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c - 1 + reviews.length) % reviews.length);
  const next = () => setCurrent((c) => (c + 1) % reviews.length);

  return (
    <section id="reviews" className="bg-[#fff8f3] py-16 md:py-20">
      <div className="container-main">
        <div className="text-center mb-10 md:mb-14">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="text-[#F86704] font-bold text-xl">Нам доверяют:</span>
            <span className="text-2xl font-bold text-[#121212]">более 500</span>
            <span className="text-[#6b5c4e]">студентов</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#121212]">
            Отзывы наших студентов
          </h2>
        </div>

        <div className="relative max-w-2xl mx-auto">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-400 ease-in-out"
              style={{ transform: `translateX(-${current * 100}%)` }}
            >
              {reviews.map((r) => (
                <div key={r.name} className="w-full flex-shrink-0 px-2">
                  <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-[#f0e8e0]">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-10 h-10 rounded-full bg-[#FFE9D2] flex items-center justify-center text-[#F86704] font-bold text-lg">
                        {r.name[0]}
                      </div>
                      <div>
                        <div className="font-bold text-[#121212]">{r.name}</div>
                        <div className="text-xs text-[#6b5c4e]">{r.role}</div>
                      </div>
                      <div className="ml-auto flex gap-0.5">
                        {[1,2,3,4,5].map((s) => (
                          <svg key={s} width="16" height="16" viewBox="0 0 16 16" fill="#F86704"><path d="M8 1.5l1.75 3.55 3.92.57-2.84 2.77.67 3.9L8 10.35l-3.5 1.94.67-3.9L2.33 5.62l3.92-.57z"/></svg>
                        ))}
                      </div>
                    </div>
                    <p className="text-[#3d2b1f] text-sm md:text-base leading-relaxed">{r.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={prev}
            aria-label="Назад"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 w-10 h-10 rounded-full bg-white border border-[#e8ddd5] shadow flex items-center justify-center hover:bg-[#FFE9D2] transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M11 4L6 9L11 14" stroke="#F86704" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          <button
            onClick={next}
            aria-label="Вперёд"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 w-10 h-10 rounded-full bg-white border border-[#e8ddd5] shadow flex items-center justify-center hover:bg-[#FFE9D2] transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M7 4L12 9L7 14" stroke="#F86704" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        </div>

        <div className="flex justify-center gap-2 mt-6">
          {reviews.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2.5 h-2.5 rounded-full transition-colors ${i === current ? "bg-[#F86704]" : "bg-[#e8ddd5]"}`}
              aria-label={`Отзыв ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
