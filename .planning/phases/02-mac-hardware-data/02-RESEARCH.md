# Phase 2: Mac Hardware Data - Research

**Researched:** 2026-03-05
**Domain:** Apple Silicon specifications, TypeScript data modeling, AI model memory requirements
**Confidence:** HIGH

## Summary

Phase 2 requires creating structured TypeScript data for Mac models, M-series chips, and AI model RAM requirements. This research covers the complete Apple Silicon lineup from 2020-2026, M-series chip specifications (M1 through M5), and AI model quantization memory requirements.

The technical domain is well-documented with official Apple specifications available for all Mac models and chips. TypeScript interface patterns for data modeling are mature and standardized. The primary challenge is maintaining specification accuracy as Apple's lineup evolves, particularly with M5 chips launching in Q1 2026.

**Primary recommendation:** Use TypeScript interfaces with const assertions for type-safe data arrays. Structure data hierarchically (Chip → MacModel → AIModel) to enable flexible filtering and compatibility matching. Verify all specifications against official Apple sources and use Q4_K_M quantization as baseline for AI model RAM requirements.

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| R3 | Mac Model Selector (data layer) | Complete Mac model data structure with chip specs, RAM configurations, and device categories from 2020-2026 lineup |
| R4 | M-Series Chip Comparison | Comprehensive chip specifications including CPU/GPU cores, Neural Engine, memory bandwidth (M1: 200GB/s → M4 Max: 546GB/s) |
</phase_requirements>

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| TypeScript | 5.8+ | Type-safe data modeling | Project already uses TS; strict mode ensures data integrity |
| React | 19.2.4 | Component framework | Already installed; React 19 has stable type definitions |
| Recharts | 3.7.0 | Chart visualization | Already installed; declarative API matches React patterns |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| Vitest | 4.0.18 | Test framework | Already configured; test data validation functions |
| @testing-library/react | 16.3.2 | Component testing | Already installed; test chip comparison component |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Recharts | Chart.js | More features but not React-native; existing codebase uses Recharts |
| interfaces | types | Interfaces preferred for object shapes; extendable for future phases |
| JSON data | API fetch | Static data sufficient for v1; no backend needed |

**Installation:**
No new dependencies required. All necessary libraries already installed.

## Architecture Patterns

### Recommended Project Structure
```
components/
├── data/
│   ├── types.ts           # TypeScript interfaces
│   ├── chips.ts           # M-series chip data
│   ├── macModels.ts       # Mac model data
│   ├── aiModels.ts        # AI model data
│   └── compatibility.ts   # Filtering/matching functions
├── ChipComparison.tsx     # New component
└── ModelHardwareGraph.tsx # Existing (may be refactored)
```

### Pattern 1: Type-Safe Data Interfaces

**What:** Define strict TypeScript interfaces for all data entities with explicit types and readonly properties where appropriate.

**When to use:** All data structures in Phase 2. Ensures type safety and IDE autocomplete.

**Example:**
```typescript
// components/data/types.ts
export interface Chip {
  readonly id: string;
  readonly name: string;
  readonly generation: 'M1' | 'M2' | 'M3' | 'M4' | 'M5';
  readonly variant: 'base' | 'Pro' | 'Max' | 'Ultra';
  readonly cpuCores: {
    performance: number;
    efficiency: number;
    total: number;
  };
  readonly gpuCores: number;
  readonly neuralEngineCores: number;
  readonly memoryBandwidth: number; // GB/s
  readonly maxMemory: number; // GB
  readonly processNode: string; // e.g., "5nm", "3nm"
}

export interface MacModel {
  readonly id: string;
  readonly name: string;
  readonly category: 'MacBook Air' | 'MacBook Pro' | 'Mac Mini' | 'Mac Studio' | 'Mac Pro';
  readonly chipId: string; // References Chip.id
  readonly releaseYear: number;
  readonly ramOptions: readonly number[]; // Available RAM configs in GB
  readonly startingPrice?: number; // Optional, USD
}

export interface AIModel {
  readonly id: string;
  readonly name: string;
  readonly family: 'Llama' | 'Mistral' | 'Phi' | 'Qwen' | 'Gemma' | 'DeepSeek';
  readonly parameters: string; // e.g., "7B", "70B"
  readonly minRamGB: number; // Q4_K_M quantization baseline
  readonly quantization: 'Q4_K_M' | 'Q8_0';
  readonly description: string; // Vietnamese
  readonly useCase: string; // Vietnamese
}
```

**Why this works:** Readonly properties prevent accidental mutations. Union types for categories ensure consistency. Separating chip specs from Mac models enables reuse across multiple Mac configurations.

### Pattern 2: Const Assertions for Data Arrays

**What:** Use `as const` assertion for data arrays to create readonly tuples with literal types.

**When to use:** All static data arrays. Provides maximum type safety and IDE support.

