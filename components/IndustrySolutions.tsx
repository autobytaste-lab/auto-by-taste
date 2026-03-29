import React, { useState } from 'react';

interface Task {
  label: string;
  before: string;
  after: string;
  icon: string;
}

interface Industry {
  id: string;
  icon: string;
  name: string;
  subtitle: string;
  painPoint: string;
  agents: { name: string; icon: string; role: string }[];
  tasks: Task[];
  result: string;
  channel: string;
}

const industries: Industry[] = [
  {
    id: 'shop',
    icon: '🛍️',
    name: 'Shop Online / Bán lẻ',
    subtitle: 'Mỹ phẩm, thời trang, thực phẩm, đồ gia dụng...',
    painPoint: 'Inbox Zalo ngập, không kịp trả lời khách, bỏ lỡ đơn hàng ngoài giờ',
    agents: [
      { name: 'Sales Agent', icon: '🛒', role: 'Tư vấn & chốt đơn 24/7' },
      { name: 'CSKH Agent', icon: '🎧', role: 'Chăm sóc sau bán hàng' },
      { name: 'Kho Agent', icon: '📦', role: 'Theo dõi tồn kho' },
    ],
    tasks: [
      { icon: '💬', label: 'Trả lời khách hỏi giá/tồn kho', before: 'Chờ 30 phút đến 2 tiếng', after: 'Tự động trong 10 giây, kể cả 2h sáng' },
      { icon: '📋', label: 'Xác nhận đơn hàng', before: 'Gõ thủ công từng đơn', after: 'AI hỏi địa chỉ, xác nhận, gửi thông tin thanh toán tự động' },
      { icon: '📦', label: 'Cập nhật tracking', before: 'Khách tự hỏi, bạn tự tìm', after: 'AI tự gửi tracking khi đơn được ship' },
      { icon: '💝', label: 'Nhắc khách tái mua', before: 'Không có thời gian nhắc', after: 'AI nhắn đúng lúc sản phẩm sắp hết theo chu kỳ sử dụng' },
    ],
    result: 'Doanh thu tăng 20-40%. Tiết kiệm 3-4 giờ CSKH mỗi ngày.',
    channel: 'Zalo, Facebook Messenger, Telegram',
  },
  {
    id: 'clinic',
    icon: '🏥',
    name: 'Phòng khám / Spa / Salon',
    subtitle: 'Nha khoa, da liễu, thẩm mỹ, massage, tóc...',
    painPoint: 'Lịch hẹn bị bỏ lỡ, khách không được nhắc, nhân viên mất thời gian nghe điện thoại',
    agents: [
      { name: 'Booking Agent', icon: '📅', role: 'Đặt lịch hẹn 24/7' },
      { name: 'Reminder Agent', icon: '⏰', role: 'Nhắc lịch tự động' },
      { name: 'Tư vấn Agent', icon: '💆', role: 'Trả lời câu hỏi dịch vụ' },
    ],
    tasks: [
      { icon: '📅', label: 'Đặt lịch hẹn', before: 'Gọi điện trong giờ hành chính', after: 'Đặt qua Zalo 24/7, AI xác nhận và ghi lịch ngay' },
      { icon: '🔔', label: 'Nhắc lịch hẹn', before: 'Nhân viên gọi từng người, hay quên', after: 'AI nhắn tự động 24h và 1h trước giờ hẹn' },
      { icon: '❓', label: 'Tư vấn dịch vụ', before: 'Khách hỏi ngoài giờ không ai trả lời', after: 'AI trả lời giá, thời gian, phù hợp loại da/răng ngay lập tức' },
      { icon: '🔄', label: 'Nhắc tái khám', before: 'Không ai theo dõi lịch tái khám', after: 'AI tự nhắn đúng hạn theo chu kỳ điều trị' },
    ],
    result: 'Giảm 70% lịch bỏ hẹn. Tăng 40% số lịch hẹn (đặt ngoài giờ).',
    channel: 'Zalo, Telegram, Website chatbot',
  },
  {
    id: 'realestate',
    icon: '🏗️',
    name: 'Bất động sản',
    subtitle: 'Môi giới, chủ đầu tư, quản lý cho thuê...',
    painPoint: 'Khách hỏi liên tục nhưng chưa đủ thông tin, lead không được follow up kịp',
    agents: [
      { name: 'Lead Agent', icon: '🎯', role: 'Thu thập & phân loại lead' },
      { name: 'Tư vấn Agent', icon: '🏠', role: 'Tư vấn dự án, gửi tài liệu' },
      { name: 'Follow-up Agent', icon: '📞', role: 'Tự động nhắc lại với khách' },
    ],
    tasks: [
      { icon: '🔍', label: 'Tư vấn dự án', before: 'Môi giới phải nhớ và trả lời từng tin', after: 'AI tư vấn diện tích, giá, pháp lý, gửi file brochure ngay lập tức' },
      { icon: '👤', label: 'Thu thập thông tin khách', before: 'Ghi chép thủ công, hay thiếu sót', after: 'AI hỏi đúng thứ tự: nhu cầu, ngân sách, thời gian mua — tự lưu vào hệ thống' },
      { icon: '📤', label: 'Gửi tài liệu dự án', before: 'Tìm file, copy link, gửi thủ công', after: 'AI gửi đúng loại tài liệu theo nhu cầu khách ngay khi được hỏi' },
      { icon: '🔁', label: 'Follow up khách lạnh', before: 'Quên mất khách cũ sau vài tuần', after: 'AI tự nhắn lại sau 7/14/30 ngày với nội dung phù hợp' },
    ],
    result: 'Tăng 50% lead được chăm sóc. Không bỏ sót khách tiềm năng nào.',
    channel: 'Zalo, Zalo OA, Website',
  },
  {
    id: 'education',
    icon: '📚',
    name: 'Giáo dục / Đào tạo',
    subtitle: 'Trung tâm ngoại ngữ, kỹ năng, coaching, online course...',
    painPoint: 'Học viên hỏi nhiều, nhắc lịch học thủ công, không theo dõi được tiến độ từng người',
    agents: [
      { name: 'Tư vấn Agent', icon: '🎓', role: 'Tư vấn khóa học, nhận học phí' },
      { name: 'Học tập Agent', icon: '📖', role: 'Nhắc lịch, gửi tài liệu' },
      { name: 'Hỗ trợ Agent', icon: '🤝', role: 'Trả lời câu hỏi học viên' },
    ],
    tasks: [
      { icon: '❓', label: 'Tư vấn khóa học', before: 'Nhân viên giải thích từng người', after: 'AI trả lời học phí, lịch học, giáo viên, cam kết đầu ra ngay lập tức' },
      { icon: '📅', label: 'Nhắc lịch học', before: 'Gửi thủ công trong group, hay bỏ sót', after: 'AI tự động nhắc đúng giờ, đúng phòng, đúng học viên' },
      { icon: '📄', label: 'Gửi tài liệu học', before: 'Upload thủ công lên group sau mỗi buổi', after: 'AI gửi tự động theo tiến trình khóa học' },
      { icon: '📊', label: 'Báo cáo tiến độ học viên', before: 'Không ai tổng hợp được', after: 'AI báo cáo điểm, tỉ lệ chuyên cần, cảnh báo học viên có nguy cơ bỏ học' },
    ],
    result: 'Tăng 35% tỉ lệ hoàn thành khóa học. Giảm 60% thời gian admin.',
    channel: 'Zalo, Telegram, Group Zalo',
  },
  {
    id: 'service',
    icon: '⚙️',
    name: 'Dịch vụ B2B / Văn phòng',
    subtitle: 'Kế toán, tư vấn, IT, thiết kế, marketing agency...',
    painPoint: 'Nhiều email/Zalo chưa xử lý, báo giá chậm, khách phải chờ lâu mới có phản hồi',
    agents: [
      { name: 'Email Agent', icon: '📧', role: 'Phân loại & tóm tắt email' },
      { name: 'Báo giá Agent', icon: '💰', role: 'Soạn báo giá theo template' },
      { name: 'Dự án Agent', icon: '📋', role: 'Cập nhật tiến độ tự động' },
    ],
    tasks: [
      { icon: '📧', label: 'Xử lý email khách hàng', before: 'Đọc và trả lời từng email mất 2-3 tiếng/ngày', after: 'AI tóm tắt buổi sáng: 3 email quan trọng cần xử lý, 20 email đã trả lời tự động' },
      { icon: '💵', label: 'Gửi báo giá', before: 'Soạn thủ công mỗi lần, mất 30-60 phút', after: 'AI soạn từ template theo thông tin khách, bạn review 5 phút rồi gửi' },
      { icon: '📊', label: 'Báo cáo tiến độ dự án', before: 'Khách hỏi thường xuyên, mất thời gian cập nhật', after: 'AI gửi báo cáo tiến độ tự động vào group Zalo mỗi tuần' },
      { icon: '🗓️', label: 'Quản lý lịch họp', before: 'Nhắn qua lại để chọn giờ, hay nhầm lịch', after: 'AI tìm giờ trống chung, gửi lịch, nhắc trước 1 tiếng' },
    ],
    result: 'Tiết kiệm 2-3 tiếng admin/ngày. Phản hồi khách nhanh gấp 10 lần.',
    channel: 'Email, Zalo, Telegram',
  },
  {
    id: 'restaurant',
    icon: '🍜',
    name: 'Nhà hàng / F&B',
    subtitle: 'Nhà hàng, quán cà phê, tiệm bánh, catering...',
    painPoint: 'Đặt bàn qua điện thoại tốn nhân lực, khách đặt rồi không đến, khó quản lý số lượng',
    agents: [
      { name: 'Đặt bàn Agent', icon: '🍽️', role: 'Nhận đặt bàn 24/7' },
      { name: 'Menu Agent', icon: '📋', role: 'Tư vấn món ăn, combo' },
      { name: 'Loyalty Agent', icon: '⭐', role: 'Chăm sóc khách thân thiết' },
    ],
    tasks: [
      { icon: '📅', label: 'Đặt bàn & đặt tiệc', before: 'Gọi điện trong giờ mở cửa, hay bận máy', after: 'Đặt bàn qua Zalo 24/7, AI xác nhận ngay, nhắc 2 giờ trước' },
      { icon: '🍽️', label: 'Tư vấn thực đơn', before: 'Nhân viên phải giải thích từng món', after: 'AI tư vấn món phù hợp theo số người, dịp đặc biệt, ngân sách' },
      { icon: '🎂', label: 'Đặt tiệc sinh nhật / sự kiện', before: 'Phức tạp, cần gặp trực tiếp bàn', after: 'AI thu thập thông tin: số người, ngân sách, yêu cầu đặc biệt — gửi báo giá trong ngày' },
      { icon: '⭐', label: 'Chăm sóc khách thân thiết', before: 'Không ai nhớ ngày sinh nhật khách VIP', after: 'AI tự gửi ưu đãi sinh nhật, nhắc kỷ niệm, gợi ý đặt bàn theo dịp' },
    ],
    result: 'Giảm 60% cuộc gọi đặt bàn. Tăng 25% tỉ lệ khách quay lại.',
    channel: 'Zalo, Facebook Messenger',
  },
  {
    id: 'logistics',
    icon: '🚚',
    name: 'Vận tải / Logistics',
    subtitle: 'Vận chuyển hàng hoá, kho bãi, xuất nhập khẩu...',
    painPoint: 'Khách liên tục hỏi trạng thái hàng, chứng từ phức tạp, báo cáo chậm',
    agents: [
      { name: 'Tracking Agent', icon: '📍', role: 'Cập nhật vị trí đơn hàng' },
      { name: 'Chứng từ Agent', icon: '📄', role: 'Xử lý và gửi chứng từ' },
      { name: 'Báo cáo Agent', icon: '📊', role: 'Tổng hợp báo cáo tự động' },
    ],
    tasks: [
      { icon: '📍', label: 'Cập nhật tracking hàng', before: 'Khách gọi/nhắn liên tục hỏi "hàng đến đâu rồi"', after: 'AI tự cập nhật và gửi thông báo chủ động khi có thay đổi trạng thái' },
      { icon: '📄', label: 'Gửi chứng từ vận chuyển', before: 'Tìm file, gửi email thủ công cho từng khách', after: 'AI tự gửi đúng loại chứng từ đúng thời điểm (khi hàng thông quan, khi giao)' },
      { icon: '⚠️', label: 'Cảnh báo sự cố', before: 'Khách phát hiện trễ mới biết', after: 'AI cảnh báo chủ động khi hàng bị giữ, thời tiết xấu, delay' },
      { icon: '📊', label: 'Báo cáo định kỳ cho khách', before: 'Làm Excel tổng hợp mất nhiều giờ', after: 'AI tự tạo báo cáo vận chuyển hàng tháng gửi cho từng khách hàng' },
    ],
    result: 'Giảm 80% cuộc gọi hỏi tracking. Tăng sự hài lòng khách hàng.',
    channel: 'Zalo, Email, Telegram',
  },
  {
    id: 'freelance',
    icon: '💼',
    name: 'Freelancer / Cá nhân',
    subtitle: 'Designer, developer, photographer, content creator...',
    painPoint: 'Quản lý nhiều client cùng lúc, deadline rối, báo giá mất thời gian, email chất đống',
    agents: [
      { name: 'Quản lý dự án Agent', icon: '🗂️', role: 'Theo dõi deadline & deliverable' },
      { name: 'Client Agent', icon: '🤝', role: 'Giao tiếp & cập nhật client' },
      { name: 'Admin Agent', icon: '📝', role: 'Hóa đơn, báo giá, email' },
    ],
    tasks: [
      { icon: '⏰', label: 'Quản lý deadline nhiều dự án', before: 'Dùng Notion/Excel theo dõi thủ công, hay quên', after: 'AI nhắc deadline hàng ngày, cảnh báo khi sắp trễ, tóm tắt việc cần làm buổi sáng' },
      { icon: '💌', label: 'Update tiến độ cho client', before: 'Quên cập nhật, khách tự hỏi', after: 'AI tự gửi update tiến độ theo lịch đã định, bạn chỉ cần approve nội dung' },
      { icon: '💵', label: 'Gửi báo giá & hóa đơn', before: 'Soạn từ đầu mỗi lần, mất 30 phút', after: 'AI soạn từ template trong 2 phút, bạn review và gửi' },
      { icon: '📧', label: 'Quản lý email công việc', before: 'Inbox ngập, hay bỏ lỡ email quan trọng', after: 'AI tóm tắt email quan trọng mỗi sáng, trả lời các email thường theo template' },
    ],
    result: 'Tiết kiệm 2 tiếng admin/ngày. Không bao giờ bỏ lỡ deadline hay email quan trọng.',
    channel: 'Email, Telegram, Zalo',
  },
];

