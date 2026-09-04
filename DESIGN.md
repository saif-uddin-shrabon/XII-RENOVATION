---
name: XIII Renovation & Design
description: Dark charcoal atelier — photography carries luxury; champagne gilt is rare hardware.
colors:
  champagne-gilt: "#cfa862"
  gilt-light: "#e6c587"
  gilt-dark: "#a88344"
  gilt-bronze: "#8c6a38"
  lamp-black: "#0b0c0e"
  graphite: "#121418"
  millwork: "#191c22"
  text-primary: "#f5f6f8"
  text-secondary: "#a0a6b2"
  text-muted: "#8b929e"
  border-gilt: "rgba(207, 168, 98, 0.15)"
  border-muted: "rgba(255, 255, 255, 0.05)"
  glass: "rgba(11, 12, 14, 0.75)"
  glass-border: "rgba(207, 168, 98, 0.1)"
typography:
  display:
    fontFamily: "Playfair Display, Georgia, serif"
    fontSize: "clamp(2.5rem, 5vw, 4.5rem)"
    fontWeight: 400
    lineHeight: 1.15
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Playfair Display, Georgia, serif"
    fontSize: "clamp(2rem, 3.5vw, 3rem)"
    fontWeight: 500
    lineHeight: 1.15
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Playfair Display, Georgia, serif"
    fontSize: "1.5rem"
    fontWeight: 500
    lineHeight: 1.25
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Outfit, sans-serif"
    fontSize: "1.05rem"
    fontWeight: 400
    lineHeight: 1.7
    letterSpacing: "normal"
  label:
    fontFamily: "Outfit, sans-serif"
    fontSize: "0.85rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "0.15em"
rounded:
  control: "2px"
  surface: "4px"
spacing:
  sm: "0.75rem"
  md: "1.5rem"
  lg: "2rem"
  xl: "2.5rem"
  2xl: "5rem"
  section: "8rem"
components:
  button-primary:
    backgroundColor: "{colors.champagne-gilt}"
    textColor: "{colors.lamp-black}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "1rem 2rem"
  button-primary-hover:
    backgroundColor: "{colors.gilt-light}"
    textColor: "{colors.lamp-black}"
    rounded: "{rounded.control}"
    padding: "1rem 2rem"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.text-primary}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "1rem 2rem"
  button-secondary-hover:
    backgroundColor: "rgba(255, 255, 255, 0.05)"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.control}"
    padding: "1rem 2rem"
  button-nav:
    backgroundColor: "transparent"
    textColor: "{colors.champagne-gilt}"
    rounded: "{rounded.control}"
    padding: "0.6rem 1.25rem"
  button-nav-hover:
    backgroundColor: "{colors.champagne-gilt}"
    textColor: "{colors.lamp-black}"
    rounded: "{rounded.control}"
    padding: "0.6rem 1.25rem"
  input:
    backgroundColor: "{colors.lamp-black}"
    textColor: "{colors.text-primary}"
    typography: "{typography.body}"
    rounded: "{rounded.control}"
    padding: "1rem"
  card-service:
    backgroundColor: "{colors.millwork}"
    textColor: "{colors.text-secondary}"
    rounded: "{rounded.surface}"
    padding: "3rem 2.5rem"
  nav:
    backgroundColor: "{colors.glass}"
    textColor: "{colors.text-secondary}"
    padding: "0.8rem 2rem"
---

# Design System: XIII Renovation & Design

## Overview

**Creative North Star: "The Night Atelier"**

The Night Atelier is a dark workshop-showroom. Finished joinery and completed rooms emerge from charcoal, lit like a private viewing. Champagne-gilt metal is rare. Real interior photography carries the luxury; the UI stays quiet, refined, and restrained.

Surfaces are tonal rooms — lamp-black, graphite, millwork — not lifted cards. Depth comes from a change of plane and a glass navbar when scrolled. Corners stay near-sharp. Controls feel like hardware on dark millwork, not like software chrome.

The pairing is Playfair Display for the viewing-room voice and Outfit for wayfinding and body. Gilt appears as a latch: a primary button, a caption category, a short solid phrase in a headline. Confirmed visual rejections: yellow gold, Material raised-card shadows, gilt glow washes, section kickers, decorative numbering, and UI that competes with the photographs.

**Key Characteristics:**

- Lamp-black ground with graphite and millwork as alternating rooms
- Champagne gilt used like hardware, never as a wash
- Playfair Display headlines; Outfit for UI and body
- Near-sharp corners: 2px on controls, 4px on surfaces
- Photography as the luxury surface; motion limited to one quiet hero entrance

## Colors

A charcoal atelier: three dark planes, one pale-metal family, and cool stone type. Gilt is the only accent.

### Primary

