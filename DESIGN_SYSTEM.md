# KROMA Studio — Design System v1.0

This design system establishes a premium, minimalist, and highly structured visual language for **KROMA Studio**. It bridges digital color exploration with physical tactile craftsmanship.

The visual theme is defined by a soft cream/off-white background, formal serifs, generous layout breathing room, and deep, vibrant product-derived accent color profiles.

---

## 1. Color Palette Tokens

### 1.1 Core Theme Colors (Shades of Off-White & Charcoal)
The foundational surface colors are soft, warm off-whites (creams) designed to reduce eye strain and feel organic, like ceramic clay or fine woven paper.

| Token | Variable Name | HEX Code | Usage |
| :--- | :--- | :--- | :--- |
| **Cream Light** | `--color-cream-light` | `#FAF9F6` | Primary background, clean canvas layout |
| **Cream Base** | `--color-cream-base` | `#F5F3EF` | Secondary surfaces, section panels, container backdrops |
| **Cream Dark** | `--color-cream-dark` | `#EAE6DF` | Component borders, separators, subtle grid lines |
| **Ink Dark** | `--color-ink-dark` | `#181716` | Headings, body text, primary buttons, structural darks |
| **Ink Muted** | `--color-ink-muted` | `#6B6760` | Captions, metadata, secondary links, helper labels |

### 1.2 Accent & Product Palettes (Derived from Pinterest Reference Art)
Vibrant accents are isolated directly to the product objects and their metadata displays, ensuring the layout remains minimal while the artwork pops.

#### Palette 01: Liquid Glass Drops (Yellow-Green-Red Screenshot)
*A translucent, refracting glass gradient profile representing fluid droplets.*
* **Liquid Green** (`#10B981`): Leafy, emerald glass core accent.
* **Radiant Yellow** (`#F59E0B`): Sunny amber refraction highlight.
* **Lava Crimson** (`#EF4444`): High-intensity liquid red terminal droplet.

#### Palette 02: Magma & Obsidian (Magma Marble Screenshot)
*An intense glaze profile of flowing paint waves representing melting earthenware.*
* **Obsidian Black** (`#181716`): The dark, structured ceramic substrate base.
* **Fiery Crimson** (`#DC2626`): Swirling middle-layer reactive stream.
* **Reactive Amber** (`#EA580C`): High-temperature surface flow edge.

#### Palette 03: Cosmic Halftone Waves (Teal-Indigo Wave Screenshot)
*A high-contrast cybernetic profile representing modern digital-to-silk jacquard weave.*
* **Deep Indigo** (`#312E81`): Dark cosmic base textile backdrop.
* **Cyber Teal** (`#0891B2`): Glowing wave lines running across the weave.
* **Cosmic Pink** (`#DB2777`): Halftone dot highlights and wave edges.

---

## 2. Typography

We use two distinct font families to establish a clear hierarchy, combining classical editorial serifs with functional, modern sans-serifs.

### 2.1 Font Families
* **Serif Headings (Formal & Artistic)**: `Cormorant Garamond` (or `Playfair Display`)
  * *Purpose*: Main titles, collection headers, editorial callouts, luxury object titles.
  * *Style*: Classical, light weight, medium tracking.
* **Sans-Serif Body (Formal & Functional)**: `Inter` (or `system-ui`)
  * *Purpose*: Product specs, navigation links, forms, numeric pricing, long paragraphs.
  * *Style*: High legibility, light/medium weight, spacious letter spacing.

### 2.2 Typographic Hierarchy

