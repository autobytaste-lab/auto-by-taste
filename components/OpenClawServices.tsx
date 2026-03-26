import React from 'react';
import { useI18n } from '../i18n/I18nContext';

export const OpenClawServices: React.FC = () => {
  const { translations: t } = useI18n();

  return (
    <div className="apple-section bg-[#0e1015]">
      <div className="max-w-[980px] mx-auto px-6">
        <div className="text-center mb-20">
          <span className="inline-block px-4 py-2 bg-[#ff5c5c]/10 border border-[#ff5c5c]/15 rounded-full text-xs font-medium text-[#ff5c5c] mb-4">
            {t.openclawServices.badge}
          </span>
          <h2 className="text-4xl md:text-[56px] font-bold mb-6 tracking-[-0.03em] leading-tight">
            <span className="text-gradient">{t.openclawServices.heading}</span>
          </h2>
          <p className="text-[#838387] max-w-2xl mx-auto text-lg">
            {t.openclawServices.description}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5 mb-16">
          {t.openclawServices.services.map((service, i) => (
            <div
              key={i}
              className="group relative p-8 rounded-[28px] bg-[#161920] border border-[#1e2028] hover:border-[#2e3040] transition-all duration-300 hover:scale-[1.01] overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-[#ff5c5c]/3 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-[#ff5c5c]/5 transition-all duration-500"></div>
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-[#ff5c5c]/10 flex items-center justify-center mb-6 group-hover:bg-[#ff5c5c]/15 transition-colors duration-300">
                  <span className="text-3xl">{service.icon}</span>
                </div>
                <h3 className="text-xl font-semibold text-[#f4f4f5] mb-3 tracking-[-0.02em]">{service.title}</h3>
                <p className="text-[#838387] leading-relaxed">{service.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA with Telegram Links */}
        <div className="relative p-10 lg:p-14 rounded-[28px] bg-[#161920] border border-[#1e2028] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#ff5c5c]/5 to-[#14b8a6]/5"></div>
          <div className="relative z-10 text-center">
            <div className="text-4xl mb-4">🦞</div>
            <h3 className="text-2xl font-bold text-[#f4f4f5] mb-3 tracking-[-0.02em]">{t.openclawServices.ctaTitle}</h3>
            <p className="text-[#838387] mb-8 max-w-lg mx-auto">{t.openclawServices.ctaDescription}</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://t.me/autobytaste_bot"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-3.5 bg-[#ff5c5c] hover:bg-[#ff7070] text-white font-semibold rounded-full transition-all duration-300 text-[15px]"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
                {t.openclawServices.telegramTrial}
              </a>
              <a
                href="https://t.me/autobytaste_community"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-3.5 bg-[#191c24] hover:bg-[#1f2330] text-[#14b8a6] font-semibold rounded-full border border-[#14b8a6]/20 hover:border-[#14b8a6]/40 transition-all duration-300 text-[15px]"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
                {t.openclawServices.telegramGroup}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
