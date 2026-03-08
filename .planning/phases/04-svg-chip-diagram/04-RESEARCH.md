# Phase 4: SVG Chip Diagram - Research

**Researched:** 2026-03-08
**Domain:** Inline React SVG component, responsive block diagram, animated spec labels, variant selection UI
**Confidence:** HIGH

## Summary

Phase 4 builds a single standalone React component (`ChipDiagram`) that renders an SVG block diagram of Apple M4 chip architecture with variant selection tabs. The component consumes the three hooks from Phase 3 (`useInView`, `useCountUp`, `useReducedMotion`) and the CSS animation classes (`animate-core-glow`, `animate-data-flow`, `animate-memory-shimmer`) already defined in `index.html`. The chip data layer in `components/data/chips.ts` already has all M4 variant specs including the `tops` field.

The critical constraint is A11Y-03: the SVG must stay under 100 DOM elements. This rules out generating individual `<rect>` elements per core (M4 Max has 40 GPU cores alone). Instead, the diagram uses labeled block regions -- one `<rect>` + `<text>` per architectural section (CPU, GPU, Neural Engine, Unified Memory) -- with spec numbers as text labels. The `<g>` grouping element and SVG `<use>` with `<defs>` can further reduce element count by defining reusable shapes once.

The component is designed for Phase 5 to drop into the Hero section. It must be self-contained: accept no required props (internally manages chip selection state), render responsively from 320px to desktop via `viewBox` with percentage-based container width, and gate animations on viewport visibility.

**Primary recommendation:** Build a single `ChipDiagram.tsx` component with inline SVG using `viewBox="0 0 400 300"` (fixed coordinate space), CSS-driven responsive scaling via `width="100%"`, and data-driven rendering from the existing `chips.ts` M4 entries. Keep total SVG elements under 100 by using block regions (not individual cores) and `<defs>`/`<use>` for repeated shapes.

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| CHIP-01 | SVG chip block diagram displays CPU cores, GPU cores, Neural Engine, and unified memory as distinct visual blocks | Inline SVG with 4 `<rect>` blocks + `<text>` labels, grouped with `<g>`. Each block styled with distinct fill/opacity. Block positions calculated from viewBox coordinate space. |
| CHIP-02 | User can select M4 variant (M4 / M4 Pro / M4 Max) and diagram updates to show that chip's specs | `useState` for active variant, filter `chips.ts` by `generation === 'M4'`. HTML tab buttons outside SVG (not SVG elements -- keeps DOM count low and avoids SVG click handling complexity). |
| CHIP-03 | Spec numbers animate with count-up effect when diagram enters viewport | Compose `useInView(containerRef)` + `useCountUp(target, duration, inView)` for each numeric spec. Use `useReducedMotion()` to skip animation and show final values immediately. |
| CHIP-04 | Chip diagram is responsive and readable on mobile (320px+), tablet, and desktop | SVG `viewBox="0 0 400 300"` with `width="100%" height="auto"` and `preserveAspectRatio="xMidYMid meet"`. Container uses Tailwind `max-w-2xl mx-auto`. Text sizes in SVG user units, not px. |
| A11Y-03 | SVG diagram DOM stays under 100 elements for mobile performance | Block-region approach (4 rects + labels) instead of per-core elements. `<defs>` for reusable shapes. Target: ~60-70 elements total including tab buttons. Verification: browser DevTools element count. |
</phase_requirements>

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| React inline SVG | React 19 | Render SVG elements as JSX | Zero bundle cost, full prop control, CSS class application, event handling |
| viewBox coordinate system | SVG native | Fixed 400x300 coordinate space | Responsive scaling without media queries; browser handles all resizing |
| Tailwind CSS | CDN (existing) | Tab buttons, container layout, responsive utilities | Already in project, handles all non-SVG styling |

