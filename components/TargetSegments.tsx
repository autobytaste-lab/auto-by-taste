
import React from 'react';
import { useI18n } from '../i18n/I18nContext';

export const TargetSegments: React.FC = () => {
  const { translations: t } = useI18n();

  return (
    <div className="apple-section bg-black">
      <div className="max-w-[980px] mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl lg:text-[56px] font-bold text-[#F5F5F7] mb-4 tracking-[-0.03em] leading-tight">{t.targetSegments.heading}</h2>
          <p className="text-[#86868B] max-w-2xl mx-auto text-lg">{t.targetSegments.description}</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-5">
          {t.targetSegments.segments.map((s, i) => (
            <div key={i} className="p-8 rounded-[28px] bg-[#1D1D1F] border border-white/5 flex flex-col transition-all duration-300 hover:scale-[1.01] hover:border-white/10">
              <div className="text-4xl mb-6">{s.icon}</div>
              <h3 className="text-2xl font-semibold text-[#F5F5F7] mb-4 tracking-[-0.02em]">{s.title}</h3>
              <p className="text-[#86868B] text-sm mb-6 leading-relaxed">{s.description}</p>

              <div className="space-y-3 mb-8 flex-grow">
                <p className="text-xs font-semibold text-[#6E6E73] uppercase tracking-widest">{t.targetSegments.needsLabel}</p>
                {s.needs.map((need, ni) => (
                  <div key={ni} className="flex items-start space-x-2 text-sm text-[#A1A1A6]">
                    <span className="text-[#2997FF] mt-0.5">•</span>
                    <span>{need}</span>
                  </div>
                ))}
              </div>

              <div className="pt-6 border-t border-white/5">
                <p className="text-xs italic text-[#6E6E73] mb-1">{t.targetSegments.whyAppleLabel}</p>
                <p className="text-sm font-medium text-[#F5F5F7]">{s.whyMac}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
