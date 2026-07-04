import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { aboutHero, chefStory, values, timeline, careers } from "@/data/about";

export const metadata: Metadata = {
  title: "Our Story | Nexus Prime",
  description:
    "Discover the story behind Nexus Prime — from our Pacific Northwest roots to Seattle's premier steakhouse experience.",
};

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="absolute inset-0">
          <Image
            src={aboutHero.backgroundImage}
            alt=""
            fill
            className="object-cover opacity-15"
            sizes="100vw"
          priority
            fetchPriority="high"
            quality={60}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-primary)] via-[var(--bg-primary)]/80 to-[var(--bg-primary)]" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <p className="label-eyebrow text-[var(--gold)] mb-4 reveal">{aboutHero.eyebrow}</p>
          <h1 className="display-section text-[var(--cream)] mb-6 reveal" style={{ transitionDelay: "0.1s" }}>
            {aboutHero.heading}
          </h1>
          <div className="gold-line-wide mx-auto mb-6 reveal" style={{ transitionDelay: "0.2s" }} />
          <p className="body-editorial max-w-lg mx-auto reveal" style={{ transitionDelay: "0.3s" }}>
            {aboutHero.body}
          </p>
        </div>
      </section>

      {/* Origin Story */}
      <section className="section-editorial">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="reveal-left">
              <div className="img-zoom rounded-sm overflow-hidden">
                <Image
                  src={chefStory.image}
                  alt={chefStory.imageAlt}
                  width={800}
                  height={500}
                  className="w-full h-[400px] md:h-[500px] object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="mt-4 text-center">
                <p className="font-[var(--font-display)] text-lg text-[var(--cream)]">
                  {chefStory.name}
                </p>
                <p className="text-[var(--text-muted)] text-xs tracking-[0.15em] uppercase">
                  {chefStory.role}
                </p>
              </div>
            </div>

            <div className="reveal-right">
              <p className="label-eyebrow text-[var(--gold)] mb-5">
                The Beginning
              </p>
              <h2 className="display-subsection text-[var(--cream)] leading-tight mb-6">
                {chefStory.headingLine1}
                <br />
                <span className="text-[var(--gold)]">{chefStory.headingLine2}</span>
              </h2>
              <div className="gold-line mb-8" />
              <p className="body-editorial mb-6">
                {chefStory.body1}
              </p>
              <p className="body-editorial mb-6">
                {chefStory.body2}
              </p>
              <p className="body-editorial">
                {chefStory.body3}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-editorial bg-[var(--bg-surface)]">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-16 reveal">
            <p className="label-eyebrow text-[var(--gold)] mb-4">What We Stand For</p>
            <h2 className="display-section text-[var(--cream)]">Our Values</h2>
            <div className="gold-line-wide mx-auto mt-6" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 stagger-children">
            {values.map((v, i) => (
              <div
                key={i}
                className="reveal bg-[var(--bg-elevated)] border border-[var(--border)] p-8 group hover:border-[var(--gold)]/20 transition-colors duration-700"
              >
                <div className="text-[var(--gold)] mb-5 group-hover:scale-110 transition-transform duration-500 inline-block">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    {v.iconPath.split("|").map((d, pi) => (
                      <path key={pi} strokeLinecap="round" strokeLinejoin="round" d={d.trim()} />
                    ))}
                  </svg>
                </div>
                <h3 className="font-[var(--font-display)] text-xl mb-3 text-[var(--cream)] font-light italic">
                  {v.title}
                </h3>
                <p className="text-[var(--text-secondary)] text-[0.85rem] leading-relaxed font-light">
                  {v.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-editorial">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 reveal">
            <p className="label-eyebrow text-[var(--gold)] mb-4">Our Journey</p>
            <h2 className="display-section text-[var(--cream)]">Milestones</h2>
            <div className="gold-line mx-auto mt-6" />
          </div>
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-[var(--border)]" />
            <div className="space-y-12">
              {timeline.map((item, i) => (
                <div key={i} className="reveal relative flex gap-8">
                  <div className="relative z-10 w-12 md:w-16 h-12 md:h-16 rounded-full border border-[var(--gold)]/40 bg-[var(--bg-primary)] flex items-center justify-center shrink-0">
                    <time className="text-[var(--gold)] text-xs font-medium" dateTime={item.year}>{item.year}</time>
                  </div>
                  <div className="pt-2 md:pt-4">
                    <p className="text-[var(--text-secondary)] leading-relaxed font-light">
                      {item.event}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Careers CTA */}
      <section id="careers" className="section-editorial bg-[var(--bg-surface)] scroll-mt-20">
        <div className="max-w-3xl mx-auto text-center reveal">
          <p className="label-eyebrow text-[var(--gold)] mb-4">{careers.eyebrow}</p>
          <h2 className="display-subsection text-[var(--cream)] mb-4">
            {careers.heading}
          </h2>
          <div className="gold-line mx-auto mb-6" />
          <p className="body-editorial max-w-md mx-auto mb-8">
            {careers.body}
          </p>
          <a href={`mailto:${careers.email}`} className="btn-gold">
            {careers.ctaText}
          </a>
        </div>
      </section>
    </>
  );
}
