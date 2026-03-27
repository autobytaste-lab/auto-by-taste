
import React, { useState } from 'react';
import { useI18n } from '../i18n/I18nContext';

const deptColors = [
  ['from-[#ff5c5c] to-[#ff7070]', 'from-[#C0C0C0] to-[#E0E0E0]', 'from-[#30D158] to-[#63E6BE]'],
  ['from-[#ff5c5c] to-[#ff7070]', 'from-[#30D158] to-[#63E6BE]', 'from-[#C0C0C0] to-[#E0E0E0]'],
  ['from-[#ff5c5c] to-[#ff7070]', 'from-[#C0C0C0] to-[#E0E0E0]', 'from-[#30D158] to-[#63E6BE]'],
];

interface Agent {
  name: string;
  icon: string;
  role: string;
  tasks: readonly string[];
}

interface Department {
  name: string;
  agents: readonly Agent[];
}

interface Company {
  id: string;
  name: string;
  icon: string;
  description: string;
  boss: {
    title: string;
    icon: string;
    description: string;
  };
  departments: readonly Department[];
}

const AgentCard: React.FC<{
  agent: Agent;
  color: string;
  tasksLabel: string;
}> = ({ agent, color, tasksLabel }) => (
  <div className="group relative bg-[#0a0a0a] rounded-xl border border-[#1a1a1a] hover:border-[#ff5c5c]/20 transition-all duration-300 hover:scale-[1.01] overflow-hidden">
    <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${color}`}></div>

    <div className="p-5">
      <div className="flex items-start gap-3 mb-4">
        <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center text-xl`}>
          {agent.icon}
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-[#f4f4f5] text-sm">{agent.name}</h4>
          <p className="text-xs text-[#636366]">{agent.role}</p>
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-[10px] uppercase tracking-wider text-[#636366] font-medium">{tasksLabel}:</p>
        <ul className="space-y-1.5">
          {agent.tasks.map((task, idx) => (
            <li key={idx} className="flex items-start gap-2 text-xs text-[#838387]">
              <span className="text-[#30D158] mt-0.5">•</span>
              <span>{task}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);

const OrgChart: React.FC<{
  company: Company;
  companyIndex: number;
  bossLabel: string;
  departmentsLabel: string;
  operatingLabel: string;
  tasksLabel: string;
}> = ({ company, companyIndex, bossLabel, departmentsLabel, operatingLabel, tasksLabel }) => (
  <div className="space-y-8">
    {/* Boss/CEO Section */}
    <div className="flex flex-col items-center">
      <div className="relative">
        <div className="absolute inset-0 bg-[#ff5c5c]/10 blur-[60px] rounded-full"></div>
        <div className="relative bg-[#161920] rounded-2xl p-6 border border-[#ff5c5c]/10 min-w-[300px]">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#ff7070] to-[#ff5c5c] flex items-center justify-center text-3xl mb-4">
              {company.boss.icon}
            </div>
            <h3 className="text-lg font-semibold text-[#f4f4f5] mb-1">{company.boss.title}</h3>
            <span className="inline-block px-3 py-1 bg-[#ff5c5c]/10 rounded-full text-xs text-[#ff5c5c] mb-3">
              {bossLabel}
            </span>
            <p className="text-sm text-[#838387]">{company.boss.description}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center">
        <div className="w-px h-6 bg-gradient-to-b from-[#ff5c5c]/40 to-white/5"></div>
        <div className="w-2 h-2 rounded-full bg-[#161920]/20"></div>
        <div className="w-px h-4 bg-[#191c24]"></div>
      </div>
    </div>

    {/* Departments */}
    <div className="grid md:grid-cols-3 gap-5">
      {company.departments.map((dept, deptIdx) => {
        const color = deptColors[companyIndex]?.[deptIdx] ?? 'from-[#636366] to-[#4a4a4e]';
        return (
          <div key={dept.name} className="space-y-4">
            <div className="px-3 py-2 rounded-lg bg-[#ff5c5c]/10 border border-[#ff5c5c]/20">
              <h4 className="font-mono text-xs text-[#ff9090] tracking-wider">› {dept.name}</h4>
            </div>

            <div className="space-y-3">
              {dept.agents.map((agent) => (
                <AgentCard key={agent.name} agent={agent} color={color} tasksLabel={tasksLabel} />
              ))}
            </div>
          </div>
        );
      })}
    </div>

    {/* Summary stats */}
    <div className="flex justify-center gap-10 mt-8">
      <div className="text-center">
        <div className="text-3xl font-bold text-gradient">{company.departments.reduce((acc, d) => acc + d.agents.length, 0)}</div>
        <div className="text-xs text-[#838387]">AI Agents</div>
      </div>
      <div className="text-center">
        <div className="text-3xl font-bold text-[#30D158]">{company.departments.length}</div>
        <div className="text-xs text-[#838387]">{departmentsLabel}</div>
      </div>
      <div className="text-center">
        <div className="text-3xl font-bold text-[#ff5c5c]">24/7</div>
        <div className="text-xs text-[#838387]">{operatingLabel}</div>
      </div>
    </div>
  </div>
);

export const OrgChartAgents: React.FC = () => {
  const { translations: t } = useI18n();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const companies = t.orgChart.companies;
  const selectedCompany = companies[selectedIndex];

  return (
    <section className="py-24 px-6 border-t border-[#1a1a1a] bg-[#000000]" id="org-chart">
      <div className="max-w-[980px] mx-auto">
        {/* Header */}
        <div className="mb-16">
          <p className="text-xs font-medium text-[#ff5c5c] tracking-[0.2em] uppercase mb-4">
            › {t.orgChart.badge}
          </p>
          <h2 className="text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4">
            {t.orgChart.headingHighlight}
          </h2>
          <p className="text-[#606060] max-w-2xl text-base">
            {t.orgChart.description}
          </p>
        </div>

        {/* Company Type Selector */}
        <div className="flex flex-wrap gap-2 mb-10">
          {companies.map((company, idx) => (
            <button
              key={company.id}
              onClick={() => setSelectedIndex(idx)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium border transition-all duration-300 ${
                selectedIndex === idx
                  ? 'bg-[#ff5c5c] text-white border-[#ff5c5c]'
                  : 'bg-[#0f0f0f] border-[#1e1e1e] text-[#606060] hover:text-white hover:border-[#333]'
              }`}
            >
              <span className="text-base">{company.icon}</span>
              <span>{company.name}</span>
            </button>
          ))}
        </div>

        {/* Org Chart */}
        <div className="bg-[#0f0f0f] rounded-2xl p-6 md:p-10 border border-[#1a1a1a]">
          <OrgChart
            company={selectedCompany}
            companyIndex={selectedIndex}
            bossLabel={t.orgChart.bossLabel}
            departmentsLabel={t.orgChart.departmentsLabel}
            operatingLabel={t.orgChart.operatingLabel}
            tasksLabel={t.orgChart.tasksLabel}
          />
        </div>

        {/* Benefits callout */}
        <div className="mt-8 grid md:grid-cols-3 gap-4">
          {[
            { icon: '💰', title: t.orgChart.saveCost, desc: t.orgChart.saveCostDesc, border: 'border-[#ff5c5c]/10' },
            { icon: '⚡', title: t.orgChart.speed, desc: t.orgChart.speedDesc, border: 'border-[#ff5c5c]/10' },
            { icon: '🎯', title: t.orgChart.accuracy, desc: t.orgChart.accuracyDesc, border: 'border-[#1a1a1a]' },
          ].map((item, i) => (
            <div key={i} className={`bg-[#0f0f0f] rounded-xl p-5 border ${item.border} text-center`}>
              <div className="text-2xl mb-2">{item.icon}</div>
              <h4 className="font-semibold text-white text-sm mb-1">{item.title}</h4>
              <p className="text-xs text-[#606060]">{item.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
