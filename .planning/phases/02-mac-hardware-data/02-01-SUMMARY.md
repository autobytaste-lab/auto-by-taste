---
phase: 02-mac-hardware-data
plan: 01
subsystem: data-layer
tags: [typescript, data-modeling, testing, tdd, apple-silicon, ai-models]
dependency_graph:
  requires: []
  provides: [chip-data, mac-model-data, ai-model-data, compatibility-function]
  affects: [mac-model-selector, chip-comparison]
tech_stack:
  added: []
  patterns: [typescript-interfaces, const-assertions, tdd, vitest-testing]
key_files:
  created:
    - components/data/types.ts
    - components/data/chips.ts
    - components/data/macModels.ts
    - components/data/aiModels.ts
    - components/data/compatibility.ts
    - components/data/__tests__/chips.test.ts
    - components/data/__tests__/macModels.test.ts
    - components/data/__tests__/aiModels.test.ts
    - components/data/__tests__/compatibility.test.ts
  modified: []
decisions:
  - Use TypeScript interfaces with readonly properties for type safety
  - Apply const assertions for data arrays to maximize type inference
  - Follow TDD approach with RED-GREEN commits for each task
  - Include 14 M-series chips (M1-M4, no M5 yet)
  - Use Q4_K_M quantization as baseline for AI model RAM requirements
  - Document M3 Pro bandwidth regression (150 vs 200 GB/s)
metrics:
  duration: 4m 17s
  tasks_completed: 3
  tests_added: 33
  commits: 6
  files_created: 9
  completed_date: 2026-03-05
---

# Phase 02 Plan 01: Mac Hardware Data Summary

TypeScript data layer with 14 M-series chips, 18 Mac models (2020-2024), 12 AI models with Q4_K_M RAM specs, and compatibility filtering function.

## What Was Built

Created a complete type-safe data layer for Mac hardware specifications and AI model compatibility:

1. **TypeScript Interfaces** (types.ts):
   - Chip interface with CPU/GPU cores, memory bandwidth, max RAM
   - MacModel interface with category, chipId reference, RAM options
   - AIModel interface with parameters, RAM requirements, quantization
   - CompatibilityResult interface for filtering results

2. **Chip Data** (chips.ts):
   - 14 M-series chips from M1 through M4 (4+4+3+3 variants)
   - Accurate specifications from Apple official sources
   - M3 Pro bandwidth regression documented (150 GB/s vs M2 Pro 200 GB/s)
   - M1 Ultra double bandwidth of M1 Max (800 vs 400 GB/s)
   - getChipById helper function

3. **Mac Model Data** (macModels.ts):
   - 18 Mac models covering all categories (Air, Pro, Mini, Studio, Pro)
   - Current RAM configurations (16GB base for M4 Macs as of Oct 2024)
   - Mac Mini M4 and MacBook Air M3 start at 16GB (not 8GB)
   - chipId references validated against chips array
   - getMacById and getMacsByCategory helpers

4. **AI Model Data** (aiModels.ts):
   - 12 AI models across RAM tiers (8GB, 16GB, 24GB, 32GB, 64GB, 128GB)
   - Q4_K_M quantization specified for all models
   - Vietnamese descriptions and use cases
   - Families: Llama, Mistral, Phi, Qwen, Gemma, DeepSeek
   - getAIModelById helper

5. **Compatibility Function** (compatibility.ts):
   - getCompatibleModels filters AI models by Mac RAM capacity
   - Separates compatible vs requiresUpgrade models
   - Returns chip info and max RAM
   - Error handling for invalid chipId references

## Test Coverage

All 33 tests passing across 4 test files:

- **chips.test.ts** (9 tests): Chip data integrity, variant coverage, bandwidth validation
- **macModels.test.ts** (7 tests): Category coverage, chipId validation, RAM configs
- **aiModels.test.ts** (9 tests): RAM tier coverage, Vietnamese content, quantization
- **compatibility.test.ts** (8 tests): Filtering logic, edge cases, error handling

## Deviations from Plan

None - plan executed exactly as written. All tasks completed using TDD approach with RED-GREEN commits.

## Technical Decisions

**1. TypeScript Interfaces Over Classes**
- **Decision**: Use interfaces with readonly properties and const data arrays
- **Rationale**: Static data has no behavior, classes add unnecessary complexity and hurt tree-shaking
- **Impact**: Simpler code, better IDE autocomplete, smaller bundle size

**2. TDD with RED-GREEN Commits**
- **Decision**: Write failing tests first, commit, then implement, commit
- **Rationale**: Provides clear audit trail of test-driven development process
- **Impact**: 6 commits (3 tasks × 2 commits each), tests prove implementation correctness

