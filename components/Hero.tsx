import React, { Suspense, lazy } from 'react';

const WorldMap = lazy(() => import('./WorldMap'));

export const Hero: React.FC = () => {
  return (
    <div className="relative pt-24 pb-16 lg:pt-40 lg:pb-24 overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#4ade80]/6 blur-[200px] rounded-full pointer-events-none"></div>

      <div className="max-w-[860px] mx-auto px-6 relative z-10 flex flex-col items-center text-center">

        {/* Glowing logo cycle with AutoByTaste text */}
        <div className="relative w-[180px] h-[180px] sm:w-[240px] sm:h-[240px] mb-10 flex-shrink-0">
          {/* Outer dark ring */}
          <div className="absolute inset-0 rounded-full bg-[#111] border border-[#222]"></div>

          {/* Gradient glow ring — spinning */}
          <div
            className="absolute inset-3 sm:inset-4 rounded-full"
            style={{
              background: 'conic-gradient(from 0deg, #d4fc79, #4ade80, #22c55e, #065f46, #22c55e, #4ade80, #d4fc79)',
              animation: 'glow-ring-spin 6s linear infinite',
            }}
          >
            {/* Inner black circle cutout */}
            <div className="absolute inset-[3px] rounded-full bg-[#0a0a0a]"></div>
          </div>

          {/* Glow blur behind ring */}
          <div
            className="absolute inset-2 sm:inset-3 rounded-full pointer-events-none"
            style={{
              background: 'conic-gradient(from 180deg, rgba(212,252,121,0.3), rgba(74,222,128,0.4), rgba(34,197,94,0.3), transparent, rgba(74,222,128,0.3), rgba(212,252,121,0.3))',
              filter: 'blur(16px)',
              animation: 'glow-ring-spin 6s linear infinite',
            }}
          ></div>

          {/* Scattered glow particles on the ring */}
          {[0, 72, 144, 216, 288].map((deg, i) => (
            <div
              key={i}
              className="absolute w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#4ade80] blur-[2px]"
              style={{
                top: `${50 - 44 * Math.cos((deg * Math.PI) / 180)}%`,
                left: `${50 + 44 * Math.sin((deg * Math.PI) / 180)}%`,
                transform: 'translate(-50%, -50%)',
                animation: `glow-pulse ${2 + i * 0.5}s ease-in-out infinite`,
              }}
            ></div>
          ))}

          {/* Center circle with brand text */}
          <div className="absolute inset-6 sm:inset-8 rounded-full bg-[#0a0a0a] flex items-center justify-center z-10">
            <span className="text-white font-extrabold text-sm sm:text-base tracking-tight leading-tight text-center">
              Auto<br />ByTaste
            </span>
          </div>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-[64px] font-bold text-white mb-6 leading-[1.1] tracking-[-0.03em]">
          AutoByTaste
          <br />
          <span className="text-gradient">AI Agent Platform</span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-lg mx-auto text-base lg:text-lg text-[#9ca3af] mb-10 leading-relaxed font-normal">
          AI Agent 24/7 cho doanh nghiệp Việt Nam.
          <br />
          Thiết kế đội ngũ AI theo nhu cầu — bắt đầu ngay.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14 w-full">
          <a
            href="#usecases"
            className="w-full sm:w-auto px-8 py-4 text-white font-semibold rounded-full text-[15px] border border-[#2a2a2a] hover:border-[#4ade80]/40 bg-[#111]/80 backdrop-blur-sm transition-all duration-300 hover:bg-[#1a1a1a]"
          >
            Xem đội ngũ AI mẫu
          </a>
          <a
            href="https://zalo.me/0337776435"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-4 btn-gradient rounded-full text-[15px] shadow-lg shadow-[#4ade80]/20"
          >
            Tư vấn miễn phí
          </a>
        </div>

        {/* World map visualization */}
        <Suspense fallback={
          <div className="w-full max-w-[800px] mx-auto mb-8 h-[300px] bg-[#0a0c10] rounded-2xl animate-pulse" />
        }>
          <WorldMap />
        </Suspense>

        {/* Stats cards row */}
        <div className="grid grid-cols-2 gap-4 w-full max-w-[500px] mx-auto">
          <div className="bg-[#111]/80 border border-[#1e2028] rounded-2xl p-4 sm:p-6 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs sm:text-sm text-[#9ca3af] font-medium">Active Agents</span>
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#4ade80]/10 flex items-center justify-center">
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#4ade80]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23,6 13.5,15.5 8.5,10.5 1,18" /><polyline points="17,6 23,6 23,12" /></svg>
              </div>
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-white tracking-tight">1.061.181</p>
          </div>
          <div className="bg-[#111]/80 border border-[#1e2028] rounded-2xl p-4 sm:p-6 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs sm:text-sm text-[#9ca3af] font-medium">Core Nodes</span>
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#4ade80]/10 flex items-center justify-center">
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#4ade80]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23,6 13.5,15.5 8.5,10.5 1,18" /><polyline points="17,6 23,6 23,12" /></svg>
              </div>
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-white tracking-tight">24.576</p>
          </div>
        </div>
      </div>
    </div>
  );
};
