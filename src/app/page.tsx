import Link from "next/link";
import Image from "next/image";
import MenuHighlights from "@/components/MenuHighlights";
import Testimonials from "@/components/Testimonials";
import HeroParallax from "@/components/HeroParallax";
import MotionReveal from "@/components/MotionReveal";
import SplitTextReveal from "@/components/SplitTextReveal";
import { philosophy, quote, reservationCTA } from "@/data/home";

export default function Home() {
  return (
    <>
      {/* ═══ Hero — Cinematic Parallax ═══ */}
      <HeroParallax />

      {/* ═══ Introduction — Asymmetric Split ═══ */}
      <section className="section-editorial">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Image — takes 7 columns */}
            <MotionReveal direction="left" className="lg:col-span-7">
              <div className="relative">
                <div className="img-zoom overflow-hidden">
                  <Image
                    src={philosophy.image}
                    alt={philosophy.imageAlt}
                    width={1000}
                    height={560}
                    className="w-full h-[400px] md:h-[560px] object-cover"
                    sizes="(max-width: 1024px) 100vw, 58vw"
                  />
                </div>
                {/* Floating accent */}
                <div className="absolute -bottom-6 -right-6 lg:-right-12 w-2/3 h-2/3 border border-[var(--gold)]/10 -z-10" />
              </div>
            </MotionReveal>

            {/* Text — takes 4 columns with offset */}
            <MotionReveal direction="right" delay={0.15} className="lg:col-span-4 lg:col-start-9">
              <p className="label-eyebrow text-[var(--gold)] mb-5">{philosophy.eyebrow}</p>
              <h2 className="mb-6">
                <SplitTextReveal text={philosophy.headingLine1} className="display-subsection text-[var(--cream)] block" />
                <SplitTextReveal text={philosophy.headingLine2} className="display-subsection text-[var(--gold)] block" delay={0.15} />
              </h2>
              <div className="gold-line mb-8" />
              <p className="body-editorial mb-6">
                {philosophy.body1}
              </p>
              <p className="body-editorial mb-10">
                {philosophy.body2}
              </p>
              <Link
                href={philosophy.ctaHref}
                className="inline-flex items-center gap-3 text-[var(--gold)] label-nav hover:gap-5 transition-all duration-500 cursor-expand"
              >
                {philosophy.ctaText}
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                </svg>
              </Link>
            </MotionReveal>
          </div>
        </div>
      </section>

      {/* ═══ Menu Highlights ═══ */}
      <MenuHighlights />

      {/* ═══ Full-Bleed Quote ═══ */}
      <section className="relative py-40 md:py-56 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={quote.backgroundImage}
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
          /
            priority
            fetchPriority="high"
            quality={60}>
        </div>
        <div className="absolute inset-0 bg-[var(--bg-primary)]/85" />
        <div className="absolute inset-0 film-grain" />
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <MotionReveal direction="up" duration={1.2}>
            <p className="label-eyebrow text-[var(--gold)] mb-8">{quote.eyebrow}</p>
            <blockquote className="font-[var(--font-display)] text-2xl sm:text-3xl md:text-[2.75rem] leading-[1.15] text-[var(--cream)] mb-8 italic font-light">
              &ldquo;{quote.text}&rdquo;
            </blockquote>
            <div className="gold-line mx-auto mb-6" />
            <p className="label-caption tracking-[0.2em]">
              — {quote.author}
            </p>
          </MotionReveal>
        </div>
      </section>

      {/* ═══ Testimonials ═══ */}
      <Testimonials />

      {/* ═══ Reservation CTA ═══ */}
      <section className="section-editorial">
        <div className="max-w-3xl mx-auto text-center">
          <MotionReveal direction="up">
            <p className="label-eyebrow text-[var(--gold)] mb-6">{reservationCTA.eyebrow}</p>
            <h2 className="mb-6">
              <SplitTextReveal text={reservationCTA.headingLine1} className="display-section text-[var(--cream)] block" />
              <SplitTextReveal text={reservationCTA.headingLine2} className="display-section text-[var(--gold)] block" delay={0.15} />
            </h2>
            <div className="gold-line-wide mx-auto mb-8" />
            <p className="body-editorial max-w-lg mx-auto mb-12">
              {reservationCTA.body}
            </p>
            <Link href={reservationCTA.ctaHref} className="btn-gold-filled cursor-expand">
              {reservationCTA.ctaText}
            </Link>
          </MotionReveal>
        </div>
      </section>
    </>
  );
}
