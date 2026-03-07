import { describe, it, expect } from 'vitest';
import { getCompatibleModels } from '../compatibility';
import { macModels } from '../macModels';

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
    expect(result.compatible.every(ai => ai.minRamGB <= 24)).toBe(true);

    // Should have models that need upgrade (24GB < model <= 64GB max)
    expect(result.requiresUpgrade.length).toBeGreaterThan(0);
    expect(result.requiresUpgrade.every(
      ai => ai.minRamGB > 24 && ai.minRamGB <= result.chip.maxMemory
    )).toBe(true);
  });

  it('should return correct chip information in result', () => {
    const macStudio = macModels.find(m => m.id === 'mac-studio-m2-ultra-2023')!;
    const result = getCompatibleModels(macStudio, 128);

    expect(result.chip.id).toBe('m2-ultra');
    expect(result.chip.maxMemory).toBe(192);
    expect(result.maxRam).toBe(128);
  });

  it('should throw error for invalid Mac with nonexistent chipId', () => {
    const invalidMac = {
      ...macModels[0],
      chipId: 'nonexistent-chip'
    };

    expect(() => getCompatibleModels(invalidMac, 16))
      .toThrow('Chip not found');
  });

  it('should verify Mac Studio M2 Ultra with 128GB can run 70B models', () => {
    const macStudio = macModels.find(m => m.id === 'mac-studio-m2-ultra-2023')!;
    const result = getCompatibleModels(macStudio, 128);

    // Should be able to run 70B models (64GB requirement)
    const llama70b = result.compatible.find(ai => ai.id === 'llama-3-1-70b');
    expect(llama70b).toBeDefined();

    // Should NOT be able to run DeepSeek models (128GB requirement) with 128GB selected
    const deepseek = result.compatible.find(ai => ai.id === 'deepseek-v3');
    expect(deepseek).toBeDefined(); // Should be included in compatible since minRamGB === 128
  });

  it('should verify MacBook Air M1 with 8GB only gets small models', () => {
    const macbookAir = macModels.find(m => m.id === 'mba-m1-2020')!;
    const result = getCompatibleModels(macbookAir, 8);

    // Should only get 8GB models (Phi-3, Gemma 2B)
    expect(result.compatible.length).toBeGreaterThan(0);
    expect(result.compatible.every(ai => ai.minRamGB <= 8)).toBe(true);

    // Should have upgrade options
    expect(result.requiresUpgrade.length).toBeGreaterThan(0);
    expect(result.requiresUpgrade.every(
      ai => ai.minRamGB > 8 && ai.minRamGB <= 16 // M1 max is 16GB
    )).toBe(true);
  });

  it('should have all compatible models with minRamGB <= selected RAM', () => {
    const mbp = macModels.find(m => m.id === 'mbp14-m4-max-2024')!;
    const result = getCompatibleModels(mbp, 64);

    result.compatible.forEach(ai => {
      expect(ai.minRamGB).toBeLessThanOrEqual(64);
    });
  });

  it('should have requiresUpgrade models between selected RAM and chip max', () => {
    const macMini = macModels.find(m => m.id === 'mac-mini-m4-2024')!;
    const result = getCompatibleModels(macMini, 16);

    result.requiresUpgrade.forEach(ai => {
      expect(ai.minRamGB).toBeGreaterThan(16);
      expect(ai.minRamGB).toBeLessThanOrEqual(result.chip.maxMemory);
    });
  });
});
