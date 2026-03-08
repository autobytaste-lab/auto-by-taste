
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
    <div className="relative pt-10 pb-24 lg:pt-20 lg:pb-40 overflow-hidden">
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[800px] h-[800px] bg-blue-600/10 blur-[150px] rounded-full"></div>
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-[600px] h-[600px] bg-purple-600/10 blur-[120px] rounded-full"></div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <div className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-1.5 mb-8">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          <span className="text-xs font-bold text-blue-400 tracking-wider uppercase">{t.hero.badge}</span>
        </div>

        <h1 className="text-5xl lg:text-8xl font-extrabold text-white mb-6 leading-tight tracking-tight">
          {t.hero.titleLine1}<br />
          <span className="text-gradient">{t.hero.titleLine2}</span>
        </h1>

        <p className="max-w-3xl mx-auto text-lg lg:text-xl text-slate-400 mb-10 leading-relaxed font-light">
          {t.hero.subtitle}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-12">
          <a href="#pricing" className="w-full sm:w-auto px-10 py-5 bg-white text-black font-bold rounded-2xl hover:bg-slate-200 transition-all shadow-2xl shadow-white/10 flex items-center justify-center">
            {t.hero.ctaPrimary}
          </a>
          <a href="https://zalo.me/0337776435" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto px-10 py-5 glass-card text-white font-bold rounded-2xl hover:bg-white/10 transition-all border border-white/10 flex items-center justify-center">
            {t.hero.ctaSecondary}
          </a>
        </div>

        {/* Spec Callout Badges */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {HERO_SPECS.map((spec) => (
            <div key={spec.label} className="px-4 py-2 rounded-full bg-white/5 border border-white/10">
              <span className="text-lg font-bold text-white">{spec.value}</span>
              <span className="text-xs text-slate-400 ml-1">{spec.label}</span>
            </div>
          ))}
        </div>

        {/* ChipDiagram */}
        <div className="mt-8 relative max-w-3xl mx-auto">
          <div className="absolute -inset-10 bg-gradient-to-t from-blue-600/10 to-purple-600/5 rounded-full blur-3xl opacity-30"></div>
          <ChipDiagram className="relative" />
        </div>
      </div>
    </div>
  );
};
