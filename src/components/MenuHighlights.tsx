import Link from "next/link";
import { menuHighlights } from "@/data/menu";

export default function MenuHighlights() {
  return (
    <section className="section-editorial bg-[var(--bg-surface)]">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left — Section Header */}
          <div className="lg:col-span-4 lg:sticky lg:top-32 lg:self-start">
            <div className="reveal">
              <p className="label-eyebrow text-[var(--gold)] mb-4">From the Kitchen</p>
              <h2 className="display-subsection text-[var(--cream)] mb-4">
                Signature Cuts
              </h2>
              <div className="gold-line mb-6" />
              <p className="body-editorial mb-8">
                A selection of our most celebrated preparations. The full menu
                features over 40 dishes across seven courses.
              </p>
              <Link href="/menu" className="btn-gold text-[0.6rem] py-3 px-7 cursor-expand">
                View Full Menu
              </Link>
            </div>
          </div>

          {/* Right — Menu Items */}
          <div className="lg:col-span-8 stagger-children">
            {menuHighlights.map((item, i) => (
              <div
                key={i}
                className="reveal group py-8 border-b border-[var(--border)] last:border-b-0 cursor-expand"
              >
                <div className="flex items-start justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-3">
                      <h3 className="font-[var(--font-display)] text-xl md:text-2xl text-[var(--cream)] group-hover:text-[var(--gold)] transition-colors duration-500 font-light italic">
                        {item.name}
                      </h3>
                      {item.tag && (
                        <span className="label-caption text-[0.55rem] tracking-[0.18em] uppercase px-3 py-1 bg-[var(--gold-dim)] text-[var(--gold)] border border-[var(--gold)]/15 rounded-sm">
                          {item.tag}
                        </span>
                      )}
                    </div>
                    <p className="text-[var(--text-secondary)] text-[0.85rem] leading-relaxed max-w-lg font-light">
                      {item.description}
                    </p>
                  </div>
                  <span className="font-[var(--font-display)] text-2xl text-[var(--gold)] shrink-0 font-light italic">
                    ${item.price}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
