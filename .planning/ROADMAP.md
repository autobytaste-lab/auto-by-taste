# Roadmap: v1.0 - High-Tech Landing Page Refactor

**Created:** 2026-03-05
**Milestone:** v1.0

## Phase Overview

| Phase | Goal | Requirements | Est. Complexity |
|-------|------|--------------|-----------------|
| 1 | Foundation & Particles | R1, R2 | MEDIUM |
| 2 | Mac Hardware Data | R3 (data), R4 | MEDIUM |
| 3 | Interactive Mac Selector | R3 (UI) | MEDIUM-HIGH |
| 4 | Apple Silicon Education | R5 | MEDIUM |
| 5 | Performance Visualization | R6 | MEDIUM |
| 6 | Mobile Polish & Testing | R7 | MEDIUM |

---

### Phase 1: Foundation & Particles

**Goal:** Implement particle background system and enhance glassmorphism UI

**Plans:** 2 plans (2 complete)

Plans:
- [x] 01-01-PLAN.md — Install tsParticles, create particle system components with neural network configuration
- [x] 01-02-PLAN.md — Enhance glassmorphism UI, define z-index hierarchy, verify particle + glass layering

---

### Phase 2: Mac Hardware Data

**Goal:** Create structured data for Mac models and AI compatibility

**Requirements:** [R3, R4]

**Plans:** 2 plans

Plans:
- [ ] 02-01-PLAN.md — Create TypeScript data layer (chips, macModels, aiModels, compatibility function)
- [ ] 02-02-PLAN.md — Build ChipComparison component with Recharts visualization

**Success Criteria:**
- All Mac models from 2020+ covered
- All M-series chips with accurate specs
- 10+ AI models with realistic RAM requirements
- Chip comparison renders correctly

**Risks:**
- Spec inaccuracies -> verify against Apple official specs
- Too many models -> group by category

---

## Phase 3: Interactive Mac Selector

**Goal:** Build user-facing Mac selection interface

**Requirements Covered:**
- R3: Mac Model Selector (UI layer)

**Tasks:**
1. Design Mac selector layout (cards grouped by chip)
2. Build MacSelector component with visual cards
3. Add RAM tier selection for each Mac
4. Display compatible AI models after selection
5. Show key specs for selected Mac
6. Add animations for selection state changes
7. Implement mobile-friendly layout
8. Vietnamese language labels

**Success Criteria:**
- User can select Mac in 2-3 taps
- Compatible AI models update immediately
- Specs display clearly
- Works on mobile touch screens
- All text in Vietnamese

**Risks:**
- Too many options -> group and filter intelligently
- Touch targets too small -> ensure 48px minimum

---

## Phase 4: Apple Silicon Education

**Goal:** Explain Unified Memory Architecture for non-technical audience

**Requirements Covered:**
- R5: Unified Memory Architecture Explainer

**Tasks:**
1. Design UMA diagram concept
2. Build SVG or Canvas visualization
3. Add memory bandwidth comparisons
4. Write Vietnamese educational copy
5. Add subtle animations (framer-motion optional)
6. Link to Mac selector context
7. Test readability on mobile

**Success Criteria:**
- Non-technical users understand UMA benefit
- Bandwidth numbers displayed clearly
- Diagram responsive on all screens
- Copy in Vietnamese

**Risks:**
- Overly technical -> simplify language
- Animation too heavy -> keep subtle or static

---

## Phase 5: Performance Visualization

**Goal:** Display AI model performance benchmarks by Mac

**Requirements Covered:**
- R6: Performance Data Display

**Tasks:**
1. Gather/estimate benchmark data (tokens/second)
2. Structure performance data by Mac + AI model
3. Extend or create performance chart component
4. Add task categories (chat, coding, vision)
5. Include real-world context examples
6. Connect to Mac selector (updates on selection)
7. Test chart readability on mobile

**Success Criteria:**
- Performance data displays correctly
- Updates when Mac selection changes
- Charts readable on small screens
- Real-world context helps users understand

**Risks:**
- Benchmark data inaccurate -> use estimates with disclaimers
- Charts too complex -> simplify to key metrics

---

## Phase 6: Mobile Polish & Testing

**Goal:** Ensure all features work well on mobile devices

**Requirements Covered:**
- R7: Mobile Optimization

**Tasks:**
1. Test particle performance on real Android device
2. Test particle performance on real iOS device
3. Verify glass effects on mid-range devices
4. Test Mac selector touch interactions
5. Verify chart readability on small screens
6. Profile scroll performance with DevTools
7. Fix any performance issues discovered
8. Final Lighthouse audit

**Success Criteria:**
- FPS > 50 during scroll on mid-range mobile
- No touch delay on Mac selector
- Charts readable without zooming
- Lighthouse Performance > 85

**Risks:**
- Performance issues late -> may need to reduce particle counts further
- Device-specific bugs -> test on multiple devices

---

## Milestone Success Criteria

| Metric | Target | Measurement |
|--------|--------|-------------|
| Lighthouse Performance (mobile) | > 85 | PageSpeed Insights |
| LCP | < 2.5s on 3G | Lighthouse |
| Bundle size increase | < 150KB gzipped | webpack-bundle-analyzer |
| FPS during scroll | > 50 fps | Chrome DevTools |
| All requirements complete | 7/7 | Checklist |

## Requirement Coverage

| Requirement | Phase(s) |
|-------------|----------|
| R1: Particle Background | Phase 1 |
| R2: Glassmorphism UI | Phase 1 |
| R3: Mac Model Selector | Phase 2, Phase 3 |
| R4: Chip Comparison | Phase 2 |
| R5: UMA Explainer | Phase 4 |
| R6: Performance Data | Phase 5 |
| R7: Mobile Optimization | Phase 6 |

---
*Roadmap for Auto By Taste v1.0 milestone*
