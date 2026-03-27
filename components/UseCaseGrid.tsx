import React from 'react';

const usecases = [
  {
    icon: '🏠',
    title: 'Chạy Hoàn Toàn Local',
    desc: 'OpenClaw chạy trên máy chủ của bạn. Hỗ trợ Ollama, LM Studio, EXO. Dữ liệu không bao giờ rời khỏi văn phòng.',
  },
  {
    icon: '💬',
    title: 'Mọi Kênh Chat',
    desc: 'Kết nối Telegram, Zalo, WhatsApp, Discord. AI Agent trả lời 24/7 trên tất cả kênh cùng lúc.',
  },
  {
    icon: '🧠',
    title: 'Bộ Nhớ Liên Tục',
    desc: 'Agent nhớ mọi thứ — khách hàng, lịch sử, quy trình. Không cần nhắc lại, không mất context.',
  },
  {
    icon: '🌐',
    title: 'Điều Khiển Trình Duyệt',
    desc: 'Tự động fill form, scrape data, submit, chụp screenshot. AI làm được tất cả những gì con người làm trên web.',
  },
  {
    icon: '⚡',
    title: 'Full System Access',
    desc: 'Đọc/ghi file, chạy scripts, gọi API. Agent thao tác trực tiếp trên hệ thống — sandbox hoặc toàn quyền.',
  },
  {
    icon: '🔧',
    title: 'Skills & Tích Hợp',
    desc: 'Hàng trăm Skills sẵn có. Tự viết skill mới bằng markdown. Tích hợp bất kỳ tool nào qua MCP/API.',
  },
];

export const UseCaseGrid: React.FC = () => {
  return (
    <section id="usecases" className="py-24 px-6">
      <div className="max-w-[980px] mx-auto">
        {/* Section header */}
        <div className="mb-16">
          <p className="text-xs font-medium text-[#ff5c5c] tracking-[0.2em] uppercase mb-4">
            › OpenClaw Làm Được Gì?
          </p>
          <h2 className="text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Một Agent.<br />
            <span className="text-[#707070]">Mọi tác vụ.</span>
          </h2>
        </div>

        {/* 2x3 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#1a1a1a]">
          {usecases.map((uc, i) => (
            <div
              key={i}
              className="bg-[#0a0a0a] p-8 group hover:bg-[#0f0f0f] transition-all duration-300"
            >
              <div className="text-3xl mb-5">{uc.icon}</div>
              <h3 className="text-base font-semibold text-white mb-3 group-hover:text-[#ff5c5c] transition-colors duration-300">
                {uc.title}
              </h3>
              <p className="text-sm text-[#606060] leading-relaxed">
                {uc.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
