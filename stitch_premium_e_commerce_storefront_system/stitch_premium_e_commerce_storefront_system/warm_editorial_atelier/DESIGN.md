---
name: Warm Editorial Atelier
colors:
  surface: '#faf9f6'
  surface-dim: '#dbdad7'
  surface-bright: '#faf9f6'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f4f3f1'
  surface-container: '#efeeeb'
  surface-container-high: '#e9e8e5'
  surface-container-highest: '#e3e2e0'
  on-surface: '#1a1c1a'
  on-surface-variant: '#444748'
  inverse-surface: '#2f312f'
  inverse-on-surface: '#f2f1ee'
  outline: '#747878'
  outline-variant: '#c4c7c7'
  surface-tint: '#5f5e5e'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#1c1b1b'
  on-primary-container: '#858383'
  inverse-primary: '#c8c6c5'
  secondary: '#9b4420'
  on-secondary: '#ffffff'
  secondary-container: '#fe9166'
  on-secondary-container: '#752905'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#1b1c1a'
  on-tertiary-container: '#848481'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e5e2e1'
  primary-fixed-dim: '#c8c6c5'
  on-primary-fixed: '#1c1b1b'
  on-primary-fixed-variant: '#474646'
  secondary-fixed: '#ffdbce'
  secondary-fixed-dim: '#ffb59a'
  on-secondary-fixed: '#380d00'
  on-secondary-fixed-variant: '#7c2e0a'
  tertiary-fixed: '#e3e2df'
  tertiary-fixed-dim: '#c7c7c3'
  on-tertiary-fixed: '#1b1c1a'
  on-tertiary-fixed-variant: '#464744'
  background: '#faf9f6'
  on-background: '#1a1c1a'
  surface-variant: '#e3e2e0'
typography:
  display-hero:
    fontFamily: Playfair Display
    fontSize: 56px
    fontWeight: '400'
    lineHeight: 64px
    letterSpacing: -0.02em
  display-hero-mobile:
    fontFamily: Playfair Display
    fontSize: 36px
    fontWeight: '400'
    lineHeight: 44px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Playfair Display
    fontSize: 40px
    fontWeight: '400'
    lineHeight: 48px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 28px
    fontWeight: '400'
    lineHeight: 36px
    letterSpacing: 0em
  headline-md:
    fontFamily: Playfair Display
    fontSize: 28px
    fontWeight: '400'
    lineHeight: 36px
    letterSpacing: 0em
  headline-sm:
    fontFamily: Playfair Display
    fontSize: 22px
    fontWeight: '500'
    lineHeight: 30px
    letterSpacing: 0em
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
    letterSpacing: -0.005em
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: 0em
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-caps:
    fontFamily: Plus Jakarta Sans
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.08em
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.02em
spacing:
  gutter: 1.5rem
  gutter-mobile: 0.75rem
  margin: 3rem
  margin-mobile: 1.25rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system embodies an editorial, high-end direct-to-consumer philosophy rooted in architectural discipline, quiet luxury, and deliberate restraint. Built for discerning lifestyle and contemporary fashion storefronts, the interface shifts focus directly onto curated photography and tactile merchandise. It balances the timeless poise of printed periodicals with the exacting precision of modern commerce.

The visual atmosphere is defined by:
- **Warm Architectural Minimalism:** Built upon an expansive canvas of pale ecru, bone, and warm linen tones rather than stark clinical whites, creating an inviting, tactile environment.
- **Structural Tension:** Deliberate balance between high-contrast editorial serif display typography and functional, modern sans-serif grotesques.
- **Quiet Distinction:** High-contrast obsidian blocks and muted terracotta accents are deployed with disciplined restraint, drawing purposeful attention to conversion touchpoints, seasonal narratives, and curated actions without visual clamor.

## Colors

The palette establishes an organic, luminous foundation anchored by precise charcoal values and elevated through an understated warm earth accent.

### Color Architecture
- **Primary (`#111111`):** Deep obsidian charcoal used for dominant typography, structural framework, refined hairline rules, primary CTA buttons, and high-impact grounding zones such as global footers or announcement banners.
- **Secondary (`#B85A34`):** Warm terracotta bronze. Reserved exclusively for subtle urgency cues, curation badges, promotional tags, editorial accents, and select interactive focus states. Never overused as solid background washes.
- **Tertiary (`#F5F4F0`):** Soft parchment stone. Serves as secondary containment for product card backings, floating panels, inset lists, and neutral surface fills.
- **Neutral (`#FAF9F6`):** Warm ecru canvas providing the warm white ambient background across 85–90% of the customer journey, preventing cold optical fatigue.
- **Structural Hairline (`#E5E5E0`):** A barely-there warm stone gray applied to all layout dividers, table borders, and component outlines to maintain structure without visual clutter.

## Typography

The typographic hierarchy establishes clear tension between editorial refinement and utility. 

- **Display & Headings:** Set in *Playfair Display*. Headings emphasize literary heritage, runway editorial layouts, and storytelling. Headlines must be kept at natural sentence case or title case; never set display serif in all-caps.
- **Body & Numerical Commerce Data:** Set in *Plus Jakarta Sans*. Delivers crisp geometric legibility across dense specification sheets, product descriptions, cart drawers, and tabular checkout reviews.
- **Labels, Badges & Micro-Copy:** Styled with *Plus Jakarta Sans* in uppercase (`label-caps`) with deliberate tracking (`0.08em`) to demarcate categories, breadcrumbs, materials, and stock indicators without adding weight.

