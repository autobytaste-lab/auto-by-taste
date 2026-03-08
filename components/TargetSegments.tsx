
import React from 'react';
import { useI18n } from '../i18n/I18nContext';

export const TargetSegments: React.FC = () => {
  const { translations: t } = useI18n();

  return (
    <div className="py-24 bg-[#0a0a0a]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-4">{t.targetSegments.heading}</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">{t.targetSegments.description}</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {t.targetSegments.segments.map((s, i) => (
            <div key={i} className={`p-8 rounded-[2.5rem] glass-card border border-white/5 bg-gradient-to-br ${s.color} flex flex-col`}>
              <div className="text-4xl mb-6">{s.icon}</div>
              <h3 className="text-2xl font-bold text-white mb-4">{s.title}</h3>
              <p className="text-slate-300 text-sm mb-6 leading-relaxed">{s.description}</p>

              <div className="space-y-3 mb-8 flex-grow">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{t.targetSegments.needsLabel}</p>
                {s.needs.map((need, ni) => (
                  <div key={ni} className="flex items-start space-x-2 text-sm text-slate-400">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>{need}</span>
                  </div>
                ))}
              </div>

              <div className="pt-6 border-t border-white/10">
                <p className="text-xs italic text-slate-500 mb-1">{t.targetSegments.whyAppleLabel}</p>
                <p className="text-sm font-medium text-slate-200">{s.whyMac}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
