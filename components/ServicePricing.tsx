
import React from 'react';
import { useI18n } from '../i18n/I18nContext';

export const ServicePricing: React.FC = () => {
  const { translations: t } = useI18n();

  return (
    <div className="py-24 bg-[#050505]">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center space-x-2 bg-green-500/10 border border-green-500/20 rounded-full px-4 py-1.5 mb-6">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-xs font-bold text-green-400 tracking-wider uppercase">{t.servicePricing.badge}</span>
            </div>
            <h2 className="text-3xl lg:text-5xl font-bold text-white mb-4">{t.servicePricing.heading}</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">{t.servicePricing.description}</p>
          </div>

          {/* Benefits Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            {t.servicePricing.benefits.map((b, i) => (
              <div key={i} className="text-center p-4 glass-card rounded-2xl">
                <div className="text-3xl mb-2">{b.icon}</div>
                <div className="text-xl font-bold text-white">{b.title}</div>
                <div className="text-xs text-slate-400">{b.desc}</div>
              </div>
            ))}
          </div>

          {/* Pricing Cards */}
          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            {t.servicePricing.plans.map((plan, idx) => {
              const isHighlighted = idx === 1;
              return (
                <div
                  key={idx}
                  className={`relative p-8 rounded-[2.5rem] flex flex-col ${
                    isHighlighted
                      ? 'bg-green-600/10 border-2 border-green-500/50'
                      : 'glass-card'
                  }`}
                >
                  {isHighlighted && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-green-500 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                      {t.servicePricing.popularBadge}
                    </div>
                  )}

                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                    <div className="text-sm text-blue-400 font-semibold">{plan.agents}</div>
                  </div>

                  <div className="mb-6">
                    <div className="flex items-end">
                      <span className="text-4xl font-extrabold text-white">{plan.price}</span>
                      <span className="text-slate-400 ml-1">{plan.priceNote}</span>
                    </div>
                    <p className="text-xs text-green-400 mt-2">{plan.savings}</p>
                  </div>

                  <ul className="space-y-3 mb-8 flex-grow">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start text-sm text-slate-300">
                        <span className="text-green-500 mr-2 mt-0.5">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <a
                    href="https://zalo.me/0337776435"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full py-4 rounded-2xl font-bold transition-all text-center block ${
                      isHighlighted
                        ? 'bg-green-600 hover:bg-green-500 text-white'
                        : 'bg-white/5 hover:bg-white/10 text-white'
                    }`}
                  >
                    {t.servicePricing.hireNow}
                  </a>
                </div>
              );
            })}
          </div>

          {/* Comparison with Human Employee */}
          <div className="glass-card rounded-3xl p-8 border border-white/10">
            <h3 className="text-xl font-bold text-white mb-6 text-center">{t.servicePricing.comparisonTitle}</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3 text-slate-400 font-medium">{t.servicePricing.comparisonHeaders[0]}</th>
                    <th className="text-center py-3 text-green-400 font-bold">{t.servicePricing.comparisonHeaders[1]}</th>
                    <th className="text-center py-3 text-slate-400 font-medium">{t.servicePricing.comparisonHeaders[2]}</th>
                  </tr>
                </thead>
                <tbody className="text-slate-300">
                  {t.servicePricing.comparisonRows.map((row, idx) => (
                    <tr key={idx} className={idx < t.servicePricing.comparisonRows.length - 1 ? 'border-b border-white/5' : ''}>
                      <td className="py-3">{row[0]}</td>
                      <td className="text-center text-green-400 font-semibold">{row[1]}</td>
                      <td className="text-center">{row[2]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="text-center mt-12">
            <a
              href="https://zalo.me/0337776435"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-3 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-500 hover:to-blue-500 text-white font-bold py-5 px-10 rounded-2xl shadow-xl shadow-green-600/20 transition-all text-lg"
            >
              <span>{t.servicePricing.consultCta}</span>
              <img src="https://img.icons8.com/color/48/zalo.png" alt="Zalo" className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
