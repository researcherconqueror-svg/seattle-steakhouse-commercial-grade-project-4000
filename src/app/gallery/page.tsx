"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from "lenis/react";
import { galleryImages, categories } from "@/data/gallery";

gsap.registerPlugin(ScrollTrigger);

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const lenis = useLenis();
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const filtered =
    activeCategory === "All"
      ? galleryImages
      : galleryImages.filter((img) => img.category === activeCategory);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const navigateLightbox = useCallback(
    (direction: "prev" | "next") => {
      if (lightboxIndex === null) return;
      if (direction === "next") {
        setLightboxIndex((prev) => ((prev ?? 0) + 1) % filtered.length);
      } else {
        setLightboxIndex((prev) => ((prev ?? 0) - 1 + filtered.length) % filtered.length);
      }
    },
    [lightboxIndex, filtered.length]
  );

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") navigateLightbox("next");
      if (e.key === "ArrowLeft") navigateLightbox("prev");
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [lightboxIndex, closeLightbox, navigateLightbox]);

  /* ── Sync Lenis with GSAP ScrollTrigger ── */
  useEffect(() => {
    if (!lenis) return;

    const onScroll = () => ScrollTrigger.update();
    lenis.on("scroll", onScroll);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.off("scroll", onScroll);
    };
  }, [lenis]);

  /* ── GSAP Horizontal Scroll ── */
  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    // Kill any existing ScrollTrigger on this section
    const existingTriggers = ScrollTrigger.getAll().filter(
      (t) => t.vars.trigger === section || t.vars.trigger === track
    );
    existingTriggers.forEach((t) => t.kill());

    const totalWidth = track.scrollWidth - window.innerWidth;

    const ctx = gsap.context(() => {
      gsap.to(track, {
        x: -totalWidth,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${totalWidth}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });
    }, section);

    return () => {
      ctx.revert();
    };
  }, [activeCategory]);

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1600891964092-4316c288032e?w=1280&q=80"
            alt=""
            fill
            className="object-cover opacity-10"
            sizes="100vw"
          priority
            fetchPriority="high"
            quality={60}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-primary)] via-[var(--bg-primary)]/85 to-[var(--bg-primary)]" />
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 text-center">
          <p className="label-eyebrow text-[var(--gold)] mb-4 reveal">Gallery</p>
          <h1 className="display-section text-[var(--cream)] mb-4 reveal" style={{ transitionDelay: "0.1s" }}>
            A Visual Experience
          </h1>
          <div className="gold-line-wide mx-auto mb-6 reveal" style={{ transitionDelay: "0.2s" }} />
          <p className="body-editorial max-w-md mx-auto reveal" style={{ transitionDelay: "0.3s" }}>
            Moments from our kitchen, dining room, and private spaces.
          </p>
        </div>
      </section>

      {/* Filter tabs */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 mb-8">
        <div className="flex items-center justify-center gap-8 flex-wrap reveal" role="tablist" aria-label="Gallery categories">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              role="tab"
              aria-selected={activeCategory === cat}
              aria-label={`Filter by ${cat}`}
              className={`label-nav transition-colors duration-400 pb-2 border-b cursor-expand ${
                activeCategory === cat
                  ? "text-[var(--gold)] border-[var(--gold)]"
                  : "text-[var(--text-muted)] border-transparent hover:text-[var(--text-secondary)]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Scroll instruction */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 mb-8">
        <p className="text-center text-[var(--text-muted)] text-xs tracking-widest uppercase reveal">
          Scroll to explore
        </p>
      </div>

      {/* ═══ Pinned Horizontal Scroll Gallery ═══ */}
      <div ref={sectionRef} className="relative overflow-hidden">
        <div
          ref={trackRef}
          className="flex items-center gap-6 px-6 lg:px-12 py-8"
          style={{ width: "max-content" }}
        >
          {filtered.map((img, i) => (
            <div
              key={`${img.src}-${i}`}
              className="relative shrink-0 overflow-hidden rounded-sm cursor-pointer group cursor-view"
              style={{ width: "min(70vw, 600px)", height: "min(50vh, 480px)" }}
              onClick={() => openLightbox(i)}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                sizes="70vw"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-[var(--bg-primary)]/0 group-hover:bg-[var(--bg-primary)]/40 transition-all duration-700 flex items-end p-8 opacity-0 group-hover:opacity-100">
                <div>
                  <p className="label-eyebrow text-[var(--gold)] text-[0.55rem] mb-1">{img.category}</p>
                  <p className="text-sm text-[var(--cream)] tracking-wide font-light">{img.alt}</p>
                </div>
              </div>
              {/* Index counter */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <span className="text-[0.6rem] tracking-widest text-[var(--gold)] font-medium">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom spacing after pinned section */}
      <div className="h-24" />

      {/* ═══ Bento Grid (below the fold) ═══ */}
      <section className="pb-24 md:pb-32 px-6 lg:px-12">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-12 reveal">
            <p className="label-eyebrow text-[var(--gold)] mb-4">Full Collection</p>
            <h2 className="display-subsection text-[var(--cream)]">Browse All</h2>
            <div className="gold-line-wide mx-auto mt-6" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 stagger-children">
            {filtered.map((img, i) => (
              <div
                key={`grid-${img.src}-${i}`}
                className="reveal overflow-hidden rounded-sm cursor-pointer group relative cursor-view"
                style={{ minHeight: "280px" }}
                onClick={() => openLightbox(i)}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-[var(--bg-primary)]/0 group-hover:bg-[var(--bg-primary)]/50 transition-all duration-700 flex items-end p-6 opacity-0 group-hover:opacity-100">
                  <div>
                    <p className="label-eyebrow text-[var(--gold)] text-[0.55rem] mb-1">{img.category}</p>
                    <p className="text-xs text-[var(--cream)] tracking-wide font-light">{img.alt}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ Lightbox ═══ */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[100] bg-[var(--bg-primary)]/97 backdrop-blur-xl flex items-center justify-center px-4"
          onClick={closeLightbox}
        >
          <button
            className="absolute top-6 right-6 text-[var(--text-muted)] hover:text-[var(--cream)] transition-colors cursor-expand"
            onClick={closeLightbox}
            aria-label="Close lightbox"
          >
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <button
            className="absolute left-4 md:left-8 text-[var(--text-muted)] hover:text-[var(--gold)] transition-colors cursor-expand"
            onClick={(e) => { e.stopPropagation(); navigateLightbox("prev"); }}
            aria-label="Previous image"
          >
            <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>

          <div className="max-w-5xl max-h-[85vh] relative" onClick={(e) => e.stopPropagation()}>
            <Image
              src={filtered[lightboxIndex].src}
              alt={filtered[lightboxIndex].alt}
              width={1200}
              height={800}
              className="max-w-full max-h-[85vh] object-contain"
              sizes="85vw"
            />
            <div className="text-center mt-6">
              <p className="body-editorial text-[0.85rem]">{filtered[lightboxIndex].alt}</p>
              <p className="label-caption mt-2 text-[0.6rem]">
                {lightboxIndex + 1} / {filtered.length}
              </p>
            </div>
          </div>

          <button
            className="absolute right-4 md:right-8 text-[var(--text-muted)] hover:text-[var(--gold)] transition-colors cursor-expand"
            onClick={(e) => { e.stopPropagation(); navigateLightbox("next"); }}
            aria-label="Next image"
          >
            <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>
      )}
    </>
  );
}
