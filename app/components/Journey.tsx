import { JOURNEY_STEPS } from "@/app/lib/data";

export default function Journey() {
  return (
    <section id="journey" className="bg-[#fcfbf7] py-16 md:py-20">
      <div className="container-main">
        <div className="text-center mb-10 md:mb-14">
          <p className="text-[#F86704] text-sm font-semibold uppercase tracking-widest mb-2">от нуля до результата</p>
          <h2 className="text-[26px] sm:text-[32px] md:text-[40px] font-black text-[#121212]">
            Путь ученика
          </h2>
        </div>

        <div className="flex flex-col gap-10 items-start">
          <div className="flex-1 flex flex-col gap-6">
            {JOURNEY_STEPS.map((step) => (
              <div key={step.num} className="flex gap-4 items-start">
                <div className="shrink-0 w-10 h-10 rounded-full bg-[#F86704] text-white flex items-center justify-center font-bold text-base">
                  {step.num}
                </div>
                <div>
                  <h3 className="font-bold text-[#121212] text-base mb-0.5">{step.title}</h3>
                  <p className="text-[#6b5c4e] text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
