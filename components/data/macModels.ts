import type { MacModel } from './types';

export const macModels: readonly MacModel[] = [
  // MacBook Air
  {
    id: 'mba-m1-2020',
    name: 'MacBook Air M1',
    category: 'MacBook Air',
    chipId: 'm1-base',
    releaseYear: 2020,
    ramOptions: [8, 16]
  },
  {
    id: 'mba-m2-2022',
    name: 'MacBook Air M2',
    category: 'MacBook Air',
    chipId: 'm2-base',
    releaseYear: 2022,
    ramOptions: [8, 16, 24]
  },
  {
    id: 'mba-m3-2024',
    name: 'MacBook Air M3',
    category: 'MacBook Air',
    chipId: 'm3-base',
    releaseYear: 2024,
    ramOptions: [16, 24]
  },

  // MacBook Pro 14-inch
  {
    id: 'mbp14-m4-2024',
    name: 'MacBook Pro 14" M4',
    category: 'MacBook Pro',
    chipId: 'm4-base',
    releaseYear: 2024,
    ramOptions: [16, 24, 32]
  },
  {
    id: 'mbp14-m4-pro-2024',
    name: 'MacBook Pro 14" M4 Pro',
    category: 'MacBook Pro',
    chipId: 'm4-pro',
    releaseYear: 2024,
    ramOptions: [24, 48, 64]
  },
  {
    id: 'mbp14-m4-max-2024',
    name: 'MacBook Pro 14" M4 Max',
    category: 'MacBook Pro',
    chipId: 'm4-max',
    releaseYear: 2024,
    ramOptions: [36, 48, 64, 128]
  },

  // MacBook Pro 16-inch
  {
    id: 'mbp16-m4-pro-2024',
    name: 'MacBook Pro 16" M4 Pro',
    category: 'MacBook Pro',
    chipId: 'm4-pro',
    releaseYear: 2024,
    ramOptions: [24, 48, 64]
  },
  {
    id: 'mbp16-m4-max-2024',
    name: 'MacBook Pro 16" M4 Max',
    category: 'MacBook Pro',
    chipId: 'm4-max',
    releaseYear: 2024,
    ramOptions: [36, 48, 64, 128]
  },

  // Mac Mini
  {
    id: 'mac-mini-m1-2020',
    name: 'Mac Mini M1',
    category: 'Mac Mini',
    chipId: 'm1-base',
    releaseYear: 2020,
    ramOptions: [8, 16]
  },
  {
    id: 'mac-mini-m2-2023',
    name: 'Mac Mini M2',
    category: 'Mac Mini',
    chipId: 'm2-base',
    releaseYear: 2023,
    ramOptions: [8, 16, 24]
  },
  {
    id: 'mac-mini-m2-pro-2023',
    name: 'Mac Mini M2 Pro',
    category: 'Mac Mini',
    chipId: 'm2-pro',
    releaseYear: 2023,
    ramOptions: [16, 32]
  },
  {
    id: 'mac-mini-m4-2024',
    name: 'Mac Mini M4',
    category: 'Mac Mini',
    chipId: 'm4-base',
    releaseYear: 2024,
    ramOptions: [16, 24, 32]
  },
  {
    id: 'mac-mini-m4-pro-2024',
    name: 'Mac Mini M4 Pro',
    category: 'Mac Mini',
    chipId: 'm4-pro',
    releaseYear: 2024,
    ramOptions: [24, 48, 64]
  },

  // Mac Studio
  {
    id: 'mac-studio-m1-max-2022',
    name: 'Mac Studio M1 Max',
    category: 'Mac Studio',
    chipId: 'm1-max',
    releaseYear: 2022,
    ramOptions: [32, 64]
  },
  {
    id: 'mac-studio-m1-ultra-2022',
    name: 'Mac Studio M1 Ultra',
    category: 'Mac Studio',
    chipId: 'm1-ultra',
    releaseYear: 2022,
    ramOptions: [64, 128]
  },
  {
    id: 'mac-studio-m2-max-2023',
    name: 'Mac Studio M2 Max',
    category: 'Mac Studio',
    chipId: 'm2-max',
    releaseYear: 2023,
    ramOptions: [32, 64, 96]
  },
  {
    id: 'mac-studio-m2-ultra-2023',
    name: 'Mac Studio M2 Ultra',
    category: 'Mac Studio',
    chipId: 'm2-ultra',
    releaseYear: 2023,
    ramOptions: [64, 128, 192]
  },

  // Mac Pro
  {
    id: 'mac-pro-m2-ultra-2023',
    name: 'Mac Pro M2 Ultra',
    category: 'Mac Pro',
    chipId: 'm2-ultra',
    releaseYear: 2023,
    ramOptions: [64, 128, 192]
  }
] as const;

export const getMacById = (id: string): MacModel | undefined => {
  return macModels.find(mac => mac.id === id);
};

export const getMacsByCategory = (category: string): MacModel[] => {
  return macModels.filter(mac => mac.category === category);
};
