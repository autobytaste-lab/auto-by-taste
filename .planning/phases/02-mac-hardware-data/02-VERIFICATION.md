---
phase: 02-mac-hardware-data
verified: 2026-03-07T23:05:00Z
status: gaps_found
score: 7/10 must-haves verified
re_verification:
  previous_status: gaps_found
  previous_score: 6/10
  gaps_closed:
    - "User can see visual comparison of M1 vs M2 vs M3 vs M4 generations"
  gaps_remaining:
    - "Compatible AI models displayed after Mac selection (awaits Phase 3 UI)"
    - "ChipComparison does not use t() function - hardcoded Vietnamese strings"
  regressions: []
gaps:
  - truth: "All components use t() function instead of hardcoded strings (UX-05)"
    status: partial
    reason: "ChipComparison.tsx has hardcoded Vietnamese strings instead of using t() from useI18n. When user switches to English, this component remains Vietnamese."
    artifacts:
      - path: "components/ChipComparison.tsx"
        issue: "Does not import useI18n or use t() function. All labels hardcoded in Vietnamese: 'So sanh chip M-series', 'Theo the he', 'Tat ca chip', 'Nhan CPU', etc."
    missing:
      - "Import useI18n from i18n/I18nContext in ChipComparison.tsx"
      - "Add ChipComparison translation keys to en.ts and vi.ts"
      - "Replace all hardcoded Vietnamese strings with t() calls"
  - truth: "Navbar displays EN | VI toggle buttons with active state styling (UX-02, UX-04)"
    status: partial
    reason: "Navbar has a single toggle button showing opposite language ('VI' when English active, 'EN' when Vietnamese active). Not two separate EN | VI buttons with active state as specified."
    artifacts:
      - path: "components/Navbar.tsx"
        issue: "Single toggle button (line 42-47) instead of dual EN | VI buttons. No active state visual feedback - button always shows same style regardless of selection."
    missing:
      - "Replace single toggle button with two separate EN and VI buttons"
      - "Add active state styling to highlight current language (e.g., bg-blue-600 text-white for active, text-slate-400 for inactive)"
  - truth: "Compatible AI models displayed after Mac selection"
    status: failed
    reason: "getCompatibleModels function exists but no UI component calls it - data layer ready, UI integration awaits Phase 3"
    artifacts:
      - path: "components/data/compatibility.ts"
        issue: "Function orphaned - not imported or called by any UI component"
    missing:
      - "Mac selector component (planned for Phase 3)"
      - "Integration between Mac selector and compatibility function"
---

# Phase 2: Mac Hardware Data Verification Report

**Phase Goal:** All page content displays in user's selected language (ROADMAP Phase 2: Component Integration)
**Plans Executed:** 02-01 (data layer), 02-02 (ChipComparison component), 02-03 (App.tsx integration)
**Verified:** 2026-03-07T23:05:00Z
**Status:** gaps_found
**Re-verification:** Yes -- after gap closure (Plan 02-03 closed ChipComparison integration gap)

**IMPORTANT NOTE:** The phase directory name (02-mac-hardware-data) and its plans address requirements R3 (data layer) and R4 (chip comparison), not the UX-01 through UX-05 requirements mapped to Phase 2 in ROADMAP.md. This verification covers both: the plans' own must_haves AND the Phase 2 UX requirements from the ROADMAP, since the user explicitly requested UX-01 through UX-05 verification.

## Goal Achievement

### Observable Truths

