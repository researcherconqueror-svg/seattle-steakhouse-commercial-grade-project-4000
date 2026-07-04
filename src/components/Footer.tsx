import Link from "next/link";
import { footerLinks, footerHours, contactInfo } from "@/data/nav";

export default function Footer() {
  return (
    <footer className="bg-[var(--bg-primary)] border-t border-[var(--border)]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-20 lg:py-28">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Brand — takes 5 cols */}
          <div className="lg:col-span-5">
            <h3 className="font-[var(--font-display)] text-xl tracking-[0.08em] uppercase text-[var(--gold)] mb-5 font-light italic">
              Crimsonwood
            </h3>              <p className="body-editorial max-w-sm mb-8">
              Seattle&apos;s premier destination for prime steaks, rare vintages,
              and unforgettable evenings. Where every detail is crafted with
              intention.
            </p>
            <div className="flex items-center gap-3 text-[0.8rem] text-[var(--text-muted)]">
              <svg className="w-3.5 h-3.5 text-[var(--gold)]/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
              </svg>
              <span>{contactInfo.address}</span>
            </div>
          </div>

          {/* Spacer */}
          <div className="hidden lg:block lg:col-span-1" />

          {/* Dining */}
          <div className="lg:col-span-3">
            <h4 className="label-eyebrow text-[var(--gold)]/70 mb-6">Dining</h4>
            <ul className="space-y-3">
              {footerLinks.dining.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[0.8rem] text-[var(--text-muted)] hover:text-[var(--cream)] transition-colors duration-400 font-light"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Discover */}
          <div className="lg:col-span-3">
            <h4 className="label-eyebrow text-[var(--gold)]/70 mb-6">Discover</h4>
            <ul className="space-y-3">
              {footerLinks.discover.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[0.8rem] text-[var(--text-muted)] hover:text-[var(--cream)] transition-colors duration-400 font-light"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Hours */}
        <div className="mt-16 pt-8 border-t border-[var(--border)] grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <span className="label-eyebrow text-[var(--gold)]/50 block mb-2">Dinner</span>
            <span className="text-[0.8rem] text-[var(--text-muted)] font-light">
              {footerHours.dinner}
            </span>
          </div>
          <div>
            <span className="label-eyebrow text-[var(--gold)]/50 block mb-2">Weekend</span>
            <span className="text-[0.8rem] text-[var(--text-muted)] font-light">
              {footerHours.weekend}
            </span>
          </div>
          <div>
            <span className="label-eyebrow text-[var(--gold)]/50 block mb-2">Sunday</span>
            <span className="text-[0.8rem] text-[var(--text-muted)] font-light">
              {footerHours.sunday}
            </span>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-[var(--border)] flex flex-col md:flex-row items-center justify-between gap-4">            <p className="text-[0.7rem] text-[var(--text-muted)] font-light">
              © {new Date().getFullYear()} Crimsonwood. All rights reserved.
            </p>
            <div className="flex items-center gap-8">
              <a href={contactInfo.phoneHref} className="text-[0.7rem] text-[var(--text-muted)] hover:text-[var(--gold)] transition-colors font-light">
                {contactInfo.phone}
              </a>
              <a href={contactInfo.emailHref} className="text-[0.7rem] text-[var(--text-muted)] hover:text-[var(--gold)] transition-colors font-light">
                {contactInfo.email}
              </a>
            </div>
        </div>
      </div>
    </footer>
  );
}
