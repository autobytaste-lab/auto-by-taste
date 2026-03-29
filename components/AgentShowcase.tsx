import React from 'react';

const tags = [
  'Sales Agent',
  'CSKH Agent',
  'Marketing Agent',
  'Data Agent',
];

export const AgentShowcase: React.FC = () => {
  return (
    <section className="py-24 px-6">
      <div className="max-w-[980px] mx-auto">
        <div className="bg-[#111]/60 border border-[#1e2028] rounded-3xl p-8 sm:p-12 overflow-hidden">
          {/* Green subtitle */}
          <p className="text-sm font-semibold text-[#d4fc79] mb-4 tracking-wide">
            Tối Đa Hóa Tiềm Năng Doanh Nghiệp
          </p>

          {/* Bold heading */}
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-white leading-[1.15] tracking-tight mb-6">
            Triển Khai AI Agent<br />
            Và Nhận Hiệu Suất x10
          </h2>

          {/* Description */}
          <p className="text-base text-[#9ca3af] leading-relaxed max-w-xl mb-8">
            Tích hợp đội ngũ AI Agent vào vận hành doanh nghiệp. Giao việc bán hàng, chăm sóc khách hàng, marketing và xử lý dữ liệu — AI hoạt động 24/7, chi phí chỉ 1/5 nhân sự thực.
          </p>

          {/* Tag pills — 2x2 grid */}
          <div className="grid grid-cols-2 gap-3 max-w-md mb-12">
            {tags.map((tag) => (
              <div
                key={tag}
                className="px-5 py-3 rounded-full bg-[#1a1c22]/80 border border-[#2a2a2a] text-sm font-medium text-[#d4d4d8] text-center hover:border-[#4ade80]/30 hover:text-white transition-all duration-300"
              >
                {tag}
              </div>
            ))}
          </div>

          {/* Visual — connected agent nodes */}
          <div className="relative w-full max-w-[480px] mx-auto h-[320px]">
            {/* Center hub */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-2xl bg-gradient-to-br from-[#d4fc79]/60 to-[#4ade80]/60 flex items-center justify-center shadow-lg shadow-[#4ade80]/15 z-10">
              <img src="https://umxxfeuo5ed9xpid.public.blob.vercel-storage.com/media/img_6721_1774808773182.jpeg" alt="AutoByTaste" className="w-12 h-12 rounded-full object-cover" />
            </div>

            {/* Connecting lines */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 480 320">
              <line x1="240" y1="160" x2="120" y2="60" stroke="#4ade80" strokeWidth="1" opacity="0.2" strokeDasharray="4 4" />
              <line x1="240" y1="160" x2="360" y2="60" stroke="#4ade80" strokeWidth="1" opacity="0.2" strokeDasharray="4 4" />
              <line x1="240" y1="160" x2="120" y2="260" stroke="#4ade80" strokeWidth="1" opacity="0.2" strokeDasharray="4 4" />
              <line x1="240" y1="160" x2="360" y2="260" stroke="#4ade80" strokeWidth="1" opacity="0.2" strokeDasharray="4 4" />
            </svg>

            {/* Top-left node — Sales */}
            <div className="absolute top-4 left-[15%] w-16 h-16 rounded-xl bg-[#1a1c22] border border-[#2a2a2a] flex items-center justify-center">
              <div className="w-8 h-8 rounded-full bg-[#0a1a0a] border border-[#4ade80]/30 flex items-center justify-center">
                <svg className="w-4 h-4 text-[#4ade80]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/></svg>
              </div>
            </div>

            {/* Top-right node — CSKH */}
            <div className="absolute top-4 right-[15%] w-16 h-16 rounded-xl bg-[#1a1c22] border border-[#2a2a2a] flex items-center justify-center">
              <div className="w-8 h-8 rounded-full bg-[#0a1a0a] border border-[#4ade80]/30 flex items-center justify-center">
                <svg className="w-4 h-4 text-[#4ade80]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
              </div>
            </div>

            {/* Bottom-left node — Marketing */}
            <div className="absolute bottom-4 left-[15%] w-16 h-16 rounded-xl bg-[#1a1c22] border border-[#2a2a2a] flex items-center justify-center">
              <div className="w-8 h-8 rounded-full bg-[#0a1a0a] border border-[#4ade80]/30 flex items-center justify-center">
                <svg className="w-4 h-4 text-[#4ade80]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
              </div>
            </div>

            {/* Bottom-right node — Data */}
            <div className="absolute bottom-4 right-[15%] w-16 h-16 rounded-xl bg-[#1a1c22] border border-[#2a2a2a] flex items-center justify-center">
              <div className="w-8 h-8 rounded-full bg-[#4ade80]/20 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-[#4ade80]"></div>
              </div>
            </div>

            {/* Top center node */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-14 h-14 rounded-xl bg-[#1a1c22] border border-[#2a2a2a] flex items-center justify-center">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#d4fc79] to-[#4ade80] flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-white"></div>
              </div>
            </div>

            {/* Bottom center node */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-14 h-14 rounded-xl bg-[#1a1c22] border border-[#2a2a2a] flex items-center justify-center">
              <div className="flex gap-1">
                <div className="w-2.5 h-2.5 rounded-full bg-[#4ade80]/60"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-[#4ade80]/30"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
