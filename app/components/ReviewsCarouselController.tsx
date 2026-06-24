"use client";

import { useEffect, useState } from "react";

function isVisibleDesktop(index: number, start: number, total: number) {
  return Array.from({ length: 3 }, (_, offset) => (start + offset) % total).includes(index);
}

export default function ReviewsCarouselController({
  total,
  prevLabel,
  nextLabel,
  dotLabel,
}: {
  total: number;
  prevLabel: string;
  nextLabel: string;
  dotLabel?: string;
}) {
  const [start, setStart] = useState(0);

  useEffect(() => {
    const mobileCards = document.querySelectorAll<HTMLElement>("[data-review-mobile]");
    const desktopCards = document.querySelectorAll<HTMLElement>("[data-review-desktop]");

    mobileCards.forEach((card, index) => {
      const isVisible = index === start;
      card.style.display = isVisible ? "flex" : "none";
      card.setAttribute("aria-hidden", String(!isVisible));
    });

    desktopCards.forEach((card, index) => {
      const isVisible = isVisibleDesktop(index, start, total);
      card.style.display = isVisible ? "" : "none";
      card.setAttribute("aria-hidden", String(!isVisible));
    });
  }, [start, total]);

  const prev = () => setStart((current) => (current - 1 + total) % total);
  const next = () => setStart((current) => (current + 1) % total);

  return (
    <div className="relative isolate z-30 flex items-center justify-center gap-4 mt-8 pointer-events-auto">
      <button type="button" onClick={prev} aria-label={prevLabel} className="carousel-btn">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </button>
      <div className="flex items-center gap-2">
        {Array.from({ length: total }).map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => setStart(index)}
            aria-label={`${dotLabel || "Review"} ${index + 1}`}
            aria-pressed={index === start}
            className="relative z-30 w-7 h-7 flex items-center justify-center"
          >
            <span className={`carousel-dot ${index === start ? "carousel-dot-active" : "carousel-dot-inactive"}`} />
          </button>
        ))}
      </div>
      <button type="button" onClick={next} aria-label={nextLabel} className="carousel-btn">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </button>
    </div>
  );
}
