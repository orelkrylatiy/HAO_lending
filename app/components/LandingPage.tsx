"use client";

import { useState } from "react";
import Header from "./Header";
import Hero from "./Hero";
import Programs from "./Programs";
import Teachers from "./Teachers";
import Journey from "./Journey";
import Reviews from "./Reviews";
import Pricing from "./Pricing";
import FAQ from "./FAQ";
import Footer from "./Footer";
import LeadModal from "./LeadModal";
import FloatingCTA from "./FloatingCTA";
import type { Lang } from "@/app/lib/dictionaries";

export default function LandingPage({ lang = "ru" }: { lang?: Lang }) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <Header lang={lang} onSignup={() => setModalOpen(true)} />
      <main>
        <Hero lang={lang} onSignup={() => setModalOpen(true)} />
        <Teachers lang={lang} />
        <Programs lang={lang} />
        <Journey lang={lang} />
        <Reviews lang={lang} />
        <Pricing lang={lang} onSignup={() => setModalOpen(true)} />
        <FAQ lang={lang} />
      </main>
      <Footer lang={lang} />
      <FloatingCTA lang={lang} onClick={() => setModalOpen(true)} />
      <LeadModal lang={lang} isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
