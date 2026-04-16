# iStream Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a modern 8-page Astro website for iStream (istream.co.nz), a Hawkes Bay AV and live streaming company, replacing their existing Wix site.

**Architecture:** Static site built with Astro and Tailwind CSS v4. All pages share a BaseLayout with Header/Footer. Service pages use a shared ServiceLayout template. CSS-only animations with Astro View Transitions for page navigation. Zero JS framework -- only tiny inline scripts for interactive elements (menu toggle, FAQ accordion, cursor glow).

**Tech Stack:** Astro 5+, Tailwind CSS v4, Inter (Google Fonts), Lucide icons (as inline SVGs), Cloudflare Pages deployment.

**Design Spec:** `docs/superpowers/specs/2026-04-16-istream-website-redesign-design.md`

---

## File Structure

```
src/
  layouts/
    BaseLayout.astro        # HTML shell, head, font loading, global styles
    ServiceLayout.astro     # Extends BaseLayout, shared service page template
  components/
    Header.astro            # Fixed pill navbar with mobile menu
    Footer.astro            # 3-column footer with social links
    Hero.astro              # Homepage hero section
    ServiceCard.astro       # Individual service card (used in grid)
    AudienceCard.astro      # "Who We Work With" card
    TrustBar.astro          # Stats bar component
    Testimonials.astro      # Testimonial carousel section
    CtaBand.astro           # Reusable full-width CTA section
    FaqItem.astro           # Single FAQ accordion item
    ServiceFeature.astro    # Feature block for service pages
    HowItWorks.astro        # 3-step process component
    TeamCard.astro          # Team member card for About page
    ContactForm.astro       # Quote request form
    SkipLink.astro          # Skip-to-content accessibility link
    SeoHead.astro           # SEO meta tags, OG tags, structured data
  data/
    services.ts             # All service data (titles, descriptions, features, FAQs)
    testimonials.ts         # Testimonial data
    site.ts                 # Site-wide config (name, contact info, social links)
  styles/
    global.css              # Tailwind import, @theme tokens, global styles, animations
  pages/
    index.astro             # Homepage
    about.astro             # About page
    contact.astro           # Contact/Get a Quote page
    services/
      live-streaming.astro
      video-recording.astro
      sound-pa.astro
      projector-screen-hire.astro
      equipment-hire.astro
public/
  favicon.svg
  images/                   # Placeholder images (replaced with real ones later)
```

---

### Task 1: Project Scaffolding & Tailwind Setup

**Files:**
- Create: `package.json`, `astro.config.mjs`, `src/styles/global.css`, `tsconfig.json`
- Create: `src/layouts/BaseLayout.astro`
- Create: `src/pages/index.astro` (minimal placeholder)
- Create: `public/favicon.svg`

- [ ] **Step 1: Create Astro project**

```bash
cd /Users/richardbarley/Github/stream-website
npm create astro@latest . -- --template minimal --no-git --no-install
```

Select defaults if prompted. This creates the base Astro project files.

- [ ] **Step 2: Install dependencies**

```bash
npm install
npx astro add tailwind
```

When prompted, accept all defaults. This installs `@tailwindcss/vite` and creates the CSS import.

- [ ] **Step 3: Install Lucide icons package**

```bash
npm install lucide-astro
```

- [ ] **Step 4: Create global.css with Tailwind and theme tokens**

Replace the contents of `src/styles/global.css` (or create it if not present) with:

```css
@import "tailwindcss";

@theme {
  --font-sans: "Inter", system-ui, sans-serif;

  --color-background: #0B1121;
  --color-surface: #111827;
  --color-surface-elevated: #1F2937;
  --color-border: #1E3A5F;
  --color-text-primary: #F1F5F9;
  --color-text-secondary: #94A3B8;
  --color-accent: #0EA5E9;
  --color-accent-hover: #38BDF8;
  --color-accent-subtle: #0C4A6E;
  --color-teal: #14B8A6;
  --color-destructive: #EF4444;
}

@layer base {
  html {
    scroll-behavior: smooth;
    background-color: var(--color-background);
    color: var(--color-text-secondary);
    font-family: var(--font-sans);
  }

  h1, h2, h3, h4, h5, h6 {
    color: var(--color-text-primary);
  }

  /* Focus ring for accessibility */
  :focus-visible {
    outline: 2px solid var(--color-accent);
    outline-offset: 2px;
  }

  /* Reduced motion */
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
}

/* Fade-in animation for scroll reveals */
@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fade-in-up 400ms ease-out forwards;
}
```

- [ ] **Step 5: Configure Astro with view transitions and site URL**

Update `astro.config.mjs`:

```js
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://istream.co.nz',
  vite: {
    plugins: [tailwindcss()],
  },
});
```

- [ ] **Step 6: Create favicon**

Create `public/favicon.svg`:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="6" fill="#0B1121"/>
  <path d="M10 8 L24 16 L10 24Z" fill="#0EA5E9"/>
</svg>
```

- [ ] **Step 7: Create BaseLayout**

Create `src/layouts/BaseLayout.astro`:

```astro
---
import { ClientRouter } from "astro:transitions";
import "../styles/global.css";

interface Props {
  title: string;
  description: string;
}

const { title, description } = Astro.props;
---

<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
      rel="stylesheet"
    />
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta name="generator" content={Astro.generator} />
    <ClientRouter />
  </head>
  <body class="min-h-screen bg-background font-sans text-text-secondary antialiased">
    <slot name="skip-link" />
    <slot name="header" />
    <main id="main-content">
      <slot />
    </main>
    <slot name="footer" />
  </body>
</html>
```

- [ ] **Step 8: Create placeholder index page**

Create `src/pages/index.astro`:

```astro
---
import BaseLayout from "../layouts/BaseLayout.astro";
---

<BaseLayout title="iStream - Professional AV & Live Streaming | Hawkes Bay" description="Professional live streaming, video recording, and AV services in Hawkes Bay, New Zealand.">
  <div class="flex items-center justify-center min-h-screen">
    <h1 class="text-4xl font-bold text-text-primary">iStream - Coming Soon</h1>
  </div>
</BaseLayout>
```

- [ ] **Step 9: Verify dev server starts**

```bash
npm run dev
```

Expected: Dev server starts at `http://localhost:4321`. Page shows "iStream - Coming Soon" with dark background, white text, Inter font.

- [ ] **Step 10: Commit**

```bash
git add -A
git commit -m "feat: scaffold Astro project with Tailwind v4, theme tokens, and BaseLayout"
```

---

### Task 2: Site Data Files

**Files:**
- Create: `src/data/site.ts`
- Create: `src/data/services.ts`
- Create: `src/data/testimonials.ts`

- [ ] **Step 1: Create site config**

Create `src/data/site.ts`:

```ts
export const site = {
  name: "iStream",
  tagline: "Professional AV & Live Streaming",
  phone: "022 380 6280",
  email: "info@istream.co.nz",
  address: "Omahu Road, Hastings, Hawkes Bay",
  social: {
    facebook: "http://www.facebook.com/istreamnz",
    instagram: "https://www.instagram.com/istream_nz/",
    youtube: "https://www.youtube.com/channel/UCpxUwIZVLVIPNioU1X4P29w",
  },
} as const;
```

- [ ] **Step 2: Create services data**

Create `src/data/services.ts`:

