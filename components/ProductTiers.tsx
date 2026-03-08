
import React from 'react';
import { useI18n } from '../i18n/I18nContext';

export const ProductTiers: React.FC = () => {
  const { translations: t } = useI18n();

  return (
    <div className="apple-section bg-black">
      <div className="max-w-[980px] mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl lg:text-[56px] font-bold text-[#F5F5F7] mb-4 tracking-[-0.03em] leading-tight">{t.productTiers.heading}</h2>
          <p className="text-[#86868B] text-lg">{t.productTiers.description}</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-5">
          {t.productTiers.tiers.map((tier, idx) => (
            <div key={idx} className={`relative p-8 rounded-[28px] flex flex-col transition-all duration-300 hover:scale-[1.01] ${idx === 1 ? 'bg-[#0071E3]/8 border-2 border-[#0071E3]/30' : 'bg-[#1D1D1F] border border-white/5'}`}>
              {idx === 1 && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#0071E3] text-white px-4 py-1 rounded-full text-xs font-medium">
                  {t.productTiers.popularBadge}
                </div>
              )}
              <div className="mb-8">
                <h3 className="text-2xl font-semibold text-[#F5F5F7] mb-2 tracking-[-0.02em]">{tier.name}</h3>
                <div className="h-0.5 w-10 bg-[#0071E3] rounded-full"></div>
              </div>

              <div className="mb-8 flex-grow">
                <div className="mb-6">
                  <p className="text-xs font-medium text-[#6E6E73] uppercase tracking-wider mb-2">{t.productTiers.hardwareLabel}</p>
                  <p className="text-lg text-[#F5F5F7] font-medium">{tier.hardware}</p>
                </div>
                <div className="mb-6">
                  <p className="text-xs font-medium text-[#6E6E73] uppercase tracking-wider mb-2">{t.productTiers.targetLabel}</p>
                  <p className="text-[#A1A1A6]">{tier.target}</p>
                </div>
                <div className="mb-6">
                  <p className="text-xs font-medium text-[#6E6E73] uppercase tracking-wider mb-2">{t.productTiers.capabilityLabel}</p>
                  <p className="text-[#86868B] leading-relaxed text-sm">{tier.capability}</p>
                </div>
                <div className="p-4 bg-black/30 rounded-2xl border border-white/5">
                  <p className="text-xs font-medium text-[#2997FF] uppercase tracking-wider mb-2 flex items-center">
                    <span className="mr-2">⚡</span> {t.productTiers.thunderboltLabel}
                  </p>
                  <p className="text-[#86868B] text-xs leading-relaxed">{tier.expansion}</p>
                </div>
              </div>

              <button className={`w-full py-3.5 rounded-full font-medium transition-all duration-300 text-[15px] ${idx === 1 ? 'bg-[#0071E3] hover:bg-[#0077ED] text-white' : 'bg-white/5 hover:bg-white/10 text-[#F5F5F7]'}`}>
                {t.productTiers.ctaButton}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
