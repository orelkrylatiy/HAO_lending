"use client";

import { useState } from "react";

const reviews = [
  {
    name: "Мария",
    role: "Новичок",
    text: "Никогда раньше не учила китайский и думала, что это слишком сложно. Но с этой школой всё оказалось реально! Уроки простые, логичные, много практики. Преподаватели терпеливые, всегда отвечают на вопросы и поддерживают. Уже через месяц могу составлять простые предложения и понимать базовые фразы.",
  },
  {
    name: "Алексей",
    role: "Деловой китайский",
    text: "Нужен был деловой китайский для работы с партнёрами. Программа полностью под мои задачи — за 4 месяца смог провести первые переговоры на китайском. Преподаватель профессионал, занятия в удобное для меня время.",
  },
  {
    name: "Екатерина",
    role: "Путешествия",
    text: "Готовилась к поездке в Китай и хотела хотя бы базовый разговорный уровень. Уже после 6 уроков могла общаться в магазинах и кафе. Преподаватель из Китая — это огромный плюс, сразу слышишь живой язык!",
  },
  {
    name: "Дмитрий",
    role: "Подготовка к HSK",
    text: "Готовился к HSK 3 с нуля за 3 месяца по авторскому курсу. Сдал с первого раза! Еженедельные пробные тесты очень помогли привыкнуть к формату экзамена. Рекомендую всем, кто хочет быстрый результат.",
  },
];

export default function Reviews() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c - 1 + reviews.length) % reviews.length);
  const next = () => setCurrent((c) => (c + 1) % reviews.length);

  const r = reviews[current];

  return (
    <section id="reviews" className="bg-[#fff8f3] py-14 md:py-20">
      <div className="container-main">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-[26px] sm:text-[32px] md:text-[40px] font-black text-[#121212]">
            Отзывы наших студентов
          </h2>
        </div>

        <div className="max-w-2xl mx-auto">
          {/* Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-[#f0e8e0] p-7 md:p-9 min-h-[260px] flex flex-col justify-between">
            <p className="text-[#3d2b1f] text-[15px] md:text-[16px] leading-relaxed mb-6">
              &ldquo;{r.text}&rdquo;
            </p>
            <div className="flex items-center gap-3 pt-5 border-t border-[#f0e8e0]">
              <div className="w-9 h-9 rounded-full bg-[#FFE9D2] flex items-center justify-center text-[#F86704] font-black text-[14px] flex-shrink-0">
                {r.name[0]}
              </div>
              <div>
                <div className="font-bold text-[#121212] text-[14px]">{r.name}</div>
                <div className="text-[12px] text-[#6b5c4e]">{r.role}</div>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between mt-5">
            <div className="flex gap-2">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  aria-label={`Отзыв ${i + 1}`}
                  className={`w-2.5 h-2.5 rounded-full transition-colors ${i === current ? "bg-[#F86704]" : "bg-[#e8ddd5]"}`}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <button
                onClick={prev}
                aria-label="Назад"
                className="w-11 h-11 rounded-full bg-[#121212] flex items-center justify-center hover:bg-[#333] transition-colors"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M4.748 11.416C4.417 11.738 4.417 12.262 4.748 12.584L9.554 17.258C9.886 17.581 10.424 17.581 10.756 17.258C11.088 16.935 11.088 16.412 10.756 16.09L7.4 12.826H18.65C19.12 12.826 19.5 12.456 19.5 12C19.5 11.544 19.12 11.174 18.65 11.174H7.4L10.756 7.91C11.088 7.588 11.088 7.065 10.756 6.742C10.424 6.419 9.886 6.419 9.554 6.742L4.748 11.416Z" fill="white"/></svg>
              </button>
              <button
                onClick={next}
                aria-label="Вперёд"
                className="w-11 h-11 rounded-full bg-[#121212] flex items-center justify-center hover:bg-[#333] transition-colors"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M14.445 6.742L19.251 11.416C19.583 11.738 19.583 12.262 19.251 12.584L14.445 17.258C14.114 17.581 13.576 17.581 13.244 17.258C12.912 16.935 12.912 16.412 13.244 16.09L16.6 12.826H5.35C4.88 12.826 4.5 12.456 4.5 12C4.5 11.544 4.88 11.174 5.35 11.174H16.6L13.244 7.91C12.912 7.588 12.912 7.065 13.244 6.742C13.576 6.419 14.114 6.419 14.445 6.742Z" fill="white"/></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
