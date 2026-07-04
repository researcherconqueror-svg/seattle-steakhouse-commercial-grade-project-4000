"use client";

import { useEffect, useRef } from "react";

interface Ember {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  hue: number;
  life: number;
  maxLife: number;
  wobbleOffset: number;
}

export default function AmbientEmbers() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener("resize", resize);

    const embers: Ember[] = [];
    const maxEmbers = 45;

    const createEmber = (): Ember => ({
      x: Math.random() * canvas.offsetWidth,
      y: canvas.offsetHeight + 10,
      size: Math.random() * 2.5 + 0.5,
      speedX: (Math.random() - 0.5) * 0.15,
      speedY: -(Math.random() * 0.35 + 0.1),
      opacity: Math.random() * 0.45 + 0.1,
      hue: Math.random() * 35 + 20,
      life: 0,
      maxLife: Math.random() * 500 + 300,
      wobbleOffset: Math.random() * Math.PI * 2,
    });

    let raf: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      if (embers.length < maxEmbers && Math.random() > 0.95) {
        embers.push(createEmber());
      }

      for (let i = embers.length - 1; i >= 0; i--) {
        const e = embers[i];
        e.x += e.speedX + Math.sin(e.life * 0.008 + e.wobbleOffset) * 0.12;
        e.y += e.speedY;
        e.life++;

        const lifeRatio = e.life / e.maxLife;
        const fadeIn = Math.min(lifeRatio * 8, 1);
        const fadeOut = lifeRatio > 0.7 ? 1 - (lifeRatio - 0.7) / 0.3 : 1;
        const fade = fadeIn * fadeOut;

        const radius = e.size * 4;
        const gradient = ctx.createRadialGradient(e.x, e.y, 0, e.x, e.y, radius);
        gradient.addColorStop(0, `hsla(${e.hue}, 70%, 60%, ${e.opacity * fade})`);
        gradient.addColorStop(0.4, `hsla(${e.hue}, 60%, 50%, ${e.opacity * fade * 0.35})`);
        gradient.addColorStop(1, `hsla(${e.hue}, 50%, 40%, 0)`);

        ctx.beginPath();
        ctx.arc(e.x, e.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        if (e.life >= e.maxLife || e.y < -20) {
          embers.splice(i, 1);
        }
      }

      raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-[1]"
      style={{ width: "100%", height: "100%" }}
      aria-hidden="true"
    />
  );
}
