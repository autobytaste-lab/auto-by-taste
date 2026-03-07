# Feature Research: Animated Apple Silicon Chip Diagram (Hero Section)

**Domain:** Hardware spec visualization for marketing landing pages
**Researched:** 2026-03-07
**Confidence:** MEDIUM-HIGH (Apple specs verified from official sources; visual pattern analysis based on Apple marketing pages, industry examples, and training data)

## Feature Landscape

### Table Stakes (Users Expect These)

Features that any credible chip/hardware showcase must include. Without these, the Hero section feels like a placeholder rather than a product centerpiece.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| **Chip selector (M4 / M4 Pro / M4 Max)** | Apple's own pages segment by variant; visitors expect to compare tiers | LOW | 3-tab/button toggle. Maps directly to product tiers (Starter/Pro/Enterprise). Existing `chips` data already has all three M4 variants. |
| **Core count display (CPU + GPU)** | The most recognizable chip spec; every hardware page shows this | LOW | Show performance + efficiency core split for CPU. Existing data: M4 (4P+6E=10), M4 Pro (10P+4E=14), M4 Max (12P+4E=16). GPU: 10/20/40. |
| **Neural Engine TOPS callout** | Apple markets M4 heavily on "38 TOPS" for AI workloads; this is the AI selling point | LOW | All M4 variants share 16-core Neural Engine at 38 TOPS. Current `chips.ts` has `neuralEngineCores: 16` but does NOT have TOPS -- needs adding. |
| **Unified memory display** | Apple's key architectural advantage; distinguishes from discrete GPU systems | LOW | Max memory: 32GB / 64GB / 128GB. Bandwidth: 120 / 273 / 546 GB/s. Already in `chips.ts`. |
| **Visual chip die/block diagram** | Apple, Qualcomm, Intel all show a die-shot or block diagram as the visual anchor | MEDIUM | SVG with labeled blocks for CPU, GPU, Neural Engine, Memory Controller. Not a photograph -- a stylized schematic. |
| **Responsive layout** | Must work on mobile (60%+ of marketing traffic) | MEDIUM | Chip diagram must scale down gracefully. On mobile: stack vertically, simplify labels, maintain readability. |
| **Spec number animations (count-up)** | Industry standard for landing pages showing impressive numbers; creates engagement | LOW | Numbers animate from 0 to target value on scroll-into-view. Use `requestAnimationFrame` or CSS counter -- no library needed. |
| **Clear headline + subtext** | Hero must communicate "why Apple Silicon for AI" in 2-3 seconds | LOW | New copy replacing current generic hero. Emphasize raw power for AI workloads. |

### Differentiators (Competitive Advantage)

Features that elevate beyond a static spec sheet. These create the "wow" factor that Apple's own pages achieve.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| **Animated glowing cores** | Visual metaphor for active processing; makes the diagram feel alive | MEDIUM | CSS animation on SVG elements: pulse/glow effect on CPU/GPU core blocks. Performance and efficiency cores should have different colors (e.g., blue for performance, green for efficiency). |
| **Flowing data path animations** | Shows unified memory architecture advantage -- data flowing between CPU/GPU/Neural Engine without bottlenecks | MEDIUM | SVG `stroke-dasharray` + `stroke-dashoffset` animation along paths connecting chip blocks. Classic technique for circuit/data flow visualization. |
| **Tier-to-product mapping** | Connect M4 variant selection to product tier (M4 = Starter Mac Mini, M4 Pro = Pro, M4 Max = Enterprise) | LOW | When user selects chip variant, show which AI-Local Hub product tier uses it. Bridges hardware specs to business offering. |
| **Process node badge (3nm)** | Communicates manufacturing sophistication; Apple emphasizes "second-generation 3nm" | LOW | Small badge/label on chip diagram: "2nd Gen 3nm -- 28B transistors". Adds credibility. |
| **Scroll-triggered entrance** | Diagram builds itself as user scrolls into view, creating reveal moment | MEDIUM | Use IntersectionObserver to trigger entrance animation. Elements fade/slide in sequentially: outline first, then cores, then specs. No scroll-hijacking. |
| **Performance comparison callout** | "Up to 6x faster than M1" style relative performance claims | LOW | Apple uses multiplier comparisons extensively. Add one or two key claims per variant to contextualize raw numbers. |

### Anti-Features (Commonly Requested, Often Problematic)

