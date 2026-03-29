
import React from 'react';
import { useI18n } from '../i18n/I18nContext';

export const ServicePricing: React.FC = () => {
  const { translations: t } = useI18n();

  return (
    <div className="apple-section bg-[#13151b]">
      <div className="max-w-[980px] mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center space-x-2 bg-[#30D158]/10 border border-[#30D158]/15 rounded-full px-4 py-2 mb-6">
              <span className="w-1.5 h-1.5 bg-[#30D158] rounded-full"></span>
              <span className="text-xs font-medium text-[#30D158] tracking-wide">{t.servicePricing.badge}</span>
            </div>
            <h2 className="text-4xl lg:text-[56px] font-bold text-[#f4f4f5] mb-4 tracking-[-0.03em] leading-tight">{t.servicePricing.heading}</h2>
            <p className="text-[#838387] max-w-2xl mx-auto text-lg">{t.servicePricing.description}</p>
          </div>

          {/* Benefits Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            {t.servicePricing.benefits.map((b, i) => (
              <div key={i} className="text-center p-5 bg-[#161920] rounded-2xl border border-[#1e2028]">
                <div className="text-2xl mb-2">{b.icon}</div>
                <div className="text-lg font-semibold text-[#f4f4f5]">{b.title}</div>
                <div className="text-xs text-[#838387]">{b.desc}</div>
              </div>
            ))}
          </div>

          {/* Pricing Cards */}
          <div className="grid lg:grid-cols-3 gap-5 mb-12">
            {t.servicePricing.plans.map((plan, idx) => {
              const isHighlighted = idx === 1;
              return (
                <div
                  key={idx}
                  className={`relative p-8 rounded-[28px] flex flex-col transition-all duration-300 hover:scale-[1.01] ${
                    isHighlighted
                      ? 'bg-[#30D158]/5 border-2 border-[#30D158]/30'
                      : 'bg-[#161920] border border-[#1e2028]'
                  }`}
                >
                  {isHighlighted && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#30D158] text-[#f4f4f5] px-4 py-1 rounded-full text-xs font-medium">
                      {t.servicePricing.popularBadge}
                    </div>
                  )}

                  <div className="mb-6">
                    <h3 className="text-2xl font-semibold text-[#f4f4f5] mb-2 tracking-[-0.02em]">{plan.name}</h3>
                    <div className="text-sm text-[#4ade80] font-medium">{plan.agents}</div>
                  </div>

                  <div className="mb-6">
                    <div className="flex items-end">
                      <span className="text-4xl font-bold text-[#f4f4f5] tracking-[-0.03em]">{plan.price}</span>
                      <span className="text-[#838387] ml-1">{plan.priceNote}</span>
                    </div>
                    <p className="text-xs text-[#30D158] mt-2">{plan.savings}</p>
                  </div>

                  <ul className="space-y-3 mb-8 flex-grow">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start text-sm text-[#838387]">
                        <span className="text-[#30D158] mr-2 mt-0.5">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <a
                    href="https://zalo.me/0337776435"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full py-3.5 rounded-full font-medium transition-all duration-300 text-center block text-[15px] ${
                      isHighlighted
                        ? 'bg-[#30D158] hover:bg-[#34D65C] text-[#f4f4f5]'
                        : 'bg-[#191c24] hover:bg-[#1f2330] text-[#f4f4f5]'
                    }`}
                  >
                    {t.servicePricing.hireNow}
                  </a>
                </div>
              );
            })}
          </div>

          {/* Comparison with Human Employee */}
          <div className="bg-[#161920] rounded-[28px] p-8 border border-[#1e2028]">
            <h3 className="text-lg font-semibold text-[#f4f4f5] mb-6 text-center tracking-[-0.01em]">{t.servicePricing.comparisonTitle}</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#1e2028]">
                    <th className="text-left py-3 text-[#838387] font-medium">{t.servicePricing.comparisonHeaders[0]}</th>
                    <th className="text-center py-3 text-[#30D158] font-semibold">{t.servicePricing.comparisonHeaders[1]}</th>
                    <th className="text-center py-3 text-[#838387] font-medium">{t.servicePricing.comparisonHeaders[2]}</th>
                  </tr>
                </thead>
                <tbody className="text-[#838387]">
                  {t.servicePricing.comparisonRows.map((row, idx) => (
                    <tr key={idx} className={idx < t.servicePricing.comparisonRows.length - 1 ? 'border-b border-[#1e2028]' : ''}>
                      <td className="py-3">{row[0]}</td>
                      <td className="text-center text-[#30D158] font-medium">{row[1]}</td>
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
              className="inline-flex items-center space-x-3 bg-[#4ade80] hover:bg-[#86efac] text-white font-semibold py-4 px-8 rounded-full transition-all duration-300 text-[17px]"
            >
              <span>{t.servicePricing.consultCta}</span>
              <img src="https://img.icons8.com/color/48/zalo.png" alt="Zalo" className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
