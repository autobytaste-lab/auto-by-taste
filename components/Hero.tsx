
import React from 'react';
import { useI18n } from '../i18n/I18nContext';
import { ChipDiagram } from './ChipDiagram';

export const Hero: React.FC = () => {
  const { translations: t } = useI18n();

  return (
    <div className="relative pt-20 pb-32 lg:pt-32 lg:pb-44 overflow-hidden">
      {/* Subtle ambient glow - Apple style */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-[#ff5c5c]/5 blur-[200px] rounded-full"></div>

      <div className="max-w-[980px] mx-auto px-6 relative z-10 text-center">
        <div className="inline-flex items-center space-x-2 bg-[#161920] border border-[#1e2028] rounded-full px-4 py-2 mb-8">
          <span className="w-1.5 h-1.5 bg-[#30D158] rounded-full"></span>
          <span className="text-xs font-medium text-[#838387] tracking-wide">{t.hero.badge}</span>
        </div>

        <h1 className="text-5xl lg:text-[80px] font-bold text-[#f4f4f5] mb-6 leading-[1.05] tracking-[-0.03em]">
          {t.hero.titleLine1}<br />
          <span className="text-gradient">{t.hero.titleLine2}</span>
        </h1>

        <p className="max-w-2xl mx-auto text-lg lg:text-[21px] text-[#838387] mb-10 leading-relaxed font-normal">
          {t.hero.subtitle}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-16">
          <a href="#pricing" className="w-full sm:w-auto px-8 py-3.5 bg-[#ff5c5c] text-white font-semibold rounded-full hover:bg-[#ff7070] transition-all duration-300 text-[17px]">
            {t.hero.ctaPrimary}
          </a>
          <a href="https://zalo.me/0337776435" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto px-8 py-3.5 text-[#ff5c5c] font-medium rounded-full hover:underline transition-all duration-300 text-[17px]">
            {t.hero.ctaSecondary} &rsaquo;
          </a>
        </div>

        {/* Service Highlight Badges */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {t.hero.serviceHighlights.map((item: { icon: string; label: string }) => (
            <div key={item.label} className="px-5 py-2.5 rounded-full bg-[#161920] border border-[#1e2028] flex items-center space-x-2">
              <span className="text-lg">{item.icon}</span>
              <span className="text-sm font-medium text-[#f4f4f5]">{item.label}</span>
            </div>
          ))}
        </div>

        {/* ChipDiagram */}
        <div className="mt-12 relative max-w-3xl mx-auto">
          <div className="absolute -inset-20 bg-[#ff5c5c]/5 rounded-full blur-[100px] opacity-40"></div>
          <ChipDiagram className="relative" />
        </div>
      </div>
    </div>
  );
};