| Feature | Why Requested | Why Problematic | Alternative |
|---------|---------------|-----------------|-------------|
| **3D chip rendering (WebGL/Three.js)** | Looks impressive in demos | 100-300KB+ bundle size; GPU-intensive kills mobile performance; complex to maintain; diminishing returns vs well-designed 2D SVG | Styled SVG with CSS animations. Apple's own pages use 2D graphics with careful lighting/shadow, not WebGL. PROJECT.md explicitly rules this out. |
| **Real-time benchmark data** | Seems more credible | Requires backend, varies by workload/configuration, creates liability for accuracy claims | Use Apple's official published specs. Marketing specs are sufficient and verifiable. PROJECT.md rules this out. |
| **Chip comparison slider (A vs B side-by-side)** | Interactive comparison is engaging | Already have ChipComparison component with Recharts for this purpose; duplicating in Hero creates confusion about where to compare | Hero shows ONE chip at a time with selector. Comparison lives in dedicated ChipComparison section below. |
| **Particle effects around chip** | Existing ParticleBackground suggests adding particles to chip | Competes visually with the chip diagram itself; performance cost compounds; visual noise | Keep ParticleBackground as ambient background. Chip diagram should be clean with its own self-contained glow effects. |
| **Auto-cycling through chip variants** | Showcases all chips without interaction | Disorienting -- user loses control; animation may change while reading specs; accessibility concern (motion) | Default to M4 Pro (featured/middle tier), let user manually switch. Static default is more usable. |
| **Hover tooltips on every chip block** | Shows extra detail | Mobile has no hover; creates information overload; fragments the reading experience | Show all key specs directly on the diagram. If detail is needed, it belongs in the spec panel, not tooltips. |
| **Animated transistor count** | "28 billion transistors" is impressive | Number is same across all M4 variants; animating it adds visual noise without differentiation value | Show as static badge text: "28B transistors / 2nd Gen 3nm". |
| **Sound effects** | Some marketing sites add subtle audio | Universally disliked; auto-playing audio is hostile UX; increases bounce rate | No audio. Visual-only animations. |

## Feature Dependencies

```
Chip data layer (chips.ts + types.ts)          [EXISTS]
    |
    +-- needs TOPS field added to Chip type     [NEW - trivial]
    |
    v
SVG Chip Diagram Component                     [NEW - core]
    |
    +-- requires chip data for rendering
    |
    +-- Chip Variant Selector (M4/Pro/Max)      [NEW - controls diagram]
    |       |
    |       +-- updates diagram when variant changes
    |       +-- maps to product tiers (existing ProductTiers section)
    |
    +-- Core Glow Animations (CSS)              [NEW - enhances diagram]
    |
    +-- Data Flow Path Animations (SVG+CSS)     [NEW - enhances diagram]
    |
    v
Count-Up Number Animations                     [NEW - independent]
    |
    +-- requires IntersectionObserver trigger
    |
    v
Hero Layout Redesign                           [NEW - wraps everything]
    |
    +-- requires SVG Chip Diagram
    +-- requires Chip Variant Selector
    +-- requires Count-Up Numbers
    +-- requires new headline/subtext/CTAs
    +-- depends on existing i18n system (useI18n hook) for text
```

### Dependency Notes

- **SVG Chip Diagram requires chip data layer:** Existing `chips.ts` provides all M4 specs except TOPS. Adding a `tops` field to the `Chip` interface is a prerequisite.
- **Chip Variant Selector drives diagram:** The selector is the primary interaction -- changing variant re-renders the diagram with new specs. This is the user's only control.
- **Glow and flow animations enhance diagram:** These are CSS-only additions layered on top of the base SVG. They can be built incrementally after the static diagram works.
- **Count-up animations are independent:** They only need IntersectionObserver and the numeric values. Can be built and tested separately from the diagram.
- **Hero layout wraps all sub-components:** This is the integration step -- it depends on all visual pieces being ready.

## Verified M4 Family Specs (Source: Apple Newsroom)

These are the official numbers the diagram must display.

| Spec | M4 | M4 Pro | M4 Max |
|------|----|--------|--------|
| CPU Cores (P+E) | 4P + 6E = 10 | 10P + 4E = 14 | 12P + 4E = 16 |
| GPU Cores | 10 | 20 | 40 |
| Neural Engine | 16-core, 38 TOPS | 16-core, 38 TOPS | 16-core, 38 TOPS |
| Max Unified Memory | 32 GB | 64 GB | 128 GB |
| Memory Bandwidth | 120 GB/s | 273 GB/s | 546 GB/s |
| Process Node | 2nd Gen 3nm | 2nd Gen 3nm | 2nd Gen 3nm |
| Transistors | 28B | ~28B | ~28B |

**Data gap in current codebase:** `chips.ts` lacks a `tops` field. All M4 variants have 38 TOPS. Needs to be added to the `Chip` type and chip data.

**Existing data accuracy check:** The current `chips.ts` M4 specs match Apple's official numbers for CPU cores, GPU cores, neural engine cores, memory bandwidth, and max memory. Data is correct.

## MVP Definition

### Launch With (Phase 1 -- Core Diagram)

- [ ] **TOPS field added to Chip type and data** -- Prerequisite for Neural Engine display
- [ ] **Static SVG chip block diagram** -- CPU, GPU, Neural Engine, Memory Controller blocks with labels and spec numbers
- [ ] **Chip variant selector (M4 / M4 Pro / M4 Max)** -- Tab/button group that updates diagram
- [ ] **Count-up number animations** -- Specs animate on scroll-into-view
- [ ] **Hero layout redesign** -- New headline, subtext, CTAs wrapping the diagram
- [ ] **Responsive design** -- Diagram readable on mobile

