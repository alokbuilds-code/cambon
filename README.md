# CHANEL — DIGITAL CONCEPT
### A Cinematic Parisian Haute Couture Web Experience

> **UNOFFICIAL DIGITAL CONCEPT & DESIGN EXHIBITION**  
> *This project is an unofficial creative concept and design demonstration celebrating Parisian fashion heritage, restraint, and graphic power. It is not affiliated with, endorsed by, or an official property of CHANEL.*

[![Vanilla JS](https://img.shields.io/badge/Vanilla-JavaScript-f7df1e?logo=javascript&logoColor=black)](#)
[![GSAP 3](https://img.shields.io/badge/GSAP-ScrollTrigger-88ce02)](#)
[![Three.js](https://img.shields.io/badge/Three.js-WebGL-black?logo=three.js)](#)
[![Web Audio API](https://img.shields.io/badge/Web%20Audio-Synthesizer-ad9b72)](#)
[![Zero Frameworks](https://img.shields.io/badge/Frameworks-None-white)](#)

https://cambon.vercel.app/

## Overview

**Cambon** is a production-grade, cinematic luxury fashion digital exhibition inspired by the visual language, restraint, typography, craftsmanship, and Parisian identity associated with CHANEL.

Built without React, Vue, Next.js, Tailwind, or Bootstrap, the experience is driven entirely by **semantic HTML5, modern CSS3, and modular Vanilla JavaScript**, paired with **GSAP ScrollTrigger**, **Three.js**, and the **Web Audio API**.

The central visual philosophy:
$$\text{BLACK} + \text{WHITE} + \text{SPACE} + \text{TYPOGRAPHY} + \text{PHOTOGRAPHY} + \text{MOVEMENT}$$

---

## Visual Highlights & Key Features

### 1. 5-Second Title Opening Sequence
A cinematic title sequence modeled after luxury fashion film openings:
* **Stage 1 (0.0–0.7s):** Pure black screen with subtle tactile film grain overlay and complete silence.
* **Stage 2 (0.7–2.0s):** Massive centered `CHANEL` enters through blurred letter-spacing expansion (`0.15em → 0.22em`), subtle scale settling, and vertical displacement.
* **Stage 3 (2.0–2.8s):** Letters stretch apart (`0.38em`), the background breathing glow expands with radial luminescence, and a gigantic ghost layer of `PARIS` emerges in deep space.
* **Stage 4 (2.8–3.8s):** High-contrast editorial fragments cut in through diagonal geometry, pushing typography into depth.
* **Stage 5 (3.8–5.5s):** Screen splits across vertical and horizontal planes as the Autumn/Winter campaign hero un-zooms (`1.08 → 1.00`), revealing minimal navigation and micro-labels.

### 2. Multi-Layer Typographic Depth & 12-Column Editorial Grids
* **Layered Typography:** Ghost typography (`PARIS`, `CAMBON`, `COUTURE`) sits in the deepest z-index and moves with differential parallax (`0.2x` scroll speed).
* **Asymmetric 12-Column Grid:** Non-repeating magazine spread compositions with overlapping image frames and micro-tags.

### 3. Continuous Moving Cinematic Image Strip
* An infinite smooth marquee showcasing archival *Métiers d'Art* atelier moments (Lesage hand embroidery, precision pattern cutting, silk draping, and high jewelry pearl knotting).
* Pauses smoothly on hover for detailed examination.

### 4. Scroll-Based Physical Composition Transformation
* A pinned viewport sequence where scrolling physically morphs the composition from an intimate framed piece (`48vw / 60vh`) to a sweeping fullscreen vista (`94vw / 90vh`) with un-zooming camera work.

### 5. Fullscreen Pure Typography Moment
* Complete removal of cards, buttons, borders, and UI. Pure obsidian black screen featuring only colossal serif display typography for extreme scale contrast.

### 6. The Silence Section — "Le Silence de Rue Cambon"
* An intentional shift from deep black into **warm French architectural cream** (`#ebe7de`).
* Generous negative space, delicate micro-labels, and a serene photograph of Mademoiselle's mirrored art deco staircase to create emotional breathing room.

### 7. Dual-Image Hover Crossfades with 3D Perspective Tilt
* Product cards crossfade from primary silhouette to secondary profile on hover.
* Exhibition frames calculate cursor offsets in realtime, imparting subtle **3D perspective tilt** (`rotateY / rotateX`).

### 8. Pinned Horizontal Footwear Runway
* Sticky viewport pinned with GSAP ScrollTrigger gliding footwear concepts across parallax background typography (`PARIS COUTURE`).

### 9. Interactive Three.js Art Object (*L'Harmonie Géométrique*)
* Abstract luxury sculpture created with interlocking obsidian black lacquer and brushed pale gold ribbons in slow continuous rotation.
* Governed by an `IntersectionObserver` to ensure zero GPU waste when out of view, maintaining a fluid 60fps.

### 10. Web Audio API Ambient Synthesizer
* Pure synthesized warm harmonic sine drone (110Hz / 164.8Hz / 220Hz) running through an analog-modeled lowpass filter.
* Strictly user-triggered via the `SOUND OFF / SOUND ON` footer control.

### 11. Functional Shopping Bag Drawer & Search
* Slide-in cart drawer with item rows, size specifications, quantity steppers, item removal, live demo subtotal calculation, empty state, and localStorage persistence.
* Fullscreen debounced live search querying names, categories, and descriptions.

### 12. Zero Broken Assets Guarantee
* Every image includes an automated inline SVG fallback generator that renders a styled monochrome placeholder if any external image fails to load.

---

## Technology Stack

* **Markup:** HTML5 (Semantic, ARIA-accessible)
* **Styling:** CSS3 (Custom properties, 12-column Grid, Clamps, SVG Noise Filter)
* **Scripting:** Modular Vanilla JavaScript (ES6+, zero bundler required)
* **Animation & Motion:** [GSAP 3](https://greensock.com/gsap/) & [ScrollTrigger](https://greensock.com/scrolltrigger/) via CDN
* **3D Visuals:** [Three.js r128](https://threejs.org/) via CDN
* **Audio:** Native Web Audio API (Sine oscillator synthesis)
* **Typography:** Bodoni Moda, Cormorant Garamond, Inter

---

## File Architecture

```text
cambon/
├── index.html                  # Flagship Cinematic Exhibition
├── shop.html                   # Filterable Collections & Discipline Catalog
├── product.html                # Gallery & Exhibition Product View
├── collection.html             # Haute Couture Lookbook Chapters
├── about.html                  # 31 Rue Cambon Heritage & Manifesto
├── README.md                   # Project Documentation
│
├── css/
│   ├── reset.css               # Luxury Baseline Reset & Normalization
│   ├── variables.css           # Design Tokens, Clamps & 60-Requirement Palette
│   ├── global.css              # Typography, Tactile Film Grain & Page Curtains
│   ├── navigation.css          # Minimal Header, Fullscreen Menu, Cart Drawer & Search
│   ├── hero.css                # 4-Stage Cinematic Intro & Parallax Campaign Hero
│   ├── products.css            # Editorial Spreads, Triptychs, Horizontal Runway
│   ├── collection.css          # Lookbook Bleed Spreads & Asymmetric Chapters
│   ├── product-page.css        # Sticky Gallery, Size Selectors & Atelier Accordions
│   ├── footer.css              # Film Closing Frame, Web Audio Synth & Massive PARIS
│   └── responsive.css          # Mobile Art Direction & Prefers-Reduced-Motion
│
├── js/
│   ├── utilities.js            # Safe Image Fallback Generators, Storage & Debounce
│   ├── products.js             # 16+ Curated Concept Products Dataset
│   ├── cursor.js               # Precision Luxury Magnetic & Contextual Cursor
│   ├── navigation.js           # Scroll States & Fullscreen Menu with Live Image Previews
│   ├── cart.js                 # Slide-in Shopping Bag, LocalStorage & Demo Checkout
│   ├── search.js               # Fullscreen Debounced Live Search Modal
│   ├── filters.js              # Realtime Category Discipline Filter System
│   ├── animations.js           # 4-Stage Opening Timeline, ScrollTrigger Runway & Curtains
│   ├── three-scene.js          # Three.js Obsidian Lacquer & Gold Abstract Sculpture
│   └── app.js                  # Master Orchestrator & Web Audio Ambient Sound Engine
│
└── assets/
    └── README.md               # Asset Documentation & Creative Direction Notes
```

---




## Design System Tokens

```css
:root {
    --black: #080808;
    --soft-black: #111111;
    --deep-obsidian: #040404;
    --white: #ffffff;
    --warm-white: #f7f5f0;
    --cream: #ebe7de;
    --soft-beige: #d8d0c3;
    --beige: #c8c0b3;
    --charcoal: #222222;
    --grey: #827e77;
    --gold-muted: #ad9b72;
    --line-dark: rgba(255, 255, 255, 0.12);
    --line-light: rgba(0, 0, 0, 0.12);
}
```

---

## Concept Disclaimer

This website is an unofficial creative concept and design demonstration created for educational and design portfolio purposes. It does not impersonate the official CHANEL website, does not process commercial transactions, and does not represent official CHANEL products or prices. All brand trademarks remain the property of their respective owners.