export const IndustrySolutions: React.FC = () => {
  const [selected, setSelected] = useState<string | null>(null);
  const activeIndustry = industries.find(i => i.id === selected);

  return (
    <section className="py-24 px-6 border-t border-[#1a1a1a] bg-[#000]" id="industry-solutions">
      <div className="max-w-[980px] mx-auto">

        {/* Header */}
        <div className="mb-12">
          <p className="text-xs font-medium text-[#4ade80] tracking-[0.2em] uppercase mb-4">
            › Thuê AI Agent Theo Ngành
          </p>
          <h2 className="text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4">
            Thuê nhân sự AI<br />
            <span className="text-[#606060]">cho ngành của bạn</span>
          </h2>
          <p className="text-[#606060] text-base max-w-xl">
            Chọn lĩnh vực kinh doanh — xem đội ngũ AI Agent được thiết kế riêng cho ngành của bạn.
          </p>
        </div>

        {/* Industry grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
          {industries.map((ind) => (
            <button
              key={ind.id}
              onClick={() => setSelected(selected === ind.id ? null : ind.id)}
              className={`flex flex-col items-center gap-2 p-4 rounded-xl border text-center transition-all duration-200 ${
                selected === ind.id
                  ? 'bg-[#4ade80]/10 border-[#4ade80]/50 scale-[1.02]'
                  : 'bg-[#0f0f0f] border-[#1a1a1a] hover:border-[#4ade80]/30 hover:bg-[#4ade80]/5'
              }`}
            >
              <span className="text-3xl">{ind.icon}</span>
              <span className={`text-xs font-medium leading-tight ${selected === ind.id ? 'text-white' : 'text-[#888]'}`}>
                {ind.name}
              </span>
            </button>
          ))}
        </div>

        {/* Detail panel */}
        {activeIndustry && (
          <div className="animate-fade-in-up space-y-6">

            {/* Pain point */}
            <div className="bg-[#0f0f0f] border border-[#4ade80]/15 rounded-2xl p-5">
              <div className="flex items-start gap-3">
                <span className="text-3xl mt-0.5">{activeIndustry.icon}</span>
                <div>
                  <h3 className="text-white font-bold text-lg mb-0.5">{activeIndustry.name}</h3>
                  <p className="text-[#606060] text-xs mb-3">{activeIndustry.subtitle}</p>
                  <div className="flex items-start gap-2">
                    <span className="text-[#f59e0b] text-sm mt-0.5">⚠️</span>
                    <p className="text-[#f59e0b] text-sm italic">"{activeIndustry.painPoint}"</p>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Agents for this industry */}
            <div>
              <p className="text-xs text-[#4ade80] uppercase tracking-widest mb-3">
                › Đội ngũ AI Agent cho thuê — {activeIndustry.name}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {activeIndustry.agents.map((agent) => (
                  <div key={agent.name} className="bg-[#0f0f0f] border border-[#1a1a1a] rounded-xl p-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#4ade80]/10 flex items-center justify-center text-xl shrink-0">
                      {agent.icon}
                    </div>
                    <div>
                      <div className="text-white font-semibold text-sm">{agent.name}</div>
                      <div className="text-[#606060] text-xs">{agent.role}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Before / After tasks */}
            <div>
              <p className="text-xs text-[#4ade80] uppercase tracking-widest mb-3">
                › Công việc hàng ngày: Trước và Sau khi có AI
              </p>
              <div className="space-y-3">
                {activeIndustry.tasks.map((task, i) => (
                  <div key={i} className="bg-[#0f0f0f] border border-[#1a1a1a] rounded-xl overflow-hidden">
                    <div className="flex items-center gap-2 px-4 py-2.5 border-b border-[#1a1a1a]">
                      <span className="text-base">{task.icon}</span>
                      <span className="text-white text-sm font-medium">{task.label}</span>
                    </div>
                    <div className="grid grid-cols-2 divide-x divide-[#1a1a1a]">
                      <div className="px-4 py-3">
                        <p className="text-[10px] text-[#f59e0b] uppercase tracking-widest mb-1">Trước đây</p>
                        <p className="text-[#606060] text-xs leading-relaxed">{task.before}</p>
                      </div>
                      <div className="px-4 py-3 bg-[#4ade80]/3">
                        <p className="text-[10px] text-[#22c55e] uppercase tracking-widest mb-1">Với AI Agent</p>
                        <p className="text-[#a0a0a0] text-xs leading-relaxed">{task.after}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Result + Channel */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-[#0f0f0f] border border-[#22c55e]/20 rounded-xl p-4">
                <p className="text-xs text-[#22c55e] uppercase tracking-widest mb-2">💡 Kết quả thực tế</p>
                <p className="text-[#a0a0a0] text-sm leading-relaxed">{activeIndustry.result}</p>
              </div>
              <div className="bg-[#0f0f0f] border border-[#1a1a1a] rounded-xl p-4">
                <p className="text-xs text-[#4ade80] uppercase tracking-widest mb-2">📱 Kênh tích hợp</p>
                <p className="text-[#a0a0a0] text-sm">{activeIndustry.channel}</p>
                <p className="text-[#404040] text-xs mt-1">AI hoạt động ngay trên kênh khách hàng đang dùng</p>
              </div>
            </div>

            {/* CTA */}
            <div className="bg-[#0f0f0f] border border-[#4ade80]/20 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <p className="text-white font-semibold mb-1">
                  Thuê ngay đội ngũ AI Agent cho {activeIndustry.name}
                </p>
                <p className="text-[#606060] text-sm">
                  Tư vấn miễn phí — thiết kế nhân sự AI theo đúng nhu cầu doanh nghiệp.
                </p>
              </div>
              <div className="flex gap-3 shrink-0">
                <a
                  href="https://zalo.me/0337776435"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 bg-[#4ade80] hover:bg-[#86efac] text-white text-sm font-semibold rounded-full transition-all whitespace-nowrap"
                >
                  Thuê AI Agent →
                </a>
              </div>
            </div>

          </div>
        )}

        {/* Empty state */}
        {!activeIndustry && (
          <div className="text-center py-12 text-[#404040]">
            <p className="text-4xl mb-3">👆</p>
            <p className="text-sm">Chọn ngành của bạn để xem đội ngũ AI Agent cho thuê</p>
          </div>
        )}

      </div>
    </section>
  );
};
