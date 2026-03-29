import React from 'react';

const usecases = [
  {
    icon: (
      <svg className="w-7 h-7 text-[#9ca3af]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8" /><path d="M12 17v4" />
        <circle cx="7" cy="10" r="1.5" fill="currentColor" /><circle cx="12" cy="10" r="1.5" fill="currentColor" />
        <circle cx="17" cy="10" r="1.5" fill="currentColor" /><circle cx="7" cy="6" r="1.5" fill="currentColor" />
        <circle cx="12" cy="6" r="1.5" fill="currentColor" /><circle cx="17" cy="6" r="1.5" fill="currentColor" />
      </svg>
    ),
    title: 'EVM Layer-2 Blockchain',
    desc: 'Experience the speed, efficiency and low transaction fees of our opRollup Layer-2',
    visual: (
      <div className="flex items-center justify-center mt-6 space-x-3">
        {[0.4, 0.6, 0.8, 1].map((opacity, i) => (
          <div key={i} className="relative">
            <div className="w-12 h-14 rounded-lg border border-[#4ade80]/30 bg-[#0a1a0a]" style={{ opacity }}>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-[#4ade80]" style={{ opacity }}></div>
              </div>
            </div>
          </div>
        ))}
        <div className="absolute left-[15%] right-[15%] top-1/2 h-px bg-gradient-to-r from-transparent via-[#4ade80]/30 to-transparent"></div>
      </div>
    ),
  },
  {
    icon: (
      <svg className="w-7 h-7 text-[#9ca3af]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="5" r="3" /><circle cx="5" cy="19" r="3" /><circle cx="19" cy="19" r="3" />
        <path d="M12 8v3M7.5 17L10 13M16.5 17L14 13" />
      </svg>
    ),
    title: 'DePIN Network',
    desc: 'A decentralized node network offering limitless bandwidth, scalability, and computing power across platforms',
    visual: null,
  },
  {
    icon: (
      <svg className="w-7 h-7 text-[#9ca3af]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="4" y="4" width="16" height="16" rx="2" /><path d="M9 9h6M9 12h6M9 15h4" />
        <circle cx="18" cy="6" r="4" fill="none" stroke="currentColor" />
      </svg>
    ),
    title: 'Data Mining',
    desc: 'From Crowd Data Collection to Actionable Intelligence',
    visual: (
      <div className="flex items-center justify-center mt-6">
        <div className="relative w-24 h-28 rounded-xl bg-gradient-to-br from-[#d4fc79]/80 to-[#4ade80]/80 flex items-center justify-center shadow-lg shadow-[#4ade80]/10">
          <span className="text-xs font-mono text-black/70 font-bold">01011001</span>
        </div>
      </div>
    ),
  },
  {
    icon: (
      <svg className="w-7 h-7 text-[#9ca3af]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
        <circle cx="12" cy="12" r="4" />
      </svg>
    ),
    title: 'Data Validation',
    desc: 'High-Quality Data Through Collective Community Effort',
    visual: null,
  },
  {
    icon: (
      <svg className="w-7 h-7 text-[#9ca3af]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
      </svg>
    ),
    title: 'Reinforcement Learning',
    desc: 'Reinforcement Learning with Human Feedback',
    visual: (
      <div className="flex items-center justify-center mt-6">
        <div className="flex items-end space-x-1">
          {[20, 35, 28, 42, 50, 38, 55].map((h, i) => (
            <div key={i} className="w-4 rounded-sm bg-gradient-to-t from-[#1a2a1a] to-[#4ade80]/40" style={{ height: `${h}px` }}></div>
          ))}
        </div>
      </div>
    ),
  },
  {
    icon: (
      <svg className="w-7 h-7 text-[#9ca3af]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="4" y="4" width="16" height="16" rx="2" /><path d="M9 9h6v6H9z" />
        <circle cx="12" cy="12" r="2" /><path d="M4 12h2M18 12h2M12 4v2M12 18v2" />
      </svg>
    ),
    title: 'GenAI Agents',
    desc: 'Driving the Era of Personalized and Limitless Super Intelligence',
    visual: (
      <div className="flex items-center justify-center mt-6">
        <div className="relative w-20 h-20 rounded-full bg-[#111] border border-[#2a2a2a]">
          <div className="absolute inset-2 rounded-full bg-[#0a0a0a] border border-[#1a1a1a] flex items-center justify-center">
            <div className="w-6 h-6 rounded-full bg-[#1a2a1a] border border-[#4ade80]/30"></div>
          </div>
          {[0, 60, 120, 180, 240, 300].map((deg, i) => (
            <div key={i} className="absolute w-2.5 h-2.5 rounded-full bg-[#2a2a2a]" style={{
              top: `${50 - 45 * Math.cos(deg * Math.PI / 180)}%`,
              left: `${50 + 45 * Math.sin(deg * Math.PI / 180)}%`,
              transform: 'translate(-50%, -50%)'
            }}></div>
          ))}
        </div>
      </div>
    ),
  },
];

export const UseCaseGrid: React.FC = () => {
  return (
    <section id="usecases" className="py-24 px-6">
      <div className="max-w-[980px] mx-auto">
        {/* Section header */}
        <div className="mb-16 text-center">
          <p className="text-xs font-medium text-[#4ade80] tracking-[0.2em] uppercase mb-4">
            Our Solutions
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold text-white tracking-tight">
            Powering the Future
          </h2>
        </div>

        {/* 2x3 Grid of cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {usecases.map((uc, i) => (
            <div
              key={i}
              className="relative bg-[#111]/80 border border-[#1e2028] rounded-2xl p-8 group hover:border-[#4ade80]/20 transition-all duration-400 overflow-hidden text-center"
            >
              {/* Icon container */}
              <div className="w-14 h-14 rounded-xl bg-[#1a1c22] border border-[#2a2a2a] flex items-center justify-center mx-auto mb-5">
                {uc.icon}
              </div>

              <h3 className="text-lg font-bold text-white mb-3 group-hover:text-[#4ade80] transition-colors duration-300">
                {uc.title}
              </h3>
              <p className="text-sm text-[#707070] leading-relaxed">
                {uc.desc}
              </p>

              {/* Optional visual */}
              {uc.visual && (
                <div className="relative mt-4">
                  {uc.visual}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
