# iStream Website Redesign - Design Specification

## Overview

Redesign of istream.co.nz from a dated Wix template into a modern, professional Astro-powered website. The site serves as both a credibility builder and lead generation tool for iStream, a Hawkes Bay-based AV and live streaming company.

**Target customers:** Funeral homes, wedding venues/planners, schools, churches and community organisations.

**Services offered:** Live streaming, video recording, sound/PA setup, projector/screen hire, equipment hire.

**Goals:** Establish professional credibility AND generate inbound enquiries/quotes.

---

## Tech Stack

- **Framework:** Astro (static site generation, zero JS by default)
- **Styling:** Tailwind CSS v4
- **Icons:** Lucide (SVG, consistent stroke weight)
- **Fonts:** Inter via Google Fonts (weights 400, 500, 600, 700)
- **Animation:** CSS animations + Astro View Transitions (no JS framework needed)
- **Form handling:** Astro form actions or Formspree/Netlify Forms
- **Deployment:** Cloudflare Pages, Netlify, or Vercel (all have free tiers)

**No React/Vue/Svelte needed.** Astro's static HTML + CSS handles all interactions (mobile menu toggle, FAQ accordion, testimonial carousel) via native HTML/CSS or minimal inline scripts. The 21st.dev component patterns below are adapted from React into plain Astro components.

---

## Colour Palette

Dark theme with teal/sky-blue accent. Navy-black base (warmer than pure OLED black, more premium for a service business).

| Token | Hex | Tailwind | Usage |
|-------|-----|----------|-------|
| `background` | `#0B1121` | `bg-[#0B1121]` | Page background |
| `surface` | `#111827` | `bg-gray-900` | Cards, sections |
| `surface-elevated` | `#1F2937` | `bg-gray-800` | Hover states, elevated cards |
| `border` | `#1E3A5F` | `border-[#1E3A5F]` | Subtle borders |
| `text-primary` | `#F1F5F9` | `text-slate-100` | Headings |
| `text-secondary` | `#94A3B8` | `text-slate-400` | Body, descriptions |
| `accent` | `#0EA5E9` | `text-sky-500` | CTAs, links, highlights |
| `accent-hover` | `#38BDF8` | `text-sky-400` | Hover state |
| `accent-subtle` | `#0C4A6E` | `bg-sky-900` | Accent backgrounds, tags |
| `teal` | `#14B8A6` | `text-teal-500` | Secondary accent |
| `white` | `#FFFFFF` | `text-white` | High emphasis |
| `destructive` | `#EF4444` | `text-red-500` | Error states |

**Contrast ratios:** All text meets WCAG AA (4.5:1 minimum). `#F1F5F9` on `#0B1121` = 14.8:1. `#94A3B8` on `#0B1121` = 6.2:1. `#0EA5E9` on `#0B1121` = 5.8:1.

---

## Typography

**Font:** Inter (single family, Google Fonts)

| Role | Weight | Size | Letter Spacing | Line Height |
|------|--------|------|----------------|-------------|
| Display (hero) | 700 | 48-64px | -1.5% | 1.1 |
| H1 | 700 | 36-48px | -1% | 1.15 |
| H2 | 600 | 24-32px | -0.5% | 1.25 |
| H3 | 600 | 20px | normal | 1.3 |
| Body | 400 | 16-18px | normal | 1.6 |
| Small/Label | 500 | 14px | +1.2% uppercase | 1.4 |

**Tailwind config:**
```js
fontFamily: { sans: ['Inter', 'system-ui', 'sans-serif'] }
```

---

## Spacing System (8px grid)

| Token | Value | Usage |
|-------|-------|-------|
| `1` | 4px | Tight gaps |
| `2` | 8px | Icon-to-text, inline |
| `3` | 12px | Input padding |
| `4` | 16px | Card padding, list gaps |
| `6` | 24px | Section inner padding |
| `8` | 32px | Between content blocks |
| `12` | 48px | Between major sections |
| `16` | 64px | Page section separators |
| `24` | 96px | Hero padding top/bottom |

---

## Responsive Breakpoints

| Name | Width | Layout |
|------|-------|--------|
| Mobile | < 640px | Single column, hamburger menu |
| Tablet | 640-1024px | 2-column grids, condensed nav |
| Desktop | 1024-1440px | 3-column grids, full nav |
| Wide | > 1440px | Max-width 1280px container, centred |

---

## Site Structure

### Pages

1. **Homepage** (`/`)
2. **Live Streaming** (`/services/live-streaming`)
3. **Video Recording** (`/services/video-recording`)
4. **Sound & PA** (`/services/sound-pa`)
5. **Projector & Screen Hire** (`/services/projector-screen-hire`)
6. **Equipment Hire** (`/services/equipment-hire`)
7. **About** (`/about`)
8. **Contact / Get a Quote** (`/contact`)

### Global Components

