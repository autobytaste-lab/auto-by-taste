# Requirements: AI-Local Hub i18n

**Defined:** 2026-03-07
**Core Value:** Visitors can understand the AI-Local Hub offering and contact the founder — in their preferred language (English or Vietnamese)

## v1 Requirements

Requirements for English/Vietnamese internationalization. Each maps to roadmap phases.

### Translation Infrastructure

- [ ] **I18N-01**: English translation files exist with all content from 9 components
- [ ] **I18N-02**: Vietnamese translation files exist with all existing content preserved
- [ ] **I18N-03**: Translation files use type-safe TypeScript structure preventing key mismatches
- [ ] **I18N-04**: I18n Context provides language state management via React Context API
- [ ] **I18N-05**: Language preference persists in localStorage across browser sessions
- [ ] **I18N-06**: HTML lang attribute syncs with current language for SEO/accessibility

### User-Facing Features

- [ ] **UX-01**: English displays as default language on first visit
- [ ] **UX-02**: Language switcher (EN | VI toggle buttons) appears in navbar
- [ ] **UX-03**: Clicking language toggle switches all content immediately
- [ ] **UX-04**: Active language button shows visual feedback (styling)
- [ ] **UX-05**: All 9 components display content in selected language

### Content Quality

- [ ] **CONT-01**: All translatable strings extracted from components (text, aria-labels, placeholders, alt text)
- [ ] **CONT-02**: English translations are accurate and professional
- [ ] **CONT-03**: Vietnamese content matches existing page content exactly
- [ ] **CONT-04**: Responsive layouts accommodate Vietnamese text expansion (30-40% longer)

## v2 Requirements

Deferred to future release. Tracked but not in current roadmap.

### Enhanced Features

- **ENH-01**: Browser language detection (auto-detect Vietnamese for VI users)
- **ENH-02**: Type-safe translation keys (TypeScript enforcement prevents typos)
- **ENH-03**: Number/currency formatting for pricing tiers (Intl.NumberFormat)
- **ENH-04**: Build-time validation script ensuring EN/VI key synchronization
- **ENH-05**: Trans component for mixed content (embedded links in translations)

## Out of Scope

Explicitly excluded. Documented to prevent scope creep.

| Feature | Reason |
|---------|--------|
| Additional languages beyond EN/VI | Not needed for current market |
| CMS for content management | Hardcoded translations sufficient for static landing page |
| Server-side language detection | localStorage simpler, no backend needed |
| URL-based routing (/en/, /vi/) | Adds significant complexity, localStorage is sufficient |
| Heavy i18n libraries (react-i18next, react-intl) | 22+ KB bundle overhead, overkill for 2 languages |
| Lazy loading translations | 2 languages with small files, unnecessary overhead |
| Namespace splitting | 9 components don't need organization overhead |
| Pluralization rules | Not displaying counts on landing page |
| Date formatting | Not needed for marketing content |

## Traceability

Which phases cover which requirements. Updated during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| I18N-01 | Phase 1 | Pending |
| I18N-02 | Phase 1 | Pending |
| I18N-03 | Phase 1 | Pending |
| I18N-04 | Phase 1 | Pending |
| I18N-05 | Phase 1 | Pending |
| I18N-06 | Phase 1 | Pending |
| UX-01 | Phase 2 | Pending |
| UX-02 | Phase 2 | Pending |
| UX-03 | Phase 2 | Pending |
| UX-04 | Phase 2 | Pending |
| UX-05 | Phase 2 | Pending |
| CONT-01 | Phase 1 | Pending |
| CONT-02 | Phase 3 | Pending |
| CONT-03 | Phase 1 | Pending |
| CONT-04 | Phase 3 | Pending |

**Coverage:**
- v1 requirements: 14 total
- Mapped to phases: 14
- Unmapped: 0 ✓

---
*Requirements defined: 2026-03-07*
*Last updated: 2026-03-07 after initial definition*
