---
phase: 1
slug: i18n-foundation
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-07
---

# Phase 1 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Vitest 3.x + React Testing Library |
| **Config file** | vitest.config.ts (Wave 0 creates) |
| **Quick run command** | `npm test -- --run` |
| **Full suite command** | `npm test -- --run --coverage` |
| **Estimated runtime** | ~10 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npm test -- --run`
- **After every plan wave:** Run `npm test -- --run --coverage`
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** 10 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 1-01-01 | 01 | 0 | INFRA | unit | `npm test -- --run` | ❌ W0 | ⬜ pending |
| 1-01-02 | 01 | 1 | I18N-01 | unit | `npm test src/i18n/translations/en.test.ts -- --run` | ❌ W0 | ⬜ pending |
| 1-01-03 | 01 | 1 | I18N-02 | unit | `npm test src/i18n/translations/vi.test.ts -- --run` | ❌ W0 | ⬜ pending |
| 1-01-04 | 01 | 1 | I18N-03 | build | `npm run build` | ✅ | ⬜ pending |
| 1-01-05 | 01 | 2 | I18N-04 | unit | `npm test src/i18n/I18nContext.test.tsx -- --run` | ❌ W0 | ⬜ pending |
| 1-01-06 | 01 | 2 | I18N-05 | integration | `npm test src/i18n/persistence.test.tsx -- --run` | ❌ W0 | ⬜ pending |
| 1-01-07 | 01 | 2 | I18N-06 | integration | `npm test src/i18n/lang-attribute.test.tsx -- --run` | ❌ W0 | ⬜ pending |
| 1-01-08 | 01 | 3 | CONT-01 | manual-only | Visual inspection | N/A | ⬜ pending |
| 1-01-09 | 01 | 3 | CONT-03 | manual-only | Side-by-side comparison | N/A | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `npm install -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom` — Install test dependencies
- [ ] `vitest.config.ts` — Configure Vitest with jsdom environment
- [ ] `src/test/setup.ts` — Import @testing-library/jest-dom matchers
- [ ] `package.json` — Add `"test": "vitest"` script
- [ ] `src/i18n/translations/en.test.ts` — English translation structure tests
- [ ] `src/i18n/translations/vi.test.ts` — Vietnamese translation structure tests
- [ ] `src/i18n/I18nContext.test.tsx` — Context provider and hook tests
- [ ] `src/i18n/persistence.test.tsx` — localStorage persistence tests
- [ ] `src/i18n/lang-attribute.test.tsx` — HTML lang attribute sync tests

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| All strings extracted from components | CONT-01 | Requires human judgment to verify edge cases (aria-labels, alt text, placeholders) | Grep for hardcoded Vietnamese in components, visually inspect UI in English mode |
| Vietnamese content matches existing | CONT-03 | Translation accuracy requires native speaker validation | Side-by-side comparison of VI translation file with current live page content |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 10s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