```css
h1 {
  font-family: var(--font-serif);
  font-size: 5rem; /* 80px */
  font-weight: 300; /* Light */
  line-height: 1.05;
  letter-spacing: -0.03em;
}

h2 {
  font-family: var(--font-serif);
  font-size: 3rem; /* 48px */
  font-weight: 300;
  line-height: 1.1;
  letter-spacing: -0.02em;
}

h3 {
  font-family: var(--font-serif);
  font-size: 1.5rem; /* 24px */
  font-weight: 400;
  letter-spacing: -0.015em;
}

body {
  font-family: var(--font-sans);
  font-size: 0.875rem; /* 14px */
  font-weight: 300; /* Light */
  line-height: 1.625;
  letter-spacing: 0.01em;
}

.nav-links, .metadata {
  font-family: var(--font-sans);
  font-size: 0.625rem; /* 10px */
  font-weight: 700; /* Bold */
  letter-spacing: 0.25em; /* Tracked-out uppercase */
  text-transform: uppercase;
}
```

---

## 3. Spacing & Grid System

To maintain a clean and minimal UI, spacing must favor generous padding and white space.

### 3.1 Spacing Scale
We align our padding, margins, and gaps to an 8px spacing grid:
* **xs** (4px): Micro-gaps, tiny badges.
* **sm** (8px / 0.5rem): Card titles to metadata, details margins.
* **md** (16px / 1rem): Standard padding inside cards, select inputs.
* **lg** (24px / 1.5rem): Modal spacing, standard padding on desktop cards.
* **xl** (32px / 2rem): Container margins, gap offsets.
* **xxl** (64px / 4rem): Hero section padding, row gaps.
* **section** (96px / 6rem): Vertical spacing between content sections.

### 3.2 Containers & Borders
* **Max Width**: Containers should never exceed `1280px` (`max-w-7xl`).
* **Borders**: Divider lines and borders use `1px` thickness with a translucent base (`border-cream-dark/40`).
* **Border Radii**:
  * Product Cards & Modals: `12px` to `16px` (`rounded-xl` or `rounded-2xl`) for a soft, premium feel.
  * Inputs & Buttons: Fully rounded pills (`rounded-full`) or clean small steps (`rounded-lg`).

---

## 4. Components Specifications

### 4.1 Buttons
* **Primary (Call-to-action)**:
  * Style: Solid `Ink Dark` background, white text, fully rounded pill.
  * Interaction: Underlined-hover or invert on hover (bg-transparent, text-ink-dark, border-ink-dark).
* **Secondary**:
  * Style: Transparent background, `1px` border of `Ink Dark`, `Ink Dark` text, rounded pill.
  * Interaction: Background shifts to `Ink Dark`, text shifts to `Cream Light`.

### 4.2 Form Fields
* **Input Elements**:
  * Style: Rounded corners (`rounded-lg`), translucent base background (`bg-cream-base/40`), thin border (`border-cream-dark`).
  * Focus State: Border transitions to `Ink Dark` (`focus:border-ink-dark`), outline is hidden.

---

## 5. Interaction & Motion Rules

Polished, micro-animations are critical to elevating the premium aesthetic of the site.

### 5.1 Hover Effects
* **Product Cards**: On hover, scale the image up by 3% (`scale-[1.03]`), transition grayscale filter to full color, and shift action arrows by 4px (`translate-x-1.5`). Use a long transition ease-out (`duration-700 ease-out`).
* **Badges**: Ambient glow pulses using `animate-pulse` on active elements.

### 5.2 Page Transitions (Framer Motion Standard Presets)
* **Backdrop Fade**:
  * `initial={{ opacity: 0 }}`
  * `animate={{ opacity: 1 }}`
  * `exit={{ opacity: 0 }}`
* **Drawer / Sidebar Slide-in**:
  * `initial={{ x: "100%" }}`
  * `animate={{ x: 0 }}`
  * `exit={{ x: "100%" }}`
  * Transition: `type: "spring", duration: 0.5, bounce: 0.02`
* **Modal Overlay Entry**:
  * `initial={{ opacity: 0, scale: 0.95, y: 20 }}`
  * `animate={{ opacity: 1, scale: 1, y: 0 }}`
  * Transition: `type: "spring", duration: 0.6, bounce: 0.1`
