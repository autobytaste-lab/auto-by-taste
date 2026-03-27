import React from 'react';

const LOBE_CDN = 'https://unpkg.com/@lobehub/icons-static-png@latest/dark';

const LobeIcon: React.FC<{ name: string; className?: string }> = ({ name, className = 'w-4 h-4 object-contain' }) => (
  <img
    src={`${LOBE_CDN}/${name}.png`}
    alt={name}
    className={className}
    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
  />
);

const integrations = [
  // Channels
  { label: 'Telegram', icon: <LobeIcon name="telegram" /> },
  { label: 'Zalo', icon: <span className="text-sm">🇻🇳</span> },
  { label: 'WhatsApp', icon: <LobeIcon name="whatsapp" /> },
  { label: 'Discord', icon: <LobeIcon name="discord" /> },
  { label: 'Signal', icon: <span className="text-sm">🔐</span> },
  // Models
  { label: 'Ollama', icon: <LobeIcon name="ollama" /> },
  { label: 'LM Studio', icon: <span className="text-sm">🖥️</span> },
  { label: 'EXO', icon: <span className="text-sm">⚡</span> },
  { label: 'Claude', icon: <LobeIcon name="claude" /> },
  { label: 'OpenAI', icon: <LobeIcon name="openai" /> },
  // Productivity
  { label: 'Google Calendar', icon: <LobeIcon name="google" /> },
  { label: 'Gmail', icon: <LobeIcon name="gmail" /> },
  { label: 'GitHub', icon: <LobeIcon name="github" /> },
  { label: 'Notion', icon: <LobeIcon name="notion" /> },
  { label: 'Slack', icon: <LobeIcon name="slack" /> },
];

export const IntegrationStrip: React.FC = () => {
  return (
    <section className="py-20 px-6 border-t border-[#1a1a1a]">
      <div className="max-w-[980px] mx-auto">
        {/* Header */}
        <div className="mb-12">
          <p className="text-xs font-medium text-[#ff5c5c] tracking-[0.2em] uppercase mb-4">
            › Tích Hợp Với Mọi Thứ
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold text-white tracking-tight">
            Works with everything.
          </h2>
        </div>

        {/* Badge strip */}
        <div className="flex flex-wrap gap-2 mb-8">
          {integrations.map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0f0f0f] border border-[#1e1e1e] rounded-full hover:border-[#ff5c5c]/30 hover:bg-[#ff5c5c]/5 transition-all duration-300 cursor-default"
            >
              {item.icon}
              <span className="text-xs text-[#909090] font-medium">{item.label}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <a
          href="https://docs.openclaw.ai"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-[#ff5c5c] hover:text-[#ff7070] transition-colors duration-300"
        >
          Xem tất cả 50+ tích hợp →
        </a>
      </div>
    </section>
  );
};
