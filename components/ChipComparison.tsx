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

  // Transform chip data for chart
  const getChartData = (): ChartDataPoint[] => {
    if (viewMode === 'generation') {
      // Show one representative chip per generation (Pro variant for comparison)
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
      // Show all chips except Ultra variants (too many bars)
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
    cpuCores: '#60A5FA',
    gpuCores: '#3B82F6',
    memoryBandwidth: '#2563EB',
    maxMemory: '#8B5CF6'
  };

  // Calculate performance uplift percentages (generation view only)
  const getPerformanceUplift = (chipId: string): string | null => {
    if (viewMode !== 'generation') return null;

    const uplifts: Record<string, string> = {
      'm2-pro': '+20% vs M1',
      'm3-pro': '+30% vs M2',
      'm4-pro': '+25% vs M3'
    };
    return uplifts[chipId] || null;
  };

  // Get special notes for chips
  const getChipNote = (chipId: string): { text: string; type: 'warning' | 'success' } | null => {
    if (chipId === 'm3-pro') {
      return {
        text: 'Lưu ý: Băng thông giảm xuống 150 GB/s (M2 Pro: 200 GB/s)',
        type: 'warning'
      };
    }
    if (chipId === 'm4-max') {
      return {
        text: 'Nhanh nhất cho AI workloads - băng thông 546 GB/s',
        type: 'success'
      };
    }
    return null;
  };

  return (
    <div className="py-24 bg-[#050505]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-4">So sánh chip M-series</h2>
          <p className="text-slate-400 max-w-2xl mx-auto mb-2">
            So sánh hiệu năng và thông số kỹ thuật của các thế hệ chip Apple Silicon
          </p>
          <p className="text-slate-500 text-sm font-medium italic">
            M1, M2, M3, và M4 - Sự tiến hóa của công nghệ chip tùy chỉnh
          </p>
        </div>

        {/* View Toggle */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-2xl p-1 glass-card border border-white/5">
            <button
              onClick={() => setViewMode('generation')}
              className={`px-6 py-3 rounded-xl font-bold text-sm transition-all ${
                viewMode === 'generation'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Theo thế hệ
            </button>
            <button
              onClick={() => setViewMode('all')}
              className={`px-6 py-3 rounded-xl font-bold text-sm transition-all ${
                viewMode === 'all'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Tất cả chip
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Chart Section */}
          <div className="lg:col-span-7 glass-card p-6 lg:p-10 rounded-[2.5rem] border border-white/5">
            <h4 className="text-white font-bold mb-8 flex items-center">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
              Thông số kỹ thuật
            </h4>
            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  onClick={(state) => state && setActiveIndex(state.activeTooltipIndex || 0)}
                >
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
                  />
                  <Tooltip
                    cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                    contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px' }}
                    itemStyle={{ color: '#fff' }}
                    labelStyle={{ color: '#94a3b8' }}
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
                        memoryBandwidth: 'Băng thông bộ nhớ (GB/s)',
                        maxMemory: 'RAM tối đa (GB)'
                      };
                      return labels[value] || value;
                    }}
                  />
                  <Bar dataKey="cpuCores" fill={colors.cpuCores} radius={[4, 4, 0, 0]} />
                  <Bar dataKey="gpuCores" fill={colors.gpuCores} radius={[4, 4, 0, 0]} />
                  <Bar dataKey="memoryBandwidth" fill={colors.memoryBandwidth} radius={[4, 4, 0, 0]} />
                  <Bar dataKey="maxMemory" fill={colors.maxMemory} radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-xs text-slate-500 mt-6 italic text-center">
              * Dữ liệu dựa trên thông số kỹ thuật chính thức từ Apple
            </p>
          </div>

          {/* Details Panel */}
          {activeChip && (
            <div className="lg:col-span-5 space-y-6">
              <div className="p-8 rounded-[2.5rem] bg-gradient-to-br from-blue-600/10 to-purple-600/10 border border-blue-500/20 shadow-2xl shadow-blue-500/5">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-inner bg-white/5">
                    💻
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white">{activeChip.name}</h3>
                    <p className="text-blue-400 font-bold uppercase tracking-widest text-xs">
                      {activeChip.generation} • {activeChip.processNode}
                    </p>
                    {getPerformanceUplift(activeChip.id) && (
                      <p className="text-green-400 font-bold text-sm mt-1">
                        {getPerformanceUplift(activeChip.id)}
                      </p>
                    )}
                  </div>
                </div>

                {/* Special Notes */}
                {getChipNote(activeChip.id) && (
                  <div className={`p-4 rounded-xl mb-6 border ${
                    getChipNote(activeChip.id)?.type === 'warning'
                      ? 'bg-yellow-500/10 border-yellow-500/30'
                      : 'bg-green-500/10 border-green-500/30'
                  }`}>
                    <p className={`text-sm font-medium ${
                      getChipNote(activeChip.id)?.type === 'warning'
                        ? 'text-yellow-400'
                        : 'text-green-400'
                    }`}>
                      {getChipNote(activeChip.id)?.text}
                    </p>
                  </div>
                )}

                <div className="space-y-6">
                  <div>
                    <p className="text-slate-500 text-xs font-bold uppercase mb-2">CPU Cores</p>
                    <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-slate-400 text-sm">Performance</span>
                        <span className="text-white font-bold">{activeChip.cpuCores.performance}</span>
                      </div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-slate-400 text-sm">Efficiency</span>
                        <span className="text-white font-bold">{activeChip.cpuCores.efficiency}</span>
                      </div>
                      <div className="flex justify-between items-center pt-2 border-t border-white/10">
                        <span className="text-blue-400 text-sm font-bold">Tổng</span>
                        <span className="text-blue-400 font-bold">{activeChip.cpuCores.total}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <p className="text-slate-500 text-xs font-bold uppercase mb-2">Thông số khác</p>
                    <div className="space-y-2">
                      <div className="p-3 bg-white/5 rounded-xl border border-white/10 flex justify-between">
                        <span className="text-slate-400 text-sm">Nhân GPU</span>
                        <span className="text-white font-bold">{activeChip.gpuCores}</span>
                      </div>
                      <div className="p-3 bg-white/5 rounded-xl border border-white/10 flex justify-between">
                        <span className="text-slate-400 text-sm">Băng thông bộ nhớ</span>
                        <span className="text-white font-bold">{activeChip.memoryBandwidth} GB/s</span>
                      </div>
                      <div className="p-3 bg-white/5 rounded-xl border border-white/10 flex justify-between">
                        <span className="text-slate-400 text-sm">RAM tối đa</span>
                        <span className="text-white font-bold">{activeChip.maxMemory} GB</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Chip Selector Grid */}
              <div className="grid grid-cols-2 gap-3">
                {chartData.map((data, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveIndex(idx)}
                    className={`p-3 rounded-xl border text-xs font-bold transition-all ${
                      idx === activeIndex
                        ? 'bg-blue-600 border-blue-500 text-white'
                        : 'glass-card border-white/5 text-slate-400 hover:border-white/20'
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
