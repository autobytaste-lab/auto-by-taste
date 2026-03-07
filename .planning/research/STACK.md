# Technology Stack - Hero Apple Silicon Chip Diagram

**Project:** AI-Local Hub Landing Page v2.0
**Researched:** 2026-03-07
**Context:** Adding animated SVG chip diagram with glowing cores, flowing data paths, and counting-up spec numbers to the Hero section of an existing React 19 + TypeScript + Vite + Tailwind CSS landing page.

## Decision: CSS Animations + Custom React Hooks (Zero New Dependencies)

### Why Not Add an Animation Library

The project constraints are explicit: "SVG animations preferred over heavy libraries" and "Bundle size: Keep additions minimal." The animations required (glowing cores, flowing data paths, counting numbers) are all achievable with CSS `@keyframes` and a small custom React hook for number counting. Adding a library would be premature.

**Motion (formerly Framer Motion) was evaluated and rejected:**

| Factor | Motion Library | CSS + Custom Hooks |
|--------|---------------|-------------------|
| Bundle size | ~34kb min, ~4.6kb with LazyMotion | 0kb added |
| Glowing cores | `animate={{ opacity }}` | `@keyframes glow` with `filter: drop-shadow()` |
| Flowing data paths | `motion.path` with `pathLength` | `stroke-dashoffset` animation via CSS |
| Counting numbers | `AnimateNumber` component (2.5kb) | `useCountUp` custom hook (~30 lines) |
| SVG element animation | `motion.circle`, `motion.rect` | CSS classes on SVG elements |
| Intersection Observer | Not included (separate concern) | Native `IntersectionObserver` API |
| Learning curve | Library-specific API | Standard CSS + React patterns |

**Verdict:** Every animation in scope maps to a well-supported CSS technique. Motion would add bundle weight for capabilities we do not need (spring physics, gesture detection, layout animation, drag). If animations later require orchestrated sequences or spring physics, Motion can be added incrementally -- but start without it.

**Confidence:** HIGH -- CSS SVG animations are a browser standard. The techniques (stroke-dashoffset, filter animations, opacity/transform keyframes) are GPU-accelerated and widely documented.

---

## Recommended Stack

### Animation Layer (Zero Dependencies)

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| CSS `@keyframes` | Browser native | Glowing cores, pulsing effects | GPU-accelerated (transform, opacity, filter), zero bundle cost, already used in project (see `animate-pulse`, `animate-float`) |
| CSS `stroke-dashoffset` | Browser native | Flowing data path animations | Standard SVG line animation technique, hardware accelerated, no JS needed |
| CSS `filter: drop-shadow()` | Browser native | Glow effects on SVG elements | Native SVG filter, animatable via keyframes, performant |
| Custom `useCountUp` hook | React 19 built-in | Counting-up spec numbers | ~30 lines, uses `requestAnimationFrame`, no dependency needed |
| `IntersectionObserver` API | Browser native | Trigger animations on scroll-into-view | Native API, prevents animations running offscreen, already well-supported |
| `prefers-reduced-motion` | Browser native | Accessibility: disable animations | Already used in particle system (`particleConfig.ts`), apply same pattern |

### SVG Component Layer (Zero Dependencies)

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Inline SVG in JSX | React 19 | Chip diagram rendering | Full control over SVG elements, class-based animation targets, type-safe props |
| TypeScript interfaces | ~5.8.2 (existing) | Chip data typing | Existing `Chip` type in `components/data/types.ts` has all needed fields (cpuCores, gpuCores, neuralEngineCores, memoryBandwidth, maxMemory) |
| Tailwind CSS utilities | CDN (existing) | Layout, colors, responsive | Already handles responsive design, `group-hover` states, color utilities |

### Data Layer (Already Exists)

| Technology | Location | Purpose | Reuse |
|------------|----------|---------|-------|
| `chips.ts` | `components/data/chips.ts` | M4 family chip specs | Filter by `generation: 'M4'` to get M4, M4 Pro, M4 Max |
| `types.ts` | `components/data/types.ts` | `Chip` interface | Has `cpuCores.performance`, `cpuCores.efficiency`, `gpuCores`, `neuralEngineCores`, `memoryBandwidth`, `maxMemory` |

---

## Implementation Patterns

### 1. Glowing Cores (CSS Keyframes)

```css
@keyframes core-glow {
  0%, 100% { filter: drop-shadow(0 0 2px rgba(96, 165, 250, 0.4)); opacity: 0.7; }
  50% { filter: drop-shadow(0 0 8px rgba(96, 165, 250, 0.8)); opacity: 1; }
}

.core-glow {
  animation: core-glow 2s ease-in-out infinite;
}
```

Performance note: `filter` and `opacity` are compositor-thread properties -- GPU-accelerated, no layout thrashing.

### 2. Flowing Data Paths (stroke-dashoffset)

```css
@keyframes data-flow {
  from { stroke-dashoffset: 100; }
  to { stroke-dashoffset: 0; }
}

.data-path {
  stroke-dasharray: 8 12;
  animation: data-flow 1.5s linear infinite;
}
```

This creates the appearance of data "flowing" along SVG path lines. No JS required.

### 3. Counting-Up Numbers (Custom Hook)

```typescript
function useCountUp(end: number, duration: number = 1500, trigger: boolean = true): number {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!trigger) return;
    let startTime: number;
    let rafId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // Ease-out cubic for natural deceleration
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * end));
      if (progress < 1) rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [end, duration, trigger]);

  return count;
}
```

