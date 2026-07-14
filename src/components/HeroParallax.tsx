"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { heroContent } from "@/data/home";
import AmbientEmbers from "@/components/AmbientEmbers";

export default function HeroParallax() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative h-[100dvh] min-h-[700px] flex items-end overflow-hidden"
    >
      {/* Background with parallax */}
      <motion.div
        className="absolute inset-0"
        style={{ y: bgY }}
      >
        <Image
          src={heroContent.heroImage}
          alt="Steakhouse ambiance"
          fill
          className="object-cover scale-[1.03]"
          priority
          fetchPriority="high"
          quality={60}
          sizes="(max-width: 768px) 100vw, 100vw"
        />
        <div className="absolute inset-0 hero-fade" />
        <div className="absolute inset-0 bg-[var(--bg-primary)]/20" />
      </motion.div>

      {/* Ambient embers */}
      <AmbientEmbers />

      {/* Hero Content with parallax */}
      <motion.div
        className="relative z-10 w-full max-w-[1400px] mx-auto px-6 lg:px-12 pb-20 lg:pb-28"
        style={{ y: textY, opacity: textOpacity }}
      >
        <div className="max-w-2xl">
          <motion.p
            className="label-eyebrow text-[var(--gold)] mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {heroContent.eyebrow}
          </motion.p>
          <motion.h1
            className="display-hero text-[var(--cream)] mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {heroContent.titleLine1}
            {heroContent.titleLine2 && (
              <span className="block text-[0.4em] tracking-widest text-[var(--gold)] mt-4 font-light uppercase">
                {heroContent.titleLine2}
              </span>
            )}
          </motion.h1>
          <motion.div
            className="gold-line-wide mb-8"
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ duration: 1.4, delay: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          />
          <motion.p
            className="body-editorial max-w-md mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {heroContent.body}
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row items-start gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <Link href={heroContent.ctaPrimary.href} className="btn-gold-filled cursor-expand">
              {heroContent.ctaPrimary.text}
            </Link>
            <Link href={heroContent.ctaSecondary.href} className="btn-gold cursor-expand">
              {heroContent.ctaSecondary.text}
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-6 lg:left-12 flex items-center gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.6 }}
      >
        <div className="w-[1px] h-12 bg-gradient-to-b from-[var(--gold)] to-transparent" />
        <span className="label-caption tracking-[0.3em] text-[0.55rem]">Scroll</span>
      </motion.div>
    </section>
  );
}
