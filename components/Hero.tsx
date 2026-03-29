import React from 'react';

export const Hero: React.FC = () => {
  return (
    <div className="relative pt-24 pb-16 lg:pt-40 lg:pb-24 overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#4ade80]/6 blur-[200px] rounded-full pointer-events-none"></div>

      <div className="max-w-[860px] mx-auto px-6 relative z-10 text-center">
        {/* Bold statement headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-[64px] font-bold text-white mb-6 leading-[1.1] tracking-[-0.03em]">
          AutoByTaste
          <br />
          <span className="text-gradient">AI Agent Platform</span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-lg mx-auto text-base lg:text-lg text-[#9ca3af] mb-10 leading-relaxed font-normal">
          AI Agent 24/7 cho doanh nghiệp Vit Nam.
          <br />
          Thit k i ng AI theo nhu cu  bt u ngay.
        </p>

        {/* CTAs  two buttons side by side */}
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-14">
          <a
            href="#usecases"
            className="w-full sm:w-auto px-8 py-4 text-white font-semibold rounded-full text-[15px] border border-[#2a2a2a] hover:border-[#4ade80]/40 bg-[#111]/80 backdrop-blur-sm transition-all duration-300 hover:bg-[#1a1a1a]"
          >
            Explore Network
          </a>
          <a
            href="https://zalo.me/0337776435"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-4 btn-gradient rounded-full text-[15px] shadow-lg shadow-[#4ade80]/20"
          >
            Download Node
          </a>
        </div>

        {/* World map visualization area */}
        <div className="relative w-full max-w-[700px] mx-auto h-[280px] sm:h-[340px] rounded-2xl overflow-hidden mb-14">
          {/* Dark map background with dot grid */}
          <div className="absolute inset-0 bg-[#0a0c10] rounded-2xl">
            {/* Grid dots pattern */}
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle, #1a2a1a 1px, transparent 1px)',
              backgroundSize: '20px 20px',
              opacity: 0.5
            }}></div>
            {/* Scattered green glow dots simulating map nodes */}
            {[
              { top: '30%', left: '15%' }, { top: '45%', left: '20%' },
              { top: '35%', left: '25%' }, { top: '40%', left: '45%' },
              { top: '30%', left: '48%' }, { top: '35%', left: '52%' },
              { top: '45%', left: '55%' }, { top: '50%', left: '50%' },
              { top: '25%', left: '70%' }, { top: '35%', left: '72%' },
              { top: '40%', left: '75%' }, { top: '45%', left: '78%' },
              { top: '55%', left: '80%' }, { top: '30%', left: '82%' },
              { top: '50%', left: '65%' }, { top: '60%', left: '35%' },
            ].map((pos, i) => (
              <div
                key={i}
                className="absolute w-1.5 h-1.5 rounded-full bg-[#4ade80] animate-float"
                style={{ top: pos.top, left: pos.left, animationDelay: `${i * 0.3}s`, opacity: 0.6 + Math.random() * 0.4 }}
              ></div>
            ))}
            {/* Highlight tooltip */}
            <div className="absolute top-[25%] right-[18%] bg-[#111]/90 border border-[#2a2a2a] rounded-lg px-3 py-2 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs">VN</span>
                <span className="text-[10px] text-[#9ca3af]">Asia</span>
              </div>
              <div className="text-[10px] text-[#9ca3af] space-y-0.5">
                <div className="flex justify-between gap-4"><span>Agents:</span><span className="text-white font-medium">2,847</span></div>
                <div className="flex justify-between gap-4"><span>Share:</span><span className="text-white font-medium">4.2%</span></div>
                <div className="flex justify-between gap-4"><span>Rank:</span><span className="text-white font-medium">#8</span></div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats cards row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-[500px] mx-auto">
          <div className="bg-[#111]/80 border border-[#1e2028] rounded-2xl p-6 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-[#9ca3af] font-medium">Active Agents</span>
              <div className="w-8 h-8 rounded-lg bg-[#4ade80]/10 flex items-center justify-center">
                <svg className="w-4 h-4 text-[#4ade80]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23,6 13.5,15.5 8.5,10.5 1,18" /><polyline points="17,6 23,6 23,12" /></svg>
              </div>
            </div>
            <p className="text-3xl font-bold text-white tracking-tight">1.061.181</p>
          </div>
          <div className="bg-[#111]/80 border border-[#1e2028] rounded-2xl p-6 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-[#9ca3af] font-medium">Core Nodes</span>
              <div className="w-8 h-8 rounded-lg bg-[#4ade80]/10 flex items-center justify-center">
                <svg className="w-4 h-4 text-[#4ade80]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23,6 13.5,15.5 8.5,10.5 1,18" /><polyline points="17,6 23,6 23,12" /></svg>
              </div>
            </div>
            <p className="text-3xl font-bold text-white tracking-tight">24.576</p>
          </div>
        </div>
      </div>
    </div>
  );
};
