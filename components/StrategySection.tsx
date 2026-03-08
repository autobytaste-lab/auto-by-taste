
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useI18n } from '../i18n/I18nContext';

export const StrategySection: React.FC = () => {
  const { translations: t } = useI18n();

  const costData = [0, 1200, 2400, 3600, 4800, 6000].map((traditional, i) => ({
    year: t.strategy.chartYears[i],
    traditional,
    ai: 150 + i * 15,
  }));

  return (
    <div className="apple-section bg-black overflow-hidden">
      <div className="max-w-[980px] mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl lg:text-[56px] font-bold text-[#F5F5F7] mb-4 tracking-[-0.03em] leading-tight">{t.strategy.heading}</h2>
          <p className="text-[#86868B] text-lg">{t.strategy.description}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-5">
          {/* Strategy 1: Real Trial */}
          <div className="relative p-8 lg:p-10 rounded-[28px] bg-[#1D1D1F] border border-[#2997FF]/10 group transition-all duration-300 hover:border-[#2997FF]/20">
            <div className="absolute top-0 right-0 p-6 text-5xl opacity-5 group-hover:opacity-10 transition-opacity duration-500">🧪</div>
            <h3 className="text-xl font-semibold text-[#F5F5F7] mb-5 flex items-center tracking-[-0.01em]">
              <span className="w-8 h-8 bg-[#0071E3] rounded-full flex items-center justify-center text-xs font-semibold mr-3">01</span>
              {t.strategy.strategy1Title}
            </h3>
            <p className="text-[#86868B] leading-relaxed mb-6">
              {t.strategy.strategy1Description}
            </p>
            <div className="p-4 bg-black/30 rounded-2xl border border-white/5">
              <p className="text-sm italic text-[#2997FF]">{t.strategy.strategy1Quote}</p>
            </div>

            <div className="mt-6 flex justify-center">
               <div className="w-full h-40 rounded-2xl bg-[#0071E3]/5 border border-[#0071E3]/10 flex items-center justify-center p-6 text-center">
                  <p className="text-xs text-[#6E6E73] leading-relaxed">
                    {t.strategy.strategy1RagNote}
                  </p>
               </div>
            </div>
          </div>

          {/* Strategy 2: Cost Comparison Chart */}
          <div className="relative p-8 lg:p-10 rounded-[28px] bg-[#1D1D1F] border border-[#BF5AF2]/10 group transition-all duration-300 hover:border-[#BF5AF2]/20">
            <div className="absolute top-0 right-0 p-6 text-5xl opacity-5 group-hover:opacity-10 transition-opacity duration-500">📊</div>
            <h3 className="text-xl font-semibold text-[#F5F5F7] mb-5 flex items-center tracking-[-0.01em]">
              <span className="w-8 h-8 bg-[#BF5AF2] rounded-full flex items-center justify-center text-xs font-semibold mr-3">02</span>
              {t.strategy.strategy2Title}
            </h3>
            <p className="text-[#86868B] leading-relaxed mb-6">
              {t.strategy.strategy2Description}
            </p>

            <div className="h-[280px] w-full bg-black/30 p-4 rounded-2xl border border-white/5">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={costData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <XAxis dataKey="year" stroke="#6E6E73" fontSize={10} tickLine={false} axisLine={false} />
                  <YAxis stroke="#6E6E73" fontSize={10} tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1D1D1F', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', fontSize: '12px' }}
                    labelStyle={{ color: '#86868B', marginBottom: '4px' }}
                  />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: '10px', paddingTop: '10px' }} />
                  <Line
                    type="monotone"
                    name={t.strategy.traditionalLabel}
                    dataKey="traditional"
                    stroke="#FF453A"
                    strokeWidth={2}
                    dot={{ r: 3, fill: '#FF453A' }}
                    activeDot={{ r: 5 }}
                  />
                  <Line
                    type="monotone"
                    name={t.strategy.aiLocalLabel}
                    dataKey="ai"
                    stroke="#2997FF"
                    strokeWidth={2}
                    dot={{ r: 3, fill: '#2997FF' }}
                    activeDot={{ r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-4 flex items-center justify-between text-[10px] text-[#6E6E73] uppercase tracking-widest font-medium">
              <span>{t.strategy.unitLabel}</span>
              <span className="text-[#30D158] italic">{t.strategy.savingsLabel}</span>
            </div>
          </div>
        </div>

        <div className="mt-14 text-center">
          <div className="inline-block px-8 py-4 rounded-full bg-[#1D1D1F] border border-white/5">
             <p className="text-[#F5F5F7] font-semibold text-lg">
               {t.strategy.keyMessage} <span className="text-gradient">{t.strategy.keyMessageHighlight}</span>
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};
