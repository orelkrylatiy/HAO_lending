"use client";

import { useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Programs from "./components/Programs";
import Teachers from "./components/Teachers";
import Journey from "./components/Journey";
import Reviews from "./components/Reviews";
import Pricing from "./components/Pricing";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";
import LeadModal from "./components/LeadModal";

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Programs />
        <Teachers />
        <Journey />
        <Reviews />
        <Pricing onSignup={() => setModalOpen(true)} />
        <FAQ />
      </main>
      <Footer />
      <LeadModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
