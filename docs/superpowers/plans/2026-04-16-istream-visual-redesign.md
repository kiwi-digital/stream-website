# iStream Bento Editorial Visual Redesign - Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the iStream homepage from generic dark-theme into a distinctive Bento Editorial design with stock photography, animated gradient borders, bento grid layout, and cinematic hero.

**Architecture:** Visual-only changes to existing Astro components. New CSS animations added to global.css, Hero and Testimonials fully rewritten, new BentoServiceCard component replaces ServiceCard on homepage, TrustBar upgraded with animated counters. No structural/page changes.

**Tech Stack:** Astro 5+, Tailwind CSS v4, CSS @property for animated gradients/counters, Unsplash stock photos via direct URLs.

**Design Spec:** `docs/superpowers/specs/2026-04-16-istream-visual-redesign-design.md`

---

## File Structure

```
Modified:
  src/styles/global.css              # New animation keyframes, @property rules, film grain, reduced motion
  src/components/Hero.astro          # Full rewrite: stock photo, gradient text, word rotation, glow CTA
  src/components/TrustBar.astro      # Rewrite: animated counters, larger type, gradient dividers
  src/components/Testimonials.astro  # Rewrite: single-featured crossfade layout
  src/pages/index.astro              # Bento grid layout, accent bars on section labels

Created:
  src/components/BentoServiceCard.astro  # New bento card with stock photos, gradient borders, 3D tilt
```

---

### Task 1: CSS Animation Foundation

**Files:**
- Modify: `src/styles/global.css`

- [ ] **Step 1: Add @property rules and animation keyframes to global.css**

Append the following after the existing `.stagger-grid.visible > *` block (after line 86):

```css
/* === Bento Editorial Animations === */

/* Animated gradient border angle */
@property --border-angle {
  syntax: '<angle>';
  initial-value: 0deg;
  inherits: false;
}

@keyframes border-rotate {
  to { --border-angle: 360deg; }
}

/* Animated counter for trust bar */
@property --counter-value {
  syntax: '<integer>';
  initial-value: 0;
  inherits: false;
}

/* Film grain texture overlay */
.film-grain {
  position: relative;
}

.film-grain::after {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
  opacity: 0.4;
  pointer-events: none;
  mix-blend-mode: overlay;
  z-index: 1;
}

/* CTA glow pulse */
@keyframes glow-pulse {
  0%, 100% { box-shadow: 0 0 20px rgba(14,165,233,0.3); }
  50% { box-shadow: 0 0 40px rgba(14,165,233,0.5); }
}

.glow-pulse {
  animation: glow-pulse 3s ease-in-out infinite;
}

/* Word rotation for hero */
@keyframes word-rotate {
  0%, 18% { opacity: 1; transform: translateY(0); }
  25%, 100% { opacity: 0; transform: translateY(-100%); }
}

/* 3D tilt on hover */
.bento-tilt {
  transition: transform 0.3s ease-out;
}

.bento-tilt:hover {
  transform: perspective(800px) rotateX(2deg) rotateY(-2deg) translateY(-4px);
}

/* Animated gradient border for bento cards */
.bento-border {
  position: relative;
}

.bento-border::before {
  content: '';
  position: absolute;
  inset: -2px;
  border-radius: 18px;
  background: conic-gradient(from var(--border-angle, 0deg), transparent 60%, var(--accent-color, #0EA5E9) 80%, transparent 100%);
  opacity: 0;
  transition: opacity 0.3s;
  z-index: -1;
}

.bento-border:hover::before {
  opacity: 1;
  animation: border-rotate 3s linear infinite;
}

/* Count-up animation for trust bar */
.count-up {
  --counter-value: 0;
  counter-reset: num var(--counter-value);
  transition: --counter-value 2s ease-out;
}

.count-up.visible {
  /* target value set via inline style: --counter-value: 500 */
}

.count-up::after {
  content: counter(num);
}

/* Gradient text utility */
.gradient-text {
  background: linear-gradient(135deg, #0EA5E9, #14B8A6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Reduced motion overrides for new animations */
@media (prefers-reduced-motion: reduce) {
  .film-grain::after { display: none; }
  .glow-pulse { animation: none !important; box-shadow: 0 0 20px rgba(14,165,233,0.3); }
  .bento-border::before { animation: none !important; }
  .bento-tilt:hover { transform: translateY(-4px); }
  [data-word-rotate] > span { opacity: 1 !important; transform: none !important; animation: none !important; }
  .count-up { transition: none !important; }
}
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```

