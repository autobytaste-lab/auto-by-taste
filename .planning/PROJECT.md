# AI-Local Hub Landing Page

## What This Is

A marketing landing page for AI-Local Hub, a Vietnamese startup selling local AI solutions running on Mac Mini M4 hardware. The page presents the company's value proposition, product tiers, business model, and investment opportunity to potential customers and investors.

## Core Value

Visitors immediately grasp Apple Silicon's raw power as AI infrastructure — CPU cores, GPU cores, Neural Engine, unified memory — and understand why AI-Local Hub runs on this hardware.

## Current Milestone: v2.0 Hero Apple Silicon Showcase

**Goal:** Redesign the Hero section with an animated Apple Silicon chip diagram showing M4 family specs to communicate raw computational power as AI agent infrastructure.

**Target features:**
- Animated SVG chip diagram (CPU cores, GPU cores, Neural Engine, unified memory)
- M4 family tiers (M4, M4 Pro, M4 Max) matching product tiers
- Spec numbers: core counts, TOPS, memory bandwidth
- Animations: glowing cores, flowing data paths, counting-up numbers
- New headline, subtext, and CTAs for the "raw power" message
- Full Hero section layout redesign

## Requirements

### Validated

<!-- Shipped and confirmed valuable. -->

- ✓ Hero section with main value proposition and CTA buttons — existing
- ✓ Problem/Solution section explaining the AI gap — existing
- ✓ Target segments section showing 3 market verticals — existing
- ✓ Product tiers section with 3 pricing options — existing
- ✓ Business model section explaining revenue streams — existing
- ✓ Strategy section with go-to-market approach — existing
- ✓ Funding section with pie chart visualization — existing
- ✓ Navigation bar with section anchors — existing
- ✓ Footer with contact links (Zalo, WhatsApp, phone) — existing
- ✓ Responsive design for mobile/tablet/desktop — existing
- ✓ i18n Context with useI18n hook, localStorage persistence, lang attribute sync — v1.0 Phase 1
- ✓ M-series chip data layer (types, chips, macModels, aiModels, compatibility) — v1.0 Phase 2
- ✓ ChipComparison component with Recharts visualization — v1.0 Phase 2

### Active

<!-- Current scope. Building toward these. -->

- [ ] Animated Apple Silicon chip diagram component (SVG)
- [ ] M4 family chip selector (M4 / M4 Pro / M4 Max)
- [ ] Hero section redesign with new layout, headline, and CTAs
- [ ] Spec animations (counting numbers, glowing cores, data flow paths)

### Out of Scope

- Backend/API integration — static site only
- 3D chip rendering (WebGL/Three.js) — too heavy for landing page
- Real benchmark data — marketing specs sufficient
- i18n integration for hero text — deferred from v1.0, can add later

## Context

This is a brownfield project redesigning the Hero section of an existing React landing page. The current hero has a simple value proposition with CTA buttons. The new hero will showcase Apple Silicon architecture as a visual centerpiece, communicating that AI-Local Hub's hardware is purpose-built for AI workloads. Existing chip data from v1.0 Phase 2 (components/data/chips.ts) provides M-series specs that can be reused.

Technical environment: React 19 + TypeScript + Vite + Tailwind CSS (CDN)

## Constraints

- **Tech stack**: Must use existing React/TypeScript/Vite setup
- **Bundle size**: Keep additions minimal — SVG animations preferred over heavy libraries
- **Performance**: Animations must not block main thread or cause jank
- **Mobile**: Chip diagram must be responsive and readable on mobile screens

## Key Decisions

<!-- Decisions that constrain future work. Add throughout project lifecycle. -->

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| EN | VI toggle buttons in navbar | User preference for inline buttons over dropdown | — Pending |
| localStorage for persistence | Simpler than cookies, no backend needed | — Pending |
| Translate content myself | User doesn't have translations ready | — Pending |
| Abandon v1.0 i18n | Pivot to Hero redesign, i18n gaps remain | — v2.0 pivot |
| SVG chip diagram over 3D | Bundle size constraint, landing page performance | — Pending |
| M4 family (M4/Pro/Max) | Maps to product tiers, shows progression | — Pending |
| Animated diagram | Glowing cores, flowing data, counting numbers | — Pending |

---
*Last updated: 2026-03-07 after v2.0 milestone start*
