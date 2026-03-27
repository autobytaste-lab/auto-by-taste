import React, { useState } from 'react';

// ===== BẢNG GIÁ THỰC TẾ (cập nhật Q1 2026) =====
// Tỷ giá: 1 USD = 25,500 VNĐ
// Đơn vị: USD / 1M tokens
// Claude Haiku 3.5:  input $0.80 / output $4.00
// Claude Sonnet 4:   input $3.00 / output $15.00
// GPT-4o mini:       input $0.15 / output $0.60
// GPT-4o:            input $2.50 / output $10.00
// Gemini 2.0 Flash:  input $0.10 / output $0.40
// Local (Ollama):    $0 / $0  (chỉ tốn điện)

const USD = 25500; // VNĐ
const toVND = (usd: number) => Math.round(usd * USD);

// Tính chi phí cloud theo token thực tế
// inputK: nghìn tokens input/ngày, outputK: nghìn tokens output/ngày
const calcCloud = (inputK: number, outputK: number, inputPrice: number, outputPrice: number) =>
  toVND((inputK * inputPrice + outputK * outputPrice) / 1000);

interface ModelOption {
  name: string;
  costPerDay: number;
  note: string;
}

interface Profile {
  id: string;
  icon: string;
  title: string;
  role: string;
  dailyTasks: string[];
  inputKPerDay: number;   // nghìn tokens input
  outputKPerDay: number;  // nghìn tokens output
  usageNote: string;
  modelOptions: ModelOption[];
  electricPerDay: number;
  localElectric: number;
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
      '~50 lượt chat/ngày',
      'Soạn email, đề xuất, brief',
      'Tóm tắt tài liệu ngắn',
      'Nhắc lịch, nghiên cứu nhanh',
    ],
    inputKPerDay: 50,   // ~50K tokens input
    outputKPerDay: 25,  // ~25K tokens output
    usageNote: '50 lượt × ~1.5K input + 500 output tokens',
    modelOptions: [
      { name: 'Gemini 2.0 Flash', costPerDay: calcCloud(50, 25, 0.10, 0.40), note: 'Rẻ nhất, đủ dùng' },
      { name: 'GPT-4o mini', costPerDay: calcCloud(50, 25, 0.15, 0.60), note: 'Phổ biến, ổn định' },
      { name: 'Claude Haiku 3.5', costPerDay: calcCloud(50, 25, 0.80, 4.00), note: 'Chất lượng cao hơn' },
      { name: 'Claude Sonnet 4', costPerDay: calcCloud(50, 25, 3.00, 15.00), note: 'Premium, overkill cho use case này' },
    ],
    electricPerDay: 1500,
    localElectric: 1500,
    roi: 'Tiết kiệm 2-3 giờ/ngày soạn nội dung — tương đương 150.000-300.000đ công việc',
    color: '#14b8a6',
  },
  {
    id: 'salesperson',
    icon: '🤝',
    title: 'Nhân viên Kinh doanh',
    role: 'Sales, account manager, tư vấn',
    dailyTasks: [
      '~80 lượt chat/ngày (inbox + báo cáo)',
      'Soạn email chào hàng cá nhân hóa',
      'Phân tích khách hàng, pipeline',
      'Trả lời Zalo/Messenger tự động',
    ],
    inputKPerDay: 80,
    outputKPerDay: 60,
    usageNote: '80 lượt × ~1.5K input + 750 output tokens',
    modelOptions: [
      { name: 'Gemini 2.0 Flash', costPerDay: calcCloud(80, 60, 0.10, 0.40), note: 'Rẻ nhất' },
      { name: 'GPT-4o mini', costPerDay: calcCloud(80, 60, 0.15, 0.60), note: 'Khuyên dùng' },
      { name: 'Claude Haiku 3.5', costPerDay: calcCloud(80, 60, 0.80, 4.00), note: 'Chất lượng văn phong tốt' },
      { name: 'GPT-4o', costPerDay: calcCloud(80, 60, 2.50, 10.00), note: 'Overkill cho sales thông thường' },
    ],
    electricPerDay: 2000,
    localElectric: 2000,
    roi: 'Xử lý 2-3x lượng leads/ngày — doanh thu tiềm năng tăng 5-15 triệu/tháng',
    color: '#f59e0b',
  },
  {
    id: 'developer',
    icon: '👨‍💻',
    title: 'Lập trình viên',
    role: 'Backend, frontend, fullstack dev',
    dailyTasks: [
      '~150 lượt/ngày (code nặng token)',
      'Code review, fix bug, refactor',
      'Viết test, docs, debug logs',
      'Research stack, PR comments',
    ],
    inputKPerDay: 450,   // code context dài
    outputKPerDay: 300,
    usageNote: '150 lượt × ~3K input + 2K output tokens (code dài hơn text)',
    modelOptions: [
      { name: 'GPT-4o mini', costPerDay: calcCloud(450, 300, 0.15, 0.60), note: 'Rẻ nhưng code yếu hơn' },
      { name: 'Claude Haiku 3.5', costPerDay: calcCloud(450, 300, 0.80, 4.00), note: 'Tốt cho code cơ bản' },
      { name: 'GPT-4o', costPerDay: calcCloud(450, 300, 2.50, 10.00), note: 'Code mạnh, chi phí cao' },
      { name: 'Claude Sonnet 4', costPerDay: calcCloud(450, 300, 3.00, 15.00), note: 'Mạnh nhất, đắt nhất' },
    ],
    electricPerDay: 8000,
    localElectric: 8000,
    roi: 'Code nhanh gấp 2-3x — thay thế GitHub Copilot (~70.000đ/ngày) với chất lượng cao hơn',
    color: '#8b5cf6',
  },
  {
    id: 'marketer',
    icon: '📣',
    title: 'Marketer / Content Creator',
    role: 'Digital marketing, social media, SEO',
    dailyTasks: [
      '~100 lượt/ngày (content dài)',
      'Viết bài Facebook, TikTok, Blog',
      'Nghiên cứu từ khóa, đối thủ',
      'Phân tích chiến dịch, báo cáo',
    ],
    inputKPerDay: 120,
    outputKPerDay: 100,
    usageNote: '100 lượt × ~1.2K input + 1K output tokens (content dài)',
    modelOptions: [
      { name: 'Gemini 2.0 Flash', costPerDay: calcCloud(120, 100, 0.10, 0.40), note: 'Rẻ nhất' },
      { name: 'GPT-4o mini', costPerDay: calcCloud(120, 100, 0.15, 0.60), note: 'Phổ biến nhất' },
      { name: 'Claude Haiku 3.5', costPerDay: calcCloud(120, 100, 0.80, 4.00), note: 'Văn phong tự nhiên hơn' },
      { name: 'Claude Sonnet 4', costPerDay: calcCloud(120, 100, 3.00, 15.00), note: 'Chất lượng premium' },
    ],
    electricPerDay: 3000,
    localElectric: 3000,
    roi: 'Sản xuất content 5-10x — thay Jasper/Copy.ai (~150.000-300.000đ/ngày)',
    color: '#ec4899',
  },
  {
    id: 'manager',
    icon: '👔',
    title: 'Quản lý / Giám đốc',
    role: 'CEO, manager, team lead',
    dailyTasks: [
      '~60 lượt/ngày (báo cáo dài)',
      'Tóm tắt email, meeting notes',
      'Phân tích KPI, báo cáo',
      'Soạn tài liệu chiến lược',
    ],
    inputKPerDay: 200,   // báo cáo, tài liệu dài
    outputKPerDay: 80,
    usageNote: '60 lượt × ~3.3K input + 1.3K output tokens (docs dài)',
    modelOptions: [
      { name: 'GPT-4o mini', costPerDay: calcCloud(200, 80, 0.15, 0.60), note: 'Tiết kiệm' },
      { name: 'Gemini 2.0 Flash', costPerDay: calcCloud(200, 80, 0.10, 0.40), note: 'Rẻ nhất' },
      { name: 'Claude Haiku 3.5', costPerDay: calcCloud(200, 80, 0.80, 4.00), note: 'Phân tích tốt hơn' },
      { name: 'GPT-4o', costPerDay: calcCloud(200, 80, 2.50, 10.00), note: 'Khuyên dùng cho quyết định quan trọng' },
    ],
    electricPerDay: 4000,
    localElectric: 4000,
    roi: 'Tiết kiệm 1-2 giờ admin/ngày — tương đương thư ký AI 150.000-300.000đ/ngày',
    color: '#3b82f6',
  },
  {
    id: 'legal',
    icon: '⚖️',
    title: 'Luật sư / Tư vấn pháp lý',
    role: 'Luật sư, pháp chế doanh nghiệp',
    dailyTasks: [
      '~40 lượt/ngày (hồ sơ rất dài)',
      'Nghiên cứu văn bản pháp luật',
      'Soạn hợp đồng, tờ trình',
      'Tóm tắt hồ sơ, tra cứu án lệ',
    ],
    inputKPerDay: 300,   // hợp đồng, hồ sơ rất dài
    outputKPerDay: 100,
    usageNote: '40 lượt × ~7.5K input + 2.5K output (hồ sơ dài 20-50 trang)',
    modelOptions: [
      { name: '⚠️ Cloud (rủi ro bảo mật)', costPerDay: calcCloud(300, 100, 0.80, 4.00), note: 'KHÔNG KHUYẾN NGHỊ — dữ liệu khách hàng lên cloud' },
      { name: 'Claude Sonnet 4 (cloud)', costPerDay: calcCloud(300, 100, 3.00, 15.00), note: 'Mạnh nhưng vi phạm PDPA' },
      { name: '✅ Llama 3.1 70B (local)', costPerDay: 0, note: 'KHUYẾN NGHỊ — hoàn toàn offline, bảo mật 100%' },
      { name: '✅ DeepSeek R1 (local)', costPerDay: 0, note: 'Lý luận pháp lý xuất sắc, local hoàn toàn' },
    ],
    electricPerDay: 10000,
    localElectric: 10000,
    roi: 'Nghiên cứu pháp lý 10x nhanh hơn — 2 tiếng xuống 12 phút. Bảo vệ bí mật nghề nghiệp.',
    color: '#ff5c5c',
  },
];

