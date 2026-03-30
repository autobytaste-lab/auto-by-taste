import React from 'react';
import { useI18n } from '../i18n/I18nContext';

const trainingPackages = [
  {
    icon: '🎓',
    titleKey: 'pkg1Title' as const,
    descKey: 'pkg1Desc' as const,
    features: 'pkg1Features' as const,
    price: 'pkg1Price' as const,
    color: 'from-purple-500/20 to-pink-500/20',
    borderColor: 'border-[#a78bfa]/20 hover:border-[#a78bfa]/40',
    tagColor: 'bg-[#a78bfa]/10 text-[#c4b5fd] border-[#a78bfa]/15',
    iconBg: 'bg-[#a78bfa]/10 group-hover:bg-[#a78bfa]/20',
    glowColor: 'group-hover:bg-[#a78bfa]/6',
  },
  {
    icon: '📞',
    titleKey: 'pkg2Title' as const,
    descKey: 'pkg2Desc' as const,
    features: 'pkg2Features' as const,
    price: 'pkg2Price' as const,
    color: 'from-teal-500/20 to-cyan-500/20',
    borderColor: 'border-[#14b8a6]/20 hover:border-[#14b8a6]/40',
    tagColor: 'bg-[#14b8a6]/10 text-[#5eead4] border-[#14b8a6]/15',
    iconBg: 'bg-[#14b8a6]/10 group-hover:bg-[#14b8a6]/20',
    glowColor: 'group-hover:bg-[#14b8a6]/6',
  },
  {
    icon: '🏢',
    titleKey: 'pkg3Title' as const,
    descKey: 'pkg3Desc' as const,
    features: 'pkg3Features' as const,
    price: 'pkg3Price' as const,
    color: 'from-amber-500/20 to-orange-500/20',
    borderColor: 'border-[#f59e0b]/20 hover:border-[#f59e0b]/40',
    tagColor: 'bg-[#f59e0b]/10 text-[#fbbf24] border-[#f59e0b]/15',
    iconBg: 'bg-[#f59e0b]/10 group-hover:bg-[#f59e0b]/20',
    glowColor: 'group-hover:bg-[#f59e0b]/6',
  },
];

export const TrainingConsultation: React.FC = () => {
  const { translations: t } = useI18n();
  const tc = t.trainingConsultation;

  return (
    <div className="apple-section bg-[#000000]" id="training">
      <div className="max-w-[980px] mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-20">
          <span className="inline-block px-4 py-2 bg-[#a78bfa]/10 border border-[#a78bfa]/20 rounded-full text-xs font-medium text-[#c4b5fd] mb-6 tracking-wide">
            {tc.badge}
          </span>
          <h2 className="text-4xl md:text-[56px] font-bold mb-6 tracking-[-0.03em] leading-tight">
            <span className="text-gradient">{tc.heading}</span>
          </h2>
          <p className="text-[#838387] max-w-2xl mx-auto text-lg">
            {tc.description}
          </p>

          {/* Highlights */}
          <div className="max-w-2xl mx-auto grid sm:grid-cols-3 gap-4 mt-8">
            {tc.highlights.map((item, i) => (
              <div key={i} className="p-5 rounded-2xl bg-[#0a0a0f] border border-[#1e2028] text-left">
                <div className="text-2xl mb-3">{item.icon}</div>
                <p className="text-sm text-[#838387] leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Package Cards */}
        <div className="grid md:grid-cols-3 gap-5 mb-16">
          {trainingPackages.map((pkg, i) => {
            const title = tc.packages[i].title;
            const desc = tc.packages[i].desc;
            const features = tc.packages[i].features;
            const price = tc.packages[i].price;

            return (
              <div
                key={i}
                className={`group relative p-8 rounded-[28px] bg-[#0a0a0f] border ${pkg.borderColor} transition-all duration-300 hover:scale-[1.01] overflow-hidden gold-hover-glow`}
              >
                <div className={`absolute top-0 right-0 w-[200px] h-[200px] bg-[#a78bfa]/3 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2 ${pkg.glowColor} transition-all duration-500`}></div>
                <div className="relative z-10">
                  <div className={`w-14 h-14 rounded-2xl ${pkg.iconBg} flex items-center justify-center mb-6 transition-colors duration-300`}>
                    <span className="text-3xl">{pkg.icon}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-[#f4f4f5] mb-3 tracking-[-0.02em]">{title}</h3>
                  <p className="text-[#838387] leading-relaxed mb-4 text-sm">{desc}</p>

                  <ul className="space-y-2 mb-5">
                    {features.map((f, j) => (
                      <li key={j} className="flex items-start text-sm text-[#838387]">
                        <span className="text-[#4ade80] mr-2 mt-0.5">✓</span>
                        {f}
                      </li>
                    ))}
                  </ul>

                  <div className={`inline-block px-3 py-1 text-xs rounded-full ${pkg.tagColor} border font-medium`}>
                    {price}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 1-on-1 Call Highlight */}
        <div className="relative p-10 lg:p-14 rounded-[28px] bg-[#0a0a0f] border border-[#a78bfa]/20 overflow-hidden mb-12">
          <div className="absolute inset-0 bg-gradient-to-br from-[#a78bfa]/5 to-[#14b8a6]/5"></div>
          <div className="relative z-10 grid md:grid-cols-2 gap-10 items-center">
            <div>
              <div className="text-4xl mb-4">📞</div>
              <h3 className="text-2xl font-bold text-[#f4f4f5] mb-3 tracking-[-0.02em]">{tc.callTitle}</h3>
              <p className="text-[#838387] mb-6 leading-relaxed">{tc.callDescription}</p>
              <ul className="space-y-3">
                {tc.callBenefits.map((b, i) => (
                  <li key={i} className="flex items-start text-sm text-[#838387]">
                    <span className="text-[#a78bfa] mr-2 mt-0.5 text-base">{b.icon}</span>
                    <span><span className="text-[#f4f4f5] font-medium">{b.title}</span> — {b.desc}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {tc.callStats.map((stat, i) => (
                <div key={i} className="p-5 rounded-2xl bg-[#161920] border border-[#1e2028] text-center">
                  <div className="text-3xl font-bold text-[#a78bfa] mb-1">{stat.value}</div>
                  <div className="text-xs text-[#838387]">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Block */}
        <div className="relative p-10 lg:p-14 rounded-[28px] bg-[#0a0a0f] border border-[#4ade80]/20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#4ade80]/5 to-[#a78bfa]/5"></div>
          <div className="relative z-10 text-center">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-2xl font-bold text-[#f4f4f5] mb-3 tracking-[-0.02em]">{tc.ctaTitle}</h3>
            <p className="text-[#838387] mb-8 max-w-lg mx-auto">{tc.ctaDescription}</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://zalo.me/0337776435"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-3.5 bg-[#4ade80] hover:bg-[#86efac] text-white font-semibold rounded-full transition-all duration-300 text-[15px] shadow-lg shadow-[#4ade80]/25"
              >
                <img src="https://img.icons8.com/color/48/zalo.png" alt="Zalo" className="w-5 h-5" />
                {tc.ctaZalo}
              </a>
              <a
                href="https://t.me/agentic_ai_vn"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-3.5 bg-[#0a0a0f] hover:bg-[#161920] text-[#14b8a6] font-semibold rounded-full border border-[#14b8a6]/20 hover:border-[#14b8a6]/40 transition-all duration-300 text-[15px]"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
                {tc.ctaTelegram}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
