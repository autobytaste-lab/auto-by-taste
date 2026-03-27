import React from 'react';

const integrations = [
  // Channels
  { label: 'Telegram', emoji: '✈️' },
  { label: 'Zalo', emoji: '🇻🇳' },
  { label: 'WhatsApp', emoji: '📱' },
  { label: 'Discord', emoji: '🎮' },
  { label: 'Signal', emoji: '🔐' },
  // Models
  { label: 'Ollama', emoji: '🦙' },
  { label: 'LM Studio', emoji: '🖥️' },
  { label: 'EXO', emoji: '⚡' },
  { label: 'Claude', emoji: '🧠' },
  { label: 'GPT', emoji: '🤖' },
  // Productivity
  { label: 'Google Calendar', emoji: '📅' },
  { label: 'Gmail', emoji: '📧' },
  { label: 'GitHub', emoji: '🐙' },
  { label: 'Notion', emoji: '📝' },
  { label: 'Slack', emoji: '💬' },
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
              <span className="text-sm">{item.emoji}</span>
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
