import React, { useState } from 'react';

type Platform = 'macOS' | 'Windows' | 'Linux';

const platformContent: Record<Platform, { lines: Array<{ type: 'cmd' | 'out' | 'success' | 'prompt'; text: string }> }> = {
  macOS: {
    lines: [
      { type: 'cmd', text: '# Cài đặt OpenClaw trong 2 phút' },
      { type: 'cmd', text: 'curl -fsSL https://openclaw.ai/install.sh | bash' },
      { type: 'success', text: '✓ Installing OpenClaw...' },
      { type: 'success', text: '✓ Node.js 22 detected' },
      { type: 'success', text: '✓ Gateway started on :18789' },
      { type: 'out', text: '' },
      { type: 'cmd', text: 'openclaw onboard' },
      { type: 'prompt', text: '? Chọn model provider: › Ollama (Local) ◀' },
      { type: 'prompt', text: '? Chọn kênh: › Telegram' },
      { type: 'success', text: '✓ AI Agent của bạn đã sẵn sàng! 🦞' },
    ],
  },
  Windows: {
    lines: [
      { type: 'cmd', text: '# Cài đặt OpenClaw trên Windows' },
      { type: 'cmd', text: 'winget install openclaw' },
      { type: 'success', text: '✓ Downloading OpenClaw...' },
      { type: 'success', text: '✓ Node.js 22 detected' },
      { type: 'success', text: '✓ Gateway started on :18789' },
      { type: 'out', text: '' },
      { type: 'cmd', text: 'openclaw onboard' },
      { type: 'prompt', text: '? Chọn model provider: › Ollama (Local) ◀' },
      { type: 'prompt', text: '? Chọn kênh: › Telegram' },
      { type: 'success', text: '✓ AI Agent của bạn đã sẵn sàng! 🦞' },
    ],
  },
  Linux: {
    lines: [
      { type: 'cmd', text: '# Cài đặt OpenClaw trên Linux' },
      { type: 'cmd', text: 'curl -fsSL https://openclaw.ai/install.sh | bash' },
      { type: 'success', text: '✓ Installing OpenClaw...' },
      { type: 'success', text: '✓ Node.js 22 detected' },
      { type: 'success', text: '✓ Gateway started on :18789' },
      { type: 'out', text: '' },
      { type: 'cmd', text: 'openclaw onboard' },
      { type: 'prompt', text: '? Chọn model provider: › Ollama (Local) ◀' },
      { type: 'prompt', text: '? Chọn kênh: › Telegram' },
      { type: 'success', text: '✓ AI Agent của bạn đã sẵn sàng! 🦞' },
    ],
  },
};

export const QuickStartBlock: React.FC = () => {
  const [platform, setPlatform] = useState<Platform>('macOS');
  const content = platformContent[platform];

  return (
    <section className="py-24 px-6 border-t border-[#1a1a1a]">
      <div className="max-w-[980px] mx-auto">
        {/* Header */}
        <div className="mb-12">
          <p className="text-xs font-medium text-[#ff5c5c] tracking-[0.2em] uppercase mb-4">
            › Bắt Đầu Ngay
          </p>
          <h2 className="text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Setup trong 2 phút.
          </h2>
          <p className="text-[#606060] mt-3 text-base">
            Không cần cloud. Không cần DevOps. Chỉ cần chạy 2 lệnh.
          </p>
        </div>

        {/* Terminal window */}
        <div className="bg-[#0a0a0a] border border-[#1e1e1e] rounded-2xl overflow-hidden shadow-2xl">
          {/* Title bar */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#0f0f0f] border-b border-[#1a1a1a]">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-[#ff5f57]"></div>
              <div className="w-3 h-3 rounded-full bg-[#febc2e]"></div>
              <div className="w-3 h-3 rounded-full bg-[#28c840]"></div>
              <span className="ml-3 text-xs text-[#404040] font-mono">openclaw-install — bash</span>
            </div>

            {/* Platform tabs */}
            <div className="flex gap-1">
              {(['macOS', 'Windows', 'Linux'] as Platform[]).map((p) => (
                <button
                  key={p}
                  onClick={() => setPlatform(p)}
                  className={`px-3 py-1 rounded text-[10px] font-medium transition-all duration-200 ${
                    platform === p
                      ? 'bg-[#ff5c5c]/20 text-[#ff5c5c] border border-[#ff5c5c]/30'
                      : 'text-[#404040] hover:text-[#808080]'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Terminal content */}
          <div className="p-6 font-mono text-sm space-y-1">
            {content.lines.map((line, i) => (
              <div key={i} className="flex items-start gap-2">
                {line.type === 'cmd' && (
                  <>
                    <span className="text-[#ff5c5c] select-none">$</span>
                    <span className="text-[#e0e0e0]">{line.text}</span>
                  </>
                )}
                {line.type === 'success' && (
                  <span className="text-[#22c55e] ml-4">{line.text}</span>
                )}
                {line.type === 'prompt' && (
                  <span className="text-[#60a5fa] ml-4">{line.text}</span>
                )}
                {line.type === 'out' && <span>&nbsp;</span>}
              </div>
            ))}

            {/* Cursor */}
            <div className="flex items-center gap-2">
              <span className="text-[#ff5c5c] select-none">$</span>
              <span className="inline-block w-2 h-4 bg-[#ff5c5c] animate-pulse"></span>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <a
            href="https://docs.openclaw.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-[#606060] hover:text-white transition-colors duration-300"
          >
            Đọc tài liệu đầy đủ →
          </a>
        </div>
      </div>
    </section>
  );
};
