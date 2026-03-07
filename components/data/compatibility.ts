import type { MacModel, CompatibilityResult } from './types';
import { chips } from './chips';
import { aiModels } from './aiModels';

export function getCompatibleModels(
  mac: MacModel,
  selectedRam: number
): CompatibilityResult {
  const chip = chips.find(c => c.id === mac.chipId);

  if (!chip) {
    throw new Error(`Chip not found for Mac: ${mac.id}`);
  }

  const compatible = aiModels.filter(ai => ai.minRamGB <= selectedRam);
  const requiresUpgrade = aiModels.filter(
    ai => ai.minRamGB > selectedRam && ai.minRamGB <= chip.maxMemory
  );

  return {
    compatible,
    requiresUpgrade,
    chip,
    maxRam: Math.min(selectedRam, chip.maxMemory)
  };
}
