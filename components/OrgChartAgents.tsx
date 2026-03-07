
import React, { useState } from 'react';

// Define company types and their agent structures
const companyTypes = [
  {
    id: 'cosmetics',
    name: 'Công ty Thương mại Mỹ phẩm',
    icon: '💄',
    color: 'pink',
    description: 'Mô hình tổ chức AI Agent cho doanh nghiệp thương mại mỹ phẩm, tối ưu bán hàng và chăm sóc khách hàng',
    boss: {
      title: 'CEO / Chủ doanh nghiệp',
      icon: '👔',
      description: 'Ra quyết định chiến lược, theo dõi báo cáo tổng hợp từ các Agent'
    },
    departments: [
      {
        name: 'Phòng Kinh doanh',
        color: 'from-pink-500 to-rose-500',
        agents: [
          {
            name: 'Sales Agent',
            icon: '🛒',
            role: 'Nhân viên bán hàng AI',
            tasks: [
              'Tư vấn sản phẩm mỹ phẩm phù hợp với loại da',
              'Xử lý đơn hàng tự động 24/7',
              'Upsell & cross-sell thông minh',
              'Theo dõi khách hàng tiềm năng'
            ]
          },
          {
            name: 'Social Media Agent',
            icon: '📱',
            role: 'Chuyên viên Marketing số',
            tasks: [
              'Đăng bài tự động lên Facebook, TikTok, Instagram',
              'Trả lời comment & inbox',
              'Phân tích xu hướng mỹ phẩm hot',
              'Tạo nội dung quảng cáo sản phẩm'
            ]
          }
        ]
      },
      {
        name: 'Phòng CSKH',
        color: 'from-purple-500 to-violet-500',
        agents: [
          {
            name: 'Customer Support Agent',
            icon: '🎧',
            role: 'Chuyên viên CSKH',
            tasks: [
              'Trả lời thắc mắc về thành phần, công dụng',
              'Hướng dẫn cách sử dụng sản phẩm',
              'Xử lý khiếu nại, đổi trả hàng',
              'Theo dõi đánh giá & phản hồi khách hàng'
            ]
          },
          {
            name: 'Loyalty Agent',
            icon: '🎁',
            role: 'Chuyên viên chăm sóc VIP',
            tasks: [
              'Quản lý chương trình tích điểm',
              'Gửi voucher sinh nhật tự động',
              'Nhắc nhở khách hàng mua lại',
              'Tư vấn combo sản phẩm riêng cho VIP'
            ]
          }
        ]
      },
      {
        name: 'Phòng Vận hành',
        color: 'from-emerald-500 to-teal-500',
        agents: [
          {
            name: 'Inventory Agent',
            icon: '📦',
            role: 'Quản lý kho hàng',
            tasks: [
              'Theo dõi tồn kho real-time',
              'Cảnh báo hết hàng & hạn sử dụng',
              'Đề xuất nhập hàng theo xu hướng',
              'Quản lý mã vạch, SKU sản phẩm'
            ]
          },
          {
            name: 'Accounting Agent',
            icon: '💰',
            role: 'Kế toán tự động',
            tasks: [
              'Xuất hóa đơn tự động',
              'Theo dõi công nợ, thu chi',
              'Báo cáo doanh thu theo sản phẩm/kênh',
              'Tính lương, hoa hồng nhân viên'
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'rubber',
    name: 'Công ty Sản xuất Cao su',
    icon: '🏭',
    color: 'amber',
    description: 'Mô hình tổ chức AI Agent cho doanh nghiệp sản xuất cao su, tối ưu quy trình sản xuất và chuỗi cung ứng',
    boss: {
      title: 'Giám đốc Nhà máy',
      icon: '👷',
      description: 'Điều hành sản xuất, theo dõi KPI từ các Agent chuyên trách'
    },
    departments: [
      {
        name: 'Phòng Sản xuất',
        color: 'from-amber-500 to-orange-500',
        agents: [
          {
            name: 'Production Agent',
            icon: '⚙️',
            role: 'Quản đốc sản xuất AI',
            tasks: [
              'Lập kế hoạch sản xuất tối ưu',
              'Theo dõi tiến độ từng dây chuyền',
              'Phân bổ nguồn lực máy móc',
              'Cảnh báo sự cố, bảo trì định kỳ'
            ]
          },
          {
            name: 'Quality Agent',
            icon: '✅',
            role: 'Kiểm soát chất lượng',
            tasks: [
              'Kiểm tra chất lượng nguyên liệu đầu vào',
              'Giám sát các chỉ số kỹ thuật',
              'Phân tích lỗi sản phẩm, đề xuất cải tiến',
              'Lập báo cáo QC theo tiêu chuẩn ISO'
            ]
          }
        ]
      },
      {
        name: 'Phòng Cung ứng',
        color: 'from-green-500 to-emerald-500',
        agents: [
          {
            name: 'Procurement Agent',
            icon: '🌿',
            role: 'Chuyên viên mua hàng',
            tasks: [
              'Theo dõi giá mủ cao su thị trường',
              'So sánh báo giá nhà cung cấp',
              'Tự động đặt hàng nguyên liệu',
              'Quản lý hợp đồng với nông trường'
            ]
          },
          {
            name: 'Logistics Agent',
            icon: '🚛',
            role: 'Quản lý vận chuyển',
            tasks: [
              'Tối ưu tuyến đường vận chuyển',
              'Theo dõi đơn hàng xuất khẩu',
              'Quản lý chứng từ hải quan',
              'Phối hợp với đối tác logistics'
            ]
          }
        ]
      },
      {
        name: 'Phòng Kỹ thuật',
        color: 'from-blue-500 to-cyan-500',
        agents: [
          {
            name: 'R&D Agent',
            icon: '🔬',
            role: 'Nghiên cứu phát triển',
            tasks: [
              'Phân tích công thức sản phẩm mới',
              'Nghiên cứu xu hướng ngành cao su',
              'Tối ưu hóa quy trình sản xuất',
              'Thử nghiệm vật liệu mới'
            ]
          },
          {
            name: 'Maintenance Agent',
            icon: '🔧',
            role: 'Bảo trì thiết bị',
            tasks: [
              'Lập lịch bảo trì định kỳ',
              'Dự đoán hỏng hóc máy móc',
              'Quản lý phụ tùng thay thế',
              'Theo dõi hiệu suất thiết bị (OEE)'
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'law',
    name: 'Công ty Tư vấn Luật',
    icon: '⚖️',
    color: 'blue',
    description: 'Mô hình tổ chức AI Agent cho văn phòng luật, tối ưu nghiên cứu pháp lý và quản lý hồ sơ',
    boss: {
      title: 'Luật sư Điều hành',
      icon: '👨‍⚖️',
      description: 'Quản lý các vụ việc quan trọng, đưa ra quyết định pháp lý cuối cùng'
    },
    departments: [
      {
        name: 'Bộ phận Nghiên cứu',
        color: 'from-blue-500 to-indigo-500',
        agents: [
          {
            name: 'Legal Research Agent',
            icon: '📚',
            role: 'Chuyên viên nghiên cứu pháp lý',
            tasks: [
              'Tra cứu văn bản pháp luật liên quan',
              'Phân tích án lệ, tiền lệ',
              'Tổng hợp quy định mới nhất',
              'So sánh luật pháp quốc tế'
            ]
          },
          {
            name: 'Document Agent',
            icon: '📄',
            role: 'Soạn thảo văn bản',
            tasks: [
              'Soạn hợp đồng theo mẫu chuẩn',
              'Kiểm tra điều khoản rủi ro',
              'Dịch tài liệu pháp lý đa ngôn ngữ',
              'Cập nhật theo thay đổi luật'
            ]
          }
        ]
      },
      {
        name: 'Bộ phận Tư vấn',
        color: 'from-purple-500 to-fuchsia-500',
        agents: [
          {
            name: 'Consultation Agent',
            icon: '💬',
            role: 'Tư vấn khách hàng',
            tasks: [
              'Tiếp nhận yêu cầu tư vấn ban đầu',
              'Phân loại vụ việc theo lĩnh vực',
              'Đặt lịch hẹn với luật sư phụ trách',
              'Theo dõi tiến độ vụ việc'
            ]
          },
          {
            name: 'Compliance Agent',
            icon: '🛡️',
            role: 'Tư vấn tuân thủ',
            tasks: [
              'Kiểm tra tuân thủ pháp luật doanh nghiệp',
              'Cảnh báo quy định mới ảnh hưởng',
              'Lập báo cáo compliance định kỳ',
              'Đề xuất cải thiện quy trình nội bộ'
            ]
          }
        ]
      },
      {
        name: 'Bộ phận Hành chính',
        color: 'from-teal-500 to-cyan-500',
        agents: [
          {
            name: 'Case Management Agent',
            icon: '📋',
            role: 'Quản lý hồ sơ',
            tasks: [
              'Lưu trữ, phân loại tài liệu vụ việc',
              'Theo dõi deadline tố tụng',
              'Nhắc nhở lịch hầu tòa',
              'Tổng hợp chi phí theo vụ việc'
            ]
          },
          {
            name: 'Billing Agent',
            icon: '💵',
            role: 'Quản lý thanh toán',
            tasks: [
              'Tính phí dịch vụ theo giờ/vụ việc',
              'Xuất hóa đơn tự động',
              'Theo dõi công nợ khách hàng',
              'Báo cáo doanh thu theo luật sư'
            ]
          }
        ]
      }
    ]
  }
];

const AgentCard: React.FC<{
  agent: typeof companyTypes[0]['departments'][0]['agents'][0];
  color: string;
}> = ({ agent, color }) => (
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
        <p className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">Nhiệm vụ chính:</p>
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

const OrgChart: React.FC<{ company: typeof companyTypes[0] }> = ({ company }) => (
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
              BẠN - NGƯỜI RA QUYẾT ĐỊNH
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
      {company.departments.map((dept, deptIdx) => (
        <div key={dept.name} className="space-y-4">
          {/* Department header */}
          <div className={`text-center p-3 rounded-xl bg-gradient-to-r ${dept.color} bg-opacity-20`}>
            <h4 className="font-bold text-white text-sm">{dept.name}</h4>
          </div>

          {/* Agents in department */}
          <div className="space-y-4">
            {dept.agents.map((agent, agentIdx) => (
              <AgentCard key={agent.name} agent={agent} color={dept.color} />
            ))}
          </div>
        </div>
      ))}
    </div>

    {/* Summary stats */}
    <div className="flex justify-center gap-8 mt-8">
      <div className="text-center">
        <div className="text-3xl font-bold text-gradient">{company.departments.reduce((acc, d) => acc + d.agents.length, 0)}</div>
        <div className="text-xs text-slate-400">AI Agents</div>
      </div>
      <div className="text-center">
        <div className="text-3xl font-bold text-emerald-400">{company.departments.length}</div>
        <div className="text-xs text-slate-400">Phòng ban</div>
      </div>
      <div className="text-center">
        <div className="text-3xl font-bold text-yellow-400">24/7</div>
        <div className="text-xs text-slate-400">Hoạt động</div>
      </div>
    </div>
  </div>
);

export const OrgChartAgents: React.FC = () => {
  const [selectedCompany, setSelectedCompany] = useState(companyTypes[0]);

  return (
    <div className="py-24 bg-gradient-to-b from-[#050505] via-[#0a0a15] to-[#050505]">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-yellow-500/10 border border-yellow-500/20 rounded-full text-xs font-semibold text-yellow-400 mb-4">
            SƠ ĐỒ TỔ CHỨC
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-gradient">Đội ngũ Agent</span> của bạn
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto mb-4">
            Bạn là CEO, dưới quyền là đội ngũ nhân viên AI Agent làm việc 24/7, không nghỉ phép, không cần lương tháng
          </p>
          <p className="text-sm text-slate-500 max-w-3xl mx-auto">
            Mỗi Agent được thiết kế chuyên biệt cho từng vai trò, có khả năng học hỏi và cải thiện theo thời gian.
            Hãy chọn loại hình doanh nghiệp để xem sơ đồ tổ chức mẫu.
          </p>
        </div>

        {/* Company Type Selector */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {companyTypes.map((company) => (
            <button
              key={company.id}
              onClick={() => setSelectedCompany(company)}
              className={`flex items-center gap-3 px-6 py-4 rounded-xl border transition-all duration-300 ${
                selectedCompany.id === company.id
                  ? 'bg-gradient-to-r from-purple-500/20 to-blue-500/20 border-purple-500/50 scale-105'
                  : 'bg-slate-800/50 border-slate-700/50 hover:border-slate-600/50 hover:bg-slate-800/80'
              }`}
            >
              <span className="text-3xl">{company.icon}</span>
              <div className="text-left">
                <div className="font-semibold text-white text-sm">{company.name}</div>
                <div className="text-xs text-slate-400">Xem sơ đồ mẫu</div>
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
          <OrgChart company={selectedCompany} />
        </div>

        {/* Benefits callout */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="glass-card rounded-xl p-6 border-emerald-500/20 text-center">
            <div className="text-3xl mb-3">💰</div>
            <h4 className="font-bold text-white mb-2">Tiết kiệm 70% chi phí</h4>
            <p className="text-sm text-slate-400">So với thuê nhân sự truyền thống cho cùng khối lượng công việc</p>
          </div>
          <div className="glass-card rounded-xl p-6 border-blue-500/20 text-center">
            <div className="text-3xl mb-3">⚡</div>
            <h4 className="font-bold text-white mb-2">Tốc độ xử lý x10</h4>
            <p className="text-sm text-slate-400">Các tác vụ lặp lại được xử lý trong tích tắc, không cần chờ đợi</p>
          </div>
          <div className="glass-card rounded-xl p-6 border-purple-500/20 text-center">
            <div className="text-3xl mb-3">🎯</div>
            <h4 className="font-bold text-white mb-2">Độ chính xác cao</h4>
            <p className="text-sm text-slate-400">Loại bỏ sai sót do con người, đảm bảo nhất quán trong mọi tác vụ</p>
          </div>
        </div>

      </div>
    </div>
  );
};
