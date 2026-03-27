import React from 'react';

const services = [
  {
    icon: '🦞',
    title: 'Cài đặt & Triển khai',
    description: 'Hỗ trợ macOS, Windows, Linux. Kết nối đầy đủ channels: Telegram, Zalo, WhatsApp, Discord. Hoàn tất trong 24h.',
    tags: ['macOS', 'Windows', 'Linux'],
  },
  {
    icon: '🎓',
    title: 'Đào tạo đội ngũ',
    description: 'Workshop thực hành trực tiếp. Xây dựng custom Skills theo quy trình nghiệp vụ. Đội ngũ tự vận hành sau đào tạo.',
    tags: ['Workshop', 'Custom Skills', 'On-site'],
  },
  {
    icon: '🤖',
    title: 'Thiết kế AI Agent',
    description: 'Thiết kế AI Agent tùy chỉnh theo nghiệp vụ riêng của doanh nghiệp. Tích hợp multi-agent, tự động hóa quy trình.',
    tags: ['Custom Agent', 'Multi-agent', 'Automation'],
  },
  {
    icon: '⚡',
    title: 'Hỗ trợ & Bảo trì 24/7',
    description: 'Đội ngũ hỗ trợ qua Telegram và Zalo 24/7. Cập nhật định kỳ, monitoring, đảm bảo uptime tối đa.',
    tags: ['Telegram', 'Zalo', '24/7 Support'],
  },
];

export const OpenClawServices: React.FC = () => {
  return (
    <div className="apple-section bg-[#000000]" id="openclaw">
      <div className="max-w-[980px] mx-auto px-6">

        {/* Intro block: OpenClaw là gì? */}
        <div className="text-center mb-20">
          <span className="inline-block px-4 py-2 bg-[#ff5c5c]/10 border border-[#ff5c5c]/20 rounded-full text-xs font-medium text-[#ff9090] mb-6 tracking-wide">
            🦞 Cộng đồng Agentic AI Việt Nam
          </span>
          <h2 className="text-4xl md:text-[56px] font-bold mb-6 tracking-[-0.03em] leading-tight">
            <span className="text-gradient">OpenClaw là gì?</span>
          </h2>
          <div className="max-w-2xl mx-auto grid sm:grid-cols-3 gap-4 mt-8">
            {[
              { icon: '🖥️', text: 'AI agent platform chạy local trên máy chủ của bạn' },
              { icon: '📱', text: 'Kết nối Telegram, Zalo, WhatsApp, Discord' },
              { icon: '🔧', text: 'Skills ecosystem, multi-agent, hoạt động 24/7' },
            ].map((item, i) => (
              <div key={i} className="p-5 rounded-2xl bg-[#0a0a0f] border border-[#1e2028] text-left">
                <div className="text-2xl mb-3">{item.icon}</div>
                <p className="text-sm text-[#838387] leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Service Cards */}
        <div className="grid md:grid-cols-2 gap-5 mb-16">
          {services.map((service, i) => (
            <div
              key={i}
              className="group relative p-8 rounded-[28px] bg-[#0a0a0f] border border-[#1e2028] hover:border-[#ff5c5c]/30 transition-all duration-300 hover:scale-[1.01] overflow-hidden gold-hover-glow"
            >
              <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-[#ff5c5c]/3 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-[#ff5c5c]/6 transition-all duration-500"></div>
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-[#ff5c5c]/10 flex items-center justify-center mb-6 group-hover:bg-[#ff5c5c]/20 transition-colors duration-300">
                  <span className="text-3xl">{service.icon}</span>
                </div>
                <h3 className="text-xl font-semibold text-[#f4f4f5] mb-3 tracking-[-0.02em]">{service.title}</h3>
                <p className="text-[#838387] leading-relaxed mb-5">{service.description}</p>
                <div className="flex flex-wrap gap-2">
                  {service.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 text-xs rounded-full bg-[#ff5c5c]/10 text-[#ff9090] border border-[#ff5c5c]/15">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Block */}
        <div className="relative p-10 lg:p-14 rounded-[28px] bg-[#0a0a0f] border border-[#ff5c5c]/20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#ff5c5c]/5 to-[#ff7070]/5"></div>
          <div className="relative z-10 text-center">
            <div className="text-4xl mb-4">🦞</div>
            <h3 className="text-2xl font-bold text-[#f4f4f5] mb-3 tracking-[-0.02em]">Bắt đầu với OpenClaw ngay hôm nay</h3>
            <p className="text-[#838387] mb-8 max-w-lg mx-auto">Tư vấn miễn phí, triển khai nhanh trong 24h, hỗ trợ 24/7 qua Zalo và Telegram.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://zalo.me/0337776435"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-3.5 bg-[#ff5c5c] hover:bg-[#ff7070] text-white font-semibold rounded-full transition-all duration-300 text-[15px] shadow-lg shadow-[#ff5c5c]/25"
              >
                <img src="https://img.icons8.com/color/48/zalo.png" alt="Zalo" className="w-5 h-5" />
                Nhắn Zalo tư vấn
              </a>
              <a
                href="https://t.me/agentic_ai_vn"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-3.5 bg-[#0a0a0f] hover:bg-[#161920] text-[#14b8a6] font-semibold rounded-full border border-[#14b8a6]/20 hover:border-[#14b8a6]/40 transition-all duration-300 text-[15px]"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
                Tham gia Telegram
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
