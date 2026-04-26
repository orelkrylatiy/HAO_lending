import Image from "next/image";

const programs = [
  {
    img: "/images/program-hsk.png",
    title: "HSK за 3 месяца",
    tag: "курс-бестселлер",
    desc: "Подготовка к HSK 1–6. Авторские материалы НАО. Еженедельные пробные тесты.",
  },
  {
    img: "/images/program-kids.png",
    title: "Китайский для детей",
    tag: "от 7 лет",
    desc: "Игровой формат, адаптированные материалы, терпеливые преподаватели.",
  },
  {
    img: "/images/program-work.png",
    title: "Китайский для работы",
    tag: "карьера и бизнес",
    desc: "Деловой китайский, переговоры, профессиональная лексика.",
  },
  {
    img: "/images/program-travel.png",
    title: "Китайский для путешествий",
    tag: "без границ",
    desc: "Разговорный китайский для поездок, туризма и общения.",
  },
  {
    img: "/images/program-individual.png",
    title: "Индивидуальные занятия",
    tag: "под вашу цель",
    desc: "Личная программа, удобное расписание, максимальный результат.",
  },
  {
    img: "/images/program-group.png",
    title: "Мини-группы",
    tag: "с одним уровнем",
    desc: "Занятия в небольших группах с похожим уровнем, живое общение.",
  },
];

export default function Programs() {
  return (
    <section id="programs" className="bg-[#fff8f3] py-16 md:py-20">
      <div className="container-main">
        <div className="text-center mb-10 md:mb-14">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#121212] mb-3">
            Программы для любых целей
          </h2>
          <p className="text-[#6b5c4e] text-base md:text-lg max-w-xl mx-auto">
            Занимайтесь онлайн с преподавателями прямо из Китая
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {programs.map((program) => (
            <div
              key={program.title}
              className="bg-white rounded-2xl p-5 flex flex-col gap-4 shadow-sm hover:shadow-md transition-shadow border border-[#f0e8e0]"
            >
              <div className="w-full h-44 relative rounded-xl overflow-hidden bg-[#FFE9D2]">
                <Image
                  src={program.img}
                  alt={program.title}
                  fill
                  className="object-contain p-3"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div>
                <span className="inline-block px-2 py-0.5 rounded-full bg-[#FFE9D2] text-[#F86704] text-xs font-semibold mb-2">
                  {program.tag}
                </span>
                <h3 className="text-[#121212] font-bold text-lg leading-snug mb-1">{program.title}</h3>
                <p className="text-[#6b5c4e] text-sm leading-relaxed">{program.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <a
            href="#pricing"
            className="inline-block px-8 py-3.5 rounded-full bg-[#F86704] text-white font-semibold hover:bg-[#e55a1f] transition-colors"
          >
            Записаться на бесплатный урок →
          </a>
        </div>
      </div>
    </section>
  );
}
