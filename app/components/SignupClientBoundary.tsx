"use client";

import { useState } from "react";
import Header from "./Header";
import Hero from "./Hero";
import Pricing from "./Pricing";
import LeadModal from "./LeadModal";
import FloatingCTA from "./FloatingCTA";
import type { Lang } from "@/app/lib/dictionaries";

interface Props {
  lang?: Lang;
}

export default function SignupClientBoundary({ lang = "ru" }: Props) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <Header lang={lang} onSignup={() => setModalOpen(true)} />
      <Hero lang={lang} onSignup={() => setModalOpen(true)} />
      <Pricing lang={lang} onSignup={() => setModalOpen(true)} />
      <FloatingCTA lang={lang} onClick={() => setModalOpen(true)} />
      <LeadModal lang={lang} isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
