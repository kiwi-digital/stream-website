# iStream Visual Redesign - Bento Editorial

## Overview

Visual polish pass on the existing iStream website to transform it from a generic dark-theme site into a distinctive, premium Bento Editorial design. No structural or page changes -- this is purely visual: imagery, animations, typography, and layout upgrades.

**Direction:** Bento Editorial -- inspired by Apple/Linear. Mixed-size bento grid, per-service accent colours, editorial typography, real stock photography, animated gradient borders.

**Colour system:** Cool Spectrum -- sky blue, indigo, teal, cyan, purple across the five services.

**Imagery:** High-quality Unsplash stock photos with dark overlays.

---

## Service Colour Map

| Service | Accent Colour | Hex | Tailwind |
|---------|--------------|-----|----------|
| Live Streaming | Sky Blue | `#0EA5E9` | `sky-500` |
| Video Recording | Indigo | `#6366F1` | `indigo-500` |
| Sound & PA | Teal | `#14B8A6` | `teal-500` |
| Projector & Screens | Cyan | `#22D3EE` | `cyan-400` |
| Equipment Hire | Purple | `#A855F7` | `purple-500` |

Each service card, service page accent line, and icon background uses its assigned colour.

---

## Hero Section Redesign

**File:** `src/components/Hero.astro` (full rewrite)

### Background
- Real Unsplash stock photo of a professional camera/event setup
- Use a direct Unsplash URL: `https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1920&q=80` (or similar event/broadcast photo)
- Dark overlay at 85% opacity (`bg-black/85`) over the image
- Subtle CSS film grain texture overlay for cinematic, non-AI feel:
  ```css
  .film-grain::after {
    content: '';
    position: absolute;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
    opacity: 0.4;
    pointer-events: none;
    mix-blend-mode: overlay;
  }
  ```

### Headline
- Size: 72px desktop, 48px tablet, 36px mobile (`text-5xl sm:text-6xl lg:text-7xl`)
- Tight tracking: `-0.03em`
- First line in white: "Every Moment,"
- Second line in **gradient text** (sky-500 to teal-500):
  ```css
  background: linear-gradient(135deg, #0EA5E9, #14B8A6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  ```
  Text: "Broadcast Beautifully"

### Animated Word Rotation
Below the headline, a line that cycles through audience types:
"Professional AV & streaming for **Weddings**" → "**Funerals**" → "**School Events**" → "**Church Services**"

CSS-only implementation using stacked `<span>` elements with `@keyframes` that cycle opacity and translateY:
```css
@keyframes word-rotate {
  0%, 20% { opacity: 1; transform: translateY(0); }
  25%, 45% { opacity: 0; transform: translateY(-20px); }
  /* ... cycle through 4 words at 25% intervals */
}
```
Each word gets `animation-delay` offset by 25% of the total duration (8s cycle = 2s per word).

### CTAs
- Primary: "Get a Quote" -- solid sky-500 with **animated glow pulse** on idle:
  ```css
  @keyframes glow-pulse {
    0%, 100% { box-shadow: 0 0 20px rgba(14,165,233,0.3); }
    50% { box-shadow: 0 0 40px rgba(14,165,233,0.5); }
  }
  ```
- Secondary: "Watch Our Work" -- ghost button with gradient border (sky to teal)

---

## Services Bento Grid Redesign

**File:** `src/pages/index.astro` (services section) + new `src/components/BentoServiceCard.astro`

### Layout
Replace the current equal 3-column grid with an asymmetric bento grid:

```
Desktop (lg):
┌──────────────────────┬───────────┐
│                      │ Recording │
│   Live Streaming     │  (indigo) │
│   (sky blue, 2-col)  ├───────────┤
│                      │ Sound &PA │
│                      │  (teal)   │
├───────────┬──────────┴───────────┤
│ Projector │    Equipment Hire    │
│  (cyan)   │     (purple)        │
└───────────┴──────────────────────┘
```

CSS Grid:
```css
grid-template-columns: repeat(3, 1fr);
grid-template-rows: auto auto;
```
- Live Streaming: `col-span-2 row-span-2`
- Video Recording: `col-span-1 row-span-1`
- Sound & PA: `col-span-1 row-span-1`
- Projector: `col-span-1 row-span-1`
- Equipment: `col-span-2 row-span-1`

On mobile: all stack to single column. On tablet (sm): 2-column grid, Live Streaming spans 2 cols.

### BentoServiceCard Component

Each card has:
- **Background stock photo** (from Unsplash, with dark gradient overlay from bottom)
  - Live Streaming: camera rig / broadcast setup
  - Video Recording: camera filming event
  - Sound & PA: mixing desk / speakers
  - Projector: projector in venue
  - Equipment: AV gear collection
- **Animated gradient border** on hover -- rotating conic gradient:
  ```css
  .bento-card {
    position: relative;
    border-radius: 16px;
    overflow: hidden;
  }
  .bento-card::before {
    content: '';
    position: absolute;
    inset: -2px;
    border-radius: 18px;
    background: conic-gradient(from var(--border-angle, 0deg), transparent 60%, var(--accent) 80%, transparent 100%);
    opacity: 0;
    transition: opacity 0.3s;
    z-index: -1;
  }
  .bento-card:hover::before {
    opacity: 1;
    animation: border-rotate 3s linear infinite;
  }
  @keyframes border-rotate {
    to { --border-angle: 360deg; }
  }
  ```
  Uses `@property --border-angle` for smooth CSS animation of the conic-gradient angle.
