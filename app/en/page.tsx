"use client";

import { useState } from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Programs from "../components/Programs";
import Teachers from "../components/Teachers";
import Journey from "../components/Journey";
import Reviews from "../components/Reviews";
import Pricing from "../components/Pricing";
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";
import LeadModal from "../components/LeadModal";

export default function HomeEn() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <Header lang="en" />
      <main>
        <Hero lang="en" />
        <Teachers lang="en" />
        <Programs lang="en" />
        <Journey lang="en" />
        <Reviews lang="en" />
        <Pricing lang="en" onSignup={() => setModalOpen(true)} />
        <FAQ lang="en" />
      </main>
      <Footer lang="en" />
      <LeadModal lang="en" isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
