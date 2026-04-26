import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#F86704] py-10 md:py-12 rounded-t-[28px]">
      <div className="container-main">
        <div className="flex flex-col md:flex-row gap-8 md:gap-6">
          {/* Col 1: Site links */}
          <div className="flex-1">
            <h3 className="font-bold text-white text-[13px] uppercase tracking-wider mb-4">Разделы сайта:</h3>
            <ul className="flex flex-col gap-2">
              {["Обучение", "Цены", "Отзывы", "Преподаватели", "FAQ"].map((item, i) => {
                const hrefs = ["#programs", "#pricing", "#reviews", "#teachers", "#faq"];
                return (
                  <li key={item}>
                    <a href={hrefs[i]} className="text-white/90 hover:text-white font-medium text-[15px] transition-colors">
                      {item}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Col 2: Contacts */}
          <div className="flex-1">
            <h3 className="font-bold text-white text-[13px] uppercase tracking-wider mb-4">Контакты:</h3>
            <div className="flex flex-col gap-3">
              <div>
                <p className="text-white/70 text-[12px] font-semibold uppercase tracking-wide mb-0.5">Email:</p>
                <a href="mailto:example@mail.ru" className="text-white font-medium text-[15px] hover:text-white/80 transition-colors">
                  example@mail.ru
                </a>
              </div>
              <div>
                <p className="text-white/70 text-[12px] font-semibold uppercase tracking-wide mb-0.5">Телефон:</p>
                <a href="tel:+79991112233" className="text-white font-medium text-[15px] hover:text-white/80 transition-colors">
                  +7 (999) 111-22-33
                </a>
              </div>
            </div>
          </div>

          {/* Col 3: Legal + messengers */}
          <div className="flex-1">
            <div className="flex flex-col gap-4">
              <a href="#" className="text-white font-bold text-[15px] hover:text-white/80 transition-colors leading-tight">
                Пользовательское<br />соглашение/оферта
              </a>
              <a href="#" className="text-white font-medium text-[14px] hover:text-white/80 transition-colors">
                Политика конфиденциальности
              </a>
              <div className="flex gap-4 mt-2">
                <a href="#" aria-label="WhatsApp" className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                  <Image src="/images/whatsapp.svg" alt="WhatsApp" width={24} height={24} />
                </a>
                <a href="#" aria-label="Telegram" className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                  <Image src="/images/telegram.svg" alt="Telegram" width={24} height={24} />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/20">
          <p className="text-white/50 text-[12px]">© {new Date().getFullYear()} HAO — онлайн школа китайского языка</p>
        </div>
      </div>
    </footer>
  );
}
