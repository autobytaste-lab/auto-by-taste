# Phase 3: Animation Infrastructure - Research

**Researched:** 2026-03-08
**Domain:** Custom React hooks (useCountUp, useInView, useReducedMotion), CSS keyframe animations, chip data extension
**Confidence:** HIGH

## Summary

Phase 3 builds the animation primitives and accessibility guards that Phase 4 (SVG chip diagram) and Phase 5 (Hero integration) depend on. All deliverables are leaf dependencies with zero coupling to each other: a TOPS field addition to the chip data layer, three custom React hooks, and CSS keyframe definitions. No new packages are needed -- everything uses browser-native APIs (requestAnimationFrame, IntersectionObserver, matchMedia) and CSS @keyframes.

The existing codebase already has patterns to follow. The particle system in `components/particles/particleConfig.ts` has a `getPrefersReducedMotion()` function that detects the `prefers-reduced-motion` media query. The `index.html` `<style>` block already defines `@keyframes float` and `.animate-float`, establishing the pattern for adding new keyframes. The test infrastructure (Vitest + jsdom + @testing-library/react) supports hook testing via `renderHook`, though jsdom's lack of `matchMedia` is already handled by the mock in `test/setup.ts`.

The primary technical risk is testing animation hooks in jsdom, which has no real `requestAnimationFrame` timing or `IntersectionObserver`. Both require mocking. The existing `matchMedia` mock in `test/setup.ts` returns `matches: false` by default, which is correct for the non-reduced-motion path but must be overridden in tests that verify reduced-motion behavior.

**Primary recommendation:** Build three independent hooks + CSS keyframes + TOPS data field. All are independently testable, zero dependencies on each other, and each under 30 lines of implementation code.

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| CHIP-05 | TOPS field added to chip data layer for Neural Engine performance display | Add `tops: number` to `Chip` interface in `types.ts`, set to 38 for all M4 variants (verified via Apple newsroom). All existing chip data tests must pass with the new field. |
| A11Y-01 | Animations respect prefers-reduced-motion (static fallback when enabled) | `useReducedMotion` hook using `matchMedia('(prefers-reduced-motion: reduce)')` with live listener. CSS blanket disable via `@media (prefers-reduced-motion: reduce)` rule. Existing `getPrefersReducedMotion()` in particleConfig.ts provides the pattern. |
| A11Y-02 | All animations use compositor-only properties (opacity, transform) for GPU acceleration | CSS keyframes for core-glow, data-flow, memory-shimmer must animate only `opacity`, `transform`, and `stroke-dashoffset` (compositor-friendly for SVG). Never animate `fill`, `stroke`, `d`, or `filter`. |
| A11Y-04 | Animations trigger via IntersectionObserver (no off-screen animation waste) | `useInView` hook wrapping native `IntersectionObserver` API. One-shot trigger (sets true, never resets) to prevent re-animation on scroll. |
</phase_requirements>

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| CSS @keyframes | Browser native | core-glow, data-flow, memory-shimmer animations | Zero bundle cost, GPU-composited on opacity/transform, already used in project (animate-float) |
| requestAnimationFrame | Browser native | useCountUp number animation | Frame-accurate timing, auto-pauses when tab hidden, standard React hook pattern |
| IntersectionObserver | Browser native | useInView viewport detection | Supported since 2019 in all browsers, no polyfill needed, replaces scroll event listeners |
| matchMedia | Browser native | useReducedMotion accessibility detection | Already mocked in test/setup.ts, existing pattern in particleConfig.ts |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| @testing-library/react | ^16.3.2 (existing) | renderHook for hook testing | All three custom hooks |
| vitest | ^4.0.18 (existing) | Test runner | All tests in this phase |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Custom useCountUp | react-countup (33.5KB) | 25-line hook replaces entire dependency; react-countup is overkill |
| Custom useInView | react-intersection-observer (8KB) | 15-line hook replaces entire dependency; we need only one-shot boolean |
| Custom useReducedMotion | usehooks-ts | Single-purpose hook is simpler than adding a hooks library |

**Installation:**
```bash
# No new packages needed. All capabilities use browser-native APIs.
```

## Architecture Patterns

### Recommended Project Structure
```
components/
  hooks/
    useCountUp.ts          # requestAnimationFrame count-up animation
    useCountUp.test.ts     # hook unit tests
    useInView.ts           # IntersectionObserver wrapper
    useInView.test.ts      # hook unit tests
    useReducedMotion.ts    # prefers-reduced-motion detection
    useReducedMotion.test.ts # hook unit tests
  data/
    types.ts               # MODIFIED: add tops field to Chip interface
    chips.ts               # MODIFIED: add tops values to all chip entries
    __tests__/
      chips.test.ts        # MODIFIED: add TOPS field assertions
index.html                 # MODIFIED: add @keyframes + reduced-motion media query
```

