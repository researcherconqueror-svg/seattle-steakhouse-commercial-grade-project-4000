import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { menuHighlights, steakItems, seafoodItems, sides, desserts, wineHighlights } from "@/data/menu";

export const metadata: Metadata = {
  title: "Dinner Menu | Ember & Oak",
  description: "Explore our complete dinner menu featuring prime dry-aged steaks, seafood, sides, and an award-winning wine list.",
};

type MenuItem = { name: string; desc: string; price: string; tag?: string };

function MenuSection({
  title,
  id,
  items,
  columns = false,
}: {
  title: string;
  id?: string;
  items: MenuItem[];
  columns?: boolean;
}) {
  return (
    <div id={id} className="mb-20 scroll-mt-36">
      <div className="text-center mb-12 reveal">
        <h2 className="font-[var(--font-display)] text-2xl md:text-3xl tracking-[0.05em] mb-3">
          {title}
        </h2>
        <div className="gold-line mx-auto" />
      </div>
      <div
        className={`grid gap-x-12 gap-y-0 ${
          columns ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"
        }`}
      >
        {items.map((item, i) => (
          <div
            key={i}
            className="reveal py-6 border-b border-[var(--border)] group"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1.5">
                  <h3 className="font-[var(--font-display)] text-lg text-[var(--cream)] group-hover:text-[var(--gold)] transition-colors duration-300">
                    {item.name}
                  </h3>
                  {item.tag && (
                    <span className="text-[0.55rem] tracking-[0.15em] uppercase px-2 py-0.5 bg-[var(--gold)]/10 text-[var(--gold)] border border-[var(--gold)]/20 rounded-sm">
                      {item.tag}
                    </span>
                  )}
                </div>
                <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
              <span className="font-[var(--font-display)] text-xl text-[var(--gold)] shrink-0 mt-0.5">
                ${item.price}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function MenuPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1558030006-450675393462?w=1920&q=80"
            alt=""
            fill
            className="object-cover opacity-20"
            sizes="100vw"
          /
            priority
            fetchPriority="high"
            quality={60}>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-primary)] via-[var(--bg-primary)]/80 to-[var(--bg-primary)]" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <p className="label-eyebrow text-[var(--gold)] mb-4 reveal">Dinner Service</p>
          <h1 className="display-section text-[var(--cream)] mb-6 reveal" style={{ transitionDelay: "0.1s" }}>
            The Menu
          </h1>
          <div className="gold-line-wide mx-auto mb-6 reveal" style={{ transitionDelay: "0.2s" }} />
          <p className="body-editorial max-w-lg mx-auto reveal" style={{ transitionDelay: "0.3s" }}>
            Every dish is prepared with precision and the finest seasonal ingredients.
            Menu items and pricing are subject to change based on market availability.
          </p>
        </div>
      </section>

      {/* Sticky nav */}
      <div className="sticky top-20 z-30 bg-[var(--bg-primary)]/95 backdrop-blur-xl border-b border-[var(--border)]">
        <div className="max-w-5xl mx-auto px-6 overflow-x-auto">
          <div className="flex items-center gap-8 py-4 min-w-max">
            {[
              { href: "#steaks", label: "Steaks" },
              { href: "#seafood", label: "Seafood" },
              { href: "#sides", label: "Sides" },
              { href: "#desserts", label: "Desserts" },
              { href: "#wine", label: "Wine" },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="label-nav text-[var(--text-muted)] hover:text-[var(--gold)] transition-colors duration-400 whitespace-nowrap cursor-expand"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Menu Content */}
      <section className="section-editorial">
        <div className="max-w-5xl mx-auto">
          <MenuSection title="Prime Steaks & Chops" id="steaks" items={steakItems} />
          <MenuSection title="Seafood" id="seafood" items={seafoodItems} />
          <MenuSection title="Sides" id="sides" items={sides} columns />
          <MenuSection title="Desserts" id="desserts" items={desserts} />

          {/* Wine Section */}
          <div id="wine" className="scroll-mt-36">
            <div className="text-center mb-12 reveal">
              <p className="text-[0.65rem] tracking-[0.3em] uppercase text-[var(--gold)] mb-3">
                Wine & Spirits
              </p>
              <h2 className="font-[var(--font-display)] text-2xl md:text-3xl tracking-[0.05em] mb-3">
                The Cellar
              </h2>
              <div className="gold-line mx-auto mb-4" />
              <p className="text-[var(--text-secondary)] text-sm max-w-md mx-auto">
                Over 400 labels curated by our sommelier. Glass and bottle pricing listed below.
              </p>
            </div>
            <div className="space-y-0">
              {wineHighlights.map((wine, i) => (
                <div key={i} className="reveal py-5 border-b border-[var(--border)] group">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="font-[var(--font-display)] text-lg text-[var(--cream)] group-hover:text-[var(--gold)] transition-colors">
                        {wine.name}
                      </h3>
                      <p className="text-[var(--text-secondary)] text-sm">{wine.type}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-[var(--text-muted)] text-xs tracking-wider uppercase block mb-0.5">Glass</span>
                      <span className="font-[var(--font-display)] text-lg text-[var(--gold)]">${wine.glass}</span>
                    </div>
                    <div className="text-right shrink-0 w-16">
                      <span className="text-[var(--text-muted)] text-xs tracking-wider uppercase block mb-0.5">Bottle</span>
                      <span className="font-[var(--font-display)] text-lg text-[var(--cream)]">${wine.bottle}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-center text-[var(--text-muted)] text-xs mt-6 reveal">
              Ask your server for our full wine list — over 400 selections available.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-[var(--bg-surface)]">
        <div className="max-w-3xl mx-auto text-center reveal">
          <p className="display-subsection text-[var(--cream)] mb-6">
            Ready to experience Ember & Oak?
          </p>
          <Link href="/reservations" className="btn-gold-filled">
            Reserve Your Table
          </Link>
        </div>
      </section>
    </>
  );
}