```ts
export interface ServiceFeature {
  icon: string;
  title: string;
  description: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface Service {
  slug: string;
  title: string;
  shortTitle: string;
  icon: string;
  description: string;
  subtitle: string;
  features: ServiceFeature[];
  popularFor: string[];
  howItWorks: [string, string, string];
  faqs: FaqItem[];
}

export const services: Service[] = [
  {
    slug: "live-streaming",
    title: "Live Streaming",
    shortTitle: "Live Streaming",
    icon: "Video",
    description:
      "Capture your event live and share it with anyone, anywhere in the world.",
    subtitle:
      "Share your most important moments with family, friends, and colleagues — no matter where they are.",
    features: [
      {
        icon: "MonitorPlay",
        title: "Multi-Camera Streaming",
        description:
          "Professional PTZ HD cameras capture every angle, switched live for a broadcast-quality stream.",
      },
      {
        icon: "Globe",
        title: "Custom Branded Viewer Page",
        description:
          "A personalised, password-protected webpage with your branding, message, and comment section for viewers.",
      },
      {
        icon: "PlayCircle",
        title: "On-Demand Replay",
        description:
          "Your stream is hosted online after the event so anyone can catch up at their convenience.",
      },
      {
        icon: "Lock",
        title: "Secure & Private",
        description:
          "Password-protected streams ensure only invited viewers can access your event.",
      },
    ],
    popularFor: ["Funerals", "Weddings", "Church Services", "School Events"],
    howItWorks: [
      "Tell us about your event",
      "We set up and test everything",
      "You go live — we handle the rest",
    ],
    faqs: [
      {
        question: "How far in advance do I need to book?",
        answer:
          "We recommend booking at least 2 weeks ahead. For funerals and urgent events, we do our best to accommodate short notice — contact us and we'll see what we can do.",
      },
      {
        question: "Can remote viewers interact during the stream?",
        answer:
          "Yes. Our custom viewer pages include a comment section so remote viewers can share messages and condolences in real time.",
      },
      {
        question: "What happens if the internet drops during the event?",
        answer:
          "We always have backup connectivity options and record locally as a failsafe. If the stream is interrupted, the recording ensures nothing is lost.",
      },
      {
        question: "Can I watch the stream after the event?",
        answer:
          "Absolutely. We host your video online after the event so anyone can catch up, even if they missed the live broadcast.",
      },
    ],
  },
  {
    slug: "video-recording",
    title: "Video Recording",
    shortTitle: "Video Recording",
    icon: "Camera",
    description:
      "Keep lasting memories of your event with professional multi-camera recording.",
    subtitle:
      "Professional video recording that captures every detail of your event, delivered on USB or hosted online.",
    features: [
      {
        icon: "Camera",
        title: "Multi-Camera Coverage",
        description:
          "Multiple HD cameras ensure every moment is captured from the best angles.",
      },
      {
        icon: "Usb",
        title: "USB Delivery",
        description:
          "Receive your recording on a USB stick, ready to play on any computer or smart TV.",
      },
      {
        icon: "Cloud",
        title: "Online Hosting",
        description:
          "Optionally host your video online for easy sharing with family and friends.",
      },
      {
        icon: "Scissors",
        title: "Professional Quality",
        description:
          "Years of experience means we capture every detail professionally, so you can relive the event for years to come.",
      },
    ],
    popularFor: ["Weddings", "Funerals", "Conferences", "School Events"],
    howItWorks: [
      "Tell us about your event",
      "We record with professional cameras",
      "Receive your video on USB or online",
    ],
    faqs: [
      {
        question: "What format is the video delivered in?",
        answer:
          "Videos are delivered in MP4 format on a USB stick, playable on any computer, smart TV, or media player.",
      },
      {
        question: "Can I also get a live stream with the recording?",
        answer:
          "Yes — we often bundle live streaming and recording together. Contact us for a combined quote.",
      },
      {
        question: "How long does it take to receive the recording?",
        answer:
          "You'll receive your USB at the end of the event or within a few business days, depending on the package.",
      },
    ],
  },
  {
    slug: "sound-pa",
    title: "Sound & PA",
    shortTitle: "Sound & PA",
    icon: "Speaker",
    description:
      "Professional PA systems to ensure your event is heard clearly by everyone.",
    subtitle:
      "Crystal-clear sound for events of any size — from intimate ceremonies to large venues.",
    features: [
      {
        icon: "Mic",
        title: "Wireless Microphones",
        description:
          "Lapel, handheld, and podium microphones for clear audio in any setting.",
      },
      {
        icon: "Speaker",
        title: "PA System Setup",
        description:
          "Professional speakers and amplifiers sized to your venue for even, clear coverage.",
      },
      {
        icon: "Music",
        title: "Music Playback",
        description:
          "Play background music, entrance songs, or audio tracks through our system with easy control.",
      },
      {
        icon: "Headphones",
        title: "Audio Mixing",
        description:
          "On-site audio mixing ensures the right balance between speakers, music, and ambient sound.",
      },
    ],
    popularFor: ["Weddings", "Church Services", "School Events", "Conferences"],
    howItWorks: [
      "Tell us about your venue and event",
      "We design the right sound setup",
      "We set up, test, and operate on the day",
    ],
    faqs: [
      {
        question: "Can you provide sound for outdoor events?",
        answer:
          "Yes. We have portable PA systems suitable for outdoor ceremonies, sports days, and community events.",
      },
      {
        question: "Do you supply microphones?",
        answer:
          "Yes — we provide wireless lapel mics, handheld mics, and podium mics as part of the sound package.",
      },
      {
        question: "Can I play my own music through the system?",
        answer:
          "Absolutely. Connect via Bluetooth, USB, or aux cable — whatever works best for you.",
      },
    ],
  },
  {
    slug: "projector-screen-hire",
    title: "Projector & Screen Hire",
    shortTitle: "Projector & Screens",
    icon: "Monitor",
    description:
      "High-quality projectors and screens for presentations, slideshows, and live video feeds.",
    subtitle:
      "Make your visuals shine with professional projection equipment for any venue.",
    features: [
      {
        icon: "Projector",
        title: "HD Projectors",
        description:
          "Bright, high-resolution projectors that deliver sharp visuals even in well-lit venues.",
      },
      {
        icon: "RectangleHorizontal",
        title: "Screens of All Sizes",
        description:
          "From portable screens for small rooms to large format screens for conference halls.",
      },
      {
        icon: "MonitorPlay",
        title: "Live Video Feeds",
        description:
          "Display real-time camera feeds on big screens so everyone in the venue gets an up-close view.",
      },
      {
        icon: "Settings",
        title: "Full Setup & Operation",
        description:
          "We deliver, set up, test, and operate the equipment — you just focus on your event.",
      },
    ],
    popularFor: ["Conferences", "Church Services", "Funerals", "School Events"],
    howItWorks: [
      "Tell us your venue and what you need to display",
      "We recommend the right equipment",
      "We deliver, set up, and operate on the day",
    ],
    faqs: [
      {
        question: "Can I connect my own laptop to the projector?",
        answer:
          "Yes. We support HDMI, USB-C, and wireless connections for laptops and other devices.",
      },
      {
        question: "What size screens do you have?",
        answer:
          "We carry screens from 6ft portable to large format. We'll recommend the right size based on your venue and audience.",
      },
      {
        question: "Can you display a live camera feed on the screen?",
        answer:
          "Yes — this is one of our most popular setups. We can show a live camera feed on one or multiple screens around the venue.",
      },
    ],
  },
  {
    slug: "equipment-hire",
    title: "Equipment Hire",
    shortTitle: "Equipment Hire",
    icon: "Wrench",
    description:
      "Hire professional AV equipment for your own events — cameras, mixers, screens, and more.",
    subtitle:
      "Access professional-grade AV gear without the cost of ownership.",
    features: [
      {
        icon: "Camera",
        title: "Cameras",
        description:
          "PTZ HD cameras and camcorders available for hire, ideal for recording or streaming.",
      },
      {
        icon: "SlidersHorizontal",
        title: "Mixers & Switchers",
        description:
          "Video switchers and audio mixers for multi-source events.",
      },
      {
        icon: "Monitor",
        title: "Screens & Displays",
        description:
          "Monitors, projectors, and screens in various sizes for any venue.",
      },
      {
        icon: "Cable",
        title: "Cables & Accessories",
        description:
          "HDMI, SDI, audio cables, tripods, stands, and all the accessories you need.",
      },
    ],
    popularFor: ["DIY Events", "Schools", "Community Groups", "Businesses"],
    howItWorks: [
      "Tell us what equipment you need",
      "We prepare and deliver it",
      "Return it when you're done",
    ],
    faqs: [
      {
        question: "Do I need experience to use the equipment?",
        answer:
          "Our gear is straightforward to use, and we provide a quick walkthrough on delivery. For complex setups, we recommend our operated service instead.",
      },
      {
        question: "How long can I hire equipment for?",
        answer:
          "Hire periods are flexible — from a single day to a full week. Contact us for pricing based on your needs.",
      },
      {
        question: "Do you deliver and collect the equipment?",
        answer:
          "Yes. We deliver to your venue, set up if needed, and collect after your event.",
      },
    ],
  },
];
```

- [ ] **Step 3: Create testimonials data**

Create `src/data/testimonials.ts`:

```ts
export interface Testimonial {
  quote: string;
  name: string;
  role: string;
}

export const testimonials: Testimonial[] = [
  {
    quote:
      "iStream made it possible for our family overseas to be part of the service. The quality was exceptional and the team were incredibly professional and respectful.",
    name: "Sarah M.",
    role: "Funeral Director, Hawkes Bay",
  },
  {
    quote:
      "We had guests who couldn't travel to our wedding, and iStream's live stream meant they could watch from home. The custom viewer page was a lovely touch.",
    name: "James & Courtney",
    role: "Wedding Couple",
  },
  {
    quote:
      "Our school prize-giving was streamed live for the first time thanks to iStream. Parents loved being able to watch, and the recording was a great keepsake.",
    name: "David T.",
    role: "Deputy Principal",
  },
];
```

- [ ] **Step 4: Commit**

```bash
git add src/data/
git commit -m "feat: add site config, services data, and testimonials data"
```

---

### Task 3: SkipLink, SeoHead & Header Components

**Files:**
- Create: `src/components/SkipLink.astro`
- Create: `src/components/SeoHead.astro`
- Create: `src/components/Header.astro`

- [ ] **Step 1: Create SkipLink component**

Create `src/components/SkipLink.astro`:

```astro
---
---

<a
  href="#main-content"
  class="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-white focus:text-sm focus:font-medium"
>
  Skip to main content
</a>
```

- [ ] **Step 2: Create SeoHead component**

Create `src/components/SeoHead.astro`:

