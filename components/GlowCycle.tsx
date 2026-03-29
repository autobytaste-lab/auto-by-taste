import React, { useState, useCallback } from 'react';

const services = [
  { label: 'Sales Agent', angle: 0 },
  { label: 'CSKH Agent', angle: 60 },
  { label: 'Marketing', angle: 120 },
  { label: 'Data Agent', angle: 180 },
  { label: 'Tích hợp API', angle: 240 },
  { label: 'Tự động hóa', angle: 300 },
];

export const GlowCycle: React.FC = () => {
  const outerR = 46;
  const [ripple, setRipple] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const handleClick = useCallback(() => {
    setRipple(true);
    // Show popup after ripple expands
    setTimeout(() => setShowPopup(true), 600);
    // Reset ripple
    setTimeout(() => setRipple(false), 1200);
  }, []);

  const closePopup = useCallback(() => {
    setShowPopup(false);
  }, []);

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

          {/* Energy ripple effect */}
          {ripple && (
            <>
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none z-30"
                style={{
                  width: '80px',
                  height: '80px',
                  border: '2px solid #4ade80',
                  animation: 'energy-ripple 1.2s ease-out forwards',
                }}
              ></div>
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none z-30"
                style={{
                  width: '80px',
                  height: '80px',
                  border: '2px solid #d4fc79',
                  animation: 'energy-ripple 1.2s ease-out 0.2s forwards',
                }}
              ></div>
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none z-30"
                style={{
                  width: '80px',
                  height: '80px',
                  border: '1px solid #4ade80',
                  animation: 'energy-ripple 1.2s ease-out 0.4s forwards',
                }}
              ></div>
            </>
          )}

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
                <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-xl bg-[#111]/90 border border-[#2a2a2a] backdrop-blur-sm flex items-center justify-center hover:border-[#4ade80]/40 transition-all duration-300 ${ripple ? 'scale-110 border-[#4ade80]/50' : ''}`}
                  style={ripple ? { transitionDelay: `${i * 80}ms` } : undefined}
                >
                  <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-[#4ade80]/10 flex items-center justify-center">
                    <div className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#4ade80] transition-opacity duration-300 ${ripple ? 'opacity-100' : 'opacity-80'}`}></div>
                  </div>
                </div>
                <span className="mt-1.5 text-[10px] sm:text-xs text-[#9ca3af] font-medium whitespace-nowrap">
                  {s.label}
                </span>
              </div>
            );
          })}

          {/* Center glow cycle — clickable */}
          <button
            onClick={handleClick}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140px] h-[140px] sm:w-[200px] sm:h-[200px] cursor-pointer focus:outline-none active:scale-95 transition-transform duration-150"
            aria-label="Kích hoạt năng lượng"
          >
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
          </button>
        </div>
      </div>

      {/* Success popup overlay */}
      {showPopup && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-6"
          onClick={closePopup}
        >
          <div
            className="relative bg-[#111] border border-[#2a2a2a] rounded-3xl p-8 sm:p-10 max-w-sm w-full text-center shadow-2xl shadow-[#4ade80]/10"
            onClick={(e) => e.stopPropagation()}
            style={{ animation: 'fadeInUp 0.4s ease-out' }}
          >
            {/* Glow accent */}
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-24 rounded-full bg-[#4ade80]/20 blur-[40px] pointer-events-none"></div>

            {/* Success icon */}
            <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-[#4ade80]/10 border border-[#4ade80]/30 flex items-center justify-center">
              <svg className="w-8 h-8 text-[#4ade80]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
              Hợp tác dự án thành công!
            </h3>
            <p className="text-sm text-[#9ca3af] leading-relaxed mb-6">
              Cảm ơn bạn đã quan tâm đến AutoByTaste. Đội ngũ AI Agent sẵn sàng phục vụ doanh nghiệp của bạn 24/7.
            </p>

            <div className="flex flex-col gap-3">
              <a
                href="https://zalo.me/0337776435"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gradient px-6 py-3 rounded-full text-sm font-semibold shadow-lg shadow-[#4ade80]/20"
              >
                Liên hệ tư vấn ngay
              </a>
              <button
                onClick={closePopup}
                className="text-sm text-[#707070] hover:text-white transition-colors py-2"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Inline keyframes for energy ripple */}
      <style>{`
        @keyframes energy-ripple {
          0% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.8;
          }
          100% {
            transform: translate(-50%, -50%) scale(5);
            opacity: 0;
          }
        }
      `}</style>
    </section>
  );
};