**Header (inspired by 21st.dev Mini Navbar):**
- Fixed position, centered pill-shaped navbar
- `backdrop-blur-sm` frosted glass effect on dark background
- Logo left, nav links centre, "Get a Quote" CTA button right
- Mobile: hamburger toggle expands to vertical menu within the pill
- Animated nav link hover: text slides up to reveal brighter version (double-text technique from Mini Navbar)
- Transitions from `rounded-full` to `rounded-xl` when mobile menu opens

**Footer:**
- Dark surface background (`#111827`)
- Three columns: Services links, Company links, Contact info
- Social icons row (Facebook, Instagram, YouTube) using Lucide icons
- Copyright line

---

## Homepage Layout

### Hero Section

**Pattern:** Full-viewport height dark hero with gradient overlay.

**Inspired by:** 21st.dev "Hero with bg video" pattern - centered text with background media and overlay.

- Background: Dark gradient with subtle animated grid pattern (CSS-only, using `background-image` with linear gradients for grid lines, masked with `radial-gradient` to fade edges)
- Top: Eyebrow tag in pill shape: "Hawkes Bay's AV & Streaming Experts"
- Centre: Display headline (700, 48-64px): "Professional AV & Live Streaming for Your Most Important Moments"
- Below: Subtitle in `text-slate-400`: "From weddings to funerals, school events to church services - we make sure every moment is captured and shared professionally."
- Two CTAs:
  - Primary: "Get a Quote" - solid `bg-sky-500` rounded button with hover glow
  - Secondary: "Our Services" - ghost button with `border-sky-500/30` border
- Bottom radial accent: Large ellipse element creating a soft glow at the bottom of the hero

**Accessibility:** Hero heading is the page's `<h1>`. Both CTAs have clear focus rings.

### Services Grid

**Pattern:** 5 cards in responsive grid (3-col desktop, 2-col tablet, stacked mobile).

**Inspired by:** 21st.dev "Dark Grid" component - dark surface cards with icon, title, description, subtle gradient hover effects, and corner accent squares on hover.

Each card:
- Dark surface (`bg-gray-900/50`) with subtle border (`border-[#1E3A5F]`)
- Lucide icon in a bordered circle (`border-white/20 bg-white/5`)
- H3 title (Inter 600, 18px)
- 2-line description in `text-slate-400`
- Hover state: border brightens, subtle radial gradient glow follows cursor position, corner accent dots appear
- Links to the respective service page

**Cards:**
1. Live Streaming - `Video` icon
2. Video Recording - `Camera` icon
3. Sound & PA - `Speaker` icon
4. Projector & Screen Hire - `Monitor` icon
5. Equipment Hire - `Wrench` icon

### Who We Work With

Four columns (2x2 on mobile), each with:
- Small teal icon
- Audience name: "Funeral Homes", "Wedding Venues", "Schools", "Churches & Community"
- One-line description of how iStream helps

### Trust Bar

Horizontal strip with accent-coloured numbers:
- "X+ Events Streamed"
- "Serving Hawkes Bay Since [year]"
- "X+ Venues Trust Us"
- Numbers in `text-sky-500`, labels in `text-slate-400`
- Subtle dividers between items

### Testimonials

**Inspired by:** 21st.dev "Editorial Testimonial" - large index number, quote text, author with avatar, navigation dots/arrows.

- Large faded index number (e.g., "01") in `text-white/10`
- Quote text in `text-2xl font-light`
- Author name, role, and optional avatar with greyscale-to-colour hover
- Bottom navigation: line indicators + prev/next chevrons
- Placeholder structure ready for real testimonials
- CSS-only carousel using scroll-snap on mobile

### Bottom CTA

Full-width dark band with lighter surface:
- "Have an upcoming event? Let's make it seamless."
- "Get a Quote" button (accent colour)

---

## Service Page Template

All 5 service pages follow the same layout for consistency.

### Service Hero
- Page `<h1>` with service name
- One-line outcome-focused subtitle
- "Get a Quote for [Service]" CTA
- Accent gradient line below heading

### What We Offer
- 3-4 feature blocks in a grid
- Each: Lucide icon + H3 title + short paragraph
- E.g., Live Streaming page: "Multi-Camera Streaming", "Custom Branded Viewer Page", "On-Demand Replay", "Password-Protected Access"

### How It Works
- 3-step horizontal process with connecting line
- Step numbers in accent-coloured circles
- "Tell Us About Your Event" > "We Set Up Everything" > "Go Live"
- Reduces anxiety for first-time buyers

### Popular For
- Tags/badges: "Weddings", "Funerals", "Schools" etc.
- Accent-subtle background with white text
- Quick context without separate audience pages

### FAQ Section

**Inspired by:** 21st.dev "FAQ Monochrome" - rounded cards with plus/minus toggle, cursor-following glow on hover, smooth max-height transition.

- 3-5 collapsible questions per service
- Dark card with border, `backdrop-blur-xl`
- Plus icon rotates to X on open (CSS transform, 500ms)
- Cursor-following radial gradient glow on hover (CSS custom properties `--faq-x`, `--faq-y`)
- Content reveals with `max-height` transition (500ms ease-out)
- Each item slightly lifts on hover (`-translate-y-0.5`)

