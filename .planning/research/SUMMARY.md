# Project Research Summary

**Project:** AI-Local Hub Landing Page v2.0 -- Animated Apple Silicon Chip Diagram (Hero Section)
**Domain:** Animated SVG data visualization for marketing landing page (React 19 brownfield)
**Researched:** 2026-03-07
**Confidence:** HIGH

## Executive Summary

This project adds an animated SVG chip diagram to the Hero section of an existing React 19 + TypeScript + Vite + Tailwind CSS landing page. The diagram visualizes Apple M4 family silicon (M4, M4 Pro, M4 Max) with glowing cores, flowing data paths, and counting-up spec numbers. Research unanimously concludes that **zero new dependencies are needed** -- CSS `@keyframes` and two small custom React hooks (`useCountUp`, `useInView`) cover every animation requirement. The existing chip data layer (`components/data/chips.ts`) already contains all M4 specs except a TOPS field that needs adding.

The recommended architecture is a **composed inline SVG** pattern: one parent `ChipDiagram` component manages chip selection state and renders a root SVG element that coordinates approximately 9 child components (CoreGrid, GPUBlock, NeuralEngineBlock, MemoryBus, SpecLabel, DataFlowPaths, ChipSelector). Each child owns its SVG geometry and references shared CSS animation classes defined in `index.html`. This follows established React SVG patterns and keeps each component under 100 lines and independently testable.

The primary risks are **mobile SVG rendering performance** (too many animated DOM nodes or non-compositor property animations causing jank) and **missing accessibility support** (prefers-reduced-motion must be built in from day one, not retrofitted). Both are well-understood and preventable: keep SVG element count under 100, animate only `opacity` and `transform`, and wire up IntersectionObserver before adding individual animations. A secondary risk is Tailwind CDN not generating dynamic SVG classes -- SVG components must use inline styles or CSS custom properties for fills and strokes.

## Key Findings

### Recommended Stack

No new packages. All animation capabilities use browser-native APIs and the existing React/TypeScript stack. See `.planning/research/STACK.md` for full evaluation of rejected libraries.

**Core technologies:**
- **CSS `@keyframes`:** Glowing cores, flowing data paths, memory shimmer -- GPU-accelerated, zero bundle cost
- **Custom `useCountUp` hook (~25 lines):** Counting-up spec numbers via `requestAnimationFrame` -- replaces 33KB react-countup
- **Native `IntersectionObserver` (~15 lines):** Scroll-triggered animation start -- replaces 8KB react-intersection-observer
- **Inline SVG in JSX:** Full React control over data-driven rendering, type-safe props, CSS class targeting
- **Existing `chips.ts` data layer:** M4 family specs already present; filter by `generation: 'M4'`

**Explicitly rejected:** Motion/Framer Motion (34KB+), GSAP (25KB+), react-countup (33KB), react-spring (18KB+), Three.js/WebGL (ruled out by PROJECT.md), d3 (overkill for known-layout diagram).

### Expected Features

See `.planning/research/FEATURES.md` for full feature landscape, prioritization matrix, and verified Apple specs.

**Must have (table stakes -- P1):**
- SVG chip block diagram with labeled CPU/GPU/Neural Engine/Memory sections
- Chip variant selector (M4 / M4 Pro / M4 Max) updating the diagram
- Count-up number animations triggered on scroll-into-view
- Hero layout redesign with new headline, subtext, CTAs
- Responsive design (diagram readable at 320px mobile)
- TOPS field added to Chip type and data (prerequisite for Neural Engine display)

**Should have (differentiators -- P2):**
- Animated glowing cores (CSS opacity pulse, different colors for P-cores vs E-cores)
- Flowing data path animations (SVG stroke-dashoffset)
- Scroll-triggered entrance (diagram builds as user scrolls in)
- Tier-to-product mapping (chip variant selection shows corresponding product tier)

**Defer (out of scope):**
- i18n for hero text (PROJECT.md defers)
- 3D rendering (PROJECT.md rules out)
- Real benchmark data (marketing specs sufficient)
- Chip comparison slider (already handled by existing ChipComparison component)
- Sound effects, hover tooltips, auto-cycling variants (anti-features per research)

### Architecture Approach

The architecture follows a composed inline SVG component tree rooted in `ChipDiagram.tsx`, with clear single-responsibility boundaries. See `.planning/research/ARCHITECTURE.md` for full component hierarchy, data flow diagrams, and suggested build order.

