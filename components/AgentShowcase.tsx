import React, { useRef } from 'react';
import { useInView } from './hooks/useInView';
import { useReducedMotion } from './hooks/useReducedMotion';

const tags = [
  'Sales Agent',
  'CSKH Agent',
  'Marketing Agent',
  'Data Agent',
];

/* SVG viewBox = 480 × 320, center = (240, 160)
   Percentages derived: x / 480 * 100, y / 320 * 100 */
const nodes = [
  {
    svgX: 120, svgY: 60,
    pctLeft: '25%', pctTop: '18.75%',
    icon: (
      <svg className="w-4 h-4 sm:w-4 sm:h-4 text-[#4ade80]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/></svg>
    ),
    iconBg: 'bg-[#0a1a0a] border border-[#4ade80]/30',
    delay: 0.7,
    breatheDelay: 0.5,
  },
  {
    svgX: 360, svgY: 60,
    pctLeft: '75%', pctTop: '18.75%',
    icon: (
      <svg className="w-4 h-4 sm:w-4 sm:h-4 text-[#4ade80]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
    ),
    iconBg: 'bg-[#0a1a0a] border border-[#4ade80]/30',
    delay: 0.85,
    breatheDelay: 1,
  },
  {
    svgX: 120, svgY: 260,
    pctLeft: '25%', pctTop: '81.25%',
    icon: (
      <svg className="w-4 h-4 sm:w-4 sm:h-4 text-[#4ade80]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
    ),
    iconBg: 'bg-[#0a1a0a] border border-[#4ade80]/30',
    delay: 1,
    breatheDelay: 1.5,
  },
  {
    svgX: 360, svgY: 260,
    pctLeft: '75%', pctTop: '81.25%',
    icon: (
      <div className="w-3 h-3 rounded-full bg-[#4ade80]"></div>
    ),
    iconBg: 'bg-[#4ade80]/20',
    delay: 1.15,
    breatheDelay: 2,
  },
  {
    svgX: 240, svgY: 20,
    pctLeft: '50%', pctTop: '6.25%',
    icon: (
      <div className="w-2 h-2 rounded-full bg-white"></div>
    ),
    iconBg: 'bg-gradient-to-br from-[#d4fc79] to-[#4ade80]',
    iconSize: 'w-6 h-6',
    delay: 0.9,
    breatheDelay: 0.8,
  },
  {
    svgX: 240, svgY: 300,
    pctLeft: '50%', pctTop: '93.75%',
    icon: (
      <div className="flex gap-1">
        <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#4ade80]/60"></div>
        <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#4ade80]/30"></div>
      </div>
    ),
    iconBg: '',
    delay: 1.05,
    breatheDelay: 1.3,
  },
];

