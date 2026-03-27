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
          <p className="text-xs font-medium text-[#ff5c5c] tracking-[0.2em] uppercase mb-4">
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
                  ? 'bg-[#ff5c5c] text-white'
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
                <div className="w-7 h-7 rounded-full bg-[#ff5c5c]/20 border border-[#ff5c5c]/30 flex items-center justify-center text-xs shrink-0">
                  🦞
                </div>
                <div className="flex-1 space-y-2">
                  {/* Tools badges (show when typing starts) */}
                  {(isTyping || visibleMsg >= 2) && currentScenario.demo[1].tools && (
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {currentScenario.demo[1].tools!.map((tool, ti) => (
                        <span
                          key={ti}
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#ff5c5c]/10 border border-[#ff5c5c]/20 text-[10px] font-mono text-[#ff9090]"
                        >
                          <span className="text-[#ff5c5c]">⚡</span>
                          {tool}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="bg-[#141414] border border-[#1e1e1e] rounded-2xl rounded-tl-sm px-4 py-2.5 text-sm text-[#d0d0d0] max-w-lg">
                    {isTyping ? (
                      <span>
                        {typedText}
                        <span className="inline-block w-0.5 h-3.5 bg-[#ff5c5c] ml-0.5 animate-pulse"></span>
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
