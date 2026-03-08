---
phase: 05-hero-integration
plan: 01
subsystem: ui
tags: [react, hero, chip-diagram, i18n, apple-silicon]

# Dependency graph
requires:
  - phase: 04-chip-diagram
    provides: ChipDiagram component with variant tabs and SVG visualization
provides:
  - Redesigned Hero section with Apple Silicon messaging
  - Spec callout badges driven by chip data
  - ChipDiagram integrated into Hero layout
affects: [05-hero-integration]

# Tech tracking
tech-stack:
  added: []
  patterns: [data-driven UI badges from chip constants]

key-files:
  created: [components/Hero.test.tsx]
  modified: [components/Hero.tsx, i18n/translations/en.ts, i18n/translations/vi.ts]

key-decisions:
  - "Spec badges use m4-base TOPS and m4-max bandwidth/memory/GPU for hero callouts"
  - "Removed all old infographic elements (ChipCard, Agent Layer, Unified Memory grid)"

patterns-established:
  - "Data-driven badges: derive UI display values from chip data constants rather than hardcoding"

requirements-completed: [HERO-01, HERO-02, HERO-03, HERO-04, HERO-05]

# Metrics
duration: 3min
completed: 2026-03-08
---

# Phase 5 Plan 1: Hero Integration Summary

**Hero rewritten with Apple Silicon messaging, ChipDiagram, and data-driven spec badges replacing old Agent Layer infographic**

## Performance

- **Duration:** 3 min
- **Started:** 2026-03-08T04:22:29Z
- **Completed:** 2026-03-08T04:25:30Z
- **Tasks:** 2
- **Files modified:** 4

## Accomplishments
- Hero headline and subtitle updated from "Hire AI Employees" to Apple Silicon power messaging
- Four spec callout badges (TOPS, GB/s, Unified Memory, GPU Cores) driven by real chip data
- ChipDiagram SVG component integrated below badges in Hero section
- All old content removed: ChipCard subcomponent, Agent Layer, connection arrows, Unified Memory grid
- Full test coverage with 6 tests for HERO-01 through HERO-05 plus removal verification

## Task Commits

Each task was committed atomically:

1. **Task 1: Test scaffold and translation updates** - `3bab670` (test) - TDD RED phase
2. **Task 2: Rewrite Hero.tsx with ChipDiagram integration** - `a77830d` (feat) - TDD GREEN phase

## Files Created/Modified
- `components/Hero.test.tsx` - 6 unit tests covering HERO-01 through HERO-05 and negative checks
- `components/Hero.tsx` - Redesigned Hero with ChipDiagram, spec badges, simplified subtitle
- `i18n/translations/en.ts` - Updated hero keys with Apple Silicon messaging, removed old keys
- `i18n/translations/vi.ts` - Updated Vietnamese hero keys to match new structure

## Decisions Made
- Spec badges use m4-base TOPS (38) and m4-max stats (546 GB/s, 128GB, 40 GPU cores) as hero callout values
- Removed floating glass card decorations along with the old infographic
- CTA spacing changed from mb-20 to mb-12 to better flow into spec badges

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- Hero section fully integrated with ChipDiagram from Phase 04
- Translation structure simplified, ready for any future translation test updates (plan 05-03)
- All 99 tests passing across 16 test files

## Self-Check: PASSED

All files exist, all commits verified.

---
*Phase: 05-hero-integration*
*Completed: 2026-03-08*
