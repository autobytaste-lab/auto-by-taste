
import React from 'react';

interface AIAgentPlan {
  name: string;
  price: string;
  priceNote: string;
  agents: string;
  features: string[];
  highlighted?: boolean;
  savings: string;
}

const plans: AIAgentPlan[] = [
  {
    name: "Starter",
    price: "3.000.000đ",
    priceNote: "/tháng",
    agents: "1 AI Agent",
    savings: "Tiết kiệm 7 triệu/tháng so với nhân viên thực",
    features: [
      "Làm việc 24/7 không nghỉ",
      "Trả lời khách hàng tự động",
      "Xử lý email & tin nhắn",
      "Tóm tắt tài liệu",
      "Hỗ trợ qua Zalo",
    ],
  },
  {
    name: "Business",
    price: "8.000.000đ",
    priceNote: "/tháng",
    agents: "3 AI Agents",
    savings: "Tiết kiệm 22 triệu/tháng so với 3 nhân viên",
    highlighted: true,
    features: [
      "Tất cả tính năng Starter",
      "AI Chăm sóc khách hàng",
      "AI Trợ lý bán hàng",
      "AI Xử lý đơn hàng",
      "Tích hợp CRM/ERP",
      "Dashboard báo cáo real-time",
      "Hỗ trợ ưu tiên 24/7",
    ],
  },
  {
    name: "Enterprise",
    price: "15.000.000đ",
    priceNote: "/tháng",
    agents: "Không giới hạn",
    savings: "Tiết kiệm 50+ triệu/tháng cho đội ngũ lớn",
    features: [
      "Tất cả tính năng Business",
      "AI Agents tùy chỉnh theo yêu cầu",
      "Triển khai On-Premise (bảo mật tuyệt đối)",
      "Tích hợp hệ thống nội bộ",
      "Training AI theo quy trình riêng",
      "Account Manager riêng",
      "SLA 99.9% uptime",
    ],
  },
];

const benefits = [
  { icon: "⏰", title: "24/7", desc: "Làm việc không ngừng nghỉ" },
  { icon: "💰", title: "1/5 chi phí", desc: "So với nhân viên thực" },
  { icon: "🚀", title: "Tức thì", desc: "Triển khai trong 24h" },
  { icon: "📈", title: "Mở rộng", desc: "Scale không giới hạn" },
];

export const ServicePricing: React.FC = () => {
  return (
    <div className="py-24 bg-[#050505]">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center space-x-2 bg-green-500/10 border border-green-500/20 rounded-full px-4 py-1.5 mb-6">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-xs font-bold text-green-400 tracking-wider uppercase">Nhân sự AI sẵn sàng làm việc</span>
            </div>
            <h2 className="text-3xl lg:text-5xl font-bold text-white mb-4">Thuê AI Agent Theo Tháng</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">Không cần tuyển dụng, không cần đào tạo. AI Agent bắt đầu làm việc ngay lập tức.</p>
          </div>

          {/* Benefits Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            {benefits.map((b, i) => (
              <div key={i} className="text-center p-4 glass-card rounded-2xl">
                <div className="text-3xl mb-2">{b.icon}</div>
                <div className="text-xl font-bold text-white">{b.title}</div>
                <div className="text-xs text-slate-400">{b.desc}</div>
              </div>
            ))}
          </div>

          {/* Pricing Cards */}
          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            {plans.map((plan, idx) => (
              <div
                key={idx}
                className={`relative p-8 rounded-[2.5rem] flex flex-col ${
                  plan.highlighted
                    ? 'bg-green-600/10 border-2 border-green-500/50'
                    : 'glass-card'
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-green-500 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                    Phổ biến nhất
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <div className="text-sm text-blue-400 font-semibold">{plan.agents}</div>
                </div>

                <div className="mb-6">
                  <div className="flex items-end">
                    <span className="text-4xl font-extrabold text-white">{plan.price}</span>
                    <span className="text-slate-400 ml-1">{plan.priceNote}</span>
                  </div>
                  <p className="text-xs text-green-400 mt-2">{plan.savings}</p>
                </div>

                <ul className="space-y-3 mb-8 flex-grow">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start text-sm text-slate-300">
                      <span className="text-green-500 mr-2 mt-0.5">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <a
                  href="https://zalo.me/0337776435"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full py-4 rounded-2xl font-bold transition-all text-center block ${
                    plan.highlighted
                      ? 'bg-green-600 hover:bg-green-500 text-white'
                      : 'bg-white/5 hover:bg-white/10 text-white'
                  }`}
                >
                  Thuê ngay
                </a>
              </div>
            ))}
          </div>

          {/* Comparison with Human Employee */}
          <div className="glass-card rounded-3xl p-8 border border-white/10">
            <h3 className="text-xl font-bold text-white mb-6 text-center">So sánh: AI Agent vs Nhân viên thực</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3 text-slate-400 font-medium">Tiêu chí</th>
                    <th className="text-center py-3 text-green-400 font-bold">AI Agent</th>
                    <th className="text-center py-3 text-slate-400 font-medium">Nhân viên</th>
                  </tr>
                </thead>
                <tbody className="text-slate-300">
                  <tr className="border-b border-white/5">
                    <td className="py-3">Chi phí/tháng</td>
                    <td className="text-center text-green-400 font-semibold">3-15 triệu</td>
                    <td className="text-center">10-30 triệu</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-3">Thời gian làm việc</td>
                    <td className="text-center text-green-400 font-semibold">24/7</td>
                    <td className="text-center">8h/ngày</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-3">Nghỉ phép/ốm</td>
                    <td className="text-center text-green-400 font-semibold">Không</td>
                    <td className="text-center">12-20 ngày/năm</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-3">Thời gian đào tạo</td>
                    <td className="text-center text-green-400 font-semibold">24 giờ</td>
                    <td className="text-center">1-3 tháng</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-3">Mở rộng đội ngũ</td>
                    <td className="text-center text-green-400 font-semibold">Tức thì</td>
                    <td className="text-center">2-4 tuần</td>
                  </tr>
                  <tr>
                    <td className="py-3">Bảo hiểm/phúc lợi</td>
                    <td className="text-center text-green-400 font-semibold">Không cần</td>
                    <td className="text-center">+20-30% lương</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="text-center mt-12">
            <a
              href="https://zalo.me/0337776435"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-3 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-500 hover:to-blue-500 text-white font-bold py-5 px-10 rounded-2xl shadow-xl shadow-green-600/20 transition-all text-lg"
            >
              <span>Tư vấn miễn phí qua Zalo</span>
              <img src="https://img.icons8.com/color/48/zalo.png" alt="Zalo" className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
