import React, { useState } from 'react';

interface ShowcaseItem {
  avatar: string;
  name: string;
  role: string;
  highlight: string;
  story: string;
  tags: string[];
  emoji: string;
}

const showcases: ShowcaseItem[] = [
  {
    avatar: 'TM',
    name: 'Tuấn Minh',
    role: 'Founder Startup · Hà Nội',
    emoji: '🚀',
    highlight: 'Xây lại toàn bộ website qua Telegram khi đang xem phim',
    story: 'Tôi migrate từ WordPress sang Astro — 18 bài viết, đổi DNS, deploy lên Cloudflare. Tất cả qua tin nhắn Telegram. Không mở laptop một lần nào.',
    tags: ['Web dev', 'Telegram', 'Không cần mở laptop'],
  },
  {
    avatar: 'PL',
    name: 'Phương Linh',
    role: 'Solo Founder · TP.HCM',
    emoji: '🤖',
    highlight: '4 AI Agent cho 4 bộ phận — startup chạy 24/7 không có nhân viên',
    story: 'Tôi có 4 agents: Agent chiến lược (lên kế hoạch, phối hợp), Dev Agent (code, fix bug), Marketing Agent (research, content), Business Agent (giá cả, metrics). Bộ nhớ chung cho quyết định lớn, bộ nhớ riêng cho từng agent. Mỗi agent dùng model phù hợp — Codex cho code, Gemini cho marketing.',
    tags: ['Multi-agent', '4 agents', 'Solo founder'],
  },
  {
    avatar: 'HN',
    name: 'Hoàng Nam',
    role: 'DevOps Engineer · Đà Nẵng',
    emoji: '🔧',
    highlight: 'Fix lỗi deploy Railway khi đang dắt chó đi dạo — qua giọng nói',
    story: 'Build của 5 services đều fail. Tôi dùng voice chat trên điện thoại, agent tự review logs, tìm root cause (lệnh build sai), sửa config, redeploy, confirm thành công. Rồi tôi báo có lỗi UI, agent fix và submit PR. Tất cả trong lúc đi bộ ngoài đường.',
    tags: ['Voice control', 'DevOps', 'CI/CD automation'],
  },
  {
    avatar: 'AT',
    name: 'Anh Thư',
    role: 'Content Manager · Hà Nội',
    emoji: '📧',
    highlight: 'Xóa 10.000 email spam ngày đầu tiên — agent tự làm',
    story: 'Ngày đầu setup xong, tôi bảo agent dọn hộp thư. Nó xóa 10.000 email rác, tóm tắt 122 slide Google Slides cho cuộc họp toàn công ty, viết LinkedIn posts theo giọng văn của tôi, và xây Jira skill ngay trong hôm đó.',
    tags: ['Email management', 'Content', '10.000 emails'],
  },
  {
    avatar: 'VK',
    name: 'Việt Khoa',
    role: 'Project Manager · TP.HCM',
    emoji: '🏡',
    highlight: 'Lên kế hoạch bữa ăn cả năm 2026 cho cả gia đình — tự động',
    story: 'Agent xây hệ thống meal planning trong Notion: template 365 ngày, danh sách mua hàng theo cửa hàng và kệ hàng, tích hợp dự báo thời tiết để biết hôm nào nên nướng BBQ hay nấu canh. Mỗi sáng tôi nhận brief: thời tiết, lịch, nhắc nhở đi chợ.',
    tags: ['Notion', 'Gia đình', 'Daily brief'],
  },
  {
    avatar: 'DL',
    name: 'Đức Long',
    role: 'Kỹ sư · Cần Thơ',
    emoji: '🏠',
    highlight: 'Kết nối nhà thông minh, email, todo, ghi chú Apple — 1 chat Telegram',
    story: 'Tôi kết nối Homey (smart home), email, homelab qua SSH, todo list, Apple Notes, shopping list. Tất cả điều khiển qua 1 cửa sổ Telegram. Nói "tắt đèn phòng khách", "thêm sữa vào grocery list", "deploy server staging" — xong ngay.',
    tags: ['Smart home', 'SSH', 'All-in-one'],
  },
  {
    avatar: 'MT',
    name: 'Minh Trang',
    role: 'Designer · Hà Nội',
    emoji: '📅',
    highlight: 'Agent tự sắp xếp lịch theo mức độ ưu tiên mỗi sáng',
    story: 'Mỗi sáng nhận: thời tiết, mục tiêu tuần, sức khỏe, lịch họp, email quan trọng, bài đọc liên quan, quote từ sách đang đọc. Agent tự chấm điểm task theo urgency, timeblock vào lịch, nhắc vợ chồng về bài kiểm tra của con, research trước khi họp với khách hàng.',
    tags: ['Calendar', 'Morning brief', 'Family'],
  },
  {
    avatar: 'BH',
    name: 'Bảo Hân',
    role: 'Raspberry Pi hobbyist · Hải Phòng',
    emoji: '🍓',
    highlight: 'Setup OpenClaw trên Raspberry Pi — xây website từ điện thoại',
    story: 'Cài OpenClaw trên Pi với Cloudflare tunnel, kết nối WHOOP để theo dõi sức khỏe hàng ngày. Xây 1 website hoàn chỉnh từ điện thoại trong vài phút. Cảm giác như phép màu.',
    tags: ['Raspberry Pi', 'Self-hosted', 'DIY'],
  },
];

