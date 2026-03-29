import React from 'react';

const LOBE_CDN = 'https://unpkg.com/@lobehub/icons-static-png@latest/dark';

const LobeIcon: React.FC<{ name: string }> = ({ name }) => (
  <img
    src={`${LOBE_CDN}/${name}.png`}
    alt={name}
    className="w-5 h-5 object-contain"
    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
  />
);

const usecases = [
  {
    icon: (
      <svg className="w-7 h-7 text-[#9ca3af]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
      </svg>
    ),
    title: 'Lm Vic 24/7 Khng Ngh',
    desc: 'AI Agent lm vic lin tc 24 gi, 7 ngy  khng lng, khng ngh php, khng bo him. Lun sn sng phc v.',
  },
  {
    icon: (
      <div className="flex items-center gap-1.5">
        <LobeIcon name="telegram" />
        <LobeIcon name="discord" />
        <LobeIcon name="whatsapp" />
      </div>
    ),
    title: 'Phc V Mi Knh',
    desc: 'AI Agent tr li khch hng qua Telegram, Zalo, WhatsApp, Discord  tt c knh cng lc, khng b st.',
  },
  {
    icon: (
      <svg className="w-7 h-7 text-[#9ca3af]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2a7 7 0 017 7c0 3-2 5-3 7h-8c-1-2-3-4-3-7a7 7 0 017-7z" /><path d="M9 16v2a3 3 0 006 0v-2" />
      </svg>
    ),
    title: 'B Nh Lin Tc',
    desc: 'Agent nh mi th  khch hng, lch s, quy trnh. Khng cn nhc li, khng mt context.',
  },
  {
    icon: (
      <svg className="w-7 h-7 text-[#9ca3af]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8" /><path d="M12 17v4" /><circle cx="12" cy="10" r="3" />
      </svg>
    ),
    title: 'iu Khin Trnh Duyt',
    desc: 'T ng fill form, scrape data, submit, chp screenshot. AI lm c tt c nhng g con ngi lm trn web.',
  },
  {
    icon: (
      <svg className="w-7 h-7 text-[#9ca3af]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
    title: 'Full System Access',
    desc: 'c/ghi file, chy scripts, gi API. Agent thao tc trc tip trn h thng  sandbox hoc ton quyn.',
  },
  {
    icon: (
      <div className="flex items-center gap-1.5">
        <LobeIcon name="github" />
        <LobeIcon name="notion" />
        <LobeIcon name="slack" />
      </div>
    ),
    title: 'Skills & Tch Hp',
    desc: 'Hng trm Skills sn c. T vit skill mi bng markdown. Tch hp bt k tool no qua MCP/API.',
  },
];

export const UseCaseGrid: React.FC = () => {
  return (
    <section id="usecases" className="py-24 px-6">
      <div className="max-w-[980px] mx-auto">
        {/* Section header */}
        <div className="mb-16 text-center">
          <p className="text-xs font-medium text-[#4ade80] tracking-[0.2em] uppercase mb-4">
             AI Agent Lm c G?
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold text-white tracking-tight">
            Nhn s AI.<br />
            <span className="text-[#707070]">Mi tc v. 24/7.</span>
          </h2>
        </div>

        {/* 2x3 Grid of cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {usecases.map((uc, i) => (
            <div
              key={i}
              className="relative bg-[#111]/80 border border-[#1e2028] rounded-2xl p-8 group hover:border-[#4ade80]/20 transition-all duration-400 overflow-hidden text-center"
            >
              {/* Icon container */}
              <div className="w-14 h-14 rounded-xl bg-[#1a1c22] border border-[#2a2a2a] flex items-center justify-center mx-auto mb-5">
                {uc.icon}
              </div>

              <h3 className="text-lg font-bold text-white mb-3 group-hover:text-[#4ade80] transition-colors duration-300">
                {uc.title}
              </h3>
              <p className="text-sm text-[#707070] leading-relaxed">
                {uc.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
