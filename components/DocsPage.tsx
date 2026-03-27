import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';

interface DocSection {
  id: string;
  icon: string;
  title: string;
  content: React.ReactNode;
}

const CodeBlock: React.FC<{ children: string; language?: string }> = ({ children, language = 'bash' }) => (
  <pre className="bg-[#0a0a0a] border border-[#1e1e1e] rounded-lg p-4 overflow-x-auto my-3 text-sm">
    <code className="text-[#22c55e] font-mono leading-relaxed">{children.trim()}</code>
  </pre>
);

const InlineCode: React.FC<{ children: string }> = ({ children }) => (
  <code className="bg-[#1a1a1a] text-[#ff5c5c] px-1.5 py-0.5 rounded text-sm font-mono">{children}</code>
);

const docSections: DocSection[] = [
  {
    id: 'getting-started',
    icon: '🚀',
    title: 'Bắt đầu',
    content: (
      <div className="space-y-5">
        <div>
          <h2 className="text-xl font-bold text-white mb-1">🚀 Bắt đầu — Getting Started</h2>
          <p className="text-[#707070] text-sm">Cài đặt và thiết lập OpenClaw trong vài phút.</p>
        </div>

        <section>
          <h3 className="text-[#ff5c5c] font-semibold mb-2 text-sm uppercase tracking-widest">Giới thiệu</h3>
          <p className="text-[#a0a0a0] text-sm leading-relaxed">
            OpenClaw là AI agent platform chạy ngay trên máy tính của bạn. <strong className="text-white">Dữ liệu không rời khỏi thiết bị.</strong> Bạn kết nối AI với các kênh giao tiếp (Telegram, Zalo, Discord...) và để agent xử lý công việc tự động.
          </p>
        </section>

        <section>
          <h3 className="text-[#ff5c5c] font-semibold mb-2 text-sm uppercase tracking-widest">Yêu cầu</h3>
          <ul className="space-y-1 text-sm text-[#a0a0a0]">
            <li>• <strong className="text-white">Node.js 24</strong> (hoặc 22.14+) — kiểm tra: <InlineCode>node --version</InlineCode></li>
            <li>• API key từ model provider (Anthropic, OpenAI, Google...)</li>
          </ul>
        </section>

        <section>
          <h3 className="text-[#ff5c5c] font-semibold mb-2 text-sm uppercase tracking-widest">Cài đặt</h3>
          <CodeBlock>{`# macOS / Linux
curl -fsSL https://openclaw.ai/install.sh | bash

# Windows (PowerShell)
iwr -useb https://openclaw.ai/install.ps1 | iex`}</CodeBlock>
        </section>

        <section>
          <h3 className="text-[#ff5c5c] font-semibold mb-2 text-sm uppercase tracking-widest">Onboarding (~2 phút)</h3>
          <p className="text-[#a0a0a0] text-sm mb-2">Wizard hướng dẫn chọn model provider, nhập API key, cấu hình Gateway:</p>
          <CodeBlock>{`openclaw onboard --install-daemon`}</CodeBlock>
        </section>

        <section>
          <h3 className="text-[#ff5c5c] font-semibold mb-2 text-sm uppercase tracking-widest">Kiểm tra</h3>
          <CodeBlock>{`openclaw gateway status   # Gateway lắng nghe trên port 18789
openclaw dashboard        # Mở Control UI trên trình duyệt`}</CodeBlock>
        </section>
      </div>
    ),
  },
  {
    id: 'channels',
    icon: '💬',
    title: 'Kênh giao tiếp',
    content: (
      <div className="space-y-5">
        <div>
          <h2 className="text-xl font-bold text-white mb-1">💬 Kênh giao tiếp — Channels</h2>
          <p className="text-[#707070] text-sm">Kết nối AI agent với các nền tảng nhắn tin.</p>
        </div>

        <section>
          <h3 className="text-[#ff5c5c] font-semibold mb-3 text-sm uppercase tracking-widest">Telegram <span className="text-[#22c55e] text-xs normal-case">(Khuyên dùng cho người mới)</span></h3>
          <ol className="space-y-2 text-sm text-[#a0a0a0] list-decimal list-inside">
            <li>Tạo bot qua <strong className="text-white">@BotFather</strong> → lấy bot token</li>
            <li>Thêm vào config:
              <CodeBlock>{`openclaw config set channels.telegram.botToken YOUR_TOKEN`}</CodeBlock>
            </li>
            <li>Restart gateway:
              <CodeBlock>{`openclaw gateway restart`}</CodeBlock>
            </li>
          </ol>
        </section>

        <section>
          <h3 className="text-[#ff5c5c] font-semibold mb-2 text-sm uppercase tracking-widest">Telegram — Chi tiết cài đặt</h3>
          <ol className="space-y-1.5 text-sm text-[#a0a0a0] list-decimal list-inside mb-3">
            <li>Chat với <strong className="text-white">@BotFather</strong> trên Telegram</li>
            <li>Gửi <InlineCode>/newbot</InlineCode> → đặt tên và username cho bot</li>
            <li>Lưu token (dạng <InlineCode>123456:ABCdef...</InlineCode>)</li>
            <li>Cấu hình trong openclaw.json:
              <CodeBlock>{`{
  "channels": {
    "telegram": {
      "enabled": true,
      "botToken": "YOUR_TOKEN",
      "dmPolicy": "pairing",
      "groups": { "*": { "requireMention": true } }
    }
  }
}`}</CodeBlock>
            </li>
            <li>Restart: <InlineCode>openclaw gateway restart</InlineCode></li>
            <li>Approve pairing: <InlineCode>openclaw pairing approve telegram &lt;code&gt;</InlineCode></li>
          </ol>
          <p className="text-[#707070] text-xs font-semibold uppercase tracking-widest mb-1">Multi-bot setup</p>
          <p className="text-[#a0a0a0] text-sm mb-2">Chạy nhiều bot từ 1 OpenClaw instance:</p>
          <CodeBlock>{`channels.telegram.accounts.bot2.botToken = "SECOND_TOKEN"
channels.telegram.accounts.bot2.dmPolicy = "allowlist"`}</CodeBlock>
        </section>

        <section>
          <h3 className="text-[#ff5c5c] font-semibold mb-2 text-sm uppercase tracking-widest">Zalo Personal</h3>
          <ul className="space-y-1 text-sm text-[#a0a0a0]">
            <li>• Kết nối tài khoản Zalo cá nhân qua QR code</li>
            <li>• Hỗ trợ gửi/nhận tin nhắn, hình ảnh, file</li>
            <li>• Agent phản hồi tự động trong chat cá nhân</li>
          </ul>
        </section>

        <section>
          <h3 className="text-[#ff5c5c] font-semibold mb-2 text-sm uppercase tracking-widest">Zalo OA (Official Account)</h3>
          <ul className="space-y-1 text-sm text-[#a0a0a0]">
            <li>• Dành cho doanh nghiệp có Zalo OA</li>
            <li>• Tích hợp webhook để nhận tin nhắn khách hàng tự động</li>
            <li>• Phù hợp chatbot chăm sóc khách hàng</li>
          </ul>
        </section>

        <section>
          <h3 className="text-[#ff5c5c] font-semibold mb-2 text-sm uppercase tracking-widest">Các kênh khác</h3>
          <div className="grid grid-cols-2 gap-2 text-sm">
            {['WhatsApp', 'Discord', 'Slack', 'iMessage', 'Signal', 'Email'].map(ch => (
              <div key={ch} className="bg-[#0f0f0f] border border-[#1a1a1a] rounded px-3 py-2 text-[#707070] hover:text-white hover:border-[#ff5c5c]/30 transition-colors">
                {ch}
              </div>
            ))}
          </div>
        </section>
      </div>
    ),
  },
  {
    id: 'models',
    icon: '🤖',
    title: 'AI Models',
    content: (
      <div className="space-y-5">
        <div>
          <h2 className="text-xl font-bold text-white mb-1">🤖 AI Models — Models</h2>
          <p className="text-[#707070] text-sm">Kết nối với cloud AI hoặc chạy local trên máy của bạn.</p>
        </div>

        <section>
          <h3 className="text-[#ff5c5c] font-semibold mb-3 text-sm uppercase tracking-widest">Cloud Providers</h3>
          <div className="space-y-2">
            {[
              { name: 'Anthropic', models: 'Claude Sonnet, Haiku, Opus', color: '#ff5c5c' },
              { name: 'OpenAI', models: 'GPT-4o, GPT-4o mini', color: '#22c55e' },
              { name: 'Google', models: 'Gemini 2.0 Flash, Pro', color: '#3b82f6' },
            ].map(p => (
              <div key={p.name} className="bg-[#0f0f0f] border border-[#1a1a1a] rounded-lg px-4 py-3">
                <span className="text-white font-semibold text-sm">{p.name}</span>
                <span className="text-[#707070] text-xs ml-2">{p.models}</span>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h3 className="text-[#ff5c5c] font-semibold mb-3 text-sm uppercase tracking-widest">Local Providers <span className="text-[#22c55e] text-xs normal-case">(Chạy trên máy của bạn)</span></h3>
          <div className="space-y-3">
            <div className="bg-[#0f0f0f] border border-[#1a1a1a] rounded-lg px-4 py-3">
              <div className="font-semibold text-white text-sm mb-1">Ollama</div>
              <p className="text-[#707070] text-xs mb-2">Dễ cài, hỗ trợ Llama 3, Qwen, Mistral, Gemma</p>
              <CodeBlock>{`ollama pull llama3.1
openclaw config set models.providers.ollama.baseUrl http://localhost:11434`}</CodeBlock>
            </div>
            <div className="bg-[#0f0f0f] border border-[#1a1a1a] rounded-lg px-4 py-3">
              <div className="font-semibold text-white text-sm mb-1">LM Studio</div>
              <p className="text-[#707070] text-xs">GUI thân thiện, kéo thả để tải và chạy model</p>
            </div>
            <div className="bg-[#0f0f0f] border border-[#1a1a1a] rounded-lg px-4 py-3">
              <div className="font-semibold text-white text-sm mb-1">EXO</div>
              <p className="text-[#707070] text-xs">Multi-device AI cluster, tối ưu Apple Silicon — chạy model lớn trên nhiều máy Mac</p>
            </div>
          </div>
        </section>
      </div>
    ),
  },
  {
    id: 'automation',
    icon: '⚡',
    title: 'Tự động hóa',
    content: (
      <div className="space-y-5">
        <div>
          <h2 className="text-xl font-bold text-white mb-1">⚡ Tự động hóa — Automation</h2>
          <p className="text-[#707070] text-sm">Lên lịch, trigger, và điều phối AI agent tự động.</p>
        </div>

        <section>
          <h3 className="text-[#ff5c5c] font-semibold mb-2 text-sm uppercase tracking-widest">Cron Jobs — Lên lịch tự động</h3>
          <p className="text-[#a0a0a0] text-sm mb-2">Chạy agent theo lịch cố định (cú pháp cron tiêu chuẩn):</p>
          <CodeBlock>{`openclaw cron add --schedule "0 9 * * 1-5" --message "Tóm tắt email buổi sáng"`}</CodeBlock>
          <p className="text-[#707070] text-xs mt-1">Ví dụ trên: mỗi ngày thường 9h sáng agent sẽ tóm tắt email.</p>
        </section>

        <section>
          <h3 className="text-[#ff5c5c] font-semibold mb-2 text-sm uppercase tracking-widest">Cron Jobs — Ví dụ thực tế</h3>
          <CodeBlock>{`# Nhắc nhở hàng ngày lúc 9 giờ sáng (UTC+7)
openclaw cron add \\
  --name "Morning briefing" \\
  --schedule "0 2 * * *" \\
  --session main \\
  --system-event "Kiểm tra email và tóm tắt lịch hôm nay"

# One-shot reminder tại thời điểm cụ thể
openclaw cron add \\
  --name "Reminder" \\
  --at "2026-01-01T09:00:00+07:00" \\
  --session main \\
  --system-event "Reminder: họp lúc 9h" \\
  --delete-after-run

# Isolated job với delivery
openclaw cron add \\
  --name "Weekly report" \\
  --schedule "0 8 * * 1" \\
  --session isolated \\
  --message "Tạo báo cáo tuần"`}</CodeBlock>
          <p className="text-[#707070] text-xs font-semibold uppercase tracking-widest mt-3 mb-1">Cron expressions</p>
          <CodeBlock>{`0 9 * * 1-5   = 9h sáng Thứ 2-6
0 */6 * * *   = Mỗi 6 tiếng
0 0 * * 0     = Midnight Chủ nhật`}</CodeBlock>
        </section>

        <section>
          <h3 className="text-[#ff5c5c] font-semibold mb-2 text-sm uppercase tracking-widest">Heartbeat — Kiểm tra định kỳ</h3>
          <ul className="space-y-1 text-sm text-[#a0a0a0]">
            <li>• Tạo file <InlineCode>HEARTBEAT.md</InlineCode> trong workspace</li>
            <li>• Agent đọc và thực hiện tasks theo lịch</li>
            <li>• Dùng cho: check email, calendar, thông báo, reports</li>
          </ul>
        </section>

        <section>
          <h3 className="text-[#ff5c5c] font-semibold mb-2 text-sm uppercase tracking-widest">Webhooks — Nhận events từ bên ngoài</h3>
          <CodeBlock>{`openclaw config set gateway.webhooks.enabled true`}</CodeBlock>
          <p className="text-[#707070] text-xs mt-1">Nhận events từ GitHub, Stripe, form submission, v.v. và để agent xử lý tự động.</p>
        </section>

        <section>
          <h3 className="text-[#ff5c5c] font-semibold mb-2 text-sm uppercase tracking-widest">Standing Orders — Lệnh thường trực</h3>
          <p className="text-[#a0a0a0] text-sm">
            Định nghĩa các điều kiện và hành động mặc định. Agent tự động thực hiện khi điều kiện thỏa mãn — không cần nhắc lại mỗi lần.
          </p>
        </section>
      </div>
    ),
  },
  {
    id: 'tools-skills',
    icon: '🔧',
    title: 'Công cụ & Skills',
    content: (
      <div className="space-y-5">
        <div>
          <h2 className="text-xl font-bold text-white mb-1">🔧 Công cụ & Skills — Tools & Skills</h2>
          <p className="text-[#707070] text-sm">Mở rộng khả năng của AI agent.</p>
        </div>

        <section>
          <h3 className="text-[#ff5c5c] font-semibold mb-3 text-sm uppercase tracking-widest">Tools có sẵn</h3>
          <div className="space-y-2">
            {[
              { name: 'exec', desc: 'Chạy lệnh shell — tương tác trực tiếp với hệ thống' },
              { name: 'browser', desc: 'Điều khiển trình duyệt Chrome/Firefox (Playwright)' },
              { name: 'web_search', desc: 'Tìm kiếm web qua Brave Search API' },
              { name: 'web_fetch', desc: 'Đọc nội dung trang web, extract text/markdown' },
              { name: 'memory_search', desc: 'Tìm kiếm trong bộ nhớ dài hạn của agent' },
              { name: 'read/write/edit', desc: 'Đọc, ghi, sửa file trên máy tính' },
            ].map(t => (
              <div key={t.name} className="flex items-start gap-3 bg-[#0f0f0f] border border-[#1a1a1a] rounded px-3 py-2">
                <InlineCode>{t.name}</InlineCode>
                <span className="text-[#707070] text-xs pt-0.5">{t.desc}</span>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h3 className="text-[#ff5c5c] font-semibold mb-2 text-sm uppercase tracking-widest">Skills — Mở rộng hành vi agent</h3>
          <ul className="space-y-1.5 text-sm text-[#a0a0a0]">
            <li>• Skills là file markdown (<InlineCode>SKILL.md</InlineCode>) định nghĩa hành vi & hướng dẫn cho agent</li>
            <li>• Tìm và cài skills tại <a href="https://clawhub.com" target="_blank" rel="noopener noreferrer" className="text-[#ff5c5c] hover:underline">clawhub.com</a></li>
            <li>• Tự tạo skill: tạo thư mục <InlineCode>skills/my-skill/SKILL.md</InlineCode> trong workspace</li>
          </ul>
        </section>
      </div>
    ),
  },
  {
    id: 'architecture',
    icon: '🏗️',
    title: 'Kiến trúc',
    content: (
      <div className="space-y-5">
        <div>
          <h2 className="text-xl font-bold text-white mb-1">🏗️ Kiến trúc — Architecture</h2>
          <p className="text-[#707070] text-sm">Cách OpenClaw hoạt động bên trong.</p>
        </div>

        <section>
          <h3 className="text-[#ff5c5c] font-semibold mb-2 text-sm uppercase tracking-widest">Luồng xử lý</h3>
          <pre className="bg-[#0a0a0a] border border-[#1e1e1e] rounded-lg p-5 text-sm font-mono text-[#a0a0a0] leading-loose">
{`Người dùng (Telegram/Zalo/...)
         ↓
OpenClaw Gateway (port 18789)
         ↓
  AI Agent (LLM: Claude/GPT/Ollama...)
         ↓
  Tools & Skills (exec, browser, memory...)
         ↓
  Kết quả trả về người dùng`}
          </pre>
        </section>

        <section className="space-y-3">
          <h3 className="text-[#ff5c5c] font-semibold mb-2 text-sm uppercase tracking-widest">Các thành phần</h3>
          {[
            { name: 'Gateway', desc: 'Trung tâm điều phối — xử lý routing giữa channels và agents, lắng nghe trên port 18789' },
            { name: 'Agent', desc: 'Sử dụng LLM để hiểu yêu cầu, lập kế hoạch, và gọi tools phù hợp' },
            { name: 'Memory', desc: 'Agent ghi nhớ context qua MEMORY.md và daily notes, duy trì continuity qua các session' },
            { name: 'Multi-agent', desc: 'Nhiều agents chuyên biệt làm việc song song — subagents cho các task phức tạp' },
          ].map(c => (
            <div key={c.name} className="bg-[#0f0f0f] border border-[#1a1a1a] rounded-lg px-4 py-3">
              <div className="text-white font-semibold text-sm mb-1">{c.name}</div>
              <p className="text-[#707070] text-xs">{c.desc}</p>
            </div>
          ))}
        </section>
      </div>
    ),
  },
  {
    id: 'pairing',
    icon: '🔑',
    title: 'Pairing & Bảo mật',
    content: (
      <div className="space-y-5">
        <div>
          <h2 className="text-xl font-bold text-white mb-1">🔑 Pairing & Bảo mật</h2>
          <p className="text-[#707070] text-sm">Cách kiểm soát ai có thể nhắn tin với agent của bạn.</p>
        </div>

        <section>
          <h3 className="text-[#ff5c5c] font-semibold mb-2 text-sm uppercase tracking-widest">Pairing là gì?</h3>
          <p className="text-[#a0a0a0] text-sm leading-relaxed">
            Pairing là cơ chế xác thực người dùng. Khi <InlineCode>dmPolicy = "pairing"</InlineCode>, người dùng cần được approve trước khi chat được với bot.
          </p>
        </section>

        <section>
          <h3 className="text-[#ff5c5c] font-semibold mb-2 text-sm uppercase tracking-widest">Luồng hoạt động</h3>
          <ol className="space-y-1.5 text-sm text-[#a0a0a0] list-decimal list-inside">
            <li>Người dùng gửi tin nhắn đầu tiên → bot trả về pairing code</li>
            <li>Operator chạy: <InlineCode>openclaw pairing approve telegram &lt;CODE&gt;</InlineCode></li>
            <li>Người dùng được approve → có thể chat bình thường</li>
          </ol>
        </section>

        <section>
          <h3 className="text-[#ff5c5c] font-semibold mb-2 text-sm uppercase tracking-widest">Các lệnh pairing</h3>
          <CodeBlock>{`openclaw pairing list telegram              # xem danh sách pending
openclaw pairing approve telegram <code>   # approve
openclaw pairing deny telegram <code>      # từ chối
openclaw pairing revoke telegram <userId>  # thu hồi quyền`}</CodeBlock>
        </section>

        <section>
          <h3 className="text-[#ff5c5c] font-semibold mb-2 text-sm uppercase tracking-widest">dmPolicy options</h3>
          <div className="space-y-2">
            {[
              { key: 'pairing', desc: '(mặc định) — yêu cầu approve thủ công' },
              { key: 'allowlist', desc: '— chỉ cho phép user IDs trong allowFrom list' },
              { key: 'open', desc: '— cho phép tất cả (chỉ dùng khi có allowFrom: ["*"])' },
            ].map(o => (
              <div key={o.key} className="flex items-start gap-3 bg-[#0f0f0f] border border-[#1a1a1a] rounded px-3 py-2">
                <InlineCode>{o.key}</InlineCode>
                <span className="text-[#707070] text-xs pt-0.5">{o.desc}</span>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h3 className="text-[#ff5c5c] font-semibold mb-2 text-sm uppercase tracking-widest">Group policy</h3>
          <ul className="space-y-1 text-sm text-[#a0a0a0] mb-3">
            <li>• Thêm bot vào group, set <InlineCode>requireMention: true</InlineCode> để bot chỉ trả lời khi được @mention</li>
            <li>• <InlineCode>allowFrom: ["*"]</InlineCode> cho phép tất cả thành viên group</li>
          </ul>
          <CodeBlock>{`channels.telegram.dmPolicy = "pairing"
channels.telegram.groups["GROUP_ID"].requireMention = true
channels.telegram.groups["GROUP_ID"].allowFrom = ["*"]`}</CodeBlock>
        </section>
      </div>
    ),
  },
  {
    id: 'memory',
    icon: '🧠',
    title: 'Memory & Context',
    content: (
      <div className="space-y-5">
        <div>
          <h2 className="text-xl font-bold text-white mb-1">🧠 Memory & Context</h2>
          <p className="text-[#707070] text-sm">Cách agent ghi nhớ và duy trì context.</p>
        </div>

        <section>
          <h3 className="text-[#ff5c5c] font-semibold mb-3 text-sm uppercase tracking-widest">Hệ thống memory</h3>
          <p className="text-[#a0a0a0] text-sm mb-3">OpenClaw có 3 lớp memory:</p>
          <div className="space-y-3">
            {[
              {
                name: 'MEMORY.md',
                sub: 'Bộ nhớ dài hạn, curated',
                desc: 'Chứa thông tin quan trọng về người dùng, preferences, decisions. Agent đọc khi bắt đầu main session. Cập nhật thủ công hoặc agent tự cập nhật.',
              },
              {
                name: 'Daily notes',
                sub: 'memory/YYYY-MM-DD.md — nhật ký hàng ngày',
                desc: 'Raw log của những gì đã xảy ra. Agent tạo/cập nhật trong session.',
              },
              {
                name: 'Session context',
                sub: 'Trong phiên chat hiện tại',
                desc: 'Tự động, agent nhớ trong suốt session hiện tại.',
              },
            ].map(m => (
              <div key={m.name} className="bg-[#0f0f0f] border border-[#1a1a1a] rounded-lg px-4 py-3">
                <div className="text-white font-semibold text-sm mb-0.5">{m.name}</div>
                <div className="text-[#ff5c5c] text-xs mb-1">{m.sub}</div>
                <p className="text-[#707070] text-xs">{m.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h3 className="text-[#ff5c5c] font-semibold mb-2 text-sm uppercase tracking-widest">Workspace files</h3>
          <div className="space-y-1.5 text-sm">
            {[
              { file: 'SOUL.md', desc: 'Persona và tone của agent' },
              { file: 'USER.md', desc: 'Thông tin về người dùng' },
              { file: 'AGENTS.md', desc: 'Hướng dẫn session startup' },
              { file: 'TOOLS.md', desc: 'Notes về tools, SSH, cameras...' },
            ].map(f => (
              <div key={f.file} className="flex items-center gap-3">
                <InlineCode>{f.file}</InlineCode>
                <span className="text-[#707070] text-xs">— {f.desc}</span>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h3 className="text-[#ff5c5c] font-semibold mb-2 text-sm uppercase tracking-widest">Memory commands</h3>
          <CodeBlock>{`openclaw memory search "query"  # tìm kiếm trong memory
openclaw memory list            # xem memory files`}</CodeBlock>
        </section>

        <section>
          <h3 className="text-[#ff5c5c] font-semibold mb-2 text-sm uppercase tracking-widest">Context pruning</h3>
          <p className="text-[#a0a0a0] text-sm mb-2">Khi context quá dài, OpenClaw tự động prune để tối ưu token:</p>
          <CodeBlock>{`config: agents.defaults.contextPruning.mode = "cache-ttl"`}</CodeBlock>
        </section>
      </div>
    ),
  },
  {
    id: 'plugins',
    icon: '🔌',
    title: 'Plugins & Tích hợp',
    content: (
      <div className="space-y-5">
        <div>
          <h2 className="text-xl font-bold text-white mb-1">🔌 Plugins & Tích hợp</h2>
          <p className="text-[#707070] text-sm">Mở rộng khả năng của OpenClaw.</p>
        </div>

        <section>
          <h3 className="text-[#ff5c5c] font-semibold mb-2 text-sm uppercase tracking-widest">Plugin là gì?</h3>
          <p className="text-[#a0a0a0] text-sm leading-relaxed">
            Plugin là package npm có thể đăng ký: channels mới, model providers, tools, skills, speech, image generation.
          </p>
        </section>

        <section>
          <h3 className="text-[#ff5c5c] font-semibold mb-2 text-sm uppercase tracking-widest">Cài plugin</h3>
          <CodeBlock>{`openclaw plugins install <package-name>
openclaw plugins list
openclaw plugins enable <plugin-id>`}</CodeBlock>
        </section>

        <section>
          <h3 className="text-[#ff5c5c] font-semibold mb-2 text-sm uppercase tracking-widest">Core plugins (có sẵn)</h3>
          <div className="space-y-1.5">
            {[
              { name: 'telegram', desc: 'Telegram Bot API' },
              { name: 'zalouser', desc: 'Zalo personal account' },
              { name: 'acpx', desc: 'Agent Communication Protocol' },
            ].map(p => (
              <div key={p.name} className="flex items-center gap-3 bg-[#0f0f0f] border border-[#1a1a1a] rounded px-3 py-2">
                <InlineCode>{p.name}</InlineCode>
                <span className="text-[#707070] text-xs">— {p.desc}</span>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h3 className="text-[#ff5c5c] font-semibold mb-2 text-sm uppercase tracking-widest">Community plugins</h3>
          <p className="text-[#a0a0a0] text-sm">
            Tìm tại:{' '}
            <a href="https://clawhub.com" target="_blank" rel="noopener noreferrer" className="text-[#ff5c5c] hover:underline">clawhub.com</a>
          </p>
        </section>

        <section>
          <h3 className="text-[#ff5c5c] font-semibold mb-2 text-sm uppercase tracking-widest">Tạo plugin</h3>
          <ol className="space-y-1.5 text-sm text-[#a0a0a0] list-decimal list-inside">
            <li>Tạo npm package với entry point export capabilities</li>
            <li>Đăng ký channels, tools, skills trong plugin</li>
            <li>Publish lên npm hoặc dùng local path</li>
          </ol>
        </section>

        <section>
          <h3 className="text-[#ff5c5c] font-semibold mb-2 text-sm uppercase tracking-widest">Skills ecosystem</h3>
          <ul className="space-y-1 text-sm text-[#a0a0a0] mb-3">
            <li>• Skills là file <InlineCode>SKILL.md</InlineCode> định nghĩa hành vi agent</li>
            <li>• Tìm và cài từ <a href="https://clawhub.com" target="_blank" rel="noopener noreferrer" className="text-[#ff5c5c] hover:underline">clawhub.com</a></li>
            <li>• Tự tạo: <InlineCode>workspace/skills/my-skill/SKILL.md</InlineCode></li>
            <li>• Format: YAML frontmatter + Markdown content</li>
          </ul>
          <p className="text-[#707070] text-xs mb-2 font-semibold uppercase tracking-widest">Ví dụ SKILL.md</p>
          <CodeBlock>{`---
name: weather
description: Get weather forecasts
---
# Weather Skill
When asked about weather, use web_search with query "weather [location]"...`}</CodeBlock>
        </section>
      </div>
    ),
  },
  {
    id: 'cli',
    icon: '🖥️',
    title: 'CLI Reference',
    content: (
      <div className="space-y-5">
        <div>
          <h2 className="text-xl font-bold text-white mb-1">🖥️ CLI Reference</h2>
          <p className="text-[#707070] text-sm">Các lệnh CLI thường dùng.</p>
        </div>

        <section>
          <h3 className="text-[#ff5c5c] font-semibold mb-2 text-sm uppercase tracking-widest">Gateway</h3>
          <CodeBlock>{`openclaw gateway start    # Khởi động gateway
openclaw gateway stop     # Dừng gateway
openclaw gateway status   # Kiểm tra trạng thái
openclaw gateway restart  # Khởi động lại`}</CodeBlock>
        </section>

        <section>
          <h3 className="text-[#ff5c5c] font-semibold mb-2 text-sm uppercase tracking-widest">Channels</h3>
          <CodeBlock>{`openclaw channels list    # Xem các channel đang active
openclaw channels status  # Chi tiết trạng thái từng channel`}</CodeBlock>
        </section>

        <section>
          <h3 className="text-[#ff5c5c] font-semibold mb-2 text-sm uppercase tracking-widest">Config</h3>
          <CodeBlock>{`openclaw config get              # Xem toàn bộ config
openclaw config set key value   # Set một giá trị
openclaw configure              # Chạy wizard cấu hình lại`}</CodeBlock>
        </section>

        <section>
          <h3 className="text-[#ff5c5c] font-semibold mb-2 text-sm uppercase tracking-widest">Cron</h3>
          <CodeBlock>{`openclaw cron list           # Xem jobs
openclaw cron add --name "..." --schedule "0 9 * * *" --message "..."
openclaw cron run <id>       # Chạy job ngay
openclaw cron remove <id>    # Xóa job`}</CodeBlock>
        </section>

        <section>
          <h3 className="text-[#ff5c5c] font-semibold mb-2 text-sm uppercase tracking-widest">Pairing</h3>
          <CodeBlock>{`openclaw pairing list telegram
openclaw pairing approve telegram <code>
openclaw pairing revoke telegram <userId>`}</CodeBlock>
        </section>

        <section>
          <h3 className="text-[#ff5c5c] font-semibold mb-2 text-sm uppercase tracking-widest">Logs & Debug</h3>
          <CodeBlock>{`openclaw logs          # Xem logs gần nhất
openclaw doctor        # Kiểm tra sức khỏe hệ thống
openclaw doctor --fix  # Auto-fix các vấn đề phổ biến`}</CodeBlock>
        </section>

        <section>
          <h3 className="text-[#ff5c5c] font-semibold mb-2 text-sm uppercase tracking-widest">Agents</h3>
          <CodeBlock>{`openclaw agents list  # Xem các agents đã cấu hình
openclaw agent chat   # Chat trực tiếp qua CLI`}</CodeBlock>
        </section>

        <section>
          <h3 className="text-[#ff5c5c] font-semibold mb-2 text-sm uppercase tracking-widest">Dashboard</h3>
          <CodeBlock>{`openclaw dashboard  # Mở Control UI`}</CodeBlock>
        </section>
      </div>
    ),
  },
  {
    id: 'platforms',
    icon: '📱',
    title: 'Nền tảng',
    content: (
      <div className="space-y-5">
        <div>
          <h2 className="text-xl font-bold text-white mb-1">📱 Nền tảng — Platforms</h2>
          <p className="text-[#707070] text-sm">OpenClaw chạy trên mọi nền tảng.</p>
        </div>

        <section className="space-y-3">
          {[
            {
              os: 'macOS',
              badge: 'Khuyên dùng',
              badgeColor: 'text-[#22c55e] bg-[#22c55e]/10',
              desc: 'Native support, Apple Silicon tối ưu cho local LLM (EXO, Ollama)',
              install: 'curl -fsSL https://openclaw.ai/install.sh | bash',
            },
            {
              os: 'Windows',
              badge: 'Supported',
              badgeColor: 'text-[#3b82f6] bg-[#3b82f6]/10',
              desc: 'Hỗ trợ native + WSL2 (WSL2 recommended cho hiệu năng tốt hơn)',
              install: 'iwr -useb https://openclaw.ai/install.ps1 | iex',
            },
            {
              os: 'Linux',
              badge: 'Full support',
              badgeColor: 'text-[#f59e0b] bg-[#f59e0b]/10',
              desc: 'Full support, Systemd daemon tự động khởi động cùng máy',
              install: 'curl -fsSL https://openclaw.ai/install.sh | bash',
            },
            {
              os: 'VPS / Cloud Server',
              badge: '24/7',
              badgeColor: 'text-[#ff5c5c] bg-[#ff5c5c]/10',
              desc: 'Chạy headless, kết nối từ xa qua Tailscale. Lý tưởng cho AI agent hoạt động 24/7',
              install: null,
            },
          ].map(p => (
            <div key={p.os} className="bg-[#0f0f0f] border border-[#1a1a1a] rounded-lg px-4 py-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-white font-semibold text-sm">{p.os}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${p.badgeColor}`}>{p.badge}</span>
              </div>
              <p className="text-[#707070] text-xs mb-2">{p.desc}</p>
              {p.install && <CodeBlock>{p.install}</CodeBlock>}
            </div>
          ))}
        </section>
      </div>
    ),
  },
];

export const DocsPage: React.FC = () => {
  const [activeId, setActiveId] = useState('getting-started');
  const [search, setSearch] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const filtered = useMemo(
    () => docSections.filter(s => s.title.toLowerCase().includes(search.toLowerCase())),
    [search]
  );

  const activeSection = docSections.find(s => s.id === activeId) || docSections[0];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/90 backdrop-blur-xl border-b border-[#1a1a1a] py-3">
        <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between">
          <div className="flex flex-col">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">🦞</span>
              <span className="text-base font-bold text-white tracking-tight">AutoByTaste</span>
            </div>
            <span className="text-[10px] text-[#ff5c5c] font-medium tracking-widest uppercase ml-8 -mt-0.5">Agentic AI · Việt Nam</span>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-xs font-normal text-[#707070] hover:text-white transition-colors">Trang chủ</Link>
            <Link to="/docs" className="text-xs font-normal text-white border-b border-[#ff5c5c] pb-0.5">Tài liệu</Link>
          </div>

          <a
            href="https://zalo.me/0337776435"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#ff5c5c] hover:bg-[#ff7070] text-white px-5 py-2 rounded-full text-xs font-semibold transition-all duration-300"
          >
            Tư vấn miễn phí
          </a>
        </div>
      </nav>

      {/* Main layout */}
      <div className="flex pt-16 max-w-[1200px] mx-auto min-h-screen">
        {/* Mobile sidebar toggle */}
        <button
          className="md:hidden fixed bottom-6 left-6 z-40 bg-[#ff5c5c] text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? '✕ Đóng' : '☰ Menu'}
        </button>

        {/* Sidebar */}
        <aside className={`
          fixed md:sticky top-16 left-0 z-30 h-[calc(100vh-4rem)] 
          w-64 bg-[#0a0a0a] border-r border-[#1a1a1a] 
          overflow-y-auto flex-shrink-0 p-4
          transition-transform duration-300
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}>
          <div className="mb-4">
            <div className="text-xs text-[#ff5c5c] font-semibold uppercase tracking-widest mb-3">📚 Tài liệu</div>
            {/* Search */}
            <input
              type="text"
              placeholder="Tìm kiếm..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-[#111] border border-[#1e1e1e] rounded px-3 py-2 text-xs text-white placeholder-[#444] focus:outline-none focus:border-[#ff5c5c]/50 font-mono"
            />
          </div>

          <nav className="space-y-1">
            {filtered.map(section => (
              <button
                key={section.id}
                onClick={() => { setActiveId(section.id); setSidebarOpen(false); }}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-all duration-200 flex items-center gap-2
                  ${activeId === section.id
                    ? 'bg-[#ff5c5c]/10 text-white border border-[#ff5c5c]/20'
                    : 'text-[#707070] hover:text-white hover:bg-[#111]'
                  }`}
              >
                <span>{section.icon}</span>
                <span>{section.title}</span>
              </button>
            ))}
            {filtered.length === 0 && (
              <p className="text-[#444] text-xs px-3 py-2">Không tìm thấy mục nào.</p>
            )}
          </nav>

          <div className="mt-6 pt-4 border-t border-[#1a1a1a]">
            <a
              href="https://docs.openclaw.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs text-[#707070] hover:text-[#ff5c5c] transition-colors"
            >
              <span>🔗</span>
              <span>Tài liệu gốc (EN)</span>
            </a>
          </div>
        </aside>

        {/* Content area */}
        <main className="flex-1 px-6 md:px-10 py-8 min-w-0">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-[#444] mb-6 font-mono">
            <Link to="/" className="hover:text-[#ff5c5c] transition-colors">Home</Link>
            <span>›</span>
            <Link to="/docs" className="hover:text-[#ff5c5c] transition-colors">Tài liệu</Link>
            <span>›</span>
            <span className="text-[#707070]">{activeSection.icon} {activeSection.title}</span>
          </div>

          {/* Doc content */}
          <div className="max-w-[680px]">
            {activeSection.content}

            {/* CTA */}
            <div className="mt-10 pt-6 border-t border-[#1a1a1a]">
              <a
                href="https://docs.openclaw.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-[#707070] hover:text-[#ff5c5c] transition-colors border border-[#1a1a1a] hover:border-[#ff5c5c]/30 rounded-lg px-4 py-2"
              >
                <span>📖</span>
                <span>Xem tài liệu gốc (EN) tại docs.openclaw.ai</span>
                <span className="text-[#444]">→</span>
              </a>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