### Supporting (from Phase 3)
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| useInView | Phase 3 hook | Detect when diagram enters viewport | Trigger count-up animations |
| useCountUp | Phase 3 hook | Animate numbers 0 -> target | CPU cores, GPU cores, TOPS, bandwidth display |
| useReducedMotion | Phase 3 hook | Detect prefers-reduced-motion | Skip animations, show final values |
| CSS animate-core-glow | Phase 3 CSS | Pulsing opacity on CPU/GPU blocks | Applied as className on `<rect>` elements |
| CSS animate-memory-shimmer | Phase 3 CSS | Shimmer effect on memory block | Applied on overlay `<rect>` with clipPath |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Inline SVG JSX | External .svg file | Loses dynamic data binding, can't use React state for variant switching |
| viewBox responsive | CSS media queries + fixed dimensions | Much more code, breakpoint maintenance, viewBox handles it natively |
| HTML tab buttons | SVG `<text>` buttons inside SVG | SVG click targets have accessibility issues, HTML buttons get keyboard focus for free |
| Block regions | Individual core rectangles | M4 Max has 40 GPU cores -- would blow 100 element budget instantly |

**Installation:**
```bash
# No new packages needed. Uses React, existing hooks, existing CSS, existing chip data.
```

## Architecture Patterns

### Recommended Project Structure
```
components/
  ChipDiagram.tsx           # Main SVG chip diagram component
  ChipDiagram.test.tsx      # Component tests
  hooks/
    useCountUp.ts           # FROM PHASE 3
    useInView.ts            # FROM PHASE 3
    useReducedMotion.ts     # FROM PHASE 3
  data/
    chips.ts                # FROM PHASE 2+3 (M4 data with tops field)
    types.ts                # FROM PHASE 2+3 (Chip interface)
```

### Pattern 1: Data-Driven SVG Block Diagram
**What:** SVG renders blocks based on chip data, not hardcoded positions
**When to use:** The ChipDiagram component renders different specs per variant
**Example:**
```typescript
// Source: Project conventions + SVG viewBox pattern
import React, { useState, useRef } from 'react';
import { chips } from './data/chips';
import type { Chip } from './data/types';
import { useInView } from './hooks/useInView';
import { useCountUp } from './hooks/useCountUp';
import { useReducedMotion } from './hooks/useReducedMotion';

const M4_CHIPS = chips.filter(c => c.generation === 'M4' && c.variant !== 'Ultra');

type M4Variant = 'base' | 'Pro' | 'Max';

const VARIANT_LABELS: Record<M4Variant, string> = {
  base: 'M4',
  Pro: 'M4 Pro',
  Max: 'M4 Max',
};

export const ChipDiagram: React.FC = () => {
  const [activeVariant, setActiveVariant] = useState<M4Variant>('base');
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef);
  const reducedMotion = useReducedMotion();

  const chip = M4_CHIPS.find(c => c.variant === activeVariant)!;
  const shouldAnimate = inView && !reducedMotion;

  // Count-up values (show final value immediately if reduced motion)
  const cpuCount = useCountUp(chip.cpuCores.total, 1200, inView);
  const gpuCount = useCountUp(chip.gpuCores, 1200, inView);
  const topsCount = useCountUp(chip.tops ?? 0, 1200, inView);
  const bwCount = useCountUp(chip.memoryBandwidth, 1200, inView);

  // Display values: use final value if reduced motion, else animated
  const cpu = reducedMotion ? chip.cpuCores.total : cpuCount;
  const gpu = reducedMotion ? chip.gpuCores : gpuCount;
  const tops = reducedMotion ? (chip.tops ?? 0) : topsCount;
  const bw = reducedMotion ? chip.memoryBandwidth : bwCount;

  return (
    <div ref={containerRef}>
      {/* Tab buttons - HTML, not SVG */}
      <div role="tablist" aria-label="M4 chip variant selector">
        {(['base', 'Pro', 'Max'] as M4Variant[]).map(variant => (
          <button
            key={variant}
            role="tab"
            aria-selected={activeVariant === variant}
            onClick={() => setActiveVariant(variant)}
          >
            {VARIANT_LABELS[variant]}
          </button>
        ))}
      </div>

      {/* SVG diagram */}
      <svg
        viewBox="0 0 400 300"
        width="100%"
        height="auto"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label={`${VARIANT_LABELS[activeVariant]} chip architecture diagram`}
      >
        {/* CPU block */}
        <g>
          <rect x="10" y="10" width="185" height="120" rx="8"
            className={shouldAnimate ? 'animate-core-glow' : ''} />
          <text x="100" y="40">CPU</text>
          <text x="100" y="70">{cpu}-core</text>
        </g>
        {/* GPU block, Neural Engine block, Memory block... */}
      </svg>
    </div>
  );
};
```

