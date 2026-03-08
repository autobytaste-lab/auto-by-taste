import { describe, it, expect } from 'vitest';
import { vi } from './vi';
import { en, Translation } from './en';

describe('Vietnamese translations', () => {
  it('imports and satisfies Translation type', () => {
    const typed: Translation = vi;
    expect(typed).toBeDefined();
  });

  it('has same structure as English', () => {
    const getKeys = (obj: Record<string, any>, prefix = ''): string[] => {
      return Object.entries(obj).flatMap(([key, value]) => {
        const path = prefix ? `${prefix}.${key}` : key;
        if (typeof value === 'object' && value !== null) {
          return getKeys(value, path);
        }
        return [path];
      });
    };

    const enKeys = getKeys(en).sort();
    const viKeys = getKeys(vi).sort();
    expect(viKeys).toEqual(enKeys);
  });

  it('preserves existing Vietnamese content', () => {
    expect(vi.navbar.overview).toBe('Tổng quan');
    expect(vi.hero.titleLine1).toBe('Suc Manh Silicon');
    expect(vi.productTiers.heading).toBe('Các Gói Giải Pháp');
    expect(vi.footer.brand).toBe('Auto By Taste');
  });
});