**Major components:**
1. **ChipDiagram.tsx** -- Parent container; holds selected chip state (`useState`), filters M4 chips from data layer, renders selector and SVG
2. **ChipSVG.tsx** -- Root `<svg>` with responsive `viewBox="0 0 600 400"`; positions child groups via `<g transform>`
3. **CoreGrid.tsx / GPUBlock.tsx / NeuralEngineBlock.tsx** -- Individual chip block visualizations; data-driven rendering from props (loop over core counts to render rects)
4. **MemoryBus.tsx** -- Unified memory band with flowing gradient animation showing bandwidth
5. **SpecLabel.tsx** -- Reusable animated spec number display using `useCountUp` hook
6. **DataFlowPaths.tsx** -- SVG `<path>` elements with animated `stroke-dashoffset` between blocks
7. **ChipSelector.tsx** -- HTML tab buttons (not SVG) for M4/Pro/Max switching
8. **hooks/useCountUp.ts** -- `requestAnimationFrame` count-up with ease-out cubic
9. **Hero.tsx (modified)** -- Remove old static ChipCard grid (~120 lines deleted), import and render ChipDiagram

**Key architectural decision:** Use React `key={selectedChip.id}` on ChipSVG to force remount on chip switch, restarting all CSS animations and count-up hooks cleanly. This is simpler than managing animation reset state across all children.

### Critical Pitfalls

See `.planning/research/PITFALLS.md` for full analysis with code examples, warning signs, and recovery strategies.

1. **Non-compositor SVG property animation causes jank** -- Animate only `opacity` and `transform`, never `fill`/`stroke`/`d`. Use opacity overlays for glow effects instead of color transitions. Decide before implementation; retrofitting is cheap (CSS-only change) but must be deliberate.
2. **Missing prefers-reduced-motion violates WCAG 2.1** -- Add CSS media query blanket disable AND a `useReducedMotion()` hook for JS animations. Build in from day one; adding later requires touching every animation definition.
3. **SVG DOM complexity overwhelms mobile** -- Keep element count under 100. Represent core groups abstractly (one rect labeled "40 GPU Cores") rather than drawing 40 individual elements. Test on actual iOS devices, not just Chrome emulation.
4. **Animations running off-screen waste resources** -- Wire up IntersectionObserver before adding animations. Add animation CSS classes only when visible. This is a LOW recovery cost if missed.
5. **Tailwind CDN does not generate dynamic SVG classes** -- SVG elements cannot use dynamic Tailwind classes like `fill-blue-500` because the CDN scans HTML at load time. Use inline `style` attributes or CSS custom properties for SVG fills/strokes.

## Implications for Roadmap

Based on research, the work splits into 3 phases following the dependency graph in ARCHITECTURE.md and the MVP definition in FEATURES.md.

### Phase 1: Data Layer + Hooks + CSS Foundation

**Rationale:** These are leaf dependencies with zero coupling to each other. Everything downstream depends on them. They are independently testable and low-risk.
**Delivers:** TOPS field in data layer, `useCountUp` hook, `useInView` hook, `useReducedMotion` hook, CSS `@keyframes` definitions (core-glow, data-flow, memory-shimmer, neural-pulse) added to `index.html`
**Addresses:** TOPS data gap (FEATURES P1), animation infrastructure, accessibility foundation
**Avoids:** Pitfall #2 (reduced-motion built in from start), Pitfall #5 (no library dependency), Pitfall #6 (IntersectionObserver ready)

### Phase 2: SVG Component Build (Static + Animated)

**Rationale:** With hooks and CSS ready, build SVG components bottom-up: leaf blocks first (CoreGrid, GPUBlock, NeuralEngineBlock, MemoryBus, SpecLabel, DataFlowPaths), then compose into ChipSVG, add ChipSelector, wrap in ChipDiagram. Leaf blocks (steps 4-8 in ARCHITECTURE.md build order) can be built in parallel since they have zero interdependencies.
**Delivers:** Complete animated chip diagram component with variant selection, responsive viewBox, count-up numbers, glow/flow animations
**Addresses:** All FEATURES P1 items (diagram, selector, count-up, responsive) plus P2 items (glow, flow, entrance)
**Avoids:** Pitfall #1 (compositor-only properties baked into CSS), Pitfall #3 (element count budgeted during SVG design), Pitfall #4 (viewBox responsive from start)

### Phase 3: Hero Integration + Polish

**Rationale:** Integration is the final step -- remove old ChipCard grid from Hero.tsx (~120 lines), insert ChipDiagram, verify layout at all breakpoints, test on mobile, run accessibility checks. Polish items layer on top.
**Delivers:** Redesigned Hero section with animated chip diagram live on the page
**Addresses:** Hero layout redesign (FEATURES P1), tier-to-product mapping (FEATURES P2)
**Avoids:** Integration gotchas (tsParticles z-index conflicts, Tailwind CDN dynamic class issue), Pitfall #4 (mobile layout verified on real devices)

### Phase Ordering Rationale

