import React, { useState, useEffect, useRef } from 'react';

interface ChatMessage {
  role: 'user' | 'agent';
  text: string;
  agentName?: string;
  agentColor?: string;
}

interface DemoScenario {
  id: string;
  icon: string;
  label: string;
  description: string;
  messages: ChatMessage[];
}

const scenarios: DemoScenario[] = [
  {
    id: 'chat',
    icon: '💬',
    label: 'Chat với OpenClaw',
    description: 'Trò chuyện trực tiếp với AI Agent thông minh',
    messages: [
      { role: 'user', text: 'Chào OpenClaw, giúp tôi kiểm tra đơn hàng #2048 nhé.' },
      { role: 'agent', text: 'Chào anh/chị! Đơn hàng #2048 đang trong trạng thái "Đang giao". Dự kiến nhận hàng vào ngày mai lúc 14:00. Anh/chị cần tôi liên hệ đơn vị vận chuyển không ạ?', agentName: 'OpenClaw', agentColor: '#14b8a6' },
      { role: 'user', text: 'Liên hệ giúp mình và nhắc lại lúc 13:00 ngày mai.' },
      { role: 'agent', text: '✅ Đã gửi yêu cầu tới đơn vị vận chuyển.\n⏰ Đã đặt lịch nhắc vào 13:00 ngày mai.\nCòn gì tôi hỗ trợ thêm không ạ?', agentName: 'OpenClaw', agentColor: '#14b8a6' },
    ],
  },
  {
    id: 'multi-agent',
    icon: '🤖',
    label: 'Multi-Agent',
    description: 'Nhiều agent cùng phối hợp xử lý công việc',
    messages: [
      { role: 'user', text: 'Tôi cần chuẩn bị báo cáo tháng 3 cho ban giám đốc.' },
      { role: 'agent', text: '📊 Đang tổng hợp dữ liệu doanh thu tháng 3...\nDoanh thu: 2.4 tỷ VNĐ (+12% so tháng trước)\nĐơn hàng: 1,847 đơn hoàn tất', agentName: 'Agent Phân Tích', agentColor: '#8b5cf6' },
      { role: 'agent', text: '📝 Đã tạo slide báo cáo 12 trang bao gồm:\n• Tổng quan doanh thu\n• Phân tích kênh bán hàng\n• Biểu đồ tăng trưởng\n• Dự báo tháng 4', agentName: 'Agent Báo Cáo', agentColor: '#f59e0b' },
      { role: 'agent', text: '📧 Đã gửi email mời họp tới 5 thành viên BGĐ.\nThời gian: Thứ 2, 9:00 AM\nPhòng họp: A301\nĐính kèm: Báo cáo T3.pdf', agentName: 'Agent Thư Ký', agentColor: '#ec4899' },
    ],
  },
  {
    id: 'task',
    icon: '📋',
    label: 'Giao công việc',
    description: 'Giao việc và theo dõi tiến độ tự động',
    messages: [
      { role: 'user', text: 'Giao việc cho team: Hoàn thành landing page mới trước thứ 6.' },
      { role: 'agent', text: '📋 Đã tạo task và phân công:\n\n👤 Designer — Thiết kế UI/UX (deadline: Thứ 4)\n👤 Developer — Code frontend (deadline: Thứ 5)\n👤 Content — Viết nội dung (deadline: Thứ 4)\n👤 QA — Test & review (deadline: Thứ 6)\n\nTôi sẽ theo dõi tiến độ và báo cáo hàng ngày.', agentName: 'OpenClaw', agentColor: '#14b8a6' },
      { role: 'user', text: 'Kiểm tra tiến độ hiện tại.' },
      { role: 'agent', text: '📊 Tiến độ task "Landing Page":\n\n✅ Designer — 100% (đã duyệt)\n🔄 Developer — 65% (đang code)\n✅ Content — 100% (đã hoàn tất)\n⏳ QA — Chưa bắt đầu\n\n⚠️ Developer có thể trễ deadline 1 ngày. Cần tôi điều phối thêm không?', agentName: 'OpenClaw', agentColor: '#14b8a6' },
    ],
  },
  {
    id: 'reminder',
    icon: '⏰',
    label: 'Nhắc lịch',
    description: 'Tự động nhắc lịch, deadline, cuộc hẹn',
    messages: [
      { role: 'agent', text: '🔔 Nhắc lịch hôm nay:\n\n09:00 — Họp team weekly (Google Meet)\n11:00 — Call với khách hàng ABC Corp\n14:00 — Deadline nộp báo cáo Q1\n16:00 — Review code với dev team\n\nAnh/chị muốn tôi chuẩn bị gì trước không?', agentName: 'OpenClaw', agentColor: '#14b8a6' },
      { role: 'user', text: 'Chuẩn bị agenda cho buổi họp team weekly giúp tôi.' },
      { role: 'agent', text: '📝 Agenda họp Team Weekly:\n\n1. Review KPIs tuần qua (5 phút)\n2. Cập nhật tiến độ dự án (10 phút)\n3. Vấn đề cần giải quyết (10 phút)\n4. Kế hoạch tuần tới (5 phút)\n5. Q&A (5 phút)\n\n✅ Đã gửi agenda vào group chat team.\n⏰ Sẽ nhắc lại trước 15 phút.', agentName: 'OpenClaw', agentColor: '#14b8a6' },
    ],
  },
  {
    id: 'plan',
    icon: '🗺️',
    label: 'Lên kế hoạch',
    description: 'Lập kế hoạch kinh doanh & chiến lược',
    messages: [
      { role: 'user', text: 'Lên kế hoạch marketing cho sản phẩm mới ra mắt tháng 4.' },
      { role: 'agent', text: '📅 Kế hoạch Marketing - Ra mắt sản phẩm T4:\n\n🔹 Tuần 1 (1-7/4): Teaser campaign\n  • Social media hints & countdown\n  • Email warm-up tới 5,000 leads\n\n🔹 Tuần 2 (8-14/4): Pre-launch\n  • Landing page live\n  • KOL review & unbox\n  • Early-bird offer -20%', agentName: 'Agent Planner', agentColor: '#22c55e' },
      { role: 'agent', text: '🔹 Tuần 3 (15-21/4): Launch Day\n  • Livestream ra mắt trên 3 kênh\n  • Flash sale 48h\n  • PR bài báo (5 đầu báo)\n\n🔹 Tuần 4 (22-30/4): Follow-up\n  • Retargeting ads\n  • Thu thập review\n  • Phân tích ROI\n\n💰 Budget ước tính: 45 triệu VNĐ\n📈 Mục tiêu: 500 đơn hàng tuần đầu', agentName: 'Agent Planner', agentColor: '#22c55e' },
    ],
  },
  {
    id: 'analysis',
    icon: '📊',
    label: 'Phân tích',
    description: 'Phân tích dữ liệu, xu hướng, insight',
    messages: [
      { role: 'user', text: 'Phân tích hiệu quả quảng cáo Facebook tháng vừa qua.' },
      { role: 'agent', text: '📊 Phân tích Facebook Ads - Tháng 3/2026:\n\n💰 Chi tiêu: 28.5 triệu VNĐ\n👁️ Reach: 245,000 người\n🖱️ Click: 12,340 (CTR: 5.03%)\n🛒 Conversion: 487 đơn (CVR: 3.95%)\n💵 Revenue: 156 triệu VNĐ\n📈 ROAS: 5.47x\n\n⚡ Insight: Campaign "Flash Sale" hiệu quả nhất với ROAS 8.2x. Đối tượng 25-34 tuổi convert tốt nhất.', agentName: 'Agent Phân Tích', agentColor: '#8b5cf6' },
      { role: 'user', text: 'So sánh với tháng trước và đưa ra đề xuất.' },
      { role: 'agent', text: '📈 So sánh với T2/2026:\n\n• ROAS: 5.47x vs 4.12x (+32.8%) ✅\n• CPC: 2,310đ vs 2,890đ (-20%) ✅\n• CVR: 3.95% vs 3.21% (+23%) ✅\n\n💡 Đề xuất T4:\n1. Tăng budget campaign "Flash Sale" lên 40%\n2. Tập trung nhóm 25-34 tuổi (chiếm 62% conversion)\n3. Test thêm format Video Reels (CPM thấp hơn 35%)\n4. Cắt giảm campaign "Brand Awareness" (ROAS chỉ 1.8x)', agentName: 'Agent Phân Tích', agentColor: '#8b5cf6' },
    ],
  },
  {
    id: 'report',
    icon: '📑',
    label: 'Báo cáo',
    description: 'Tự động tạo báo cáo chuyên nghiệp',
    messages: [
      { role: 'user', text: 'Tạo báo cáo tổng kết Q1/2026 cho bộ phận kinh doanh.' },
      { role: 'agent', text: '📑 Đang tạo báo cáo Q1/2026...\n\n✅ Thu thập dữ liệu từ CRM, kế toán, marketing\n✅ Phân tích 3,247 giao dịch\n✅ Tạo 8 biểu đồ trực quan\n✅ Xuất file PDF + PowerPoint\n\n📊 Highlights Q1/2026:\n• Doanh thu: 7.2 tỷ VNĐ (đạt 108% KPI)\n• Khách hàng mới: 234 (+45% YoY)\n• Tỷ lệ giữ chân: 89%', agentName: 'Agent Báo Cáo', agentColor: '#f59e0b' },
      { role: 'agent', text: '📤 Báo cáo đã sẵn sàng:\n\n📎 Q1_2026_BaoCao_KinhDoanh.pdf (24 trang)\n📎 Q1_2026_Slides.pptx (18 slides)\n📎 Q1_2026_Data_Raw.xlsx\n\n✅ Đã gửi email tới:\n• Giám đốc kinh doanh\n• Trưởng phòng marketing\n• Kế toán trưởng\n\n📅 Đã lên lịch họp review: Thứ 2, 10:00 AM', agentName: 'Agent Báo Cáo', agentColor: '#f59e0b' },
    ],
  },
];

