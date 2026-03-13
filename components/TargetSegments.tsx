
import React from 'react';
import { useI18n } from '../i18n/I18nContext';

export const TargetSegments: React.FC = () => {
  const { translations: t } = useI18n();

  return (
    <div className="apple-section bg-[#FAFAFA]">
      <div className="max-w-[980px] mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl lg:text-[56px] font-bold text-[#2C2C2C] mb-4 tracking-[-0.03em] leading-tight">{t.targetSegments.heading}</h2>
          <p className="text-[#6B7280] max-w-2xl mx-auto text-lg">{t.targetSegments.description}</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-5">
          {t.targetSegments.segments.map((s, i) => (
            <div key={i} className="p-8 rounded-[28px] bg-white border border-black/5 flex flex-col transition-all duration-300 hover:scale-[1.01] hover:border-black/10">
              <div className="text-4xl mb-6">{s.icon}</div>
              <h3 className="text-2xl font-semibold text-[#2C2C2C] mb-4 tracking-[-0.02em]">{s.title}</h3>
              <p className="text-[#6B7280] text-sm mb-6 leading-relaxed">{s.description}</p>

              <div className="space-y-3 mb-8 flex-grow">
                <p className="text-xs font-semibold text-[#9CA3AF] uppercase tracking-widest">{t.targetSegments.needsLabel}</p>
                {s.needs.map((need, ni) => (
                  <div key={ni} className="flex items-start space-x-2 text-sm text-[#78716C]">
                    <span className="text-[#D4AF37] mt-0.5">•</span>
                    <span>{need}</span>
                  </div>
                ))}
              </div>

              <div className="pt-6 border-t border-black/5">
                <p className="text-xs italic text-[#9CA3AF] mb-1">{t.targetSegments.whyAppleLabel}</p>
                <p className="text-sm font-medium text-[#2C2C2C]">{s.whyMac}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
