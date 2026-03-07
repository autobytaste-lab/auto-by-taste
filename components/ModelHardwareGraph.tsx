
import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface ModelData {
  name: string;
  ram: number;
  hardware: string;
  description: string;
  color: string;
}

const aiModels: ModelData[] = [
  {
    name: "Phi-3 / Gemma 2B",
    ram: 8,
    hardware: "Mac Mini M4 (Base)",
    description: "Nhẹ nhàng, phù hợp tóm tắt văn bản đơn giản, chatbot cơ bản.",
    color: "#60A5FA"
  },
  {
    name: "Llama 3.1 8B (Q8)",
    ram: 16,
    hardware: "Mac Mini M4 (16GB+)",
    description: "Tiêu chuẩn vàng cho trợ lý cá nhân, viết lách và xử lý ngôn ngữ tự nhiên.",
    color: "#3B82F6"
  },
  {
    name: "Mistral Nemo 12B",
    ram: 32,
    hardware: "Mac Mini / Studio (32GB)",
    description: "Cân bằng tốt giữa tốc độ và độ thông minh cho văn phòng vừa.",
    color: "#2563EB"
  },
  {
    name: "Llama 3.1 70B (Q4)",
    ram: 64,
    hardware: "Mac Studio M2 Max (64GB)",
    description: "Mô hình mạnh mẽ, lý luận phức tạp, phù hợp cho RAG doanh nghiệp.",
    color: "#8B5CF6"
  },
  {
    name: "DeepSeek R1 / V3 (Med)",
    ram: 128,
    hardware: "Mac Studio Ultra (128GB)",
    description: "Chuyên gia phân tích dữ liệu, coding và xử lý khối lượng tri thức khổng lồ.",
    color: "#7C3AED"
  },
  {
    name: "DeepSeek R1 (Large)",
    ram: 192,
    hardware: "Mac Studio Ultra (Maxed Out)",
    description: "Sức mạnh tối thượng, chạy các mô hình lớn nhất hiện nay mượt mà.",
    color: "#6D28D9"
  }
];

export const ModelHardwareGraph: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(1);
  const activeModel = aiModels[activeIndex];

  return (
    <div className="py-24 bg-[#050505]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-4">Mô Hình AI & Cấu Hình Phần Cứng</h2>
          <p className="text-slate-400 max-w-2xl mx-auto mb-2">
            Chọn mô hình AI bạn muốn chạy để xem yêu cầu bộ nhớ (Unified Memory) tương ứng trên hệ sinh thái Apple Silicon.
          </p>
          <p className="text-slate-500 text-sm font-medium italic">
            Minimum RAM requirement for running open-source AI models on Apple Silicon.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Chart Section */}
          <div className="lg:col-span-7 glass-card p-6 lg:p-10 rounded-[2.5rem] border border-white/5">
            <h4 className="text-white font-bold mb-8 flex items-center">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
              Biểu đồ RAM cần thiết (GB)
            </h4>
            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={aiModels} onClick={(state) => state && setActiveIndex(state.activeTooltipIndex || 0)}>
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
                    {aiModels.map((entry, index) => (
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
              * RAM được tính dựa trên kiến trúc Unified Memory, cho phép GPU truy cập trực tiếp bộ nhớ mô hình.
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
                  <p className="text-blue-400 font-bold uppercase tracking-widest text-xs">Phân khúc khuyên dùng</p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <p className="text-slate-500 text-xs font-bold uppercase mb-2">Phần cứng tối ưu</p>
                  <div className="p-4 bg-white/5 rounded-2xl border border-white/10 flex items-center justify-between">
                    <span className="text-white font-medium">{activeModel.hardware}</span>
                    <span className="text-blue-400 font-bold">{activeModel.ram}GB RAM</span>
                  </div>
                </div>

                <div>
                  <p className="text-slate-500 text-xs font-bold uppercase mb-2">Khả năng thực thi</p>
                  <p className="text-slate-300 leading-relaxed italic">"{activeModel.description}"</p>
                </div>
                
                <button className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl transition-all shadow-lg shadow-blue-600/20">
                  Tư vấn lắp đặt cấu hình này
                </button>
              </div>
            </div>

            {/* Selector Grid for Quick selection */}
            <div className="grid grid-cols-2 gap-3">
              {aiModels.map((model, idx) => (
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
