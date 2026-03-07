# Roadmap: AI-Local Hub i18n

## Overview

Add English/Vietnamese internationalization to the existing landing page using React Context API. This roadmap transforms the current Vietnamese-only page into a bilingual experience by extracting all hardcoded strings into translation files, building a lightweight i18n system using React Context, and integrating it across all 9 components. The implementation uses zero external dependencies, adds minimal bundle size, and follows React 19 best practices for performance and accessibility.

## Phases

- [ ] **Phase 1: i18n Foundation** - Translation files and Context system
- [ ] **Phase 2: Component Integration** - Replace hardcoded strings with translated content
- [ ] **Phase 3: Polish & Validation** - Quality assurance and user experience refinement

## Phase Details

### Phase 1: i18n Foundation
**Goal**: Translation infrastructure ready for component integration
**Depends on**: Nothing (first phase)
**Requirements**: I18N-01, I18N-02, I18N-03, I18N-04, I18N-05, I18N-06, CONT-01, CONT-03
**Success Criteria** (what must be TRUE):
  1. English translation file (i18n/translations/en.ts) exists with all content from 9 components
  2. Vietnamese translation file (i18n/translations/vi.ts) exists with all existing content preserved
  3. I18nContext provides useI18n() hook with language state and t() translation function
  4. Language preference persists in localStorage across browser refresh
  5. HTML lang attribute updates automatically when language changes (verified in DevTools)
  6. Context value is memoized to prevent unnecessary re-renders (verified with React DevTools Profiler)
**Plans**: 2 plans

Plans:
- [ ] 01-01-PLAN.md — Test infrastructure + translation files (EN/VI)
- [ ] 01-02-PLAN.md — I18nContext provider with persistence and lang sync

### Phase 2: Component Integration
**Goal**: All page content displays in user's selected language
**Depends on**: Phase 1
**Requirements**: UX-01, UX-02, UX-03, UX-04, UX-05
**Success Criteria** (what must be TRUE):
  1. App is wrapped with I18nProvider in index.tsx
  2. All 9 components use t() function instead of hardcoded strings
  3. Navbar displays EN | VI toggle buttons with active state styling
  4. Clicking language toggle switches all visible content immediately
  5. English displays as default language on first visit (no localStorage key)
  6. Page maintains scroll position and context when switching languages
**Plans**: TBD

### Phase 3: Polish & Validation
**Goal**: Production-ready bilingual landing page
**Depends on**: Phase 2
**Requirements**: CONT-02, CONT-04
**Success Criteria** (what must be TRUE):
  1. All English translations are professionally written and accurate
  2. Vietnamese content exactly matches original page content
  3. Responsive layouts work correctly with Vietnamese text (no overflow or broken layouts on mobile/tablet/desktop)
  4. localStorage persistence tested: switching to VI, refreshing browser, confirms VI loads
  5. Lighthouse accessibility audit passes with correct lang attribute
  6. All edge cases covered: aria-labels, placeholders, alt text, button text, contact links
**Plans**: TBD

## Progress

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. i18n Foundation | 0/2 | Planning complete | - |
| 2. Component Integration | 0/0 | Not started | - |
| 3. Polish & Validation | 0/0 | Not started | - |
