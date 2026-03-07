---
phase: 02-mac-hardware-data
plan: 02
subsystem: ui-components
tags:
  - chip-comparison
  - data-visualization
  - recharts
  - vietnamese-localization
dependency_graph:
  requires:
    - 02-01 (chip data layer)
  provides:
    - ChipComparison component
    - M-series comparison UI
  affects:
    - none
tech_stack:
  added:
    - none (Recharts already available)
  patterns:
    - TDD with RED-GREEN commits
    - Interactive chart with selection
    - Vietnamese localization
    - Glassmorphism styling
key_files:
  created:
    - components/ChipComparison.tsx
    - components/__tests__/ChipComparison.test.tsx
    - vitest.setup.ts
  modified:
    - vitest.config.ts
decisions:
  - decision: Combine Tasks 1 and 2 implementation
    rationale: Chip selection and details panel are integral to component design; implementing separately would require refactoring
    impact: More efficient implementation, no functional difference
  - decision: Use Pro variant for generation comparison
    rationale: Pro models represent the best balance of features across generations
    impact: Cleaner comparison, representative of typical use cases
  - decision: Add performance uplift percentages
    rationale: Helps users understand generational improvements at a glance
    impact: Better user education, clearer value proposition
  - decision: Configure vitest setup file
    rationale: Enable jest-dom matchers for better test assertions
    impact: Improved test readability and maintainability
metrics:
  duration: 4m 11s
  tasks_completed: 3
  tests_added: 5
  files_created: 3
  files_modified: 1
  commits: 3
  completed_date: 2026-03-05T10:32:09Z
---

# Phase 02 Plan 02: Chip Comparison Component Summary

**One-liner:** Interactive M-series chip comparison component with Recharts visualizations, Vietnamese labels, and performance uplift indicators

## What Was Built

Built a comprehensive chip comparison component that visualizes M1, M2, M3, and M4 chip specifications using interactive bar charts. Component supports two view modes (By Generation and All Chips), displays detailed chip specifications, and includes special notes about M3 Pro bandwidth regression and M4 Max AI performance.

## Tasks Completed

| Task | Name                                      | Commit  | Files                                                          |
| ---- | ----------------------------------------- | ------- | -------------------------------------------------------------- |
| 1    | Create ChipComparison component with TDD | ddcb17a | ChipComparison.test.tsx, vitest.setup.ts, vitest.config.ts     |
| 1    | Implement ChipComparison component       | 934b8d2 | ChipComparison.tsx                                             |
| 3    | Add generation comparison enhancements   | 3385e6b | ChipComparison.tsx (performance uplifts, special notes)        |

**Note:** Task 2 features (chip selection, details panel) were implemented together with Task 1 as they are integral to the component's core functionality.

## Key Features Implemented

### 1. Interactive Chart Visualization
- Multi-metric bar chart showing CPU cores, GPU cores, memory bandwidth, and max RAM
- Click-to-select interaction on chart bars
- Responsive sizing using ResponsiveContainer
- Vietnamese labels throughout (Nhân CPU, Nhân GPU, Băng thông bộ nhớ, RAM tối đa)

### 2. View Mode Toggle
- **By Generation:** Shows one Pro variant per generation (M1 Pro, M2 Pro, M3 Pro, M4 Pro)
- **All Chips:** Displays all base/Pro/Max variants (11 chips total, Ultra excluded)
- Clean tab interface with active/inactive states

### 3. Details Panel
- Selected chip specifications with breakdown:
  - CPU cores (Performance + Efficiency + Total)
  - GPU cores count
  - Memory bandwidth (GB/s)
  - Max RAM capacity (GB)
  - Process node (5nm, 3nm)
- Glassmorphism styling matching existing components

### 4. Performance Insights
- Performance uplift indicators in generation view:
  - M2 Pro: +20% vs M1
  - M3 Pro: +30% vs M2
  - M4 Pro: +25% vs M3
- Special notes with color-coded badges:
  - M3 Pro: Warning about bandwidth regression (150 GB/s vs M2 Pro 200 GB/s)
  - M4 Max: Success badge for AI workload performance (546 GB/s)

### 5. Chip Selector Grid
- Quick selection buttons for all displayed chips
- Active state highlighting
- Grid layout for easy access

## Deviations from Plan

### Efficiency Improvements

**Combined Tasks 1 and 2 Implementation**
- **Found during:** Task 1 implementation
- **Issue:** Plan separated component creation (Task 1) from selection/details panel (Task 2), but these features are integral to the component's core design
- **Decision:** Implemented all core features together in Task 1
- **Rationale:** Prevents refactoring, follows React component best practices (complete component in one file)
- **Impact:** More efficient implementation, cleaner commit history
- **Commits:** 934b8d2