Expected: Build passes. No errors from the new CSS.

- [ ] **Step 3: Commit**

```bash
git add src/styles/global.css
git commit -m "feat: add CSS animation foundation for Bento Editorial redesign"
```

---

### Task 2: Hero Section Rewrite

**Files:**
- Modify: `src/components/Hero.astro` (full rewrite)

- [ ] **Step 1: Rewrite Hero.astro with stock photo, gradient text, word rotation, and glow CTA**

Replace the entire contents of `src/components/Hero.astro` with:

```astro
---
const words = ["Weddings", "Funerals", "School Events", "Church Services"];
---

<section class="film-grain relative flex min-h-screen items-center justify-center overflow-hidden">
  <!-- Background stock photo -->
  <img
    src="https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=1920&q=80"
    alt=""
    role="presentation"
    class="absolute inset-0 h-full w-full object-cover"
    loading="eager"
    decoding="async"
  />

  <!-- Dark overlay -->
  <div class="absolute inset-0 bg-black/85"></div>

  <!-- Content -->
  <div class="relative z-10 mx-auto max-w-4xl px-6 text-center">
    <!-- Eyebrow -->
    <span class="inline-block rounded-full border border-white/10 bg-white/5 px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-text-secondary backdrop-blur-sm">
      Hawkes Bay's AV & Streaming Experts
    </span>

    <!-- Headline -->
    <h1 class="mt-8 text-5xl font-bold leading-[1.1] text-white sm:text-6xl lg:text-7xl" style="letter-spacing: -0.03em;">
      Every Moment,<br />
      <span class="gradient-text">Broadcast Beautifully</span>
    </h1>

    <!-- Animated word rotation subtitle -->
    <p class="mt-6 text-lg text-text-secondary sm:text-xl">
      Professional AV & streaming for{" "}
      <span class="relative inline-block h-[1.4em] w-[10ch] overflow-hidden align-bottom sm:w-[14ch]" data-word-rotate>
        {words.map((word, i) => (
          <span
            class="absolute left-0 top-0 font-semibold text-white"
            style={`animation: word-rotate 8s ease-in-out infinite; animation-delay: ${i * 2}s;${i !== 0 ? " opacity: 0;" : ""}`}
          >
            {word}
          </span>
        ))}
      </span>
    </p>

    <!-- CTAs -->
    <div class="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
      <a
        href="/contact"
        class="glow-pulse rounded-full bg-accent px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
      >
        Get a Quote
      </a>
      <a
        href="#services"
        class="rounded-full border border-transparent bg-clip-padding px-8 py-3.5 text-sm font-semibold text-text-secondary transition-all hover:text-white"
        style="border-image: linear-gradient(135deg, rgba(14,165,233,0.4), rgba(20,184,166,0.4)) 1; border-image-slice: 1;"
      >
        Our Services
      </a>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Verify build and check dev server**

```bash
npm run build
```

Expected: Build passes. Hero shows stock photo background, dark overlay, gradient headline, rotating words, glow-pulsing CTA button.

- [ ] **Step 3: Commit**

```bash
git add src/components/Hero.astro
git commit -m "feat: rewrite Hero with stock photo, gradient text, word rotation, and glow CTA"
```

---

### Task 3: BentoServiceCard Component

**Files:**
- Create: `src/components/BentoServiceCard.astro`

- [ ] **Step 1: Create the BentoServiceCard component**

Create `src/components/BentoServiceCard.astro`:

```astro
---
interface Props {
  title: string;
  description: string;
  href: string;
  accentColor: string;
  imageUrl: string;
  span?: string;
}

