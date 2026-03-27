
import React from 'react';
import { useI18n } from '../i18n/I18nContext';

export const TargetSegments: React.FC = () => {
  const { translations: t } = useI18n();

  return (
    <div className="apple-section bg-[#0e1015]">
      <div className="max-w-[980px] mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl lg:text-[56px] font-bold text-[#f4f4f5] mb-4 tracking-[-0.03em] leading-tight">{t.targetSegments.heading}</h2>
          <p className="text-[#838387] max-w-2xl mx-auto text-lg">{t.targetSegments.description}</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-5">
          {t.targetSegments.segments.map((s, i) => (
            <div key={i} className="p-8 rounded-[28px] bg-[#161920] border border-[#1e2028] flex flex-col transition-all duration-300 hover:scale-[1.01] hover:border-[#2e3040]">
              <div className="text-4xl mb-6">{s.icon}</div>
              <h3 className="text-2xl font-semibold text-[#f4f4f5] mb-4 tracking-[-0.02em]">{s.title}</h3>
              <p className="text-[#838387] text-sm mb-6 leading-relaxed">{s.description}</p>

              <div className="space-y-3 mb-8 flex-grow">
                <p className="text-xs font-semibold text-[#636366] uppercase tracking-widest">{t.targetSegments.needsLabel}</p>
                {s.needs.map((need, ni) => (
                  <div key={ni} className="flex items-start space-x-2 text-sm text-[#838387]">
                    <span className="text-[#6366f1] mt-0.5">•</span>
                    <span>{need}</span>
                  </div>
                ))}
              </div>

              <div className="pt-6 border-t border-[#1e2028]">
                <p className="text-xs italic text-[#636366] mb-1">{t.targetSegments.whyAppleLabel}</p>
                <p className="text-sm font-medium text-[#f4f4f5]">{s.whyMac}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