**3. Q4_K_M Quantization Baseline**
- **Decision**: All AI models specify Q4_K_M quantization for RAM requirements
- **Rationale**: 75% size reduction with minimal quality loss, standard for local deployment
- **Impact**: Accurate RAM requirements for Mac Model Selector (Phase 3)

**4. M3 Pro Bandwidth Documentation**
- **Decision**: Document M3 Pro regression (150 GB/s vs M2 Pro 200 GB/s)
- **Rationale**: Known Apple design change, users need accurate performance expectations
- **Impact**: Test explicitly validates this regression to prevent future data errors

**5. 16GB Base RAM for M4 Macs**
- **Decision**: Mac Mini M4 and newer models start at 16GB (Oct 2024 update)
- **Rationale**: Apple increased base RAM across M4 lineup
- **Impact**: Tests validate correct RAM configurations, affects compatibility results

## Files Created

| File | LOC | Purpose |
|------|-----|---------|
| components/data/types.ts | 57 | TypeScript interfaces for all data types |
| components/data/chips.ts | 190 | 14 M-series chip specifications |
| components/data/macModels.ts | 187 | 18 Mac model configurations |
| components/data/aiModels.ts | 145 | 12 AI models with RAM requirements |
| components/data/compatibility.ts | 26 | Compatibility filtering function |
| components/data/__tests__/chips.test.ts | 88 | 9 chip data validation tests |
| components/data/__tests__/macModels.test.ts | 58 | 7 Mac model validation tests |
| components/data/__tests__/aiModels.test.ts | 61 | 9 AI model validation tests |
| components/data/__tests__/compatibility.test.ts | 94 | 8 compatibility function tests |

Total: 906 lines of code across 9 files.

## Commits

| Hash | Type | Description |
|------|------|-------------|
| fdc1382 | test | Add failing test for chip data |
| 4ed2764 | feat | Implement M-series chip data |
| e9c640a | test | Add failing tests for Mac and AI models |
| 3d1b395 | feat | Implement Mac and AI model data |
| f53a447 | test | Add failing tests for compatibility function |
| 9dcd7a5 | feat | Implement compatibility filtering function |

## Key Data Points

**M-Series Chips (14 total):**
- M1: base (68.25 GB/s), Pro (200), Max (400), Ultra (800)
- M2: base (100), Pro (200), Max (400), Ultra (800)
- M3: base (100), Pro (150 ⚠️), Max (400)
- M4: base (120), Pro (273), Max (546)

**Mac Models (18 total):**
- MacBook Air: M1, M2, M3 (16GB base for M3)
- MacBook Pro: 14" M4/Pro/Max, 16" Pro/Max
- Mac Mini: M1, M2, M2 Pro, M4 (16GB base), M4 Pro
- Mac Studio: M1 Max/Ultra, M2 Max/Ultra
- Mac Pro: M2 Ultra

**AI Models (12 total):**
- 8GB tier: Phi-3 Mini, Gemma 2B
- 16GB tier: Llama 3.1 8B, Mistral 7B, Qwen 2.5 7B
- 24GB tier: Phi-4, Mistral Nemo 12B
- 32GB tier: Qwen 2.5 32B
- 64GB tier: Llama 3.1 70B, Qwen 2.5 72B
- 128GB tier: DeepSeek V3, DeepSeek R1

## Next Steps

**Immediate (Phase 02 Plan 02):**
- Create ChipComparison component using Recharts
- Visualize chip specifications (CPU/GPU cores, bandwidth, max RAM)
- Integrate chip data for side-by-side comparisons

**Phase 03 (Mac Model Selector):**
- Build interactive Mac selector UI using macModels data
- Integrate compatibility function to show runnable AI models
- Display upgrade recommendations from requiresUpgrade array

**Future Considerations:**
- Add M5 chips when official specs released (expected Q1 2026)
- Update Mac Studio lineup when M4 refresh announced
- Add more AI models as community benchmarks become available

## Self-Check: PASSED

Verified all created files exist:
```bash
✓ components/data/types.ts
✓ components/data/chips.ts
✓ components/data/macModels.ts
✓ components/data/aiModels.ts
✓ components/data/compatibility.ts
✓ components/data/__tests__/chips.test.ts
✓ components/data/__tests__/macModels.test.ts
✓ components/data/__tests__/aiModels.test.ts
✓ components/data/__tests__/compatibility.test.ts
```

Verified all commits exist:
```bash
✓ fdc1382 (test: chips)
✓ 4ed2764 (feat: chips)
✓ e9c640a (test: Mac/AI models)
✓ 3d1b395 (feat: Mac/AI models)
✓ f53a447 (test: compatibility)
✓ 9dcd7a5 (feat: compatibility)
```

All tests passing:
```bash
✓ 33 tests across 4 files
✓ 0 failures
```
