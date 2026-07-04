import Image from "next/image";
import type { Metadata } from "next";
import { contactHero, hours, details, directions } from "@/data/contact";

export const metadata: Metadata = {
  title: "Contact & Location | Nexus Prime",
  description:
    "Find Nexus Prime at 1201 Second Avenue in the heart of downtown Seattle. View hours, directions, and get in touch.",
};

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="absolute inset-0">
          <Image
            src={contactHero.backgroundImage}
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
          <p className="text-[0.65rem] tracking-[0.4em] uppercase text-[var(--gold)] mb-4 reveal">{contactHero.eyebrow}</p>
          <h1 className="font-[var(--font-display)] text-4xl md:text-6xl mb-4 reveal" style={{ transitionDelay: "0.1s" }}>
            {contactHero.heading}
          </h1>
          <div className="gold-line-wide mx-auto mb-6 reveal" style={{ transitionDelay: "0.2s" }} />
          <p className="text-[var(--text-secondary)] max-w-md mx-auto reveal" style={{ transitionDelay: "0.3s" }}>
            {contactHero.body}
          </p>
        </div>
      </section>

      {/* Map + Details */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Map */}
            <div className="reveal-left">
              <div className="rounded-sm overflow-hidden border border-[var(--border)] h-[400px] lg:h-full min-h-[400px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2689.3!2d-122.335!3d47.606!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDfCsDM2JzIxLjAiTiAxMjLCsDIwJzA2LjAiVw!5e0!3m2!1sen!2sus!4v1700000000000"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) brightness(0.9) contrast(1.1)" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Nexus Prime location"
                />
              </div>
            </div>

            {/* Info */}
            <div className="space-y-10 reveal-right">
              {/* Hours */}
              <div>
                <h2 className="font-[var(--font-display)] text-2xl mb-6">Hours</h2>
                <div className="space-y-4">
                  {hours.map((h, i) => (
                    <div key={i} className="flex items-center justify-between py-3 border-b border-[var(--border)]">
                      <span className="text-[var(--text-secondary)] text-sm">{h.day}</span>
                      <span className="text-[var(--cream)] text-sm font-medium">{h.time}</span>
                    </div>
                  ))}
                </div>
                <p className="text-[var(--text-muted)] text-xs mt-4">
                  Bar service available 30 minutes before and after dinner hours.
                </p>
              </div>

              {/* Contact details */}
              <div>
                <h2 className="font-[var(--font-display)] text-2xl mb-6">Get in Touch</h2>
                <div className="space-y-4">
                  {details.map((d, i) => (
                    <a
                      key={i}
                      href={d.href}
                      className="block group"
                      target={d.label === "Address" ? "_blank" : undefined}
                      rel={d.label === "Address" ? "noopener noreferrer" : undefined}
                    >
                      <span className="text-[0.65rem] tracking-[0.2em] uppercase text-[var(--gold)] block mb-1">
                        {d.label}
                      </span>
                      <span className="text-[var(--text-secondary)] text-sm group-hover:text-[var(--cream)] transition-colors whitespace-pre-line">
                        {d.value}
                      </span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Directions note */}
              <div className="bg-[var(--bg-surface)] border border-[var(--border)] rounded-sm p-6">
                <h3 className="font-[var(--font-display)] text-lg mb-3 text-[var(--cream)]">Getting Here</h3>
                <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
                  {directions.map((dir, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1 h-1 bg-[var(--gold)] rounded-full mt-2 shrink-0" />
                      <span>{dir}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick CTA */}
      <section className="py-16 md:py-24 bg-[var(--bg-surface)]">
        <div className="max-w-3xl mx-auto px-6 text-center reveal">
          <p className="font-[var(--font-display)] text-2xl md:text-3xl mb-6 italic text-[var(--cream)]">
            Ready to join us?
          </p>
          <a href="/reservations" className="btn-gold-filled">
            Make a Reservation
          </a>
        </div>
      </section>
    </>
  );
}
