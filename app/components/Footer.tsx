import { getDictionary, Lang } from "@/app/lib/dictionaries";
import Image from "next/image";
import { CONTACTS } from "@/app/lib/contacts";
import { LEGAL_DOCUMENTS } from "@/app/lib/legal";


export default function Footer({ lang = "ru" }: { lang?: Lang }) {
  const dict = getDictionary(lang);
  return (
    <footer className="bg-[#F86704] py-10 md:py-12 rounded-t-[28px]">
      <div className="container-main">
        <div className="flex flex-col md:flex-row gap-8 md:gap-6">
          <div className="flex-1">
            <h3 className="font-bold text-white text-[18px] mb-4">{dict.data.PROVIDER.title}</h3>
            <div className="flex flex-col gap-2 text-white/90 text-[15px]">
              <div className="font-medium">{dict.data.PROVIDER.name}</div>
              <div className="italic">{dict.data.PROVIDER.innOgrnip}</div>
              <div>{dict.data.PROVIDER.city}</div>
              <a href={dict.data.PROVIDER.faqHref} className="mt-2 text-white font-medium hover:text-white/80 transition-colors">{dict.data.PROVIDER.faqLabel}</a>
            </div>
          </div>

          <div className="flex-1">
            <h3 className="font-bold text-white text-[13px] uppercase tracking-wider mb-4">{dict.footer_sec.contacts}</h3>
            <div className="flex flex-col gap-3">
              {CONTACTS.email && (
                <div>
                  <p className="text-white/70 text-[12px] font-semibold uppercase tracking-wide mb-0.5">{dict.footer_sec.email}</p>
                  <a href={`mailto:${CONTACTS.email}`} className="text-white font-medium text-[15px] hover:text-white/80 transition-colors break-all">
                    {CONTACTS.email}
                  </a>
                </div>
              )}
              {CONTACTS.phone && (
                <div>
                  <p className="text-white/70 text-[12px] font-semibold uppercase tracking-wide mb-0.5">{dict.footer_sec.phone}</p>
                  <a href={`tel:${CONTACTS.phoneRaw}`} className="text-white font-medium text-[15px] hover:text-white/80 transition-colors whitespace-nowrap">
                    {CONTACTS.phone}
                  </a>
                </div>
              )}
            </div>
          </div>

          <div className="flex-1">
            <div className="flex flex-col gap-4">
              <a
                href={LEGAL_DOCUMENTS.offer.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white font-bold text-[15px] hover:text-white/80 transition-colors leading-tight"
                dangerouslySetInnerHTML={{ __html: dict.footer_sec.terms.replace("/", "<br/>") }}
              />
              <a
                href={LEGAL_DOCUMENTS.policy.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white font-medium text-[14px] hover:text-white/80 transition-colors"
              >
                {dict.footer_sec.policy}
              </a>
              <div className="flex gap-4 mt-2">
                <a href={CONTACTS.whatsapp} aria-label="WhatsApp"
                  className="relative z-10 w-12 h-12 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                  <Image src="/images/icons/whatsapp.svg" alt="WhatsApp" width={24} height={24} />
                </a>
                <a href={CONTACTS.telegram} aria-label="Telegram"
                  className="relative z-10 w-12 h-12 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                  <Image src="/images/icons/telegram.svg" alt="Telegram" width={24} height={24} />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/20">
          <p className="text-white/50 text-[12px]">
            {dict.footer_sec.rights.replace("2026", String(new Date().getFullYear()))}
          </p>
        </div>
      </div>
    </footer>
  );
}
