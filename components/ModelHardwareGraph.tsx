
import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useI18n } from '../i18n/I18nContext';

const modelColors = ['#6366f1', '#8b5cf6', '#14b8a6', '#3b82f6', '#838387', '#636366'];

export const ModelHardwareGraph: React.FC = () => {
  const { translations: t } = useI18n();
  const [activeIndex, setActiveIndex] = useState(1);

  const chartData = t.modelHardware.models.map((m, i) => ({ ...m, color: modelColors[i] }));
  const activeModel = chartData[activeIndex];

  return (
    <div className="apple-section bg-[#13151b]">
      <div className="max-w-[980px] mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl lg:text-[56px] font-bold text-[#f4f4f5] mb-4 tracking-[-0.03em] leading-tight">{t.modelHardware.heading}</h2>
          <p className="text-[#838387] max-w-2xl mx-auto mb-2 text-lg">
            {t.modelHardware.description}
          </p>
          <p className="text-[#636366] text-sm font-medium italic">
            {t.modelHardware.subDescription}
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-5 items-start">
          {/* Chart Section */}
          <div className="lg:col-span-7 bg-[#161920] p-6 lg:p-10 rounded-[28px] border border-[#1e2028]">
            <h4 className="text-[#f4f4f5] font-medium mb-8 flex items-center text-sm">
              <span className="w-2 h-2 bg-[#6366f1] rounded-full mr-3"></span>
              {t.modelHardware.chartTitle}
            </h4>
            <div className="h-[380px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} onClick={(state) => state && setActiveIndex(Number(state.activeTooltipIndex) || 0)}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />
                  <XAxis dataKey="name" stroke="#636366" fontSize={11} tickLine={false} axisLine={false} interval={0} angle={-20} textAnchor="end" height={60} />
                  <YAxis stroke="#636366" fontSize={11} tickLine={false} axisLine={false} label={{ value: 'RAM (GB)', angle: -90, position: 'insideLeft', fill: '#636366' }} />
                  <Tooltip
                    cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                    contentStyle={{ backgroundColor: '#161920', border: '1px solid #2e3040', borderRadius: '12px' }}
                    itemStyle={{ color: '#f4f4f5' }}
                  />
                  <Bar dataKey="ram" radius={[8, 8, 0, 0]}>
                    {chartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={index === activeIndex ? entry.color : `${entry.color}33`}
                        className="cursor-pointer transition-all duration-300"
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-xs text-[#636366] mt-6 italic text-center">
              * {t.modelHardware.ramNote}
            </p>
          </div>

          {/* Info Section */}
          <div className="lg:col-span-5 space-y-5">
            <div className="p-8 rounded-[28px] bg-[#161920] border border-[#1e2028]">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl bg-[#13151b]" style={{ color: activeModel.color }}>
                  🤖
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#f4f4f5] tracking-[-0.02em]">{activeModel.name}</h3>
                  <p className="text-[#6366f1] font-medium uppercase tracking-widest text-xs">{t.modelHardware.recommendedLabel}</p>
                </div>
              </div>

              <div className="space-y-5">
                <div>
                  <p className="text-[#636366] text-xs font-medium uppercase mb-2">{t.modelHardware.optimalHardware}</p>
                  <div className="p-4 bg-[#13151b] rounded-2xl border border-[#1e2028] flex items-center justify-between">
                    <span className="text-[#f4f4f5] font-medium">{activeModel.hardware}</span>
                    <span className="text-[#6366f1] font-semibold">{activeModel.ram}GB RAM</span>
                  </div>
                </div>

                <div>
                  <p className="text-[#636366] text-xs font-medium uppercase mb-2">{t.modelHardware.executionCapability}</p>
                  <p className="text-[#838387] leading-relaxed italic">"{activeModel.description}"</p>
                </div>

                <button className="w-full py-3.5 bg-[#6366f1] hover:bg-[#8b5cf6] text-white font-semibold rounded-full transition-all duration-300 text-[15px]">
                  {t.modelHardware.consultButton}
                </button>
              </div>
            </div>

            {/* Selector Grid */}
            <div className="grid grid-cols-2 gap-2">
              {chartData.map((model, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`p-3 rounded-xl border text-xs font-medium transition-all duration-300 ${
                    idx === activeIndex
                      ? 'bg-[#6366f1] border-[#6366f1] text-[#f4f4f5]'
                      : 'bg-[#161920] border-[#1e2028] text-[#838387] hover:border-[#2e3040]'
                  }`}
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
