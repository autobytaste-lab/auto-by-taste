
import React from 'react';
import { useI18n } from '../i18n/I18nContext';

export const ProductTiers: React.FC = () => {
  const { translations: t } = useI18n();

  return (
    <div className="apple-section bg-[#FAFAFA]">
      <div className="max-w-[980px] mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl lg:text-[56px] font-bold text-[#2C2C2C] mb-4 tracking-[-0.03em] leading-tight">{t.productTiers.heading}</h2>
          <p className="text-[#6B7280] text-lg">{t.productTiers.description}</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-5">
          {t.productTiers.tiers.map((tier, idx) => (
            <div key={idx} className={`relative p-8 rounded-[28px] flex flex-col transition-all duration-300 hover:scale-[1.01] ${idx === 1 ? 'bg-[#D4AF37]/8 border-2 border-[#D4AF37]/30' : 'bg-white border border-black/5'}`}>
              {idx === 1 && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#D4AF37] text-[#2C2C2C] px-4 py-1 rounded-full text-xs font-medium">
                  {t.productTiers.popularBadge}
                </div>
              )}
              <div className="mb-8">
                <h3 className="text-2xl font-semibold text-[#2C2C2C] mb-2 tracking-[-0.02em]">{tier.name}</h3>
                <div className="h-0.5 w-10 bg-[#D4AF37] rounded-full"></div>
              </div>

              <div className="mb-8 flex-grow">
                <div className="mb-6">
                  <p className="text-xs font-medium text-[#9CA3AF] uppercase tracking-wider mb-2">{t.productTiers.hardwareLabel}</p>
                  <p className="text-lg text-[#2C2C2C] font-medium">{tier.hardware}</p>
                </div>
                <div className="mb-6">
                  <p className="text-xs font-medium text-[#9CA3AF] uppercase tracking-wider mb-2">{t.productTiers.targetLabel}</p>
                  <p className="text-[#78716C]">{tier.target}</p>
                </div>
                <div className="mb-6">
                  <p className="text-xs font-medium text-[#9CA3AF] uppercase tracking-wider mb-2">{t.productTiers.capabilityLabel}</p>
                  <p className="text-[#6B7280] leading-relaxed text-sm">{tier.capability}</p>
                </div>
                <div className="p-4 bg-[#F5F5F5] rounded-2xl border border-black/5">
                  <p className="text-xs font-medium text-[#D4AF37] uppercase tracking-wider mb-2 flex items-center">
                    <span className="mr-2">⚡</span> {t.productTiers.thunderboltLabel}
                  </p>
                  <p className="text-[#6B7280] text-xs leading-relaxed">{tier.expansion}</p>
                </div>
              </div>

              <button className={`w-full py-3.5 rounded-full font-medium transition-all duration-300 text-[15px] ${idx === 1 ? 'bg-[#D4AF37] hover:bg-[#E8C84A] text-black font-semibold' : 'bg-black/[0.03] hover:bg-black/[0.05] text-[#2C2C2C]'}`}>
                {t.productTiers.ctaButton}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
