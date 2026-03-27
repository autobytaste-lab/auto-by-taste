
import React, { useState } from 'react';
import { useI18n } from '../i18n/I18nContext';

const deptColors = [
  ['from-[#6366f1] to-[#8b5cf6]', 'from-[#C0C0C0] to-[#E0E0E0]', 'from-[#30D158] to-[#63E6BE]'],
  ['from-[#6366f1] to-[#8b5cf6]', 'from-[#30D158] to-[#63E6BE]', 'from-[#C0C0C0] to-[#E0E0E0]'],
  ['from-[#6366f1] to-[#8b5cf6]', 'from-[#C0C0C0] to-[#E0E0E0]', 'from-[#30D158] to-[#63E6BE]'],
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
  <div className="group relative bg-[#161920] rounded-2xl border border-[#1e2028] hover:border-[#2e3040] transition-all duration-300 hover:scale-[1.01] overflow-hidden">
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
        <div className="absolute inset-0 bg-[#6366f1]/10 blur-[60px] rounded-full"></div>
        <div className="relative bg-[#161920] rounded-2xl p-6 border border-[#6366f1]/10 min-w-[300px]">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#8b5cf6] to-[#6366f1] flex items-center justify-center text-3xl mb-4">
              {company.boss.icon}
            </div>
            <h3 className="text-lg font-semibold text-[#f4f4f5] mb-1">{company.boss.title}</h3>
            <span className="inline-block px-3 py-1 bg-[#6366f1]/10 rounded-full text-xs text-[#6366f1] mb-3">
              {bossLabel}
            </span>
            <p className="text-sm text-[#838387]">{company.boss.description}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center">
        <div className="w-px h-6 bg-gradient-to-b from-[#6366f1]/40 to-white/5"></div>
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
            <div className={`text-center p-3 rounded-xl bg-gradient-to-r ${color}`}>
              <h4 className="font-semibold text-[#f4f4f5] text-sm">{dept.name}</h4>
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
        <div className="text-3xl font-bold text-[#6366f1]">24/7</div>
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
    <div className="apple-section bg-[#13151b]">
      <div className="max-w-[980px] mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <span className="inline-block px-4 py-2 bg-[#6366f1]/10 border border-[#6366f1]/15 rounded-full text-xs font-medium text-[#6366f1] mb-4">
            {t.orgChart.badge}
          </span>
          <h2 className="text-4xl md:text-[56px] font-bold mb-6 tracking-[-0.03em] leading-tight">
            <span className="text-gradient">{t.orgChart.headingHighlight}</span>
          </h2>
          <p className="text-[#838387] max-w-2xl mx-auto mb-4 text-lg">
            {t.orgChart.description}
          </p>
          <p className="text-sm text-[#636366] max-w-3xl mx-auto">
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
                  ? 'bg-[#161920] border-[#6366f1]/30 scale-[1.02]'
                  : 'bg-[#161920] border-[#1e2028] hover:border-[#2e3040]'
              }`}
            >
              <span className="text-2xl">{company.icon}</span>
              <div className="text-left">
                <div className="font-medium text-[#f4f4f5] text-sm">{company.name}</div>
                <div className="text-xs text-[#636366]">{t.orgChart.viewSample}</div>
              </div>
            </button>
          ))}
        </div>

        {/* Selected Company Description */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-[#161920] rounded-full border border-[#1e2028]">
            <span className="text-xl">{selectedCompany.icon}</span>
            <span className="text-[#838387] text-sm font-medium">{selectedCompany.description}</span>
          </div>
        </div>

        {/* Org Chart */}
        <div className="bg-[#161920] rounded-[28px] p-8 md:p-12 border border-[#1e2028]">
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
          <div className="bg-[#161920] rounded-2xl p-6 border border-[#30D158]/10 text-center transition-all duration-300 hover:scale-[1.01]">
            <div className="text-3xl mb-3">💰</div>
            <h4 className="font-semibold text-[#f4f4f5] mb-2">{t.orgChart.saveCost}</h4>
            <p className="text-sm text-[#838387]">{t.orgChart.saveCostDesc}</p>
          </div>
          <div className="bg-[#161920] rounded-2xl p-6 border border-[#6366f1]/10 text-center transition-all duration-300 hover:scale-[1.01]">
            <div className="text-3xl mb-3">⚡</div>
            <h4 className="font-semibold text-[#f4f4f5] mb-2">{t.orgChart.speed}</h4>
            <p className="text-sm text-[#838387]">{t.orgChart.speedDesc}</p>
          </div>
          <div className="bg-[#161920] rounded-2xl p-6 border border-[#2e3040] text-center transition-all duration-300 hover:scale-[1.01]">
            <div className="text-3xl mb-3">🎯</div>
            <h4 className="font-semibold text-[#f4f4f5] mb-2">{t.orgChart.accuracy}</h4>
            <p className="text-sm text-[#838387]">{t.orgChart.accuracyDesc}</p>
          </div>
        </div>

      </div>
    </div>
  );
};
