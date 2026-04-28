import { KIDS_FEATURES, ADULT_FEATURES } from "@/app/lib/data";

function CheckIcon({ variant = "light" }: { variant?: "light" | "dark" }) {
  return variant === "light" ? (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="flex-shrink-0">
      <circle cx="9" cy="9" r="9" fill="#FFE9D2"/>
      <path d="M5.5 9L7.5 11L12.5 6.5" stroke="#F86704" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ) : (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="flex-shrink-0">
      <circle cx="9" cy="9" r="9" fill="rgba(255,255,255,0.2)"/>
      <path d="M5.5 9L7.5 11L12.5 6.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export default function Pricing({ onSignup }: { onSignup?: () => void }) {
  return (
    <section id="pricing" className="bg-[#fcfbf7] py-16 md:py-20">
      <div className="container-main">
        <div className="text-center mb-10 md:mb-14">
          <h2 className="text-[26px] sm:text-[32px] md:text-[40px] font-black text-[#121212] mb-3">
            Тарифы
          </h2>
          <p className="text-[#6b5c4e] text-base max-w-md mx-auto">
            Выберите подходящий формат — первый урок бесплатно
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {/* Kids */}
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-[#f0e8e0] flex flex-col">
            <div className="mb-5">
              <span className="badge-light mb-3">Для детей</span>
              <div className="text-3xl font-bold text-[#121212] mt-3 mb-1">
                от <span className="text-[#F86704]">980 ₽</span>
              </div>
              <div className="text-[#6b5c4e] text-sm">за урок</div>
            </div>
            <ul className="flex flex-col gap-3 mb-8 flex-1">
              {KIDS_FEATURES.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm text-[#3d2b1f]">
                  <CheckIcon variant="light" />
                  {f}
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={onSignup}
              className="w-full py-3 rounded-full border-2 border-[#F86704] text-[#F86704] font-semibold text-center hover:bg-[#FFE9D2] transition-colors"
            >
              Записаться
            </button>
          </div>

          {/* Adults */}
          <div className="bg-[#F86704] rounded-2xl p-6 md:p-8 shadow-lg flex flex-col">
            <div className="mb-5">
              <span className="inline-block px-3 py-1 rounded-full bg-white/20 text-white text-xs font-semibold mb-3">
                Для взрослых
              </span>
              <div className="text-3xl font-bold text-white mb-1">
                от <span className="font-black">1 250 ₽</span>
              </div>
              <div className="text-white/80 text-sm">за урок</div>
            </div>
            <ul className="flex flex-col gap-3 mb-8 flex-1">
              {ADULT_FEATURES.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm text-white">
                  <CheckIcon variant="dark" />
                  {f}
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={onSignup}
              className="w-full py-3 rounded-full bg-white text-[#F86704] font-semibold text-center hover:bg-[#fff5ee] transition-colors"
            >
              Записаться
            </button>
          </div>
        </div>

        <div className="text-center mt-8">
          <div className="inline-flex items-center gap-3 bg-[#fff8f3] rounded-xl px-6 py-3 border border-[#f0e8e0]">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="10" fill="#FFE9D2"/><path d="M10 6v5l3 2" stroke="#F86704" strokeWidth="1.6" strokeLinecap="round"/></svg>
            <span className="text-[#3d2b1f] text-sm">
              <strong>Пробный урок — бесплатно.</strong> Без обязательств.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
