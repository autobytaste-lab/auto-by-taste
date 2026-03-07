# AI-Local Hub Landing Page

## What This Is

A marketing landing page for AI-Local Hub, a Vietnamese startup selling local AI solutions running on Mac Mini M4 hardware. The page presents the company's value proposition, product tiers, business model, and investment opportunity to potential customers and investors.

## Core Value

Visitors can understand the AI-Local Hub offering and contact the founder — in their preferred language (English or Vietnamese).

## Requirements

### Validated

<!-- Shipped and confirmed valuable. -->

- ✓ Hero section with main value proposition and CTA buttons — existing
- ✓ Problem/Solution section explaining the AI gap — existing
- ✓ Target segments section showing 3 market verticals — existing
- ✓ Product tiers section with 3 pricing options — existing
- ✓ Business model section explaining revenue streams — existing
- ✓ Strategy section with go-to-market approach — existing
- ✓ Funding section with pie chart visualization — existing
- ✓ Navigation bar with section anchors — existing
- ✓ Footer with contact links (Zalo, WhatsApp, phone) — existing
- ✓ Responsive design for mobile/tablet/desktop — existing

### Active

<!-- Current scope. Building toward these. -->

- [ ] English translation of all page content
- [ ] Language switcher (EN | VI toggle buttons) in navbar
- [ ] English as default language on first visit
- [ ] Language preference persisted in localStorage
- [ ] Vietnamese content preserved and accessible via toggle

### Out of Scope

- Backend/API integration — static site only
- Additional languages beyond EN/VI — not needed now
- CMS for content management — hardcoded translations sufficient
- Server-side language detection — localStorage is simpler

## Context

This is a brownfield project adding internationalization to an existing React landing page. The current implementation has all content hardcoded in Vietnamese across 9 component files. The i18n solution needs to:

1. Extract all translatable strings from components
2. Create translation files for EN and VI
3. Add a language context/provider for state management
4. Update components to use translated strings
5. Add toggle UI to navbar

Technical environment: React 19 + TypeScript + Vite + Tailwind CSS (CDN)

## Constraints

- **Tech stack**: Must use existing React/TypeScript/Vite setup
- **No new dependencies preferred**: Consider React Context over i18n libraries if sufficient
- **Bundle size**: Keep additions minimal (landing page should load fast)
- **SEO**: Consider lang attribute on html element for search engines

## Key Decisions

<!-- Decisions that constrain future work. Add throughout project lifecycle. -->

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| EN | VI toggle buttons in navbar | User preference for inline buttons over dropdown | — Pending |
| localStorage for persistence | Simpler than cookies, no backend needed | — Pending |
| Translate content myself | User doesn't have translations ready | — Pending |

---
*Last updated: 2026-03-07 after initialization*
