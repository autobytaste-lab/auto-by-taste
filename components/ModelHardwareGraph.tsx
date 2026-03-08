
import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useI18n } from '../i18n/I18nContext';

const modelColors = ['#60A5FA', '#3B82F6', '#2563EB', '#8B5CF6', '#7C3AED', '#6D28D9'];

export const ModelHardwareGraph: React.FC = () => {
  const { translations: t } = useI18n();
  const [activeIndex, setActiveIndex] = useState(1);

  const chartData = t.modelHardware.models.map((m, i) => ({ ...m, color: modelColors[i] }));
  const activeModel = chartData[activeIndex];

  return (
    <div className="py-24 bg-[#050505]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-4">{t.modelHardware.heading}</h2>
          <p className="text-slate-400 max-w-2xl mx-auto mb-2">
            {t.modelHardware.description}
          </p>
          <p className="text-slate-500 text-sm font-medium italic">
            {t.modelHardware.subDescription}
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Chart Section */}
          <div className="lg:col-span-7 glass-card p-6 lg:p-10 rounded-[2.5rem] border border-white/5">
            <h4 className="text-white font-bold mb-8 flex items-center">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
              {t.modelHardware.chartTitle}
            </h4>
            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} onClick={(state) => state && setActiveIndex(Number(state.activeTooltipIndex) || 0)}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                  <XAxis
                    dataKey="name"
                    stroke="#94a3b8"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    interval={0}
                    angle={-20}
                    textAnchor="end"
                    height={60}
                  />
                  <YAxis
                    stroke="#94a3b8"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    label={{ value: 'RAM (GB)', angle: -90, position: 'insideLeft', fill: '#64748b' }}
                  />
                  <Tooltip
                    cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                    contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Bar dataKey="ram" radius={[8, 8, 0, 0]}>
                    {chartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={index === activeIndex ? entry.color : `${entry.color}44`}
                        className="cursor-pointer transition-all duration-300"
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-xs text-slate-500 mt-6 italic text-center">
              * {t.modelHardware.ramNote}
            </p>
          </div>

          {/* Info Section */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-[2.5rem] bg-gradient-to-br from-blue-600/10 to-purple-600/10 border border-blue-500/20 shadow-2xl shadow-blue-500/5">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-inner bg-white/5" style={{ color: activeModel.color }}>
                  🤖
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">{activeModel.name}</h3>
                  <p className="text-blue-400 font-bold uppercase tracking-widest text-xs">{t.modelHardware.recommendedLabel}</p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <p className="text-slate-500 text-xs font-bold uppercase mb-2">{t.modelHardware.optimalHardware}</p>
                  <div className="p-4 bg-white/5 rounded-2xl border border-white/10 flex items-center justify-between">
                    <span className="text-white font-medium">{activeModel.hardware}</span>
                    <span className="text-blue-400 font-bold">{activeModel.ram}GB RAM</span>
                  </div>
                </div>

                <div>
                  <p className="text-slate-500 text-xs font-bold uppercase mb-2">{t.modelHardware.executionCapability}</p>
                  <p className="text-slate-300 leading-relaxed italic">"{activeModel.description}"</p>
                </div>

                <button className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl transition-all shadow-lg shadow-blue-600/20">
                  {t.modelHardware.consultButton}
                </button>
              </div>
            </div>

            {/* Selector Grid for Quick selection */}
            <div className="grid grid-cols-2 gap-3">
              {chartData.map((model, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`p-3 rounded-xl border text-xs font-bold transition-all ${idx === activeIndex ? 'bg-blue-600 border-blue-500 text-white' : 'glass-card border-white/5 text-slate-400 hover:border-white/20'}`}
                >
                  {model.name.split(' ')[0]} {model.name.split(' ')[1]}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
