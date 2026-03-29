import React from 'react';
import { Link } from 'react-router-dom';

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <section className="mb-10">
    <h2 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
      <span className="text-[#4ade80]">›</span> {title}
    </h2>
    <div className="text-[#a0a0a0] text-sm leading-relaxed space-y-2">{children}</div>
  </section>
);

export const DisclaimerPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#000] text-white">
      {/* Navbar minimal */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#000]/90 backdrop-blur-xl border-b border-[#1a1a1a] py-4">
        <div className="max-w-[860px] mx-auto px-6 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img src="https://umxxfeuo5ed9xpid.public.blob.vercel-storage.com/media/img_6721_1774808773182.jpeg" alt="AutoByTaste" className="w-7 h-7 rounded-full object-cover" />
            <span className="text-sm font-bold text-white">AutoByTaste</span>
          </Link>
          <Link to="/" className="text-xs text-[#606060] hover:text-white transition-colors">← Về trang chủ</Link>
        </div>
      </nav>

      <div className="max-w-[860px] mx-auto px-6 pt-28 pb-20">
        {/* Header */}
        <div className="mb-12">
          <p className="text-xs font-medium text-[#4ade80] tracking-[0.2em] uppercase mb-3">
            › Pháp lý & Bảo mật
          </p>
          <h1 className="text-3xl lg:text-4xl font-bold text-white mb-4 tracking-tight">
            Miễn trừ trách nhiệm<br />
            <span className="text-[#606060]">Bảo mật & An toàn thông tin</span>
          </h1>
          <p className="text-[#606060] text-sm">
            Cập nhật lần cuối: 27 tháng 3, 2026 · AutoByTaste
          </p>
        </div>

        <div className="bg-[#0f0f0f] border border-[#4ade80]/20 rounded-xl p-5 mb-10 text-sm">
          <p className="text-[#86efac] font-medium mb-1">⚠️ Lưu ý quan trọng</p>
          <p className="text-[#a0a0a0] leading-relaxed">
            Tài liệu này mô tả phạm vi trách nhiệm và giới hạn bảo đảm của AutoByTaste liên quan đến việc triển khai và sử dụng phần mềm OpenClaw. Vui lòng đọc kỹ trước khi sử dụng dịch vụ.
          </p>
        </div>

        <Section title="1. Bản chất sản phẩm">
          <p>
            AutoByTaste cung cấp dịch vụ triển khai, cài đặt, đào tạo và hỗ trợ kỹ thuật cho phần mềm <strong className="text-white">OpenClaw</strong> — một nền tảng AI agent mã nguồn mở được phát triển và duy trì bởi bên thứ ba độc lập (openclaw.ai).
          </p>
          <p>
            AutoByTaste <strong className="text-white">không phải là nhà phát triển</strong> của OpenClaw và không kiểm soát mã nguồn, lịch cập nhật, hay các quyết định kỹ thuật của sản phẩm gốc.
          </p>
        </Section>

        <Section title="2. Bảo mật dữ liệu — Phạm vi và giới hạn">
          <p>
            OpenClaw được thiết kế để chạy <strong className="text-white">hoàn toàn cục bộ (local)</strong> trên máy chủ của khách hàng. Theo kiến trúc mặc định:
          </p>
          <ul className="space-y-1.5 pl-4">
            <li>• Dữ liệu xử lý không được gửi lên máy chủ của AutoByTaste hay bất kỳ bên thứ ba nào</li>
            <li>• Dữ liệu hội thoại lưu trữ trên thiết bị của khách hàng</li>
            <li>• Mô hình AI chạy cục bộ không yêu cầu kết nối internet để hoạt động</li>
          </ul>
          <p className="mt-3 text-[#707070]">
            <strong className="text-[#86efac]">Tuy nhiên:</strong> nếu khách hàng chọn sử dụng các model AI đám mây (Claude, GPT-4, Gemini...) thay vì model local, dữ liệu sẽ được gửi đến máy chủ của nhà cung cấp model tương ứng (Anthropic, OpenAI, Google). AutoByTaste không chịu trách nhiệm về chính sách bảo mật của các bên thứ ba này.
          </p>
        </Section>

        <Section title="3. Trách nhiệm của khách hàng">
          <p>Khách hàng có trách nhiệm:</p>
          <ul className="space-y-1.5 pl-4">
            <li>• Bảo mật thông tin đăng nhập, API keys và bot tokens</li>
            <li>• Cấu hình quyền truy cập phù hợp (dmPolicy, allowFrom, pairing)</li>
            <li>• Sao lưu dữ liệu định kỳ</li>
            <li>• Tuân thủ các quy định pháp luật về bảo vệ dữ liệu cá nhân (PDPA, GDPR nếu áp dụng)</li>
            <li>• Không sử dụng AI agent để xử lý dữ liệu trái phép hoặc vi phạm quyền riêng tư của bên thứ ba</li>
          </ul>
        </Section>

        <Section title="4. Giới hạn bảo đảm">
          <p>
            AutoByTaste cung cấp dịch vụ trên cơ sở <strong className="text-white">"as-is"</strong> (nguyên trạng). Chúng tôi không bảo đảm:
          </p>
          <ul className="space-y-1.5 pl-4">
            <li>• Hệ thống hoạt động không gián đoạn trong mọi điều kiện</li>
            <li>• Khả năng phòng thủ trước mọi loại tấn công mạng nếu môi trường triển khai của khách hàng không đảm bảo an toàn</li>
            <li>• Tính chính xác tuyệt đối của các phản hồi từ mô hình AI (AI có thể đưa ra thông tin sai — luôn kiểm chứng thông tin quan trọng)</li>
            <li>• Khả năng tương thích với tất cả phần mềm, hệ điều hành hay cấu hình phần cứng</li>
          </ul>
        </Section>

        <Section title="5. Bảo mật thông tin xác thực">
          <p>
            Các thông tin sau đây được coi là <strong className="text-white">bí mật và tuyệt đối không được chia sẻ</strong> qua kênh không an toàn:
          </p>
          <ul className="space-y-1.5 pl-4">
            <li>• API keys (Anthropic, OpenAI, Google...)</li>
            <li>• Telegram Bot Tokens</li>
            <li>• Gateway auth tokens</li>
            <li>• SSH credentials</li>
            <li>• Mật khẩu hệ thống</li>
          </ul>
          <p className="mt-3 text-[#707070]">
            AutoByTaste sẽ <strong className="text-[#86efac]">không bao giờ yêu cầu</strong> bạn cung cấp các thông tin trên qua chat, email hay điện thoại. Nếu có ai tự xưng là AutoByTaste yêu cầu thông tin này, đây là hành vi lừa đảo — hãy từ chối và báo cáo.
          </p>
        </Section>

        <Section title="6. Giới hạn trách nhiệm pháp lý">
          <p>
            Trong phạm vi tối đa được pháp luật cho phép, AutoByTaste không chịu trách nhiệm về:
          </p>
          <ul className="space-y-1.5 pl-4">
            <li>• Mất mát dữ liệu do lỗi phần cứng, phần mềm hoặc người dùng</li>
            <li>• Thiệt hại gián tiếp phát sinh từ việc sử dụng hoặc không thể sử dụng dịch vụ</li>
            <li>• Vi phạm bảo mật do lỗi cấu hình của khách hàng</li>
            <li>• Nội dung do AI tạo ra được sử dụng sai mục đích</li>
          </ul>
        </Section>

        <Section title="7. Cập nhật và thay đổi">
          <p>
            AutoByTaste có quyền cập nhật tài liệu miễn trừ trách nhiệm này bất kỳ lúc nào. Phiên bản mới nhất luôn được đăng tại <strong className="text-white">autobytaste.tech/disclaimer</strong>.
          </p>
          <p>
            Việc tiếp tục sử dụng dịch vụ sau khi có thay đổi được coi là đồng ý với các điều khoản mới.
          </p>
        </Section>

        <Section title="8. Liên hệ">
          <p>Nếu có thắc mắc về chính sách bảo mật hoặc báo cáo sự cố an toàn thông tin:</p>
          <ul className="space-y-1.5 pl-4">
            <li>• <strong className="text-white">Zalo:</strong> <a href="https://zalo.me/0337776435" target="_blank" rel="noopener noreferrer" className="text-[#4ade80] hover:underline">0337 776 435</a></li>
            <li>• <strong className="text-white">Email:</strong> contact@autobytaste.tech</li>
            <li>• <strong className="text-white">Telegram:</strong> <a href="https://t.me/agentic_ai_vn" target="_blank" rel="noopener noreferrer" className="text-[#4ade80] hover:underline">@agentic_ai_vn</a></li>
          </ul>
        </Section>

        {/* Back links */}
        <div className="border-t border-[#1a1a1a] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link to="/" className="text-sm text-[#606060] hover:text-white transition-colors">← Về trang chủ</Link>
          <Link to="/docs" className="text-sm text-[#606060] hover:text-white transition-colors">📚 Xem tài liệu →</Link>
        </div>
      </div>
    </div>
  );
};
