import Image from "next/image";

export default function Hero() {
  return (
    <section className="bg-[#fcfbf7] pt-[72px]">
      <div className="container-main py-6 md:py-10">
        {/* Hero peach container */}
        <div className="bg-[#FFE9D2] rounded-[28px] md:rounded-[36px] overflow-hidden relative">
          <div className="flex flex-col md:flex-row">
            {/* Left: text content */}
            <div className="flex-1 px-7 pt-10 pb-8 md:px-12 md:pt-12 md:pb-12 flex flex-col justify-between min-h-[380px] md:min-h-[480px]">
              <div className="flex-1">
                <h1 className="text-[38px] sm:text-[52px] md:text-[64px] font-black text-[#121212] leading-[1.05] mb-5">
                  Китайский<br />язык будущего
                </h1>
                <p className="text-[#F86704] text-[17px] md:text-[21px] font-bold leading-snug mb-3">
                  Китайский онлайн<br />
                  с преподавателями из Китая для<br />
                  школьников и взрослых.
                </p>
                <p className="text-[#3d2b1f] text-[13px] md:text-[14px] font-medium mb-8">
                  Более 500 учеников уже говорят по-китайски.
                </p>
              </div>

              <div className="flex flex-col gap-3 max-w-[420px]">
                <a
                  href="#pricing"
                  className="flex items-center justify-between gap-3 bg-[#F86704] text-white font-bold text-[15px] md:text-[17px] px-6 py-4 rounded-2xl hover:bg-[#e55a1f] transition-colors"
                >
                  <span>Записаться на бесплатный урок</span>
                  <span className="flex-shrink-0 w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M7 17L17 7M17 7H7M17 7V17" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </a>
                <a
                  href="#programs"
                  className="flex items-center justify-between gap-3 bg-white/50 text-[#F86704] font-semibold text-[13px] md:text-[14px] px-6 py-3.5 rounded-2xl hover:bg-white/70 transition-colors"
                >
                  <span>Консультация по поступлению в Китайский ВУЗ</span>
                  <span className="flex-shrink-0">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M7 17L17 7M17 7H7M17 7V17" stroke="#F86704" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </a>
              </div>
            </div>

            {/* Right: illustration */}
            <div className="relative flex-1 flex items-end justify-center overflow-hidden min-h-[240px] md:min-h-[480px] px-4 md:px-0 pt-18 md:pt-0">
              {/* Benefit icon cards — top right corner of hero */}
              <div className="absolute top-5 right-4 md:top-8 md:right-8 flex gap-3 z-10">
                <div className="flex flex-col items-center gap-1">
                  <Image src="/images/icon-education.svg" alt="обучение за рубежом" width={52} height={49} className="w-[42px] md:w-[52px] h-auto" unoptimized />
                  <span className="text-[9px] md:text-[10px] font-semibold text-[#3d2b1f] text-center leading-tight">обучение<br/>за рубежом</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <Image src="/images/icon-education1.svg" alt="высокий доход" width={52} height={49} className="w-[42px] md:w-[52px] h-auto" unoptimized />
                  <span className="text-[9px] md:text-[10px] font-semibold text-[#3d2b1f] text-center leading-tight">высокий<br/>доход</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <Image src="/images/icon-bag.svg" alt="карьерный рост" width={52} height={49} className="w-[42px] md:w-[52px] h-auto" unoptimized />
                  <span className="text-[9px] md:text-[10px] font-semibold text-[#3d2b1f] text-center leading-tight">карьерный<br/>рост</span>
                </div>
              </div>

              <Image
                src="/images/hero-illustration.webp"
                alt="Студенты изучают китайский"
                width={580}
                height={420}
                className="block w-full max-w-[300px] sm:max-w-[380px] md:max-w-[580px] h-auto object-contain object-bottom"
                priority
                unoptimized
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
