"use client";

import { useEffect, useRef } from "react";

type CursorState = "default" | "magnetic" | "contextual";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const isCoarse = window.matchMedia("(pointer: coarse)").matches;
    if (isCoarse) return;

    const dot = dotRef.current;
    if (!dot) return;

    let mouseX = 0;
    let mouseY = 0;
    let dotX = 0;
    let dotY = 0;
    let state: CursorState = "default";
    let magnetTarget: HTMLElement | null = null;
    let magnetOffsetX = 0;
    let magnetOffsetY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      // Magnetic: buttons, links, role=button
      const magneticEl = target.closest("a, button, [role='button'], .cursor-expand");
      if (magneticEl) {
        state = "magnetic";
        magnetTarget = magneticEl as HTMLElement;
        dot.classList.add("magnetic");
        dot.classList.remove("contextual");
        return;
      }

      // Contextual: images, gallery items
      const imageEl = target.closest(".cursor-view, img, .img-zoom");
      if (imageEl) {
        state = "contextual";
        dot.classList.add("contextual");
        dot.classList.remove("magnetic");
        if (labelRef.current) labelRef.current.textContent = "VIEW";
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest("a, button, [role='button'], .cursor-expand") ||
        target.closest(".cursor-view, img, .img-zoom")
      ) {
        state = "default";
        magnetTarget = null;
        dot.classList.remove("magnetic", "contextual");
      }
    };

    let raf: number;
    const animate = () => {
      // Magnetic pull: attract cursor toward element center
      if (state === "magnetic" && magnetTarget) {
        const rect = magnetTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const dx = centerX - mouseX;
        const dy = centerY - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 120;

        if (dist < maxDist) {
          const force = (1 - dist / maxDist) * 0.25;
          magnetOffsetX += (dx * force - magnetOffsetX) * 0.15;
          magnetOffsetY += (dy * force - magnetOffsetY) * 0.15;
        } else {
          magnetOffsetX *= 0.85;
          magnetOffsetY *= 0.85;
        }
      } else {
        magnetOffsetX *= 0.85;
        magnetOffsetY *= 0.85;
      }

      const targetX = mouseX + magnetOffsetX;
      const targetY = mouseY + magnetOffsetY;
      dotX += (targetX - dotX) * 0.12;
      dotY += (targetY - dotY) * 0.12;
      dot.style.left = `${dotX}px`;
      dot.style.top = `${dotY}px`;

      raf = requestAnimationFrame(animate);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseover", onMouseOver);
    document.addEventListener("mouseout", onMouseOut);
    raf = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseout", onMouseOut);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={dotRef} className="cursor-dot" aria-hidden="true">
      <span ref={labelRef} className="cursor-label" />
    </div>
  );
}
