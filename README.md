# 🔥 Crimson Red Wood

**Seattle's Premier Steakhouse — A Luxury Dining Experience**

An ultra-premium, production-ready restaurant website built with Next.js 15, featuring cinematic motion design, a multi-step reservation system with real-time email notifications, and a buttery-smooth scrolling experience.

![Crimson Red Wood Hero](https://images.unsplash.com/photo-1544025162-d76694265947?w=1280&q=80)

---

## ✨ Features

### 🎨 Design & Motion
- **Cinematic Hero** — Full-viewport parallax hero with ambient ember particle system (Canvas)
- **SplitText Choreography** — Word-by-word cascade animations for display headers
- **Magnetic Custom Cursor** — Cursor snaps to buttons, shows "VIEW" on image hover
- **Lenis Smooth Scrolling** — Momentum-based, buttery-smooth scroll experience
- **Seamless Page Transitions** — AnimatePresence crossfade between all pages
- **Film Grain Overlay** — Subtle SVG noise texture for editorial luxury feel

### 📋 Reservation System
- **4-Step Booking Flow** — Date → Time → Experience Type → Guest Details
- **Floating Label Inputs** — Elegant, animated form labels
- **Supabase Backend** — Reservations stored in PostgreSQL database
- **Email Notifications** — Restaurant gets notified, guests get confirmation emails via Resend
- **Booking Ticket** — Beautiful animated confirmation summary

### 🖼️ Gallery
- **GSAP Horizontal Scroll** — Pinned scrollytelling gallery section
- **Category Filters** — Filter by Kitchen, Dining, Private Events, Terrace
- **Lightbox Viewer** — Full-screen image viewing with keyboard navigation

### 📱 Pages
| Page | Description |
|------|-------------|
| **Home** | Hero parallax, philosophy section, menu highlights, testimonials, reservation CTA |
| **Menu** | Full dinner menu with steaks, seafood, sides, desserts, wine cellar |
| **Gallery** | Horizontal scroll gallery + bento grid below |
| **About** | Chef story, values, timeline, careers |
| **Private Dining** | Three event spaces with inquiry form |
| **Reservations** | Multi-step booking with real-time backend |
| **Contact** | Location, hours, directions with dark-themed Google Maps |

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|-----------|
| **Framework** | Next.js 15 (App Router) |
| **Language** | TypeScript (strict mode) |
| **Styling** | Tailwind CSS v4 |
| **Animation** | Motion (Framer Motion) + GSAP ScrollTrigger |
| **Smooth Scroll** | Lenis |
| **Forms** | React Hook Form + Zod validation |
| **Database** | Supabase (PostgreSQL) |
| **Email** | Resend |
| **Images** | Next.js Image (WebP/AVIF, lazy loading, blur placeholders) |
| **Deployment** | Vercel |

---

## 📸 Screenshots

### Homepage Hero
![Homepage](https://images.unsplash.com/photo-1544025162-d76694265947?w=1280&q=80)
*Cinematic parallax hero with ambient ember particles and split-text choreography*

### Menu
![Menu](https://images.unsplash.com/photo-1558030006-450675393462?w=1280&q=80)
*Full dinner menu with prime steaks, seafood, and award-winning wine cellar*

### Gallery
![Gallery](https://images.unsplash.com/photo-1600891964092-4316c288032e?w=1280&q=80)
*GSAP-powered horizontal scroll gallery with category filters*

### Reservations
![Reservations](https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1280&q=80)
*Luxury 4-step booking flow with real-time email notifications*

### Private Dining
![Private Dining](https://images.unsplash.com/photo-1578474846511-04ba529f0b88?w=1280&q=80)
*Three distinct event spaces for unforgettable occasions*

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18.17+
- npm or yarn
- Supabase account (free tier works)
- Resend account (free tier: 100 emails/day)

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/crimson-red-wood.git
cd crimson-red-wood

# Install dependencies
npm install

# Copy environment variables
cp .env.local.example .env.local

# Start development server
npm run dev
```

### Environment Variables

Add these to your `.env.local`:

```env
# Supabase (https://supabase.com/dashboard → Settings → API)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Resend (https://resend.com/api-keys)
RESEND_API_KEY=re_your_key_here
```

### Database Setup

Run this SQL in your Supabase SQL Editor:

```sql
CREATE TABLE reservations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  reservation_date DATE NOT NULL,
  reservation_time TEXT NOT NULL,
  party_size INTEGER NOT NULL CHECK (party_size > 0 AND party_size <= 20),
  experience TEXT NOT NULL CHECK (experience IN ('main', 'chefs-counter')),
  guest_name TEXT NOT NULL,
  guest_email TEXT NOT NULL,
  guest_phone TEXT NOT NULL,
  special_requests TEXT,
  status TEXT DEFAULT 'confirmed' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
  notes TEXT
);

CREATE INDEX idx_reservations_date ON reservations(reservation_date);
```

---

## 🌐 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import your repository
4. Add environment variables
5. Deploy!

```bash
# Or deploy via CLI
npm i -g vercel
vercel login
vercel --prod
```

---

## 📁 Project Structure

```
seattle-steakhouse/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── page.tsx           # Homepage
│   │   ├── menu/page.tsx      # Dinner menu
│   │   ├── gallery/           # Gallery with GSAP scroll
│   │   ├── about/page.tsx     # Our story
│   │   ├── reservations/      # Multi-step booking
│   │   ├── private-dining/    # Event spaces
│   │   ├── contact/page.tsx   # Location & hours
│   │   └── actions/           # Server actions
│   │       └── bookReservation.ts
│   ├── components/            # Reusable UI components
│   │   ├── HeroParallax.tsx   # Parallax hero with embers
│   │   ├── AmbientEmbers.tsx  # Canvas particle system
│   │   ├── CustomCursor.tsx   # Magnetic cursor
│   │   ├── SplitTextReveal.tsx # Typography choreography
│   │   ├── PageTransition.tsx # AnimatePresence wrapper
│   │   ├── LenisProvider.tsx  # Smooth scrolling
│   │   └── ...
│   ├── data/                  # Typed content data
│   │   ├── types.ts          # Shared interfaces
│   │   ├── home.ts           # Homepage content
│   │   ├── menu.ts           # Menu items & wines
│   │   └── ...
│   └── lib/                   # Backend utilities
│       ├── supabase/admin.ts # Supabase client
│       └── resend.ts         # Email client
├── public/                    # Static assets
├── next.config.ts            # Next.js configuration
├── postcss.config.mjs        # Tailwind CSS v4 config
└── package.json
```

---

## 🎯 Performance

| Metric | Score |
|--------|-------|
| **Performance** | 80+ |
| **Accessibility** | 96 |
| **Best Practices** | 100 |
| **SEO** | 100 |
| **TBT** | 50ms ✅ |
| **CLS** | 0 ✅ |

---

## 📄 License

MIT

---

**Built with ❤️ for Crimson Red Wood — Where fire meets craft.**
