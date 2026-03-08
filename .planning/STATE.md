---
gsd_state_version: 1.0
milestone: v2.0
milestone_name: Hero Apple Silicon Showcase
status: completed
stopped_at: Completed 05-01-PLAN.md (hero integration)
last_updated: "2026-03-08T04:25:30Z"
last_activity: 2026-03-08 — Completed 05-01 Hero redesign with ChipDiagram
progress:
  total_phases: 6
  completed_phases: 5
  total_plans: 14
  completed_plans: 12
  percent: 100
---

# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-03-07)

**Core value:** Visitors immediately grasp Apple Silicon's raw power as AI infrastructure
**Current focus:** Phase 05 hero integration

## Current Position

Phase: 5 of 6
Plan: 1 of 3 complete
Status: In Progress
Last activity: 2026-03-08 — Completed 05-01 Hero redesign with ChipDiagram

Progress: [██████████] 100%

## Performance Metrics

**Velocity:**
- Total plans completed: 2
- Average duration: 2 min
- Total execution time: 0.07 hours

**By Phase:**

| Phase | Plans | Total | Avg/Plan |
|-------|-------|-------|----------|
| 03-animation-infrastructure | 2 | 4 min | 2 min |
| Phase 04 P01 | 2 | 2 tasks | 2 files |
| Phase 04 P02 | 2min | 3 tasks | 1 files |
| Phase 05 P01 | 3min | 2 tasks | 4 files |
| Phase 05 P03 | 1min | 1 tasks | 2 files |

## Accumulated Context

### Decisions

Decisions are logged in PROJECT.md Key Decisions table.
Recent decisions affecting current work:

- Abandon v1.0 i18n -- pivot to Hero redesign
- SVG chip diagram (not 3D) for bundle size
- M4 family (M4/Pro/Max) maps to product tiers
- Zero new dependencies -- CSS keyframes + custom hooks only
- Compositor-only animation properties (opacity, transform) for performance
- prefers-reduced-motion built in from Phase 3, not retrofitted
- Used 0.01ms duration (not 0) in reduced-motion to avoid breaking CSS animation events
- Compositor-only properties enforced: opacity, transform, stroke-dashoffset
- tops field kept optional on Chip interface -- only M4 has marketed TOPS values
- useCountUp accepts trigger param for composability with useInView
- Block regions with text labels (not per-core rects) to stay under 100 SVG DOM elements
- No re-animation on variant switch -- instant values after initial viewport animation
- Mock hooks at module level in component tests rather than browser APIs
- [Phase 04]: Block regions with text labels to stay under 100 SVG DOM elements
- [Phase 04]: Visual verification approved -- diagram readable at 320px, color-coded blocks distinct, tabs functional
- [Phase 05]: Direct value assertions for hero content tests to catch regressions precisely
- [Phase 05-01]: Spec badges use m4-base TOPS and m4-max bandwidth/memory/GPU for hero callouts
- [Phase 05-01]: Removed all old infographic elements (ChipCard, Agent Layer, Unified Memory grid)

### Pending Todos

None yet.

### Blockers/Concerns

None yet.

## Session Continuity

Last session: 2026-03-08T04:25:30Z
Stopped at: Completed 05-01-PLAN.md (hero integration)
Resume file: None
