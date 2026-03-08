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
    memoryBandwidth: 150,
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

  // M3 Ultra (2024-2025)
  {
    id: 'm3-ultra',
    name: 'M3 Ultra',
    generation: 'M3',
    variant: 'Ultra',
    cpuCores: { performance: 24, efficiency: 8, total: 32 },
    gpuCores: 80,
    neuralEngineCores: 32,
    memoryBandwidth: 819,
    maxMemory: 256,
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
    processNode: '3nm (2nd gen)',
    tops: 38
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
    processNode: '3nm (2nd gen)',
    tops: 38
  },
  {
    id: 'm4-max',
    name: 'M4 Max',
    generation: 'M4',
    variant: 'Max',
    cpuCores: { performance: 10, efficiency: 4, total: 14 },
    gpuCores: 32,
    neuralEngineCores: 16,
    memoryBandwidth: 410,
    maxMemory: 128,
    processNode: '3nm (2nd gen)',
    tops: 38
  },
  {
    id: 'm4-max-40gpu',
    name: 'M4 Max (40-GPU)',
    generation: 'M4',
    variant: 'Max',
    cpuCores: { performance: 12, efficiency: 4, total: 16 },
    gpuCores: 40,
    neuralEngineCores: 16,
    memoryBandwidth: 546,
    maxMemory: 128,
    processNode: '3nm (2nd gen)',
    tops: 38
  }
] as const;

export const getChipById = (id: string): Chip | undefined => {
  return chips.find(chip => chip.id === id);
};
