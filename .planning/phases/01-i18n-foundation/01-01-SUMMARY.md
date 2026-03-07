---
phase: 01-i18n-foundation
plan: 01
subsystem: i18n
tags: [vitest, testing-library, i18n, typescript, type-safety]

# Dependency graph
requires:
  - phase: none
    provides: existing components with hardcoded Vietnamese strings
provides:
  - Translation infrastructure with en.ts and vi.ts files
  - Type-safe translation structure enforced via TypeScript
  - Test infrastructure with Vitest and jsdom
  - 398 lines of translation content covering 9 components
affects: [01-02-language-context, 01-03-navbar-translation, 01-04-component-translation]

# Tech tracking
tech-stack:
  added: [vitest, @testing-library/react, @testing-library/jest-dom, jsdom]
  patterns: [type-safe translations via const assertion, TDD for translation files, nested translation keys by component]

key-files:
  created: [i18n/translations/en.ts, i18n/translations/vi.ts, i18n/translations/en.test.ts, i18n/translations/vi.test.ts, vitest.config.ts, test/setup.ts]
  modified: [package.json]

key-decisions:
  - "Nested translation structure organized by component (navbar, hero, productTiers, etc.) for clarity"
  - "2-3 level nesting max to avoid deep object paths"
  - "Type enforcement via Translation type export ensures EN/VI structure match"
  - "Vitest with jsdom for test environment (React Testing Library compatible)"

patterns-established:
  - "Translation files use 'as const' assertion for type inference"
  - "EN file exports Translation type, VI file imports and satisfies it"
  - "Test files verify structure completeness and no empty strings"
  - "TDD workflow: test file first (RED), implementation (GREEN), no refactor needed"

requirements-completed: [I18N-01, I18N-02, I18N-03, CONT-01, CONT-03]

# Metrics
duration: 5min
completed: 2026-03-07
---

# Phase 01 Plan 01: Translation Infrastructure Summary

**Type-safe English and Vietnamese translation files with 398 lines covering all 9 components, plus Vitest test infrastructure**

## Performance

- **Duration:** 5 min
- **Started:** 2026-03-07T14:46:34Z
- **Completed:** 2026-03-07T14:52:28Z
- **Tasks:** 3
- **Files modified:** 11

## Accomplishments
- Complete English translation file with all strings from 9 components extracted
- Complete Vietnamese translation file preserving all existing Vietnamese content with proper diacritics
- Type-safe structure enforced via TypeScript - VI must match EN structure exactly
- Working test infrastructure with Vitest, jsdom, and Testing Library
- All 7 tests passing, TypeScript build succeeds

## Task Commits

Each task was committed atomically:

1. **Task 1: Install Vitest and create test infrastructure** - `0a7a5ac` (chore)
2. **Task 2: Create English translation file with all component strings** - `0e68b51` (test), `90780b5` (feat) - TDD
3. **Task 3: Create Vietnamese translation file matching EN structure** - `9a4749c` (test), `bac6d56` (feat) - TDD

_Note: TDD tasks have multiple commits (test → feat)_

## Files Created/Modified
- `package.json` - Added test script and test dependencies
- `package-lock.json` - Locked test dependency versions
- `vitest.config.ts` - Vitest configuration with jsdom environment and global test setup
- `test/setup.ts` - Test setup importing jest-dom matchers
- `i18n/translations/en.ts` - English translations (199 lines) with Translation type export
- `i18n/translations/en.test.ts` - English translation tests (40 lines)
- `i18n/translations/vi.ts` - Vietnamese translations (199 lines) satisfying Translation type
- `i18n/translations/vi.test.ts` - Vietnamese translation tests (34 lines)

## Decisions Made
- **Organized by component:** Top-level keys match component names (navbar, hero, productTiers, etc.) for easy navigation
- **2-3 level nesting max:** Prevents deep paths like `en.hero.cta.primary.button.text` in favor of `en.hero.ctaPrimary`
- **camelCase for keys:** Consistent with TypeScript conventions (e.g., `ctaPrimary` not `cta-primary`)
- **Preserved Vietnamese diacritics:** Used proper Vietnamese characters (Tổng, Kỷ, etc.) exactly as they appear in components
- **Icons included in translations:** Emoji icons (🔒, 💸, etc.) stored as translation values for consistency

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None - all tasks completed without errors or blockers.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

Translation infrastructure is complete and ready for:
- **Phase 01 Plan 02:** Language context provider can import these translation files
- **Phase 01 Plan 03:** Navbar can consume translations via context
- **Phase 01 Plan 04:** Remaining components can be translated

All translation content is centralized, type-safe, and tested.

## Self-Check

Verifying created files exist:

```bash
[ -f "i18n/translations/en.ts" ] && echo "FOUND: en.ts" || echo "MISSING: en.ts"
[ -f "i18n/translations/vi.ts" ] && echo "FOUND: vi.ts" || echo "MISSING: vi.ts"
[ -f "vitest.config.ts" ] && echo "FOUND: vitest.config.ts" || echo "MISSING: vitest.config.ts"
[ -f "test/setup.ts" ] && echo "FOUND: test/setup.ts" || echo "MISSING: test/setup.ts"
```

Verifying commits exist:

```bash
git log --oneline | grep -E "(0a7a5ac|0e68b51|90780b5|9a4749c|bac6d56)"
```

### Self-Check Result: PASSED

All files exist and all commits are present in git history.

---
*Phase: 01-i18n-foundation*
*Completed: 2026-03-07*
