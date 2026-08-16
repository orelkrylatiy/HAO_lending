"use client";

import { useEffect, useRef } from "react";

/**
 * Кастомный курсор: точка следует мгновенно, кольцо — с инерцией и тенью.
 * Включается только на устройствах с точным указателем (мышь/трекпад)
 * и без prefers-reduced-motion. В полях ввода возвращается нативный курсор.
 */
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    document.documentElement.classList.add("has-custom-cursor");

    let x = -100;
    let y = -100;
    let rx = -100;
    let ry = -100;
    let scale = 1;
    let targetScale = 1;
    let shown = false;
    let overField = false;
    let pressed = false;
    let raf = 0;

    const applyVisibility = () => {
      const on = shown && !overField;
      dot.style.opacity = on ? "1" : "0";
      ring.style.opacity = on ? "1" : "0";
    };

    const onMove = (e: MouseEvent) => {
      if (!shown) {
        shown = true;
        rx = e.clientX;
        ry = e.clientY;
        applyVisibility();
      }
      x = e.clientX;
      y = e.clientY;
      const target = e.target as Element | null;
      const interactive = !!target?.closest?.("a, button, [role='button']");
      overField = !!target?.closest?.("input, textarea, select");
      targetScale = pressed ? 0.75 : interactive ? 1.55 : 1;
      applyVisibility();
    };

    const onLeave = () => {
      shown = false;
      applyVisibility();
    };

    const onDown = () => {
      pressed = true;
      targetScale = 0.75;
    };

    const onUp = () => {
      pressed = false;
      targetScale = 1;
    };

    const loop = () => {
      rx += (x - rx) * 0.18;
      ry += (y - ry) * 0.18;
      scale += (targetScale - scale) * 0.2;
      dot.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%) scale(${scale.toFixed(3)})`;
      raf = requestAnimationFrame(loop);
    };

    document.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mousedown", onDown, { passive: true });
    document.addEventListener("mouseup", onUp, { passive: true });
    raf = requestAnimationFrame(loop);

    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("mouseup", onUp);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden="true"
        className="custom-cursor h-9 w-9 border-[1.5px] border-[#F86704]/80 bg-[#F86704]/[0.06]"
      />
      <div
        ref={dotRef}
        aria-hidden="true"
        className="custom-cursor h-2.5 w-2.5 bg-[#F86704]"
      />
    </>
  );
}
