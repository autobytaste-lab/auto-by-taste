import React from 'react';

export const Hero: React.FC = () => {
  return (
    <div className="relative pt-24 pb-36 lg:pt-40 lg:pb-52 overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#ff5c5c]/6 blur-[200px] rounded-full pointer-events-none"></div>

      <div className="max-w-[860px] mx-auto px-6 relative z-10 text-center">
        {/* Floating logo */}
        <div className="animate-float mb-8 inline-block">
          <span style={{ fontSize: '72px', lineHeight: 1 }}>🦞</span>
        </div>

        {/* H1 */}
        <h1 className="text-6xl lg:text-[88px] font-bold text-white mb-4 leading-[1.0] tracking-[-0.04em]">
          AutoByTaste
        </h1>

        {/* Red uppercase tagline */}
        <p className="text-xs font-bold text-[#ff5c5c] tracking-[0.25em] uppercase mb-6">
          CỘNG ĐỒNG AGENTIC AI VIỆT NAM
        </p>

        {/* Subtitle */}
        <p className="max-w-lg mx-auto text-lg lg:text-[20px] text-[#707070] mb-2 leading-relaxed font-normal">
          Chạy AI Agent 24/7 ngay trên máy chủ của bạn.
        </p>
        <p className="max-w-lg mx-auto text-lg lg:text-[20px] text-[#707070] mb-10 leading-relaxed font-normal">
          Dữ liệu ở lại với bạn. <span className="text-white font-medium">Mãi mãi.</span>
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-12">
          <a
            href="https://zalo.me/0337776435"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-3.5 bg-[#ff5c5c] text-white font-semibold rounded-full hover:bg-[#ff7070] transition-all duration-300 text-[16px] shadow-lg shadow-[#ff5c5c]/25"
          >
            Tư vấn miễn phí →
          </a>
          <a
            href="#usecases"
            className="w-full sm:w-auto px-8 py-3.5 text-[#707070] font-medium rounded-full hover:text-white transition-all duration-300 text-[16px] border border-[#1e1e1e] hover:border-[#333]"
          >
            Xem use cases
          </a>
        </div>

        {/* Announcement ticker */}
        <div className="inline-flex items-center space-x-2 bg-[#0f0f0f] border border-[#ff5c5c]/20 rounded-full px-5 py-2.5 animate-fade-in-up">
          <span className="text-sm">🦞</span>
          <span className="text-xs font-medium text-[#ff9090]">
            AutoByTaste là đối tác OpenClaw chính thức tại Việt Nam
          </span>
          <span className="text-[#ff5c5c] text-xs">→</span>
        </div>
      </div>
    </div>
  );
};