### Pattern 1: Custom Hook with requestAnimationFrame
**What:** useCountUp animates a number from 0 to target using rAF with ease-out cubic timing
**When to use:** Any number that should count up when visible (spec labels in Phase 4)
**Example:**
```typescript
// Source: CSS-Tricks rAF + React hooks pattern, verified against project conventions
import { useState, useEffect, useRef } from 'react';

export function useCountUp(target: number, duration = 1200, trigger = true): number {
  const [current, setCurrent] = useState(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (!trigger) { setCurrent(0); return; }
    let start: number | null = null;

    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setCurrent(Math.round(target * eased));
      if (progress < 1) rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target, duration, trigger]);

  return current;
}
```

### Pattern 2: IntersectionObserver Hook (One-Shot)
**What:** useInView reports true once a target element enters viewport, never resets
**When to use:** Trigger animations only when diagram scrolls into view (A11Y-04)
**Example:**
```typescript
// Source: Native IntersectionObserver API, standard React pattern
import { useState, useEffect, type RefObject } from 'react';

export function useInView(ref: RefObject<Element | null>, threshold = 0.3): boolean {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect(); } },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, threshold]);

  return inView;
}
```

### Pattern 3: Reduced Motion Detection with Live Updates
**What:** useReducedMotion reactively tracks OS-level motion preference changes
**When to use:** Gate all JS-driven animations; CSS animations handled by media query
**Example:**
```typescript
// Source: Josh Comeau's prefers-reduced-motion pattern, adapted for project conventions
import { useState, useEffect } from 'react';

export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return reduced;
}
```

### Pattern 4: CSS Keyframes in index.html Style Block
**What:** Define animation keyframes alongside existing animate-float in index.html
**When to use:** All three required CSS animations (core-glow, data-flow, memory-shimmer)
**Example:**
```css
/* Added after existing .animate-float rule in index.html <style> block */

@keyframes core-glow {
  0%, 100% { opacity: 0.6; }
  50% { opacity: 1; }
}
.animate-core-glow {
  animation: core-glow 2s ease-in-out infinite;
}

@keyframes data-flow {
  to { stroke-dashoffset: -20; }
}
.animate-data-flow {
  stroke-dasharray: 8 4;
  animation: data-flow 1s linear infinite;
}

@keyframes memory-shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}
.animate-memory-shimmer {
  animation: memory-shimmer 3s ease-in-out infinite;
}

/* Accessibility: disable ALL animations when reduced motion preferred */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Anti-Patterns to Avoid
- **Animating fill/stroke/filter in keyframes:** Triggers CPU-bound repaints on every frame. Use opacity and transform only. (A11Y-02)
- **Two-way IntersectionObserver (toggle on/off):** Re-triggers count-up animation when user scrolls back. Use one-shot pattern that disconnects observer after first intersection.
- **Static reduced-motion check without listener:** User can change OS preference while page is open. Must listen for `change` event on the MediaQueryList.
- **Using setInterval for counting:** Unreliable timing, doesn't pause when tab hidden, doesn't respect reduced motion. Always use requestAnimationFrame.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Number animation | Full animation engine with spring physics | Simple rAF loop with ease-out cubic (~25 lines) | Spring physics not needed for linear count-up |
| Viewport detection | Scroll event listener with getBoundingClientRect | IntersectionObserver API (~15 lines) | Scroll listeners are main-thread-blocking, IO is async |
| Motion preference | Manual localStorage toggle | matchMedia('(prefers-reduced-motion: reduce)') | OS-level setting is the standard; users already know how to control it |
| CSS animation disable | Per-element animation-play-state toggling | Single @media (prefers-reduced-motion: reduce) rule | Blanket rule catches all current and future animations |

**Key insight:** Each of these problems has a browser-native solution that is simpler, more performant, and more accessible than any custom implementation.

## Common Pitfalls

### Pitfall 1: requestAnimationFrame Cleanup on Unmount
**What goes wrong:** Component unmounts while rAF callback is still scheduled. Callback fires and calls setState on unmounted component.
**Why it happens:** useEffect cleanup runs synchronously but rAF callback is async. If cleanup cancels the wrong ID (stale ref), the leak persists.
**How to avoid:** Store rAF ID in a ref (not state), cancel in useEffect cleanup. Always return cleanup function.
**Warning signs:** React warning "Can't perform a React state update on an unmounted component" (pre-React 18) or silent memory leak (React 18+).

### Pitfall 2: IntersectionObserver Options Object Causes Infinite Re-render
**What goes wrong:** Passing `{ threshold: 0.3 }` as inline object to useInView causes useEffect to re-run every render because object reference changes.
**Why it happens:** useEffect dependency comparison is by reference, not value.
**How to avoid:** Accept threshold as a primitive parameter (number), not an options object. Or memoize options with useMemo.
**Warning signs:** IntersectionObserver created/destroyed on every render cycle; performance degradation.

### Pitfall 3: jsdom Has No IntersectionObserver
**What goes wrong:** Tests fail with "IntersectionObserver is not defined" because jsdom does not implement it.
**Why it happens:** IntersectionObserver is a browser API not available in jsdom test environment.
**How to avoid:** Mock IntersectionObserver in test setup or per-test. Create a minimal mock that stores the callback and allows manual triggering.
**Warning signs:** ReferenceError in test output.

### Pitfall 4: matchMedia Mock Returns Wrong Default
**What goes wrong:** useReducedMotion tests always see `matches: false` because the global mock in test/setup.ts hardcodes it.
**Why it happens:** The existing mock in test/setup.ts returns `matches: false` for all queries. Tests for the reduced-motion-active path need to override this.
**How to avoid:** In tests that verify reduced-motion behavior, override `window.matchMedia` with a mock that returns `matches: true` for the `(prefers-reduced-motion: reduce)` query. Use `vi.spyOn` or direct property assignment.
**Warning signs:** Reduced-motion code path never tested; appears to work but actually never exercises the branch.

### Pitfall 5: TOPS Field Breaks Existing Tests
**What goes wrong:** Adding `tops` to the Chip interface makes it required, but existing chip entries (M1, M2, M3) may not have meaningful TOPS values.
**Why it happens:** TypeScript strict mode flags missing required properties.
**How to avoid:** Make `tops` an optional field (`tops?: number`) in the Chip interface since TOPS values are only marketing-relevant for M4. OR add TOPS values for all generations (they exist but are not prominently marketed). Optional is safer and matches the requirement (CHIP-05 says "for Neural Engine performance display" which is M4-focused).
**Warning signs:** TypeScript compilation errors across all chip data entries.

## Code Examples

Verified patterns from official sources and project conventions:

### TOPS Data Addition
```typescript
// types.ts - add optional tops field
export interface Chip {
  // ... existing fields ...
  readonly processNode: string;
  readonly tops?: number; // Trillion Operations Per Second (Neural Engine)
}

