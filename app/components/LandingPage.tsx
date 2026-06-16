import Hero from "./Hero";
import Programs from "./Programs";
import Teachers from "./Teachers";
import Journey from "./Journey";
import Reviews from "./Reviews";
import Pricing from "./Pricing";
import FAQ from "./FAQ";
import Footer from "./Footer";
import SignupClientBoundary from "./SignupClientBoundary";
import type { Lang } from "@/app/lib/dictionaries";

export default function LandingPage({ lang = "ru" }: { lang?: Lang }) {
  return (
    <>
      <SignupClientBoundary lang={lang} />
      <main>
        <Hero lang={lang} />
        <Teachers lang={lang} />
        <Programs lang={lang} />
        <Journey lang={lang} />
        <Reviews lang={lang} />
        <Pricing lang={lang} />
        <FAQ lang={lang} />
      </main>
      <Footer lang={lang} />
    </>
  );
}
