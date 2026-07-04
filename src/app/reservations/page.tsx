"use client";

import { useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "motion/react";

/* ── Zod Schema ── */
const reservationSchema = z.object({
  partySize: z.number().min(1).max(10),
  date: z.string().min(1, "Please select a date"),
  time: z.string().min(1, "Please select a time"),
  experience: z.enum(["main", "chefs-counter"], {
    message: "Please select an experience",
  }),
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email required"),
  phone: z.string().min(7, "Valid phone required"),
  requests: z.string().optional(),
});

type ReservationForm = z.infer<typeof reservationSchema>;

/* ── Data ── */
const timeSlots = [
  "5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM", "7:00 PM",
  "7:30 PM", "8:00 PM", "8:30 PM", "9:00 PM", "9:30 PM",
];

const partyOptions = [1, 2, 3, 4, 5, 6, 7, 8];

const experiences = [
  {
    id: "main" as const,
    name: "Main Dining Room",
    tagline: "The Classic Ember & Oak Experience",
    description: "Our signature dining room featuring vaulted ceilings, warm oak paneling, and an atmosphere of refined elegance.",
    capacity: "2 – 8 guests",
  },
  {
    id: "chefs-counter" as const,
    name: "The Chef's Counter",
    tagline: "An Intimate Front-Row Seat",
    description: "An exclusive 8-seat counter facing the open kitchen. Watch Chef Marcus Hale and his team craft your meal, course by course.",
    capacity: "2 – 4 guests",
  },
];

const stepLabels = ["Date & Party", "Time", "Experience", "Details"];

/* ── Slide Animation ── */
const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({
    x: direction > 0 ? -300 : 300,
    opacity: 0,
  }),
};

