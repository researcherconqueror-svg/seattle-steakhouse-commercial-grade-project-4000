"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "@/data/nav";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          scrolled
            ? "bg-[var(--bg-primary)]/95 backdrop-blur-xl border-b border-[var(--border)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-20 lg:h-24">
            {/* Logo */}
            <Link href="/" className="flex flex-col items-start group cursor-expand">
              <span className="font-[var(--font-display)] text-[1.1rem] tracking-[0.12em] uppercase text-[var(--gold)] transition-colors duration-500 group-hover:text-[var(--gold-light)] font-light italic">
                Nexus Prime
              </span>
              <span className="label-caption mt-0.5 tracking-[0.3em] text-[0.55rem]">
                Seattle
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-12">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`label-nav transition-colors duration-400 cursor-expand ${
                    pathname === link.href
                      ? "text-[var(--gold)]"
                      : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                  }`}
                >
                  <span className="nav-link">{link.label}</span>
                </Link>
              ))}
              <Link
                href="/reservations"
                className="btn-gold text-[0.6rem] py-3 px-7 cursor-expand"
              >
                Reserve
              </Link>
            </div>

            {/* Mobile hamburger */}
            <button
              className="lg:hidden flex flex-col gap-[5px] p-2 cursor-expand"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
            >
              <span
                className={`block w-6 h-[1px] bg-[var(--gold)] transition-all duration-500 origin-center ${
                  mobileOpen ? "rotate-45 translate-y-[3px]" : ""
                }`}
              />
              <span
                className={`block w-4 h-[1px] bg-[var(--gold)] transition-all duration-500 ml-auto ${
                  mobileOpen ? "opacity-0 w-0" : ""
                }`}
              />
              <span
                className={`block w-6 h-[1px] bg-[var(--gold)] transition-all duration-500 origin-center ${
                  mobileOpen ? "-rotate-45 -translate-y-[3px]" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={`fixed inset-0 z-40 bg-[var(--bg-primary)]/98 backdrop-blur-2xl transition-all duration-700 lg:hidden ${
          mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-10">
          {navLinks.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              className={`font-[var(--font-display)] text-3xl font-light italic tracking-[0.08em] transition-all duration-600 ${
                pathname === link.href
                  ? "text-[var(--gold)]"
                  : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
              }`}
              style={{
                transitionDelay: mobileOpen ? `${i * 60 + 100}ms` : "0ms",
                opacity: mobileOpen ? 1 : 0,
                transform: mobileOpen ? "translateY(0)" : "translateY(16px)",
              }}
            >
              {link.label}
            </Link>
          ))}
          <div
            className="w-8 h-[1px] bg-[var(--gold)]/30 my-2"
            style={{
              transitionDelay: mobileOpen ? "500ms" : "0ms",
              opacity: mobileOpen ? 1 : 0,
            }}
          />
          <Link
            href="/reservations"
            className="btn-gold text-[0.7rem]"
            style={{
              transitionDelay: mobileOpen ? "560ms" : "0ms",
              opacity: mobileOpen ? 1 : 0,
              transform: mobileOpen ? "translateY(0)" : "translateY(16px)",
            }}
          >
            Reserve a Table
          </Link>
        </div>
      </div>
    </>
  );
}