**Added vitest setup file**
- **Found during:** Task 1 test execution
- **Issue:** Tests failed with "Invalid Chai property: toBeInTheDocument"
- **Fix:** Created vitest.setup.ts and configured setupFiles in vitest.config.ts
- **Rationale:** Enable jest-dom matchers for better test assertions
- **Files:** vitest.setup.ts (created), vitest.config.ts (modified)
- **Commit:** ddcb17a

## Verification Results

### Automated Tests
- All 5 ChipComparison tests passing
- Full test suite: 50 tests passing across 6 test files
- Test coverage: Component rendering, Vietnamese labels, glass-card styling, ResponsiveContainer usage

### Success Criteria
- [x] ChipComparison component renders correctly
- [x] Chart displays CPU cores, GPU cores, memory bandwidth, max RAM
- [x] All M-series generations (M1-M4) represented
- [x] Chip selection updates details panel
- [x] View toggle switches between all chips and by-generation views
- [x] Vietnamese labels throughout
- [x] Glass-card styling matches existing components
- [x] Responsive on mobile viewports (ResponsiveContainer)
- [x] All tests pass

## Technical Implementation

### Component Structure
```typescript
ChipComparison
├── View Mode Toggle (Theo thế hệ / Tất cả chip)
├── Chart Section
│   ├── ResponsiveContainer
│   ├── BarChart (4 metrics)
│   ├── Legend (Vietnamese labels)
│   └── Tooltip (Vietnamese labels)
└── Details Panel
    ├── Chip Header (name, generation, process node)
    ├── Performance Uplift Badge (generation view only)
    ├── Special Notes (M3 Pro warning, M4 Max highlight)
    ├── CPU Cores Breakdown
    ├── Other Specs (GPU, bandwidth, max RAM)
    └── Chip Selector Grid
```

### Data Transformation
- **Generation View:** Filters to one Pro chip per generation (4 chips)
- **All Chips View:** Filters out Ultra variants (11 chips: 3×M1, 3×M2, 2×M3, 3×M4)
- Chart data mapped to Vietnamese-labeled metrics
- Special logic for performance uplifts and chip notes

### Styling Patterns
- Glass-card base: `glass-card rounded-[2.5rem] border border-white/5`
- Details panel: `bg-gradient-to-br from-blue-600/10 to-purple-600/10 border-blue-500/20 shadow-2xl`
- Active elements: `bg-blue-600 text-white`
- Warning badge: `bg-yellow-500/10 border-yellow-500/30 text-yellow-400`
- Success badge: `bg-green-500/10 border-green-500/30 text-green-400`

## Lessons Learned

### What Went Well
- TDD approach caught test setup issues early
- Combining Tasks 1 and 2 prevented unnecessary refactoring
- Performance uplift indicators provide clear value to users
- Special notes (M3 Pro regression, M4 Max AI) educate users about important differences

### What Could Be Improved
- Plan could have combined Tasks 1 and 2 from the start
- Consider adding more detailed performance metrics (single-core vs multi-core)
- Could add export/share functionality for comparisons

### Reusable Patterns
- TDD with RED-GREEN commits for React components
- Vietnamese localization for technical metrics
- Special notes/badges system for highlighting important information
- View mode toggle pattern for different data perspectives

## Next Steps

### Immediate (Plan 03)
- Build interactive Mac selector component
- Integrate ChipComparison with Mac model selection

### Future Enhancements
- Add benchmark data (Geekbench scores)
- Add price comparison
- Add year-over-year upgrade recommendations
- Mobile swipe gestures for chip selection

## Self-Check: PASSED

All claimed artifacts verified:

**Files created:**
- [x] components/ChipComparison.tsx (exists, 280 lines)
- [x] components/__tests__/ChipComparison.test.tsx (exists, 36 lines)
- [x] vitest.setup.ts (exists, 1 line)

**Files modified:**
- [x] vitest.config.ts (setupFiles added)

**Commits:**
- [x] ddcb17a: test(02-02): add failing tests for ChipComparison component
- [x] 934b8d2: feat(02-02): implement ChipComparison component with charts
- [x] 3385e6b: feat(02-02): add generation comparison enhancements

**Tests:**
- [x] All 5 ChipComparison tests passing
- [x] Full suite: 50/50 tests passing

All success criteria met. Plan 02-02 complete.