const avatarColors = [
  'bg-[#ff5c5c]', 'bg-[#14b8a6]', 'bg-[#8b5cf6]', 'bg-[#f59e0b]',
  'bg-[#22c55e]', 'bg-[#3b82f6]', 'bg-[#ec4899]', 'bg-[#ff7c5c]',
];

export const ShowcaseSection: React.FC = () => {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <section className="py-24 px-6 border-t border-[#1a1a1a] bg-[#000]">
      <div className="max-w-[980px] mx-auto">
        {/* Header */}
        <div className="mb-12">
          <p className="text-xs font-medium text-[#ff5c5c] tracking-[0.2em] uppercase mb-4">
            › Showcase
          </p>
          <h2 className="text-4xl lg:text-5xl font-bold text-white tracking-tight mb-3">
            Người dùng đang<br />
            <span className="text-[#606060]">xây dựng gì?</span>
          </h2>
          <p className="text-[#606060] text-base max-w-xl">
            Những gì thực sự xảy ra khi AI Agent có toàn quyền truy cập vào cuộc sống và công việc của bạn.
          </p>
        </div>

        {/* Masonry-style grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {showcases.map((item, i) => (
            <div
              key={i}
              className="break-inside-avoid bg-[#0f0f0f] border border-[#1a1a1a] rounded-2xl p-5 hover:border-[#ff5c5c]/20 transition-all duration-300 cursor-pointer"
              onClick={() => setExpanded(expanded === i ? null : i)}
            >
              {/* Header */}
              <div className="flex items-start gap-3 mb-4">
                <div className={`w-9 h-9 rounded-full ${avatarColors[i % avatarColors.length]} flex items-center justify-center text-white text-xs font-bold shrink-0`}>
                  {item.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-white">{item.name}</div>
                  <div className="text-[10px] text-[#404040]">{item.role}</div>
                </div>
                <span className="text-lg">{item.emoji}</span>
              </div>

              {/* Highlight quote */}
              <p className="text-sm text-[#d0d0d0] font-medium leading-relaxed mb-3">
                "{item.highlight}"
              </p>

              {/* Expanded story */}
              {expanded === i && (
                <p className="text-xs text-[#808080] leading-relaxed mb-3 border-t border-[#1a1a1a] pt-3">
                  {item.story}
                </p>
              )}

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mt-3">
                {item.tags.map((tag) => (
                  <span key={tag} className="px-2 py-0.5 text-[10px] rounded-full bg-[#ff5c5c]/8 text-[#ff9090] border border-[#ff5c5c]/15">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Read more toggle */}
              <button className="mt-3 text-[10px] text-[#404040] hover:text-[#ff5c5c] transition-colors">
                {expanded === i ? '▲ Thu gọn' : '▼ Xem chi tiết'}
              </button>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 p-6 bg-[#0f0f0f] border border-[#1a1a1a] rounded-2xl">
          <div>
            <p className="text-white font-semibold mb-1">Bạn sẽ xây gì với OpenClaw?</p>
            <p className="text-[#606060] text-sm">Tham gia cộng đồng — hàng nghìn người đang dùng, chia sẻ, và cải thiện mỗi ngày.</p>
          </div>
          <div className="flex gap-3 shrink-0">
            <a
              href="https://t.me/agentic_ai_vn"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 bg-[#ff5c5c] hover:bg-[#ff7070] text-white text-sm font-semibold rounded-full transition-all"
            >
              Tham gia cộng đồng →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