## Layout & Spacing

The layout utilizes a structured 12-column fluid grid system on desktop that gracefully collapses to a 6-column grid on tablet and a 2-column or 4-column layout on mobile.

### Grid & Margins
- **Desktop (>= 1024px):** 12 columns with `1.5rem` gutters and dynamic outer margins scaling from `3rem` to a maximum containment wrapper of `1440px`.
- **Tablet (768px – 1023px):** 6 columns with `1rem` gutters and `2rem` side margins.
- **Mobile (< 768px):** 2 or 4 columns with `0.75rem` gutters and `1.25rem` outer canvas padding to maximize tap surface and imagery presentation.

### Spacing Rhythm
- Section spacing favors deliberate room to breathe, utilizing multiples of `space-xl` (`2.5rem`, `5rem`, `7.5rem`) between editorial chapters and lookbooks.
- Component-level spacing relies on strict pairing: `space-xs` (4px) for inline text/icon offsets, `space-sm` (8px) for badge internals, `space-md` (16px) for form inputs, and `space-lg` (24px) for card interiors and stacked field groups.

## Elevation & Depth

This design system avoids synthetic drop shadows, skeuomorphism, and heavy multi-tiered elevations. Visual hierarchy is achieved exclusively through tonal layering, crisp borders, and subtle ambient diffusion.

### Depth Paradigms
- **Flat Architectural Planar Layering:** Surfaces lie on base `#FAF9F6`, while nested product showcases and content insets step down to `#F5F4F0` or step up to pure `#FFFFFF`.
- **Low-Contrast Outlines:** Visual separation is driven by crisp `1px` hairlines colored `#E5E5E0`. Borders are prioritized over elevated box shadows to preserve a clean, printed-paper feel.
- **Ambient Overlays & Drawers:** High-elevation components—such as floating cart drawers, search flyouts, and sticky filter sheets—use an ultra-subtle ambient shadow tinted with warm umber (`rgba(17, 17, 17, 0.06)` blur `24px`, offset `0 8px`) paired with a semi-opaque `#111111` backdrop scrim at `20%` opacity to softly recess inactive layers.

## Shapes

The design system uses a strict **Sharp (`0`)** shape language. All corners—buttons, card frames, input controls, flyout sheets, and media containers—are finished with `0px` radius.

This pure geometric right-angle discipline reinforces an architectural, high-fashion attitude reminiscent of broadsheet layouts, museum catalogs, and avant-garde luxury storefronts. Rounded corners are strictly avoided, with the sole exception of organic iconography or circular swatch dots representing physical color variants.

## Components

### Buttons
- **Primary:** Solid `#111111` fill with crisp white text, `0px` border radius, uppercase typography using `label-caps`, and an edge-to-edge height of `48px` (desktop) or `52px` (mobile). Hover state transitions to `#2A2A2A` with immediate 150ms ease.
- **Secondary / Ghost:** Transparent background with a `1px` solid `#111111` outline and obsidian text. Hover fills to `#111111` with inverted white text.
- **Tertiary / Inline:** Understated text link featuring an animated hairline underline (`1px` offset) that expands on hover.

### Product Cards
- Contained within sharp `#E5E5E0` borders or floating seamlessly on `#FAF9F6` with product imagery backed by `#F5F4F0`.
- Image aspect ratio locked to `3:4` portrait editorial standard.
- Hover reveals an alternative model/detail angle alongside a discreet, quick-action slide-up trigger ("Quick Add" / "Select Size").
- Metadata stack: Brand/Category in `label-caps`, Title in `body-md` (regular), and Price in `label-md`. Sale items display the revised price in terracotta bronze (`#B85A34`) alongside a struck-through original price in `#8C8B85`.

### Chips & Filter Tags
- Rectangular zero-radius boxes with `1px` solid `#E5E5E0` borders, rendered in `label-sm`.
- Active state transitions border and fill to `#111111` with pure white text.
- Clear counters show item numbers in bracketed notation: `Linen [14]`.

### Badges & Micro-Tags
- Minimalist typographic labels placed in top-left corners of product cards or hero compositions.
- Limited to two variants: 
  - *Editorial*: Neutral black border with obsidian text for core drops (`NEW ARRIVAL`, `CORE COLLECTION`).
  - *Accent*: Warm terracotta (`#B85A34`) text over an unobtrusive tint for rare highlights (`LIMITED EDITION`, `LOW STOCK`).

### Form Inputs & Checkboxes
- **Text Inputs:** Clean bottom-line or full hairline rectangular borders in `#E5E5E0`, shifting to `#111111` on focus without glow rings. Floating or uppercase fixed labels in `label-caps`.
- **Checkboxes & Radios:** Sharp square boxes (`16px x 16px`) with `1px` borders. Checked status renders an internal solid black square inset by 2px, eliminating decorative rounded checks.

### Drawers & Slide-Over Panels (Cart & Navigation)
- Edge-docked full-height panels with flat white surfaces bounded by a left `1px` hairline in `#E5E5E0`.
- Integrated progress indicators (e.g., complimentary shipping thresholds) feature clean 2px flat progress bars utilizing `#B85A34`.

### Countdown Timers & Promotional Highlights
- Monospaced numeric alignment paired with `label-caps` for temporal markers (DAYS, HRS, MINS).
- Housed within minimal linear banners bounded by horizontal top and bottom hairline borders, avoiding loud neon treatment.