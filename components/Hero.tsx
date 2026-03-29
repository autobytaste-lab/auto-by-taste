import React from 'react';

export const Hero: React.FC = () => {
  return (
    <div className="relative pt-24 pb-36 lg:pt-40 lg:pb-52 overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#4ade80]/6 blur-[200px] rounded-full pointer-events-none"></div>

      <div className="max-w-[860px] mx-auto px-6 relative z-10 text-center">
        {/* Bold statement headline — OptimAI style */}
        <h1 className="text-5xl sm:text-6xl lg:text-[80px] font-bold text-white mb-6 leading-[1.05] tracking-[-0.03em]">
          Your <span className="font-extrabold">Data.</span>{' '}
          Your <span className="font-extrabold">Agent.</span>
          <br />
          Your <span className="text-gradient font-extrabold">Control.</span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-lg mx-auto text-lg lg:text-[20px] text-[#9ca3af] mb-10 leading-relaxed font-normal">
          AI Agent 24/7 cho doanh nghiệp Việt Nam.
          <br />
          Thiết kế đội ngũ AI theo nhu cầu — bắt đầu ngay.
        </p>

        {/* CTAs — OptimAI style */}
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-8">
          <a
            href="https://zalo.me/0337776435"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-10 py-4 btn-gradient rounded-full text-[16px] shadow-lg shadow-[#4ade80]/20"
          >
            Get Started
          </a>
          <a
            href="#usecases"
            className="w-full sm:w-auto px-8 py-3.5 text-[#9ca3af] font-medium rounded-full hover:text-white transition-all duration-300 text-[16px] border border-[#2a2a2a] hover:border-[#4ade80]/40 bg-[#0f0f0f]/60 backdrop-blur-sm"
          >
            Xem đội ngũ AI mẫu
          </a>
        </div>

        {/* Platform icons row */}
        <div className="flex items-center justify-center space-x-4 mb-14">
          {['Telegram', 'Chrome', 'Brave', 'Opera', 'Apple', 'Windows', 'Ubuntu', 'Play Store', 'App Store'].map((platform, i) => (
            <div key={i} className="w-7 h-7 rounded-full bg-[#1a1a1a] border border-[#2a2a2a] flex items-center justify-center text-xs text-[#9ca3af] hover:border-[#4ade80]/40 transition-colors duration-300" title={platform}>
              {['✈️', '🌐', '🦁', '🔴', '🍎', '🪟', '🐧', '▶️', '📱'][i]}
            </div>
          ))}
        </div>

        {/* Glowing circular hero visual — OptimAI style */}
        <div className="relative w-[280px] h-[280px] sm:w-[340px] sm:h-[340px] mx-auto">
          {/* Outer glow ring */}
          <div className="hero-glow-ring-outer absolute top-1/2 left-1/2 w-[320px] h-[320px] sm:w-[380px] sm:h-[380px] rounded-full" style={{ transform: 'translate(-50%, -50%)' }}></div>

          {/* Middle ring */}
          <div className="hero-glow-ring w-[280px] h-[280px] sm:w-[340px] sm:h-[340px]"></div>

          {/* Inner ring */}
          <div className="hero-glow-ring w-[220px] h-[220px] sm:w-[270px] sm:h-[270px]" style={{ animationDelay: '1s' }}></div>

          {/* Center logo circle */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[160px] h-[160px] sm:w-[200px] sm:h-[200px] rounded-full bg-[#0a0a0a] border border-[#2a2a2a] flex items-center justify-center shadow-2xl shadow-[#4ade80]/10">
            <img src="/logo.jpg" alt="AutoByTaste Logo" className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover" />
          </div>

          {/* Scattered glow particles */}
          <div className="absolute top-[10%] right-[5%] w-2 h-2 rounded-full bg-[#4ade80] blur-[2px] animate-float" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute bottom-[15%] left-[8%] w-1.5 h-1.5 rounded-full bg-[#a3e635] blur-[2px] animate-float" style={{ animationDelay: '1.5s' }}></div>
          <div className="absolute top-[40%] right-[-5%] w-1 h-1 rounded-full bg-[#4ade80] blur-[1px] animate-float" style={{ animationDelay: '2.5s' }}></div>
        </div>
      </div>
    </div>
  );
};