### Bottom CTA
Same full-width quote band as homepage.

---

## About Page

- Company story section: H1 "About iStream", narrative about Hawkes Bay roots, years of experience
- Mission/values block: commitment to professional, personalised, affordable service
- Team section: placeholder cards for 1-2 staff (photo, name, role, short bio)
- Equipment highlight: brief mention of PTZ HD cameras, professional-grade gear

---

## Contact / Get a Quote Page

**Inspired by:** 21st.dev "Contact Sections" (dark variant) - dark background with subtle gradient glow, form on elevated surface.

### Layout
Two-column on desktop, stacked on mobile.

**Left column (contact info):**
- H1: "Get a Quote"
- Subtext: "Tell us about your event and we'll be in touch within 24 hours."
- Direct contact: phone (022 380 6280), email (info@istream.co.nz)
- Address: Omahu Road, Hastings, Hawkes Bay
- Social links (Facebook, Instagram, YouTube)

**Right column (form):**
- Dark elevated surface card (`bg-gray-900`) with border
- Fields:
  - Full Name (text input)
  - Email (email input)
  - Phone (tel input)
  - Event Type (select: Wedding, Funeral, School Event, Church Service, Other)
  - Event Date (date input)
  - Venue/Location (text input)
  - Services Needed (checkboxes: Live Streaming, Video Recording, Sound & PA, Projector/Screen Hire, Equipment Hire)
  - Additional Details (textarea)
- Submit button: "Send Enquiry" in accent colour with loading state
- Success message: "Thanks! We'll be in touch within 24 hours."

**Form UX (per UI/UX Pro Max guidelines):**
- Visible labels above every field (not placeholder-only)
- Inline validation on blur
- Error messages below the relevant field in `text-red-500`
- Required fields marked with asterisk
- Input height >= 44px for touch targets
- `autocomplete` attributes on all fields

**Background:** Subtle gradient glow behind the form (like the 21st.dev contact section: `blur-[118px]` radial gradient in sky/purple tones).

---

## Motion & Animation

All animations use CSS only (no JS framework). Respect `prefers-reduced-motion`.

| Pattern | Duration | Easing | Implementation |
|---------|----------|--------|----------------|
| Page transitions | 250ms | ease-out | Astro View Transitions API (cross-fade) |
| Section fade-in on scroll | 400ms | ease-out | CSS `@keyframes` + `IntersectionObserver` (tiny inline script) |
| Card hover lift | 200ms | ease-out | `transition-transform hover:-translate-y-1` |
| Card border glow | 300ms | ease-in-out | `transition-colors` on border + box-shadow |
| Cursor-following glow | real-time | - | CSS custom properties set via `mousemove` (FAQ cards, service cards) |
| Nav link text slide | 400ms | ease-out | Double-text technique, `group-hover:-translate-y-1/2` |
| FAQ accordion | 500ms | ease-out | `transition-[max-height]` |
| Plus-to-X rotation | 500ms | ease | `transition-transform rotate-45` |
| Staggered grid reveal | 50ms delay per item | ease-out | CSS `animation-delay` with nth-child selectors |
| CTA button glow | 300ms | ease-in-out | `box-shadow` with accent colour on hover |
| Mobile menu expand | 300ms | ease-in-out | `transition-all max-h-0 to max-h-[1000px]` |

**Reduced motion:** All animations wrapped in `@media (prefers-reduced-motion: no-preference)`. When reduced motion is preferred, all transitions are instant (0ms duration).

---

## Accessibility

- WCAG AA contrast on all text (verified ratios above)
- Focus rings: 2px `outline-sky-500` with `outline-offset-2` on all interactive elements
- Skip-to-content link (visually hidden, revealed on focus)
- Semantic heading hierarchy: one `<h1>` per page, sequential `<h2>` > `<h3>`
- Alt text on all meaningful images
- Form labels with `for` attribute linked to inputs
- FAQ: `aria-expanded`, `aria-controls`, `role="region"` on panels
- Keyboard navigation: Tab through all interactive elements, Enter/Space to activate
- Nav: `aria-label="Main navigation"`, mobile toggle has `aria-label`
- Testimonial carousel: `aria-roledescription="carousel"`, `aria-label` on slides

---

## SEO

- Each page has unique `<title>` and `<meta description>`
- Structured data (LocalBusiness schema) on homepage
- Service pages target keywords: "live streaming Hawkes Bay", "video recording Hastings", "AV hire Hawkes Bay" etc.
- Clean URL structure: `/services/live-streaming`
- Sitemap generated by Astro
- Canonical URLs on all pages
- Open Graph and Twitter meta tags for social sharing

---

## Performance Budget

- **Largest Contentful Paint:** < 2.5s
- **Cumulative Layout Shift:** < 0.1
- **Total page weight:** < 500KB (excluding images)
- **Images:** WebP/AVIF format, responsive `srcset`, lazy loading below the fold
- **Fonts:** `font-display: swap`, preload Inter 400 and 700 weights only
- **Zero client-side JS framework** - only tiny inline scripts for menu toggle, FAQ accordion, cursor glow
