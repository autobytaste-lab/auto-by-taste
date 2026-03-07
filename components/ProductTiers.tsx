
import React from 'react';
import { ProductTier } from '../types';

const tiers: ProductTier[] = [
  {
    name: "Basic",
    hardware: "Mac Mini M4 (32GB+ RAM)",
    target: "Cá nhân, Freelancer",
    capability: "Tóm tắt văn bản, viết email, lên lịch trình cơ bản.",
    expansion: "2-3 cổng Thunderbolt 4 cho ổ cứng NVMe siêu tốc.",
  },
  {
    name: "Pro",
    hardware: "Mac Studio M2 Max (64GB+ RAM)",
    target: "Công ty vừa, Trung tâm đào tạo",
    capability: "Chạy RAG trên toàn bộ kho tài liệu nội bộ, thẩm định văn bản chuyên sâu.",
    expansion: "4 cổng Thunderbolt 4, hỗ trợ RAID lưu trữ dữ liệu tri thức lớn.",
  },
  {
    name: "Enterprise",
    hardware: "Mac Studio M2/M3 Ultra (128GB+ RAM)",
    target: "Tập đoàn, Ngân hàng",
    capability: "Phân tích dữ liệu lớn, chạy đa nhiệm nhiều trợ lý ảo cùng lúc với hiệu suất tối đa.",
    expansion: "6 cổng Thunderbolt 4, băng thông 40Gbps mỗi cổng cho hệ thống ngoại vi chuyên dụng.",
  }
];

export const ProductTiers: React.FC = () => {
  return (
    <div className="py-24 bg-[#050505]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-4">Các Gói Giải Pháp</h2>
          <p className="text-slate-400">Thiết kế linh hoạt và khả năng mở rộng không giới hạn.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {tiers.map((tier, idx) => (
            <div key={idx} className={`relative p-8 rounded-[2.5rem] flex flex-col ${idx === 1 ? 'bg-blue-600/10 border-2 border-blue-500/50' : 'glass-card'}`}>
              {idx === 1 && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-500 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                  Phổ biến nhất
                </div>
              )}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">{tier.name}</h3>
                <div className="h-1 w-12 bg-blue-500 rounded-full"></div>
              </div>

              <div className="mb-8 flex-grow">
                <div className="mb-6">
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Phần cứng</p>
                  <p className="text-lg text-slate-200 font-medium">{tier.hardware}</p>
                </div>
                <div className="mb-6">
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Đối tượng</p>
                  <p className="text-slate-300">{tier.target}</p>
                </div>
                <div className="mb-6">
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Khả năng xử lý</p>
                  <p className="text-slate-400 leading-relaxed text-sm">{tier.capability}</p>
                </div>
                <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                  <p className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-2 flex items-center">
                    <span className="mr-2">⚡</span> Mở rộng Thunderbolt
                  </p>
                  <p className="text-slate-400 text-xs leading-relaxed">{tier.expansion}</p>
                </div>
              </div>

              <button className={`w-full py-4 rounded-2xl font-bold transition-all ${idx === 1 ? 'bg-blue-600 hover:bg-blue-500 text-white' : 'bg-white/5 hover:bg-white/10 text-white'}`}>
                Liên hệ Tư vấn
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
