import React from 'react';

export const Hero: React.FC = () => {
  return (
    <div className="relative pt-24 pb-36 lg:pt-36 lg:pb-48 overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-[#6366f1]/8 blur-[200px] rounded-full pointer-events-none"></div>
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-[#8b5cf6]/5 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="max-w-[900px] mx-auto px-6 relative z-10 text-center">
        {/* Badge */}
        <div className="inline-flex items-center space-x-2 bg-[#0a0a0f] border border-[#6366f1]/20 rounded-full px-5 py-2 mb-10">
          <span className="text-sm">🦞</span>
          <span className="text-xs font-medium text-[#a78bfa] tracking-wide">Đối tác OpenClaw Chính Thức · Việt Nam</span>
        </div>

        {/* H1 */}
        <h1 className="text-5xl lg:text-[88px] font-bold text-[#f4f4f5] mb-6 leading-[1.0] tracking-[-0.04em]">
          AI Agent Chạy 24/7<br />
          <span className="text-gradient">Trên Máy Chủ Của Bạn</span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-xl mx-auto text-lg lg:text-[20px] text-[#838387] mb-10 leading-relaxed font-normal">
          Triển khai OpenClaw + Local AI. Dữ liệu không rời khỏi văn phòng. Bảo mật tuyệt đối.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-16">
          <a
            href="https://zalo.me/0337776435"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-3.5 bg-[#6366f1] text-white font-semibold rounded-full hover:bg-[#8b5cf6] transition-all duration-300 text-[17px] shadow-lg shadow-[#6366f1]/25"
          >
            Tư vấn miễn phí
          </a>
          <a
            href="#openclaw"
            className="w-full sm:w-auto px-8 py-3.5 text-[#a78bfa] font-medium rounded-full hover:text-white transition-all duration-300 text-[17px]"
          >
            Xem dịch vụ →
          </a>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap justify-center gap-3">
          {[
            { icon: '🔒', label: '100% Local' },
            { icon: '☁️', label: 'Zero Cloud' },
            { icon: '⏰', label: '24/7' },
            { icon: '🛡️', label: 'Bảo mật' },
          ].map((item) => (
            <div
              key={item.label}
              className="px-5 py-2.5 rounded-full bg-[#0a0a0f] border border-[#1e2028] flex items-center space-x-2 hover:border-[#6366f1]/30 transition-colors duration-300"
            >
              <span className="text-base">{item.icon}</span>
              <span className="text-sm font-medium text-[#f4f4f5]">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