```astro
---
interface Props {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
}

const { title, description, canonical, ogImage } = Astro.props;
const canonicalUrl = canonical || Astro.url.href;
const ogImageUrl = ogImage || "/images/og-default.jpg";
---

<title>{title}</title>
<meta name="description" content={description} />
<link rel="canonical" href={canonicalUrl} />

<!-- Open Graph -->
<meta property="og:type" content="website" />
<meta property="og:title" content={title} />
<meta property="og:description" content={description} />
<meta property="og:url" content={canonicalUrl} />
<meta property="og:image" content={ogImageUrl} />
<meta property="og:site_name" content="iStream" />

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content={title} />
<meta name="twitter:description" content={description} />
<meta name="twitter:image" content={ogImageUrl} />
```

- [ ] **Step 3: Create Header component**

Create `src/components/Header.astro`:

```astro
---
import { site } from "../data/site";

const navLinks = [
  { label: "Services", href: "/#services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const currentPath = Astro.url.pathname;
---

<header
  class="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center rounded-full border border-border bg-surface/60 px-6 py-3 backdrop-blur-md transition-[border-radius] duration-300 w-[calc(100%-2rem)] max-w-3xl"
  id="site-header"
>
  <div class="flex w-full items-center justify-between gap-6">
    <!-- Logo -->
    <a href="/" class="text-lg font-bold tracking-tight text-text-primary">
      {site.name}
    </a>

    <!-- Desktop Nav -->
    <nav class="hidden items-center gap-6 sm:flex" aria-label="Main navigation">
      {navLinks.map((link) => (
        <a
          href={link.href}
          class="group relative inline-block overflow-hidden h-5 text-sm"
        >
          <span class="flex flex-col transition-transform duration-400 ease-out group-hover:-translate-y-1/2">
            <span class="text-text-secondary">{link.label}</span>
            <span class="text-white">{link.label}</span>
          </span>
        </a>
      ))}
    </nav>

    <!-- CTA + Mobile Toggle -->
    <div class="flex items-center gap-3">
      <a
        href="/contact"
        class="hidden rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-accent-hover sm:inline-block"
      >
        Get a Quote
      </a>

      <button
        class="flex h-8 w-8 items-center justify-center text-text-secondary sm:hidden"
        id="menu-toggle"
        aria-label="Open menu"
        aria-expanded="false"
      >
        <svg class="h-6 w-6" id="menu-icon-open" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        <svg class="hidden h-6 w-6" id="menu-icon-close" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  </div>

  <!-- Mobile Nav -->
  <nav
    class="flex max-h-0 w-full flex-col items-center gap-4 overflow-hidden opacity-0 transition-all duration-300 ease-in-out sm:hidden"
    id="mobile-nav"
    aria-label="Mobile navigation"
  >
    {navLinks.map((link) => (
      <a
        href={link.href}
        class="w-full py-2 text-center text-text-secondary transition-colors hover:text-white"
      >
        {link.label}
      </a>
    ))}
    <a
      href="/contact"
      class="w-full rounded-full bg-accent py-2 text-center text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
    >
      Get a Quote
    </a>
  </nav>
</header>

<script>
  document.addEventListener("astro:page-load", () => {
    const toggle = document.getElementById("menu-toggle");
    const nav = document.getElementById("mobile-nav");
    const header = document.getElementById("site-header");
    const iconOpen = document.getElementById("menu-icon-open");
    const iconClose = document.getElementById("menu-icon-close");

    if (!toggle || !nav || !header || !iconOpen || !iconClose) return;

    toggle.addEventListener("click", () => {
      const isOpen = nav.classList.contains("max-h-[500px]");

      if (isOpen) {
        nav.classList.remove("max-h-[500px]", "opacity-100", "pt-4");
        nav.classList.add("max-h-0", "opacity-0");
        header.classList.remove("rounded-xl");
        header.classList.add("rounded-full");
        iconOpen.classList.remove("hidden");
        iconClose.classList.add("hidden");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Open menu");
      } else {
        nav.classList.remove("max-h-0", "opacity-0");
        nav.classList.add("max-h-[500px]", "opacity-100", "pt-4");
        header.classList.remove("rounded-full");
        header.classList.add("rounded-xl");
        iconOpen.classList.add("hidden");
        iconClose.classList.remove("hidden");
        toggle.setAttribute("aria-expanded", "true");
        toggle.setAttribute("aria-label", "Close menu");
      }
    });
  });
</script>
```

- [ ] **Step 4: Update BaseLayout to use new components**

Update `src/layouts/BaseLayout.astro`:

```astro
---
import { ClientRouter } from "astro:transitions";
import "../styles/global.css";
import Header from "../components/Header.astro";
import SkipLink from "../components/SkipLink.astro";
import SeoHead from "../components/SeoHead.astro";

interface Props {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
}

const { title, description, canonical, ogImage } = Astro.props;
---

<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
      rel="stylesheet"
    />
    <SeoHead title={title} description={description} canonical={canonical} ogImage={ogImage} />
    <meta name="generator" content={Astro.generator} />
    <ClientRouter />
  </head>
  <body class="min-h-screen bg-background font-sans text-text-secondary antialiased">
    <SkipLink />
    <Header />
    <main id="main-content">
      <slot />
    </main>
    <slot name="footer" />
  </body>
</html>
```

- [ ] **Step 5: Verify header renders and mobile toggle works**

```bash
npm run dev
```

Expected: Pill-shaped navbar visible at top. Desktop shows nav links + "Get a Quote" button. Resize to mobile width: hamburger icon appears. Clicking toggles mobile nav with animation.

- [ ] **Step 6: Commit**

```bash
git add src/components/SkipLink.astro src/components/SeoHead.astro src/components/Header.astro src/layouts/BaseLayout.astro
git commit -m "feat: add SkipLink, SeoHead, and Header components with mobile menu"
```

---

### Task 4: Footer Component

**Files:**
- Create: `src/components/Footer.astro`
- Modify: `src/layouts/BaseLayout.astro`

- [ ] **Step 1: Create Footer component**

Create `src/components/Footer.astro`:

```astro
---
import { site } from "../data/site";
import { services } from "../data/services";
---

<footer class="border-t border-border bg-surface">
  <div class="mx-auto max-w-6xl px-6 py-16">
    <div class="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
      <!-- Brand -->
      <div>
        <a href="/" class="text-xl font-bold text-text-primary">{site.name}</a>
        <p class="mt-3 text-sm text-text-secondary">
          Professional AV & live streaming services in Hawkes Bay, New Zealand.
        </p>
      </div>

      <!-- Services -->
      <div>
        <h3 class="text-sm font-semibold uppercase tracking-wider text-text-primary">
          Services
        </h3>
        <ul class="mt-4 space-y-2">
          {services.map((service) => (
            <li>
              <a
                href={`/services/${service.slug}`}
                class="text-sm text-text-secondary transition-colors hover:text-accent"
              >
                {service.shortTitle}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <!-- Company -->
      <div>
        <h3 class="text-sm font-semibold uppercase tracking-wider text-text-primary">
          Company
        </h3>
        <ul class="mt-4 space-y-2">
          <li>
            <a href="/about" class="text-sm text-text-secondary transition-colors hover:text-accent">About Us</a>
          </li>
          <li>
            <a href="/contact" class="text-sm text-text-secondary transition-colors hover:text-accent">Get a Quote</a>
          </li>
        </ul>
      </div>

      <!-- Contact -->
      <div>
        <h3 class="text-sm font-semibold uppercase tracking-wider text-text-primary">
          Contact
        </h3>
        <ul class="mt-4 space-y-2 text-sm text-text-secondary">
          <li>
            <a href={`tel:${site.phone.replace(/\s/g, "")}`} class="transition-colors hover:text-accent">{site.phone}</a>
          </li>
          <li>
            <a href={`mailto:${site.email}`} class="transition-colors hover:text-accent">{site.email}</a>
          </li>
          <li>{site.address}</li>
        </ul>

        <!-- Social Links -->
        <div class="mt-4 flex gap-3">
          <a href={site.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" class="text-text-secondary transition-colors hover:text-accent">
            <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
          </a>
          <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" class="text-text-secondary transition-colors hover:text-accent">
            <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
          </a>
          <a href={site.social.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube" class="text-text-secondary transition-colors hover:text-accent">
            <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
          </a>
        </div>
      </div>
    </div>

    <!-- Copyright -->
    <div class="mt-12 border-t border-border pt-8 text-center text-sm text-text-secondary">
      &copy; {new Date().getFullYear()} {site.name}. All rights reserved.
    </div>
  </div>
</footer>
```

- [ ] **Step 2: Add Footer to BaseLayout**

In `src/layouts/BaseLayout.astro`, add import and usage:

Add import at top of frontmatter:
```ts
import Footer from "../components/Footer.astro";
```

Replace `<slot name="footer" />` with:
```astro
<Footer />
```

- [ ] **Step 3: Verify footer renders**

```bash
npm run dev
```

Expected: Footer visible at bottom with 4 columns, social icons, and copyright. Links hover to accent colour.