const { title, description, href, accentColor, imageUrl, span = "" } = Astro.props;
---

<a
  href={href}
  class:list={[
    "bento-border bento-tilt group relative flex flex-col justify-end overflow-hidden rounded-2xl",
    "min-h-[220px]",
    span,
  ]}
  style={`--accent-color: ${accentColor};`}
>
  <!-- Background image -->
  <img
    src={imageUrl}
    alt=""
    role="presentation"
    class="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
    loading="lazy"
    decoding="async"
  />

  <!-- Dark gradient overlay -->
  <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20"></div>

  <!-- Content -->
  <div class="relative z-10 p-6">
    <p class="text-xs font-semibold uppercase tracking-[0.15em]" style={`color: ${accentColor};`}>
      {title}
    </p>
    <h3 class="mt-1 text-lg font-semibold text-white sm:text-xl">
      {description}
    </h3>
    <span class="mt-3 inline-flex items-center gap-1 text-sm font-medium text-white/60 transition-colors group-hover:text-white">
      Learn more
      <svg class="h-4 w-4 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
    </span>
  </div>
</a>
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```

Expected: Build passes (component not used yet but should compile).

- [ ] **Step 3: Commit**

```bash
git add src/components/BentoServiceCard.astro
git commit -m "feat: add BentoServiceCard with stock photos, gradient borders, and 3D tilt"
```

---

### Task 4: Homepage Bento Grid & Section Labels

**Files:**
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Rewrite index.astro with bento grid and accent bars**

Replace the entire contents of `src/pages/index.astro` with:

```astro
---
import BaseLayout from "../layouts/BaseLayout.astro";
import Hero from "../components/Hero.astro";
import BentoServiceCard from "../components/BentoServiceCard.astro";
import AudienceCard from "../components/AudienceCard.astro";
import TrustBar from "../components/TrustBar.astro";
import Testimonials from "../components/Testimonials.astro";
import CtaBand from "../components/CtaBand.astro";

const audiences = [
  { icon: "Heart", title: "Funeral Homes", description: "Helping families share services with loved ones who can't be there in person." },
  { icon: "Flower", title: "Wedding Venues", description: "Live streaming and recording so every guest can be part of the celebration." },
  { icon: "GraduationCap", title: "Schools", description: "Stream prize-givings, assemblies, and sports events for parents and whanau." },
  { icon: "Church", title: "Churches & Community", description: "Extend your reach with live streamed services and community events." },
];

const bentoServices = [
  {
    title: "Live Streaming",
    description: "Share your event with the world in real time",
    href: "/services/live-streaming",
    accentColor: "#0EA5E9",
    imageUrl: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&q=80",
    span: "sm:col-span-2 sm:row-span-2 sm:min-h-[460px]",
  },
  {
    title: "Video Recording",
    description: "Lasting memories, professionally captured",
    href: "/services/video-recording",
    accentColor: "#6366F1",
    imageUrl: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=600&q=80",
    span: "",
  },
  {
    title: "Sound & PA",
    description: "Crystal-clear audio for any venue",
    href: "/services/sound-pa",
    accentColor: "#14B8A6",
    imageUrl: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=600&q=80",
    span: "",
  },
  {
    title: "Projector & Screens",
    description: "Make your visuals shine",
    href: "/services/projector-screen-hire",
    accentColor: "#22D3EE",
    imageUrl: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=600&q=80",
    span: "",
  },
  {
    title: "Equipment Hire",
    description: "Professional AV gear, without the cost of ownership",
    href: "/services/equipment-hire",
    accentColor: "#A855F7",
    imageUrl: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=800&q=80",
    span: "sm:col-span-2",
  },
];
---

<BaseLayout
  title="iStream - Professional AV & Live Streaming | Hawkes Bay"
  description="Professional live streaming, video recording, and AV services in Hawkes Bay, New Zealand. Trusted by funeral homes, wedding venues, schools, and churches."
