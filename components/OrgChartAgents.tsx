
import React, { useState } from 'react';
import { useI18n } from '../i18n/I18nContext';

const deptColors = [
  ['from-pink-500 to-rose-500', 'from-purple-500 to-violet-500', 'from-emerald-500 to-teal-500'],
  ['from-amber-500 to-orange-500', 'from-green-500 to-emerald-500', 'from-blue-500 to-cyan-500'],
  ['from-blue-500 to-indigo-500', 'from-purple-500 to-fuchsia-500', 'from-teal-500 to-cyan-500'],
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
  <div className="group relative bg-gradient-to-br from-slate-800/80 to-slate-900/80 rounded-xl border border-slate-700/50 hover:border-slate-500/50 transition-all duration-300 hover:scale-[1.02] overflow-hidden">
    {/* Gradient accent */}
    <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${color}`}></div>

    <div className="p-5">
      {/* Header */}
      <div className="flex items-start gap-3 mb-4">
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center text-2xl shadow-lg`}>
          {agent.icon}
        </div>
        <div className="flex-1">
          <h4 className="font-bold text-white text-sm">{agent.name}</h4>
          <p className="text-xs text-slate-400">{agent.role}</p>
        </div>
      </div>

      {/* Tasks */}
      <div className="space-y-2">
        <p className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">{tasksLabel}:</p>
        <ul className="space-y-1.5">
          {agent.tasks.map((task, idx) => (
            <li key={idx} className="flex items-start gap-2 text-xs text-slate-300">
              <span className="text-emerald-400 mt-0.5">•</span>
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
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/30 to-amber-500/30 blur-2xl rounded-full"></div>

        {/* Boss card */}
        <div className="relative glass-card rounded-2xl p-6 border-yellow-500/30 bg-gradient-to-br from-yellow-900/20 to-amber-900/20 min-w-[300px]">
          <div className="flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center text-4xl shadow-lg shadow-yellow-500/30 mb-4">
              {company.boss.icon}
            </div>
            <h3 className="text-xl font-bold text-white mb-1">{company.boss.title}</h3>
            <span className="inline-block px-3 py-1 bg-yellow-500/20 rounded-full text-xs text-yellow-300 mb-3">
              {bossLabel}
            </span>
            <p className="text-sm text-slate-400">{company.boss.description}</p>
          </div>
        </div>
      </div>

      {/* Connection line from boss */}
      <div className="flex flex-col items-center">
        <div className="w-0.5 h-8 bg-gradient-to-b from-yellow-500 to-slate-600"></div>
        <div className="w-3 h-3 rounded-full bg-slate-500 animate-pulse"></div>
        <div className="w-0.5 h-4 bg-slate-600"></div>
      </div>
    </div>

    {/* Departments */}
    <div className="grid md:grid-cols-3 gap-6">
      {company.departments.map((dept, deptIdx) => {
        const color = deptColors[companyIndex]?.[deptIdx] ?? 'from-slate-500 to-slate-600';
        return (
          <div key={dept.name} className="space-y-4">
            {/* Department header */}
            <div className={`text-center p-3 rounded-xl bg-gradient-to-r ${color} bg-opacity-20`}>
              <h4 className="font-bold text-white text-sm">{dept.name}</h4>
            </div>

            {/* Agents in department */}
            <div className="space-y-4">
              {dept.agents.map((agent) => (
                <AgentCard key={agent.name} agent={agent} color={color} tasksLabel={tasksLabel} />
              ))}
            </div>
          </div>
        );
      })}
    </div>

    {/* Summary stats */}
    <div className="flex justify-center gap-8 mt-8">
      <div className="text-center">
        <div className="text-3xl font-bold text-gradient">{company.departments.reduce((acc, d) => acc + d.agents.length, 0)}</div>
        <div className="text-xs text-slate-400">AI Agents</div>
      </div>
      <div className="text-center">
        <div className="text-3xl font-bold text-emerald-400">{company.departments.length}</div>
        <div className="text-xs text-slate-400">{departmentsLabel}</div>
      </div>
      <div className="text-center">
        <div className="text-3xl font-bold text-yellow-400">24/7</div>
        <div className="text-xs text-slate-400">{operatingLabel}</div>
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
    <div className="py-24 bg-gradient-to-b from-[#050505] via-[#0a0a15] to-[#050505]">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-yellow-500/10 border border-yellow-500/20 rounded-full text-xs font-semibold text-yellow-400 mb-4">
            {t.orgChart.badge}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-gradient">{t.orgChart.headingHighlight}</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto mb-4">
            {t.orgChart.description}
          </p>
          <p className="text-sm text-slate-500 max-w-3xl mx-auto">
            {t.orgChart.subDescription}
          </p>
        </div>

        {/* Company Type Selector */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {companies.map((company, idx) => (
            <button
              key={company.id}
              onClick={() => setSelectedIndex(idx)}
              className={`flex items-center gap-3 px-6 py-4 rounded-xl border transition-all duration-300 ${
                selectedIndex === idx
                  ? 'bg-gradient-to-r from-purple-500/20 to-blue-500/20 border-purple-500/50 scale-105'
                  : 'bg-slate-800/50 border-slate-700/50 hover:border-slate-600/50 hover:bg-slate-800/80'
              }`}
            >
              <span className="text-3xl">{company.icon}</span>
              <div className="text-left">
                <div className="font-semibold text-white text-sm">{company.name}</div>
                <div className="text-xs text-slate-400">{t.orgChart.viewSample}</div>
              </div>
            </button>
          ))}
        </div>

        {/* Selected Company Description */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-slate-800/50 rounded-full border border-slate-700/50">
            <span className="text-2xl">{selectedCompany.icon}</span>
            <span className="text-slate-300 font-medium">{selectedCompany.description}</span>
          </div>
        </div>

        {/* Org Chart */}
        <div className="glass-card rounded-3xl p-8 md:p-12 border-slate-700/50">
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
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="glass-card rounded-xl p-6 border-emerald-500/20 text-center">
            <div className="text-3xl mb-3">💰</div>
            <h4 className="font-bold text-white mb-2">{t.orgChart.saveCost}</h4>
            <p className="text-sm text-slate-400">{t.orgChart.saveCostDesc}</p>
          </div>
          <div className="glass-card rounded-xl p-6 border-blue-500/20 text-center">
            <div className="text-3xl mb-3">⚡</div>
            <h4 className="font-bold text-white mb-2">{t.orgChart.speed}</h4>
            <p className="text-sm text-slate-400">{t.orgChart.speedDesc}</p>
          </div>
          <div className="glass-card rounded-xl p-6 border-purple-500/20 text-center">
            <div className="text-3xl mb-3">🎯</div>
            <h4 className="font-bold text-white mb-2">{t.orgChart.accuracy}</h4>
            <p className="text-sm text-slate-400">{t.orgChart.accuracyDesc}</p>
          </div>
        </div>

      </div>
    </div>
  );
};