### Pattern 2: Responsive SVG via viewBox
**What:** Fixed coordinate space scales to any container width
**When to use:** All SVG rendering in this component
**Example:**
```typescript
// The SVG viewBox defines a 400x300 virtual canvas.
// Setting width="100%" and no fixed height makes it scale proportionally.
// On 320px mobile: each viewBox unit = 0.8px
// On 1024px desktop: each viewBox unit = 2.56px
// Text at fontSize="14" in viewBox units remains readable at all sizes.
<svg
  viewBox="0 0 400 300"
  width="100%"
  preserveAspectRatio="xMidYMid meet"
  role="img"
  aria-label="M4 chip architecture"
>
  {/* All coordinates in viewBox units (0-400 x, 0-300 y) */}
</svg>
```

### Pattern 3: Element Budget Management with defs/use
**What:** Define reusable SVG shapes once, reference with `<use>`
**When to use:** When multiple blocks share the same rounded-rect shape
**Example:**
```typescript
// <defs> content is NOT rendered -- does not count toward visual elements
// <use> creates a lightweight reference, not a full clone
<svg viewBox="0 0 400 300">
  <defs>
    <rect id="block" width="185" height="120" rx="8" />
  </defs>
  <use href="#block" x="10" y="10" fill="#1e3a5f" />  {/* CPU */}
  <use href="#block" x="205" y="10" fill="#2d1f5e" />  {/* GPU */}
</svg>
```

### Pattern 4: Accessible Tab Selection (HTML, not SVG)
**What:** Chip variant tabs as HTML buttons with ARIA roles
**When to use:** The M4 / M4 Pro / M4 Max selector
**Example:**
```typescript
// HTML buttons get keyboard focus, aria-selected, and screen reader support for free.
// Placing tabs outside SVG keeps SVG DOM count low.
<div role="tablist" aria-label="Select M4 chip variant">
  {variants.map(v => (
    <button
      key={v}
      role="tab"
      aria-selected={active === v}
      tabIndex={active === v ? 0 : -1}
      onClick={() => setActive(v)}
      className={active === v ? 'bg-blue-600 text-white' : 'text-slate-400'}
    >
      {labels[v]}
    </button>
  ))}
</div>
```

### Anti-Patterns to Avoid
- **Individual core elements:** Rendering 40 separate `<rect>` for M4 Max GPU cores. Use a single block with a text label "40-core GPU" instead.
- **SVG text for interactive elements:** SVG `<text>` cannot receive keyboard focus natively. Use HTML buttons for tabs.
- **Fixed pixel dimensions on SVG:** Setting `width="400" height="300"` prevents responsive scaling. Use `width="100%"` with `viewBox`.
- **Nested SVGs:** Each `<svg>` creates a new viewport. One root `<svg>` with `<g>` groups is sufficient and lighter.
- **Animating SVG fill/stroke properties:** These trigger CPU repaints. Use the Phase 3 CSS classes that animate only opacity/transform.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Responsive scaling | CSS media queries + multiple SVG sizes | Single `viewBox` + `width="100%"` | viewBox handles all breakpoints automatically |
| Number animation | Custom animation loop in component | `useCountUp` from Phase 3 | Already built, tested, and handles cleanup |
| Viewport detection | Scroll listener in component | `useInView` from Phase 3 | Already built, one-shot pattern, tested |
| Motion preference | Manual check in component | `useReducedMotion` from Phase 3 | Already built, reactive, tested |
| Tab accessibility | Custom keyboard handling | HTML `role="tablist"` + `role="tab"` + `aria-selected` | Browser and screen readers handle the rest |
| CSS animations | JS-driven opacity/transform loops | Phase 3 CSS classes (`animate-core-glow` etc.) | GPU-composited, reduced-motion handled globally |

