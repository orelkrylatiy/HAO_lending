"use client";

import { useEffect, useState } from "react";
import Header from "./Header";
import LeadModal from "./LeadModal";
import FloatingCTA from "./FloatingCTA";
import type { Lang } from "@/app/lib/dictionaries";

interface Props {
  lang?: Lang;
}

export default function SignupClientBoundary({ lang = "ru" }: Props) {
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const openModal = () => setModalOpen(true);

    window.addEventListener("hao:open-signup", openModal);
    return () => {
      window.removeEventListener("hao:open-signup", openModal);
    };
  }, []);

  return (
    <>
      <Header lang={lang} onSignup={() => setModalOpen(true)} />
      <FloatingCTA lang={lang} onClick={() => setModalOpen(true)} />
      <LeadModal lang={lang} isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
