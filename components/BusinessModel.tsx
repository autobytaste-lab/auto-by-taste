
import React from 'react';
import { useI18n } from '../i18n/I18nContext';

export const BusinessModel: React.FC = () => {
  const { translations: t } = useI18n();

  return (
    <div className="apple-section bg-[#F5F5F5]">
      <div className="max-w-[980px] mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl lg:text-[56px] font-bold text-[#2C2C2C] mb-4 tracking-[-0.03em] leading-tight">{t.businessModel.heading}</h2>
          <p className="text-[#6B7280] text-lg">{t.businessModel.description}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {t.businessModel.models.map((item, i) => (
            <div key={i} className="p-7 rounded-[28px] bg-white border border-black/5 hover:border-black/10 transition-all duration-300 group hover:scale-[1.01]">
              <div className="text-3xl mb-6 bg-[#F5F5F5] w-12 h-12 rounded-2xl flex items-center justify-center group-hover:bg-[#D4AF37]/10 transition-colors duration-300">
                {item.icon}
              </div>
              <p className="text-[10px] font-medium text-[#D4AF37] uppercase tracking-[0.2em] mb-2">{item.highlight}</p>
              <h4 className="text-lg font-semibold text-[#2C2C2C] mb-3 leading-tight tracking-[-0.01em]">{item.title}</h4>
              <p className="text-[#6B7280] text-sm leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 p-10 lg:p-14 rounded-[28px] bg-white border border-black/5 relative overflow-hidden">
           <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37]/3 to-[#C0C0C0]/3"></div>
           <div className="relative z-10 flex flex-col md:flex-row items-center justify-between">
              <div className="mb-8 md:mb-0 text-center md:text-left">
                <h4 className="text-2xl font-semibold text-[#2C2C2C] mb-2 tracking-[-0.02em]">{t.businessModel.bannerTitle}</h4>
                <p className="text-[#6B7280]">{t.businessModel.bannerQuote}</p>
              </div>
              <div className="flex space-x-10">
                <div className="text-center">
                  <p className="text-3xl font-bold text-[#2C2C2C]">#1</p>
                  <p className="text-xs text-[#9CA3AF]">{t.businessModel.stat1Label}</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-[#2C2C2C]">10x</p>
                  <p className="text-xs text-[#9CA3AF]">{t.businessModel.stat2Label}</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-[#2C2C2C]">0$</p>
                  <p className="text-xs text-[#9CA3AF]">{t.businessModel.stat3Label}</p>
                </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};
