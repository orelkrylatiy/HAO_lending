import Header from "./components/Header";
import Hero from "./components/Hero";
import Programs from "./components/Programs";
import Teachers from "./components/Teachers";
import Journey from "./components/Journey";
import Reviews from "./components/Reviews";
import Pricing from "./components/Pricing";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";
import HowItWorks from "./components/HowItWorks";
import WhyUs from "./components/WhyUs";

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <Programs />
      <Teachers />
      <Journey />
      <Reviews />
      <Pricing />
      <FAQ />
      <HowItWorks />
      <WhyUs />
      <Footer />
    </main>
  );
}
