
import React from 'react';
import { useI18n } from '../i18n/I18nContext';

const messagingApps = [
  { name: 'Telegram', icon: 'https://img.icons8.com/color/48/telegram-app.png', color: '#0088cc' },
  { name: 'WhatsApp', icon: 'https://img.icons8.com/color/48/whatsapp.png', color: '#25D366' },
  { name: 'Zalo', icon: 'https://img.icons8.com/color/48/zalo.png', color: '#0068FF' },
  { name: 'Signal', icon: 'https://img.icons8.com/color/48/signal-app.png', color: '#3A76F0' },
];

const aiTools = [
  { name: 'Browser', icon: '🌐' },
  { name: 'Excel', icon: '📊' },
  { name: 'Word', icon: '📝' },
  { name: 'Notion', icon: '📓' },
  { name: 'PowerPoint', icon: '📽️' },
  { name: 'Gmail', icon: '📧' },
  { name: 'Phone Call', icon: '📞' },
  { name: 'Customer Service', icon: '🎧' },
  { name: 'Accounting', icon: '💰' },
];

const hardware = [
  { name: 'Mac Studio', icon: 'https://umxxfeuo5ed9xpid.public.blob.vercel-storage.com/media/static_front_fmvxob6uyxiu_large_2x_1772707656945.jpg' },
  { name: 'Mac Mini', icon: 'https://umxxfeuo5ed9xpid.public.blob.vercel-storage.com/media/design_thermal_static_qwpwput2piyy_large_1772707661360.jpg' },
];

