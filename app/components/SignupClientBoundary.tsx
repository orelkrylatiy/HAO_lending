"use client";

import { useEffect, useState } from "react";
import Header from "./Header";
import LeadModal from "./LeadModal";
import FloatingCTA from "./FloatingCTA";
import type { Lang } from "@/app/lib/dictionaries";

const SIGNUP_MODAL_PARAM = "modal";
const SIGNUP_MODAL_VALUE = "signup";

interface Props {
  lang?: Lang;
}

export default function SignupClientBoundary({ lang = "ru" }: Props) {
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const isSignupModalRequested = () =>
      new URLSearchParams(window.location.search).get(SIGNUP_MODAL_PARAM) === SIGNUP_MODAL_VALUE;

    const openModal = () => {
      const url = new URL(window.location.href);

      if (!isSignupModalRequested()) {
        url.searchParams.set(SIGNUP_MODAL_PARAM, SIGNUP_MODAL_VALUE);
        window.history.pushState(null, "", url);
      }

      setModalOpen(true);
    };

    const syncModalWithUrl = () => setModalOpen(isSignupModalRequested());

    window.addEventListener("hao:open-signup", openModal);
    window.addEventListener("popstate", syncModalWithUrl);
    syncModalWithUrl();

    return () => {
      window.removeEventListener("hao:open-signup", openModal);
      window.removeEventListener("popstate", syncModalWithUrl);
    };
  }, []);

  const closeModal = () => {
    const url = new URL(window.location.href);
    url.searchParams.delete(SIGNUP_MODAL_PARAM);
    window.history.replaceState(null, "", url);
    setModalOpen(false);
  };

  const openModal = () => window.dispatchEvent(new CustomEvent("hao:open-signup"));

  return (
    <>
      <Header lang={lang} onSignup={openModal} />
      <FloatingCTA lang={lang} onClick={openModal} />
      {modalOpen && <LeadModal lang={lang} isOpen onClose={closeModal} />}
    </>
  );
}