- [ ] **Step 4: Commit**

```bash
git add src/components/Footer.astro src/layouts/BaseLayout.astro
git commit -m "feat: add Footer component with service links, contact info, and social icons"
```

---

### Task 5: Homepage Hero & ServiceCard Components

**Files:**
- Create: `src/components/Hero.astro`
- Create: `src/components/ServiceCard.astro`
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Create Hero component**

Create `src/components/Hero.astro`:

```astro
---
---

<section class="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pt-24">
  <!-- Grid background -->
  <div
    class="absolute inset-0 -z-10 h-[600px] w-full opacity-80"
    style="background-image: linear-gradient(to right, rgba(30,58,95,0.3) 1px, transparent 1px), linear-gradient(to bottom, rgba(30,58,95,0.3) 1px, transparent 1px); background-size: 4rem 4rem; mask-image: radial-gradient(ellipse 80% 50% at 50% 0%, #000 70%, transparent 110%);"
  ></div>

  <!-- Radial glow at bottom -->
  <div
    class="absolute bottom-0 left-1/2 h-[400px] w-[800px] -translate-x-1/2 translate-y-1/2 rounded-full opacity-30"
    style="background: radial-gradient(closest-side, rgba(14,165,233,0.4), transparent);"
  ></div>

  <div class="relative z-10 mx-auto max-w-3xl text-center">
    <!-- Eyebrow -->
    <span class="inline-block rounded-full border border-border bg-surface/50 px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-text-secondary">
      Hawkes Bay's AV & Streaming Experts
    </span>

    <!-- Headline -->
    <h1 class="mt-8 text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl" style="letter-spacing: -0.015em;">
      Professional AV & Live Streaming for Your Most Important Moments
    </h1>

    <!-- Subtitle -->
    <p class="mt-6 text-lg text-text-secondary sm:text-xl">
      From weddings to funerals, school events to church services — we make sure every moment is captured and shared professionally.
    </p>

    <!-- CTAs -->
    <div class="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
      <a
        href="/contact"
        class="rounded-full bg-accent px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-accent/25 transition-all hover:bg-accent-hover hover:shadow-accent-hover/25"
      >
        Get a Quote
      </a>
      <a
        href="#services"
        class="rounded-full border border-accent/30 px-8 py-3 text-sm font-semibold text-text-secondary transition-all hover:border-accent/60 hover:text-white"
      >
        Our Services
      </a>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Create ServiceCard component**

Create `src/components/ServiceCard.astro`:

```astro
---
interface Props {
  title: string;
  description: string;
  icon: string;
  href: string;
}

const { title, description, icon, href } = Astro.props;

// Map icon names to inline SVG paths (Lucide icons)
const icons: Record<string, string> = {
  Video: '<path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5"/><rect x="2" y="6" width="14" height="12" rx="2"/>',
  Camera: '<path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/>',
  Speaker: '<rect width="16" height="20" x="4" y="2" rx="2"/><circle cx="12" cy="14" r="4"/><line x1="12" x2="12.01" y1="6" y2="6"/>',
  Monitor: '<rect width="20" height="14" x="2" y="3" rx="2"/><line x1="8" x2="16" y1="21" y2="21"/><line x1="12" x2="12" y1="17" y2="21"/>',
  Wrench: '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>',
};
---

<a
  href={href}
  class="group relative flex flex-col gap-6 overflow-hidden rounded-2xl border border-border bg-surface/50 p-8 transition-all duration-200 hover:-translate-y-1 hover:border-accent/40"
>
  <!-- Hover glow overlay -->
  <div class="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" style="background: radial-gradient(300px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(14,165,233,0.06), transparent 60%);"></div>

  <!-- Icon -->
  <div class="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/5">
    <svg class="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" set:html={icons[icon] || icons.Video} />
  </div>

  <!-- Content -->
  <div>
    <h3 class="text-lg font-semibold text-text-primary">{title}</h3>
    <p class="mt-2 text-sm text-text-secondary">{description}</p>
  </div>

  <!-- Arrow -->
  <div class="mt-auto flex items-center gap-1 text-sm font-medium text-accent opacity-0 transition-opacity duration-200 group-hover:opacity-100">
    Learn more
    <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
  </div>
</a>
```

- [ ] **Step 3: Build homepage with Hero and Services grid**

Update `src/pages/index.astro`:

```astro
---
import BaseLayout from "../layouts/BaseLayout.astro";
import Hero from "../components/Hero.astro";
import ServiceCard from "../components/ServiceCard.astro";
import { services } from "../data/services";
---

<BaseLayout
  title="iStream - Professional AV & Live Streaming | Hawkes Bay"
  description="Professional live streaming, video recording, and AV services in Hawkes Bay, New Zealand. Trusted by funeral homes, wedding venues, schools, and churches."
>
  <Hero />

  <!-- Services Grid -->
  <section id="services" class="mx-auto max-w-6xl px-6 py-24">
    <div class="text-center">
      <p class="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Our Services</p>
      <h2 class="mt-3 text-3xl font-semibold tracking-tight text-text-primary sm:text-4xl">
        Everything you need for a seamless event
      </h2>
    </div>

    <div class="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((service) => (
        <ServiceCard
          title={service.shortTitle}
          description={service.description}
          icon={service.icon}
          href={`/services/${service.slug}`}
        />
      ))}
    </div>
  </section>
</BaseLayout>
```

- [ ] **Step 4: Verify Hero and Services grid**

```bash
npm run dev
```

Expected: Full-height hero with gradient grid background, eyebrow tag, headline, subtitle, and two CTA buttons. Below: services grid with 5 cards (3-col on desktop, 2-col tablet, 1-col mobile). Cards have icons and hover effects.

- [ ] **Step 5: Commit**

```bash
git add src/components/Hero.astro src/components/ServiceCard.astro src/pages/index.astro
git commit -m "feat: add Hero section and ServiceCard grid to homepage"
```

---

### Task 6: Homepage Remaining Sections (Audience, Trust, Testimonials, CTA)

**Files:**
- Create: `src/components/AudienceCard.astro`
- Create: `src/components/TrustBar.astro`
- Create: `src/components/Testimonials.astro`
- Create: `src/components/CtaBand.astro`
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Create AudienceCard component**

Create `src/components/AudienceCard.astro`:

```astro
---
interface Props {
  icon: string;
  title: string;
  description: string;
}

const { icon, title, description } = Astro.props;

const icons: Record<string, string> = {
  Heart: '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>',
  Flower: '<circle cx="12" cy="12" r="3"/><path d="M12 2a4 4 0 0 1 4 4c0 .73-.2 1.41-.53 2"/><path d="M17.47 8A4 4 0 0 1 22 12c0 .73-.2 1.41-.53 2"/><path d="M19.47 14A4 4 0 0 1 18 22c-.73 0-1.41-.2-2-.53"/><path d="M14 19.47A4 4 0 0 1 12 22a4 4 0 0 1-2-.53"/><path d="M4.53 14A4 4 0 0 1 2 12a4 4 0 0 1 .53-2"/><path d="M6.53 8A4 4 0 0 1 12 2c.73 0 1.41.2 2 .53"/>',
  GraduationCap: '<path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"/><path d="M22 10v6"/><path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"/>',
  Church: '<path d="m18 7 4 2v11a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9l4-2"/><path d="M14 22v-4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v4"/><path d="M18 22V5l-6-3-6 3v17"/><path d="M12 7v5"/><path d="M10 9h4"/>',
};
---

<div class="flex flex-col items-center text-center">
  <div class="flex h-12 w-12 items-center justify-center rounded-full bg-teal/10">
    <svg class="h-6 w-6 text-teal" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" set:html={icons[icon] || ''} />
  </div>
  <h3 class="mt-4 text-base font-semibold text-text-primary">{title}</h3>
  <p class="mt-1 text-sm text-text-secondary">{description}</p>
</div>
```

- [ ] **Step 2: Create TrustBar component**

Create `src/components/TrustBar.astro`:

```astro
---
const stats = [
  { value: "500+", label: "Events Streamed" },
  { value: "Since 2015", label: "Serving Hawkes Bay" },
  { value: "50+", label: "Venues Trust Us" },
];
---

<section class="border-y border-border bg-surface/50 py-12">
  <div class="mx-auto flex max-w-4xl flex-col items-center justify-center gap-8 px-6 sm:flex-row sm:gap-16">
    {stats.map((stat, i) => (
      <div class="flex flex-col items-center text-center">
        <span class="text-3xl font-bold text-accent">{stat.value}</span>
        <span class="mt-1 text-sm text-text-secondary">{stat.label}</span>
      </div>
    ))}
  </div>
</section>
```

- [ ] **Step 3: Create Testimonials component**

Create `src/components/Testimonials.astro`:

```astro
---
import { testimonials } from "../data/testimonials";
---

