import Image from "next/image";

export default function Hero() {
  return (
    <section className="bg-[#fcfbf7] pt-10 pb-0 md:pt-16 overflow-hidden">
      <div className="container-main flex flex-col md:flex-row items-center gap-8 md:gap-12">
        <div className="flex-1 text-center md:text-left">
          <div className="inline-flex flex-wrap gap-2 mb-6 justify-center md:justify-start">
            {["карьерный рост", "высокий доход", "обучение за рубежом"].map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full bg-[#FFE9D2] text-[#F86704] text-xs font-semibold"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#121212] leading-tight mb-4">
            Китайский язык{" "}
            <span className="text-[#F86704]">будущего</span>
          </h1>

          <p className="text-[#6b5c4e] text-base md:text-lg mb-3 leading-relaxed">
            Китайский онлайн с преподавателями из Китая для школьников и взрослых.
          </p>
          <p className="text-[#6b5c4e] text-base md:text-lg mb-8 font-semibold">
            Более 500 учеников уже говорят по-китайски.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
            <a
              href="#pricing"
              className="px-7 py-3.5 rounded-full bg-[#F86704] text-white font-semibold text-base hover:bg-[#e55a1f] transition-colors text-center"
            >
              Записаться на бесплатный урок
            </a>
            <a
              href="#programs"
              className="px-7 py-3.5 rounded-full border-2 border-[#F86704] text-[#F86704] font-semibold text-base hover:bg-[#FFE9D2] transition-colors text-center"
            >
              Программы
            </a>
          </div>

          <div className="flex items-center gap-6 mt-8 justify-center md:justify-start">
            <div className="text-center">
              <div className="text-2xl font-bold text-[#121212]">500+</div>
              <div className="text-xs text-[#6b5c4e]">учеников</div>
            </div>
            <div className="w-px h-10 bg-[#e8ddd5]" />
            <div className="text-center">
              <div className="text-2xl font-bold text-[#121212]">HSK 1–6</div>
              <div className="text-xs text-[#6b5c4e]">уровни</div>
            </div>
            <div className="w-px h-10 bg-[#e8ddd5]" />
            <div className="text-center">
              <div className="text-2xl font-bold text-[#121212]">100%</div>
              <div className="text-xs text-[#6b5c4e]">онлайн</div>
            </div>
          </div>
        </div>

        <div className="flex-1 flex justify-center md:justify-end w-full max-w-md md:max-w-none">
          <div className="relative w-full max-w-sm md:max-w-md">
            <div className="absolute -top-4 -left-4 w-24 h-24 rounded-full bg-[#FFE9D2] opacity-70 blur-2xl" />
            <div className="absolute -bottom-4 -right-4 w-32 h-32 rounded-full bg-[#ffd489] opacity-50 blur-2xl" />
            <Image
              src="/images/hero-teacher.png"
              alt="Преподаватель китайского языка"
              width={600}
              height={400}
              className="relative w-full h-auto rounded-2xl object-cover"
              priority
              unoptimized
            />
            <div className="absolute top-4 right-4 bg-white rounded-xl px-3 py-2 shadow-md text-sm font-semibold text-[#121212]">
              <span className="text-[#F86704]">好</span> Пэн Цзин
              <div className="text-xs text-[#6b5c4e] font-normal">Эксперт по HSK</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
