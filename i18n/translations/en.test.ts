import { describe, it, expect } from 'vitest';
import { en, Translation } from './en';

describe('English translations', () => {
  it('exports all required top-level keys', () => {
    const requiredKeys = [
      'navbar', 'hero', 'problemSolution', 'targetSegments',
      'productTiers', 'businessModel', 'strategy',
      'footer', 'floatingButton', 'aiArchitecture', 'orgChart',
      'modelHardware', 'servicePricing'
    ];
    requiredKeys.forEach(key => {
      expect(en).toHaveProperty(key);
    });
  });

  it('has no empty string values', () => {
    const checkNoEmptyStrings = (obj: Record<string, any>, path = ''): void => {
      Object.entries(obj).forEach(([key, value]) => {
        const currentPath = path ? `${path}.${key}` : key;
        if (typeof value === 'string') {
          expect(value.trim(), `Empty string at ${currentPath}`).not.toBe('');
        } else if (typeof value === 'object' && value !== null) {
          checkNoEmptyStrings(value, currentPath);
        }
      });
    };
    checkNoEmptyStrings(en);
  });

  it('exports Translation type', () => {
    const typed: Translation = en;
    expect(typed).toBeDefined();
  });

  it('has nested keys accessible', () => {
    expect(en.navbar.title).toBe('Auto By Taste');
    expect(en.hero.badge).toBe('Official OpenClaw Service Partner');
    expect(en.productTiers.heading).toBeDefined();
  });
});
