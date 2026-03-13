import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, Legend } from 'recharts';
import { chips } from './data/chips';
import type { Chip } from './data/types';

interface ChartDataPoint {
  name: string;
  cpuCores: number;
  gpuCores: number;
  memoryBandwidth: number;
  maxMemory: number;
  chip: Chip;
}

export const ChipComparison: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [viewMode, setViewMode] = useState<'all' | 'generation'>('generation');

  const getChartData = (): ChartDataPoint[] => {
    if (viewMode === 'generation') {
      const representativeChips = [
        chips.find(c => c.id === 'm1-pro'),
        chips.find(c => c.id === 'm2-pro'),
        chips.find(c => c.id === 'm3-pro'),
        chips.find(c => c.id === 'm4-pro'),
      ].filter((c): c is Chip => c !== undefined);

      return representativeChips.map(chip => ({
        name: chip.name,
        cpuCores: chip.cpuCores.total,
        gpuCores: chip.gpuCores,
        memoryBandwidth: chip.memoryBandwidth,
        maxMemory: chip.maxMemory,
        chip
      }));
    } else {
      const filteredChips = chips.filter(c => c.variant !== 'Ultra');
      return filteredChips.map(chip => ({
        name: chip.name,
        cpuCores: chip.cpuCores.total,
        gpuCores: chip.gpuCores,
        memoryBandwidth: chip.memoryBandwidth,
        maxMemory: chip.maxMemory,
        chip
      }));
    }
  };

  const chartData = getChartData();
  const activeChip = chartData[activeIndex]?.chip;

  const colors = {
    cpuCores: '#D4AF37',
    gpuCores: '#F5D76E',
    memoryBandwidth: '#B8962E',
    maxMemory: '#C0C0C0'
  };

  const getPerformanceUplift = (chipId: string): string | null => {
    if (viewMode !== 'generation') return null;
    const uplifts: Record<string, string> = {
      'm2-pro': '+20% vs M1',
      'm3-pro': '+30% vs M2',
      'm4-pro': '+25% vs M3'
    };
    return uplifts[chipId] || null;
  };

  const getChipNote = (chipId: string): { text: string; type: 'warning' | 'success' } | null => {
    if (chipId === 'm3-pro') {
      return { text: 'Lưu ý: Băng thông giảm xuống 150 GB/s (M2 Pro: 200 GB/s)', type: 'warning' };
    }
    if (chipId === 'm4-max' || chipId === 'm4-max-40gpu') {
      return { text: 'Nhanh nhất cho AI workloads - băng thông lên đến 546 GB/s', type: 'success' };
    }
    return null;
  };

  return (
    <div className="apple-section bg-[#FAFAFA]">
      <div className="max-w-[980px] mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl lg:text-[56px] font-bold text-[#2C2C2C] mb-4 tracking-[-0.03em] leading-tight">So sánh chip M-series</h2>
          <p className="text-[#6B7280] max-w-2xl mx-auto mb-2 text-lg">
            So sánh hiệu năng và thông số kỹ thuật của các thế hệ chip Apple Silicon
          </p>
          <p className="text-[#9CA3AF] text-sm font-medium italic">
            M1, M2, M3, và M4 - Sự tiến hóa của công nghệ chip tùy chỉnh
          </p>
        </div>

        {/* View Toggle - Apple style segmented control */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex rounded-full p-1 bg-white border border-black/5">
            <button
              onClick={() => setViewMode('generation')}
              className={`px-6 py-2.5 rounded-full font-medium text-sm transition-all duration-300 ${
                viewMode === 'generation'
                  ? 'bg-black/[0.05] text-[#2C2C2C]'
                  : 'text-[#6B7280] hover:text-[#2C2C2C]'
              }`}
            >
              Theo thế hệ
            </button>
            <button
              onClick={() => setViewMode('all')}
              className={`px-6 py-2.5 rounded-full font-medium text-sm transition-all duration-300 ${
                viewMode === 'all'
                  ? 'bg-black/[0.05] text-[#2C2C2C]'
                  : 'text-[#6B7280] hover:text-[#2C2C2C]'
              }`}
            >
              Tất cả chip
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-5 items-start">
          {/* Chart Section */}
          <div className="lg:col-span-7 bg-white p-6 lg:p-10 rounded-[28px] border border-black/5">
            <h4 className="text-[#2C2C2C] font-medium mb-8 flex items-center text-sm">
              <span className="w-2 h-2 bg-[#D4AF37] rounded-full mr-3"></span>
              Thông số kỹ thuật
            </h4>
            <div className="h-[380px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  onClick={(state) => state && setActiveIndex(Number(state.activeTooltipIndex) || 0)}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" vertical={false} />
                  <XAxis dataKey="name" stroke="#9CA3AF" fontSize={11} tickLine={false} axisLine={false} interval={0} angle={-20} textAnchor="end" height={60} />
                  <YAxis stroke="#9CA3AF" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip
                    cursor={{ fill: 'rgba(255,255,255,0.03)' }}
                    contentStyle={{ backgroundColor: '#FFFFFF', border: '1px solid rgba(0,0,0,0.08)', borderRadius: '12px' }}
                    itemStyle={{ color: '#2C2C2C' }}
                    labelStyle={{ color: '#6B7280' }}
                    formatter={(value, name) => {
                      const labels: Record<string, string> = {
                        cpuCores: 'Nhân CPU',
                        gpuCores: 'Nhân GPU',
                        memoryBandwidth: 'Băng thông bộ nhớ (GB/s)',
                        maxMemory: 'RAM tối đa (GB)'
                      };
                      return [value, labels[name as string] || name];
                    }}
                  />
                  <Legend
                    wrapperStyle={{ paddingTop: '20px' }}
                    formatter={(value) => {
                      const labels: Record<string, string> = {
                        cpuCores: 'Nhân CPU',
                        gpuCores: 'Nhân GPU',
                        memoryBandwidth: 'Băng thông (GB/s)',
                        maxMemory: 'RAM (GB)'
                      };
                      return labels[value] || value;
                    }}
                  />
                  <Bar dataKey="cpuCores" fill={colors.cpuCores} radius={[6, 6, 0, 0]} />
                  <Bar dataKey="gpuCores" fill={colors.gpuCores} radius={[6, 6, 0, 0]} />
                  <Bar dataKey="memoryBandwidth" fill={colors.memoryBandwidth} radius={[6, 6, 0, 0]} />
                  <Bar dataKey="maxMemory" fill={colors.maxMemory} radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-xs text-[#9CA3AF] mt-6 italic text-center">
              * Dữ liệu dựa trên thông số kỹ thuật chính thức từ Apple
            </p>
          </div>

          {/* Details Panel */}
          {activeChip && (
            <div className="lg:col-span-5 space-y-5">
              <div className="p-8 rounded-[28px] bg-white border border-black/5">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl bg-[#F5F5F5]">
                    💻
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-[#2C2C2C] tracking-[-0.02em]">{activeChip.name}</h3>
                    <p className="text-[#D4AF37] font-medium uppercase tracking-widest text-xs">
                      {activeChip.generation} • {activeChip.processNode}
                    </p>
                    {getPerformanceUplift(activeChip.id) && (
                      <p className="text-[#30D158] font-medium text-sm mt-1">
                        {getPerformanceUplift(activeChip.id)}
                      </p>
                    )}
                  </div>
                </div>

                {getChipNote(activeChip.id) && (
                  <div className={`p-4 rounded-xl mb-6 border ${
                    getChipNote(activeChip.id)?.type === 'warning'
                      ? 'bg-[#FF9F0A]/5 border-[#FF9F0A]/15'
                      : 'bg-[#30D158]/5 border-[#30D158]/15'
                  }`}>
                    <p className={`text-sm font-medium ${
                      getChipNote(activeChip.id)?.type === 'warning' ? 'text-[#FF9F0A]' : 'text-[#30D158]'
                    }`}>
                      {getChipNote(activeChip.id)?.text}
                    </p>
                  </div>
                )}

                <div className="space-y-5">
                  <div>
                    <p className="text-[#9CA3AF] text-xs font-medium uppercase mb-2">CPU Cores</p>
                    <div className="p-4 bg-[#F5F5F5] rounded-2xl border border-black/5">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-[#6B7280] text-sm">Performance</span>
                        <span className="text-[#2C2C2C] font-semibold">{activeChip.cpuCores.performance}</span>
                      </div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-[#6B7280] text-sm">Efficiency</span>
                        <span className="text-[#2C2C2C] font-semibold">{activeChip.cpuCores.efficiency}</span>
                      </div>
                      <div className="flex justify-between items-center pt-2 border-t border-black/5">
                        <span className="text-[#D4AF37] text-sm font-medium">Tổng</span>
                        <span className="text-[#D4AF37] font-semibold">{activeChip.cpuCores.total}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <p className="text-[#9CA3AF] text-xs font-medium uppercase mb-2">Thông số khác</p>
                    <div className="space-y-2">
                      <div className="p-3 bg-[#F5F5F5] rounded-xl border border-black/5 flex justify-between">
                        <span className="text-[#6B7280] text-sm">Nhân GPU</span>
                        <span className="text-[#2C2C2C] font-semibold">{activeChip.gpuCores}</span>
                      </div>
                      <div className="p-3 bg-[#F5F5F5] rounded-xl border border-black/5 flex justify-between">
                        <span className="text-[#6B7280] text-sm">Băng thông bộ nhớ</span>
                        <span className="text-[#2C2C2C] font-semibold">{activeChip.memoryBandwidth} GB/s</span>
                      </div>
                      <div className="p-3 bg-[#F5F5F5] rounded-xl border border-black/5 flex justify-between">
                        <span className="text-[#6B7280] text-sm">RAM tối đa</span>
                        <span className="text-[#2C2C2C] font-semibold">{activeChip.maxMemory} GB</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Chip Selector Grid */}
              <div className="grid grid-cols-2 gap-2">
                {chartData.map((data, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveIndex(idx)}
                    className={`p-3 rounded-xl border text-xs font-medium transition-all duration-300 ${
                      idx === activeIndex
                        ? 'bg-[#D4AF37] border-[#D4AF37] text-[#2C2C2C]'
                        : 'bg-white border-black/5 text-[#6B7280] hover:border-black/10'
                    }`}
                  >
                    {data.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
