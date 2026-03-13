
import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useI18n } from '../i18n/I18nContext';

const modelColors = ['#F5D76E', '#D4AF37', '#B8962E', '#C0C0C0', '#A0A0A0', '#808080'];

export const ModelHardwareGraph: React.FC = () => {
  const { translations: t } = useI18n();
  const [activeIndex, setActiveIndex] = useState(1);

  const chartData = t.modelHardware.models.map((m, i) => ({ ...m, color: modelColors[i] }));
  const activeModel = chartData[activeIndex];

  return (
    <div className="apple-section bg-[#F5F5F5]">
      <div className="max-w-[980px] mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl lg:text-[56px] font-bold text-[#2C2C2C] mb-4 tracking-[-0.03em] leading-tight">{t.modelHardware.heading}</h2>
          <p className="text-[#6B7280] max-w-2xl mx-auto mb-2 text-lg">
            {t.modelHardware.description}
          </p>
          <p className="text-[#9CA3AF] text-sm font-medium italic">
            {t.modelHardware.subDescription}
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-5 items-start">
          {/* Chart Section */}
          <div className="lg:col-span-7 bg-white p-6 lg:p-10 rounded-[28px] border border-black/5">
            <h4 className="text-[#2C2C2C] font-medium mb-8 flex items-center text-sm">
              <span className="w-2 h-2 bg-[#D4AF37] rounded-full mr-3"></span>
              {t.modelHardware.chartTitle}
            </h4>
            <div className="h-[380px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} onClick={(state) => state && setActiveIndex(Number(state.activeTooltipIndex) || 0)}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" vertical={false} />
                  <XAxis dataKey="name" stroke="#9CA3AF" fontSize={11} tickLine={false} axisLine={false} interval={0} angle={-20} textAnchor="end" height={60} />
                  <YAxis stroke="#9CA3AF" fontSize={11} tickLine={false} axisLine={false} label={{ value: 'RAM (GB)', angle: -90, position: 'insideLeft', fill: '#6E6E73' }} />
                  <Tooltip
                    cursor={{ fill: 'rgba(255,255,255,0.03)' }}
                    contentStyle={{ backgroundColor: '#FFFFFF', border: '1px solid rgba(0,0,0,0.08)', borderRadius: '12px' }}
                    itemStyle={{ color: '#2C2C2C' }}
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
            <p className="text-xs text-[#9CA3AF] mt-6 italic text-center">
              * {t.modelHardware.ramNote}
            </p>
          </div>

          {/* Info Section */}
          <div className="lg:col-span-5 space-y-5">
            <div className="p-8 rounded-[28px] bg-white border border-black/5">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl bg-[#F5F5F5]" style={{ color: activeModel.color }}>
                  🤖
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#2C2C2C] tracking-[-0.02em]">{activeModel.name}</h3>
                  <p className="text-[#D4AF37] font-medium uppercase tracking-widest text-xs">{t.modelHardware.recommendedLabel}</p>
                </div>
              </div>

              <div className="space-y-5">
                <div>
                  <p className="text-[#9CA3AF] text-xs font-medium uppercase mb-2">{t.modelHardware.optimalHardware}</p>
                  <div className="p-4 bg-[#F5F5F5] rounded-2xl border border-black/5 flex items-center justify-between">
                    <span className="text-[#2C2C2C] font-medium">{activeModel.hardware}</span>
                    <span className="text-[#D4AF37] font-semibold">{activeModel.ram}GB RAM</span>
                  </div>
                </div>

                <div>
                  <p className="text-[#9CA3AF] text-xs font-medium uppercase mb-2">{t.modelHardware.executionCapability}</p>
                  <p className="text-[#78716C] leading-relaxed italic">"{activeModel.description}"</p>
                </div>

                <button className="w-full py-3.5 bg-[#D4AF37] hover:bg-[#E8C84A] text-black font-semibold rounded-full transition-all duration-300 text-[15px]">
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
                      ? 'bg-[#D4AF37] border-[#D4AF37] text-[#2C2C2C]'
                      : 'bg-white border-black/5 text-[#6B7280] hover:border-black/10'
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
