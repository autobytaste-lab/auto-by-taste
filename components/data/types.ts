// TypeScript interfaces for Mac hardware data

export type ChipGeneration = 'M1' | 'M2' | 'M3' | 'M4';

export type ChipVariant = 'base' | 'Pro' | 'Max' | 'Ultra';

export type MacCategory = 'MacBook Air' | 'MacBook Pro' | 'Mac Mini' | 'Mac Studio' | 'Mac Pro';

export type AIModelFamily = 'Llama' | 'Mistral' | 'Phi' | 'Qwen' | 'Gemma' | 'DeepSeek';

export interface Chip {
  readonly id: string;
  readonly name: string;
  readonly generation: ChipGeneration;
  readonly variant: ChipVariant;
  readonly cpuCores: {
    readonly performance: number;
    readonly efficiency: number;
    readonly total: number;
  };
  readonly gpuCores: number;
  readonly neuralEngineCores: number;
  readonly memoryBandwidth: number; // GB/s
  readonly maxMemory: number; // GB
  readonly processNode: string;
}

export interface MacModel {
  readonly id: string;
  readonly name: string;
  readonly category: MacCategory;
  readonly chipId: string;
  readonly releaseYear: number;
  readonly ramOptions: readonly number[];
}

export interface AIModel {
  readonly id: string;
  readonly name: string;
  readonly family: AIModelFamily;
  readonly parameters: string;
  readonly minRamGB: number;
  readonly quantization: 'Q4_K_M' | 'Q8_0';
  readonly description: string;
  readonly useCase: string;
}

export interface CompatibilityResult {
  compatible: AIModel[];
  requiresUpgrade: AIModel[];
  chip: Chip;
  maxRam: number;
}
