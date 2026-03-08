
import React from 'react';
import { useI18n } from '../i18n/I18nContext';
import { ChipDiagram } from './ChipDiagram';
import { chips } from './data/chips';

const m4Max = chips.find(c => c.id === 'm4-max-40gpu')!;
const m4Base = chips.find(c => c.id === 'm4-base')!;

const HERO_SPECS = [
  { value: `${m4Base.tops}`, label: 'TOPS' },
  { value: `${m4Max.memoryBandwidth}`, label: 'GB/s' },
  { value: `${m4Max.maxMemory}GB`, label: 'Unified Memory' },
  { value: `${m4Max.gpuCores}`, label: 'GPU Cores' },
];

export const Hero: React.FC = () => {
  const { translations: t } = useI18n();

  return (
    <div className="relative pt-20 pb-32 lg:pt-32 lg:pb-44 overflow-hidden">
      {/* Subtle ambient glow - Apple style */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-[#0071E3]/5 blur-[200px] rounded-full"></div>

      <div className="max-w-[980px] mx-auto px-6 relative z-10 text-center">
        <div className="inline-flex items-center space-x-2 bg-[#1D1D1F] rounded-full px-4 py-2 mb-8">
          <span className="w-1.5 h-1.5 bg-[#30D158] rounded-full"></span>
          <span className="text-xs font-medium text-[#A1A1A6] tracking-wide">{t.hero.badge}</span>
        </div>

        <h1 className="text-5xl lg:text-[80px] font-bold text-[#F5F5F7] mb-6 leading-[1.05] tracking-[-0.03em]">
          {t.hero.titleLine1}<br />
          <span className="text-gradient">{t.hero.titleLine2}</span>
        </h1>

        <p className="max-w-2xl mx-auto text-lg lg:text-[21px] text-[#86868B] mb-10 leading-relaxed font-normal">
          {t.hero.subtitle}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-16">
          <a href="#pricing" className="w-full sm:w-auto px-8 py-3.5 bg-[#0071E3] text-white font-medium rounded-full hover:bg-[#0077ED] transition-all duration-300 text-[17px]">
            {t.hero.ctaPrimary}
          </a>
          <a href="https://zalo.me/0337776435" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto px-8 py-3.5 text-[#2997FF] font-medium rounded-full hover:underline transition-all duration-300 text-[17px]">
            {t.hero.ctaSecondary} &rsaquo;
          </a>
        </div>

        {/* Spec Callout Badges - Apple style pills */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {HERO_SPECS.map((spec) => (
            <div key={spec.label} className="px-5 py-2.5 rounded-full bg-[#1D1D1F]">
              <span className="text-lg font-semibold text-[#F5F5F7]">{spec.value}</span>
              <span className="text-xs text-[#86868B] ml-1.5">{spec.label}</span>
            </div>
          ))}
        </div>

        {/* ChipDiagram */}
        <div className="mt-12 relative max-w-3xl mx-auto">
          <div className="absolute -inset-20 bg-[#0071E3]/5 rounded-full blur-[100px] opacity-40"></div>
          <ChipDiagram className="relative" />
        </div>
      </div>
    </div>
  );
};
