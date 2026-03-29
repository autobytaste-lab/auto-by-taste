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
          AI Agent 24/7 cho doanh nghiệp Việt Nam.
          <br />
          Thiết kế đội ngũ AI theo nhu cầu — bắt đầu ngay.
        </p>

        {/* CTAs  two buttons side by side */}
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-14">
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
        <div className="relative w-full max-w-[800px] mx-auto mb-14">
          <svg viewBox="0 0 1000 500" className="w-full h-auto">
            {/* Background */}
            <rect width="1000" height="500" fill="#0a0c10" />

            {/* Grid lines */}
            {Array.from({ length: 11 }, (_, i) => (
              <line key={`h${i}`} x1="0" y1={i * 50} x2="1000" y2={i * 50} stroke="#1a1f1a" strokeWidth="0.5" />
            ))}
            {Array.from({ length: 21 }, (_, i) => (
              <line key={`v${i}`} x1={i * 50} y1="0" x2={i * 50} y2="500" stroke="#1a1f1a" strokeWidth="0.5" />
            ))}

            {/* Continent silhouettes — simplified polygons */}
            {/* North America */}
            <path d="M80,80 L130,60 L180,55 L220,70 L240,90 L250,130 L230,160 L210,180 L190,200 L170,230 L150,220 L130,200 L120,170 L100,150 L80,130 L70,100Z" fill="#1a2a1a" opacity="0.6" />
            {/* Central America */}
            <path d="M170,230 L180,240 L175,260 L165,280 L155,275 L150,260 L155,240Z" fill="#1a2a1a" opacity="0.6" />
            {/* South America */}
            <path d="M200,280 L230,270 L260,290 L270,320 L280,360 L270,400 L250,430 L230,440 L210,420 L200,380 L190,340 L185,310 L190,290Z" fill="#1a2a1a" opacity="0.6" />
            {/* Europe */}
            <path d="M430,70 L460,60 L500,65 L520,80 L530,100 L520,120 L500,130 L480,125 L460,130 L440,120 L430,100Z" fill="#1a2a1a" opacity="0.6" />
            {/* UK */}
            <path d="M415,80 L425,75 L428,90 L420,95Z" fill="#1a2a1a" opacity="0.6" />
            {/* Africa */}
            <path d="M450,170 L490,160 L530,170 L550,200 L560,240 L550,290 L530,340 L510,370 L490,380 L470,370 L455,340 L440,300 L435,250 L440,210Z" fill="#1a2a1a" opacity="0.6" />
            {/* Russia / Northern Asia */}
            <path d="M530,50 L580,40 L650,35 L720,40 L780,50 L820,60 L840,80 L830,100 L800,110 L750,105 L700,100 L650,95 L600,90 L560,85 L540,75Z" fill="#1a2a1a" opacity="0.6" />
            {/* Middle East */}
            <path d="M550,130 L580,120 L610,130 L620,150 L610,170 L590,175 L565,170 L550,155Z" fill="#1a2a1a" opacity="0.6" />
            {/* India */}
            <path d="M640,160 L670,150 L690,170 L680,210 L660,240 L640,230 L630,200 L630,175Z" fill="#1a2a1a" opacity="0.6" />
            {/* China / East Asia */}
            <path d="M700,100 L750,90 L790,100 L810,120 L800,150 L780,170 L750,180 L720,175 L700,160 L690,140 L695,115Z" fill="#1a2a1a" opacity="0.6" />
            {/* Southeast Asia */}
            <path d="M720,190 L740,185 L760,195 L755,220 L740,240 L720,235 L715,215Z" fill="#1a2a1a" opacity="0.6" />
            {/* Japan */}
            <path d="M820,110 L830,100 L835,115 L830,130 L820,125Z" fill="#1a2a1a" opacity="0.6" />
            {/* Indonesia */}
            <path d="M720,260 L750,255 L780,260 L810,265 L800,275 L770,280 L740,278 L720,272Z" fill="#1a2a1a" opacity="0.6" />
            {/* Australia */}
            <path d="M790,330 L830,310 L870,320 L890,350 L880,380 L850,400 L820,395 L800,375 L790,350Z" fill="#1a2a1a" opacity="0.6" />

            {/* Green agent dots — active nodes */}
            {[
              [120,100],[150,130],[200,160],[170,190],[130,170],
              [230,300],[250,340],[240,380],[220,350],
              [450,90],[470,100],[500,95],[460,115],[490,120],
              [470,200],[490,230],[510,260],[480,300],[500,330],[520,280],
              [560,140],[580,155],[600,145],
              [650,180],[660,210],[670,195],
              [710,120],[730,110],[750,130],[770,145],[720,155],[740,165],
              [730,200],[745,215],[725,225],
              [820,115],[825,120],
              [740,265],[760,270],[780,268],
              [830,340],[850,360],[810,370],
              [580,70],[600,60],[630,65],
              [700,90],[780,85],[760,100],
            ].map(([cx, cy], i) => (
              <circle key={`g${i}`} cx={cx} cy={cy} r="2.5" fill="#4ade80" opacity={0.5 + (i % 3) * 0.2}>
                <animate attributeName="opacity" values={`${0.4 + (i % 3) * 0.2};${0.8 + (i % 2) * 0.2};${0.4 + (i % 3) * 0.2}`} dur={`${3 + (i % 4)}s`} repeatCount="indefinite" />
              </circle>
            ))}

            {/* Red dots — some inactive/alert nodes */}
            {[
              [160,110],[210,310],[475,250],[530,300],[640,170],[760,260],[840,355],
              [100,140],[260,320],[555,160],[790,105],
            ].map(([cx, cy], i) => (
              <circle key={`r${i}`} cx={cx} cy={cy} r="2" fill="#ef4444" opacity="0.5" />
            ))}

            {/* Vietnam tooltip with dashed line */}
            {/* Dashed line from Vietnam to tooltip */}
            <line x1="735" y1="210" x2="780" y2="140" stroke="#4a4a4a" strokeWidth="1" strokeDasharray="4 3" />
            <circle cx="735" cy="210" r="4" fill="#4ade80" opacity="0.8">
              <animate attributeName="r" values="3;5;3" dur="2s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite" />
            </circle>

            {/* Tooltip background */}
            <rect x="780" y="105" width="150" height="80" rx="6" fill="#111111" fillOpacity="0.95" stroke="#2a2a2a" strokeWidth="1" />

            {/* Tooltip content */}
            <text x="800" y="125" fill="white" fontSize="13" fontWeight="700" fontFamily="Inter, sans-serif">
              <tspan>🇻🇳</tspan>
              <tspan dx="6">Vietnam</tspan>
            </text>
            <text x="920" y="125" fill="#9ca3af" fontSize="10" fontFamily="Inter, sans-serif" textAnchor="end">Asia</text>

            <text x="800" y="145" fill="#9ca3af" fontSize="10" fontFamily="Inter, sans-serif">Agents:</text>
            <text x="920" y="145" fill="white" fontSize="10" fontWeight="600" fontFamily="Inter, sans-serif" textAnchor="end">2,847</text>

            <text x="800" y="161" fill="#9ca3af" fontSize="10" fontFamily="Inter, sans-serif">Share:</text>
            <text x="920" y="161" fill="white" fontSize="10" fontWeight="600" fontFamily="Inter, sans-serif" textAnchor="end">4.2%</text>

            <text x="800" y="177" fill="#9ca3af" fontSize="10" fontFamily="Inter, sans-serif">Rank:</text>
            <text x="920" y="177" fill="white" fontSize="10" fontWeight="600" fontFamily="Inter, sans-serif" textAnchor="end">#8</text>
          </svg>
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