### Add After Core Works (Phase 2 -- Polish)

- [ ] **Glowing core animations** -- CSS pulse/glow on CPU and GPU blocks
- [ ] **Data flow path animations** -- SVG stroke animations showing data movement
- [ ] **Scroll-triggered entrance** -- Diagram builds as user scrolls in
- [ ] **Tier-to-product mapping** -- Connect variant selection to product tier label
- [ ] **Performance comparison callout** -- "Nx faster" claims per variant

### Explicitly Defer (Out of Scope)

- [ ] **i18n for hero text** -- PROJECT.md defers this
- [ ] **3D rendering** -- PROJECT.md explicitly rules out
- [ ] **Real benchmark data** -- Marketing specs sufficient per PROJECT.md
- [ ] **Comparison slider** -- Already handled by ChipComparison component

## Feature Prioritization Matrix

| Feature | User Value | Implementation Cost | Priority |
|---------|------------|---------------------|----------|
| SVG chip block diagram | HIGH | MEDIUM | P1 |
| Chip variant selector | HIGH | LOW | P1 |
| Count-up number animations | HIGH | LOW | P1 |
| Hero layout redesign | HIGH | MEDIUM | P1 |
| Responsive design | HIGH | MEDIUM | P1 |
| TOPS field in data layer | MEDIUM | LOW | P1 |
| Glowing core animations | MEDIUM | LOW | P2 |
| Data flow path animations | MEDIUM | MEDIUM | P2 |
| Scroll-triggered entrance | MEDIUM | LOW | P2 |
| Tier-to-product mapping | MEDIUM | LOW | P2 |
| Performance callouts | LOW | LOW | P3 |
| Process node badge | LOW | LOW | P3 |

**Priority key:**
- P1: Must have for launch -- the diagram is non-functional or unimpressive without these
- P2: Should have -- these create the "wow" factor that differentiates from a static spec table
- P3: Nice to have -- small polish items that add credibility

## Competitor Feature Analysis

| Feature | Apple (apple.com/mac-mini) | Qualcomm (Snapdragon pages) | Our Approach |
|---------|---------------------------|----------------------------|--------------|
| Chip visualization | Stylized die photo with labeled sections; 2D, not 3D | Abstract block diagrams with color coding | SVG block diagram with labeled CPU/GPU/NE/Memory sections. Stylized, not photorealistic. |
| Spec presentation | Tabbed content (Productivity/Creativity/Gaming); multiplier comparisons (6x faster) | Raw numbers in grid layout | Spec numbers on the diagram itself + count-up animation for engagement |
| Variant comparison | Separate pages per chip variant | Side-by-side comparison tables | Single diagram that updates on variant selection (more interactive) |
| Animation style | Scroll-triggered reveals; embedded video demos; performance bar multipliers | Minimal animation, mostly static | CSS glow + SVG data flow paths. Lightweight, no video needed. |
| Mobile approach | Simplified layout, stacked sections, same content | Often broken or cropped on mobile | Responsive SVG that scales; simplified labels on small screens |

## Sources

### High Confidence (Official Apple Specs)
- [Apple introduces M4 chip (May 2024)](https://www.apple.com/newsroom/2024/05/apple-introduces-m4-chip/) -- M4 base specs: 10-core CPU, 10-core GPU, 38 TOPS, 28B transistors, 2nd gen 3nm
- [Apple introduces M4 Pro and M4 Max (Oct 2024)](https://www.apple.com/newsroom/2024/10/apple-introduces-m4-pro-and-m4-max/) -- M4 Pro: 14-core CPU, 20-core GPU, 273 GB/s. M4 Max: 16-core CPU, 40-core GPU, 546 GB/s
- [Apple M4 Wikipedia](https://en.wikipedia.org/wiki/Apple_M4) -- All M4 variants share 16-core Neural Engine at 38 TOPS

### Medium Confidence (Visual Pattern Analysis)
- [Apple Mac mini product page](https://www.apple.com/mac-mini/) -- Visual design patterns: tabbed content, performance multipliers, abstract chip graphics, scroll-triggered reveals
- [SVG Animation in React -- Motion](https://motion.dev/docs/react-svg-animation) -- React SVG animation patterns: path drawing, morphing, attribute animation
- [SVG Animation Encyclopedia 2025](https://www.svgai.org/blog/research/svg-animation-encyclopedia-complete-guide) -- Comprehensive SVG animation techniques and performance benchmarks
- [Interactive SVG Diagrams -- Flourish](https://flourish.studio/blog/interactive-svg-template/) -- Making SVG regions interactive for data visualization
- [Circuit Animation SVG+CSS -- Dribbble](https://dribbble.com/shots/3433250-Circuit-Animation-SVG-CSS) -- Reference for data flow / circuit path animations using stroke-dasharray

---
*Feature research for: Animated Apple Silicon Chip Diagram (Hero Section)*
*Researched: 2026-03-07*
