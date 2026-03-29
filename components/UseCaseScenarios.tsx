import React, { useState, useEffect } from 'react';

interface Message {
  role: 'user' | 'agent';
  msg: string;
  tools?: string[];
}

interface Scenario {
  industry: string;
  demo: Message[];
}

const scenarios: Scenario[] = [
  {
    industry: '🏢 Doanh nghiệp',
    demo: [
      { role: 'user', msg: 'Tóm tắt email hôm nay và nhắc tôi meeting 3h chiều' },
      {
        role: 'agent',
        msg: '✅ Đã đọc 12 emails. 3 emails quan trọng từ khách hàng ABC, DEF, GHI. Đã thêm reminder meeting 3:00 PM vào lịch.',
        tools: ['read_email', 'calendar_check'],
      },
    ],
  },
  {
    industry: '⚖️ Pháp lý',
    demo: [
      { role: 'user', msg: 'Kiểm tra hợp đồng này có điều khoản rủi ro không?' },
      {
        role: 'agent',
        msg: '🔍 Phân tích 47 trang hợp đồng... Phát hiện 3 điều khoản rủi ro: §12.3 (bảo hành vô thời hạn), §18 (phạt vi phạm bất đối xứng), §24.1 (thẩm quyền không rõ ràng).',
        tools: ['read_file', 'memory_search'],
      },
    ],
  },
  {
    industry: '💻 Developer',
    demo: [
      { role: 'user', msg: 'Review PR #42 và tạo test cases cho auth module' },
      {
        role: 'agent',
        msg: '⚙️ Review PR #42: 3 issues found (SQL injection risk line 87, missing error handling, test coverage 42%). Đã tạo 12 test cases cho auth module.',
        tools: ['exec', 'read_file', 'web_search'],
      },
    ],
  },
  {
    industry: '🛍️ Sales/CSKH',
    demo: [
      { role: 'user', msg: 'Có bao nhiêu khách hàng chưa được follow up tuần này?' },
      {
        role: 'agent',
        msg: '📊 27 khách hàng chưa được follow up (>5 ngày). Đã gửi reminder qua Zalo cho 15 khách VIP. Draft email follow-up cho 12 khách còn lại.',
        tools: ['db_query', 'send_message'],
      },
    ],
  },
  {
    industry: '💬 Zalo Business',
    demo: [
      { role: 'user', msg: 'Trả lời tự động khách hỏi giá trên Zalo OA và lưu lead vào CRM' },
      {
        role: 'agent',
        msg: '✅ Đã kết nối Zalo OA. Nhận 8 tin nhắn mới — đã trả lời tự động bảng giá cho 6 khách, ghi nhận 8 leads vào CRM. 2 khách hỏi thêm chi tiết → đã chuyển cho sales phụ trách.',
        tools: ['zalo_receive', 'zalo_send', 'crm_create_lead'],
      },
    ],
  },
  {
    industry: '📣 Marketing Zalo',
    demo: [
      { role: 'user', msg: 'Gửi broadcast khuyến mãi tới 500 khách trong danh sách Zalo OA' },
      {
        role: 'agent',
        msg: '📨 Đang gửi broadcast... Đã gửi thành công 487/500 (13 số không nhận được). Tỷ lệ mở: 73%. 42 khách reply hỏi thêm — đã xếp hàng trả lời tự động.',
        tools: ['zalo_broadcast', 'zalo_template', 'analytics_track'],
      },
    ],
  },
  {
    industry: '🏥 Y tế / Phòng khám',
    demo: [
      { role: 'user', msg: 'Nhắc lịch tái khám cho tất cả bệnh nhân tuần tới và tổng hợp hồ sơ' },
      {
        role: 'agent',
        msg: '🏥 Đã tìm 34 bệnh nhân tái khám tuần tới. Gửi nhắc nhở SMS cho 34 người. Tổng hợp hồ sơ bệnh án cho 8 ca phức tạp — lưu local, không qua cloud.',
        tools: ['read_file', 'send_message', 'memory_search'],
      },
    ],
  },
  {
    industry: '🏗️ Bất động sản',
    demo: [
      { role: 'user', msg: 'Tổng hợp báo cáo dự án và nhắc các deadline tuần này' },
      {
        role: 'agent',
        msg: '📋 Tổng hợp 3 dự án: Vinhomes (đúng tiến độ), Green Valley (trễ 5 ngày — cần escalate), Sunrise (sắp bàn giao). 4 deadline trong tuần: họp nghiệm thu T4, nộp hồ sơ T5...',
        tools: ['read_file', 'calendar_check', 'send_message'],
      },
    ],
  },
  {
    industry: '📚 Giáo dục / Đào tạo',
    demo: [
      { role: 'user', msg: 'Trả lời câu hỏi học viên và chấm bài tập nộp qua Telegram' },
      {
        role: 'agent',
        msg: '📚 18 câu hỏi từ học viên đã được trả lời tự động. 12 bài tập nộp qua Telegram — đã chấm điểm và phản hồi chi tiết cho từng học viên. 3 học viên cần hỗ trợ thêm → đã báo giáo viên.',
        tools: ['read_file', 'memory_search', 'send_message'],
      },
    ],
  },
  {
    industry: '🏭 Sản xuất / Nhà máy',
    demo: [
      { role: 'user', msg: 'Kiểm tra tiến độ dây chuyền sản xuất và cảnh báo sự cố' },
      {
        role: 'agent',
        msg: '⚙️ Dây chuyền A: 94% công suất (bình thường). Dây chuyền B: ⚠️ nhiệt độ lò 420°C vượt ngưỡng — đã gửi cảnh báo cho kỹ thuật viên trực. Dây chuyền C: tạm dừng bảo trì, dự kiến hoạt động lại 14h.',
        tools: ['exec', 'send_message', 'analytics_track'],
      },
    ],
  },
  {
    industry: '🛒 E-commerce / Shop',
    demo: [
      { role: 'user', msg: 'Cập nhật tồn kho, xử lý đơn hàng mới và báo cáo doanh thu hôm nay' },
      {
        role: 'agent',
        msg: '🛒 Xử lý 47 đơn hàng mới. Cập nhật tồn kho: 3 SKU sắp hết (son đỏ, kem dưỡng, serum). Doanh thu hôm nay: 18.4 triệu (+23% so với hôm qua). Đã tạo PO nhập hàng tự động.',
        tools: ['db_query', 'exec', 'send_message'],
      },
    ],
  },
  {
    industry: '👥 Quản lý Group Zalo',
    demo: [
      { role: 'user', msg: 'Tạo group Zalo cho khách hàng VIP tháng này và gửi thông báo ưu đãi' },
      {
        role: 'agent',
        msg: '✅ Đã tạo group "VIP Tháng 3" với 28 thành viên. Đổi tên group, ghim thông báo ưu đãi lên đầu. Đã gửi tin nhắn cá nhân cho từng thành viên kèm mã giảm giá riêng. Bật link mời group để share thêm.',
        tools: ['zalo_group_create', 'zalo_group_rename', 'zalo_msg_send', 'zalo_msg_pin', 'zalo_group_link'],
      },
    ],
  },
  {
    industry: '🔍 Phân tích Chat Zalo',
    demo: [
      { role: 'user', msg: 'Phân tích lịch sử chat nhóm kinh doanh tuần này — ai active, chủ đề nào nhiều nhất?' },
      {
        role: 'agent',
        msg: '📊 Phân tích 847 tin nhắn trong 7 ngày. Top active: Minh Anh (142 msg), Tuấn (98 msg), Hoa (87 msg). Chủ đề hot: đơn hàng (34%), sản phẩm mới (28%), khiếu nại (12%). 3 tin nhắn quan trọng chưa được phản hồi — đã highlight để xử lý.',
        tools: ['zalo_db_messages', 'memory_search', 'exec'],
      },
    ],
  },
  {
    industry: '🤝 Chăm Sóc Khách Hàng Zalo',
    demo: [
      { role: 'user', msg: 'Kiểm tra khách nào chưa được follow up sau khi mua hàng và gửi tin nhắn cảm ơn' },
      {
        role: 'agent',
        msg: '💌 Tìm thấy 23 khách mua hàng trong 7 ngày chưa nhận tin cảm ơn. Đã gửi tin nhắn cá nhân hóa theo tên và sản phẩm đã mua. React ❤️ vào các tin nhắn feedback tích cực. 5 khách có phản hồi xấu — đã chuyển cho manager xử lý.',
        tools: ['zalo_db_chat', 'zalo_msg_send', 'zalo_msg_react', 'friend_list'],
      },
    ],
  },
  {
    industry: '📋 Quản lý Cộng đồng Zalo',
    demo: [
      { role: 'user', msg: 'Dọn dẹp group Zalo cộng đồng: xóa thành viên spam và ghim thông báo mới' },
      {
        role: 'agent',
        msg: '🛡️ Phát hiện 4 thành viên spam (3 người gửi link lạ, 1 người flood tin nhắn). Đã xóa khỏi group. Ghim thông báo nội quy mới lên đầu. Block 2 tài khoản vào danh sách chặn. Group hiện còn 312 thành viên active.',
        tools: ['zalo_group_members', 'zalo_group_remove', 'zalo_msg_pin', 'zalo_group_blocked'],
      },
    ],
  },
];

