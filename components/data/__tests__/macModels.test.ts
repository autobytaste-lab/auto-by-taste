import { describe, it, expect } from 'vitest';
import { macModels, getMacById, getMacsByCategory } from '../macModels';
import { chips } from '../chips';

describe('macModels data', () => {
  it('should cover all Mac categories', () => {
    const categories = new Set(macModels.map(m => m.category));

    expect(categories.has('MacBook Air')).toBe(true);
    expect(categories.has('MacBook Pro')).toBe(true);
    expect(categories.has('Mac Mini')).toBe(true);
    expect(categories.has('Mac Studio')).toBe(true);
    expect(categories.has('Mac Pro')).toBe(true);
  });

  it('should have all Mac models with valid chipId references', () => {
    macModels.forEach(mac => {
      const chip = chips.find(c => c.id === mac.chipId);
      expect(chip).toBeDefined();
      expect(chip?.id).toBe(mac.chipId);
    });
  });

  it('should have Mac Mini M4 starting at 16GB RAM (not 8GB)', () => {
    const macMiniM4 = macModels.find(m => m.id === 'mac-mini-m4-2024');
    expect(macMiniM4).toBeDefined();
    expect(macMiniM4?.ramOptions[0]).toBe(16);
    expect(macMiniM4?.ramOptions).not.toContain(8);
  });

  it('should have MacBook Air M3 starting at 16GB RAM (not 8GB)', () => {
    const mbaM3 = macModels.find(m => m.id === 'mba-m3-2024');
    expect(mbaM3).toBeDefined();
    expect(mbaM3?.ramOptions[0]).toBe(16);
    expect(mbaM3?.ramOptions).not.toContain(8);
  });

  it('should have getMacById return correct Mac or undefined', () => {
    const macMini = getMacById('mac-mini-m4-2024');
    expect(macMini).toBeDefined();
    expect(macMini?.name).toBe('Mac Mini M4');

    const nonexistent = getMacById('nonexistent-mac');
    expect(nonexistent).toBeUndefined();
  });

  it('should have getMacsByCategory return array of Macs for given category', () => {
    const macbookAirs = getMacsByCategory('MacBook Air');
    expect(macbookAirs.length).toBeGreaterThan(0);
    expect(macbookAirs.every(m => m.category === 'MacBook Air')).toBe(true);

    const macStudios = getMacsByCategory('Mac Studio');
    expect(macStudios.length).toBeGreaterThan(0);
    expect(macStudios.every(m => m.category === 'Mac Studio')).toBe(true);
  });

  it('should have at least 17 Mac models', () => {
    expect(macModels.length).toBeGreaterThanOrEqual(17);
  });
});
