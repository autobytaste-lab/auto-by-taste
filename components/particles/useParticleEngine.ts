import { useEffect, useState } from 'react';
import { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';

/**
 * Custom hook to manage tsParticles engine initialization lifecycle
 *
 * Initializes the particle engine once on mount using the slim bundle.
 * Returns isReady state to indicate when particles can be rendered.
 *
 * @returns {{ isReady: boolean }} Engine ready state
 */
export const useParticleEngine = () => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      // Load slim bundle - includes particle links for neural network style
      // Avoids full bundle bloat (~300KB) while keeping essential features (~80KB)
      await loadSlim(engine);
    })
      .then(() => setIsReady(true))
      .catch((error) => console.error('Failed to load particle engine:', error));
  }, []); // Empty deps - initialize only once on mount

  return { isReady };
};
