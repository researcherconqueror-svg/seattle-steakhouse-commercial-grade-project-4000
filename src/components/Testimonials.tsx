import SplitTextReveal from "@/components/SplitTextReveal";
import { testimonials } from "@/data/testimonials";

export default function Testimonials() {
  return (
    <section className="section-editorial bg-[var(--bg-surface)]">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-20 reveal">
          <p className="label-eyebrow text-[var(--gold)] mb-4">Guest Experiences</p>
          <h2>
            <SplitTextReveal text="Words from Our Guests" className="display-section text-[var(--cream)]" />
          </h2>
          <div className="gold-line-wide mx-auto mt-8" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-[var(--border)]">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="reveal bg-[var(--bg-surface)] p-10 lg:p-12 flex flex-col group hover:bg-[var(--bg-elevated)] transition-colors duration-700"
            >
              {/* Large quotation mark */}
              <span className="font-[var(--font-display)] text-6xl text-[var(--gold)]/15 leading-none mb-6 block">
                &ldquo;
              </span>

              <blockquote className="font-[var(--font-display)] text-lg md:text-xl text-[var(--cream-muted)] leading-[1.6] flex-1 mb-8 italic font-light">
                {t.quote}
              </blockquote>

              <div className="border-t border-[var(--border)] pt-6">
                <p className="text-[var(--cream)] text-[0.8rem] font-medium tracking-wide">
                  {t.author}
                </p>
                <p className="label-caption mt-1 text-[0.6rem] tracking-[0.15em] uppercase">
                  {t.context}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