| # | Truth | Status | Evidence |
|---|-------|--------|----------|
| 1 | App is wrapped with I18nProvider (SC-1) | VERIFIED | App.tsx line 93: `<I18nProvider>` wraps `<AppContent />` |
| 2 | All components use t() function instead of hardcoded strings (SC-2, UX-05) | PARTIAL | 12 of 13 rendered components use useI18n/t(). ChipComparison.tsx (299 LOC) has 9+ hardcoded Vietnamese strings and does not import useI18n. |
| 3 | Navbar displays EN/VI toggle buttons with active state styling (SC-3, UX-02, UX-04) | PARTIAL | Single toggle button exists (Navbar.tsx line 42-47) showing opposite language name. Not dual buttons. No active/inactive visual distinction. |
| 4 | Clicking language toggle switches all visible content immediately (SC-4, UX-03) | PARTIAL | Toggle works for 12 components. ChipComparison stays Vietnamese regardless of language selection. |
| 5 | English displays as default language on first visit (SC-5, UX-01) | VERIFIED | I18nContext.tsx line 22: defaults to 'en' when no localStorage key exists |
| 6 | Page maintains scroll position when switching languages (SC-6) | UNCERTAIN | React Context state change triggers re-render without route change, which should preserve scroll. Cannot verify programmatically. |
| 7 | All M-series chips M1-M4 have accurate specs (Plan 02-01) | VERIFIED | 14 chips in chips.ts, 9 tests pass, M3 Pro regression documented (150 vs 200 GB/s) |
| 8 | All Mac models (2020+) with correct RAM options (Plan 02-01) | VERIFIED | 18 Mac models, 7 tests pass, Mac Mini M4 starts at 16GB |
| 9 | AI models have correct Q4_K_M RAM requirements (Plan 02-01) | VERIFIED | 12 AI models, 9 tests pass, Vietnamese descriptions present |
| 10 | Compatibility function filters AI models by RAM (Plan 02-01) | VERIFIED | getCompatibleModels works, 8 tests pass, but function orphaned (no UI caller) |

**Score:** 7/10 truths verified (2 partial, 1 uncertain)

### Required Artifacts

| Artifact | Expected | Status | Details |
|----------|----------|--------|---------|
| `components/data/types.ts` | TypeScript interfaces | VERIFIED | Chip, MacModel, AIModel, CompatibilityResult exported, 57 LOC |
| `components/data/chips.ts` | M-series chip data | VERIFIED | 14 chips, getChipById helper, 190 LOC, 9 tests pass |
| `components/data/macModels.ts` | Mac model data | VERIFIED | 18 models, getMacById/getMacsByCategory, 187 LOC, 7 tests pass |
| `components/data/aiModels.ts` | AI model data | VERIFIED | 12 models, getAIModelById, 145 LOC, 9 tests pass |
| `components/data/compatibility.ts` | Compatibility function | ORPHANED | 26 LOC, 8 tests pass, but not imported by any UI component |
| `components/ChipComparison.tsx` | Chip comparison with charts | VERIFIED | 299 LOC, integrated in App.tsx section#chip-comparison |
| `components/__tests__/ChipComparison.test.tsx` | Component tests | VERIFIED | 5 tests passing |

### Key Link Verification

| From | To | Via | Status | Details |
|------|----|-----|--------|---------|
| App.tsx | ChipComparison.tsx | import and render | WIRED | Line 8: import, Lines 48-50: `<section id="chip-comparison"><ChipComparison /></section>` |
| ChipComparison.tsx | data/chips.ts | import chips | WIRED | Line 3: `import { chips } from './data/chips'` |
| ChipComparison.tsx | recharts | chart components | WIRED | Line 2: BarChart, ResponsiveContainer, etc. imported and rendered |
| macModels.ts | chips.ts | chipId reference | WIRED | All 18 Mac models have valid chipId strings |
| compatibility.ts | chips.ts | chip lookup | WIRED | `chips.find` present and used |
| compatibility.ts | aiModels.ts | RAM filtering | WIRED | `aiModels.filter` by minRamGB |
| ChipComparison.tsx | i18n/I18nContext | useI18n hook | NOT WIRED | ChipComparison does not import or use useI18n -- hardcoded Vietnamese |
| (any UI component) | compatibility.ts | getCompatibleModels | NOT WIRED | No UI component imports this function |

### Requirements Coverage

| Requirement | Source Plan | Description | Status | Evidence |
|-------------|------------|-------------|--------|----------|
| UX-01 | (none in phase) | English as default language on first visit | SATISFIED | I18nContext defaults to 'en' when no localStorage key (implemented in Phase 1) |
| UX-02 | (none in phase) | Language switcher (EN/VI toggle buttons) in navbar | PARTIAL | Single toggle button exists but not dual EN/VI buttons per specification |
| UX-03 | (none in phase) | Clicking toggle switches all content immediately | PARTIAL | 12/13 components switch. ChipComparison has hardcoded Vietnamese. |
| UX-04 | (none in phase) | Active language button shows visual feedback | FAILED | Toggle button has uniform styling regardless of active language |
| UX-05 | (none in phase) | All 9 components display in selected language | PARTIAL | Original 9 components use t(). New ChipComparison does not. |
| R3 | 02-01 | Data layer for Mac models and AI compatibility | SATISFIED | All data structures, helpers, and tests complete |
| R4 | 02-02, 02-03 | M-Series chip comparison visible to users | SATISFIED | ChipComparison built (299 LOC) and integrated in App.tsx |