**Key insight:** Phase 3 already built every animation primitive this phase needs. Phase 4 is pure composition -- assembling existing hooks, CSS, and data into a visual component.

## Common Pitfalls

### Pitfall 1: SVG Element Count Explosion
**What goes wrong:** Rendering individual elements per core (40 GPU rects for M4 Max) blows past the 100-element limit.
**Why it happens:** Natural instinct is to visually represent each core as a separate element.
**How to avoid:** Use block regions with text labels. "40-core GPU" as text inside one `<rect>` is 2 elements, not 40.
**Warning signs:** DevTools Elements panel shows > 100 nodes inside `<svg>`.

### Pitfall 2: SVG Text Not Readable on Mobile
**What goes wrong:** Text sized in small viewBox units becomes illegible on 320px screens.
**Why it happens:** viewBox scaling shrinks everything proportionally, including text.
**How to avoid:** Use minimum fontSize of 12 in viewBox units for labels, 16+ for numbers. Test at 320px width. Consider reducing diagram complexity on mobile rather than shrinking text.
**Warning signs:** Text appears as blurry smudges on mobile preview.

### Pitfall 3: useCountUp Fires Before Variant Loads
**What goes wrong:** Count-up animates to the old variant's value, then snaps to new value when variant changes.
**Why it happens:** useCountUp's `target` dependency changes but animation is already complete (one-shot `inView` stays true).
**How to avoid:** Use a `key` prop on the SVG container that includes the variant, forcing React to remount and re-trigger animations. Or accept that after first view, numbers update instantly without re-animation (this is actually the better UX -- users don't want to wait for animation on every tab click).
**Warning signs:** Numbers flicker or show wrong values briefly when switching variants.

### Pitfall 4: Tab Buttons Styled Inside SVG
**What goes wrong:** Using SVG `<text>` or `<rect>` as clickable tabs means no keyboard navigation, no focus ring, no screen reader support.
**Why it happens:** Keeping everything in SVG seems cleaner architecturally.
**How to avoid:** Tabs are HTML `<button>` elements above the SVG. Only the diagram visualization is SVG.
**Warning signs:** Can't tab to chip selector with keyboard; screen reader skips tabs.

### Pitfall 5: Hardcoded Spec Values Instead of Data-Driven
**What goes wrong:** SVG text labels contain literal numbers ("10-core") instead of reading from `chips.ts`.
**Why it happens:** Quick prototyping leads to hardcoding.
**How to avoid:** Always read from the `chip` object: `chip.cpuCores.total`, `chip.gpuCores`, `chip.tops`, `chip.memoryBandwidth`. This ensures variant switching actually works.
**Warning signs:** Changing activeVariant state doesn't update the displayed specs.

### Pitfall 6: Missing aria-label on SVG
**What goes wrong:** Screen readers announce the SVG as an unlabeled image or read every element.
**Why it happens:** Forgetting `role="img"` and `aria-label` on the root `<svg>`.
**How to avoid:** Always include `role="img"` and `aria-label` that describes the diagram content. Update aria-label when variant changes.
**Warning signs:** VoiceOver reads "group, group, rect, text..." instead of a meaningful description.

## Code Examples

Verified patterns from project codebase and SVG specification:

### Element Budget Calculation
```
Target: < 100 SVG DOM elements

Root <svg>:                          1
<defs> (reusable shapes):            ~5 (defs + rect definitions)
CPU block (<g> + <use> + 2 <text>):  4
GPU block (<g> + <use> + 2 <text>):  4
Neural Engine block:                 4
Unified Memory block:                4
Data flow lines (2-3 <line>):        3
Spec labels (4 values):              4
Decorative elements:                 ~6
Title <text>:                        1
---
Subtotal SVG:                        ~36

HTML elements (outside SVG):
Tab container <div>:                 1
Tab buttons (3):                     3
Container wrapper:                   1
---
Total:                               ~41

Budget remaining: ~59 elements for additional labels,
decorative elements, or layout adjustments.
```

### Complete Block Layout (viewBox coordinates)
```
viewBox="0 0 400 300"

+------ 400 ------+
|  [CPU]   [GPU]   |  y: 10-130 (height: 120)
|  10,10   205,10  |  width: 185 each, gap: 10
|                   |
|  [NE]    [Mem]   |  y: 145-235 (height: 90)
|  10,145  205,145 |  width: 185 each
|                   |
|  [Spec bar]      |  y: 250-290 (height: 40)
|  10,250          |  width: 380
+------- 300 ------+

All blocks use rx="8" for rounded corners.
Gap between rows: 15 viewBox units.
```

### M4 Variant Data Map
```typescript
// Data already exists in chips.ts:
// M4 base:  10 CPU (4P+6E), 10 GPU, 16 NE, 120 GB/s, 32GB, 38 TOPS
// M4 Pro:   14 CPU (10P+4E), 20 GPU, 16 NE, 273 GB/s, 64GB, 38 TOPS
// M4 Max:   16 CPU (12P+4E), 40 GPU, 16 NE, 546 GB/s, 128GB, 38 TOPS

// Filter for diagram:
const M4_CHIPS = chips.filter(
  c => c.generation === 'M4' && c.variant !== 'Ultra'
);
// Returns 3 chips: m4-base, m4-pro, m4-max
```

### Composing Phase 3 Hooks for Animated Specs
```typescript
// In ChipDiagram component:
const containerRef = useRef<HTMLDivElement>(null);
const inView = useInView(containerRef);
const reducedMotion = useReducedMotion();

// Each spec gets its own useCountUp instance
const cpuCount = useCountUp(chip.cpuCores.total, 1200, inView);
const gpuCount = useCountUp(chip.gpuCores, 1200, inView);
const topsCount = useCountUp(chip.tops ?? 0, 1200, inView);
const bwCount = useCountUp(chip.memoryBandwidth, 1500, inView); // slower for larger numbers

// Reduced motion: show final values immediately
const displayCpu = reducedMotion ? chip.cpuCores.total : cpuCount;
const displayGpu = reducedMotion ? chip.gpuCores : gpuCount;
```

### Responsive Container with Tailwind
```typescript
// Wrapper ensures diagram doesn't stretch too wide on desktop
// and fills available width on mobile
<div
  ref={containerRef}
  className="w-full max-w-2xl mx-auto px-4"
>
  {/* tab buttons */}
  {/* svg diagram */}
</div>
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| External SVG files imported as components | Inline JSX SVG with data binding | React 16+ (2017+) | Full dynamic control, no build-time SVG processing needed |
| Fixed width/height on SVG | viewBox + width="100%" | Always best practice | True responsive without media queries |
| d3.js for data visualization | Inline React SVG for simple diagrams | When diagram is static layout with dynamic data | No dependency needed for block diagram layout |
| Per-element animation in JS | CSS class-based animation | CSS Animations API (stable) | GPU composited, global reduced-motion disable |

**Deprecated/outdated:**
- Using `<img src="diagram.svg">` for interactive diagrams -- cannot bind React state or apply CSS classes to internal elements
- SVG `<animate>` element (SMIL) -- still works but CSS animations are more maintainable and already established in project
- xlink:href on `<use>` -- deprecated in SVG 2, use `href` directly

## Open Questions

1. **Should variant switching re-animate count-up numbers?**
   - What we know: `useCountUp` is one-shot (triggered by `inView`). Once animated, switching variants updates `target` but animation is complete.
   - What's unclear: Whether users expect a re-animation when clicking a different variant tab.
   - Recommendation: Do NOT re-animate. After initial viewport entry, show final values instantly on variant switch. Re-animation adds delay and annoyance. This matches the project decision to avoid auto-cycling (anti-pattern per REQUIREMENTS.md).

2. **Exact visual styling of chip blocks (colors, gradients)?**
   - What we know: Project uses blue/purple gradient theme (see `text-gradient` class, existing Hero component).
   - What's unclear: Exact fill colors for each block type (CPU vs GPU vs NE vs Memory).
   - Recommendation: Use the existing project palette -- blue variants for CPU, purple for GPU, emerald/green for Neural Engine (matches "AI" association), cyan for memory (matches existing Hero unified memory section). Opacity 0.15-0.3 for fills to keep dark theme. This is a "Claude's discretion" area -- specific hex values can be finalized during implementation.

3. **Should the component accept props or be fully self-contained?**
   - What we know: Phase 5 drops it into Hero. Roadmap says "standalone" and "can be dropped into any container."
   - What's unclear: Whether Phase 5 needs to control default variant or pass className.
   - Recommendation: Accept optional `className` prop for container styling (Phase 5 needs this). Default variant is `base` (M4). Keep everything else internal.

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | Vitest 4.0.18 + @testing-library/react 16.3.2 |
| Config file | vitest.config.ts |
| Quick run command | `npx vitest run components/ChipDiagram.test.tsx --reporter=verbose` |
| Full suite command | `npx vitest run` |

### Phase Requirements -> Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| CHIP-01 | SVG renders 4 distinct blocks (CPU, GPU, NE, Memory) with labels | unit | `npx vitest run components/ChipDiagram.test.tsx -x` | Wave 0 |
| CHIP-02 | Clicking variant tabs updates displayed chip specs | unit | `npx vitest run components/ChipDiagram.test.tsx -x` | Wave 0 |
| CHIP-03 | Spec numbers use useCountUp (animated values change over time) | unit | `npx vitest run components/ChipDiagram.test.tsx -x` | Wave 0 |
| CHIP-04 | SVG has viewBox and width="100%" for responsive scaling | unit | `npx vitest run components/ChipDiagram.test.tsx -x` | Wave 0 |
| A11Y-03 | SVG DOM element count < 100 | unit | `npx vitest run components/ChipDiagram.test.tsx -x` | Wave 0 |

### Sampling Rate
- **Per task commit:** `npx vitest run --reporter=verbose`
- **Per wave merge:** `npx vitest run`
- **Phase gate:** Full suite green before /gsd:verify-work

### Wave 0 Gaps
- [ ] `components/ChipDiagram.test.tsx` -- covers CHIP-01, CHIP-02, CHIP-03, CHIP-04, A11Y-03
- [ ] IntersectionObserver mock (reuse pattern from Phase 3 `useInView.test.ts`)
- [ ] requestAnimationFrame mock (reuse pattern from Phase 3 `useCountUp.test.ts`)

## Sources

### Primary (HIGH confidence)
- [MDN SVG `<g>` element](https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/g) -- grouping and transform inheritance
- [MDN SVG viewBox](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/viewBox) -- responsive coordinate system
- [Sara Soueidan: Structuring, Grouping, and Referencing in SVG](https://www.sarasoueidan.com/blog/structuring-grouping-referencing-in-svg/) -- defs/use/symbol patterns for reuse
- [Apple M4 Pro/Max Newsroom](https://www.apple.com/newsroom/2024/10/apple-introduces-m4-pro-and-m4-max/) -- chip spec verification
- Project codebase: `components/data/chips.ts`, `components/hooks/use*.ts`, `index.html` CSS keyframes

### Secondary (MEDIUM confidence)
- [LogRocket: Make any SVG responsive with React](https://blog.logrocket.com/make-any-svg-responsive-with-this-react-component/) -- viewBox + width="100%" pattern
- [CSS-Tricks: Use and Reuse Everything in SVG](https://css-tricks.com/use-and-reuse-everything-in-svg-even-animations/) -- element reuse to reduce DOM count

### Tertiary (LOW confidence)
- None -- all findings verified against primary sources or project codebase

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - inline React SVG is the established pattern in this project (no new dependencies)
- Architecture: HIGH - viewBox responsive pattern is well-documented and universally supported; block-region approach is straightforward
- Pitfalls: HIGH - element count constraint is the main risk, mitigated by budget calculation showing ~41 elements used out of 100
- Hook composition: HIGH - all hooks exist, are tested, and have clear APIs from Phase 3

**Research date:** 2026-03-08
**Valid until:** 2026-04-08 (stable SVG/React patterns, unlikely to change)