export const AIArchitectureGraph: React.FC = () => {
  const { translations: t } = useI18n();

  return (
    <div className="apple-section bg-[#FAFAFA]">
      <div className="max-w-[980px] mx-auto px-6">
        <div className="text-center mb-20">
          <span className="inline-block px-4 py-2 bg-[#C0C0C0]/10 border border-[#C0C0C0]/15 rounded-full text-xs font-medium text-[#C0C0C0] mb-4">
            {t.aiArchitecture.badge}
          </span>
          <h2 className="text-4xl md:text-[56px] font-bold mb-6 tracking-[-0.03em] leading-tight">
            <span className="text-gradient">{t.aiArchitecture.heading}</span>
          </h2>
          <p className="text-[#6B7280] max-w-2xl mx-auto text-lg">
            {t.aiArchitecture.description}
          </p>
        </div>

        {/* Architecture Diagram */}
        <div className="relative max-w-4xl mx-auto">

          {/* Layer 1: Messaging Apps */}
          <div className="relative mb-6">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-24 text-right pr-4 hidden md:block">
              <span className="text-xs font-semibold text-[#D4AF37] uppercase tracking-wider">{t.aiArchitecture.layer1Label}</span>
              <p className="text-[10px] text-[#9CA3AF]">{t.aiArchitecture.layer1Description}</p>
            </div>
            <div className="md:ml-28 bg-white rounded-2xl p-6 border border-[#D4AF37]/10">
              <div className="flex flex-wrap justify-center gap-4">
                {messagingApps.map((app) => (
                  <div
                    key={app.name}
                    className="flex flex-col items-center p-4 bg-[#F5F5F5] rounded-xl border border-black/5 hover:border-[#D4AF37]/20 transition-all duration-300 hover:scale-105 cursor-pointer group"
                  >
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300">
                      <img src={app.icon} alt={app.name} className="w-10 h-10" />
                    </div>
                    <span className="text-xs font-medium text-[#78716C]">{app.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Connection Line 1-2 */}
          <div className="flex justify-center mb-6">
            <div className="flex flex-col items-center">
              <div className="w-px h-6 bg-gradient-to-b from-[#D4AF37]/50 to-[#C0C0C0]/50"></div>
              <div className="w-2 h-2 rounded-full bg-[#C0C0C0]/60"></div>
              <div className="w-px h-6 bg-gradient-to-b from-[#C0C0C0]/50 to-[#C0C0C0]/30"></div>
            </div>
          </div>

          {/* Layer 2: AI Agent Brain */}
          <div className="relative mb-6">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-24 text-right pr-4 hidden md:block">
              <span className="text-xs font-semibold text-[#C0C0C0] uppercase tracking-wider">{t.aiArchitecture.layer2Label}</span>
              <p className="text-[10px] text-[#9CA3AF]">{t.aiArchitecture.layer2Description}</p>
            </div>
            <div className="md:ml-28 relative">
              <div className="absolute inset-0 bg-[#C0C0C0]/10 blur-[80px] rounded-full"></div>
              <div className="relative bg-white rounded-2xl p-10 border border-[#C0C0C0]/10">
                <div className="flex flex-col items-center">
                  <div className="relative mb-4">
                    <div className="absolute inset-0 bg-[#C0C0C0]/15 blur-2xl rounded-full"></div>
                    <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-[#C0C0C0] to-[#D4AF37] flex items-center justify-center">
                      <span className="text-3xl">🧠</span>
                    </div>
                  </div>
                  <h3 className="text-2xl font-semibold text-[#2C2C2C] mb-2">{t.aiArchitecture.agentBrainTitle}</h3>
                  <p className="text-sm text-[#6B7280] text-center max-w-md">
                    {t.aiArchitecture.agentBrainDescription}
                  </p>
                  <div className="flex gap-2 mt-4">
                    <span className="px-3 py-1 bg-[#C0C0C0]/10 rounded-full text-xs text-[#C0C0C0]">NLP</span>
                    <span className="px-3 py-1 bg-[#D4AF37]/10 rounded-full text-xs text-[#D4AF37]">RAG</span>
                    <span className="px-3 py-1 bg-[#30D158]/10 rounded-full text-xs text-[#30D158]">LLM</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Connection Line 2-3 */}
          <div className="flex justify-center mb-6">
            <div className="flex flex-col items-center">
              <div className="w-px h-6 bg-gradient-to-b from-[#C0C0C0]/50 to-[#30D158]/50"></div>
              <div className="w-2 h-2 rounded-full bg-[#30D158]/60"></div>
              <div className="w-px h-6 bg-gradient-to-b from-[#30D158]/50 to-[#30D158]/30"></div>
            </div>
          </div>

          {/* Layer 3: AI Tools */}
          <div className="relative mb-6">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-24 text-right pr-4 hidden md:block">
              <span className="text-xs font-semibold text-[#30D158] uppercase tracking-wider">{t.aiArchitecture.layer3Label}</span>
              <p className="text-[10px] text-[#9CA3AF]">{t.aiArchitecture.layer3Description}</p>
            </div>
            <div className="md:ml-28 bg-white rounded-2xl p-6 border border-[#30D158]/10">
              <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-3">
                {aiTools.map((tool) => (
                  <div
                    key={tool.name}
                    className="flex flex-col items-center p-3 bg-[#F5F5F5] rounded-xl border border-black/5 hover:border-[#30D158]/20 transition-all duration-300 hover:scale-105 cursor-pointer group"
                  >
                    <span className="text-2xl mb-1 group-hover:scale-110 transition-transform duration-300">{tool.icon}</span>
                    <span className="text-[10px] font-medium text-[#9CA3AF] text-center leading-tight">{tool.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Connection Line 3-4 */}
          <div className="flex justify-center mb-6">
            <div className="flex flex-col items-center">
              <div className="w-px h-6 bg-gradient-to-b from-[#30D158]/50 to-[#B8962E]/50"></div>
              <div className="w-2 h-2 rounded-full bg-[#B8962E]/60"></div>
              <div className="w-px h-6 bg-gradient-to-b from-[#B8962E]/50 to-[#B8962E]/30"></div>
            </div>
          </div>

          {/* Layer 4: Hardware */}
          <div className="relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-24 text-right pr-4 hidden md:block">
              <span className="text-xs font-semibold text-[#B8962E] uppercase tracking-wider">{t.aiArchitecture.layer4Label}</span>
              <p className="text-[10px] text-[#9CA3AF]">{t.aiArchitecture.layer4Description}</p>
            </div>
            <div className="md:ml-28 bg-white rounded-2xl p-6 border border-[#B8962E]/10">
              <div className="flex flex-wrap justify-center gap-6">
                {hardware.map((hw) => (
                  <div
                    key={hw.name}
                    className="flex flex-col items-center p-6 bg-[#F5F5F5] rounded-2xl border border-black/5 hover:border-[#B8962E]/20 transition-all duration-300 hover:scale-105 cursor-pointer group min-w-[140px]"
                  >
                    <div className="w-16 h-16 rounded-xl flex items-center justify-center mb-3 overflow-hidden">
                      <img src={hw.icon} alt={hw.name} className="w-14 h-14 opacity-90" />
                    </div>
                    <span className="text-sm font-medium text-[#2C2C2C]">{hw.name}</span>
                    <span className="text-[10px] text-[#9CA3AF] mt-1">Apple Silicon</span>
                  </div>
                ))}
              </div>
              <p className="text-center text-xs text-[#9CA3AF] mt-4">
                {t.aiArchitecture.hardwarePowered}
              </p>
            </div>
          </div>

        </div>

        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-6 mt-12 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#D4AF37]"></div>
            <span className="text-[#6B7280]">{t.aiArchitecture.legendCommunication}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#C0C0C0]"></div>
            <span className="text-[#6B7280]">{t.aiArchitecture.legendCore}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#30D158]"></div>
            <span className="text-[#6B7280]">{t.aiArchitecture.legendTools}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#B8962E]"></div>
            <span className="text-[#6B7280]">{t.aiArchitecture.legendHardware}</span>
          </div>
        </div>

      </div>
    </div>
  );
};
