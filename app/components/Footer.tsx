export default function Footer() {
  return (
    <footer className="bg-[#121212] text-white py-10 md:py-12">
      <div className="container-main">
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 mb-8">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl font-bold text-[#F86704]">好</span>
              <span className="text-lg font-bold">HAO</span>
              <span className="text-sm text-white/60">школа китайского</span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed max-w-xs">
              Эффективные онлайн-курсы китайского языка: от нуля до уверенного общения.
            </p>
          </div>

          <div className="flex-1">
            <h3 className="font-semibold text-white mb-3 text-sm uppercase tracking-wider">Разделы сайта</h3>
            <ul className="flex flex-col gap-2">
              <li><a href="#programs" className="text-white/60 hover:text-[#F86704] text-sm transition-colors">Программы</a></li>
              <li><a href="#teachers" className="text-white/60 hover:text-[#F86704] text-sm transition-colors">Преподаватели</a></li>
              <li><a href="#reviews" className="text-white/60 hover:text-[#F86704] text-sm transition-colors">Отзывы</a></li>
              <li><a href="#pricing" className="text-white/60 hover:text-[#F86704] text-sm transition-colors">Цены</a></li>
              <li><a href="#faq" className="text-white/60 hover:text-[#F86704] text-sm transition-colors">FAQ</a></li>
            </ul>
          </div>

          <div className="flex-1">
            <h3 className="font-semibold text-white mb-3 text-sm uppercase tracking-wider">Контакты</h3>
            <ul className="flex flex-col gap-2">
              <li className="flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 4l6 5 6-5M2 4h12v9H2V4z" stroke="#F86704" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                <a href="mailto:example@mail.ru" className="text-white/60 hover:text-[#F86704] text-sm transition-colors">example@mail.ru</a>
              </li>
              <li className="flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 2l2.5 1-1 3 1.5 1s1-1 2.5-.5L11 8l1 2.5-1.5 1C10.5 11.5 5 9 3 3z" stroke="#F86704" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                <a href="tel:+79991112233" className="text-white/60 hover:text-[#F86704] text-sm transition-colors">+7 (999) 111-22-33</a>
              </li>
              <li className="flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 1.5C4.41 1.5 1.5 4.24 1.5 7.6c0 1.26.39 2.43 1.06 3.4L1.5 14.5l3.57-1.04A6.55 6.55 0 008 14c3.59 0 6.5-2.74 6.5-6.1S11.59 1.5 8 1.5z" stroke="#F86704" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                <a href="#" className="text-white/60 hover:text-[#F86704] text-sm transition-colors">WhatsApp</a>
              </li>
              <li className="flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 1.5c3.59 0 6.5 2.91 6.5 6.5S11.59 14.5 8 14.5c-.98 0-1.9-.22-2.74-.6L1.5 14.5l.6-3.7C1.72 9.88 1.5 8.97 1.5 8c0-3.59 2.91-6.5 6.5-6.5z" stroke="#F86704" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                <a href="#" className="text-white/60 hover:text-[#F86704] text-sm transition-colors">Telegram</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/40 text-xs">© 2024 HAO — школа китайского языка</p>
          <div className="flex gap-4 flex-wrap justify-center">
            <a href="#" className="text-white/40 hover:text-white/70 text-xs transition-colors">Пользовательское соглашение</a>
            <a href="#" className="text-white/40 hover:text-white/70 text-xs transition-colors">Оферта</a>
            <a href="#" className="text-white/40 hover:text-white/70 text-xs transition-colors">Политика конфиденциальности</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
