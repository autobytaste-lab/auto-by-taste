
import React, { useState } from 'react';
import { useI18n } from '../i18n/I18nContext';

const deptColors = [
  ['from-[#FF375F] to-[#FF6482]', 'from-[#BF5AF2] to-[#DA8FFF]', 'from-[#30D158] to-[#63E6BE]'],
  ['from-[#FF9F0A] to-[#FFD60A]', 'from-[#30D158] to-[#5AC8FA]', 'from-[#2997FF] to-[#5AC8FA]'],
  ['from-[#2997FF] to-[#5E5CE6]', 'from-[#BF5AF2] to-[#FF375F]', 'from-[#5AC8FA] to-[#30D158]'],
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
  <div className="group relative bg-[#1D1D1F] rounded-2xl border border-white/5 hover:border-white/10 transition-all duration-300 hover:scale-[1.01] overflow-hidden">
    <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${color}`}></div>

    <div className="p-5">
      <div className="flex items-start gap-3 mb-4">
        <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center text-xl`}>
          {agent.icon}
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-[#F5F5F7] text-sm">{agent.name}</h4>
          <p className="text-xs text-[#6E6E73]">{agent.role}</p>
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-[10px] uppercase tracking-wider text-[#6E6E73] font-medium">{tasksLabel}:</p>
        <ul className="space-y-1.5">
          {agent.tasks.map((task, idx) => (
            <li key={idx} className="flex items-start gap-2 text-xs text-[#A1A1A6]">
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
        <div className="absolute inset-0 bg-[#FF9F0A]/10 blur-[60px] rounded-full"></div>
        <div className="relative bg-[#1D1D1F] rounded-2xl p-6 border border-[#FF9F0A]/10 min-w-[300px]">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#FFD60A] to-[#FF9F0A] flex items-center justify-center text-3xl mb-4">
              {company.boss.icon}
            </div>
            <h3 className="text-lg font-semibold text-[#F5F5F7] mb-1">{company.boss.title}</h3>
            <span className="inline-block px-3 py-1 bg-[#FF9F0A]/10 rounded-full text-xs text-[#FF9F0A] mb-3">
              {bossLabel}
            </span>
            <p className="text-sm text-[#86868B]">{company.boss.description}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center">
        <div className="w-px h-6 bg-gradient-to-b from-[#FF9F0A]/40 to-white/5"></div>
        <div className="w-2 h-2 rounded-full bg-white/20"></div>
        <div className="w-px h-4 bg-white/5"></div>
      </div>
    </div>

    {/* Departments */}
    <div className="grid md:grid-cols-3 gap-5">
      {company.departments.map((dept, deptIdx) => {
        const color = deptColors[companyIndex]?.[deptIdx] ?? 'from-[#86868B] to-[#6E6E73]';
        return (
          <div key={dept.name} className="space-y-4">
            <div className={`text-center p-3 rounded-xl bg-gradient-to-r ${color}`}>
              <h4 className="font-semibold text-white text-sm">{dept.name}</h4>
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
        <div className="text-xs text-[#86868B]">AI Agents</div>
      </div>
      <div className="text-center">
        <div className="text-3xl font-bold text-[#30D158]">{company.departments.length}</div>
        <div className="text-xs text-[#86868B]">{departmentsLabel}</div>
      </div>
      <div className="text-center">
        <div className="text-3xl font-bold text-[#FF9F0A]">24/7</div>
        <div className="text-xs text-[#86868B]">{operatingLabel}</div>
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
    <div className="apple-section bg-[#111111]">
      <div className="max-w-[980px] mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <span className="inline-block px-4 py-2 bg-[#FF9F0A]/10 border border-[#FF9F0A]/15 rounded-full text-xs font-medium text-[#FF9F0A] mb-4">
            {t.orgChart.badge}
          </span>
          <h2 className="text-4xl md:text-[56px] font-bold mb-6 tracking-[-0.03em] leading-tight">
            <span className="text-gradient">{t.orgChart.headingHighlight}</span>
          </h2>
          <p className="text-[#86868B] max-w-2xl mx-auto mb-4 text-lg">
            {t.orgChart.description}
          </p>
          <p className="text-sm text-[#6E6E73] max-w-3xl mx-auto">
            {t.orgChart.subDescription}
          </p>
        </div>

        {/* Company Type Selector */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {companies.map((company, idx) => (
            <button
              key={company.id}
              onClick={() => setSelectedIndex(idx)}
              className={`flex items-center gap-3 px-5 py-3.5 rounded-2xl border transition-all duration-300 ${
                selectedIndex === idx
                  ? 'bg-[#1D1D1F] border-[#2997FF]/30 scale-[1.02]'
                  : 'bg-[#1D1D1F]/50 border-white/5 hover:border-white/10'
              }`}
            >
              <span className="text-2xl">{company.icon}</span>
              <div className="text-left">
                <div className="font-medium text-[#F5F5F7] text-sm">{company.name}</div>
                <div className="text-xs text-[#6E6E73]">{t.orgChart.viewSample}</div>
              </div>
            </button>
          ))}
        </div>

        {/* Selected Company Description */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-[#1D1D1F] rounded-full border border-white/5">
            <span className="text-xl">{selectedCompany.icon}</span>
            <span className="text-[#A1A1A6] text-sm font-medium">{selectedCompany.description}</span>
          </div>
        </div>

        {/* Org Chart */}
        <div className="bg-[#1D1D1F] rounded-[28px] p-8 md:p-12 border border-white/5">
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
        <div className="mt-10 grid md:grid-cols-3 gap-5">
          <div className="bg-[#1D1D1F] rounded-2xl p-6 border border-[#30D158]/10 text-center transition-all duration-300 hover:scale-[1.01]">
            <div className="text-3xl mb-3">💰</div>
            <h4 className="font-semibold text-[#F5F5F7] mb-2">{t.orgChart.saveCost}</h4>
            <p className="text-sm text-[#86868B]">{t.orgChart.saveCostDesc}</p>
          </div>
          <div className="bg-[#1D1D1F] rounded-2xl p-6 border border-[#2997FF]/10 text-center transition-all duration-300 hover:scale-[1.01]">
            <div className="text-3xl mb-3">⚡</div>
            <h4 className="font-semibold text-[#F5F5F7] mb-2">{t.orgChart.speed}</h4>
            <p className="text-sm text-[#86868B]">{t.orgChart.speedDesc}</p>
          </div>
          <div className="bg-[#1D1D1F] rounded-2xl p-6 border border-[#BF5AF2]/10 text-center transition-all duration-300 hover:scale-[1.01]">
            <div className="text-3xl mb-3">🎯</div>
            <h4 className="font-semibold text-[#F5F5F7] mb-2">{t.orgChart.accuracy}</h4>
            <p className="text-sm text-[#86868B]">{t.orgChart.accuracyDesc}</p>
          </div>
        </div>

      </div>
    </div>
  );
};
