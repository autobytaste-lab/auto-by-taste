import { describe, it, expect } from 'vitest';
import { chips, getChipById } from '../chips';

describe('chips data', () => {
  it('should contain all M1 variants (base, Pro, Max, Ultra)', () => {
    const m1Chips = chips.filter(c => c.generation === 'M1');
    expect(m1Chips).toHaveLength(4);

    const variants = m1Chips.map(c => c.variant);
    expect(variants).toContain('base');
    expect(variants).toContain('Pro');
    expect(variants).toContain('Max');
    expect(variants).toContain('Ultra');
  });

  it('should contain all M2 variants (base, Pro, Max, Ultra)', () => {
    const m2Chips = chips.filter(c => c.generation === 'M2');
    expect(m2Chips).toHaveLength(4);

    const variants = m2Chips.map(c => c.variant);
    expect(variants).toContain('base');
    expect(variants).toContain('Pro');
    expect(variants).toContain('Max');
    expect(variants).toContain('Ultra');
  });

  it('should contain all M3 variants (base, Pro, Max)', () => {
    const m3Chips = chips.filter(c => c.generation === 'M3');
    expect(m3Chips).toHaveLength(3);

    const variants = m3Chips.map(c => c.variant);
    expect(variants).toContain('base');
    expect(variants).toContain('Pro');
    expect(variants).toContain('Max');
  });

  it('should contain all M4 variants (base, Pro, Max)', () => {
    const m4Chips = chips.filter(c => c.generation === 'M4');
    expect(m4Chips).toHaveLength(3);

    const variants = m4Chips.map(c => c.variant);
    expect(variants).toContain('base');
    expect(variants).toContain('Pro');
    expect(variants).toContain('Max');
  });

  it('should have M3 Pro with LOWER bandwidth than M2 Pro (150 vs 200 GB/s)', () => {
    const m2Pro = chips.find(c => c.id === 'm2-pro');
    const m3Pro = chips.find(c => c.id === 'm3-pro');

    expect(m2Pro?.memoryBandwidth).toBe(200);
    expect(m3Pro?.memoryBandwidth).toBe(150);
  });

  it('should have M1 Ultra with double the bandwidth of M1 Max (800 vs 400 GB/s)', () => {
    const m1Max = chips.find(c => c.id === 'm1-max');
    const m1Ultra = chips.find(c => c.id === 'm1-ultra');

    expect(m1Max?.memoryBandwidth).toBe(400);
    expect(m1Ultra?.memoryBandwidth).toBe(800);
  });

  it('should have getChipById return correct chip', () => {
    const m4Base = getChipById('m4-base');
    expect(m4Base).toBeDefined();
    expect(m4Base?.name).toBe('M4');
    expect(m4Base?.generation).toBe('M4');
    expect(m4Base?.variant).toBe('base');
  });

  it('should have getChipById return undefined for nonexistent chip', () => {
    const nonexistent = getChipById('nonexistent-chip');
    expect(nonexistent).toBeUndefined();
  });

  it('should have all chips with required properties', () => {
    chips.forEach(chip => {
      expect(chip.id).toBeDefined();
      expect(chip.name).toBeDefined();
      expect(chip.generation).toBeDefined();
      expect(chip.variant).toBeDefined();
      expect(chip.cpuCores.performance).toBeGreaterThan(0);
      expect(chip.cpuCores.efficiency).toBeGreaterThan(0);
      expect(chip.cpuCores.total).toBe(chip.cpuCores.performance + chip.cpuCores.efficiency);
      expect(chip.gpuCores).toBeGreaterThan(0);
      expect(chip.neuralEngineCores).toBeGreaterThan(0);
      expect(chip.memoryBandwidth).toBeGreaterThan(0);
      expect(chip.maxMemory).toBeGreaterThan(0);
      expect(chip.processNode).toBeDefined();
    });
  });
});