>
  <Hero />

  <!-- Services Bento Grid -->
  <section id="services" class="reveal mx-auto max-w-6xl px-6 py-24">
    <div class="flex flex-col items-center gap-3 text-center">
      <div class="h-1 w-8 rounded-full bg-gradient-to-r from-sky-500 to-teal-500"></div>
      <p class="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Our Services</p>
      <h2 class="mt-1 text-3xl font-semibold tracking-tight text-text-primary sm:text-4xl">
        Everything you need for a seamless event
      </h2>
    </div>

    <div class="reveal stagger-grid mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3">
      {bentoServices.map((service) => (
        <BentoServiceCard
          title={service.title}
          description={service.description}
          href={service.href}
          accentColor={service.accentColor}
          imageUrl={service.imageUrl}
          span={service.span}
        />
      ))}
    </div>
  </section>

  <!-- Who We Work With -->
  <section class="reveal mx-auto max-w-4xl px-6 py-24">
    <div class="flex flex-col items-center gap-3 text-center">
      <div class="h-1 w-8 rounded-full bg-gradient-to-r from-teal-500 to-cyan-400"></div>
      <p class="text-xs font-semibold uppercase tracking-[0.2em] text-teal">Who We Work With</p>
      <h2 class="mt-1 text-3xl font-semibold tracking-tight text-text-primary sm:text-4xl">
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

  <script>
    document.addEventListener("astro:page-load", () => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("visible");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1 }
      );
      document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    });
  </script>
</BaseLayout>
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```

Expected: Build passes. Homepage now uses BentoServiceCard instead of ServiceCard. The old ServiceCard.astro is still used by ServiceLayout for service pages -- do not delete it.

- [ ] **Step 3: Commit**

```bash
git add src/pages/index.astro
git commit -m "feat: replace services grid with bento layout and add accent bars to section labels"
```

---

### Task 5: TrustBar with Animated Counters

**Files:**
- Modify: `src/components/TrustBar.astro` (full rewrite)

- [ ] **Step 1: Rewrite TrustBar.astro**

Replace the entire contents of `src/components/TrustBar.astro` with:

```astro
---
const stats = [
  { value: 500, suffix: "+", label: "Events Streamed" },
  { value: 2015, suffix: "", label: "Serving Hawkes Bay Since" },
  { value: 50, suffix: "+", label: "Venues Trust Us" },
];
---

<section class="reveal border-y border-border bg-surface/50 py-16">
  <div class="mx-auto flex max-w-4xl flex-col items-center justify-center gap-10 px-6 sm:flex-row sm:gap-0">
    {stats.map((stat, i) => (
      <>
        <div class="flex flex-col items-center text-center sm:flex-1">
          <span class="text-5xl font-bold text-accent" data-count-target={stat.value} data-count-suffix={stat.suffix}>
            0{stat.suffix}
          </span>
          <span class="mt-2 text-sm font-medium uppercase tracking-wider text-text-secondary">
            {stat.label}
          </span>
        </div>
        {i < stats.length - 1 && (
          <div class="hidden h-12 w-px sm:block" style="background: linear-gradient(to bottom, transparent, rgba(14,165,233,0.3), transparent);"></div>
        )}
      </>
    ))}
  </div>
</section>

<script>
  document.addEventListener("astro:page-load", () => {
    const counters = document.querySelectorAll("[data-count-target]");
    if (!counters.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          const target = parseInt(el.dataset.countTarget || "0", 10);
          const suffix = el.dataset.countSuffix || "";
          const duration = 2000;
          const start = performance.now();

          function tick(now: number) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(eased * target);
            el.textContent = `${current}${suffix}`;
            if (progress < 1) requestAnimationFrame(tick);
          }

          requestAnimationFrame(tick);
          observer.unobserve(el);
        });
      },
      { threshold: 0.5 }
    );

    counters.forEach((el) => observer.observe(el));
  });
