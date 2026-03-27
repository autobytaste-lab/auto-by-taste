import React, { useEffect, useState } from 'react';

const TOOLS = [
  { name: 'web_search', color: '#ff5c5c' },
  { name: 'browser', color: '#ff5c5c' },
  { name: 'read_file', color: '#ffffff' },
  { name: 'exec', color: '#ffffff' },
  { name: 'send_message', color: '#22c55e' },
  { name: 'memory_search', color: '#22c55e' },
];

export const ToolUseGraph: React.FC = () => {
  const [activeTools, setActiveTools] = useState<number[]>([]);
  const [phase, setPhase] = useState(0);

  // Animate flow
  useEffect(() => {
    const phases = [0, 1, 2, 3, 4];
    let i = 0;
    const timer = setInterval(() => {
      i = (i + 1) % phases.length;
      setPhase(i);
      if (i === 2) {
        // pick random tools
        const shuffled = [0, 1, 2, 3, 4, 5].sort(() => Math.random() - 0.5).slice(0, 3);
        setActiveTools(shuffled);
      }
      if (i === 0) setActiveTools([]);
    }, 1200);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-24 px-6 border-t border-[#1a1a1a]">
      <div className="max-w-[980px] mx-auto">
        {/* Header */}
        <div className="mb-16">
          <p className="text-xs font-medium text-[#ff5c5c] tracking-[0.2em] uppercase mb-4">
            › Cách AI Agent Sử Dụng Tools
          </p>
          <h2 className="text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Tool Use Flow
          </h2>
          <p className="text-[#606060] mt-3 text-base">
            OpenClaw điều phối LLM gọi đúng tool — tự động, real-time.
          </p>
        </div>

        {/* Flow diagram */}
        <div className="bg-[#0f0f0f] border border-[#1a1a1a] rounded-2xl p-8 font-mono">
          {/* Row 1: User → Gateway → LLM */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className={`px-4 py-2 rounded border text-xs font-semibold transition-all duration-500 ${phase >= 1 ? 'border-white/40 text-white bg-white/5' : 'border-[#2a2a2a] text-[#505050]'}`}>
              USER MESSAGE
            </div>
            <div className={`flex items-center gap-1 transition-all duration-500 ${phase >= 1 ? 'opacity-100' : 'opacity-20'}`}>
              <div className="w-8 h-px bg-[#ff5c5c]"></div>
              <div className="w-0 h-0 border-t-4 border-b-4 border-l-4 border-transparent border-l-[#ff5c5c]"></div>
            </div>
            <div className={`px-4 py-2 rounded border text-xs font-semibold transition-all duration-500 ${phase >= 1 ? 'border-[#ff5c5c]/60 text-[#ff5c5c] bg-[#ff5c5c]/10' : 'border-[#2a2a2a] text-[#505050]'}`}>
              OpenClaw Gateway
            </div>
            <div className={`flex items-center gap-1 transition-all duration-500 ${phase >= 1 ? 'opacity-100' : 'opacity-20'}`}>
              <div className="w-8 h-px bg-[#ff5c5c]"></div>
              <div className="w-0 h-0 border-t-4 border-b-4 border-l-4 border-transparent border-l-[#ff5c5c]"></div>
            </div>
            <div className={`px-4 py-2 rounded border text-xs font-semibold transition-all duration-500 ${phase >= 1 ? 'border-white/40 text-white bg-white/5' : 'border-[#2a2a2a] text-[#505050]'}`}>
              AI Agent (LLM)
            </div>
          </div>

          {/* Arrow down from LLM */}
          <div className="flex justify-center mb-4">
            <div className={`flex flex-col items-center gap-1 transition-all duration-500 ${phase >= 2 ? 'opacity-100' : 'opacity-10'}`}>
              <div className="w-px h-6 bg-[#ff5c5c]"></div>
              <div className="text-[10px] text-[#ff5c5c] font-bold tracking-widest">tool_use</div>
              <div className="w-px h-4 bg-[#ff5c5c]"></div>
              <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-[#ff5c5c]"></div>
            </div>
          </div>

          {/* Tool grid */}
          <div className="grid grid-cols-3 md:grid-cols-6 gap-2 mb-6">
            {TOOLS.map((tool, i) => (
              <div
                key={i}
                className={`px-2 py-2 rounded border text-center transition-all duration-500 ${
                  activeTools.includes(i) && phase >= 2
                    ? `border-[${tool.color}]/50 bg-[${tool.color}]/10`
                    : 'border-[#1e1e1e] bg-[#0a0a0a]'
                }`}
                style={activeTools.includes(i) && phase >= 2 ? {
                  borderColor: tool.color + '60',
                  backgroundColor: tool.color + '15',
                  boxShadow: `0 0 12px ${tool.color}20`,
                } : {}}
              >
                <code className="text-[10px]" style={{ color: activeTools.includes(i) && phase >= 2 ? tool.color : '#404040' }}>
                  {tool.name}
                </code>
              </div>
            ))}
          </div>

          {/* Results row */}
          <div className={`flex justify-center gap-6 mb-6 transition-all duration-500 ${phase >= 3 ? 'opacity-100' : 'opacity-10'}`}>
            {['Results', 'Processed', 'Delivered'].map((label, i) => (
              <div key={i} className="text-[11px] text-[#22c55e] border border-[#22c55e]/20 px-3 py-1 rounded bg-[#22c55e]/5">
                ✓ {label}
              </div>
            ))}
          </div>

          {/* Arrow down */}
          <div className="flex justify-center mb-4">
            <div className={`flex flex-col items-center transition-all duration-500 ${phase >= 3 ? 'opacity-100' : 'opacity-10'}`}>
              <div className="w-px h-6 bg-[#22c55e]"></div>
              <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-[#22c55e]"></div>
            </div>
          </div>

          {/* AI synthesizes */}
          <div className={`text-center mb-4 transition-all duration-500 ${phase >= 3 ? 'opacity-100' : 'opacity-10'}`}>
            <div className="inline-block border border-white/20 px-6 py-2 rounded text-xs text-white bg-white/5">
              AI synthesizes &amp; responds
            </div>
          </div>

          {/* Final answer */}
          <div className={`flex justify-center transition-all duration-500 ${phase >= 4 ? 'opacity-100' : 'opacity-10'}`}>
            <div className="border border-[#22c55e]/40 rounded px-6 py-3 bg-[#22c55e]/10 text-sm font-semibold text-[#22c55e]">
              USER GETS ANSWER ✅
            </div>
          </div>

          {/* Latency indicator */}
          <div className="mt-6 flex justify-center gap-6 text-[11px] text-[#404040]">
            <span>avg latency: <span className="text-white">~1.2s</span></span>
            <span>tools/call: <span className="text-white">1–8</span></span>
            <span>context: <span className="text-white">persistent</span></span>
          </div>
        </div>
      </div>
    </section>
  );
};
