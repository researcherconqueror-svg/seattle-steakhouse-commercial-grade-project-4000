import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { spaces, inclusions, privateDiningHero } from "@/data/private-dining";

export const metadata: Metadata = {
  title: "Private Dining | Crimson Black",
  description: "Host your next event in one of our three private dining spaces, each designed for an unforgettable experience.",
};

export default function PrivateDiningPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="absolute inset-0">
          <Image
            src={privateDiningHero.backgroundImage}
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
          <p className="text-[0.65rem] tracking-[0.4em] uppercase text-[var(--gold)] mb-4 reveal">{privateDiningHero.eyebrow}</p>
          <h1 className="font-[var(--font-display)] text-4xl md:text-6xl mb-6 reveal" style={{ transitionDelay: "0.1s" }}>
            {privateDiningHero.heading}
          </h1>
          <div className="gold-line-wide mx-auto mb-6 reveal" style={{ transitionDelay: "0.2s" }} />
          <p className="text-[var(--text-secondary)] max-w-lg mx-auto reveal" style={{ transitionDelay: "0.3s" }}>
            {privateDiningHero.body}
          </p>
        </div>
      </section>

      {/* Spaces */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-24">
          {spaces.map((space, i) => (
            <div key={i} className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center`}>
              <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                <div className="img-zoom rounded-sm overflow-hidden">
                  <Image
                    src={space.image}
                    alt={space.name}
                    width={800}
                    height={420}
                    className="w-full h-[350px] md:h-[420px] object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </div>
              <div className={`${i % 2 === 1 ? "lg:order-1" : ""} reveal`}>
                <p className="text-[0.6rem] tracking-[0.3em] uppercase text-[var(--gold)] mb-2">{space.capacity}</p>
                <h2 className="font-[var(--font-display)] text-3xl md:text-4xl mb-4">{space.name}</h2>
                <div className="gold-line mb-6" />
                <p className="text-[var(--text-secondary)] leading-relaxed mb-6">{space.description}</p>
                <ul className="grid grid-cols-2 gap-2 mb-6">
                  {space.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                      <span className="w-1 h-1 bg-[var(--gold)] rounded-full shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-[var(--text-muted)] tracking-wider uppercase mb-6">
                  Ideal for: {space.ideal}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Inclusions */}
      <section className="py-16 md:py-24 bg-[var(--bg-surface)]">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12 reveal">
            <p className="text-[0.65rem] tracking-[0.3em] uppercase text-[var(--gold)] mb-3">Every Private Event Includes</p>
            <h2 className="font-[var(--font-display)] text-2xl md:text-3xl">Comprehensive Service</h2>
            <div className="gold-line mx-auto mt-4" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 stagger-children">
            {inclusions.map((item, i) => (
              <div key={i} className="reveal flex items-start gap-4 bg-[var(--bg-elevated)] border border-[var(--border)] rounded-sm p-5">
                <svg className="w-5 h-5 text-[var(--gold)] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                <span className="text-sm text-[var(--text-secondary)]">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Inquiry Form */}
      <section className="py-16 md:py-24">
        <div className="max-w-2xl mx-auto px-6">
          <div className="text-center mb-12 reveal">
            <p className="text-[0.65rem] tracking-[0.3em] uppercase text-[var(--gold)] mb-3">Get in Touch</p>
            <h2 className="font-[var(--font-display)] text-2xl md:text-3xl mb-4">Plan Your Event</h2>
            <div className="gold-line mx-auto" />
          </div>

          <form className="space-y-6 reveal">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-[0.7rem] tracking-[0.2em] uppercase text-[var(--gold)] mb-3">Full Name</label>
                <input type="text" placeholder="Your name" className="w-full bg-[var(--bg-surface)] border border-[var(--border)] rounded-sm px-4 py-3 text-[var(--cream)] text-sm placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--gold)] transition-colors" />
              </div>
              <div>
                <label className="block text-[0.7rem] tracking-[0.2em] uppercase text-[var(--gold)] mb-3">Email</label>
                <input type="email" placeholder="you@email.com" className="w-full bg-[var(--bg-surface)] border border-[var(--border)] rounded-sm px-4 py-3 text-[var(--cream)] text-sm placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--gold)] transition-colors" />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-[0.7rem] tracking-[0.2em] uppercase text-[var(--gold)] mb-3">Phone</label>
                <input type="tel" placeholder="(206) 555-0000" className="w-full bg-[var(--bg-surface)] border border-[var(--border)] rounded-sm px-4 py-3 text-[var(--cream)] text-sm placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--gold)] transition-colors" />
              </div>
              <div>
                <label className="block text-[0.7rem] tracking-[0.2em] uppercase text-[var(--gold)] mb-3">Event Type</label>
                <select className="w-full bg-[var(--bg-surface)] border border-[var(--border)] rounded-sm px-4 py-3 text-[var(--text-secondary)] text-sm focus:outline-none focus:border-[var(--gold)] transition-colors appearance-none">
                  <option>Corporate Event</option>
                  <option>Private Celebration</option>
                  <option>Wedding Reception</option>
                  <option>Wine Dinner</option>
                  <option>Holiday Party</option>
                  <option>Other</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-[0.7rem] tracking-[0.2em] uppercase text-[var(--gold)] mb-3">Guest Count</label>
                <input type="number" placeholder="Estimated guests" className="w-full bg-[var(--bg-surface)] border border-[var(--border)] rounded-sm px-4 py-3 text-[var(--cream)] text-sm placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--gold)] transition-colors" />
              </div>
              <div>
                <label className="block text-[0.7rem] tracking-[0.2em] uppercase text-[var(--gold)] mb-3">Preferred Date</label>
                <input type="date" className="w-full bg-[var(--bg-surface)] border border-[var(--border)] rounded-sm px-4 py-3 text-[var(--cream)] text-sm focus:outline-none focus:border-[var(--gold)] transition-colors [color-scheme:dark]" />
              </div>
            </div>
            <div>
              <label className="block text-[0.7rem] tracking-[0.2em] uppercase text-[var(--gold)] mb-3">Tell Us About Your Event</label>
              <textarea rows={4} placeholder="Describe your vision — theme, dietary needs, special requests..." className="w-full bg-[var(--bg-surface)] border border-[var(--border)] rounded-sm px-4 py-3 text-[var(--cream)] text-sm placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--gold)] transition-colors resize-none" />
            </div>
            <button type="submit" className="btn-gold-filled w-full">Submit Inquiry</button>
          </form>

          <p className="text-center text-[var(--text-muted)] text-xs mt-8 reveal">
            Our events team will respond within 24 hours. For immediate assistance, call{" "}
            <a href="tel:+12065551892" className="text-[var(--gold)] hover:text-[var(--gold-light)]">(206) 555-1892</a>.
          </p>
        </div>
      </section>
    </>
  );
}
