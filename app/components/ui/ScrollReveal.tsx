"use client";

import { useEffect } from "react";

/**
 * Появление блоков с атрибутом data-reveal при входе во вьюпорт.
 * Значение атрибута — задержка в мс для стаггера (data-reveal="120").
 *
 * Класс reveal-ready ставится на <html> только из JS: без скриптов
 * (или при prefers-reduced-motion) контент виден сразу.
 *
 * Важно: data-reveal вешать на контейнеры и простые блоки, не на элементы
 * с card-lift/button-lift — общий transition перебьёт их hover-анимации.
 */
export default function ScrollReveal() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    document.documentElement.classList.add("reveal-ready");

    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const applyDelay = (el: HTMLElement) => {
      const delay = parseInt(el.dataset.reveal || "", 10);
      if (Number.isFinite(delay) && delay > 0) el.style.transitionDelay = `${delay}ms`;
    };

    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => {
        applyDelay(el);
        el.classList.add("is-visible");
      });
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -6% 0px" }
    );

    els.forEach((el) => {
      applyDelay(el);
      io.observe(el);
    });

    return () => io.disconnect();
  }, []);

  return null;
}
