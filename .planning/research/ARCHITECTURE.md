# Architecture Patterns

**Domain:** Animated Apple Silicon chip diagram for Hero section of React landing page
**Researched:** 2026-03-07

## Recommended Architecture

### Overview

The chip diagram replaces the existing static `ChipCard` grid inside `Hero.tsx` with an animated SVG-based visualization. The architecture follows a **composed inline SVG** pattern: one parent SVG component coordinates child SVG group components, each owning its own geometry and CSS animation. No animation library is needed -- CSS keyframes handle all visual effects (glow, pulse, data flow), and counting numbers use a lightweight `useCountUp` hook with `requestAnimationFrame`.

### Component Hierarchy

```
Hero.tsx (layout, headline, CTAs -- modified)
  |
  +-- ChipDiagram.tsx (NEW -- parent container, chip selector state)
        |
        +-- ChipSelector.tsx (NEW -- M4 / M4 Pro / M4 Max tab buttons, HTML not SVG)
        |
        +-- ChipSVG.tsx (NEW -- root <svg> element, viewBox, responsive sizing)
              |
              +-- CoreGrid.tsx (NEW -- CPU P-cores + E-cores as rounded rects)
              |
              +-- GPUBlock.tsx (NEW -- GPU core array as grid of small rects)
              |
              +-- NeuralEngineBlock.tsx (NEW -- 16-core Neural Engine cluster)
              |
              +-- MemoryBus.tsx (NEW -- unified memory band with flowing data animation)
              |
              +-- SpecLabel.tsx (NEW -- single spec readout with count-up animation)
              |
              +-- DataFlowPaths.tsx (NEW -- animated SVG paths between blocks)
```

### Component Boundaries

| Component | Responsibility | Communicates With |
|-----------|---------------|-------------------|
| `Hero.tsx` | Page layout, headline text, CTA buttons. Imports `ChipDiagram`. | `ChipDiagram` (renders it) |
| `ChipDiagram.tsx` | Holds selected chip state (`useState`). Filters `chips` array from data layer. Passes chip data down. | `ChipSelector`, `ChipSVG`, data layer (`chips.ts`) |
| `ChipSelector.tsx` | Three tab buttons (M4 / M4 Pro / M4 Max). Calls `onSelect` callback. | `ChipDiagram` (via props) |
| `ChipSVG.tsx` | Root `<svg>` with responsive `viewBox="0 0 600 400"`. Positions child groups via `<g transform>`. | All SVG child components (via props) |
| `CoreGrid.tsx` | Renders P-core and E-core rectangles. Animates glow on selected cores. | Receives `cpuCores` from props |
| `GPUBlock.tsx` | Renders GPU core grid. Scales grid size by `gpuCores` count. | Receives `gpuCores` from props |
| `NeuralEngineBlock.tsx` | Renders 16-core Neural Engine cluster with pulse animation. | Receives `neuralEngineCores` from props |
| `MemoryBus.tsx` | Wide band at bottom with flowing gradient animation showing bandwidth. | Receives `memoryBandwidth`, `maxMemory` from props |
| `SpecLabel.tsx` | Reusable: displays a spec number with count-up animation on chip change. | Receives `value`, `suffix`, `label` from props |
| `DataFlowPaths.tsx` | SVG `<path>` elements with animated `stroke-dashoffset` showing data flowing between blocks. | Receives positions from parent layout |

### Data Flow

```
chips.ts (static data, already exists)
    |
    v
ChipDiagram.tsx
    |-- filters chips array to M4 generation (m4-base, m4-pro, m4-max)
    |-- useState<string>('m4-pro')  // selected chip ID, default to Pro
    |-- getChipById(selectedId) -> Chip object
    |
    v
ChipSVG.tsx receives full Chip object as prop
    |
    |-- Destructures: cpuCores.performance, cpuCores.efficiency,
    |                 gpuCores, neuralEngineCores,
    |                 memoryBandwidth, maxMemory
    |
    +-> CoreGrid     receives { performance: number, efficiency: number }
    +-> GPUBlock      receives { cores: number }
    +-> NeuralEngineBlock receives { cores: number }
    +-> MemoryBus     receives { bandwidth: number, maxMemory: number }
    +-> SpecLabel x4  receives { value: number, suffix: string, label: string }
    +-> DataFlowPaths receives no data props (pure visual)
```

