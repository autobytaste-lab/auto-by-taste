
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
    <div className="py-24 bg-[#0a0a0a] overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-4">{t.strategy.heading}</h2>
          <p className="text-slate-400">{t.strategy.description}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Strategy 1: Real Trial */}
          <div className="relative p-8 lg:p-12 rounded-[3rem] bg-blue-600/5 border border-blue-500/10 group">
            <div className="absolute top-0 right-0 p-6 text-6xl opacity-10 group-hover:opacity-20 transition-opacity">🧪</div>
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
              <span className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-sm mr-4">01</span>
              {t.strategy.strategy1Title}
            </h3>
            <p className="text-slate-400 leading-relaxed mb-6">
              {t.strategy.strategy1Description}
            </p>
            <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
              <p className="text-sm italic text-blue-400">{t.strategy.strategy1Quote}</p>
            </div>

            <div className="mt-8 flex justify-center">
               <div className="w-full h-48 rounded-2xl bg-gradient-to-tr from-blue-500/10 to-transparent border border-blue-500/20 flex items-center justify-center p-6 text-center">
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {t.strategy.strategy1RagNote}
                  </p>
               </div>
            </div>
          </div>

          {/* Strategy 2: Cost Comparison Chart */}
          <div className="relative p-8 lg:p-12 rounded-[3rem] bg-purple-600/5 border border-purple-500/10 group">
            <div className="absolute top-0 right-0 p-6 text-6xl opacity-10 group-hover:opacity-20 transition-opacity">📊</div>
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
              <span className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-sm mr-4">02</span>
              {t.strategy.strategy2Title}
            </h3>
            <p className="text-slate-400 leading-relaxed mb-6">
              {t.strategy.strategy2Description}
            </p>

            <div className="h-[300px] w-full glass-card p-4 rounded-2xl border border-white/5">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={costData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                  <XAxis dataKey="year" stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', fontSize: '12px' }}
                    labelStyle={{ color: '#94a3b8', marginBottom: '4px' }}
                  />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: '10px', paddingTop: '10px' }} />
                  <Line
                    type="monotone"
                    name={t.strategy.traditionalLabel}
                    dataKey="traditional"
                    stroke="#ef4444"
                    strokeWidth={3}
                    dot={{ r: 4, fill: '#ef4444' }}
                    activeDot={{ r: 6 }}
                  />
                  <Line
                    type="monotone"
                    name={t.strategy.aiLocalLabel}
                    dataKey="ai"
                    stroke="#3b82f6"
                    strokeWidth={3}
                    dot={{ r: 4, fill: '#3b82f6' }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-4 flex items-center justify-between text-[10px] text-slate-500 uppercase tracking-widest font-bold">
              <span>{t.strategy.unitLabel}</span>
              <span className="text-emerald-400 italic">{t.strategy.savingsLabel}</span>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <div className="inline-block p-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-600">
            <div className="bg-[#0a0a0a] px-8 py-4 rounded-full">
               <p className="text-white font-bold text-lg">
                 {t.strategy.keyMessage} <span className="text-gradient">{t.strategy.keyMessageHighlight}</span>
               </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
