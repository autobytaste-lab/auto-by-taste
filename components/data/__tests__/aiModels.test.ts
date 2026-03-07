import { describe, it, expect } from 'vitest';
import { aiModels, getAIModelById } from '../aiModels';

describe('aiModels data', () => {
  it('should cover small models (8GB tier)', () => {
    const smallModels = aiModels.filter(m => m.minRamGB === 8);
    expect(smallModels.length).toBeGreaterThan(0);
  });

  it('should cover mid models (16GB tier)', () => {
    const midModels = aiModels.filter(m => m.minRamGB === 16);
    expect(midModels.length).toBeGreaterThan(0);
  });

  it('should cover large models (24GB+ tier)', () => {
    const largeModels = aiModels.filter(m => m.minRamGB >= 24 && m.minRamGB < 64);
    expect(largeModels.length).toBeGreaterThan(0);
  });

  it('should cover extreme models (64GB+ tier)', () => {
    const extremeModels = aiModels.filter(m => m.minRamGB >= 64);
    expect(extremeModels.length).toBeGreaterThan(0);
  });

  it('should have all aiModels with description and useCase in Vietnamese', () => {
    aiModels.forEach(model => {
      expect(model.description).toBeDefined();
      expect(model.description.length).toBeGreaterThan(0);
      expect(model.useCase).toBeDefined();
      expect(model.useCase.length).toBeGreaterThan(0);
    });
  });

  it('should have Q4_K_M quantization specified for all models', () => {
    aiModels.forEach(model => {
      expect(model.quantization).toBeDefined();
      expect(['Q4_K_M', 'Q8_0']).toContain(model.quantization);
    });
  });

  it('should have getAIModelById return correct model or undefined', () => {
    const llama = getAIModelById('llama-3-1-8b');
    expect(llama).toBeDefined();
    expect(llama?.name).toBe('Llama 3.1 8B');

    const nonexistent = getAIModelById('nonexistent-model');
    expect(nonexistent).toBeUndefined();
  });

  it('should have at least 12 AI models', () => {
    expect(aiModels.length).toBeGreaterThanOrEqual(12);
  });

  it('should have all required properties for each model', () => {
    aiModels.forEach(model => {
      expect(model.id).toBeDefined();
      expect(model.name).toBeDefined();
      expect(model.family).toBeDefined();
      expect(model.parameters).toBeDefined();
      expect(model.minRamGB).toBeGreaterThan(0);
      expect(model.quantization).toBeDefined();
      expect(model.description).toBeDefined();
      expect(model.useCase).toBeDefined();
    });
  });
});