</script>
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```

Expected: Build passes. Trust bar has larger numbers that animate up from 0 when scrolled into view. Gradient divider lines between stats.

- [ ] **Step 3: Commit**

```bash
git add src/components/TrustBar.astro
git commit -m "feat: add animated counters and gradient dividers to TrustBar"
```

---

### Task 6: Testimonials Single-Featured Crossfade

**Files:**
- Modify: `src/components/Testimonials.astro` (full rewrite)

- [ ] **Step 1: Rewrite Testimonials.astro**

Replace the entire contents of `src/components/Testimonials.astro` with:

```astro
---
import { testimonials } from "../data/testimonials";
---

<section class="mx-auto max-w-4xl px-6 py-24">
  <div class="flex flex-col items-center gap-3 text-center">
    <div class="h-1 w-8 rounded-full bg-gradient-to-r from-sky-500 to-indigo-500"></div>
    <p class="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Testimonials</p>
    <h2 class="mt-1 text-3xl font-semibold tracking-tight text-text-primary sm:text-4xl">
      What our clients say
    </h2>
  </div>

  <!-- Testimonial display area -->
  <div class="relative mt-16 min-h-[280px]" role="region" aria-roledescription="carousel" aria-label="Client testimonials">
    <!-- Decorative quote mark -->
    <span class="pointer-events-none absolute -left-4 -top-8 text-[128px] font-bold leading-none text-accent/10 select-none" aria-hidden="true">
      &ldquo;
    </span>

    <!-- Testimonial slides -->
    {testimonials.map((t, i) => (
      <article
        class:list={[
          "absolute inset-0 transition-opacity duration-500",
          i === 0 ? "opacity-100" : "opacity-0 pointer-events-none",
        ]}
        data-testimonial-slide={i}
        role="group"
        aria-roledescription="slide"
        aria-label={`Testimonial ${i + 1} of ${testimonials.length}`}
      >
        <blockquote class="relative z-10">
          <p class="text-2xl font-light leading-relaxed text-text-primary sm:text-3xl">
            {t.quote}
          </p>
          <footer class="mt-8">
            <div class="h-1 w-12 rounded-full bg-gradient-to-r from-accent to-teal" />
            <cite class="mt-4 block not-italic">
              <span class="text-lg font-semibold text-white">{t.name}</span>
              <span class="ml-2 text-sm text-text-secondary">{t.role}</span>
            </cite>
          </footer>
        </blockquote>
      </article>
    ))}
  </div>

  <!-- Navigation -->
  <div class="mt-8 flex items-center justify-between sm:justify-center sm:gap-8">
    <div class="flex items-center gap-2">
      {testimonials.map((_, i) => (
        <button
          class="group relative py-3"
          data-testimonial-dot={i}
          aria-label={`Go to testimonial ${i + 1}`}
        >
          <span
            class:list={[
              "block h-0.5 rounded-full transition-all duration-500 ease-out",
              i === 0
                ? "w-10 bg-gradient-to-r from-accent to-teal"
                : "w-5 bg-white/20 group-hover:w-7 group-hover:bg-white/40",
            ]}
          />
        </button>
      ))}
    </div>
    <span class="text-xs text-text-secondary tracking-widest uppercase" data-testimonial-counter>
      01 / {String(testimonials.length).padStart(2, "0")}
    </span>
    <div class="flex items-center gap-1">
      <button
        class="p-2 rounded-full text-white/30 hover:text-white hover:bg-white/5 transition-all duration-300"
        data-testimonial-prev
        aria-label="Previous testimonial"
      >
        <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
      </button>
      <button
        class="p-2 rounded-full text-white/30 hover:text-white hover:bg-white/5 transition-all duration-300"
        data-testimonial-next
        aria-label="Next testimonial"
      >
        <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
      </button>
    </div>
  </div>
</section>

