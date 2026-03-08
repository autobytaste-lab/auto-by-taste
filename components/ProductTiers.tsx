
import React from 'react';
import { useI18n } from '../i18n/I18nContext';

export const ProductTiers: React.FC = () => {
  const { translations: t } = useI18n();

  return (
    <div className="py-24 bg-[#050505]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-4">{t.productTiers.heading}</h2>
          <p className="text-slate-400">{t.productTiers.description}</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {t.productTiers.tiers.map((tier, idx) => (
            <div key={idx} className={`relative p-8 rounded-[2.5rem] flex flex-col ${idx === 1 ? 'bg-blue-600/10 border-2 border-blue-500/50' : 'glass-card'}`}>
              {idx === 1 && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-500 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                  {t.productTiers.popularBadge}
                </div>
              )}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">{tier.name}</h3>
                <div className="h-1 w-12 bg-blue-500 rounded-full"></div>
              </div>

              <div className="mb-8 flex-grow">
                <div className="mb-6">
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">{t.productTiers.hardwareLabel}</p>
                  <p className="text-lg text-slate-200 font-medium">{tier.hardware}</p>
                </div>
                <div className="mb-6">
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">{t.productTiers.targetLabel}</p>
                  <p className="text-slate-300">{tier.target}</p>
                </div>
                <div className="mb-6">
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">{t.productTiers.capabilityLabel}</p>
                  <p className="text-slate-400 leading-relaxed text-sm">{tier.capability}</p>
                </div>
                <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                  <p className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-2 flex items-center">
                    <span className="mr-2">⚡</span> {t.productTiers.thunderboltLabel}
                  </p>
                  <p className="text-slate-400 text-xs leading-relaxed">{tier.expansion}</p>
                </div>
              </div>

              <button className={`w-full py-4 rounded-2xl font-bold transition-all ${idx === 1 ? 'bg-blue-600 hover:bg-blue-500 text-white' : 'bg-white/5 hover:bg-white/10 text-white'}`}>
                {t.productTiers.ctaButton}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
