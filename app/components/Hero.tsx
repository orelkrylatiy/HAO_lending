import Image from "next/image";
import OpenSignupButton from "./OpenSignupButton";
import ScrollToButton from "./ScrollToButton";
import { getDictionary, Lang } from "@/app/lib/dictionaries";

export default function Hero({ lang = "ru" }: { lang?: Lang }) {
  const dict = getDictionary(lang);

  return (
    <section className="bg-[#fcfbf7] pt-[72px]">
      <div className="container-main py-6 md:py-10">
        <div className="bg-[#FFE9D2] rounded-[28px] md:rounded-[36px] overflow-hidden relative animate-fade-up">
          <div className="flex flex-col md:flex-row">
            <div className="flex-1 px-7 pt-10 pb-8 md:px-12 lg:px-14 md:pt-12 md:pb-12 flex flex-col justify-between min-h-[420px] md:min-h-[520px]">
              <div className="flex-1">
                <h1 className="text-[50px] sm:text-[68px] md:text-[82px] lg:text-[90px] font-black text-[#121212] leading-[0.98] mb-7 tracking-tight animate-fade-up">
                  {dict.hero.title1}<br />{dict.hero.title2}
                </h1>
                <p className="text-[#F86704] text-[22px] md:text-[28px] lg:text-[32px] font-bold leading-tight mb-5 whitespace-pre-line animate-fade-up-delay-1">
                  {dict.hero.subtitle}
                </p>
                <p className="text-[#3d2b1f] text-[16px] md:text-[18px] font-medium mb-7 animate-fade-up-delay-2">
                  {dict.hero.desc}
                </p>
              </div>

              <div className="flex flex-col gap-4 max-w-[560px] animate-fade-up-delay-2">
                <OpenSignupButton className="button-lift relative z-10 flex items-center justify-between gap-4 bg-[#F86704] text-white font-bold text-[17px] md:text-[21px] px-7 py-5 rounded-2xl hover:bg-[#e55a1f] transition-colors shadow-sm">
                  <span>{dict.hero.cta}</span>
                  <span className="flex-shrink-0 w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M7 17L17 7M17 7H7M17 7V17" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </OpenSignupButton>
                <ScrollToButton
                  targetId="programs"
                  className="button-lift relative z-10 flex items-center justify-between gap-4 bg-white text-[#F86704] font-semibold text-[15px] md:text-[18px] px-7 py-5 rounded-2xl hover:bg-white/80 transition-colors"
                >
                  <span>{dict.hero.programs}</span>
                  <span className="flex-shrink-0">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M7 17L17 7M17 7H7M17 7V17" stroke="#F86704" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </ScrollToButton>
              </div>
            </div>

            <div className="relative flex-1 flex flex-col md:flex-row items-center md:items-end justify-end overflow-hidden min-h-[300px] md:min-h-[520px] px-4 md:px-0 pt-6 md:pt-0 pointer-events-none">
              <div className="w-full flex justify-center md:absolute md:top-10 md:right-10 md:w-auto md:justify-end gap-4 lg:gap-6 z-10 mb-5 md:mb-0 pointer-events-none">
                <div className="flex flex-col items-center gap-2 animate-fade-up-delay-1">
                  <Image src="/images/icons/icon-education.svg" alt={dict.hero.benefit1.replace("\n", " ")} width={86} height={80} className="w-[64px] md:w-[78px] lg:w-[86px] h-auto pointer-events-none" />
                  <span
                    className="text-[12px] md:text-[14px] font-semibold text-[#3d2b1f] text-center leading-tight"
                    dangerouslySetInnerHTML={{ __html: dict.hero.benefit1.replace("\n", "<br/>") }}
                  />
                </div>
                <div className="flex flex-col items-center gap-2 animate-fade-up-delay-2">
                  <Image src="/images/icons/icon-education1.svg" alt={dict.hero.benefit2.replace("\n", " ")} width={86} height={80} className="w-[64px] md:w-[78px] lg:w-[86px] h-auto pointer-events-none" />
                  <span
                    className="text-[12px] md:text-[14px] font-semibold text-[#3d2b1f] text-center leading-tight"
                    dangerouslySetInnerHTML={{ __html: dict.hero.benefit2.replace("\n", "<br/>") }}
                  />
                </div>
                <div className="flex flex-col items-center gap-2 animate-fade-up-delay-2">
                  <Image src="/images/icons/icon-bag.svg" alt={dict.hero.benefit3.replace("\n", " ")} width={86} height={80} className="w-[64px] md:w-[78px] lg:w-[86px] h-auto pointer-events-none" />
                  <span
                    className="text-[12px] md:text-[14px] font-semibold text-[#3d2b1f] text-center leading-tight"
                    dangerouslySetInnerHTML={{ __html: dict.hero.benefit3.replace("\n", "<br/>") }}
                  />
                </div>
              </div>

              <Image
                src="/images/hero-illustration.webp"
                alt={dict.hero.desc}
                width={700}
                height={510}
                className="animate-soft-float block w-full max-w-[360px] sm:max-w-[460px] md:max-w-[660px] lg:max-w-[700px] h-auto object-contain object-bottom md:-mr-7"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