**Key insight:** The `Chip` type from `components/data/types.ts` already has every field needed (`cpuCores.performance`, `cpuCores.efficiency`, `gpuCores`, `neuralEngineCores`, `memoryBandwidth`, `maxMemory`). No new types are required. The data layer is untouched.

## Patterns to Follow

### Pattern 1: Inline SVG Components (not external .svg files)

**What:** Each SVG sub-component is a React functional component returning SVG elements (`<g>`, `<rect>`, `<circle>`, `<path>`, `<text>`). The root component returns `<svg>`.

**Why:** Inline SVG gives full React control over attributes (fill, opacity, className) and enables data-driven rendering (loop over core count to render rects). External .svg files cannot be parameterized by props.

**Confidence:** HIGH -- this is the standard React pattern for data-driven SVG. Verified across multiple sources including [Strapi](https://strapi.io/blog/mastering-react-svg-integration-animation-optimization) and [LogRocket](https://blog.logrocket.com/guide-svgs-react/).

**Example:**
```typescript
// CoreGrid.tsx
interface CoreGridProps {
  performance: number;
  efficiency: number;
}

export const CoreGrid: React.FC<CoreGridProps> = ({ performance, efficiency }) => (
  <g className="core-grid">
    {/* Performance cores - larger, brighter */}
    {Array.from({ length: performance }).map((_, i) => (
      <rect
        key={`p-${i}`}
        x={20 + (i % 4) * 36}
        y={20 + Math.floor(i / 4) * 36}
        width={30}
        height={30}
        rx={4}
        className="fill-blue-500 animate-core-glow"
        style={{ animationDelay: `${i * 0.1}s` }}
      />
    ))}
    {/* Efficiency cores - smaller, dimmer */}
    {Array.from({ length: efficiency }).map((_, i) => (
      <rect
        key={`e-${i}`}
        x={180 + (i % 2) * 28}
        y={20 + Math.floor(i / 2) * 28}
        width={22}
        height={22}
        rx={3}
        className="fill-blue-400/60 animate-core-glow"
        style={{ animationDelay: `${(performance + i) * 0.1}s` }}
      />
    ))}
  </g>
);
```

### Pattern 2: CSS Keyframes for All Visual Animations

**What:** Glow, pulse, and flow animations use CSS `@keyframes` defined in the `index.html` `<style>` block (where existing `animate-float` already lives). SVG elements reference these via class names.

**Why:** CSS animations on `transform` and `opacity` are GPU-composited -- they run on the compositor thread without blocking main thread or causing layout/paint. This is critical for a landing page hero where scroll and interaction must stay smooth. No animation library dependency means zero bundle cost.

**Confidence:** HIGH -- GPU compositing of transform/opacity is well-documented by [Chrome DevRel](https://developer.chrome.com/blog/hardware-accelerated-animations) and [Smashing Magazine](https://www.smashingmagazine.com/2016/12/gpu-animation-doing-it-right/).

**Animations needed (add to index.html `<style>` block):**
```css
/* Core glow - subtle brightness pulse */
@keyframes core-glow {
  0%, 100% { opacity: 0.7; }
  50% { opacity: 1; }
}
.animate-core-glow {
  animation: core-glow 2s ease-in-out infinite;
}

/* Data flow - dashed line marching along path */
@keyframes data-flow {
  to { stroke-dashoffset: -20; }
}
.animate-data-flow {
  stroke-dasharray: 8 4;
  animation: data-flow 1s linear infinite;
}

/* Memory bus shimmer - gradient slide */
@keyframes memory-shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}
.animate-memory-shimmer {
  animation: memory-shimmer 3s ease-in-out infinite;
}

/* Neural engine pulse */
@keyframes neural-pulse {
  0%, 100% { opacity: 0.5; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.05); }
}
.animate-neural-pulse {
  animation: neural-pulse 1.5s ease-in-out infinite;
}
```

**Performance rules:**
- Only animate `opacity` and `transform` (GPU-composited properties)
- Use `will-change: opacity` sparingly and only on actively animating elements
- Avoid animating `filter` properties (not GPU-composited on mobile)
- Stagger animations with `animation-delay` to reduce simultaneous GPU work

### Pattern 3: useCountUp Hook for Number Animations

**What:** A custom hook using `requestAnimationFrame` to animate numbers from 0 to target value over a duration. Triggers on chip change via the `target` dependency.

**Why:** Counting-up spec numbers (e.g., "10-core CPU", "273 GB/s") creates visual impact when switching chips. Using `requestAnimationFrame` directly avoids animation library overhead and gives frame-accurate control. The hook pattern matches existing project conventions (`useParticleEngine`, `useI18n`).

**Confidence:** HIGH -- `requestAnimationFrame` + `useRef` is the standard React pattern. Verified at [CSS-Tricks](https://css-tricks.com/using-requestanimationframe-with-react-hooks/).

**Implementation:**
```typescript
// hooks/useCountUp.ts
import { useState, useEffect, useRef } from 'react';

export const useCountUp = (target: number, duration = 800): number => {
  const [current, setCurrent] = useState(0);
  const startTimeRef = useRef<number>(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    startTimeRef.current = 0;

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);

      // Ease-out cubic for satisfying deceleration
      const eased = 1 - Math.pow(1 - progress, 3);
      setCurrent(Math.round(target * eased));

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target, duration]);

  return current;
};
```

### Pattern 4: Responsive SVG with viewBox

**What:** The root SVG uses a fixed `viewBox` (e.g., `0 0 600 400`) and responsive width via CSS (`width: 100%; max-width: 600px; height: auto`). The `preserveAspectRatio="xMidYMid meet"` ensures uniform scaling.

**Why:** SVG viewBox scaling is resolution-independent. The diagram looks sharp on retina displays and scales naturally between mobile (300px wide) and desktop (600px wide) without media queries or breakpoints.

**Confidence:** HIGH -- this is the standard SVG responsive pattern.

**Mobile note:** At narrow widths (<400px), the diagram scales down uniformly. Ensure minimum readable font sizes by using at least 14px in viewBox coordinate space (at 320px viewport, this renders as roughly 7.5px physical -- small but still readable for numbers). If testing shows readability issues, consider a breakpoint that stacks the diagram blocks vertically for mobile.

### Pattern 5: Key-Driven Transitions on Chip Switch

**What:** When the user selects a different chip (M4 -> M4 Pro), use React's `key` prop on `ChipSVG` to force unmount/remount, restarting all CSS animations and count-up hooks.

**Why:** Simpler than managing animation reset state across all child components. The SVG is lightweight (no network requests, just DOM operations). Each remount triggers fresh `useCountUp` from 0 and fresh CSS animation starts.

**Confidence:** MEDIUM -- this is a pragmatic shortcut. If smooth morphing transitions between chips are later desired, switch to `useEffect` watching chip ID instead. For a landing page with discrete chip states, remounting is simpler and sufficient.

**Example:**
```typescript
// ChipDiagram.tsx
<ChipSVG key={selectedChip.id} chip={selectedChip} />
```

## Anti-Patterns to Avoid

### Anti-Pattern 1: Animation Library for Simple Effects

**What:** Adding Framer Motion, React Spring, or GSAP for glow/pulse/flow animations.

**Why bad:** These animations are purely decorative CSS effects (opacity, transform, stroke-dashoffset). A library adds 15-40KB+ gzipped for functionality CSS handles natively with better performance. The project constraint explicitly says "Keep additions minimal -- SVG animations preferred over heavy libraries."

**Instead:** CSS `@keyframes` for visual effects, `requestAnimationFrame` hook for counting numbers.

### Anti-Pattern 2: External SVG Files with Dynamic Data

**What:** Creating `.svg` files for the chip diagram and loading them via `<img>` or a bundler plugin like SVGR.

**Why bad:** External SVGs cannot receive React props. The diagram must render different numbers of cores based on chip data. SVGR adds tooling complexity for something JSX handles directly.

**Instead:** Write SVG elements directly as JSX in component files.

### Anti-Pattern 3: Canvas or WebGL for the Chip Diagram

**What:** Using `<canvas>` or WebGL/Three.js for the chip visualization.

**Why bad:** Canvas is opaque to the DOM -- no accessibility, no CSS styling, no text selection. The diagram contains text labels that should be accessible. The project explicitly rules out WebGL/Three.js as too heavy.

**Instead:** SVG is DOM-native, accessible, resolution-independent, and CSS-styleable.

### Anti-Pattern 4: Animating SVG filter on Mobile

**What:** Using SVG `<filter>` elements (`feGaussianBlur`, `feDropShadow`) for glow effects and animating them.

**Why bad:** SVG filters are CPU-rendered on most mobile browsers, causing frame drops and battery drain. A blur filter must re-render every animation frame.

**Instead:** Use CSS `opacity` changes on a pre-blurred static glow element beneath each core rect. Or use CSS `box-shadow` on an HTML overlay if needed.

### Anti-Pattern 5: One Monolithic SVG Component

**What:** Putting all SVG elements (cores, GPU, neural engine, memory bus, labels, paths) in a single component file.

**Why bad:** Becomes 300+ lines, hard to test individual sections, hard to iterate on layout of one block without risking others. Violates single-responsibility principle.

**Instead:** One component per logical block (CoreGrid, GPUBlock, etc.), composed by ChipSVG parent.

## Integration Points with Existing Code

### Modified Files

| File | Change | Scope |
|------|--------|-------|
| `components/Hero.tsx` | Remove inline `ChipCard` component and the static chip grid (lines 5-167 of current file). Import and render `ChipDiagram`. Keep headline, badge, CTAs, background blurs, unified memory section. | Moderate -- delete ~120 lines of static chip cards and agent layer, add ~5 lines for `ChipDiagram` import/render |
| `index.html` | Add new `@keyframes` rules to existing `<style>` block (core-glow, data-flow, memory-shimmer, neural-pulse) | Small -- append ~30 lines of CSS |

### New Files

| File | Purpose | Dependencies |
|------|---------|--------------|
| `components/chip-diagram/ChipDiagram.tsx` | Parent container, chip selection state, data filtering | `chips.ts`, `types.ts` |
| `components/chip-diagram/ChipSelector.tsx` | Tab buttons for M4 / M4 Pro / M4 Max | None (pure UI) |
| `components/chip-diagram/ChipSVG.tsx` | Root SVG element, positions child groups | All SVG children below |
| `components/chip-diagram/CoreGrid.tsx` | CPU core visualization | None |
| `components/chip-diagram/GPUBlock.tsx` | GPU core visualization | None |
| `components/chip-diagram/NeuralEngineBlock.tsx` | Neural Engine visualization | None |
| `components/chip-diagram/MemoryBus.tsx` | Unified memory band | None |
| `components/chip-diagram/SpecLabel.tsx` | Animated spec number display | `useCountUp` |
| `components/chip-diagram/DataFlowPaths.tsx` | Animated connection paths | None |
| `hooks/useCountUp.ts` | requestAnimationFrame count-up hook | None |

### Untouched Files

- `components/data/chips.ts` -- already has all M4 chip data needed
- `components/data/types.ts` -- `Chip` type has all required fields
- `components/ChipComparison.tsx` -- separate section, unaffected
- `components/particles/` -- independent background system, no conflicts
- `App.tsx` -- Hero already imported and rendered, no changes needed

## Suggested Build Order

Build order follows dependency graph. Each step is independently testable.

| Order | Component | Rationale | Testable In Isolation |
|-------|-----------|-----------|----------------------|
| 1 | `hooks/useCountUp.ts` | Zero dependencies, unit-testable | Yes -- render hook with test values |
| 2 | CSS keyframes in `index.html` | No component dependencies | Yes -- apply classes to any element |
| 3 | `SpecLabel.tsx` | Depends on `useCountUp` (step 1) | Yes -- render with hardcoded number |
| 4 | `CoreGrid.tsx` | Pure SVG, no dependencies | Yes -- wrap in `<svg>` for visual test |
| 5 | `GPUBlock.tsx` | Pure SVG, no dependencies | Yes |
| 6 | `NeuralEngineBlock.tsx` | Pure SVG, no dependencies | Yes |
| 7 | `MemoryBus.tsx` | Pure SVG, uses CSS from step 2 | Yes |
| 8 | `DataFlowPaths.tsx` | Pure SVG, uses CSS from step 2 | Yes |
| 9 | `ChipSVG.tsx` | Composes steps 3-8 into positioned layout | Yes -- hardcode a Chip object |
| 10 | `ChipSelector.tsx` | Pure HTML/Tailwind buttons | Yes -- renders standalone |
| 11 | `ChipDiagram.tsx` | Composes selector + SVG, connects to `chips.ts` | Yes -- renders standalone |
| 12 | `Hero.tsx` modification | Remove old grid, add ChipDiagram | Integration test |

**Steps 4-8 can be built in parallel** since they are independent leaf components.

## Scalability Considerations

| Concern | Current (3 chips) | Future (add M4 Ultra) | Notes |
|---------|-------------------|-----------------------|-------|
| Chip count | 3 tabs (M4/Pro/Max) | 4 tabs -- add entry to selector | Data already structured for it in chips.ts |
| SVG complexity | ~50-80 DOM nodes | Same order | Core count changes, node count stays similar |
| Animation perf | 3-4 concurrent CSS animations | Same | CSS animations are GPU-composited, no scaling concern |
| Mobile | viewBox scaling | Same | No change needed |
| i18n | Labels in English | Add translation keys later | SpecLabel accepts label as prop string, easy to swap for t() calls |

## Sources

- [Mastering React SVG Integration - Strapi](https://strapi.io/blog/mastering-react-svg-integration-animation-optimization) -- HIGH confidence
- [CSS GPU Animation - Smashing Magazine](https://www.smashingmagazine.com/2016/12/gpu-animation-doing-it-right/) -- HIGH confidence
- [requestAnimationFrame with React Hooks - CSS-Tricks](https://css-tricks.com/using-requestanimationframe-with-react-hooks/) -- HIGH confidence
- [Hardware-accelerated animations - Chrome Developers](https://developer.chrome.com/blog/hardware-accelerated-animations) -- HIGH confidence
- [SVG performance with CSS transforms - Charlie Marsh](https://www.crmarsh.com/svg-performance/) -- HIGH confidence
- [Motion library SVG animation docs](https://motion.dev/docs/react-svg-animation) -- MEDIUM confidence (evaluated but not recommended)
- [SVG animation optimization guide - Zigpoll](https://www.zigpoll.com/content/how-can-i-optimize-svg-animations-to-run-smoothly-on-both-desktop-and-mobile-browsers-without-significant-performance-loss) -- MEDIUM confidence
- [Guide to SVGs in React - LogRocket](https://blog.logrocket.com/guide-svgs-react/) -- HIGH confidence

---

*Research completed: 2026-03-07*
*Confidence: HIGH (core patterns verified with official sources and established references)*
