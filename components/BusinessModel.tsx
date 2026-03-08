
import React from 'react';
import { useI18n } from '../i18n/I18nContext';

export const BusinessModel: React.FC = () => {
  const { translations: t } = useI18n();

  return (
    <div className="py-24 bg-[#050505]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-4">{t.businessModel.heading}</h2>
          <p className="text-slate-400">{t.businessModel.description}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.businessModel.models.map((item, i) => (
            <div key={i} className="p-8 rounded-3xl glass-card border border-white/5 hover:border-blue-500/30 transition-all group">
              <div className="text-3xl mb-6 bg-white/5 w-14 h-14 rounded-2xl flex items-center justify-center group-hover:bg-blue-600/20 transition-colors">
                {item.icon}
              </div>
              <p className="text-[10px] font-bold text-blue-400 uppercase tracking-[0.2em] mb-2">{item.highlight}</p>
              <h4 className="text-xl font-bold text-white mb-4 leading-tight">{item.title}</h4>
              <p className="text-slate-400 text-sm leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 p-8 lg:p-12 rounded-[2.5rem] bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-white/5 relative overflow-hidden">
           <div className="relative z-10 flex flex-col md:flex-row items-center justify-between">
              <div className="mb-8 md:mb-0 text-center md:text-left">
                <h4 className="text-2xl font-bold text-white mb-2">{t.businessModel.bannerTitle}</h4>
                <p className="text-slate-400">{t.businessModel.bannerQuote}</p>
              </div>
              <div className="flex space-x-8">
                <div className="text-center">
                  <p className="text-3xl font-bold text-white">#1</p>
                  <p className="text-xs uppercase tracking-tighter text-slate-500">{t.businessModel.stat1Label}</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-white">10x</p>
                  <p className="text-xs uppercase tracking-tighter text-slate-500">{t.businessModel.stat2Label}</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-white">0$</p>
                  <p className="text-xs uppercase tracking-tighter text-slate-500">{t.businessModel.stat3Label}</p>
                </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};
