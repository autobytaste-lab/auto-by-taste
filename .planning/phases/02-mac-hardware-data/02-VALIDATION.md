---
phase: 02
slug: mac-hardware-data
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-05
---

# Phase 02 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Vitest 4.0.18 |
| **Config file** | vitest.config.ts |
| **Quick run command** | `npm test -- [specific-file] -x` |
| **Full suite command** | `npm test -- --run` |
| **Estimated runtime** | ~5 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npm test -- [specific-file] -x`
- **After every plan wave:** Run `npm test -- --run`
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** 5 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 02-01-01 | 01 | 0 | R3 | unit | `npm test -- chips.test.ts -x` | ❌ W0 | ⬜ pending |
| 02-01-02 | 01 | 0 | R3 | unit | `npm test -- macModels.test.ts -x` | ❌ W0 | ⬜ pending |
| 02-01-03 | 01 | 0 | R3 | unit | `npm test -- aiModels.test.ts -x` | ❌ W0 | ⬜ pending |
| 02-01-04 | 01 | 0 | R3 | unit | `npm test -- compatibility.test.ts -x` | ❌ W0 | ⬜ pending |
| 02-02-01 | 02 | 1 | R4 | integration | `npm test -- ChipComparison.test.tsx -x` | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `components/data/__tests__/chips.test.ts` — chip data integrity validation
- [ ] `components/data/__tests__/macModels.test.ts` — Mac model data validation
- [ ] `components/data/__tests__/aiModels.test.ts` — AI model data validation
- [ ] `components/data/__tests__/compatibility.test.ts` — compatibility logic tests
- [ ] `components/__tests__/ChipComparison.test.tsx` — component render tests

*Existing Vitest infrastructure covers test framework setup.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Chip comparison chart visual accuracy | R4 | Visual rendering requires human eye | Verify chart displays correct bars for CPU/GPU/RAM |
| Vietnamese text readability | R3, R4 | Language comprehension | Confirm Vietnamese labels are correct and clear |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 5s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
