# Requirements: AI-Local Hub Hero Apple Silicon Showcase

**Defined:** 2026-03-08
**Core Value:** Visitors immediately grasp Apple Silicon's raw power as AI infrastructure

## v2.0 Requirements

Requirements for Hero Apple Silicon chip diagram showcase. Each maps to roadmap phases.

### Chip Diagram

- [x] **CHIP-01**: SVG chip block diagram displays CPU cores, GPU cores, Neural Engine, and unified memory as distinct visual blocks
- [x] **CHIP-02**: User can select M4 variant (M4 / M4 Pro / M4 Max) and diagram updates to show that chip's specs
- [x] **CHIP-03**: Spec numbers animate with count-up effect when diagram enters viewport
- [x] **CHIP-04**: Chip diagram is responsive and readable on mobile (320px+), tablet, and desktop
- [x] **CHIP-05**: TOPS field added to chip data layer for Neural Engine performance display

### Hero Layout

- [x] **HERO-01**: Hero section displays new headline communicating Apple Silicon raw power for AI
- [x] **HERO-02**: Hero subtext explains unified memory architecture advantage for local AI agents
- [x] **HERO-03**: CTA buttons updated to match new visual direction
- [x] **HERO-04**: Spec callout badges show key numbers (TOPS, memory bandwidth) prominently
- [x] **HERO-05**: Chip diagram integrated into Hero section with proper visual hierarchy

### Accessibility & Performance

- [x] **A11Y-01**: Animations respect prefers-reduced-motion (static fallback when enabled)
- [x] **A11Y-02**: All animations use compositor-only properties (opacity, transform) for GPU acceleration
- [x] **A11Y-03**: SVG diagram DOM stays under 100 elements for mobile performance
- [x] **A11Y-04**: Animations trigger via IntersectionObserver (no off-screen animation waste)

## v2.1 Requirements

Deferred to future release. Tracked but not in current roadmap.

### Enhanced Animations

- **ENH-01**: Glowing core animations on CPU/GPU blocks
- **ENH-02**: Flowing data path animations between chip blocks
- **ENH-03**: Scroll-triggered entrance animation for chip diagram
- **ENH-04**: Animated transitions when switching between M4 variants

### i18n (Carried from v1.0)

- **I18N-07**: Hero section text translated to English and Vietnamese
- **I18N-08**: All 9 components use t() function for content switching
- **I18N-09**: Navbar EN | VI toggle with active state styling

## Out of Scope

Explicitly excluded. Documented to prevent scope creep.

| Feature | Reason |
|---------|--------|
| 3D chip rendering (WebGL/Three.js) | Too heavy for landing page, bundle size constraint |
| Real benchmark data | Marketing specs sufficient for landing page |
| Auto-cycling chip variants | Anti-pattern per research (user loses control) |
| Hover tooltips on chip blocks | Mobile-hostile interaction pattern |
| Sound effects | Unnecessary, accessibility burden |
| Particle effects on diagram | Conflicts with existing particle background |
| Animation libraries (Framer Motion, GSAP) | Zero dependencies needed per research |

## Traceability

Which phases cover which requirements. Updated during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| CHIP-01 | Phase 4 | Complete |
| CHIP-02 | Phase 4 | Complete |
| CHIP-03 | Phase 4 | Complete |
| CHIP-04 | Phase 4 | Complete |
| CHIP-05 | Phase 3 | Complete |
| HERO-01 | Phase 5 | Complete |
| HERO-02 | Phase 5 | Complete |
| HERO-03 | Phase 5 | Complete |
| HERO-04 | Phase 5 | Complete |
| HERO-05 | Phase 5 | Complete |
| A11Y-01 | Phase 3 | Complete |
| A11Y-02 | Phase 3 | Complete |
| A11Y-03 | Phase 4 | Complete |
| A11Y-04 | Phase 3 | Complete |

**Coverage:**
- v2.0 requirements: 14 total
- Mapped to phases: 14
- Unmapped: 0

---
*Requirements defined: 2026-03-08*
*Last updated: 2026-03-08 after roadmap creation*