<section class="mx-auto max-w-4xl px-6 py-24">
  <div class="text-center">
    <p class="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Testimonials</p>
    <h2 class="mt-3 text-3xl font-semibold tracking-tight text-text-primary sm:text-4xl">
      What our clients say
    </h2>
  </div>

  <!-- Testimonial cards - scroll-snap carousel on mobile, grid on desktop -->
  <div class="mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 sm:grid sm:grid-cols-1 sm:overflow-visible lg:grid-cols-3" role="region" aria-roledescription="carousel" aria-label="Client testimonials">
    {testimonials.map((t, i) => (
      <article
        class="relative min-w-[85vw] shrink-0 snap-center rounded-2xl border border-border bg-surface/50 p-8 sm:min-w-0"
        role="group"
        aria-roledescription="slide"
        aria-label={`Testimonial ${i + 1} of ${testimonials.length}`}
      >
        <!-- Index number -->
        <span class="absolute right-6 top-4 text-6xl font-bold leading-none text-white/5">
          {String(i + 1).padStart(2, "0")}
        </span>

        <!-- Quote -->
        <blockquote class="relative z-10">
          <p class="text-lg font-light leading-relaxed text-text-primary">
            "{t.quote}"
          </p>
          <footer class="mt-6">
            <cite class="not-italic">
              <span class="block font-semibold text-text-primary">{t.name}</span>
              <span class="block text-sm text-text-secondary">{t.role}</span>
            </cite>
          </footer>
        </blockquote>
      </article>
    ))}
  </div>
</section>
```

- [ ] **Step 4: Create CtaBand component**

Create `src/components/CtaBand.astro`:

```astro
---
interface Props {
  heading?: string;
  buttonText?: string;
  buttonHref?: string;
}

const {
  heading = "Have an upcoming event? Let's make it seamless.",
  buttonText = "Get a Quote",
  buttonHref = "/contact",
} = Astro.props;
---

<section class="border-t border-border bg-surface py-20">
  <div class="mx-auto max-w-2xl px-6 text-center">
    <h2 class="text-2xl font-semibold tracking-tight text-text-primary sm:text-3xl">
      {heading}
    </h2>
    <a
      href={buttonHref}
      class="mt-8 inline-block rounded-full bg-accent px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-accent/25 transition-all hover:bg-accent-hover hover:shadow-accent-hover/25"
    >
      {buttonText}
    </a>
  </div>
</section>
```

- [ ] **Step 5: Assemble full homepage**

Update `src/pages/index.astro` — add the new sections after the services grid:

```astro
---
import BaseLayout from "../layouts/BaseLayout.astro";
import Hero from "../components/Hero.astro";
import ServiceCard from "../components/ServiceCard.astro";
import AudienceCard from "../components/AudienceCard.astro";
import TrustBar from "../components/TrustBar.astro";
import Testimonials from "../components/Testimonials.astro";
import CtaBand from "../components/CtaBand.astro";
import { services } from "../data/services";

const audiences = [
  { icon: "Heart", title: "Funeral Homes", description: "Helping families share services with loved ones who can't be there in person." },
  { icon: "Flower", title: "Wedding Venues", description: "Live streaming and recording so every guest can be part of the celebration." },
  { icon: "GraduationCap", title: "Schools", description: "Stream prize-givings, assemblies, and sports events for parents and whanau." },
  { icon: "Church", title: "Churches & Community", description: "Extend your reach with live streamed services and community events." },
];
---

<BaseLayout
  title="iStream - Professional AV & Live Streaming | Hawkes Bay"
  description="Professional live streaming, video recording, and AV services in Hawkes Bay, New Zealand. Trusted by funeral homes, wedding venues, schools, and churches."
>
  <Hero />

  <!-- Services Grid -->
  <section id="services" class="mx-auto max-w-6xl px-6 py-24">
    <div class="text-center">
      <p class="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Our Services</p>
      <h2 class="mt-3 text-3xl font-semibold tracking-tight text-text-primary sm:text-4xl">
        Everything you need for a seamless event
      </h2>
    </div>
    <div class="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((service) => (
        <ServiceCard
          title={service.shortTitle}
          description={service.description}
          icon={service.icon}
          href={`/services/${service.slug}`}
        />
      ))}
    </div>
  </section>

  <!-- Who We Work With -->
  <section class="mx-auto max-w-4xl px-6 py-24">
    <div class="text-center">
      <p class="text-xs font-semibold uppercase tracking-[0.2em] text-teal">Who We Work With</p>
      <h2 class="mt-3 text-3xl font-semibold tracking-tight text-text-primary sm:text-4xl">
        Trusted by organisations across Hawkes Bay
      </h2>
    </div>
    <div class="mt-12 grid grid-cols-2 gap-8 lg:grid-cols-4">
      {audiences.map((a) => (
        <AudienceCard icon={a.icon} title={a.title} description={a.description} />
      ))}
    </div>
  </section>

  <TrustBar />
  <Testimonials />
  <CtaBand />
</BaseLayout>
```

- [ ] **Step 6: Verify full homepage**

```bash
npm run dev
```

Expected: Complete homepage with Hero > Services Grid > Who We Work With > Trust Bar > Testimonials > CTA Band > Footer. All sections render correctly. Mobile layout stacks properly. Scroll-snap testimonial carousel on mobile.

- [ ] **Step 7: Commit**

```bash
git add src/components/AudienceCard.astro src/components/TrustBar.astro src/components/Testimonials.astro src/components/CtaBand.astro src/pages/index.astro
git commit -m "feat: complete homepage with audience cards, trust bar, testimonials, and CTA"
```

---

### Task 7: Service Page Layout & Components

**Files:**
- Create: `src/layouts/ServiceLayout.astro`
- Create: `src/components/ServiceFeature.astro`
- Create: `src/components/HowItWorks.astro`
- Create: `src/components/FaqItem.astro`

- [ ] **Step 1: Create ServiceFeature component**

Create `src/components/ServiceFeature.astro`:

```astro
---
interface Props {
  icon: string;
  title: string;
  description: string;
}

const { icon, title, description } = Astro.props;

// Reuse same icon approach - inline SVG paths for common Lucide icons
const iconPaths: Record<string, string> = {
  MonitorPlay: '<path d="M10 7.75a.75.75 0 0 1 1.142-.638l3.664 2.249a.75.75 0 0 1 0 1.278l-3.664 2.25a.75.75 0 0 1-1.142-.64z"/><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8"/><path d="M12 17v4"/>',
  Globe: '<circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>',
  PlayCircle: '<circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/>',
  Lock: '<rect width="18" height="11" x="3" y="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
  Camera: '<path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/>',
  Usb: '<circle cx="10" cy="7" r="1"/><circle cx="4" cy="20" r="1"/><path d="M4.7 19.3 19 5"/><path d="m21 3-3 1 2 2Z"/><path d="M9.26 7.68 5 12l2 2"/><path d="m10 14 2 2"/>',
  Cloud: '<path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/>',
  Scissors: '<circle cx="6" cy="6" r="3"/><path d="M8.12 8.12 12 12"/><path d="M20 4 8.12 15.88"/><circle cx="6" cy="18" r="3"/><path d="M14.8 14.8 20 20"/>',
  Mic: '<path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/>',
  Speaker: '<rect width="16" height="20" x="4" y="2" rx="2"/><circle cx="12" cy="14" r="4"/><line x1="12" x2="12.01" y1="6" y2="6"/>',
  Music: '<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>',
  Headphones: '<path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3"/>',
  Projector: '<path d="M5 7 3 5"/><path d="M9 6V3"/><path d="m13 7 2-2"/><circle cx="9" cy="13" r="3"/><path d="M11.83 12H20a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h2.17"/><path d="M16 16h2"/>',
  RectangleHorizontal: '<rect width="20" height="12" x="2" y="6" rx="2"/>',
  Settings: '<path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/>',
  Monitor: '<rect width="20" height="14" x="2" y="3" rx="2"/><line x1="8" x2="16" y1="21" y2="21"/><line x1="12" x2="12" y1="17" y2="21"/>',
  SlidersHorizontal: '<line x1="21" x2="14" y1="4" y2="4"/><line x1="10" x2="3" y1="4" y2="4"/><line x1="21" x2="12" y1="12" y2="12"/><line x1="8" x2="3" y1="12" y2="12"/><line x1="21" x2="16" y1="20" y2="20"/><line x1="12" x2="3" y1="20" y2="20"/><line x1="14" x2="14" y1="2" y2="6"/><line x1="8" x2="8" y1="10" y2="14"/><line x1="16" x2="16" y1="18" y2="22"/>',
  Cable: '<path d="M17 21v-2a1 1 0 0 1-1-1v-1a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1"/><path d="M19 15V6.5a1 1 0 0 0-7 0v11a1 1 0 0 1-7 0V9"/><path d="M21 21v-2h-4"/><path d="M3 5h4V3"/><path d="M7 5a1 1 0 0 1 1 1v1a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a1 1 0 0 1 1-1"/>',
};
---

<div class="flex flex-col gap-3">
  <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-subtle">
    <svg class="h-5 w-5 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" set:html={iconPaths[icon] || ''} />
  </div>
  <h3 class="text-lg font-semibold text-text-primary">{title}</h3>
  <p class="text-sm text-text-secondary">{description}</p>
