import React, { useState } from 'react';

interface Profile {
  id: string;
  icon: string;
  title: string;
  role: string;
  dailyTasks: string[];
  hardware: string;
  hardwareCost: number; // VND một lần
  modelChoice: string;
  apiCostPerDay: number; // VND/ngày nếu dùng cloud API
  localCostPerDay: number; // VND/ngày nếu dùng local
  electricPerDay: number; // VND/ngày
  breakdown: {
    label: string;
    cloud: string;
    local: string;
    saving: string;
  }[];
  roi: string;
  color: string;
}

const profiles: Profile[] = [
  {
    id: 'freelancer',
    icon: '💼',
    title: 'Freelancer / Cá nhân',
    role: 'Designer, writer, consultant',
    dailyTasks: [
      'Trả lời email, soạn đề xuất',
      'Tóm tắt tài liệu, brief khách hàng',
      'Lên lịch, nhắc nhở deadline',
      'Nghiên cứu thị trường nhanh',
    ],
    hardware: 'MacBook hiện có / PC cơ bản',
    hardwareCost: 0,
    modelChoice: 'Llama 3.1 8B (Ollama) hoặc Claude Haiku',
    apiCostPerDay: 25000,
    localCostPerDay: 0,
    electricPerDay: 2000,
    breakdown: [
      { label: 'API calls (Claude Haiku)', cloud: '~25.000đ', local: '0đ', saving: '25.000đ' },
      { label: 'Điện năng', cloud: '2.000đ', local: '2.000đ', saving: '0đ' },
      { label: 'OpenClaw license', cloud: '0đ', local: '0đ', saving: '0đ' },
    ],
    roi: 'Tiết kiệm 2-3 giờ/ngày soạn nội dung — tương đương 150.000-300.000đ giá trị công việc',
    color: '#14b8a6',
  },
  {
    id: 'salesperson',
    icon: '🤝',
    title: 'Nhân viên Kinh doanh',
    role: 'Sales, account manager, tư vấn',
    dailyTasks: [
      'Soạn email chào hàng cá nhân hóa',
      'Theo dõi pipeline khách hàng',
      'Tổng hợp báo cáo doanh số',
      'Trả lời inbox Zalo/Messenger 24/7',
    ],
    hardware: 'Laptop văn phòng',
    hardwareCost: 0,
    modelChoice: 'Qwen 7B (local) hoặc GPT-4o Mini',
    apiCostPerDay: 40000,
    localCostPerDay: 0,
    electricPerDay: 3000,
    breakdown: [
      { label: 'API calls (GPT-4o Mini)', cloud: '~40.000đ', local: '0đ', saving: '40.000đ' },
      { label: 'Điện năng', cloud: '3.000đ', local: '3.000đ', saving: '0đ' },
      { label: 'OpenClaw license', cloud: '0đ', local: '0đ', saving: '0đ' },
    ],
    roi: 'Tăng 30-50% số leads xử lý được/ngày — doanh thu tăng 5-10 triệu/tháng',
    color: '#f59e0b',
  },
  {
    id: 'developer',
    icon: '👨‍💻',
    title: 'Lập trình viên',
    role: 'Backend, frontend, fullstack dev',
    dailyTasks: [
      'Code review, fix bug tự động',
      'Viết unit test & documentation',
      'Debug lỗi, giải thích error logs',
      'Research tech stack, best practices',
    ],
    hardware: 'Máy dev mạnh (16GB+ RAM)',
    hardwareCost: 0,
    modelChoice: 'DeepSeek Coder / Qwen Coder (local)',
    apiCostPerDay: 80000,
    localCostPerDay: 0,
    electricPerDay: 8000,
    breakdown: [
      { label: 'API calls (Claude Sonnet)', cloud: '~80.000đ', local: '0đ', saving: '80.000đ' },
      { label: 'Điện năng', cloud: '8.000đ', local: '8.000đ', saving: '0đ' },
      { label: 'GitHub Copilot (thay thế)', cloud: '70.000đ', local: '0đ', saving: '70.000đ' },
    ],
    roi: 'Viết code nhanh gấp 2-3x — tiết kiệm 2-4 giờ/ngày debugging & boilerplate',
    color: '#8b5cf6',
  },
  {
    id: 'marketer',
    icon: '📣',
    title: 'Marketer / Content Creator',
    role: 'Digital marketing, social media, SEO',
    dailyTasks: [
      'Viết content Facebook, TikTok, Blog',
      'Lên lịch đăng bài tự động',
      'Phân tích hiệu quả chiến dịch',
      'Nghiên cứu từ khóa, đối thủ',
    ],
    hardware: 'MacBook / PC văn phòng',
    hardwareCost: 0,
    modelChoice: 'Llama 3.1 70B hoặc Claude Sonnet',
    apiCostPerDay: 60000,
    localCostPerDay: 0,
    electricPerDay: 4000,
    breakdown: [
      { label: 'API calls (Claude Sonnet)', cloud: '~60.000đ', local: '0đ', saving: '60.000đ' },
      { label: 'Điện năng', cloud: '4.000đ', local: '4.000đ', saving: '0đ' },
      { label: 'Jasper/Copy.ai (thay thế)', cloud: '150.000đ', local: '0đ', saving: '150.000đ' },
    ],
    roi: 'Sản xuất content gấp 5-10x — từ 2 bài/ngày lên 10-20 bài/ngày',
    color: '#ec4899',
  },
  {
    id: 'manager',
    icon: '👔',
    title: 'Quản lý / Giám đốc',
    role: 'CEO, manager, team lead',
    dailyTasks: [
      'Tóm tắt báo cáo, email hàng ngày',
      'Chuẩn bị tài liệu họp, meeting notes',
      'Theo dõi KPI đội nhóm',
      'Phân tích dữ liệu kinh doanh',
    ],
    hardware: 'MacBook Pro / máy công ty',
    hardwareCost: 0,
    modelChoice: 'Claude Sonnet / GPT-4o (local qua EXO)',
    apiCostPerDay: 50000,
    localCostPerDay: 0,
    electricPerDay: 5000,
    breakdown: [
      { label: 'API calls (GPT-4o)', cloud: '~50.000đ', local: '0đ', saving: '50.000đ' },
      { label: 'Điện năng', cloud: '5.000đ', local: '5.000đ', saving: '0đ' },
      { label: 'Thư ký AI (thay thế)', cloud: '200.000đ', local: '0đ', saving: '200.000đ' },
    ],
    roi: 'Tiết kiệm 1-2 giờ admin/ngày — focus vào quyết định chiến lược',
    color: '#3b82f6',
  },
  {
    id: 'legal',
    icon: '⚖️',
    title: 'Luật sư / Tư vấn pháp lý',
    role: 'Luật sư, pháp chế doanh nghiệp',
    dailyTasks: [
      'Nghiên cứu văn bản pháp luật',
      'Soạn thảo hợp đồng, tờ trình',
      'Tóm tắt hồ sơ vụ việc',
      'Tra cứu án lệ, tiền lệ',
    ],
    hardware: 'MacBook / PC văn phòng',
    hardwareCost: 0,
    modelChoice: 'Llama 70B local (dữ liệu tuyệt mật)',
    apiCostPerDay: 0,
    localCostPerDay: 0,
    electricPerDay: 6000,
    breakdown: [
      { label: 'API calls', cloud: '~70.000đ', local: '0đ', saving: '70.000đ' },
      { label: 'Điện năng', cloud: '6.000đ', local: '6.000đ', saving: '0đ' },
      { label: 'Rủi ro rò rỉ dữ liệu', cloud: '⚠️ Cao', local: '✅ Không', saving: 'Vô giá' },
    ],
    roi: 'Nghiên cứu pháp lý nhanh gấp 10x — 2 giờ xuống 12 phút',
    color: '#ff5c5c',
  },
];

