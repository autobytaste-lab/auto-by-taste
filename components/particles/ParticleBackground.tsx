import React, { useMemo } from 'react';
import Particles from '@tsparticles/react';
import { neuralNetworkConfig } from './particleConfig';
import { useParticleEngine } from './useParticleEngine';

/**
 * Animated particle background component
 *
 * Renders neural network style particles with adaptive configuration:
 * - Desktop: 100 particles with link connections
 * - Mobile: 50 particles without links
 * - Low-end: 20 particles without links
 * - Reduced motion: particles static/disabled
 *
 * Positioned at z-index 0 behind all content with pointer-events none
 * to allow clicks to pass through to interactive elements.
 *
 * Uses lazy initialization - doesn't render until engine is ready.
 */
const ParticleBackground: React.FC = () => {
  const { isReady } = useParticleEngine();

  // Memoize config to prevent re-renders on every frame
  // Config is static - only computed once based on device/accessibility
  const options = useMemo(() => neuralNetworkConfig, []);

  // Don't render until engine is initialized
  // Prevents "engine not found" errors and improves initial page load
  if (!isReady) {
    return null;
  }

  return (
    <Particles
      id="tsparticles"
      options={options}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0, // Behind all content (navbar is z-20, content is z-10)
        pointerEvents: 'none', // Allow clicks to pass through to content below
      }}
    />
  );
};

export default ParticleBackground;