~25 lines. Uses `requestAnimationFrame` for smooth 60fps. Easing built-in. Trigger parameter pairs with IntersectionObserver.

### 4. Scroll-Triggered Animations (IntersectionObserver)

```typescript
function useInView(ref: RefObject<Element>, options?: IntersectionObserverInit): boolean {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.3, ...options }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, options]);

  return inView;
}
```

Triggers counting animations and entrance effects only when the chip diagram scrolls into view. One-shot (sets true, never resets) so numbers don't re-animate on scroll.

### 5. Reduced Motion Respect

```typescript
// Reuse pattern from existing particleConfig.ts
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// In component: skip animations, show final state immediately
const count = prefersReducedMotion ? end : useCountUp(end, 1500, inView);
```

---

## What NOT to Add

| Library | Why Not |
|---------|---------|
| `motion` (Framer Motion) | 34kb+ for features we don't need (springs, gestures, drag, layout). CSS covers all required animations. Revisit only if orchestrated multi-step sequences become necessary. |
| `react-countup` / `countup.js` | 33.5kb for a wrapper around counting logic. A 25-line hook does the same thing. |
| `use-count-up` | 3kb but last published 4 years ago (v3.0.1). Stale dependency risk for trivial functionality. |
| `GSAP` | 25kb+ core, commercial license concerns, vastly overpowered for this use case. |
| `react-spring` | 18kb+, spring physics not needed for these animation types. |
| `anime.js` | 17kb, no React integration, manual DOM manipulation conflicts with React's model. |
| `Lottie` / `react-lottie` | For After Effects exports. We're building SVG from data, not importing pre-made animations. |
| `Three.js` / `react-three-fiber` | Explicitly out of scope per PROJECT.md: "3D chip rendering (WebGL/Three.js) -- too heavy for landing page." |
| `d3` | Overkill for static chip diagram layout. SVG positions are known at design time, not data-driven layout. |

---

## Alternatives Considered

| Category | Recommended | Alternative | Why Not |
|----------|-------------|-------------|---------|
| Core animation | CSS @keyframes | Motion library | Zero bundle cost, GPU-accelerated, sufficient for all required effects |
| Number counting | Custom `useCountUp` hook | react-countup | 25 lines vs 33.5kb dependency for identical result |
| Scroll trigger | Native IntersectionObserver | react-intersection-observer | 8kb for a 15-line hook equivalent |
| SVG rendering | Inline JSX SVG | react-svg / SVG sprites | Inline gives full animation control, type-safe props, no extra tooling |
| Glow effects | CSS `filter: drop-shadow()` | SVG `<feGaussianBlur>` filter | CSS filter is simpler, animatable via keyframes, same visual result |

---

## Integration Points with Existing Stack

### Chip Data Reuse
The existing `components/data/chips.ts` already has M4 family data (m4-base, m4-pro, m4-max) with all needed fields. Filter with:
```typescript
import { chips } from './data/chips';
const m4Family = chips.filter(c => c.generation === 'M4');
```

### Tailwind CSS Integration
Animations defined as Tailwind `@keyframes` extensions in `index.html` `<style>` block (existing pattern -- see `animate-float` already defined there). New keyframes (`core-glow`, `data-flow`, `fade-in-up`) follow the same pattern.

### Accessibility Pattern Reuse
`getPrefersReducedMotion()` from `components/particles/particleConfig.ts` already implements the reduced-motion check. Extract to shared utility or duplicate the one-liner in the chip diagram component.

### Testing with Vitest
Custom hooks (`useCountUp`, `useInView`) are pure logic -- testable with `@testing-library/react` `renderHook`. CSS animations tested via class presence assertions. Existing test infrastructure (Vitest + jsdom + Testing Library) handles all of this.

---

## Installation

```bash
# No new packages needed.
# All capabilities use browser-native APIs and existing React/TypeScript.
```

---

## Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| CSS animations insufficient for complex orchestration | Low | Medium | Motion library can be added later as escape hatch. Current scope doesn't require orchestration. |
| SVG diagram performance on mobile | Medium | High | Use `will-change: transform` sparingly, reduce animation count on mobile (reuse particle system's device detection), test on real devices |
| `filter: drop-shadow()` performance with many elements | Low | Medium | Limit simultaneous glowing elements to ~16 (one per core block), stagger animations |
| IntersectionObserver browser support | Very Low | Low | Supported in all browsers since 2019. No polyfill needed. |

---

## Sources

- [Motion (Framer Motion) bundle size docs](https://motion.dev/docs/react-reduce-bundle-size) -- LazyMotion reduces to 4.6kb, but still non-zero for unneeded features
- [Motion npm package](https://www.npmjs.com/package/motion) -- v12.35.0, renamed from framer-motion
- [Motion AnimateNumber](https://motion.dev/docs/react-animate-number) -- 2.5kb component, alternative if hook approach proves insufficient
- [SVG Animation Encyclopedia 2025](https://www.svgai.org/blog/research/svg-animation-encyclopedia-complete-guide) -- comprehensive SVG animation techniques reference
- [LogRocket SVG CSS Animation Tutorial](https://blog.logrocket.com/how-to-animate-svg-css-tutorial-examples/) -- stroke-dashoffset and filter animation patterns
- [use-count-up npm](https://www.npmjs.com/package/use-count-up) -- v3.0.1, last published 4 years ago (rejected: stale)
- [react-countup npm](https://www.npmjs.com/package/react-countup) -- wrapper around CountUp.js, 33.5kb (rejected: heavy)