/* ── Component ── */
export default function ReservationsPage() {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    trigger,
    formState: { errors },
  } = useForm<ReservationForm>({
    resolver: zodResolver(reservationSchema),
    defaultValues: {
      partySize: 2,
      date: "",
      time: "",
      experience: undefined,
      name: "",
      email: "",
      phone: "",
      requests: "",
    },
  });

  const formData = watch();

  const goNext = async () => {
    // Validate current step fields before advancing
    if (step === 1) {
      const valid = await trigger(["date", "partySize"]);
      if (!valid) return;
    } else if (step === 2) {
      const valid = await trigger(["time"]);
      if (!valid) return;
    } else if (step === 3) {
      const valid = await trigger(["experience"]);
      if (!valid) return;
    }
    setDirection(1);
    setStep((s) => Math.min(s + 1, 4));
  };

  const goBack = () => {
    setDirection(-1);
    setStep((s) => Math.max(s - 1, 1));
  };

  const onSubmit = () => {
    setSubmitted(true);
  };

  /* ── Confirmed: Booking Ticket ── */
  if (submitted) {
    const d = getValues();
    return (
      <section className="min-h-screen flex items-center justify-center px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="max-w-lg w-full"
        >
          {/* Ticket */}
          <div className="relative bg-[var(--bg-surface)] border border-[var(--gold)]/20 rounded-sm overflow-hidden">
            {/* Gold top accent */}
            <div className="h-1 bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent" />

            <div className="p-8 md:p-10">
              {/* Check icon */}
              <div className="flex justify-center mb-6">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.5, type: "spring", stiffness: 200 }}
                  className="w-16 h-16 border border-[var(--gold)] rounded-full flex items-center justify-center"
                >
                  <svg className="w-8 h-8 text-[var(--gold)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </motion.div>
              </div>

              <h1 className="font-[var(--font-display)] text-3xl md:text-4xl text-center mb-2 text-[var(--cream)]">
                Reservation Confirmed
              </h1>
              <div className="gold-line-wide mx-auto mb-6" />

              {/* Ticket body */}
              <div className="border border-[var(--border)] rounded-sm p-6 mb-6">
                <div className="text-center mb-4">
                  <p className="text-[var(--cream)] font-[var(--font-display)] text-lg">
                    Thank you, {d.name}
                  </p>
                </div>

                <div className="border-t border-dashed border-[var(--border)] my-4" />

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[var(--text-muted)]">Date</span>
                    <span className="text-[var(--cream)] font-medium">
                      {new Date(d.date + "T00:00:00").toLocaleDateString("en-US", {
                        weekday: "long",
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--text-muted)]">Time</span>
                    <span className="text-[var(--cream)] font-medium">{d.time}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--text-muted)]">Party</span>
                    <span className="text-[var(--cream)] font-medium">
                      {d.partySize} {d.partySize === 1 ? "guest" : "guests"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--text-muted)]">Experience</span>
                    <span className="text-[var(--cream)] font-medium">
                      {d.experience === "chefs-counter" ? "Chef's Counter" : "Main Dining"}
                    </span>
                  </div>
                </div>

                <div className="border-t border-dashed border-[var(--border)] my-4" />

                <div className="text-center">
                  <p className="text-[var(--text-muted)] text-xs">
                    Confirmation sent to{" "}
                    <span className="text-[var(--gold)]">{d.email}</span>
                  </p>
                </div>
              </div>

              <p className="text-center text-[var(--text-muted)] text-xs mb-6">
                For changes, please call us at (206) 555-1892.
              </p>

              <a href="/" className="btn-gold-filled w-full block text-center">
                Return Home
              </a>
            </div>
          </div>
        </motion.div>
      </section>
    );
  }

  /* ── Main Form ── */
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920&q=80"
            alt=""
            fill
            className="object-cover opacity-15"
            sizes="100vw"
          /
            priority
            fetchPriority="high"
            quality={60}>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-primary)] via-[var(--bg-primary)]/80 to-[var(--bg-primary)]" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <p className="text-[0.65rem] tracking-[0.4em] uppercase text-[var(--gold)] mb-4 reveal">Reservations</p>
          <h1 className="font-[var(--font-display)] text-4xl md:text-6xl mb-4 reveal" style={{ transitionDelay: "0.1s" }}>
            Reserve Your Table
          </h1>
          <div className="gold-line-wide mx-auto mb-6 reveal" style={{ transitionDelay: "0.2s" }} />
          <p className="text-[var(--text-secondary)] max-w-md mx-auto reveal" style={{ transitionDelay: "0.3s" }}>
            We recommend reserving at least 48 hours in advance for weekend dining.
          </p>
        </div>
      </section>

      {/* Progress steps */}
      <div className="max-w-2xl mx-auto px-6 mb-12">
        <div className="flex items-center justify-between">
          {stepLabels.map((label, i) => (
            <div key={i} className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium border transition-all duration-500 ${
                  step > i + 1
                    ? "bg-[var(--gold)] text-[var(--bg-primary)] border-[var(--gold)]"
                    : step === i + 1
                    ? "border-[var(--gold)] text-[var(--gold)]"
                    : "border-[var(--border)] text-[var(--text-muted)]"
                }`}
              >
                {step > i + 1 ? (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                ) : (
                  i + 1
                )}
              </div>
              <span className={`hidden sm:inline text-xs tracking-wider uppercase transition-colors duration-500 ${step >= i + 1 ? "text-[var(--gold)]" : "text-[var(--text-muted)]"}`}>
                {label}
              </span>
              {i < 3 && (
                <div className={`hidden sm:block w-8 lg:w-16 h-px mx-2 transition-colors duration-500 ${step > i + 1 ? "bg-[var(--gold)]" : "bg-[var(--border)]"}`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Form steps */}
      <section className="py-12 md:py-16">
        <div className="max-w-2xl mx-auto px-6 overflow-hidden">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={step}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            >
              {/* Step 1: Date & Party Size */}
              {step === 1 && (
                <div className="space-y-10">
                  <div>
                    <label className="block text-[0.7rem] tracking-[0.2em] uppercase text-[var(--gold)] mb-4">Party Size</label>
                    <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
                      {partyOptions.map((n) => (
                        <button
                          key={n}
                          type="button"
                          onClick={() => setValue("partySize", n, { shouldValidate: true })}
                          className={`py-3 rounded-sm text-sm font-medium border transition-all duration-300 ${
                            formData.partySize === n
                              ? "bg-[var(--gold)] text-[var(--bg-primary)] border-[var(--gold)]"
                              : "border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--gold)]/50"
                          }`}
                        >
                          {n}{n === 8 ? "+" : ""}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[0.7rem] tracking-[0.2em] uppercase text-[var(--gold)] mb-4">Date</label>
                    <input
                      type="date"
                      {...register("date")}
                      min={new Date().toISOString().split("T")[0]}
                      className="w-full bg-[var(--bg-surface)] border border-[var(--border)] rounded-sm px-4 py-3 text-[var(--cream)] text-sm focus:outline-none focus:border-[var(--gold)] transition-colors [color-scheme:dark]"
                    />
                    {errors.date && <p className="text-red-400 text-xs mt-2">{errors.date.message}</p>}
                  </div>

                  <button
                    type="button"
                    onClick={goNext}
                    disabled={!formData.date}
                    className="btn-gold-filled w-full disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    Continue
                  </button>
                </div>
              )}

              {/* Step 2: Time */}
              {step === 2 && (
                <div className="space-y-8">
                  <div>
                    <label className="block text-[0.7rem] tracking-[0.2em] uppercase text-[var(--gold)] mb-4">Select Time</label>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                      {timeSlots.map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => setValue("time", t, { shouldValidate: true })}
                          className={`py-3 rounded-sm text-sm border transition-all duration-300 ${
                            formData.time === t
                              ? "bg-[var(--gold)] text-[var(--bg-primary)] border-[var(--gold)]"
                              : "border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--gold)]/50"
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                    {errors.time && <p className="text-red-400 text-xs mt-2">{errors.time.message}</p>}
                  </div>
                  <div className="flex gap-4">
                    <button type="button" onClick={goBack} className="btn-gold flex-1">Back</button>
                    <button type="button" onClick={goNext} disabled={!formData.time} className="btn-gold-filled flex-1 disabled:opacity-30 disabled:cursor-not-allowed">Continue</button>
                  </div>
                </div>
              )}

              {/* Step 3: Experience */}
              {step === 3 && (
                <div className="space-y-8">
                  <div>
                    <label className="block text-[0.7rem] tracking-[0.2em] uppercase text-[var(--gold)] mb-2">Choose Your Experience</label>
                    <p className="text-[var(--text-muted)] text-sm mb-6">Each setting offers a distinct atmosphere for your evening.</p>
                    <div className="space-y-4">
                      {experiences.map((exp) => (
                        <button
                          key={exp.id}
                          type="button"
                          onClick={() => setValue("experience", exp.id, { shouldValidate: true })}
                          className={`w-full text-left p-6 rounded-sm border transition-all duration-500 ${
                            formData.experience === exp.id
                              ? "border-[var(--gold)] bg-[var(--gold)]/5"
                              : "border-[var(--border)] bg-[var(--bg-surface)] hover:border-[var(--gold)]/30"
                          }`}
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <p className="text-[0.6rem] tracking-[0.2em] uppercase text-[var(--gold)] mb-1">{exp.tagline}</p>
                              <h3 className="font-[var(--font-display)] text-xl text-[var(--cream)] mb-2">{exp.name}</h3>
                              <p className="text-[var(--text-secondary)] text-sm leading-relaxed">{exp.description}</p>
                              <p className="text-[var(--text-muted)] text-xs mt-2">{exp.capacity}</p>
                            </div>
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-1 transition-all duration-300 ${
                              formData.experience === exp.id
                                ? "border-[var(--gold)] bg-[var(--gold)]"
                                : "border-[var(--border)]"
                            }`}>
                              {formData.experience === exp.id && (
                                <div className="w-2 h-2 rounded-full bg-[var(--bg-primary)]" />
                              )}
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                    {errors.experience && <p className="text-red-400 text-xs mt-2">{errors.experience.message}</p>}
                  </div>
                  <div className="flex gap-4">
                    <button type="button" onClick={goBack} className="btn-gold flex-1">Back</button>
                    <button type="button" onClick={goNext} disabled={!formData.experience} className="btn-gold-filled flex-1 disabled:opacity-30 disabled:cursor-not-allowed">Continue</button>
                  </div>
                </div>
              )}

              {/* Step 4: Guest Details */}
              {step === 4 && (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="relative">
                    <input
                      type="text"
                      {...register("name")}
                      placeholder=" "
                      className="peer w-full bg-[var(--bg-surface)] border border-[var(--border)] rounded-sm px-4 pt-6 pb-2 text-[var(--cream)] text-sm focus:outline-none focus:border-[var(--gold)] transition-colors placeholder-transparent"
                    />
                    <label className="absolute left-4 top-2 text-[0.6rem] tracking-[0.15em] uppercase text-[var(--text-muted)] transition-all peer-focus:text-[var(--gold)] peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-[0.6rem]">
                      Full Name
                    </label>
                    {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
                  </div>

                  <div className="relative">
                    <input
                      type="email"
                      {...register("email")}
                      placeholder=" "
                      className="peer w-full bg-[var(--bg-surface)] border border-[var(--border)] rounded-sm px-4 pt-6 pb-2 text-[var(--cream)] text-sm focus:outline-none focus:border-[var(--gold)] transition-colors placeholder-transparent"
                    />
                    <label className="absolute left-4 top-2 text-[0.6rem] tracking-[0.15em] uppercase text-[var(--text-muted)] transition-all peer-focus:text-[var(--gold)] peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-[0.6rem]">
                      Email Address
                    </label>
                    {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
                  </div>

                  <div className="relative">
                    <input
                      type="tel"
                      {...register("phone")}
                      placeholder=" "
                      className="peer w-full bg-[var(--bg-surface)] border border-[var(--border)] rounded-sm px-4 pt-6 pb-2 text-[var(--cream)] text-sm focus:outline-none focus:border-[var(--gold)] transition-colors placeholder-transparent"
                    />
                    <label className="absolute left-4 top-2 text-[0.6rem] tracking-[0.15em] uppercase text-[var(--text-muted)] transition-all peer-focus:text-[var(--gold)] peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-[0.6rem]">
                      Phone Number
                    </label>
                    {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone.message}</p>}
                  </div>

                  <div className="relative">
                    <textarea
                      {...register("requests")}
                      rows={3}
                      placeholder=" "
                      className="peer w-full bg-[var(--bg-surface)] border border-[var(--border)] rounded-sm px-4 pt-6 pb-2 text-[var(--cream)] text-sm focus:outline-none focus:border-[var(--gold)] transition-colors resize-none placeholder-transparent"
                    />
                    <label className="absolute left-4 top-2 text-[0.6rem] tracking-[0.15em] uppercase text-[var(--text-muted)] transition-all peer-focus:text-[var(--gold)] peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-[0.6rem]">
                      Special Requests
                    </label>
                  </div>

                  <div className="flex gap-4">
                    <button type="button" onClick={goBack} className="btn-gold flex-1">Back</button>
                    <button type="submit" className="btn-gold-filled flex-1">
                      Confirm Reservation
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </>
  );
}