- **Dependency-driven:** Hooks and CSS must exist before SVG components can use them. SVG components must exist before Hero can integrate them.
- **Risk-front-loaded:** Accessibility (reduced-motion) and performance (compositor-only animations) decisions are locked in Phase 1, preventing costly Phase 2/3 retrofits.
- **Parallel-friendly:** Phase 2 leaf components (CoreGrid, GPUBlock, NeuralEngineBlock, MemoryBus, SpecLabel, DataFlowPaths) have zero dependencies on each other and can be built simultaneously.
- **Pitfall-aware:** Every critical pitfall is addressed in the phase where prevention is cheapest, not where symptoms appear.

### Research Flags

Phases likely needing deeper research during planning:
- **Phase 2 (SVG Component Build):** SVG layout coordinates (block positions, sizes, path geometry within the viewBox) require visual design decisions not covered by this research. Implementation will need iterative visual tuning or a reference mockup. The exact coordinate system and element positioning cannot be determined from research alone.

Phases with standard patterns (skip research-phase):
- **Phase 1 (Data + Hooks + CSS):** All patterns are well-documented browser standards with HIGH confidence. useCountUp, useInView, useReducedMotion, and CSS @keyframes are established React patterns.
- **Phase 3 (Hero Integration):** Straightforward component swap. The existing Hero.tsx structure is understood; removing ChipCard and adding ChipDiagram is mechanical integration work.

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | Zero dependencies needed; all techniques are browser-native standards with extensive documentation. No version risk. |
| Features | MEDIUM-HIGH | Apple specs verified from official newsroom sources (May/Oct 2024). Visual pattern analysis based on Apple marketing pages and industry examples. |
| Architecture | HIGH | Composed inline SVG is the standard React pattern. Component hierarchy follows single-responsibility principles. Build order verified against dependency graph. |
| Pitfalls | HIGH | Based on MDN documentation, WCAG 2.1 standards, Chrome DevRel performance guidance, and established SVG performance patterns. |

**Overall confidence:** HIGH

### Gaps to Address

- **SVG visual layout design:** Research covers what to build and how, but not exact pixel coordinates for chip block positions within the 600x400 viewBox. This requires visual iteration during Phase 2 implementation or a designer-provided mockup.
- **TOPS field addition:** Trivial code change (add `tops: number` to Chip type, set to 38 for all M4 variants) but is a hard prerequisite for Phase 2 Neural Engine display.
- **Mobile Safari SVG rendering:** Research flags this as a risk. Must test on actual iOS device, not just Chrome DevTools emulation. Budget time for this in Phase 3 verification.
- **Tailwind CDN dynamic class limitation:** SVG components must use inline styles or CSS custom properties for fills/strokes. This constraint must be communicated clearly in Phase 2 task planning so developers do not waste time debugging missing styles.
- **Existing Hero.tsx complexity:** The current Hero component is ~220 lines with inline ChipCard definitions, agent layer content, and multiple sections. The integration in Phase 3 involves significant deletion and restructuring, not just adding a component.

## Sources

### Primary (HIGH confidence)
- [Apple M4 Newsroom (May 2024)](https://www.apple.com/newsroom/2024/05/apple-introduces-m4-chip/) -- M4 base specs
- [Apple M4 Pro/Max Newsroom (Oct 2024)](https://www.apple.com/newsroom/2024/10/apple-introduces-m4-pro-and-m4-max/) -- M4 Pro/Max specs
- [MDN CSS/JS Animation Performance](https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/CSS_JavaScript_animation_performance) -- compositor vs main thread
- [Chrome DevRel Hardware-Accelerated Animations](https://developer.chrome.com/blog/hardware-accelerated-animations) -- GPU compositing
- [CSS-Tricks requestAnimationFrame with React Hooks](https://css-tricks.com/using-requestanimationframe-with-react-hooks/) -- useCountUp pattern
- [Smashing Magazine GPU Animation](https://www.smashingmagazine.com/2016/12/gpu-animation-doing-it-right/) -- compositor-only properties

### Secondary (MEDIUM confidence)
- [SVG Animation Encyclopedia 2025](https://www.svgai.org/blog/research/svg-animation-encyclopedia-complete-guide) -- comprehensive technique reference
- [Josh Comeau prefers-reduced-motion in React](https://www.joshwcomeau.com/react/prefers-reduced-motion/) -- accessibility hook pattern
- [Strapi Mastering React SVG](https://strapi.io/blog/mastering-react-svg-integration-animation-optimization) -- inline SVG component patterns
- [LogRocket SVG CSS Animation Tutorial](https://blog.logrocket.com/how-to-animate-svg-css-tutorial-examples/) -- stroke-dashoffset patterns
- [LogRocket React Animation Library Comparison 2026](https://blog.logrocket.com/best-react-animation-libraries/) -- bundle size comparison
- [Pope Tech Accessible Animation 2025](https://blog.pope.tech/2025/12/08/design-accessible-animation-and-movement/) -- WCAG compliance

---
*Research completed: 2026-03-07*
*Ready for roadmap: yes*