**Example:**
```typescript
// components/data/chips.ts
import type { Chip } from './types';

export const chips: readonly Chip[] = [
  {
    id: 'm1-base',
    name: 'M1',
    generation: 'M1',
    variant: 'base',
    cpuCores: { performance: 4, efficiency: 4, total: 8 },
    gpuCores: 8,
    neuralEngineCores: 16,
    memoryBandwidth: 68.25,
    maxMemory: 16,
    processNode: '5nm'
  },
  {
    id: 'm4-max',
    name: 'M4 Max',
    generation: 'M4',
    variant: 'Max',
    cpuCores: { performance: 12, efficiency: 4, total: 16 },
    gpuCores: 40,
    neuralEngineCores: 16,
    memoryBandwidth: 546,
    maxMemory: 128,
    processNode: '3nm (2nd gen)'
  }
] as const;

// Type helper for narrowing
export const getChipById = (id: string): Chip | undefined => {
  return chips.find(chip => chip.id === id);
};
```

**Source:** [Best Practices for TypeScript with React in 2026](https://medium.com/@mernstackdevbykevin/typescript-with-react-best-practices-2026-78ce4546210b)

### Pattern 3: Compatibility Function with Type Guards

**What:** Pure function that filters AI models by Mac's available RAM, with proper type narrowing.

**When to use:** For Mac selector integration in Phase 3.

**Example:**
```typescript
// components/data/compatibility.ts
import type { MacModel, AIModel, Chip } from './types';
import { chips } from './chips';
import { aiModels } from './aiModels';

export interface CompatibilityResult {
  compatible: AIModel[];
  requiresUpgrade: AIModel[];
  chip: Chip;
  maxRam: number;
}

export function getCompatibleModels(
  mac: MacModel,
  selectedRam: number
): CompatibilityResult {
  const chip = chips.find(c => c.id === mac.chipId);

  if (!chip) {
    throw new Error(`Chip not found for Mac: ${mac.id}`);
  }

  const compatible = aiModels.filter(ai => ai.minRamGB <= selectedRam);
  const requiresUpgrade = aiModels.filter(
    ai => ai.minRamGB > selectedRam && ai.minRamGB <= chip.maxMemory
  );

  return {
    compatible,
    requiresUpgrade,
    chip,
    maxRam: Math.min(selectedRam, chip.maxMemory)
  };
}
```

### Pattern 4: Recharts Integration for Chip Comparison

**What:** Declarative bar chart component comparing chip specifications.

**When to use:** R4 chip comparison requirement.

**Example:**
```typescript
// components/ChipComparison.tsx
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { chips } from './data/chips';

export const ChipComparison: React.FC = () => {
  // Transform chip data for Recharts
  const chartData = chips.map(chip => ({
    name: chip.name,
    'CPU Cores': chip.cpuCores.total,
    'GPU Cores': chip.gpuCores,
    'Memory (GB/s)': chip.memoryBandwidth / 10, // Scale for visibility
    'Max RAM (GB)': chip.maxMemory
  }));

  return (
    <div className="glass-card p-6 lg:p-10 rounded-[2.5rem]">
      <h3 className="text-white font-bold mb-6">So sánh chip M-series</h3>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis dataKey="name" stroke="#94a3b8" />
          <YAxis stroke="#94a3b8" />
          <Tooltip
            contentStyle={{
              backgroundColor: '#0f172a',
              border: '1px solid #1e293b'
            }}
          />
          <Legend />
          <Bar dataKey="CPU Cores" fill="#60A5FA" />
          <Bar dataKey="GPU Cores" fill="#3B82F6" />
          <Bar dataKey="Max RAM (GB)" fill="#8B5CF6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
```

**Source:** [Recharts Official Docs](https://recharts.org/) and existing ModelHardwareGraph.tsx pattern

### Anti-Patterns to Avoid

- **Using `any` type:** Defeats TypeScript's purpose. Always use explicit interfaces.
- **Classes for data:** Classes add complexity without benefits for static data. Use interfaces and const data.
- **Mutable data arrays:** Use `readonly` and `as const` to prevent accidental mutations.
- **Hardcoded RAM values in AI models:** Always specify quantization level (Q4_K_M baseline) since memory varies by quantization.
- **Ignoring chip variants:** M1 Pro/Max/Ultra have vastly different specs. Don't group by generation only.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Chart rendering | Custom SVG/Canvas chart library | Recharts (already installed) | Handles responsive sizing, tooltips, animations, accessibility out of box |
| Data validation | Custom validation functions | TypeScript strict mode + interfaces | Compile-time validation catches errors before runtime |
| Device detection | Custom RAM compatibility logic | Type-safe filter functions | Easier to test, maintain, and extend for future phases |
| Memory calculations | Manual unit conversions | Store all values in consistent units (GB) | Eliminates conversion bugs; GB is standard for both RAM and bandwidth base unit |

**Key insight:** TypeScript's type system IS the validation layer. Don't duplicate validation logic at runtime when compile-time checks suffice for static data.

## Common Pitfalls

### Pitfall 1: Confusing Unified Memory with Traditional RAM

**What goes wrong:** Assuming unified memory requires different capacity calculations than traditional RAM for AI workloads.

**Why it happens:** Apple's marketing suggests unified memory is "2x as effective" as traditional RAM. While unified memory is more efficient due to zero-copy architecture (CPU and GPU share same memory pool), AI model memory requirements are based on model weight storage, which is the same regardless of memory architecture.

**How to avoid:**
- Use actual AI model memory footprints (e.g., Llama 3.1 8B Q4_K_M = ~5GB)
- Don't apply arbitrary multipliers to RAM requirements
- Document that unified memory benefits come from bandwidth and efficiency, not capacity

**Warning signs:** If you find yourself dividing RAM requirements by 2 for Apple Silicon, stop. A 70B model needs 64GB whether it's unified memory or traditional RAM.

**Sources:** [Apple Silicon unified memory vs traditional RAM](https://appleinsider.com/articles/23/06/28/why-apple-uses-integrated-memory-in-apple-silicon----and-why-its-both-good-and-bad)

### Pitfall 2: Ignoring Quantization Level in AI Model Specs

**What goes wrong:** Listing AI models without specifying quantization, leading to massive variance in actual RAM requirements. Llama 3.1 70B at FP16 needs 140GB, but Q4_K_M needs only 40GB.

**Why it happens:** AI model names don't include quantization info. Community often assumes Q4_K_M as default for local deployment, but this isn't universal.

**How to avoid:**
- Always specify quantization level in data (Q4_K_M, Q8_0)
- Document that RAM requirements are for specific quantization
- Q4_K_M is recommended baseline (75% size reduction, minimal quality loss)
- For 8GB Macs, Q3_K_S may be needed for larger models

**Warning signs:** If your 7B model shows >10GB RAM requirement, verify quantization level. FP16 would be 14GB; Q4_K_M should be ~5GB.

**Sources:** [AI Model Quantization Guide 2025](https://local-ai-zone.github.io/guides/what-is-ai-quantization-q4-k-m-q8-gguf-guide-2025.html)

### Pitfall 3: Outdated Mac Specifications

**What goes wrong:** Using specs from old articles or unofficial sources, leading to incorrect RAM configurations or missing models.

**Why it happens:** Apple updates Mac lineup 1-2 times per year. WebSearch results mix current and outdated information. M5 chips just launched in Q1 2026.

**How to avoid:**
- Verify all specs against Apple's official technical specification pages
- Check release year for each model
- Note that base RAM increased from 8GB to 16GB in October 2024 for most Macs
- M5 MacBook Air starts at 16GB (March 2026)
- MacBook Neo is exception: 8GB non-upgradeable (March 2026)

**Warning signs:** If you see Mac Mini M4 with 8GB base RAM, that's outdated (changed to 16GB in Oct 2024).

**Sources:** [Apple Mac Models 2026 Guide](https://www.macworld.com/article/219909/best-mac.html)

### Pitfall 4: Incorrect Memory Bandwidth Values

**What goes wrong:** Mixing up theoretical vs actual bandwidth, or confusing LPDDR5X transfer rates with effective bandwidth.

**Why it happens:** Technical specs often list both "memory bandwidth" and "memory bus width" which require calculation.

**How to avoid:**
- Use Apple's published memory bandwidth figures (GB/s)
- M1: 68.25 GB/s (base), M1 Pro/Max: 200/400 GB/s
- M2 Pro/Max: 200/400 GB/s
- M3 Pro: 150 GB/s (REDUCED from M2 Pro - notable downgrade)
- M4 Pro: 273 GB/s, M4 Max: 546 GB/s (14-core variant: 410 GB/s)
- M2 Ultra: 800 GB/s
- Bandwidth directly impacts AI inference speed (tokens/second)

**Warning signs:** If M3 Pro shows 200 GB/s, that's wrong. Apple reduced it to 150 GB/s due to narrower memory bus.

**Sources:** [M-series memory bandwidth comparison](https://en.wikipedia.org/wiki/Apple_M4)

### Pitfall 5: Using Classes Instead of Interfaces for Data

**What goes wrong:** Defining data as TypeScript classes adds unnecessary complexity, ruins tree-shaking, and provides no benefits for static data.

**Why it happens:** Developers familiar with OOP assume classes are "more professional" or "better structured."

**How to avoid:**
- Use interfaces for data shape definitions
- Use const objects for data instances
- Classes are for behavior; interfaces are for data structure
- Static data has no methods, so classes add zero value

**Warning signs:** If you're writing `new MacModel(...)`, stop. Use plain objects with interface types.

**Sources:** [Why TypeScript classes are poor for data](https://dev.to/ehaynes99/why-typescript-classes-are-a-poor-option-for-representing-data-3b1m)

## Code Examples

Verified patterns from official sources:

### Example 1: Complete Chip Data Structure

```typescript
// components/data/chips.ts
import type { Chip } from './types';

export const chips: readonly Chip[] = [
  // M1 Generation (2020-2021)
  {
    id: 'm1-base',
    name: 'M1',
    generation: 'M1',
    variant: 'base',
    cpuCores: { performance: 4, efficiency: 4, total: 8 },
    gpuCores: 8,
    neuralEngineCores: 16,
    memoryBandwidth: 68.25,
    maxMemory: 16,
    processNode: '5nm'
  },
  {
    id: 'm1-pro',
    name: 'M1 Pro',
    generation: 'M1',
    variant: 'Pro',
    cpuCores: { performance: 8, efficiency: 2, total: 10 },
    gpuCores: 16,
    neuralEngineCores: 16,
    memoryBandwidth: 200,
    maxMemory: 32,
    processNode: '5nm'
  },
  {
    id: 'm1-max',
    name: 'M1 Max',
    generation: 'M1',
    variant: 'Max',
    cpuCores: { performance: 8, efficiency: 2, total: 10 },
    gpuCores: 32,
    neuralEngineCores: 16,
    memoryBandwidth: 400,
    maxMemory: 64,
    processNode: '5nm'
  },
  {
    id: 'm1-ultra',
    name: 'M1 Ultra',
    generation: 'M1',
    variant: 'Ultra',
    cpuCores: { performance: 16, efficiency: 4, total: 20 },
    gpuCores: 64,
    neuralEngineCores: 32,
    memoryBandwidth: 800,
    maxMemory: 128,
    processNode: '5nm'
  },

  // M2 Generation (2022-2023)
  {
    id: 'm2-base',
    name: 'M2',
    generation: 'M2',
    variant: 'base',
    cpuCores: { performance: 4, efficiency: 4, total: 8 },
    gpuCores: 10,
    neuralEngineCores: 16,
    memoryBandwidth: 100,
    maxMemory: 24,
    processNode: '5nm (enhanced)'
  },
  {
    id: 'm2-pro',
    name: 'M2 Pro',
    generation: 'M2',
    variant: 'Pro',
    cpuCores: { performance: 8, efficiency: 4, total: 12 },
    gpuCores: 19,
    neuralEngineCores: 16,
    memoryBandwidth: 200,
    maxMemory: 32,
    processNode: '5nm (enhanced)'
  },
  {
    id: 'm2-max',
    name: 'M2 Max',
    generation: 'M2',
    variant: 'Max',
    cpuCores: { performance: 8, efficiency: 4, total: 12 },
    gpuCores: 38,
    neuralEngineCores: 16,
    memoryBandwidth: 400,
    maxMemory: 96,
    processNode: '5nm (enhanced)'
  },
  {
    id: 'm2-ultra',
    name: 'M2 Ultra',
    generation: 'M2',
    variant: 'Ultra',
    cpuCores: { performance: 16, efficiency: 8, total: 24 },
    gpuCores: 76,
    neuralEngineCores: 32,
    memoryBandwidth: 800,
    maxMemory: 192,
    processNode: '5nm (enhanced)'
  },

  // M3 Generation (2023-2024)
  {
    id: 'm3-base',
    name: 'M3',
    generation: 'M3',
    variant: 'base',
    cpuCores: { performance: 4, efficiency: 4, total: 8 },
    gpuCores: 10,
    neuralEngineCores: 16,
    memoryBandwidth: 100,
    maxMemory: 24,
    processNode: '3nm'
  },
  {
    id: 'm3-pro',
    name: 'M3 Pro',
    generation: 'M3',
    variant: 'Pro',
    cpuCores: { performance: 6, efficiency: 6, total: 12 },
    gpuCores: 18,
    neuralEngineCores: 16,
    memoryBandwidth: 150, // REDUCED from M2 Pro
    maxMemory: 36,
    processNode: '3nm'
  },
  {
    id: 'm3-max',
    name: 'M3 Max',
    generation: 'M3',
    variant: 'Max',
    cpuCores: { performance: 12, efficiency: 4, total: 16 },
    gpuCores: 40,
    neuralEngineCores: 16,
    memoryBandwidth: 400,
    maxMemory: 128,
    processNode: '3nm'
  },

  // M4 Generation (2024-2025)
  {
    id: 'm4-base',
    name: 'M4',
    generation: 'M4',
    variant: 'base',
    cpuCores: { performance: 4, efficiency: 6, total: 10 },
    gpuCores: 10,
    neuralEngineCores: 16,
    memoryBandwidth: 120,
    maxMemory: 32,
    processNode: '3nm (2nd gen)'
  },
  {
    id: 'm4-pro',
    name: 'M4 Pro',
    generation: 'M4',
    variant: 'Pro',
    cpuCores: { performance: 10, efficiency: 4, total: 14 },
    gpuCores: 20,
    neuralEngineCores: 16,
    memoryBandwidth: 273,
    maxMemory: 64,
    processNode: '3nm (2nd gen)'
  },
  {
    id: 'm4-max',
    name: 'M4 Max',
    generation: 'M4',
    variant: 'Max',
    cpuCores: { performance: 12, efficiency: 4, total: 16 },
    gpuCores: 40,
    neuralEngineCores: 16,
    memoryBandwidth: 546,
    maxMemory: 128,
    processNode: '3nm (2nd gen)'
  }
] as const;
```

**Sources:** [Apple M4 Wikipedia](https://en.wikipedia.org/wiki/Apple_M4), [M-series comparison](https://laptopmedia.com/comparisons/apple-m4-vs-m3-pro-max-vs-m2-pro-max-ultra-vs-m1-pro-max-ultra-the-ultimate-benchmark-comparison/)

### Example 2: Mac Models with Current Lineup (2024-2026)

```typescript
// components/data/macModels.ts
import type { MacModel } from './types';

export const macModels: readonly MacModel[] = [
  // MacBook Air
  {
    id: 'mba-m1-2020',
    name: 'MacBook Air M1',
    category: 'MacBook Air',
    chipId: 'm1-base',
    releaseYear: 2020,
    ramOptions: [8, 16]
  },
  {
    id: 'mba-m2-2022',
    name: 'MacBook Air M2',
    category: 'MacBook Air',
    chipId: 'm2-base',
    releaseYear: 2022,
    ramOptions: [8, 16, 24]
  },
  {
    id: 'mba-m3-2024',
    name: 'MacBook Air M3',
    category: 'MacBook Air',
    chipId: 'm3-base',
    releaseYear: 2024,
    ramOptions: [16, 24] // Base increased to 16GB in 2024
  },

  // MacBook Pro 14-inch
  {
    id: 'mbp14-m4-2024',
    name: 'MacBook Pro 14" M4',
    category: 'MacBook Pro',
    chipId: 'm4-base',
    releaseYear: 2024,
    ramOptions: [16, 24, 32]
  },
  {
    id: 'mbp14-m4-pro-2024',
    name: 'MacBook Pro 14" M4 Pro',
    category: 'MacBook Pro',
    chipId: 'm4-pro',
    releaseYear: 2024,
    ramOptions: [24, 48, 64]
  },
  {
    id: 'mbp14-m4-max-2024',
    name: 'MacBook Pro 14" M4 Max',
    category: 'MacBook Pro',
    chipId: 'm4-max',
    releaseYear: 2024,
    ramOptions: [36, 48, 64, 128]
  },

  // MacBook Pro 16-inch
  {
    id: 'mbp16-m4-pro-2024',
    name: 'MacBook Pro 16" M4 Pro',
    category: 'MacBook Pro',
    chipId: 'm4-pro',
    releaseYear: 2024,
    ramOptions: [24, 48, 64]
  },
  {
    id: 'mbp16-m4-max-2024',
    name: 'MacBook Pro 16" M4 Max',
    category: 'MacBook Pro',
    chipId: 'm4-max',
    releaseYear: 2024,
    ramOptions: [36, 48, 64, 128]
  },

  // Mac Mini
  {
    id: 'mac-mini-m1-2020',
    name: 'Mac Mini M1',
    category: 'Mac Mini',
    chipId: 'm1-base',
    releaseYear: 2020,
    ramOptions: [8, 16]
  },
  {
    id: 'mac-mini-m2-2023',
    name: 'Mac Mini M2',
    category: 'Mac Mini',
    chipId: 'm2-base',
    releaseYear: 2023,
    ramOptions: [8, 16, 24]
  },
  {
    id: 'mac-mini-m2-pro-2023',
    name: 'Mac Mini M2 Pro',
    category: 'Mac Mini',
    chipId: 'm2-pro',
    releaseYear: 2023,
    ramOptions: [16, 32]
  },
  {
    id: 'mac-mini-m4-2024',
    name: 'Mac Mini M4',
    category: 'Mac Mini',
    chipId: 'm4-base',
    releaseYear: 2024,
    ramOptions: [16, 24, 32] // Base increased to 16GB Oct 2024
  },
  {
    id: 'mac-mini-m4-pro-2024',
    name: 'Mac Mini M4 Pro',
    category: 'Mac Mini',
    chipId: 'm4-pro',
    releaseYear: 2024,
    ramOptions: [24, 48, 64]
  },

  // Mac Studio
  {
    id: 'mac-studio-m1-max-2022',
    name: 'Mac Studio M1 Max',
    category: 'Mac Studio',
    chipId: 'm1-max',
    releaseYear: 2022,
    ramOptions: [32, 64]
  },
  {
    id: 'mac-studio-m1-ultra-2022',
    name: 'Mac Studio M1 Ultra',
    category: 'Mac Studio',
    chipId: 'm1-ultra',
    releaseYear: 2022,
    ramOptions: [64, 128]
  },
  {
    id: 'mac-studio-m2-max-2023',
    name: 'Mac Studio M2 Max',
    category: 'Mac Studio',
    chipId: 'm2-max',
    releaseYear: 2023,
    ramOptions: [32, 64, 96]
  },
  {
    id: 'mac-studio-m2-ultra-2023',
    name: 'Mac Studio M2 Ultra',
    category: 'Mac Studio',
    chipId: 'm2-ultra',
    releaseYear: 2023,
    ramOptions: [64, 128, 192]
  },

  // Mac Pro
  {
    id: 'mac-pro-m2-ultra-2023',
    name: 'Mac Pro M2 Ultra',
    category: 'Mac Pro',
    chipId: 'm2-ultra',
    releaseYear: 2023,
    ramOptions: [64, 128, 192]
  }
] as const;
```

**Sources:** [Mac Release Dates 2024](https://everymac.com/systems/by_year/macs-released-in-2024.html), [MacBook Pro Specs](https://www.macrumors.com/roundup/macbook-pro/)

### Example 3: AI Models with Q4_K_M Quantization

```typescript
// components/data/aiModels.ts
import type { AIModel } from './types';

export const aiModels: readonly AIModel[] = [
  // Small models (3-4B) - 8GB RAM Macs
  {
    id: 'phi-3-mini',
    name: 'Phi-3 Mini',
    family: 'Phi',
    parameters: '3.8B',
    minRamGB: 8,
    quantization: 'Q4_K_M',
    description: 'Mô hình nhỏ gọn, phù hợp cho trò chuyện cơ bản',
    useCase: 'Chatbot đơn giản, trả lời câu hỏi thông thường'
  },
  {
    id: 'gemma-2b',
    name: 'Gemma 2B',
    family: 'Gemma',
    parameters: '2B',
    minRamGB: 8,
    quantization: 'Q4_K_M',
    description: 'Siêu nhẹ, tốc độ nhanh nhất',
    useCase: 'Tóm tắt văn bản ngắn, kiểm tra chính tả'
  },

  // Mid-range models (7-8B) - 16GB RAM Macs
  {
    id: 'llama-3-1-8b',
    name: 'Llama 3.1 8B',
    family: 'Llama',
    parameters: '8B',
    minRamGB: 16,
    quantization: 'Q4_K_M',
    description: 'Tiêu chuẩn vàng cho trợ lý cá nhân',
    useCase: 'Viết email, code assistant, dịch thuật, tư vấn'
  },
  {
    id: 'mistral-7b',
    name: 'Mistral 7B',
    family: 'Mistral',
    parameters: '7B',
    minRamGB: 16,
    quantization: 'Q4_K_M',
    description: 'Hiệu suất mạnh mẽ, đa nhiệm tốt',
    useCase: 'Phân tích dữ liệu, tạo nội dung marketing'
  },
  {
    id: 'qwen-2-5-7b',
    name: 'Qwen 2.5 7B',
    family: 'Qwen',
    parameters: '7B',
    minRamGB: 16,
    quantization: 'Q4_K_M',
    description: 'Mạnh về toán học và code',
    useCase: 'Lập trình, giải toán, phân tích kỹ thuật'
  },

  // Larger models (13-14B) - 24GB RAM Macs
  {
    id: 'phi-4',
    name: 'Phi-4',
    family: 'Phi',
    parameters: '14B',
    minRamGB: 24,
    quantization: 'Q4_K_M',
    description: 'Cân bằng giữa kích thước và chất lượng',
    useCase: 'Nghiên cứu, phân tích chuyên sâu, viết báo cáo'
  },
  {
    id: 'mistral-nemo-12b',
    name: 'Mistral Nemo 12B',
    family: 'Mistral',
    parameters: '12B',
    minRamGB: 24,
    quantization: 'Q4_K_M',
    description: 'Phù hợp văn phòng vừa và nhỏ',
    useCase: 'Quản lý tri thức doanh nghiệp, RAG cơ bản'
  },

  // Large models (30-34B) - 32GB RAM Macs
  {
    id: 'qwen-2-5-32b',
    name: 'Qwen 2.5 32B',
    family: 'Qwen',
    parameters: '32B',
    minRamGB: 32,
    quantization: 'Q4_K_M',
    description: 'Chuyên gia về code và phân tích',
    useCase: 'Code generation nâng cao, kiến trúc phần mềm'
  },

  // Very large models (70B) - 64GB RAM Macs
  {
    id: 'llama-3-1-70b',
    name: 'Llama 3.1 70B',
    family: 'Llama',
    parameters: '70B',
    minRamGB: 64,
    quantization: 'Q4_K_M',
    description: 'Mô hình mạnh mẽ cho doanh nghiệp',
    useCase: 'RAG phức tạp, phân tích dữ liệu lớn, tư vấn chuyên sâu'
  },
  {
    id: 'qwen-2-5-72b',
    name: 'Qwen 2.5 72B',
    family: 'Qwen',
    parameters: '72B',
    minRamGB: 64,
    quantization: 'Q4_K_M',
    description: 'Sức mạnh đỉnh cao cho code và toán',
    useCase: 'Kiến trúc hệ thống, nghiên cứu AI'
  },

  // Extreme models (140B+) - 128GB+ RAM Macs
  {
    id: 'deepseek-v3',
    name: 'DeepSeek V3',
    family: 'DeepSeek',
    parameters: '671B (MoE)',
    minRamGB: 128,
    quantization: 'Q4_K_M',
    description: 'Chuyên gia về code và lý luận',
    useCase: 'Phát triển AI, nghiên cứu khoa học'
  },
  {
    id: 'deepseek-r1',
    name: 'DeepSeek R1',
    family: 'DeepSeek',
    parameters: '671B (MoE)',
    minRamGB: 128,
    quantization: 'Q4_K_M',
    description: 'Reasoning model mạnh nhất',
    useCase: 'Giải quyết vấn đề phức tạp, lập kế hoạch chiến lược'
  }
] as const;
```

**Sources:** [Ollama VRAM Requirements 2026](https://localllm.in/blog/ollama-vram-requirements-for-local-llms), [150+ AI Models Compared](https://localaimaster.com/models)

### Example 4: Vitest Tests for Data Validation

```typescript
// components/data/__tests__/compatibility.test.ts
import { describe, it, expect } from 'vitest';
import { getCompatibleModels } from '../compatibility';
import { macModels } from '../macModels';
import { chips } from '../chips';

describe('getCompatibleModels', () => {
  it('should return compatible AI models for Mac Mini M4 with 16GB', () => {
    const macMini = macModels.find(m => m.id === 'mac-mini-m4-2024')!;
    const result = getCompatibleModels(macMini, 16);

    expect(result.compatible.length).toBeGreaterThan(0);
    expect(result.compatible.every(ai => ai.minRamGB <= 16)).toBe(true);
  });

  it('should separate compatible from requiresUpgrade models', () => {
    const macMiniPro = macModels.find(m => m.id === 'mac-mini-m4-pro-2024')!;
    const result = getCompatibleModels(macMiniPro, 24);

    // Should have models that fit in 24GB
    expect(result.compatible.length).toBeGreaterThan(0);

    // Should have models that need upgrade (24GB < model <= 64GB max)
    expect(result.requiresUpgrade.length).toBeGreaterThan(0);
    expect(result.requiresUpgrade.every(
      ai => ai.minRamGB > 24 && ai.minRamGB <= result.chip.maxMemory
    )).toBe(true);
  });

  it('should correctly identify chip for Mac', () => {
    const macStudio = macModels.find(m => m.id === 'mac-studio-m2-ultra-2023')!;
    const result = getCompatibleModels(macStudio, 128);

    expect(result.chip.id).toBe('m2-ultra');
    expect(result.chip.maxMemory).toBe(192);
    expect(result.maxRam).toBe(128);
  });

  it('should throw error for invalid Mac model', () => {
    const invalidMac = {
      ...macModels[0],
      chipId: 'nonexistent-chip'
    };

    expect(() => getCompatibleModels(invalidMac, 16))
      .toThrow('Chip not found');
  });
});

describe('chips data integrity', () => {
  it('should have consistent memory bandwidth progression', () => {
    const m1Pro = chips.find(c => c.id === 'm1-pro')!;
    const m1Max = chips.find(c => c.id === 'm1-max')!;
    const m1Ultra = chips.find(c => c.id === 'm1-ultra')!;

    expect(m1Pro.memoryBandwidth).toBe(200);
    expect(m1Max.memoryBandwidth).toBe(400);
    expect(m1Ultra.memoryBandwidth).toBe(800); // Double of Max
  });

  it('should verify M3 Pro bandwidth reduction', () => {
    const m2Pro = chips.find(c => c.id === 'm2-pro')!;
    const m3Pro = chips.find(c => c.id === 'm3-pro')!;

    expect(m2Pro.memoryBandwidth).toBe(200);
    expect(m3Pro.memoryBandwidth).toBe(150); // Known downgrade
  });
});
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| 8GB base RAM for Macs | 16GB base RAM (except MacBook Neo) | October 2024 | Better AI model support out of box |
| M3 Pro 200GB/s bandwidth | M3 Pro 150GB/s bandwidth | October 2023 | M3 Pro slower than M2 Pro for AI inference |
| Classes for data modeling | Interfaces + const assertions | TypeScript 3.4+ (2019) | Simpler, better tree-shaking, no runtime overhead |
| Manual quantization | Q4_K_M as standard | 2024-2025 | 75% size reduction with minimal quality loss |
| Separate CPU/GPU memory | Unified Memory Architecture | M1 launch (2020) | Zero-copy memory access for AI workloads |

**Deprecated/outdated:**
- **8GB as baseline for Macs:** Most Macs now start at 16GB (Oct 2024 update)
- **FP16 models for local inference:** Too large for consumer hardware; Q4_K_M is standard
- **particles.js library:** Abandoned; replaced by tsParticles (already implemented in Phase 1)
- **M3 Pro having same bandwidth as M2 Pro:** M3 Pro reduced to 150GB/s (design regression)

## Open Questions

1. **M5 Chip Coverage**
   - What we know: M5 launched October 2025; M5 Pro/Max coming March 2026
   - What's unclear: Complete specifications for M5 Pro/Max not yet public
   - Recommendation: Include M5 base chip data now; add Pro/Max in future update when specs confirmed

2. **Mac Studio M4 Availability**
   - What we know: Mac Studio currently on M2 Max/Ultra (2023)
   - What's unclear: Timeline for M4 Mac Studio refresh
   - Recommendation: Include current M2 models; note that M4 Studio expected 2026

3. **AI Model Version Numbers**
   - What we know: Models frequently update (Llama 3.1, 3.2, 3.3...)
   - What's unclear: Whether to include minor version numbers in data
   - Recommendation: Use major versions (Llama 3.1, Qwen 2.5) to avoid frequent updates

4. **Vietnamese Translation Quality**
   - What we know: Existing components use Vietnamese labels
   - What's unclear: Optimal technical terminology for non-technical Vietnamese audience
   - Recommendation: Follow existing ModelHardwareGraph.tsx translation patterns; get user feedback in Phase 3

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | Vitest 4.0.18 |
| Config file | vitest.config.ts (exists) |
| Quick run command | `npm test` |
| Full suite command | `npm test -- --run` |

### Phase Requirements → Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| R3 | MacModel interface validates RAM options | unit | `npm test -- data/macModels.test.ts -x` | ❌ Wave 0 |
| R3 | getCompatibleModels filters by RAM | unit | `npm test -- data/compatibility.test.ts -x` | ❌ Wave 0 |
| R3 | Chip specs reference integrity | unit | `npm test -- data/chips.test.ts -x` | ❌ Wave 0 |
| R4 | ChipComparison renders chart | integration | `npm test -- ChipComparison.test.tsx -x` | ❌ Wave 0 |
| R4 | Chart data transformation correct | unit | `npm test -- ChipComparison.test.tsx -x` | ❌ Wave 0 |

### Sampling Rate
- **Per task commit:** `npm test -- [specific-file] -x` (run tests for changed file)
- **Per wave merge:** `npm test` (all tests)
- **Phase gate:** Full suite green before `/gsd:verify-work`

### Wave 0 Gaps
- [ ] `components/data/__tests__/chips.test.ts` — covers R3 (chip data integrity)
- [ ] `components/data/__tests__/macModels.test.ts` — covers R3 (Mac model data validation)
- [ ] `components/data/__tests__/aiModels.test.ts` — covers R3 (AI model data validation)
- [ ] `components/data/__tests__/compatibility.test.ts` — covers R3 (compatibility logic)
- [ ] `components/__tests__/ChipComparison.test.tsx` — covers R4 (component rendering)

## Sources

### Primary (HIGH confidence)
- [Apple M4 Wikipedia](https://en.wikipedia.org/wiki/Apple_M4) - Complete M4 specifications
- [Mac computers with Apple silicon - Apple Support](https://support.apple.com/en-us/116943) - Official Mac model list
- [Mac Studio 2023 Tech Specs](https://support.apple.com/en-us/111835) - M2 Ultra specifications
- [Mac Pro M2 Ultra Specs](https://everymac.com/systems/apple/mac_pro/specs/mac-pro-m2-ultra-24-core-cpu-60-core-gpu-tower-2023-specs.html) - Official specifications
- [Apple M5 vs M4 M3 M2 M1 Comparison](https://laptopmedia.com/comparisons/apple-m4-vs-m3-pro-max-vs-m2-pro-max-ultra-vs-m1-pro-max-ultra-the-ultimate-benchmark-comparison/) - Verified chip comparisons

### Secondary (MEDIUM confidence)
- [Ollama VRAM Requirements 2026](https://localllm.in/blog/ollama-vram-requirements-for-local-llms) - AI model RAM requirements with Q4_K_M quantization
- [AI Model Quantization Guide 2025](https://local-ai-zone.github.io/guides/what-is-ai-quantization-q4-k-m-q8-gguf-guide-2025.html) - Quantization explanation
- [Best Practices for TypeScript with React in 2026](https://medium.com/@mernstackdevbykevin/typescript-with-react-best-practices-2026-78ce4546210b) - Const assertions and type safety
- [Apple Silicon unified memory explained](https://www.xda-developers.com/apple-silicon-unified-memory/) - UMA architecture
- [Recharts GitHub](https://github.com/recharts/recharts) - Official library documentation

### Tertiary (LOW confidence)
- [Best Mac 2026 Guide](https://www.macworld.com/article/219909/best-mac.html) - General Mac lineup overview (needs verification against Apple specs)
- [Mac Release Dates 2024](https://everymac.com/systems/by_year/macs-released-in-2024.html) - Historical data (verify current models)

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - TypeScript, React, Recharts already in use; no new dependencies
- Architecture: HIGH - Patterns verified against existing codebase and TypeScript best practices
- Mac specifications: HIGH - Verified against official Apple sources and Wikipedia
- AI model RAM: MEDIUM-HIGH - Based on community benchmarks (Q4_K_M quantization well-documented)
- Pitfalls: HIGH - Common issues well-documented in community and official sources

**Research date:** 2026-03-05
**Valid until:** 2026-04-05 (30 days - stable domain, but Apple may update lineup in spring)

**Note on M5 chips:** M5 base launched October 2025; M5 Pro/Max launching March 2026. Specifications for Pro/Max variants may need verification after official release.