</div>
```

- [ ] **Step 2: Create HowItWorks component**

Create `src/components/HowItWorks.astro`:

```astro
---
interface Props {
  steps: [string, string, string];
}

const { steps } = Astro.props;
---

<div class="flex flex-col items-start gap-8 sm:flex-row sm:items-center sm:gap-4">
  {steps.map((step, i) => (
    <>
      <div class="flex items-start gap-4 sm:flex-col sm:items-center sm:text-center">
        <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-bold text-white">
          {i + 1}
        </div>
        <p class="text-sm text-text-secondary sm:mt-3">{step}</p>
      </div>
      {i < 2 && (
        <div class="ml-5 h-8 w-px bg-border sm:ml-0 sm:h-px sm:w-full sm:max-w-[80px]" />
      )}
    </>
  ))}
</div>
```

- [ ] **Step 3: Create FaqItem component**

Create `src/components/FaqItem.astro`:

```astro
---
interface Props {
  question: string;
  answer: string;
  id: string;
}

const { question, answer, id } = Astro.props;
const buttonId = `faq-btn-${id}`;
const panelId = `faq-panel-${id}`;
---

<div class="group rounded-2xl border border-border bg-surface/50 backdrop-blur-xl transition-all duration-200 hover:-translate-y-0.5">
  <button
    type="button"
    id={buttonId}
    aria-controls={panelId}
    aria-expanded="false"
    class="flex w-full items-center gap-4 px-6 py-5 text-left focus-visible:outline-2 focus-visible:outline-accent"
    data-faq-toggle
  >
    <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/5 transition-transform duration-500" data-faq-icon>
      <svg class="h-4 w-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
        <path d="M12 5v14" /><path d="M5 12h14" />
      </svg>
    </span>
    <span class="text-base font-medium text-text-primary">{question}</span>
  </button>

  <div
    id={panelId}
    role="region"
    aria-labelledby={buttonId}
    class="max-h-0 overflow-hidden transition-[max-height] duration-500 ease-out"
    data-faq-panel
  >
    <p class="px-6 pb-5 pl-[4.5rem] text-sm leading-relaxed text-text-secondary">
      {answer}
    </p>
  </div>
</div>
```

- [ ] **Step 4: Create ServiceLayout**

Create `src/layouts/ServiceLayout.astro`:

```astro
---
import BaseLayout from "./BaseLayout.astro";
import ServiceFeature from "../components/ServiceFeature.astro";
import HowItWorks from "../components/HowItWorks.astro";
import FaqItem from "../components/FaqItem.astro";
import CtaBand from "../components/CtaBand.astro";
import type { Service } from "../data/services";

interface Props {
  service: Service;
}

const { service } = Astro.props;
---

<BaseLayout
  title={`${service.title} - iStream | Hawkes Bay`}
  description={service.subtitle}
>
  <!-- Service Hero -->
  <section class="mx-auto max-w-4xl px-6 pt-32 pb-16 text-center">
    <h1 class="text-4xl font-bold tracking-tight text-white sm:text-5xl" style="letter-spacing: -0.01em;">
      {service.title}
    </h1>
    <p class="mt-4 text-lg text-text-secondary">{service.subtitle}</p>
    <a
      href="/contact"
      class="mt-8 inline-block rounded-full bg-accent px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-accent/25 transition-all hover:bg-accent-hover hover:shadow-accent-hover/25"
    >
      Get a Quote for {service.shortTitle}
    </a>
    <div class="mx-auto mt-8 h-px w-24 bg-gradient-to-r from-transparent via-accent to-transparent" />
  </section>

  <!-- What We Offer -->
  <section class="mx-auto max-w-5xl px-6 py-16">
    <h2 class="text-2xl font-semibold tracking-tight text-text-primary sm:text-3xl">
      What We Offer
    </h2>
    <div class="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2">
      {service.features.map((f) => (
        <ServiceFeature icon={f.icon} title={f.title} description={f.description} />
      ))}
    </div>
  </section>

  <!-- How It Works -->
  <section class="mx-auto max-w-3xl px-6 py-16">
    <h2 class="text-2xl font-semibold tracking-tight text-text-primary sm:text-3xl">
      How It Works
    </h2>
    <div class="mt-10">
      <HowItWorks steps={service.howItWorks} />
    </div>
  </section>

  <!-- Popular For -->
  <section class="mx-auto max-w-3xl px-6 py-16">
    <h2 class="text-2xl font-semibold tracking-tight text-text-primary sm:text-3xl">
      Popular For
    </h2>
    <div class="mt-6 flex flex-wrap gap-3">
      {service.popularFor.map((tag) => (
        <span class="rounded-full bg-accent-subtle px-4 py-2 text-sm font-medium text-white">
          {tag}
        </span>
      ))}
    </div>
  </section>

  <!-- FAQs -->
  <section class="mx-auto max-w-3xl px-6 py-16">
    <h2 class="text-2xl font-semibold tracking-tight text-text-primary sm:text-3xl">
      Frequently Asked Questions
    </h2>
    <div class="mt-8 space-y-4">
      {service.faqs.map((faq, i) => (
        <FaqItem question={faq.question} answer={faq.answer} id={`${service.slug}-${i}`} />
      ))}
    </div>
  </section>

  <CtaBand buttonText={`Get a Quote for ${service.shortTitle}`} />
</BaseLayout>

<script>
  document.addEventListener("astro:page-load", () => {
    document.querySelectorAll("[data-faq-toggle]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const panel = btn.parentElement?.querySelector("[data-faq-panel]") as HTMLElement | null;
        const icon = btn.querySelector("[data-faq-icon]") as HTMLElement | null;
        if (!panel || !icon) return;

        const isOpen = btn.getAttribute("aria-expanded") === "true";

        if (isOpen) {
          panel.style.maxHeight = "0";
          btn.setAttribute("aria-expanded", "false");
          icon.style.transform = "rotate(0deg)";
        } else {
          panel.style.maxHeight = panel.scrollHeight + "px";
          btn.setAttribute("aria-expanded", "true");
          icon.style.transform = "rotate(45deg)";
        }
      });
    });
  });
</script>
```

- [ ] **Step 5: Commit**

```bash
git add src/layouts/ServiceLayout.astro src/components/ServiceFeature.astro src/components/HowItWorks.astro src/components/FaqItem.astro
git commit -m "feat: add ServiceLayout with feature grid, how-it-works, FAQ accordion"
```

---

### Task 8: Service Pages (All 5)

**Files:**
- Create: `src/pages/services/live-streaming.astro`
- Create: `src/pages/services/video-recording.astro`
- Create: `src/pages/services/sound-pa.astro`
- Create: `src/pages/services/projector-screen-hire.astro`
- Create: `src/pages/services/equipment-hire.astro`

- [ ] **Step 1: Create all 5 service pages**

Each page follows the same pattern, importing ServiceLayout and passing the matching service data.

Create `src/pages/services/live-streaming.astro`:

```astro
---
import ServiceLayout from "../../layouts/ServiceLayout.astro";
import { services } from "../../data/services";

const service = services.find((s) => s.slug === "live-streaming")!;
---

<ServiceLayout service={service} />
```

Create `src/pages/services/video-recording.astro`:

```astro
---
import ServiceLayout from "../../layouts/ServiceLayout.astro";
import { services } from "../../data/services";

const service = services.find((s) => s.slug === "video-recording")!;
---

<ServiceLayout service={service} />
```

Create `src/pages/services/sound-pa.astro`:

```astro
---
import ServiceLayout from "../../layouts/ServiceLayout.astro";
import { services } from "../../data/services";

const service = services.find((s) => s.slug === "sound-pa")!;
---

<ServiceLayout service={service} />
```

Create `src/pages/services/projector-screen-hire.astro`:

```astro
---
import ServiceLayout from "../../layouts/ServiceLayout.astro";
import { services } from "../../data/services";

const service = services.find((s) => s.slug === "projector-screen-hire")!;
---

<ServiceLayout service={service} />
```

Create `src/pages/services/equipment-hire.astro`:

```astro
---
import ServiceLayout from "../../layouts/ServiceLayout.astro";
import { services } from "../../data/services";

const service = services.find((s) => s.slug === "equipment-hire")!;
---

<ServiceLayout service={service} />
```

- [ ] **Step 2: Verify all service pages**

```bash
npm run dev
```

Navigate to each URL:
- `http://localhost:4321/services/live-streaming`
- `http://localhost:4321/services/video-recording`
- `http://localhost:4321/services/sound-pa`
- `http://localhost:4321/services/projector-screen-hire`
- `http://localhost:4321/services/equipment-hire`

Expected: Each page shows service hero, feature grid, how-it-works steps, popular-for tags, FAQ accordion, and CTA band. FAQ toggle opens/closes with rotation animation.

- [ ] **Step 3: Commit**

```bash
git add src/pages/services/
git commit -m "feat: add all 5 service pages using shared ServiceLayout"
```

---

### Task 9: About Page