<script>
  document.addEventListener("astro:page-load", () => {
    const slides = document.querySelectorAll("[data-testimonial-slide]");
    const dots = document.querySelectorAll("[data-testimonial-dot]");
    const counter = document.querySelector("[data-testimonial-counter]") as HTMLElement | null;
    const prevBtn = document.querySelector("[data-testimonial-prev]");
    const nextBtn = document.querySelector("[data-testimonial-next]");

    if (!slides.length || !counter) return;

    const total = slides.length;
    let active = 0;

    function goTo(index: number) {
      active = ((index % total) + total) % total;

      slides.forEach((slide, i) => {
        if (i === active) {
          slide.classList.remove("opacity-0", "pointer-events-none");
          slide.classList.add("opacity-100");
        } else {
          slide.classList.remove("opacity-100");
          slide.classList.add("opacity-0", "pointer-events-none");
        }
      });

      dots.forEach((dot, i) => {
        const line = dot.querySelector("span");
        if (!line) return;
        if (i === active) {
          line.className = "block h-0.5 rounded-full transition-all duration-500 ease-out w-10 bg-gradient-to-r from-accent to-teal";
        } else {
          line.className = "block h-0.5 rounded-full transition-all duration-500 ease-out w-5 bg-white/20 group-hover:w-7 group-hover:bg-white/40";
        }
      });

      counter.textContent = `${String(active + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;
    }

    prevBtn?.addEventListener("click", () => goTo(active - 1));
    nextBtn?.addEventListener("click", () => goTo(active + 1));
    dots.forEach((dot) => {
      dot.addEventListener("click", () => {
        const i = Number((dot as HTMLElement).dataset.testimonialDot);
        goTo(i);
      });
    });

    // Keyboard navigation
    const section = slides[0]?.closest("section");
    if (section) {
      section.setAttribute("tabindex", "0");
      section.addEventListener("keydown", (e: KeyboardEvent) => {
        if (e.key === "ArrowRight") { e.preventDefault(); goTo(active + 1); }
        if (e.key === "ArrowLeft") { e.preventDefault(); goTo(active - 1); }
      });
    }

    // Auto-advance every 6 seconds
    let interval = setInterval(() => goTo(active + 1), 6000);
    const region = slides[0]?.closest("[role=region]");
    region?.addEventListener("mouseenter", () => clearInterval(interval));
    region?.addEventListener("mouseleave", () => {
      interval = setInterval(() => goTo(active + 1), 6000);
    });
  });
</script>
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```

Expected: Build passes. Testimonials now show one at a time with crossfade, decorative quote mark, gradient accent bar, and auto-advance.

- [ ] **Step 3: Commit**

```bash
git add src/components/Testimonials.astro
git commit -m "feat: redesign Testimonials with single-featured crossfade and editorial styling"
```

---

### Task 7: Final Build Verification & Push

**Files:** None (verification only)

- [ ] **Step 1: Full production build**

```bash
npm run build
```

Expected: 8 pages built successfully with sitemap.

- [ ] **Step 2: Start dev server and visually verify**

```bash
npm run dev
```

Check in browser at `http://localhost:4321`:
- Hero: stock photo background, film grain, gradient headline, rotating words, glow-pulsing CTA
- Services: bento grid with mixed card sizes, stock photos in each card, animated gradient borders on hover, 3D tilt
- Trust bar: numbers count up from 0, gradient dividers
- Testimonials: single featured quote, crossfade between, decorative quote mark, gradient dots
- All section labels have accent gradient bar above them

- [ ] **Step 3: Commit and push**

```bash
git push origin main
```

---

## Summary

| Task | Description | Files |
|------|-------------|-------|
| 1 | CSS animation foundation | global.css |
| 2 | Hero rewrite | Hero.astro |
| 3 | BentoServiceCard component | BentoServiceCard.astro (new) |
| 4 | Homepage bento grid & section labels | index.astro |
| 5 | TrustBar animated counters | TrustBar.astro |
| 6 | Testimonials crossfade redesign | Testimonials.astro |
| 7 | Final build verification & push | (verification) |