// chips.ts - add tops to M4 entries only
// M4 base, M4 Pro, M4 Max all have 38 TOPS (Apple newsroom, May + Oct 2024)
{
  id: 'm4-base',
  // ... existing fields ...
  tops: 38
},
{
  id: 'm4-pro',
  // ... existing fields ...
  tops: 38
},
{
  id: 'm4-max',
  // ... existing fields ...
  tops: 38
}
```

### IntersectionObserver Test Mock
```typescript
// Test helper for useInView
const mockIntersectionObserver = vi.fn();
let observerCallback: IntersectionObserverCallback;

beforeEach(() => {
  mockIntersectionObserver.mockImplementation((callback: IntersectionObserverCallback) => {
    observerCallback = callback;
    return {
      observe: vi.fn(),
      unobserve: vi.fn(),
      disconnect: vi.fn(),
    };
  });
  vi.stubGlobal('IntersectionObserver', mockIntersectionObserver);
});

// Simulate element entering viewport
function triggerIntersection(isIntersecting: boolean) {
  observerCallback(
    [{ isIntersecting } as IntersectionObserverEntry],
    {} as IntersectionObserver
  );
}
```

### matchMedia Override for Reduced Motion Tests
```typescript
// Override the global mock for reduced-motion tests
function mockReducedMotion(matches: boolean) {
  const listeners: Array<(e: MediaQueryListEvent) => void> = [];
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches: query === '(prefers-reduced-motion: reduce)' ? matches : false,
      media: query,
      onchange: null,
      addEventListener: (_: string, handler: (e: MediaQueryListEvent) => void) => {
        listeners.push(handler);
      },
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
  return {
    // Simulate user toggling reduced motion
    toggle: (newValue: boolean) => {
      listeners.forEach(fn => fn({ matches: newValue } as MediaQueryListEvent));
    },
  };
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| react-intersection-observer package | Native IntersectionObserver (supported since 2019) | 2019+ | No package needed; 15-line hook covers all use cases |
| window.matchMedia without listener | matchMedia with addEventListener('change') | Always best practice | Reactive updates when user toggles OS setting |
| setInterval for counting animations | requestAnimationFrame with useRef | Always best practice | Frame-accurate, auto-pauses in background tabs |
| Per-element animation-play-state | @media (prefers-reduced-motion) blanket rule | WCAG 2.1 (2018) | Single CSS rule disables all animations globally |

**Deprecated/outdated:**
- `matchMedia.addListener()` -- deprecated, use `addEventListener('change')` instead
- Scroll event + getBoundingClientRect for viewport detection -- replaced by IntersectionObserver

## Open Questions

1. **Should TOPS be optional or required on Chip interface?**
   - What we know: Only M4 generation has prominently marketed TOPS values (38 TOPS). Earlier generations had Neural Engines but TOPS was not a marketing focus.
   - What's unclear: Whether Phase 4/5 will need TOPS values for non-M4 chips.
   - Recommendation: Make it optional (`tops?: number`). This avoids breaking existing data and tests while satisfying CHIP-05. If needed later for other generations, values can be added.

2. **Should useCountUp accept a trigger parameter or compose with useInView externally?**
   - What we know: useCountUp needs to start only when visible. Two approaches: (a) accept a `trigger: boolean` parameter, or (b) let the consumer compose `useInView` + `useCountUp` by passing `inView` as the trigger.
   - What's unclear: Which approach is cleaner for Phase 4 consumers.
   - Recommendation: Accept `trigger` parameter. This keeps hooks composable and independently testable. The consumer does `const inView = useInView(ref); const count = useCountUp(target, duration, inView);`.

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | Vitest 4.0.18 + @testing-library/react 16.3.2 |
| Config file | vitest.config.ts |
| Quick run command | `npx vitest run --reporter=verbose` |
| Full suite command | `npx vitest run` |

### Phase Requirements -> Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| CHIP-05 | M4 chips have tops field with value 38 | unit | `npx vitest run components/data/__tests__/chips.test.ts -x` | Exists (needs new assertions) |
| A11Y-01 | useReducedMotion returns true when media query matches, false otherwise; updates on change | unit | `npx vitest run components/hooks/useReducedMotion.test.ts -x` | Wave 0 |
| A11Y-02 | CSS keyframes animate only opacity, transform, stroke-dashoffset | unit | `npx vitest run components/hooks/animations.test.ts -x` | Wave 0 (verify CSS class definitions) |
| A11Y-04 | useInView returns false initially, true after intersection, disconnects observer | unit | `npx vitest run components/hooks/useInView.test.ts -x` | Wave 0 |
| CHIP-03 (prep) | useCountUp animates from 0 to target with ease-out, respects trigger | unit | `npx vitest run components/hooks/useCountUp.test.ts -x` | Wave 0 |

### Sampling Rate
- **Per task commit:** `npx vitest run --reporter=verbose`
- **Per wave merge:** `npx vitest run`
- **Phase gate:** Full suite green before /gsd:verify-work

### Wave 0 Gaps
- [ ] `components/hooks/useCountUp.test.ts` -- covers useCountUp hook behavior (trigger, cleanup, easing)
- [ ] `components/hooks/useInView.test.ts` -- covers IntersectionObserver integration (requires mock)
- [ ] `components/hooks/useReducedMotion.test.ts` -- covers matchMedia integration (requires mock override)
- [ ] IntersectionObserver mock helper (inline in test files or shared fixture)

## Sources

### Primary (HIGH confidence)
- [Apple M4 Newsroom (May 2024)](https://www.apple.com/newsroom/2024/05/apple-introduces-m4-chip/) -- M4 base 38 TOPS confirmed
- [Apple M4 Pro/Max Newsroom (Oct 2024)](https://www.apple.com/newsroom/2024/10/apple-introduces-m4-pro-and-m4-max/) -- M4 Pro/Max share 16-core Neural Engine
- [MDN IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver) -- API reference
- [MDN matchMedia](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia) -- API reference with addEventListener pattern
- [MDN requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/Window/requestAnimationFrame) -- timing and cleanup
- [Chrome DevRel Hardware-Accelerated Animations](https://developer.chrome.com/blog/hardware-accelerated-animations) -- compositor-only properties

### Secondary (MEDIUM confidence)
- [Josh Comeau prefers-reduced-motion](https://www.joshwcomeau.com/react/prefers-reduced-motion/) -- React hook pattern
- [CSS-Tricks requestAnimationFrame with React Hooks](https://css-tricks.com/using-requestanimationframe-with-react-hooks/) -- useCountUp pattern
- [The Register M4 38 TOPS](https://www.theregister.com/2024/05/07/apple_m4_ipad/) -- TOPS value cross-verification

### Tertiary (LOW confidence)
- None -- all findings verified against primary or secondary sources

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - all browser-native APIs, zero dependencies, patterns verified in existing codebase
- Architecture: HIGH - three independent hooks + CSS keyframes is a well-established pattern; existing project conventions (particleConfig.ts, test/setup.ts) guide implementation
- Pitfalls: HIGH - jsdom limitations are well-documented; existing test infrastructure mock (matchMedia) confirms the pattern
- Data layer: HIGH - TOPS value (38) verified against Apple newsroom for all M4 variants

**Research date:** 2026-03-08
**Valid until:** 2026-04-08 (stable browser APIs, unlikely to change)