const DAYS_PER_MONTH = 22; // ngày làm việc

export const CostCalculator: React.FC = () => {
  const [selected, setSelected] = useState(0);
  const [mode, setMode] = useState<'cloud' | 'local'>('local');

  const profile = profiles[selected];
  const dailyCost = mode === 'cloud'
    ? profile.apiCostPerDay + profile.electricPerDay
    : profile.localCostPerDay + profile.electricPerDay;
  const monthlyCost = dailyCost * DAYS_PER_MONTH;
  const yearlyCost = monthlyCost * 12;
  const cloudMonthlyCost = (profile.apiCostPerDay + profile.electricPerDay) * DAYS_PER_MONTH;
  const savingMonthly = cloudMonthlyCost - monthlyCost;

  const fmt = (n: number) => n.toLocaleString('vi-VN') + 'đ';

  return (
    <section className="py-24 px-6 border-t border-[#1a1a1a] bg-[#000]">
      <div className="max-w-[980px] mx-auto">
        {/* Header */}
        <div className="mb-12">
          <p className="text-xs font-medium text-[#ff5c5c] tracking-[0.2em] uppercase mb-4">
            › Dự Toán Chi Phí
          </p>
          <h2 className="text-4xl lg:text-5xl font-bold text-white tracking-tight mb-3">
            Bao nhiêu tiền<br />
            <span className="text-[#606060]">để có 1 AI Agent?</span>
          </h2>
          <p className="text-[#606060] text-base max-w-xl">
            Chi phí thực tế khi cá nhân dùng OpenClaw hàng ngày — theo từng nghề nghiệp.
          </p>
        </div>

        {/* Mode toggle */}
        <div className="flex items-center gap-3 mb-8">
          <span className="text-xs text-[#606060]">Chế độ:</span>
          <div className="flex bg-[#0f0f0f] border border-[#1a1a1a] rounded-full p-0.5">
            <button
              onClick={() => setMode('local')}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${mode === 'local' ? 'bg-[#ff5c5c] text-white' : 'text-[#606060] hover:text-white'}`}
            >
              🖥️ Local AI (Ollama)
            </button>
            <button
              onClick={() => setMode('cloud')}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${mode === 'cloud' ? 'bg-[#ff5c5c] text-white' : 'text-[#606060] hover:text-white'}`}
            >
              ☁️ Cloud API
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-[280px,1fr] gap-6">
          {/* Profile selector */}
          <div className="space-y-2">
            {profiles.map((p, i) => (
              <button
                key={p.id}
                onClick={() => setSelected(i)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border text-left transition-all duration-200 ${
                  selected === i
                    ? 'bg-[#0f0f0f] border-[#ff5c5c]/40 text-white'
                    : 'bg-[#0a0a0a] border-[#1a1a1a] text-[#606060] hover:text-white hover:border-[#333]'
                }`}
              >
                <span className="text-xl">{p.icon}</span>
                <div>
                  <div className="text-sm font-medium">{p.title}</div>
                  <div className="text-[10px] text-[#404040]">{p.role}</div>
                </div>
              </button>
            ))}
          </div>

          {/* Detail panel */}
          <div className="space-y-4">
            {/* Cost summary cards */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: 'Chi phí / Ngày', value: fmt(dailyCost), sub: `${DAYS_PER_MONTH} ngày làm/tháng` },
                { label: 'Chi phí / Tháng', value: fmt(monthlyCost), sub: mode === 'local' ? `Tiết kiệm ${fmt(savingMonthly)}/tháng` : 'Dùng cloud API' },
                { label: 'Chi phí / Năm', value: fmt(yearlyCost), sub: mode === 'local' ? `So với cloud: ${fmt(savingMonthly * 12)}/năm` : 'Tổng chi phí năm' },
              ].map((item, i) => (
                <div key={i} className="bg-[#0f0f0f] border border-[#1a1a1a] rounded-xl p-4 text-center">
                  <div className="text-[10px] text-[#ff5c5c] uppercase tracking-widest mb-1">{item.label}</div>
                  <div className="text-xl font-bold text-white">{item.value}</div>
                  <div className="text-[10px] text-[#404040] mt-1">{item.sub}</div>
                </div>
              ))}
            </div>

            {/* Daily tasks */}
            <div className="bg-[#0f0f0f] border border-[#1a1a1a] rounded-xl p-5">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs text-[#ff5c5c] uppercase tracking-widest">› Công việc hàng ngày</p>
                <span className="text-xs text-[#404040]">{profile.modelChoice}</span>
              </div>
              <div className="grid sm:grid-cols-2 gap-2">
                {profile.dailyTasks.map((task, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-[#a0a0a0]">
                    <span className="text-[#22c55e] text-xs">✓</span>
                    {task}
                  </div>
                ))}
              </div>
            </div>

            {/* Cost breakdown table */}
            <div className="bg-[#0f0f0f] border border-[#1a1a1a] rounded-xl p-5">
              <p className="text-xs text-[#ff5c5c] uppercase tracking-widest mb-4">› Chi tiết chi phí / ngày</p>
              <div className="space-y-0">
                <div className="grid grid-cols-4 gap-2 pb-2 border-b border-[#1a1a1a] mb-2">
                  <div className="text-[10px] text-[#404040] col-span-2">Khoản mục</div>
                  <div className="text-[10px] text-[#404040] text-right">Cloud API</div>
                  <div className="text-[10px] text-[#22c55e] text-right">Local AI</div>
                </div>
                {profile.breakdown.map((row, i) => (
                  <div key={i} className="grid grid-cols-4 gap-2 py-2 border-b border-[#111] last:border-0">
                    <div className="text-xs text-[#a0a0a0] col-span-2">{row.label}</div>
                    <div className="text-xs text-[#606060] text-right">{row.cloud}</div>
                    <div className="text-xs text-[#22c55e] text-right font-medium">{row.local}</div>
                  </div>
                ))}
                <div className="grid grid-cols-4 gap-2 pt-3 mt-1">
                  <div className="text-xs font-semibold text-white col-span-2">Tổng / ngày</div>
                  <div className="text-xs text-[#ff5c5c] text-right font-semibold">
                    {fmt(profile.apiCostPerDay + profile.electricPerDay)}
                  </div>
                  <div className="text-xs text-[#22c55e] text-right font-bold">
                    {fmt(profile.localCostPerDay + profile.electricPerDay)}
                  </div>
                </div>
              </div>
            </div>

            {/* ROI */}
            <div className="bg-[#0f0f0f] border border-[#22c55e]/20 rounded-xl p-4 flex items-start gap-3">
              <span className="text-[#22c55e] text-lg mt-0.5">💡</span>
              <div>
                <p className="text-xs text-[#22c55e] uppercase tracking-widest mb-1">Giá trị thực tế</p>
                <p className="text-sm text-[#a0a0a0]">{profile.roi}</p>
              </div>
            </div>

            {/* Setup note */}
            {mode === 'local' && (
              <div className="bg-[#0f0f0f] border border-[#ff5c5c]/10 rounded-xl p-4 text-xs text-[#606060]">
                <span className="text-[#ff5c5c]">⚡ Local AI:</span> Cần cài Ollama miễn phí + tải model một lần (~4GB cho Llama 8B).
                AutoByTaste hỗ trợ setup trong <span className="text-white">24 giờ</span> — không cần tự làm.
              </div>
            )}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-10 p-6 bg-[#0f0f0f] border border-[#ff5c5c]/15 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-white font-semibold mb-1">Bắt đầu với chi phí gần bằng 0</p>
            <p className="text-[#606060] text-sm">Local AI = chỉ tốn tiền điện. Tư vấn miễn phí — setup trong 24 giờ.</p>
          </div>
          <a
            href="https://zalo.me/0337776435"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 bg-[#ff5c5c] hover:bg-[#ff7070] text-white px-6 py-2.5 rounded-full text-sm font-semibold transition-all"
          >
            Tính chi phí cụ thể →
          </a>
        </div>
      </div>
    </section>
  );
};