**Orphaned Requirements:** UX-01 through UX-05 are mapped to Phase 2 in REQUIREMENTS.md traceability table but do NOT appear in any plan's `requirements` field within this phase directory. The plans reference R3 and R4. This means the ROADMAP Phase 2 i18n integration work was never formally planned in this phase directory.

### Anti-Patterns Found

| File | Line | Pattern | Severity | Impact |
|------|------|---------|----------|--------|
| ChipComparison.tsx | 95, 97, 100, 115, 125, 135 | Hardcoded Vietnamese strings | Blocker | Component ignores language selection, breaks i18n consistency |
| Navbar.tsx | 42-47 | Single toggle instead of dual EN/VI buttons | Warning | Functional but does not match UX-02/UX-04 specification |
| compatibility.ts | all | Orphaned function (no UI caller) | Warning | Data ready but no consumer -- expected for Phase 3 |

No TODO/FIXME/placeholder comments found. No empty implementations. No console.log stubs. All 72 tests passing.

### Human Verification Required

#### 1. Language Toggle Content Switching

**Test:** Open application in browser. Click language toggle in navbar. Observe all sections including ChipComparison (between org-chart and models).
**Expected:** All visible content switches between English and Vietnamese.
**Why human:** Need to visually confirm all text changes and identify any remaining hardcoded strings.

#### 2. Scroll Position Preservation

**Test:** Scroll to bottom of page. Click language toggle. Observe scroll position.
**Expected:** Page stays at same scroll position after language switch.
**Why human:** Scroll behavior depends on browser rendering pipeline.

#### 3. Active Language Visual Feedback

**Test:** Inspect navbar language toggle appearance when English is active vs Vietnamese.
**Expected:** Active language should have distinct visual treatment per UX-04.
**Why human:** Visual styling assessment requires browser rendering.

#### 4. ChipComparison Chart Rendering

**Test:** Navigate to chip-comparison section, interact with chart and view toggle.
**Expected:** Chart renders M-series data, view toggle works, details panel updates on selection.
**Why human:** Chart rendering quality, interaction responsiveness, visual aesthetics.

### Gaps Summary

**Re-verification Result:** Plan 02-03 successfully closed Gap 1 from previous verification (ChipComparison now integrated in App.tsx). Gap 2 (compatibility function orphaned) remains as expected -- it awaits Phase 3 UI. Two new gaps identified related to UX requirements.

**Gap 1: ChipComparison i18n (Blocker for Phase 2 ROADMAP goal)**
ChipComparison.tsx was added by this phase but does not use the i18n system. It has 9+ hardcoded Vietnamese strings ("So sanh chip M-series", "Theo the he", "Tat ca chip", "Nhan CPU", "Nhan GPU", etc.). When a user selects English, this section remains entirely in Vietnamese. This directly contradicts the Phase 2 goal "all page content displays in user's selected language."

**Gap 2: Language Toggle UX (UX-02, UX-04)**
The navbar has a single toggle button showing the opposite language name (shows "VI" when English is active, "EN" when Vietnamese is active). The ROADMAP and UX-02 specify "EN | VI toggle buttons with active state styling." UX-04 requires "active language button shows visual feedback." The current single-button implementation is functional but does not match specification.

**Gap 3: Compatibility Function Orphaned (Deferred to Phase 3)**
getCompatibleModels is not used by any UI component. This is expected and acceptable -- the Mac selector UI is planned for Phase 3. Not a blocker for Phase 2 goals.

**Phase Plans vs ROADMAP Mismatch:**
The plans in this directory (02-01, 02-02, 02-03) successfully delivered R3 (data layer) and R4 (chip comparison). However, UX-01 through UX-05 (i18n component integration) are not addressed by any plan in this directory despite being mapped to Phase 2 in REQUIREMENTS.md. The i18n integration that does exist (12 components using t()) appears to have been done outside this phase's formal planning structure.

---

_Verified: 2026-03-07T23:05:00Z_
_Verifier: Claude (gsd-verifier)_
