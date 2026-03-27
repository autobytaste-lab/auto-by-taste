
import React from 'react';
import { useI18n } from '../i18n/I18nContext';

export const ProductTiers: React.FC = () => {
  const { translations: t } = useI18n();

  return (
    <div className="apple-section bg-[#0e1015]">
      <div className="max-w-[980px] mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl lg:text-[56px] font-bold text-[#f4f4f5] mb-4 tracking-[-0.03em] leading-tight">{t.productTiers.heading}</h2>
          <p className="text-[#838387] text-lg">{t.productTiers.description}</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-5">
          {t.productTiers.tiers.map((tier, idx) => (
            <div key={idx} className={`relative p-8 rounded-[28px] flex flex-col transition-all duration-300 hover:scale-[1.01] ${idx === 1 ? 'bg-[#6366f1]/8 border-2 border-[#6366f1]/30' : 'bg-[#161920] border border-[#1e2028]'}`}>
              {idx === 1 && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#6366f1] text-[#f4f4f5] px-4 py-1 rounded-full text-xs font-medium">
                  {t.productTiers.popularBadge}
                </div>
              )}
              <div className="mb-8">
                <h3 className="text-2xl font-semibold text-[#f4f4f5] mb-2 tracking-[-0.02em]">{tier.name}</h3>
                <div className="h-0.5 w-10 bg-[#6366f1] rounded-full"></div>
              </div>

              <div className="mb-8 flex-grow">
                <div className="mb-6">
                  <p className="text-xs font-medium text-[#636366] uppercase tracking-wider mb-2">{t.productTiers.hardwareLabel}</p>
                  <p className="text-lg text-[#f4f4f5] font-medium">{tier.hardware}</p>
                </div>
                <div className="mb-6">
                  <p className="text-xs font-medium text-[#636366] uppercase tracking-wider mb-2">{t.productTiers.targetLabel}</p>
                  <p className="text-[#838387]">{tier.target}</p>
                </div>
                <div className="mb-6">
                  <p className="text-xs font-medium text-[#636366] uppercase tracking-wider mb-2">{t.productTiers.capabilityLabel}</p>
                  <p className="text-[#838387] leading-relaxed text-sm">{tier.capability}</p>
                </div>
                <div className="p-4 bg-[#13151b] rounded-2xl border border-[#1e2028]">
                  <p className="text-xs font-medium text-[#6366f1] uppercase tracking-wider mb-2 flex items-center">
                    <span className="mr-2">⚡</span> {t.productTiers.thunderboltLabel}
                  </p>
                  <p className="text-[#838387] text-xs leading-relaxed">{tier.expansion}</p>
                </div>
              </div>

              <button className={`w-full py-3.5 rounded-full font-medium transition-all duration-300 text-[15px] ${idx === 1 ? 'bg-[#6366f1] hover:bg-[#8b5cf6] text-white font-semibold' : 'bg-[#191c24] hover:bg-[#1f2330] text-[#f4f4f5]'}`}>
                {t.productTiers.ctaButton}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
