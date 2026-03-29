import React from 'react';

export const GlowCycle: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 px-6 overflow-hidden">
      <div className="max-w-[980px] mx-auto flex flex-col items-center text-center">
        {/* Glowing logo cycle */}
        <div className="relative w-[200px] h-[200px] sm:w-[280px] sm:h-[280px]">
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

          {/* Glow blur behind ring */}
          <div
            className="absolute inset-2 sm:inset-3 rounded-full pointer-events-none"
            style={{
              background: 'conic-gradient(from 180deg, rgba(212,252,121,0.3), rgba(74,222,128,0.4), rgba(34,197,94,0.3), transparent, rgba(74,222,128,0.3), rgba(212,252,121,0.3))',
              filter: 'blur(16px)',
              animation: 'glow-ring-spin 6s linear infinite',
            }}
          ></div>

          {/* Glow particles on the ring */}
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
          <div className="absolute inset-7 sm:inset-10 rounded-full bg-[#0a0a0a] flex items-center justify-center z-10">
            <span className="text-white font-extrabold text-base sm:text-xl tracking-tight leading-tight text-center">
              Auto<br />ByTaste
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