const TypingIndicator: React.FC<{ agentName: string; agentColor: string }> = ({ agentName, agentColor }) => (
  <div className="flex items-start space-x-3">
    <div className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0 mt-0.5" style={{ backgroundColor: agentColor }}>
      {agentName.split(' ').pop()?.charAt(0)}
    </div>
    <div>
      <p className="text-[10px] font-medium mb-1" style={{ color: agentColor }}>{agentName}</p>
      <div className="bg-[#191c24] border border-[#2a2a2a] rounded-2xl rounded-tl-sm px-4 py-2.5">
        <div className="flex space-x-1.5">
          <span className="w-1.5 h-1.5 bg-[#555] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
          <span className="w-1.5 h-1.5 bg-[#555] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
          <span className="w-1.5 h-1.5 bg-[#555] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    </div>
  </div>
);

const ChatBubble: React.FC<{ message: ChatMessage; animate: boolean }> = ({ message, animate }) => {
  if (message.role === 'user') {
    return (
      <div className={`flex justify-end ${animate ? 'animate-fade-in-up' : ''}`}>
        <div className="max-w-[85%] bg-[#ff5c5c] text-white rounded-2xl rounded-tr-sm px-4 py-2.5 text-[13px] leading-relaxed whitespace-pre-line">
          {message.text}
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-start space-x-3 ${animate ? 'animate-fade-in-up' : ''}`}>
      <div
        className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0 mt-0.5"
        style={{ backgroundColor: message.agentColor }}
      >
        {message.agentName?.split(' ').pop()?.charAt(0)}
      </div>
      <div className="max-w-[85%]">
        <p className="text-[10px] font-medium mb-1" style={{ color: message.agentColor }}>
          {message.agentName}
        </p>
        <div className="bg-[#191c24] border border-[#2a2a2a] rounded-2xl rounded-tl-sm px-4 py-2.5 text-[13px] leading-relaxed text-[#c0c0c0] whitespace-pre-line">
          {message.text}
        </div>
      </div>
    </div>
  );
};

export const DemoChatSection: React.FC = () => {
  const [activeScenario, setActiveScenario] = useState(0);
  const [visibleMessages, setVisibleMessages] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const currentScenario = scenarios[activeScenario];

  // Clear timeouts on scenario change
  useEffect(() => {
    return () => {
      timeoutRef.current.forEach(clearTimeout);
      timeoutRef.current = [];
    };
  }, []);

  // Animate messages sequentially
  useEffect(() => {
    timeoutRef.current.forEach(clearTimeout);
    timeoutRef.current = [];
    setVisibleMessages(0);
    setIsTyping(false);

    const msgs = currentScenario.messages;
    let delay = 300;

    msgs.forEach((msg, i) => {
      // Show typing indicator before agent messages
      if (msg.role === 'agent') {
        const typingTimeout = setTimeout(() => {
          setIsTyping(true);
        }, delay);
        timeoutRef.current.push(typingTimeout);
        delay += 800;
      }

      const msgTimeout = setTimeout(() => {
        setIsTyping(false);
        setVisibleMessages(i + 1);
      }, delay);
      timeoutRef.current.push(msgTimeout);

      delay += msg.role === 'user' ? 600 : 1000;
    });
  }, [activeScenario, currentScenario.messages]);

  // Auto-scroll chat
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTo({ top: chatRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [visibleMessages, isTyping]);

  const handleScenarioChange = (index: number) => {
    if (index !== activeScenario) {
      setActiveScenario(index);
    }
  };

  // Find the next typing agent info
  const nextAgentMsg = currentScenario.messages[visibleMessages];
  const typingAgent = isTyping && nextAgentMsg?.role === 'agent' ? nextAgentMsg : null;

  return (
    <div className="relative py-20 lg:py-28 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#14b8a6]/5 blur-[180px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-xs font-bold text-[#14b8a6] tracking-[0.25em] uppercase mb-4">
            DEMO TRẢI NGHIỆM
          </p>
          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-4">
            Xem AI Agent làm việc <span className="text-[#14b8a6]">thực tế</span>
          </h2>
          <p className="max-w-xl mx-auto text-[#707070] text-base lg:text-lg">
            Trải nghiệm các tình huống thực tế mà đội ngũ AI Agent xử lý hàng ngày cho doanh nghiệp.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Scenario tabs - left side */}
          <div className="lg:w-[280px] flex-shrink-0">
            <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0 scrollbar-hide">
              {scenarios.map((scenario, i) => (
                <button
                  key={scenario.id}
                  onClick={() => handleScenarioChange(i)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-300 whitespace-nowrap lg:whitespace-normal flex-shrink-0 lg:flex-shrink ${
                    i === activeScenario
                      ? 'bg-[#14b8a6]/10 border border-[#14b8a6]/30 text-white'
                      : 'bg-[#0f0f0f] border border-[#1e1e1e] text-[#707070] hover:border-[#333] hover:text-[#999]'
                  }`}
                >
                  <span className="text-xl">{scenario.icon}</span>
                  <div>
                    <p className="text-sm font-semibold">{scenario.label}</p>
                    <p className="text-[11px] text-[#555] hidden lg:block">{scenario.description}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Chat window - right side */}
          <div className="flex-1 min-w-0">
            <div className="bg-[#0a0a0a] border border-[#1e1e1e] rounded-2xl overflow-hidden shadow-2xl">
              {/* Chat header */}
              <div className="flex items-center space-x-3 px-5 py-3 border-b border-[#1e1e1e] bg-[#0f0f0f]">
                <div className="w-3 h-3 rounded-full bg-[#ff5c5c]" />
                <div className="w-3 h-3 rounded-full bg-[#f59e0b]" />
                <div className="w-3 h-3 rounded-full bg-[#22c55e]" />
                <span className="text-xs text-[#555] ml-2 font-medium">{currentScenario.label} — OpenClaw Chat</span>
              </div>

              {/* Chat body */}
              <div ref={chatRef} className="p-5 space-y-4 h-[420px] overflow-y-auto" style={{ scrollbarWidth: 'thin', scrollbarColor: '#333 transparent' }}>
                {currentScenario.messages.slice(0, visibleMessages).map((msg, i) => (
                  <ChatBubble key={`${activeScenario}-${i}`} message={msg} animate={i === visibleMessages - 1} />
                ))}
                {typingAgent && (
                  <TypingIndicator agentName={typingAgent.agentName!} agentColor={typingAgent.agentColor!} />
                )}
              </div>

              {/* Chat input (decorative) */}
              <div className="px-5 py-3 border-t border-[#1e1e1e] bg-[#0f0f0f]">
                <div className="flex items-center space-x-3">
                  <div className="flex-1 bg-[#141414] border border-[#2a2a2a] rounded-full px-4 py-2.5 text-[13px] text-[#555]">
                    Nhập tin nhắn cho AI Agent...
                  </div>
                  <button className="w-9 h-9 bg-[#14b8a6] rounded-full flex items-center justify-center text-white hover:bg-[#0d9488] transition-colors">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="22" y1="2" x2="11" y2="13" />
                      <polygon points="22 2 15 22 11 13 2 9 22 2" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Feature badges below chat */}
            <div className="flex flex-wrap gap-2 mt-4 justify-center">
              {['Tiếng Việt tự nhiên', 'Đa kênh (Zalo, Telegram, Web)', 'Trả lời tức thì 24/7', 'Bảo mật dữ liệu'].map((badge) => (
                <span key={badge} className="text-[11px] text-[#555] bg-[#0f0f0f] border border-[#1e1e1e] rounded-full px-3 py-1">
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