- **Champagne gilt** (#cfa862): Primary actions, nav outline CTA, wordmark subline, category labels, hairline gold, hover glints. Pale metal, not yellow gold.
- **Gilt light** (#e6c587): Hover fill on primary actions, highlight lines, and the bright stop of the display-span gradient.
- **Gilt dark** (#a88344): The low stop of the gilt gradient; deeper metal, not a room fill.
- **Bronze** (#8c6a38): The gilt family’s floor. Held in reserve with the gradient; never a large surface.

### Neutral

- **Lamp-black** (#0b0c0e): Page ground, form fields, overlay terminus. The viewing-room dark.
- **Graphite** (#121418): Alternate section plane (the “light” section is still dark), form panel, modal body.
- **Millwork** (#191c22): Service cards, image wells, scrollbar thumb.
- **Primary text** (#f5f6f8): Headlines, values, inverse-on-gilt is lamp-black instead.
- **Secondary text** (#a0a6b2): Body copy, nav links at rest, supporting lines.
- **Muted text** (#8b929e): Meta, legal, location, labels that must recede.
- **Gilt hairline** (rgba(207, 168, 98, 0.15)): Quiet gold border token.
- **Muted hairline** (rgba(255, 255, 255, 0.05)): Dividers, card edges, form strokes at rest.
- **Glass** (rgba(11, 12, 14, 0.75)): Scrolled navbar and mobile drawer.
- **Glass border** (rgba(207, 168, 98, 0.1)): Hairline on glass.

### Named Rules

**The Champagne Hardware Rule.** Champagne gilt is metal hardware: a latch, a caption, a primary action. It is never a fill for rooms or large surfaces.

**The Photography Carries Luxury Rule.** Completed-work photographs hold the luxury. UI color stays out of the way.

## Typography

**Display Font:** Playfair Display (with Georgia)
**Body Font:** Outfit (with sans-serif)

**Character:** A high-contrast pairing. Playfair is the editorial serif of the viewing room; Outfit is the quiet sans of wayfinding and body. Headlines sit slightly tight (−0.02em). Labels are widely tracked and uppercase.

### Hierarchy

- **Display** (400, clamp(2.5rem, 5vw, 4.5rem), 1.15): Hero headline only. A short phrase may sit in champagne gilt; the rest stays paper-white.
- **Headline** (500, clamp(2rem, 3.5vw, 3rem), 1.15): Section titles.
- **Title** (500, 1.5rem, 1.25): Service names, form titles, mosaic and reel titles. Review quotes also speak in Playfair at ~1.05–1.25rem, weight 400.
- **Body** (400, 1.05rem, 1.7): Supporting copy in secondary text. Hero and mosaic support lines may drop to weight 300 and line-height ~1.75–1.8.
- **Label** (600, 0.85rem, 0.15em, uppercase): Buttons, nav links (0.85rem / 0.15em), form labels (0.75rem / 0.1em). Category ticks on photography use ~0.65–0.7rem / 0.18–0.22em in gilt.

### Named Rules

**The Two-Voice Rule.** Playfair Display speaks for titles, stats, and quoted review lines. Outfit speaks for everything else. Do not introduce a third family.

## Layout

A single marketing column. Content hangs from a **1200px** centered container (navbar, sections, footer). Photography mosaics and review inners may open to **1280px**. Horizontal gutter is **2rem** (1.5rem below 768px).

Section rooms use **8rem** vertical padding (5rem below 768px). Centered section headers max out around **700px**, with **5rem** space before the body (3.5rem on small screens). Editorial two-column grids (about, contact) run ~1.1 / 0.9 with a **5rem** column gap and stack at **1024px**. Card grids are auto-fit: services `minmax(350px, 1fr)` and differentiators `minmax(260px, 1fr)`, both at a **2rem** gap.

Photography mosaics use a tight **12px** gutter, not the 2rem card gap — pictures sit closer than copy cards. Gallery is a 12-column grid with 4/8 spans and 4:5 / 16:10 frames; below 640px every cell is full-width with captions always visible (no hover dependency). Reels are a horizontal snap strip, 9:16 frames, width `min(280px, 72vw)`.

Breakpoints that actually change structure: **1024px** (split grids, gallery spans), **900px** (nav drawer, mosaic stack), **768px** (hero CTAs stack, form densify, footer single column), **640px** (gallery full-bleed cells, review cards), **480px height landscape** (hero becomes auto-height). Safe-area insets apply to the fixed header, footer, and horizontal reel strip. Hash links use `scroll-padding-top` so sections clear the fixed bar.

## Elevation & Depth

This is not a Material raised-card system. Depth is tonal rooms first; gilt glow and glass are rare hardware.

At rest, surfaces are flat planes of lamp-black, graphite, or millwork, separated by muted hairlines. Photography wells are millwork with overflow clipped — no card shadow. Hero and gallery captions use lamp-black gradient overlays (vignettes), not drop shadows.

### Shadow Vocabulary

- **Glass nav** (`box-shadow: 0 4px 30px rgba(0, 0, 0, 0.5)`): Only after scroll, with `backdrop-filter: blur(16px)` and the glass fill.
- **Input / control focus:** Border shifts to champagne gilt with a 1px outline offset — no colored halo bloom.

### Named Rules

**The Tonal Room Rule.** Depth is a change of plane (lamp-black / graphite / millwork), not a drop shadow under a card. Glass is rare hardware on the scrolled nav only.

## Shapes

Near-sharp millwork. Primary controls (buttons, text fields) use **2px** corners. Surfaces (service cards, differentiator cards, form panel, logo mark) use **4px**. Photography tiles, mosaic frames, gallery cells, and reel frames are sharp rectangles — overflow hidden, no radius.

Borders are 1px hairlines: muted white at rest, champagne gilt on hover or focus. The gilt display span is a 135° metal gradient clipped to text, not a pill or badge.

Full circles appear only on social icon wells (44px) and the reel play control (2.5rem). That roundness is for icon hardware, not for buttons or cards.

## Components

Refined and restrained. Controls read as pale metal on dark millwork.

### Buttons

- **Shape:** Near-sharp (2px). Uppercase Outfit, 0.85rem, weight 600, 0.15em tracking. Padding 1rem 2rem.
- **Primary:** Champagne gilt fill, lamp-black type, matching gilt border. Flat at rest. Hover: gilt light fill — no lift, no glow.
- **Secondary / Ghost:** Transparent fill, paper-white type, `1px solid rgba(255, 255, 255, 0.2)`. Hover: `rgba(255, 255, 255, 0.05)` wash and a paper-white border; no lift.
- **Nav outline:** Transparent, gilt type and border, tighter padding (0.6rem 1.25rem) and 0.75rem type. Hover: gilt fill, lamp-black type — no halo.
- **Focus:** Gilt 1px outline, 4px offset — the same language as mosaic and gallery tiles.

### Cards / Containers

- **Corner Style:** 4px on copy cards; 0 on photography tiles.
- **Background:** Millwork for services; graphite for differentiators (millwork on hover) and the form panel; lamp-black for review cards.
- **Shadow Strategy:** Flat at rest and on hover. Differentiator cards may change plane (graphite → millwork) and quiet the border; they do not lift or glow.
- **Border:** Muted hairline; hover may take the gilt hairline token, not a bright fill.
- **Internal Padding:** Services ~2.5rem 2rem; differentiators 2.5rem; review bodies ~2rem 1.75rem.

### Inputs / Fields

- **Style:** Lamp-black well on a graphite panel. 1px muted hairline, 2px corners, 1rem padding, 0.9rem Outfit.
- **Focus:** Border to champagne gilt. Outline none on the native ring; the border plus focus-visible outline is the focus.
- **Labels:** 0.75rem uppercase, 0.1em tracking, secondary text, 0.5rem above the field.

### Navigation

Fixed, full-width, z-index 1000. Grid: logo | centered links | Contact CTA. At rest: transparent. On scroll: glass fill, `blur(16px)`, glass gilt hairline, soft dark veil.

Primary links only (four): **Work**, **Services**, **About**, **Reviews**. Gallery, reels, and why-us are discovered by scrolling — not listed in the bar. Contact is the outline CTA, not a fifth text link.

Wordmark: Playfair “XIII” at 1.3rem / 700 / 0.1em tracking, stacked over a gilt Outfit subline (0.65rem, uppercase). Links: 0.8rem uppercase, 0.12em, secondary at rest, gilt underline via `scaleX`. Desktop link gap ~1.5rem. Below 900px, links and CTA move into a short drawer with Contact as a gilt outline control; Escape closes the drawer.

### Gold display phrase

A short phrase inside a Playfair headline, set in solid champagne gilt (not a gradient). Use once per viewport at most; never as a button fill.

### Featured mosaic / lightbox

Mosaic tiles are flush photographs with 12px gutters: a tall lead, then a cluster. Captions sit under the frame — gilt category, Playfair title, muted location — not as chrome on the image. Hover may ease the still ~1.015; focus-visible is a gilt outline at 4px offset.

Lightbox and project modal sit on a near-black veil (`rgba(5, 5, 6, 0.92–0.94)`). The still is contained, not carded. Close and prev/next are hairline ghost controls that gild on hover.

## Do's and Don'ts

### Do:

- **Do** keep gilt rare — hardware on charcoal, not a wash.
- **Do** let completed-work photography carry luxury; keep UI quiet around it.
- **Do** alternate lamp-black and graphite rooms instead of raising cards.
- **Do** pair Playfair (titles, stats, quotes) with Outfit (UI, body, labels).
- **Do** use 2px on buttons and fields, 4px on copy surfaces, and sharp rectangles on photographs.
- **Do** give primary actions a champagne gilt fill; give ghost actions a paper hairline, not a second gold fill or a glow.
- **Do** let section headings speak without kickers, numbers, or metric strips above them.

### Don't:

- **Don't** use yellow gold or flood a screen with gilt.
- **Don't** build elevation from offset drop shadows or zero-offset gilt halos under cards and buttons.
- **Don't** introduce a third type family.
- **Don't** round buttons, fields, or cards past 4px.
- **Don't** let UI chrome, badges, kickers, or icon systems compete with the photographs.
- **Don't** treat glass blur as decoration on every surface — scrolled nav only.
- **Don't** stack identical scroll-reveal entrances on every section.
