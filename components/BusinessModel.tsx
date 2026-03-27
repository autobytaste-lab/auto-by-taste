
import React from 'react';
import { useI18n } from '../i18n/I18nContext';

export const BusinessModel: React.FC = () => {
  const { translations: t } = useI18n();

  return (
    <div className="apple-section bg-[#13151b]">
      <div className="max-w-[980px] mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl lg:text-[56px] font-bold text-[#f4f4f5] mb-4 tracking-[-0.03em] leading-tight">{t.businessModel.heading}</h2>
          <p className="text-[#838387] text-lg">{t.businessModel.description}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {t.businessModel.models.map((item, i) => (
            <div key={i} className="p-7 rounded-[28px] bg-[#161920] border border-[#1e2028] hover:border-[#2e3040] transition-all duration-300 group hover:scale-[1.01]">
              <div className="text-3xl mb-6 bg-[#13151b] w-12 h-12 rounded-2xl flex items-center justify-center group-hover:bg-[#6366f1]/10 transition-colors duration-300">
                {item.icon}
              </div>
              <p className="text-[10px] font-medium text-[#6366f1] uppercase tracking-[0.2em] mb-2">{item.highlight}</p>
              <h4 className="text-lg font-semibold text-[#f4f4f5] mb-3 leading-tight tracking-[-0.01em]">{item.title}</h4>
              <p className="text-[#838387] text-sm leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 p-10 lg:p-14 rounded-[28px] bg-[#161920] border border-[#1e2028] relative overflow-hidden">
           <div className="absolute inset-0 bg-gradient-to-r from-[#6366f1]/3 to-[#C0C0C0]/3"></div>
           <div className="relative z-10 flex flex-col md:flex-row items-center justify-between">
              <div className="mb-8 md:mb-0 text-center md:text-left">
                <h4 className="text-2xl font-semibold text-[#f4f4f5] mb-2 tracking-[-0.02em]">{t.businessModel.bannerTitle}</h4>
                <p className="text-[#838387]">{t.businessModel.bannerQuote}</p>
              </div>
              <div className="flex space-x-10">
                <div className="text-center">
                  <p className="text-3xl font-bold text-[#f4f4f5]">#1</p>
                  <p className="text-xs text-[#636366]">{t.businessModel.stat1Label}</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-[#f4f4f5]">10x</p>
                  <p className="text-xs text-[#636366]">{t.businessModel.stat2Label}</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-[#f4f4f5]">0$</p>
                  <p className="text-xs text-[#636366]">{t.businessModel.stat3Label}</p>
                </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};
