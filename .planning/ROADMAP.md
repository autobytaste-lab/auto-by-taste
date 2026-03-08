# Roadmap: AI-Local Hub Landing Page

## Milestones

- ✅ **v1.0 i18n Foundation** - Phases 1-2 (abandoned 2026-03-07, partial completion)
- 🚧 **v2.0 Hero Apple Silicon Showcase** - Phases 3-5 (in progress)

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

<details>
<summary>v1.0 i18n Foundation (Phases 1-2) - ABANDONED 2026-03-07</summary>

### Phase 1: i18n Foundation
**Goal**: Translation infrastructure ready for component integration
**Depends on**: Nothing (first phase)
**Requirements**: I18N-01, I18N-02, I18N-03, I18N-04, I18N-05, I18N-06, CONT-01, CONT-03
**Success Criteria** (what must be TRUE):
  1. English translation file (i18n/translations/en.ts) exists with all content from 9 components
  2. Vietnamese translation file (i18n/translations/vi.ts) exists with all existing content preserved
  3. I18nContext provides useI18n() hook with language state and t() translation function
  4. Language preference persists in localStorage across browser refresh
  5. HTML lang attribute updates automatically when language changes
  6. Context value is memoized to prevent unnecessary re-renders
**Plans**: 2 plans

Plans:
- [x] 01-01: Test infrastructure + translation files (EN/VI)
- [x] 01-02: I18nContext provider with persistence and lang sync

### Phase 2: Mac Hardware Data Layer
**Goal**: Structured M-series chip data and comparison visualization
**Depends on**: Phase 1
**Requirements**: (v1.0 scope)
**Plans**: 3 plans

Plans:
- [x] 02-01: Type definitions and chip data structures
- [x] 02-02: Mac model and AI model compatibility data
- [x] 02-03: ChipComparison component with Recharts

</details>

### v2.0 Hero Apple Silicon Showcase

**Milestone Goal:** Redesign the Hero section with an animated Apple Silicon chip diagram showing M4 family specs to communicate raw computational power as AI agent infrastructure.

- [ ] **Phase 3: Animation Infrastructure** - Data layer extension, animation hooks, CSS keyframes, and accessibility foundation
- [ ] **Phase 4: SVG Chip Diagram** - Animated chip block diagram component with variant selection and responsive layout
- [ ] **Phase 5: Hero Integration** - Hero section redesign with chip diagram, new headline/subtext/CTAs, and visual polish

## Phase Details

### Phase 3: Animation Infrastructure
**Goal**: All animation primitives, accessibility guards, and data prerequisites exist and are independently tested before any visual component work begins
**Depends on**: Phase 2 (uses existing chip data layer from components/data/chips.ts)
**Requirements**: CHIP-05, A11Y-01, A11Y-02, A11Y-04
**Success Criteria** (what must be TRUE):
  1. Chip data layer includes TOPS field for all M4 variants, and existing chip data tests pass with the new field
  2. A useCountUp hook animates numbers from 0 to target value using requestAnimationFrame with ease-out timing
  3. A useInView hook reports when a target element enters the viewport via IntersectionObserver, and animations only run when the element is visible
  4. A useReducedMotion hook detects prefers-reduced-motion and all CSS keyframe animations are disabled when the preference is active
  5. CSS keyframes for core-glow, data-flow, and memory-shimmer are defined and animate only compositor-friendly properties (opacity, transform)
**Plans**: 2 plans

Plans:
- [ ] 03-01-PLAN.md — TOPS data field, useReducedMotion, useInView, and useCountUp hooks
- [ ] 03-02-PLAN.md — CSS keyframes (core-glow, data-flow, memory-shimmer) and reduced-motion media query

### Phase 4: SVG Chip Diagram
**Goal**: A standalone, animated chip diagram component that visualizes any M4 variant's architecture and can be dropped into any container
**Depends on**: Phase 3 (uses hooks, CSS keyframes, TOPS data)
**Requirements**: CHIP-01, CHIP-02, CHIP-03, CHIP-04, A11Y-03
**Success Criteria** (what must be TRUE):
  1. SVG diagram renders distinct visual blocks for CPU cores, GPU cores, Neural Engine, and unified memory with spec labels
  2. User can click M4 / M4 Pro / M4 Max selector tabs and the diagram updates to show the selected variant's specs
  3. Spec numbers (core counts, TOPS, memory bandwidth) animate with a count-up effect when the diagram scrolls into view
  4. Diagram is readable and usable on mobile (320px width), tablet, and desktop without horizontal scrolling or overlapping elements
  5. Total SVG DOM element count stays under 100 elements (verified in DevTools)
**Plans**: TBD

### Phase 5: Hero Integration
**Goal**: The Hero section showcases Apple Silicon's raw power through the chip diagram, new messaging, and updated CTAs -- delivering the complete v2.0 user experience
**Depends on**: Phase 4 (chip diagram component ready to integrate)
**Requirements**: HERO-01, HERO-02, HERO-03, HERO-04, HERO-05
**Success Criteria** (what must be TRUE):
  1. Hero section displays a new headline communicating Apple Silicon raw power for AI infrastructure (replacing the old generic headline)
  2. Subtext below the headline explains the unified memory architecture advantage for running local AI agents
  3. CTA buttons are updated to match the new visual direction and remain functional
  4. Spec callout badges prominently display key numbers (TOPS, memory bandwidth) outside the diagram for quick scanning
  5. Chip diagram is visually integrated into the Hero section with proper hierarchy -- headline and CTAs remain the primary focus, diagram supports the message
**Plans**: TBD

## Progress

**Execution Order:**
Phases execute in numeric order: 3 -> 4 -> 5

| Phase | Milestone | Plans Complete | Status | Completed |
|-------|-----------|----------------|--------|-----------|
| 1. i18n Foundation | v1.0 | 2/2 | Abandoned | 2026-03-07 |
| 2. Mac Hardware Data | v1.0 | 3/3 | Abandoned | 2026-03-07 |
| 3. Animation Infrastructure | v2.0 | 0/2 | Not started | - |
| 4. SVG Chip Diagram | v2.0 | 0/0 | Not started | - |
| 5. Hero Integration | v2.0 | 0/0 | Not started | - |