export const AgentShowcase: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, 0.2);
  const reduced = useReducedMotion();

  const animate = inView && !reduced;

  return (
    <section ref={sectionRef} className="py-24 px-6">
      <style>{`
        @keyframes dash-flow {
          to { stroke-dashoffset: -20; }
        }
        @keyframes packet-travel {
          0% { offset-distance: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { offset-distance: 100%; opacity: 0; }
        }
        @keyframes node-breathe {
          0%, 100% { transform: translate(-50%,-50%) scale(1); box-shadow: 0 0 0 0 rgba(74,222,128,0.2); }
          50% { transform: translate(-50%,-50%) scale(1.06); box-shadow: 0 0 16px 4px rgba(74,222,128,0.15); }
        }
        @keyframes node-pop {
          from { opacity: 0; transform: translate(-50%,-50%) scale(0.85); }
          to { opacity: 1; transform: translate(-50%,-50%) scale(1); }
        }
        @keyframes hub-float {
          0%, 100% { transform: translate(-50%,-50%) translateY(0); }
          50% { transform: translate(-50%,-50%) translateY(-8px); }
        }
        @keyframes hub-glow {
          0%, 100% { box-shadow: 0 0 20px 4px rgba(74,222,128,0.15); }
          50% { box-shadow: 0 0 40px 8px rgba(74,222,128,0.3); }
        }
        @keyframes text-reveal {
          from { opacity: 0; transform: translateY(24px); filter: blur(4px); }
          to { opacity: 1; transform: translateY(0); filter: blur(0); }
        }
        @keyframes tag-pop {
          from { opacity: 0; transform: scale(0.85); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes line-draw {
          from { stroke-dashoffset: 300; }
          to { stroke-dashoffset: 0; }
        }
      `}</style>

      <div className="max-w-[980px] mx-auto">
        <div className="bg-[#111]/60 border border-[#1e2028] rounded-3xl p-8 sm:p-12 overflow-hidden">
          {/* Green subtitle */}
          <p
            className="text-sm font-semibold text-[#d4fc79] mb-4 tracking-wide"
            style={animate ? {
              animation: 'text-reveal 0.7s cubic-bezier(0.16,1,0.3,1) forwards',
              opacity: 0,
            } : {}}
          >
            Tối Đa Hóa Tiềm Năng Doanh Nghiệp
          </p>

          {/* Bold heading */}
          <h2
            className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-white leading-[1.15] tracking-tight mb-6"
            style={animate ? {
              animation: 'text-reveal 0.7s cubic-bezier(0.16,1,0.3,1) 0.15s forwards',
              opacity: 0,
            } : {}}
          >
            Triển Khai AI Agent<br />
            Và Nhận Hiệu Suất x10
          </h2>

          {/* Description */}
          <p
            className="text-base text-[#9ca3af] leading-relaxed max-w-xl mb-8"
            style={animate ? {
              animation: 'text-reveal 0.7s cubic-bezier(0.16,1,0.3,1) 0.3s forwards',
              opacity: 0,
            } : {}}
          >
            Tích hợp đội ngũ AI Agent vào vận hành doanh nghiệp. Giao việc bán hàng, chăm sóc khách hàng, marketing và xử lý dữ liệu — AI hoạt động 24/7, chi phí chỉ 1/5 nhân sự thực.
          </p>

          {/* Tag pills — 2x2 grid */}
          <div className="grid grid-cols-2 gap-3 max-w-md mb-12">
            {tags.map((tag, i) => (
              <div
                key={tag}
                className="px-5 py-3 rounded-full bg-[#1a1c22]/80 border border-[#2a2a2a] text-sm font-medium text-[#d4d4d8] text-center hover:border-[#4ade80]/30 hover:text-white transition-all duration-300"
                style={animate ? {
                  animation: `tag-pop 0.5s cubic-bezier(0.16,1,0.3,1) ${0.45 + i * 0.08}s forwards`,
                  opacity: 0,
                } : {}}
              >
                {tag}
              </div>
            ))}
          </div>

          {/* Visual — connected agent nodes
              aspect-ratio matches SVG viewBox 480:320 = 3:2
              so HTML node % positions stay aligned with SVG lines */}
          <div className="relative w-full max-w-[480px] mx-auto" style={{ aspectRatio: '480 / 320' }}>
            {/* Center hub — positioned at 50%, 50% */}
            <div
              className="absolute w-16 h-16 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-[#d4fc79]/60 to-[#4ade80]/60 flex items-center justify-center z-10"
              style={{
                left: '50%',
                top: '50%',
                ...(animate ? {
                  animation: 'hub-float 4s ease-in-out infinite, hub-glow 3s ease-in-out infinite',
                  transform: 'translate(-50%,-50%)',
                } : {
                  transform: 'translate(-50%,-50%)',
                }),
              }}
            >
              <img src="https://umxxfeuo5ed9xpid.public.blob.vercel-storage.com/media/img_6726_1774809379159.jpeg" alt="AutoByTaste" className="w-8 h-8 sm:w-12 sm:h-12 rounded-full object-cover" />
            </div>

            {/* Connecting lines + animated data packets */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 480 320">
              <defs>
                <filter id="packetGlow">
                  <feGaussianBlur stdDeviation="2" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {nodes.map((node, i) => {
                const d = `M240,160 L${node.svgX},${node.svgY}`;
                return (
                  <g key={i}>
                    {/* Base line with draw animation */}
                    <path
                      d={d}
                      stroke="#4ade80"
                      strokeWidth="1"
                      opacity="0.15"
                      fill="none"
                      strokeDasharray="300"
                      style={animate ? {
                        animation: `line-draw 1s ease-out ${0.6 + i * 0.1}s forwards`,
                        strokeDashoffset: 300,
                      } : {
                        strokeDashoffset: 0,
                      }}
                    />

                    {/* Animated dashed overlay */}
                    <path
                      d={d}
                      stroke="#4ade80"
                      strokeWidth="1"
                      opacity={animate ? '0.3' : '0.2'}
                      fill="none"
                      strokeDasharray="4 4"
                      style={animate ? {
                        animation: 'dash-flow 1.5s linear infinite',
                      } : {}}
                    />

                    {/* Traveling data packet */}
                    {animate && (
                      <circle
                        r="3"
                        fill="#d4fc79"
                        filter="url(#packetGlow)"
                        style={{
                          offsetPath: `path("${d}")`,
                          animation: `packet-travel ${2 + i * 0.3}s ease-in-out ${1 + i * 0.4}s infinite`,
                          opacity: 0,
                        }}
                      />
                    )}
                  </g>
                );
              })}
            </svg>

            {/* Agent nodes — positioned with % matching SVG coordinates */}
            {nodes.map((node, i) => (
              <div
                key={i}
                className={`absolute ${node.iconSize ? 'w-10 h-10 sm:w-14 sm:h-14' : 'w-12 h-12 sm:w-16 sm:h-16'} rounded-xl bg-[#1a1c22] border border-[#2a2a2a] flex items-center justify-center`}
                style={{
                  left: node.pctLeft,
                  top: node.pctTop,
                  ...(animate ? {
                    animation: `node-breathe 3s ease-in-out ${node.breatheDelay}s infinite, node-pop 0.6s cubic-bezier(0.16,1,0.3,1) ${node.delay}s forwards`,
                    opacity: 0,
                  } : {
                    transform: 'translate(-50%,-50%)',
                  }),
                }}
              >
                <div className={`${node.iconSize || 'w-7 h-7 sm:w-8 sm:h-8'} rounded-full ${node.iconBg} flex items-center justify-center`}>
                  {node.icon}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