**Files:**
- Create: `src/components/TeamCard.astro`
- Create: `src/pages/about.astro`

- [ ] **Step 1: Create TeamCard component**

Create `src/components/TeamCard.astro`:

```astro
---
interface Props {
  name: string;
  role: string;
  bio: string;
}

const { name, role, bio } = Astro.props;
---

<div class="rounded-2xl border border-border bg-surface/50 p-6 text-center">
  <!-- Placeholder avatar -->
  <div class="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-accent-subtle text-2xl font-bold text-accent">
    {name.split(" ").map((n) => n[0]).join("")}
  </div>
  <h3 class="mt-4 text-lg font-semibold text-text-primary">{name}</h3>
  <p class="text-sm text-accent">{role}</p>
  <p class="mt-3 text-sm text-text-secondary">{bio}</p>
</div>
```

- [ ] **Step 2: Create About page**

Create `src/pages/about.astro`:

```astro
---
import BaseLayout from "../layouts/BaseLayout.astro";
import TeamCard from "../components/TeamCard.astro";
import CtaBand from "../components/CtaBand.astro";
---

<BaseLayout
  title="About Us - iStream | Hawkes Bay AV & Streaming"
  description="Learn about iStream, Hawkes Bay's professional AV and live streaming company. Personalised, professional service for your events."
>
  <!-- Hero -->
  <section class="mx-auto max-w-3xl px-6 pt-32 pb-16 text-center">
    <h1 class="text-4xl font-bold tracking-tight text-white sm:text-5xl" style="letter-spacing: -0.01em;">
      About iStream
    </h1>
    <div class="mx-auto mt-8 h-px w-24 bg-gradient-to-r from-transparent via-accent to-transparent" />
  </section>

  <!-- Story -->
  <section class="mx-auto max-w-3xl px-6 py-16">
    <h2 class="text-2xl font-semibold text-text-primary">Our Story</h2>
    <div class="mt-6 space-y-4 text-text-secondary leading-relaxed">
      <p>
        With the advancement of technology and connectivity, the ability to stream live video and audio anywhere in the world is now not only possible, but affordable.
      </p>
      <p>
        Based in Hawkes Bay, iStream was founded with a simple mission: to help people share their most important moments with those who can't be there in person. Whether it's a funeral for distant family, a wedding for friends overseas, or a school prize-giving for working parents — we make sure no one misses out.
      </p>
      <p>
        Our team brings years of experience in video recording and live streaming, and we've expanded to offer a full range of AV services including sound, projection, and equipment hire. From one room to the next, or around the world — we've got you covered.
      </p>
    </div>
  </section>

  <!-- Mission -->
  <section class="mx-auto max-w-3xl px-6 py-16">
    <h2 class="text-2xl font-semibold text-text-primary">Our Commitment</h2>
    <p class="mt-6 text-text-secondary leading-relaxed">
      Our commitment to all our clients is to ensure that their expectations are always exceeded. We do this by providing a personalised, professional service, ensuring that we remain industry leading, yet affordable. Every event gets our full attention and care.
    </p>
  </section>

  <!-- Team -->
  <section class="mx-auto max-w-4xl px-6 py-16">
    <h2 class="text-2xl font-semibold text-text-primary text-center">Our Team</h2>
    <div class="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 max-w-2xl mx-auto">
      <TeamCard
        name="Team Member"
        role="Director"
        bio="Leading iStream with a passion for professional AV services and making sure every event is seamless."
      />
      <TeamCard
        name="Team Member"
        role="Technical Lead"
        bio="Years of experience in live streaming and video production, ensuring the highest quality at every event."
      />
    </div>
  </section>

  <!-- Equipment -->
  <section class="mx-auto max-w-3xl px-6 py-16">
    <h2 class="text-2xl font-semibold text-text-primary">Our Equipment</h2>
    <p class="mt-6 text-text-secondary leading-relaxed">
      We use state-of-the-art pan, tilt, and zoom HD cameras that provide a level of quality that is unrivaled. Combined with professional audio equipment, video switchers, and reliable streaming infrastructure, we deliver broadcast-quality results for every event.
    </p>
  </section>

  <CtaBand heading="Want to work with us? Let's talk." />
</BaseLayout>
```

- [ ] **Step 3: Verify About page**

```bash
npm run dev
```

Navigate to `http://localhost:4321/about`. Expected: About page with story, commitment, team cards (placeholder initials), equipment section, and CTA band.

- [ ] **Step 4: Commit**

```bash
git add src/components/TeamCard.astro src/pages/about.astro
git commit -m "feat: add About page with team cards and company story"
```

---

### Task 10: Contact / Get a Quote Page

**Files:**
- Create: `src/components/ContactForm.astro`
- Create: `src/pages/contact.astro`

- [ ] **Step 1: Create ContactForm component**

Create `src/components/ContactForm.astro`:

```astro
---
---

<form class="space-y-6" id="contact-form" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
  <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
    <!-- Full Name -->
    <div>
      <label for="name" class="block text-sm font-medium text-text-primary">
        Full Name <span class="text-destructive">*</span>
      </label>
      <input
        type="text"
        id="name"
        name="name"
        required
        autocomplete="name"
        class="mt-2 block w-full rounded-lg border border-border bg-surface-elevated px-4 py-3 text-sm text-text-primary placeholder-text-secondary/50 transition-colors focus:border-accent focus:outline-none"
        placeholder="Your full name"
      />
    </div>

    <!-- Email -->
    <div>
      <label for="email" class="block text-sm font-medium text-text-primary">
        Email <span class="text-destructive">*</span>
      </label>
      <input
        type="email"
        id="email"
        name="email"
        required
        autocomplete="email"
        class="mt-2 block w-full rounded-lg border border-border bg-surface-elevated px-4 py-3 text-sm text-text-primary placeholder-text-secondary/50 transition-colors focus:border-accent focus:outline-none"
        placeholder="you@example.com"
      />
    </div>
  </div>

  <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
    <!-- Phone -->
    <div>
      <label for="phone" class="block text-sm font-medium text-text-primary">
        Phone
      </label>
      <input
        type="tel"
        id="phone"
        name="phone"
        autocomplete="tel"
        class="mt-2 block w-full rounded-lg border border-border bg-surface-elevated px-4 py-3 text-sm text-text-primary placeholder-text-secondary/50 transition-colors focus:border-accent focus:outline-none"
        placeholder="022 123 4567"
      />
    </div>

    <!-- Event Type -->
    <div>
      <label for="event-type" class="block text-sm font-medium text-text-primary">
        Event Type <span class="text-destructive">*</span>
      </label>
      <select
        id="event-type"
        name="event_type"
        required
        class="mt-2 block w-full rounded-lg border border-border bg-surface-elevated px-4 py-3 text-sm text-text-primary transition-colors focus:border-accent focus:outline-none"
      >
        <option value="" disabled selected>Select event type</option>
        <option value="funeral">Funeral</option>
        <option value="wedding">Wedding</option>
        <option value="school">School Event</option>
        <option value="church">Church Service</option>
        <option value="other">Other</option>
      </select>
    </div>
  </div>

  <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
    <!-- Event Date -->
    <div>
      <label for="event-date" class="block text-sm font-medium text-text-primary">
        Event Date
      </label>
      <input
        type="date"
        id="event-date"
        name="event_date"
        class="mt-2 block w-full rounded-lg border border-border bg-surface-elevated px-4 py-3 text-sm text-text-primary transition-colors focus:border-accent focus:outline-none"
      />
    </div>

    <!-- Venue -->
    <div>
      <label for="venue" class="block text-sm font-medium text-text-primary">
        Venue / Location
      </label>
      <input
        type="text"
        id="venue"
        name="venue"
        class="mt-2 block w-full rounded-lg border border-border bg-surface-elevated px-4 py-3 text-sm text-text-primary placeholder-text-secondary/50 transition-colors focus:border-accent focus:outline-none"
        placeholder="Venue name or address"
      />
    </div>
  </div>

  <!-- Services Needed -->
  <fieldset>
    <legend class="text-sm font-medium text-text-primary">
      Services Needed <span class="text-destructive">*</span>
    </legend>
    <div class="mt-3 flex flex-wrap gap-4">
      {["Live Streaming", "Video Recording", "Sound & PA", "Projector/Screen Hire", "Equipment Hire"].map((svc) => (
        <label class="flex items-center gap-2 text-sm text-text-secondary cursor-pointer">
          <input
            type="checkbox"
            name="services"
            value={svc}
            class="h-4 w-4 rounded border-border bg-surface-elevated text-accent focus:ring-accent"
          />
          {svc}
        </label>
      ))}
    </div>
  </fieldset>

  <!-- Additional Details -->
  <div>
    <label for="details" class="block text-sm font-medium text-text-primary">
      Additional Details
    </label>
    <textarea
      id="details"
      name="details"
      rows="4"
      class="mt-2 block w-full resize-none rounded-lg border border-border bg-surface-elevated px-4 py-3 text-sm text-text-primary placeholder-text-secondary/50 transition-colors focus:border-accent focus:outline-none"
      placeholder="Tell us a bit about your event..."
    ></textarea>
  </div>

  <!-- Submit -->
  <button
    type="submit"
    class="w-full rounded-full bg-accent px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-accent/25 transition-all hover:bg-accent-hover hover:shadow-accent-hover/25 disabled:opacity-50"
  >
    Send Enquiry
  </button>

  <!-- Success message (hidden by default) -->
  <p class="hidden text-center text-sm text-teal" id="form-success">
    Thanks! We'll be in touch within 24 hours.
  </p>
</form>

<script>
  document.addEventListener("astro:page-load", () => {
    const form = document.getElementById("contact-form") as HTMLFormElement | null;
    const success = document.getElementById("form-success");
    if (!form || !success) return;

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const btn = form.querySelector("button[type=submit]") as HTMLButtonElement;
      btn.disabled = true;
      btn.textContent = "Sending...";

      try {
        const res = await fetch(form.action, {
          method: "POST",
          body: new FormData(form),
          headers: { Accept: "application/json" },
        });

        if (res.ok) {
          form.reset();
          success.classList.remove("hidden");
          btn.textContent = "Sent!";
        } else {
          btn.textContent = "Something went wrong. Try again.";
          btn.disabled = false;
        }
      } catch {
        btn.textContent = "Something went wrong. Try again.";
        btn.disabled = false;
      }
    });
  });
</script>
```

