import React, { useState, useEffect, useRef } from 'react';
import { useI18n } from '../i18n/I18nContext';

const deptColors = [
  ['from-[#ff5c5c] to-[#ff7070]', 'from-[#C0C0C0] to-[#E0E0E0]', 'from-[#30D158] to-[#63E6BE]'],
  ['from-[#ff5c5c] to-[#ff7070]', 'from-[#30D158] to-[#63E6BE]', 'from-[#C0C0C0] to-[#E0E0E0]'],
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

// ── Live Activity Feed ──────────────────────────────────────────────────────

type ActivityStatus = 'active' | 'done' | 'alert';
interface ActivityItem {
  agent: string;
  action: string;
  time: string;
  status: ActivityStatus;
}

const initialActivities: Record<string, ActivityItem[]> = {
  cosmetics: [
    { agent: 'Sales Agent', action: 'Đang tư vấn khách hàng mới...', time: '1s ago', status: 'active' },
    { agent: 'Social Media Agent', action: 'Đăng bài TikTok tự động', time: '5s ago', status: 'done' },
    { agent: 'Inventory Agent', action: 'Cảnh báo: Son đỏ sắp hết hàng', time: '12s ago', status: 'alert' },
    { agent: 'Customer Support Agent', action: 'Giải quyết 3 khiếu nại', time: '23s ago', status: 'done' },
    { agent: 'Accounting Agent', action: 'Xuất hóa đơn #2847', time: '45s ago', status: 'done' },
  ],
  rubber: [
    { agent: 'Production Agent', action: 'Lập kế hoạch sản xuất ca chiều', time: '2s ago', status: 'active' },
    { agent: 'Quality Agent', action: 'Kiểm tra lô hàng QC-449', time: '8s ago', status: 'done' },
    { agent: 'Procurement Agent', action: 'Cảnh báo: Giá mủ tăng 3%', time: '15s ago', status: 'alert' },
    { agent: 'Logistics Agent', action: 'Theo dõi lô xuất khẩu #EX-112', time: '30s ago', status: 'done' },
    { agent: 'Maintenance Agent', action: 'Lịch bảo trì máy dây chuyền 2', time: '1m ago', status: 'done' },
  ],
  law: [
    { agent: 'Legal Research Agent', action: 'Tra cứu văn bản luật DN 2024', time: '3s ago', status: 'active' },
    { agent: 'Document Agent', action: 'Soạn hợp đồng #HC-309', time: '10s ago', status: 'done' },
    { agent: 'Compliance Agent', action: 'Cảnh báo: Nghị định mới cần review', time: '18s ago', status: 'alert' },
    { agent: 'Case Management Agent', action: 'Nhắc hầu tòa ngày mai 9:00', time: '35s ago', status: 'done' },
    { agent: 'Billing Agent', action: 'Xuất hóa đơn vụ Nguyễn & Cộng sự', time: '52s ago', status: 'done' },
  ],
  ecommerce: [
    { agent: 'Sales Agent', action: 'Đang tư vấn & chốt đơn hàng mới', time: '1s ago', status: 'active' },
    { agent: 'Order Agent', action: 'Xử lý 12 đơn hàng chờ', time: '6s ago', status: 'done' },
    { agent: 'Ads Agent', action: 'Cảnh báo: Budget quảng cáo sắp hết', time: '14s ago', status: 'alert' },
    { agent: 'Content Agent', action: 'Đăng bài Facebook & TikTok', time: '28s ago', status: 'done' },
    { agent: 'Review Agent', action: 'Phản hồi 5 đánh giá 1 sao', time: '47s ago', status: 'done' },
  ],
  startup: [
    { agent: 'Dev Agent', action: 'Code review PR #247 — auth module', time: '2s ago', status: 'active' },
    { agent: 'DevOps Agent', action: 'Deploy v2.1.4 lên staging', time: '9s ago', status: 'done' },
    { agent: 'QA Agent', action: 'Cảnh báo: 3 test cases thất bại', time: '17s ago', status: 'alert' },
    { agent: 'PM Agent', action: 'Sprint planning Q2 hoàn tất', time: '33s ago', status: 'done' },
    { agent: 'Analytics Agent', action: 'Báo cáo retention tháng 3', time: '55s ago', status: 'done' },
  ],
};

const activityPools: Record<string, ActivityItem[]> = {
  cosmetics: [
    { agent: 'Sales Agent', action: 'Upsell thành công đơn #8821', time: 'just now', status: 'done' },
    { agent: 'Loyalty Agent', action: 'Gửi voucher sinh nhật x12 khách', time: 'just now', status: 'done' },
    { agent: 'Social Media Agent', action: 'Phân tích trending mỹ phẩm', time: 'just now', status: 'active' },
    { agent: 'Inventory Agent', action: 'Đề xuất nhập thêm kem dưỡng', time: 'just now', status: 'done' },
    { agent: 'Accounting Agent', action: 'Báo cáo doanh thu tuần cập nhật', time: 'just now', status: 'done' },
  ],
  rubber: [
    { agent: 'Quality Agent', action: 'Phê duyệt lô hàng SVR10 #A224', time: 'just now', status: 'done' },
    { agent: 'R&D Agent', action: 'Thử nghiệm hợp chất mới BN-77', time: 'just now', status: 'active' },
    { agent: 'Procurement Agent', action: 'So sánh 3 báo giá nhà cung cấp', time: 'just now', status: 'done' },
    { agent: 'Logistics Agent', action: 'Cập nhật tuyến đường tối ưu', time: 'just now', status: 'done' },
    { agent: 'Maintenance Agent', action: 'Dự đoán bảo trì máy C3 sau 72h', time: 'just now', status: 'alert' },
  ],
  law: [
    { agent: 'Document Agent', action: 'Dịch tài liệu pháp lý sang tiếng Anh', time: 'just now', status: 'done' },
    { agent: 'Legal Research Agent', action: 'Tổng hợp luật mới tháng 3/2025', time: 'just now', status: 'active' },
    { agent: 'Consultation Agent', action: 'Đặt lịch hẹn vụ việc Công ty ABC', time: 'just now', status: 'done' },
    { agent: 'Compliance Agent', action: 'Kiểm tra tuân thủ thuế cho khách', time: 'just now', status: 'done' },
    { agent: 'Case Management Agent', action: 'Lưu hồ sơ vụ kiện #VK-888', time: 'just now', status: 'done' },
  ],
  ecommerce: [
    { agent: 'Order Agent', action: 'Xác nhận đơn giao hàng tỉnh', time: 'just now', status: 'done' },
    { agent: 'Sales Agent', action: 'Cross-sell thành công +250k', time: 'just now', status: 'done' },
    { agent: 'Content Agent', action: 'Tạo 5 caption sản phẩm mới', time: 'just now', status: 'active' },
    { agent: 'Ads Agent', action: 'Tối ưu CPA chiến dịch Facebook', time: 'just now', status: 'done' },
    { agent: 'Support Agent', action: 'Giải quyết khiếu nại chậm giao', time: 'just now', status: 'done' },
  ],
  startup: [
    { agent: 'Dev Agent', action: 'Tự động fix 2 bugs severity-low', time: 'just now', status: 'done' },
    { agent: 'Marketing Agent', action: 'Đăng bài SEO blog tech mới', time: 'just now', status: 'done' },
    { agent: 'Analytics Agent', action: 'Phân tích funnel onboarding', time: 'just now', status: 'active' },
    { agent: 'DevOps Agent', action: 'Scale up server theo traffic', time: 'just now', status: 'done' },
    { agent: 'PM Agent', action: 'Cập nhật backlog sprint 14', time: 'just now', status: 'done' },
  ],
};

const LiveActivityFeed: React.FC<{ companyId: string }> = ({ companyId }) => {
  const pool = activityPools[companyId] ?? activityPools['cosmetics'];
  const initial = initialActivities[companyId] ?? initialActivities['cosmetics'];
  const [items, setItems] = useState<ActivityItem[]>(initial);
  const poolIdxRef = useRef(0);

  useEffect(() => {
    setItems(initialActivities[companyId] ?? initialActivities['cosmetics']);
    poolIdxRef.current = 0;
  }, [companyId]);

  useEffect(() => {
    const timer = setInterval(() => {
      const next = pool[poolIdxRef.current % pool.length];
      poolIdxRef.current++;
      setItems(prev => [next, ...prev.slice(0, 4)]);
    }, 2500);
    return () => clearInterval(timer);
  }, [companyId, pool]);

  return (
    <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-xl p-4">
      <p className="text-xs text-[#ff5c5c] uppercase tracking-widest mb-3 font-mono">› Live Activity</p>
      {items.map((item, i) => (
        <div
          key={`${item.agent}-${i}`}
          className="flex items-start gap-2 py-2 border-b border-[#111] last:border-0 transition-all duration-300"
          style={{ opacity: 1 - i * 0.12 }}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${
              item.status === 'active'
                ? 'bg-[#ff5c5c] animate-pulse'
                : item.status === 'alert'
                ? 'bg-[#f59e0b]'
                : 'bg-[#22c55e]'
            }`}
          />
          <div className="flex-1 min-w-0">
            <span className="text-xs text-[#606060] font-mono block">{item.agent}</span>
            <p className="text-xs text-[#a0a0a0]">{item.action}</p>
          </div>
          <span className="text-[10px] text-[#404040] ml-auto shrink-0 whitespace-nowrap">{item.time}</span>
        </div>
      ))}
    </div>
  );
};

// ── Flow Line with animated packet ─────────────────────────────────────────

const FlowLine: React.FC<{ delay?: number }> = ({ delay = 0 }) => (
  <div className="relative w-px h-8 bg-[#1a1a1a] mx-auto overflow-visible">
    <div
      className="absolute w-1.5 h-1.5 rounded-full bg-[#ff5c5c] -left-[2px]"
      style={{
        animation: 'packet-flow 2s ease-in-out infinite',
        animationDelay: `${delay}ms`,
      }}
    />
  </div>
);

// ── Stats Counter ───────────────────────────────────────────────────────────

const useCountUp = (target: number, duration = 800, started = false) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!started) return;
    let start = 0;
    const step = Math.ceil(target / (duration / 50));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 50);
    return () => clearInterval(timer);
  }, [target, duration, started]);
  return count;
};

// ── Agent Card ──────────────────────────────────────────────────────────────

const AgentCard: React.FC<{
  agent: Agent;
  color: string;
  tasksLabel: string;
}> = ({ agent, color, tasksLabel }) => (
  <div className="group relative bg-[#0a0a0a] rounded-xl border border-[#1a1a1a] hover:border-[#ff5c5c]/30 transition-all duration-300 hover:scale-[1.02] overflow-hidden">
    <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${color}`}></div>
    <div className="p-5">
      <div className="flex items-start gap-3 mb-4">
        <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center text-xl group-hover:dept-icon-pulse`}>
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

// ── Department Card with enhanced hover ────────────────────────────────────

const DeptCard: React.FC<{
  dept: Department;
  color: string;
  tasksLabel: string;
  flowDelay: number;
}> = ({ dept, color, tasksLabel, flowDelay }) => {
  const [hovered, setHovered] = useState(false);
  const agentCount = dept.agents.length;
  const taskCount = agentCount * 2 - 1;

  return (
    <div
      className="space-y-4"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Flow line from boss */}
      <div className="flex flex-col items-center">
        <FlowLine delay={flowDelay} />
      </div>

      {/* Dept header */}
      <div
        className={`relative px-3 py-2 rounded-lg border transition-all duration-300 ${
          hovered
            ? 'bg-[#ff5c5c]/15 border-[#ff5c5c]/40 shadow-[0_0_20px_rgba(255,92,92,0.1)]'
            : 'bg-[#ff5c5c]/10 border-[#ff5c5c]/20'
        }`}
      >
        <div className="flex items-center justify-between">
          <h4 className={`font-mono text-xs tracking-wider transition-colors ${hovered ? 'text-[#ff7070]' : 'text-[#ff9090]'}`}>
            <span className={hovered ? 'dept-icon-pulse inline-block' : ''}>›</span> {dept.name}
          </h4>
          {hovered && (
            <span className="text-[10px] bg-[#ff5c5c]/20 text-[#ff9090] px-2 py-0.5 rounded-full font-mono animate-pulse">
              {taskCount} tasks running
            </span>
          )}
        </div>
      </div>

      {/* Agent cards */}
      <div className="space-y-3">
        {dept.agents.map((agent) => (
          <AgentCard key={agent.name} agent={agent} color={color} tasksLabel={tasksLabel} />
        ))}
      </div>
    </div>
  );
};

// ── Org Chart ───────────────────────────────────────────────────────────────

const OrgChart: React.FC<{
  company: Company;
  companyIndex: number;
  bossLabel: string;
  departmentsLabel: string;
  operatingLabel: string;
  tasksLabel: string;
  statsStarted: boolean;
}> = ({ company, companyIndex, bossLabel, departmentsLabel, operatingLabel, tasksLabel, statsStarted }) => {
  const totalAgents = company.departments.reduce((acc, d) => acc + d.agents.length, 0);
  const deptCount = company.departments.length;

  const agentsCount = useCountUp(totalAgents, 800, statsStarted);
  const deptsCount = useCountUp(deptCount, 600, statsStarted);

  return (
    <div className="space-y-8">
      {/* Boss/CEO Section */}
      <div className="flex flex-col items-center">
        <div className="relative">
          <div className="absolute inset-0 bg-[#ff5c5c]/10 blur-[60px] rounded-full"></div>
          <div className="relative bg-[#161920] rounded-2xl p-6 border border-[#ff5c5c]/10 min-w-[300px] hover:border-[#ff5c5c]/30 transition-all duration-300">
            <div className="flex flex-col items-center text-center">
              <div className="relative mb-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#ff7070] to-[#ff5c5c] flex items-center justify-center text-3xl">
                  {company.boss.icon}
                </div>
              </div>
              <h3 className="text-lg font-semibold text-[#f4f4f5] mb-1">{company.boss.title}</h3>
              <span className="inline-block px-3 py-1 bg-[#ff5c5c]/10 rounded-full text-xs text-[#ff5c5c] mb-2">
                {bossLabel}
              </span>
              {/* ONLINE badge */}
              <div className="flex items-center gap-2 mb-3">
                <span
                  className="w-2 h-2 rounded-full bg-[#30D158] online-pulse"
                  style={{ display: 'inline-block' }}
                />
                <span className="text-xs text-[#30D158] font-mono">ONLINE</span>
                <span className="text-[10px] text-[#404040]">·</span>
                <span className="text-xs text-[#838387] font-mono">{totalAgents} Agents Active</span>
              </div>
              <p className="text-sm text-[#838387]">{company.boss.description}</p>
            </div>
          </div>
        </div>

        {/* Connector line to departments (center) */}
        <div className="flex flex-col items-center">
          <div className="w-px h-4 bg-gradient-to-b from-[#ff5c5c]/40 to-[#ff5c5c]/10"></div>
          <div className="w-2 h-2 rounded-full bg-[#ff5c5c]/30"></div>
        </div>
      </div>

      {/* Departments */}
      <div className="grid md:grid-cols-3 gap-5">
        {company.departments.map((dept, deptIdx) => {
          const color = deptColors[companyIndex]?.[deptIdx] ?? 'from-[#636366] to-[#4a4a4e]';
          return (
            <DeptCard
              key={dept.name}
              dept={dept}
              color={color}
              tasksLabel={tasksLabel}
              flowDelay={deptIdx * 400}
            />
          );
        })}
      </div>

      {/* Summary stats */}
      <div className="flex justify-center gap-10 mt-8">
        <div className="text-center">
          <div className="text-3xl font-bold text-gradient">{statsStarted ? agentsCount : totalAgents}</div>
          <div className="text-xs text-[#838387]">AI Agents</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-[#30D158]">{statsStarted ? deptsCount : deptCount}</div>
          <div className="text-xs text-[#838387]">{departmentsLabel}</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-[#ff5c5c]">24/7</div>
          <div className="text-xs text-[#838387]">{operatingLabel}</div>
        </div>
      </div>
    </div>
  );
};

// ── Main Component ──────────────────────────────────────────────────────────

export const OrgChartAgents: React.FC = () => {
  const { translations: t } = useI18n();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [statsStarted, setStatsStarted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const companies = t.orgChart.companies;
  const selectedCompany = companies[selectedIndex];

  // Intersection observer for stats animation
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsStarted(true);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Reset stats on company change to re-animate
  const handleCompanyChange = (idx: number) => {
    setStatsStarted(false);
    setSelectedIndex(idx);
    requestAnimationFrame(() => setStatsStarted(true));
  };

  return (
    <section ref={sectionRef} className="py-24 px-6 border-t border-[#1a1a1a] bg-[#000000]" id="org-chart">
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
          {companies.map((company: Company, idx: number) => (
            <button
              key={company.id}
              onClick={() => handleCompanyChange(idx)}
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

        {/* Two-column layout: Org Chart + Live Feed */}
        <div className="grid lg:grid-cols-[1fr_280px] gap-6 items-start">
          {/* Org Chart */}
          <div className="bg-[#0f0f0f] rounded-2xl p-6 md:p-10 border border-[#1a1a1a]">
            <OrgChart
              company={selectedCompany}
              companyIndex={selectedIndex}
              bossLabel={t.orgChart.bossLabel}
              departmentsLabel={t.orgChart.departmentsLabel}
              operatingLabel={t.orgChart.operatingLabel}
              tasksLabel={t.orgChart.tasksLabel}
              statsStarted={statsStarted}
            />
          </div>

          {/* Live Activity Feed */}
          <div className="sticky top-24">
            <LiveActivityFeed companyId={selectedCompany.id} />
          </div>
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
