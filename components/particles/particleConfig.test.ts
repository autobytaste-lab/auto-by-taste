import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getParticleCount, getPrefersReducedMotion, neuralNetworkConfig } from './particleConfig';

describe('particleConfig', () => {
  beforeEach(() => {
    // Reset mocks
    vi.unstubAllGlobals();
  });

  describe('getParticleCount', () => {
    it('returns 20 particles for low-end devices (2 or fewer cores)', () => {
      vi.stubGlobal('navigator', {
        userAgent: 'Mozilla/5.0',
        hardwareConcurrency: 2,
      });

      expect(getParticleCount()).toBe(20);
    });

    it('returns 50 particles for mobile devices', () => {
      vi.stubGlobal('navigator', {
        userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X)',
        hardwareConcurrency: 4,
      });

      expect(getParticleCount()).toBe(50);
    });

    it('returns 100 particles for desktop devices', () => {
      vi.stubGlobal('navigator', {
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        hardwareConcurrency: 8,
      });

      expect(getParticleCount()).toBe(100);
    });

    it('prioritizes low-end detection over mobile detection', () => {
      vi.stubGlobal('navigator', {
        userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X)',
        hardwareConcurrency: 1,
      });

      expect(getParticleCount()).toBe(20);
    });
  });

  describe('getPrefersReducedMotion', () => {
    it('returns true when user prefers reduced motion', () => {
      vi.stubGlobal('window', {
        matchMedia: vi.fn((query) => ({
          matches: query === '(prefers-reduced-motion: reduce)',
          media: query,
          onchange: null,
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
          dispatchEvent: vi.fn(),
        })),
      });

      expect(getPrefersReducedMotion()).toBe(true);
    });

    it('returns false when user does not prefer reduced motion', () => {
      vi.stubGlobal('window', {
        matchMedia: vi.fn(() => ({
          matches: false,
          media: '',
          onchange: null,
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
          dispatchEvent: vi.fn(),
        })),
      });

      expect(getPrefersReducedMotion()).toBe(false);
    });
  });

  describe('neuralNetworkConfig', () => {
    it('exports a valid particle configuration object', () => {
      expect(neuralNetworkConfig).toBeDefined();
      expect(neuralNetworkConfig).toHaveProperty('particles');
      expect(neuralNetworkConfig).toHaveProperty('interactivity');
    });

    it('uses brand colors (blue #60a5fa)', () => {
      const particleColor = neuralNetworkConfig.particles?.color?.value;
      expect(particleColor).toBe('#60a5fa');
    });

    it('sets particle size to 3px', () => {
      const particleSize = neuralNetworkConfig.particles?.size?.value;
      expect(particleSize).toBe(3);
    });

    it('configures links with 150px distance', () => {
      const linkDistance = neuralNetworkConfig.particles?.links?.distance;
      expect(linkDistance).toBe(150);
    });

    it('has links configuration that can be disabled', () => {
      const hasLinksConfig = neuralNetworkConfig.particles?.links;
      expect(hasLinksConfig).toBeDefined();
      expect(neuralNetworkConfig.particles?.links).toHaveProperty('enable');
    });

    it('has move configuration that can be disabled', () => {
      const hasMoveConfig = neuralNetworkConfig.particles?.move;
      expect(hasMoveConfig).toBeDefined();
      expect(neuralNetworkConfig.particles?.move).toHaveProperty('enable');
    });
  });
});