- [ ] **Step 2: Create Contact page**

Create `src/pages/contact.astro`:

```astro
---
import BaseLayout from "../layouts/BaseLayout.astro";
import ContactForm from "../components/ContactForm.astro";
import { site } from "../data/site";
---

<BaseLayout
  title="Get a Quote - iStream | Hawkes Bay AV & Streaming"
  description="Request a quote for live streaming, video recording, sound, projection, or equipment hire in Hawkes Bay."
>
  <section class="relative mx-auto max-w-6xl px-6 pt-32 pb-24">
    <!-- Background glow -->
    <div
      class="pointer-events-none absolute inset-0 -z-10 mx-auto h-[500px] max-w-3xl opacity-30"
      style="background: linear-gradient(106deg, rgba(14,165,233,0.3) 15%, rgba(20,184,166,0.2) 55%, rgba(14,165,233,0.15) 100%); filter: blur(118px);"
    ></div>

    <div class="grid grid-cols-1 gap-16 lg:grid-cols-2">
      <!-- Left: Contact Info -->
      <div class="pt-4">
        <h1 class="text-4xl font-bold tracking-tight text-white sm:text-5xl" style="letter-spacing: -0.01em;">
          Get a Quote
        </h1>
        <p class="mt-4 text-lg text-text-secondary">
          Tell us about your event and we'll be in touch within 24 hours.
        </p>

        <div class="mt-12 space-y-6">
          <div>
            <h3 class="text-sm font-semibold uppercase tracking-wider text-text-primary">Phone</h3>
            <a href={`tel:${site.phone.replace(/\s/g, "")}`} class="mt-1 block text-text-secondary transition-colors hover:text-accent">
              {site.phone}
            </a>
          </div>
          <div>
            <h3 class="text-sm font-semibold uppercase tracking-wider text-text-primary">Email</h3>
            <a href={`mailto:${site.email}`} class="mt-1 block text-text-secondary transition-colors hover:text-accent">
              {site.email}
            </a>
          </div>
          <div>
            <h3 class="text-sm font-semibold uppercase tracking-wider text-text-primary">Location</h3>
            <p class="mt-1 text-text-secondary">{site.address}</p>
          </div>
          <div class="flex gap-4 pt-4">
            <a href={site.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" class="text-text-secondary transition-colors hover:text-accent">
              <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
            <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" class="text-text-secondary transition-colors hover:text-accent">
              <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            </a>
            <a href={site.social.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube" class="text-text-secondary transition-colors hover:text-accent">
              <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            </a>
          </div>
        </div>
      </div>

      <!-- Right: Form -->
      <div class="rounded-2xl border border-border bg-surface p-8">
        <h2 class="text-xl font-semibold text-text-primary">Tell us about your event</h2>
        <p class="mt-1 text-sm text-text-secondary">We'll get back to you within 24 hours.</p>
        <div class="mt-6">
          <ContactForm />
        </div>
      </div>
    </div>
  </section>
</BaseLayout>
```

- [ ] **Step 3: Verify Contact page**

```bash
npm run dev
```

Navigate to `http://localhost:4321/contact`. Expected: Two-column layout (stacked on mobile). Left shows contact info and social links. Right shows the form in a dark card with gradient glow behind. Form fields have visible labels, proper input types, and checkboxes.

- [ ] **Step 4: Commit**

```bash
git add src/components/ContactForm.astro src/pages/contact.astro
git commit -m "feat: add Contact page with quote request form and contact details"
```

---

### Task 11: SEO, Structured Data & Build Verification

**Files:**
- Modify: `src/components/SeoHead.astro` (add structured data for homepage)
- Modify: `src/pages/index.astro` (add structured data)

- [ ] **Step 1: Add LocalBusiness structured data to homepage**

Update `src/pages/index.astro` — add this inside the `<BaseLayout>` opening tag area. Add a `<script type="application/ld+json">` in a `<Fragment slot="head">` or directly in the page before `</BaseLayout>`:

Add this block at the very end of the file, just before the closing `</BaseLayout>`:

```astro
<script type="application/ld+json" set:html={JSON.stringify({
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "iStream",
  "description": "Professional AV and live streaming services in Hawkes Bay, New Zealand.",
  "url": "https://istream.co.nz",
  "telephone": "+64223806280",
  "email": "info@istream.co.nz",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Omahu Road",
    "addressLocality": "Hastings",
    "addressRegion": "Hawkes Bay",
    "addressCountry": "NZ"
  },
  "areaServed": "Hawkes Bay, New Zealand",
  "serviceType": ["Live Streaming", "Video Recording", "Sound PA Hire", "Projector Screen Hire", "Equipment Hire"]
})} />
```

- [ ] **Step 2: Run production build**

```bash
npm run build
```

Expected: Build completes successfully. All 8 pages generated in `dist/`:
- `dist/index.html`
- `dist/about/index.html`
- `dist/contact/index.html`
- `dist/services/live-streaming/index.html`
- `dist/services/video-recording/index.html`
- `dist/services/sound-pa/index.html`
- `dist/services/projector-screen-hire/index.html`
- `dist/services/equipment-hire/index.html`

- [ ] **Step 3: Preview production build**

```bash
npm run preview
```

Navigate through all pages. Verify:
- View transitions work between pages (cross-fade)
- All links navigate correctly
- Mobile menu works
- FAQ accordions work
- Form renders correctly
- Footer links point to correct pages
- No console errors

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: add structured data, verify build, all 8 pages complete"
```

---

### Task 12: Cloudflare Pages Deployment Setup

**Files:**
- No new files needed (Cloudflare configures via dashboard or wrangler)

- [ ] **Step 1: Verify build command and output directory**

The build command is `npm run build` and output directory is `dist`. These are Astro defaults that Cloudflare Pages detects automatically.

- [ ] **Step 2: Push to GitHub**

```bash
git push origin main
```

- [ ] **Step 3: Connect to Cloudflare Pages**

Go to Cloudflare Dashboard > Pages > Create a project > Connect to Git.

Settings:
- **Repository:** `kiwi-digital/stream-website`
- **Build command:** `npm run build`
- **Build output directory:** `dist`
- **Framework preset:** Astro (auto-detected)
- **Node version:** 18+

Click "Save and Deploy".

- [ ] **Step 4: Verify deployment**

Expected: Site deploys to `stream-website.pages.dev` (or similar). All pages load correctly. View transitions, FAQ accordions, and mobile menu all work in production.

- [ ] **Step 5: Commit any Cloudflare config if needed**

If a `wrangler.toml` or other config was created, commit it:

```bash
git add -A
git commit -m "chore: add Cloudflare Pages deployment config"
git push origin main
```

---

## Summary

| Task | Description | Files |
|------|-------------|-------|
| 1 | Project scaffolding & Tailwind setup | astro.config, global.css, BaseLayout, index |
| 2 | Site data files | site.ts, services.ts, testimonials.ts |
| 3 | SkipLink, SeoHead & Header | 3 components + BaseLayout update |
| 4 | Footer | Footer.astro + BaseLayout update |
| 5 | Homepage Hero & ServiceCard | Hero.astro, ServiceCard.astro, index.astro |
| 6 | Homepage remaining sections | AudienceCard, TrustBar, Testimonials, CtaBand |
| 7 | Service page layout & components | ServiceLayout, ServiceFeature, HowItWorks, FaqItem |
| 8 | All 5 service pages | 5 page files |
| 9 | About page | TeamCard.astro, about.astro |
| 10 | Contact page | ContactForm.astro, contact.astro |
| 11 | SEO, structured data & build verification | SeoHead update, build test |
| 12 | Cloudflare Pages deployment | Deploy and verify |
