---
phase: 04
slug: svg-chip-diagram
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-08
---

# Phase 04 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Vitest 4.0.18 + @testing-library/react 16.3.2 |
| **Config file** | vitest.config.ts |
| **Quick run command** | `npx vitest run components/ChipDiagram.test.tsx --reporter=verbose` |
| **Full suite command** | `npx vitest run` |
| **Estimated runtime** | ~5 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npx vitest run --reporter=verbose`
- **After every plan wave:** Run `npx vitest run`
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** 5 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 04-01-01 | 01 | 1 | CHIP-01 | unit | `npx vitest run components/ChipDiagram.test.tsx -x` | ❌ W0 | ⬜ pending |
| 04-01-02 | 01 | 1 | CHIP-02 | unit | `npx vitest run components/ChipDiagram.test.tsx -x` | ❌ W0 | ⬜ pending |
| 04-01-03 | 01 | 1 | CHIP-03 | unit | `npx vitest run components/ChipDiagram.test.tsx -x` | ❌ W0 | ⬜ pending |
| 04-01-04 | 01 | 1 | CHIP-04 | unit | `npx vitest run components/ChipDiagram.test.tsx -x` | ❌ W0 | ⬜ pending |
| 04-01-05 | 01 | 1 | A11Y-03 | unit | `npx vitest run components/ChipDiagram.test.tsx -x` | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `components/ChipDiagram.test.tsx` — stubs for CHIP-01, CHIP-02, CHIP-03, CHIP-04, A11Y-03
- [ ] IntersectionObserver mock (reuse pattern from Phase 3 `useInView.test.ts`)
- [ ] requestAnimationFrame mock (reuse pattern from Phase 3 `useCountUp.test.ts`)

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Visual appearance of chip blocks | CHIP-01 | Colors/layout are visual | Open browser, verify 4 distinct colored blocks |
| Mobile responsiveness at 320px | CHIP-04 | Viewport testing | Chrome DevTools → responsive mode → 320px width |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 5s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
