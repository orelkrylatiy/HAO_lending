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

  const r = reviews[current];

  return (
    <section id="reviews" className="bg-[#fff8f3] py-16 md:py-20 overflow-hidden relative">
      {/* Watermark background text */}
      <div className="absolute inset-0 flex flex-col justify-center pointer-events-none select-none overflow-hidden">
        <p className="text-[40px] sm:text-[60px] md:text-[80px] font-black text-[#F86704]/10 whitespace-nowrap leading-tight text-center px-4">
          Нам доверяют: уже более 500
        </p>
        <p className="text-[40px] sm:text-[60px] md:text-[80px] font-black text-[#F86704]/10 whitespace-nowrap leading-tight text-center px-4">
          студентов выбрали нашу школу
        </p>
      </div>

      <div className="container-main relative z-10">
        <div className="text-center mb-10">
          <p className="text-[15px] font-bold text-[#6b5c4e] mb-1">Нам доверяют:</p>
          <h2 className="text-[26px] sm:text-[32px] md:text-[40px] font-black text-[#121212]">
            уже более <span className="text-[#F86704]">500</span> студентов выбрали нашу школу
          </h2>
        </div>

        {/* Review card — 2-column style */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-[#FFE9D2] rounded-2xl overflow-hidden flex flex-col md:flex-row shadow-sm">
            {/* Left: name/role */}
            <div className="md:w-56 flex-shrink-0 p-6 md:p-8 flex flex-col justify-between">
              <div>
                <div className="text-[20px] font-black text-[#121212] mb-1">{r.name}</div>
                <div className="text-[12px] font-bold uppercase tracking-widest text-[#6b5c4e]">{r.role}</div>
              </div>
            </div>
            {/* Right: text */}
            <div className="flex-1 bg-white p-6 md:p-8 flex flex-col gap-5">
              <p className="text-[#3d2b1f] text-[14px] md:text-[15px] leading-relaxed">{r.text}</p>
              <div className="flex items-center gap-3 pt-2 border-t border-[#f0e8e0]">
                <div className="w-9 h-9 rounded-full bg-[#FFE9D2] flex items-center justify-center text-[#F86704] font-black">
                  {r.name[0]}
                </div>
                <div>
                  <div className="font-bold text-[#121212] text-[13px]">{r.name}</div>
                  <div className="text-[11px] text-[#6b5c4e]">{r.role}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Nav arrows */}
          <div className="flex items-center justify-between mt-6">
            <div className="flex gap-2">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-colors ${i === current ? "bg-[#F86704]" : "bg-[#e8ddd5]"}`}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <button
                onClick={prev}
                className="w-12 h-12 rounded-full bg-[#121212] flex items-center justify-center hover:bg-[#333] transition-colors"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M4.74882 11.4158C4.41706 11.7384 4.41706 12.2616 4.74882 12.5842L9.55449 17.258C9.88625 17.5807 10.4241 17.5807 10.7559 17.258C11.0877 16.9353 11.0877 16.4122 10.7559 16.0896L7.40048 12.8262H18.6505C19.1197 12.8262 19.5 12.4563 19.5 12C19.5 11.5437 19.1197 11.1738 18.6505 11.1738H7.40048L10.7559 7.91044C11.0877 7.58778 11.0877 7.06465 10.7559 6.74199C10.4241 6.41934 9.88625 6.41934 9.55449 6.74199L4.74882 11.4158Z" fill="white"/></svg>
              </button>
              <button
                onClick={next}
                className="w-12 h-12 rounded-full bg-[#121212] flex items-center justify-center hover:bg-[#333] transition-colors"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M14.4455 6.74199L19.2512 11.4158C19.5829 11.7384 19.5829 12.2616 19.2512 12.5842L14.4455 17.258C14.1138 17.5807 13.5759 17.5807 13.2441 17.258C12.9123 16.9353 12.9123 16.4122 13.2441 16.0896L16.5995 12.8262H5.34953C4.88035 12.8262 4.5 12.4563 4.5 12C4.5 11.5437 4.88035 11.1738 5.34953 11.1738H16.5995L13.2441 7.91044C12.9123 7.58778 12.9123 7.06465 13.2441 6.74199C13.5759 6.41934 14.1138 6.41934 14.4455 6.74199Z" fill="white"/></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