- **Service accent colour** for the icon background, label text, and border gradient
- **Subtle 3D tilt on hover** (CSS perspective transform):
  ```css
  .bento-card:hover {
    transform: perspective(800px) rotateX(2deg) rotateY(-2deg) translateY(-4px);
    transition: transform 0.3s ease-out;
  }
  ```
- Content: accent-coloured label ("Live Streaming"), white title, grey description, "Learn more →" link

### Unsplash Image URLs

Use these direct Unsplash URLs (free to use):
- Live Streaming: `https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&q=80` (video camera)
- Video Recording: `https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=600&q=80` (camera filming)
- Sound & PA: `https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=600&q=80` (mixing desk)
- Projector: `https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=600&q=80` (conference projection)
- Equipment: `https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=800&q=80` (AV equipment)

All images get: `object-cover`, `loading="lazy"` (except hero which is eager), dark gradient overlay from bottom (`bg-gradient-to-t from-black/90 via-black/50 to-transparent`).

---

## Trust Bar Redesign

**File:** `src/components/TrustBar.astro` (rewrite)

### Animated Counters
Numbers count up from 0 to final value when scrolling into view.

Use CSS `@property` for animatable counter:
```css
@property --counter {
  syntax: '<integer>';
  initial-value: 0;
  inherits: false;
}

.count-up {
  --counter: 0;
  counter-reset: num var(--counter);
  transition: --counter 2s ease-out;
}

.count-up.visible {
  --counter: 500; /* set per element via inline style */
}

.count-up::after {
  content: counter(num);
}
```

### Visual
- Larger numbers: `text-5xl font-bold` (up from text-3xl)
- Gradient divider lines between stats (sky to teal, 1px, faded at edges)
- Labels get a subtle uppercase tracking treatment

---

## Testimonials Redesign

**File:** `src/components/Testimonials.astro` (rewrite)

### Single Featured Layout
Instead of showing all 3 at once, show **one at a time** with a crossfade transition:
- Large decorative quotation mark (128px, `text-accent/10`) positioned top-left
- Quote text: `text-2xl font-light leading-relaxed` (larger, more editorial)
- Author: name in white, role with an **accent-coloured left bar** (4px height gradient line above the author name)
- Smooth crossfade between testimonials (CSS transition on opacity, 500ms)

Keep the existing prev/next navigation and dots, but enhance the dots to be small gradient bars (not circles).

---

## Typography Upgrades

**File:** `src/styles/global.css` + individual components

### Section Labels
Every "Our Services", "Testimonials", "Who We Work With" label gets a **coloured accent bar** above it:
```html
<div class="flex flex-col items-center gap-3">
  <div class="h-1 w-8 rounded-full bg-gradient-to-r from-sky-500 to-teal-500"></div>
  <p class="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Our Services</p>
</div>
```

### Hero headline size
Increase from current `text-4xl sm:text-5xl lg:text-6xl` to `text-5xl sm:text-6xl lg:text-7xl`.

---

## Animation Additions

**File:** `src/styles/global.css`

### 1. Animated gradient border (reusable)
```css
@property --border-angle {
  syntax: '<angle>';
  initial-value: 0deg;
  inherits: false;
}

@keyframes border-rotate {
  to { --border-angle: 360deg; }
}
```

### 2. Film grain overlay
```css
.film-grain { position: relative; }
.film-grain::after {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,..."); /* noise SVG */
  opacity: 0.4;
  pointer-events: none;
  mix-blend-mode: overlay;
}
```

### 3. Word rotation keyframes
```css
@keyframes word-rotate-in {
  0% { opacity: 0; transform: translateY(100%); }
  10%, 30% { opacity: 1; transform: translateY(0); }
  40% { opacity: 0; transform: translateY(-100%); }
  100% { opacity: 0; transform: translateY(-100%); }
}
```

### 4. Counter animation
Using `@property --counter` as described in Trust Bar section.

### 5. Glow pulse for primary CTA
```css
@keyframes glow-pulse {
  0%, 100% { box-shadow: 0 0 20px rgba(14,165,233,0.3); }
  50% { box-shadow: 0 0 40px rgba(14,165,233,0.5); }
}
```

### 6. 3D card tilt
```css
.bento-tilt {
  transition: transform 0.3s ease-out;
}
.bento-tilt:hover {
  transform: perspective(800px) rotateX(2deg) rotateY(-2deg) translateY(-4px);
}
```

### All wrapped in prefers-reduced-motion
```css
@media (prefers-reduced-motion: reduce) {
  .film-grain::after,
  .glow-pulse,
  .bento-card::before { animation: none !important; }
  .bento-tilt:hover { transform: translateY(-4px); } /* keep lift, remove tilt */
  [data-word-rotate] > span { opacity: 1 !important; transform: none !important; animation: none !important; }
}
```

---

## Files Changed Summary

| File | Change Type |
|------|------------|
| `src/styles/global.css` | Add animation keyframes, @property, film grain, gradient border, counter, glow-pulse, reduced motion |
| `src/components/Hero.astro` | Full rewrite: stock photo bg, gradient text, word rotation, glow CTA |
| `src/components/BentoServiceCard.astro` | New component: replaces ServiceCard for homepage bento grid |
| `src/pages/index.astro` | Replace services grid with bento layout, add accent bars to section labels |
| `src/components/TrustBar.astro` | Rewrite: animated counters, larger type, gradient dividers |
| `src/components/Testimonials.astro` | Rewrite: single featured testimonial, crossfade, decorative quote mark |
| `src/components/ServiceCard.astro` | Keep for service page internal use (not homepage) |

**Not changed:** BaseLayout, Header, Footer, ServiceLayout, service pages, About, Contact, data files.
