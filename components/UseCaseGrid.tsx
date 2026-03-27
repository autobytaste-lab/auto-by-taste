import React from 'react';

const LOBE_CDN = 'https://unpkg.com/@lobehub/icons-static-png@latest/dark';

const LobeIcon: React.FC<{ name: string }> = ({ name }) => (
  <img
    src={`${LOBE_CDN}/${name}.png`}
    alt={name}
    className="w-5 h-5 object-contain"
    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
  />
);

const usecases = [
  {
    icon: <span className="text-3xl">⏰</span>,
    title: 'Làm Việc 24/7 Không Nghỉ',
    desc: 'AI Agent làm việc liên tục 24 giờ, 7 ngày — không lương, không nghỉ phép, không bảo hiểm. Luôn sẵn sàng phục vụ.',
  },
  {
    icon: (
      <div className="flex items-center gap-1.5 mb-2">
        <LobeIcon name="telegram" />
        <LobeIcon name="discord" />
        <LobeIcon name="whatsapp" />
      </div>
    ),
    title: 'Phục Vụ Mọi Kênh',
    desc: 'AI Agent trả lời khách hàng qua Telegram, Zalo, WhatsApp, Discord — tất cả kênh cùng lúc, không bỏ sót.',
  },
  {
    icon: <span className="text-3xl">🧠</span>,
    title: 'Bộ Nhớ Liên Tục',
    desc: 'Agent nhớ mọi thứ — khách hàng, lịch sử, quy trình. Không cần nhắc lại, không mất context.',
  },
  {
    icon: <span className="text-3xl">🌐</span>,
    title: 'Điều Khiển Trình Duyệt',
    desc: 'Tự động fill form, scrape data, submit, chụp screenshot. AI làm được tất cả những gì con người làm trên web.',
  },
  {
    icon: <span className="text-3xl">⚡</span>,
    title: 'Full System Access',
    desc: 'Đọc/ghi file, chạy scripts, gọi API. Agent thao tác trực tiếp trên hệ thống — sandbox hoặc toàn quyền.',
  },
  {
    icon: (
      <div className="flex items-center gap-1.5 mb-2">
        <LobeIcon name="github" />
        <LobeIcon name="notion" />
        <LobeIcon name="slack" />
      </div>
    ),
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
            › AI Agent Làm Được Gì?
          </p>
          <h2 className="text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Nhân sự AI.<br />
            <span className="text-[#707070]">Mọi tác vụ. 24/7.</span>
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
