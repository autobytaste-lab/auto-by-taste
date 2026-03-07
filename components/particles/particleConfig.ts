import type { ISourceOptions } from '@tsparticles/engine';

/**
 * Device detection: returns particle count based on device capabilities
 * - Low-end (≤2 cores): 20 particles
 * - Mobile: 50 particles
 * - Desktop: 100 particles
 */
export const getParticleCount = (): number => {
  const isMobile = /iPhone|iPad|Android/i.test(navigator.userAgent);
  const isLowEnd = (navigator.hardwareConcurrency || 4) <= 2;

  if (isLowEnd) return 20;
  if (isMobile) return 50;
  return 100;
};

/**
 * Accessibility check: detect if user prefers reduced motion
 */
export const getPrefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Neural network style particle configuration
 * - Brand colors: blue-400 (#60a5fa)
 * - Adaptive particle counts based on device
 * - Links disabled on mobile for performance
 * - Motion disabled if user prefers reduced motion
 */
const isMobile = /iPhone|iPad|Android/i.test(navigator.userAgent);
const particleCount = getParticleCount();
const prefersReducedMotion = getPrefersReducedMotion();

export const neuralNetworkConfig: ISourceOptions = {
  background: {
    color: {
      value: 'transparent',
    },
  },
  fpsLimit: 60,
  particles: {
    color: {
      value: '#60a5fa', // blue-400 from brand palette
    },
    links: {
      color: '#60a5fa',
      distance: 150,
      enable: !isMobile, // disable on mobile for performance
      opacity: 0.4,
      width: 1,
    },
    move: {
      enable: !prefersReducedMotion, // respect accessibility preference
      speed: isMobile ? 1 : 2,
      direction: 'none',
      random: false,
      straight: false,
      outModes: {
        default: 'bounce',
      },
    },
    number: {
      value: particleCount,
      density: {
        enable: true,
        width: 1920,
        height: 1080,
      },
    },
    opacity: {
      value: 0.5,
    },
    shape: {
      type: 'circle',
    },
    size: {
      value: 3,
    },
  },
  interactivity: {
    detectsOn: 'window',
    events: {
      onHover: {
        enable: !isMobile, // disable hover on mobile (no hover on touch)
        mode: 'grab',
      },
      onClick: {
        enable: true,
        mode: 'push',
      },
      resize: {
        enable: true,
        delay: 0.5,
      },
    },
    modes: {
      grab: {
        distance: 150,
        links: {
          opacity: 0.8,
        },
      },
      push: {
        quantity: 4,
      },
    },
  },
  detectRetina: true,
};
