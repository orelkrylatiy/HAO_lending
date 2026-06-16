import { getDictionary, Lang } from "@/app/lib/dictionaries";

export default function FAQ({ lang = "ru" }: { lang?: Lang }) {
  const dict = getDictionary(lang);

  return (
    <section id="faq" className="bg-[#fcfbf7] py-14 md:py-16">
      <div className="container-main">
        <div className="text-center mb-8 md:mb-10">
          <h2 className="text-[30px] sm:text-[38px] md:text-[48px] font-black text-[#121212] mb-10 md:mb-14 text-center leading-tight">
            {dict.faq_sec.title}
          </h2>
        </div>

        <div className="flex flex-col gap-3 max-w-3xl mx-auto">
          {dict.data.FAQ_ITEMS.map((faq, i) => (
            <details
              key={i}
              className="group rounded-2xl bg-[#FFE9D2]/60 open:bg-[#FFE9D2] hover:bg-[#FFE9D2] transition-colors"
            >
              <summary className="list-none w-full flex items-center justify-between px-6 py-5 text-left gap-4 cursor-pointer">
                <span className="font-bold text-[#121212] text-[14px] md:text-[16px]">
                  {i + 1}.{faq.q}
                </span>
                <span className="flex-shrink-0 w-10 h-10 rounded-xl bg-[#F86704] flex items-center justify-center transition-transform group-open:rotate-45">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M9 4V14M4 9H14" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
                  </svg>
                </span>
              </summary>
              <div className="px-6 pb-5 text-[#3d2b1f] text-[14px] md:text-[15px] leading-relaxed">
                {faq.a}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