export const UseCaseScenarios: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [visibleMsg, setVisibleMsg] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const currentScenario = scenarios[activeTab];

  useEffect(() => {
    setVisibleMsg(0);
    setTypedText('');
    setIsTyping(false);

    // Show user message immediately
    const t1 = setTimeout(() => {
      setVisibleMsg(1);
      setIsTyping(true);
    }, 300);

    // Start typing agent response
    const t2 = setTimeout(() => {
      const agentMsg = currentScenario.demo[1].msg;
      let i = 0;
      setTypedText('');
      const typeTimer = setInterval(() => {
        if (i < agentMsg.length) {
          setTypedText(agentMsg.slice(0, i + 1));
          i++;
        } else {
          clearInterval(typeTimer);
          setIsTyping(false);
          setVisibleMsg(2);
        }
      }, 18);
      return () => clearInterval(typeTimer);
    }, 900);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [activeTab]);

  return (
    <section className="py-24 px-6 border-t border-[#1a1a1a]">
      <div className="max-w-[980px] mx-auto">
        {/* Header */}
        <div className="mb-12">
          <p className="text-xs font-medium text-[#4ade80] tracking-[0.2em] uppercase mb-4">
            › Use Cases Thực Tế
          </p>
          <h2 className="text-4xl lg:text-5xl font-bold text-white tracking-tight">
            AI Agent hoạt động<br />
            <span className="text-[#707070]">trong thực tế.</span>
          </h2>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {scenarios.map((s, i) => (
            <button
              key={i}
              onClick={() => setActiveTab(i)}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 ${
                activeTab === i
                  ? 'bg-[#4ade80] text-white'
                  : 'bg-[#0f0f0f] border border-[#1e1e1e] text-[#606060] hover:text-white hover:border-[#333]'
              }`}
            >
              {s.industry}
            </button>
          ))}
        </div>

        {/* Chat demo */}
        <div className="bg-[#0f0f0f] border border-[#1a1a1a] rounded-2xl overflow-hidden">
          {/* Terminal title bar */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-[#1a1a1a] bg-[#0a0a0a]">
            <div className="w-3 h-3 rounded-full bg-[#ff5f57]"></div>
            <div className="w-3 h-3 rounded-full bg-[#febc2e]"></div>
            <div className="w-3 h-3 rounded-full bg-[#28c840]"></div>
            <span className="ml-3 text-xs text-[#404040] font-mono">openclaw-agent · {currentScenario.industry}</span>
          </div>

          <div className="p-6 space-y-4 min-h-[200px]">
            {/* User message */}
            {visibleMsg >= 1 && (
              <div className="flex items-start gap-3 animate-fade-in-up">
                <div className="w-7 h-7 rounded-full bg-[#1e1e1e] flex items-center justify-center text-xs shrink-0">
                  👤
                </div>
                <div className="bg-[#1a1a1a] rounded-2xl rounded-tl-sm px-4 py-2.5 text-sm text-[#d0d0d0] max-w-md">
                  {currentScenario.demo[0].msg}
                </div>
              </div>
            )}

            {/* Agent typing / response */}
            {visibleMsg >= 1 && (
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-[#4ade80]/20 border border-[#4ade80]/30 flex items-center justify-center text-xs shrink-0">
                  🦞
                </div>
                <div className="flex-1 space-y-2">
                  {/* Tools badges (show when typing starts) */}
                  {(isTyping || visibleMsg >= 2) && currentScenario.demo[1].tools && (
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {currentScenario.demo[1].tools!.map((tool, ti) => (
                        <span
                          key={ti}
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#4ade80]/10 border border-[#4ade80]/20 text-[10px] font-mono text-[#86efac]"
                        >
                          <span className="text-[#4ade80]">⚡</span>
                          {tool}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="bg-[#141414] border border-[#1e1e1e] rounded-2xl rounded-tl-sm px-4 py-2.5 text-sm text-[#d0d0d0] max-w-lg">
                    {isTyping ? (
                      <span>
                        {typedText}
                        <span className="inline-block w-0.5 h-3.5 bg-[#4ade80] ml-0.5 animate-pulse"></span>
                      </span>
                    ) : visibleMsg >= 2 ? (
                      currentScenario.demo[1].msg
                    ) : (
                      <span className="flex gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#404040] animate-bounce" style={{ animationDelay: '0ms' }}></span>
                        <span className="w-1.5 h-1.5 rounded-full bg-[#404040] animate-bounce" style={{ animationDelay: '150ms' }}></span>
                        <span className="w-1.5 h-1.5 rounded-full bg-[#404040] animate-bounce" style={{ animationDelay: '300ms' }}></span>
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
