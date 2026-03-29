import React from 'react';

const services = [
  { label: 'Sales Agent', angle: 0 },
  { label: 'CSKH Agent', angle: 60 },
  { label: 'Marketing', angle: 120 },
  { label: 'Data Agent', angle: 180 },
  { label: 'Tích hợp API', angle: 240 },
  { label: 'Tự động hóa', angle: 300 },
];

export const GlowCycle: React.FC = () => {
  const outerR = 46; // % radius for service nodes from center

  return (
    <section className="py-16 sm:py-24 px-6 overflow-hidden">
      <div className="max-w-[980px] mx-auto flex flex-col items-center text-center">
        {/* Container for cycle + orbiting services */}
        <div className="relative w-[320px] h-[320px] sm:w-[480px] sm:h-[480px]">

          {/* Connecting lines from center to each service (SVG) */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 480 480">
            {services.map((s, i) => {
              const rad = (s.angle * Math.PI) / 180;
              const cx = 240 + 220 * Math.sin(rad) * (outerR / 46);
              const cy = 240 - 220 * Math.cos(rad) * (outerR / 46);
              return (
                <line
                  key={i}
                  x1="240" y1="240"
                  x2={cx} y2={cy}
                  stroke="#4ade80"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                  opacity="0.15"
                />
              );
            })}
          </svg>

          {/* Service nodes orbiting around */}
          {services.map((s, i) => {
            const rad = (s.angle * Math.PI) / 180;
            const top = 50 - outerR * Math.cos(rad);
            const left = 50 + outerR * Math.sin(rad);
            return (
              <div
                key={i}
                className="absolute z-20 flex flex-col items-center"
                style={{
                  top: `${top}%`,
                  left: `${left}%`,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl bg-[#111]/90 border border-[#2a2a2a] backdrop-blur-sm flex items-center justify-center hover:border-[#4ade80]/40 transition-all duration-300 group">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-[#4ade80]/10 flex items-center justify-center">
                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#4ade80] opacity-80"></div>
                  </div>
                </div>
                <span className="mt-1.5 text-[10px] sm:text-xs text-[#9ca3af] font-medium whitespace-nowrap">
                  {s.label}
                </span>
              </div>
            );
          })}

          {/* Center glow cycle */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140px] h-[140px] sm:w-[200px] sm:h-[200px]">
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
              <div className="absolute inset-[3px] rounded-full bg-[#0a0a0a]"></div>
            </div>

            {/* Glow blur */}
            <div
              className="absolute inset-2 sm:inset-3 rounded-full pointer-events-none"
              style={{
                background: 'conic-gradient(from 180deg, rgba(212,252,121,0.3), rgba(74,222,128,0.4), rgba(34,197,94,0.3), transparent, rgba(74,222,128,0.3), rgba(212,252,121,0.3))',
                filter: 'blur(16px)',
                animation: 'glow-ring-spin 6s linear infinite',
              }}
            ></div>

            {/* Glow particles */}
            {[0, 72, 144, 216, 288].map((deg, i) => (
              <div
                key={i}
                className="absolute w-1.5 h-1.5 rounded-full bg-[#4ade80] blur-[2px]"
                style={{
                  top: `${50 - 44 * Math.cos((deg * Math.PI) / 180)}%`,
                  left: `${50 + 44 * Math.sin((deg * Math.PI) / 180)}%`,
                  transform: 'translate(-50%, -50%)',
                  animation: `glow-pulse ${2 + i * 0.5}s ease-in-out infinite`,
                }}
              ></div>
            ))}

            {/* Center text */}
            <div className="absolute inset-6 sm:inset-8 rounded-full bg-[#0a0a0a] flex items-center justify-center z-10">
              <span className="text-white font-extrabold text-xs sm:text-base tracking-tight leading-tight text-center">
                Auto<br />ByTaste
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