const DAYS_PER_MONTH = 22;

export const CostCalculator: React.FC = () => {
  const [selected, setSelected] = useState(0);
  const [modelIdx, setModelIdx] = useState(0);
  const [mode, setMode] = useState<'cloud' | 'local'>('local');

  const profile = profiles[selected];
  const selectedModel = profile.modelOptions[modelIdx] || profile.modelOptions[0];

  const cloudDailyCost = selectedModel.costPerDay + profile.electricPerDay;
  const localDailyCost = profile.localElectric;
  const dailyCost = mode === 'cloud' ? cloudDailyCost : localDailyCost;
  const monthlyCost = dailyCost * DAYS_PER_MONTH;
  const yearlyCost = monthlyCost * 12;
  const savingMonthly = (cloudDailyCost - localDailyCost) * DAYS_PER_MONTH;

  // reset model when profile changes
  const handleSelectProfile = (i: number) => { setSelected(i); setModelIdx(0); };

  const fmt = (n: number) => n >= 1000 ? n.toLocaleString('vi-VN') + 'đ' : n + 'đ';

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
                onClick={() => handleSelectProfile(i)}
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
            {/* Model selector (cloud mode) */}
            {mode === 'cloud' && (
              <div className="bg-[#0f0f0f] border border-[#1a1a1a] rounded-xl p-4">
                <p className="text-xs text-[#ff5c5c] uppercase tracking-widest mb-3">› Chọn model AI</p>
                <div className="space-y-2">
                  {profile.modelOptions.map((m, i) => (
                    <button
                      key={i}
                      onClick={() => setModelIdx(i)}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg border text-left transition-all text-xs ${
                        modelIdx === i ? 'bg-[#ff5c5c]/10 border-[#ff5c5c]/30 text-white' : 'border-[#1a1a1a] text-[#606060] hover:text-white'
                      }`}
                    >
                      <span className="font-mono">{m.name}</span>
                      <div className="text-right">
                        <span className={`font-bold ${modelIdx === i ? 'text-[#ff5c5c]' : ''}`}>
                          {m.costPerDay === 0 ? 'Local' : fmt(m.costPerDay) + '/ngày'}
                        </span>
                        <span className="text-[#404040] ml-2 hidden sm:inline">{m.note}</span>
                      </div>
                    </button>
                  ))}
                </div>
                <p className="text-[10px] text-[#404040] mt-3">{profile.usageNote}</p>
              </div>
            )}

            {/* Cost summary cards */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: 'Chi phí / Ngày', value: fmt(dailyCost), sub: `${DAYS_PER_MONTH} ngày làm/tháng` },
                { label: 'Chi phí / Tháng', value: fmt(monthlyCost), sub: mode === 'local' ? `Tiết kiệm ${fmt(savingMonthly)}/tháng` : `vs Local: tiết kiệm ${fmt(savingMonthly)}/tháng` },
                { label: 'Chi phí / Năm', value: fmt(yearlyCost), sub: `Tiết kiệm vs cloud: ${fmt(savingMonthly * 12)}/năm` },
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
              <p className="text-xs text-[#ff5c5c] uppercase tracking-widest mb-4">› So sánh chi phí / ngày</p>
              <div className="space-y-0">
                <div className="grid grid-cols-4 gap-2 pb-2 border-b border-[#1a1a1a] mb-2">
                  <div className="text-[10px] text-[#404040] col-span-2">Khoản mục</div>
                  <div className="text-[10px] text-[#ff5c5c] text-right">☁️ Cloud</div>
                  <div className="text-[10px] text-[#22c55e] text-right">🖥️ Local</div>
                </div>
                <div className="grid grid-cols-4 gap-2 py-2 border-b border-[#111]">
                  <div className="text-xs text-[#a0a0a0] col-span-2">API calls ({selectedModel.name.replace('⚠️ ', '').replace('✅ ', '')})</div>
                  <div className="text-xs text-[#ff5c5c] text-right">{fmt(selectedModel.costPerDay)}</div>
                  <div className="text-xs text-[#22c55e] text-right font-medium">0đ</div>
                </div>
                <div className="grid grid-cols-4 gap-2 py-2 border-b border-[#111]">
                  <div className="text-xs text-[#a0a0a0] col-span-2">Điện năng ({mode === 'cloud' ? 'PC nhẹ' : 'GPU/CPU chạy model'})</div>
                  <div className="text-xs text-[#606060] text-right">{fmt(profile.electricPerDay)}</div>
                  <div className="text-xs text-[#22c55e] text-right">{fmt(profile.localElectric)}</div>
                </div>
                <div className="grid grid-cols-4 gap-2 py-2 border-b border-[#111]">
                  <div className="text-xs text-[#a0a0a0] col-span-2">OpenClaw software</div>
                  <div className="text-xs text-[#606060] text-right">Miễn phí</div>
                  <div className="text-xs text-[#22c55e] text-right">Miễn phí</div>
                </div>
                <div className="grid grid-cols-4 gap-2 pt-3 mt-1">
                  <div className="text-xs font-semibold text-white col-span-2">Tổng / ngày</div>
                  <div className="text-xs text-[#ff5c5c] text-right font-bold">{fmt(cloudDailyCost)}</div>
                  <div className="text-xs text-[#22c55e] text-right font-bold">{fmt(localDailyCost)}</div>
                </div>
                <div className="grid grid-cols-4 gap-2 pt-1">
                  <div className="text-xs text-[#404040] col-span-2">Tiết kiệm khi dùng Local</div>
                  <div className="col-span-2 text-right text-xs font-semibold text-[#22c55e]">
                    {fmt(savingMonthly)}/tháng · {fmt(savingMonthly * 12)}/năm
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
