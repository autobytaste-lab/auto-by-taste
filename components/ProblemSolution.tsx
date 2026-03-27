import React from 'react';

const comparisonData = [
  { criteria: 'Dữ liệu', cloud: 'Lên server ngoài', local: 'Ở máy bạn', localWin: true },
  { criteria: 'Kết nối internet', cloud: 'Bắt buộc', local: 'Không cần', localWin: true },
  { criteria: 'Chi phí', cloud: 'Tăng theo usage', local: 'Cố định', localWin: true },
  { criteria: 'Bảo mật', cloud: 'Rủi ro rò rỉ', local: 'Tuyệt đối', localWin: true },
  { criteria: 'Tốc độ phản hồi', cloud: 'Có latency', local: 'Nhanh tức thì', localWin: true },
];

export const ProblemSolution: React.FC = () => {
  return (
    <div className="apple-section bg-[#0a0a0f]">
      <div className="max-w-[980px] mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl lg:text-[56px] font-bold text-[#f4f4f5] mb-4 tracking-[-0.03em] leading-tight">
            Tại sao chọn <span className="text-gradient">Local AI?</span>
          </h2>
          <p className="text-[#838387] max-w-2xl mx-auto text-lg">
            Cloud AI tiện lợi nhưng đặt dữ liệu của bạn vào tay người khác. Local AI giữ toàn quyền kiểm soát.
          </p>
        </div>

        {/* Problem cards */}
        <div className="grid md:grid-cols-2 gap-5 mb-16">
          <div className="p-8 rounded-3xl bg-[#0a0a0f] border border-[#6366f1]/10 transition-all duration-300 hover:scale-[1.01]">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6 bg-[#6366f1]/10">
              <span className="text-2xl">🔒</span>
            </div>
            <h3 className="text-xl font-semibold text-[#f4f4f5] mb-3">Dữ liệu rời khỏi công ty</h3>
            <p className="text-[#838387] leading-relaxed">Mỗi lần dùng Cloud AI, dữ liệu khách hàng, nội bộ của bạn được gửi lên server nước ngoài. Không ai biết chuyện gì xảy ra với nó.</p>
          </div>
          <div className="p-8 rounded-3xl bg-[#0a0a0f] border border-[#6366f1]/10 transition-all duration-300 hover:scale-[1.01]">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6 bg-[#6366f1]/10">
              <span className="text-2xl">💸</span>
            </div>
            <h3 className="text-xl font-semibold text-[#f4f4f5] mb-3">Chi phí leo thang mỗi tháng</h3>
            <p className="text-[#838387] leading-relaxed">Cloud AI tính phí theo token, theo usage. Dùng càng nhiều, trả càng nhiều — không có giới hạn. Ngân sách AI của bạn khó kiểm soát.</p>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="relative p-8 lg:p-12 rounded-[28px] bg-[#0a0a0f] border border-[#1e2028] overflow-hidden mb-16">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#6366f1]/4 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
          <div className="relative z-10">
            <h3 className="text-2xl font-bold text-[#f4f4f5] mb-8 tracking-[-0.02em] text-center">Cloud AI vs Local AI (OpenClaw)</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#1e2028]">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-[#838387] w-1/3">Tiêu chí</th>
                    <th className="text-center py-3 px-4 text-sm font-semibold text-[#838387] w-1/3">☁️ Cloud AI</th>
                    <th className="text-center py-3 px-4 text-sm font-semibold text-[#a78bfa] w-1/3">🦞 Local AI (OpenClaw)</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((row, i) => (
                    <tr key={i} className={`border-b border-[#1e2028]/50 ${i % 2 === 0 ? '' : 'bg-[#6366f1]/2'}`}>
                      <td className="py-4 px-4 text-sm font-medium text-[#f4f4f5]">{row.criteria}</td>
                      <td className="py-4 px-4 text-sm text-center text-[#838387]">{row.cloud}</td>
                      <td className="py-4 px-4 text-sm text-center">
                        <span className="inline-flex items-center gap-2 text-[#30D158] font-medium">
                          {row.local} <span className="text-base">✅</span>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Solution block */}
        <div className="relative p-10 lg:p-14 rounded-[28px] bg-[#0a0a0f] border border-[#6366f1]/20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#6366f1]/4 to-[#8b5cf6]/4"></div>
          <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-[#f4f4f5] mb-6 tracking-[-0.02em]">OpenClaw — AI chạy tại văn phòng bạn</h3>
              <p className="text-[#838387] mb-8 leading-relaxed">
                Không cần gửi dữ liệu ra ngoài. OpenClaw chạy hoàn toàn trên máy chủ của bạn — nhanh, bảo mật, và chi phí cố định.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center space-x-3">
                  <span className="w-5 h-5 bg-[#30D158]/15 text-[#30D158] rounded-full flex items-center justify-center text-xs flex-shrink-0">✓</span>
                  <span className="text-[#838387]">Dữ liệu không bao giờ rời khỏi máy chủ của bạn</span>
                </li>
                <li className="flex items-center space-x-3">
                  <span className="w-5 h-5 bg-[#30D158]/15 text-[#30D158] rounded-full flex items-center justify-center text-xs flex-shrink-0">✓</span>
                  <span className="text-[#838387]">Hoạt động 24/7 không cần internet</span>
                </li>
                <li className="flex items-center space-x-3">
                  <span className="w-5 h-5 bg-[#30D158]/15 text-[#30D158] rounded-full flex items-center justify-center text-xs flex-shrink-0">✓</span>
                  <span className="text-[#838387]">Chi phí cố định, không tăng theo usage</span>
                </li>
              </ul>
              <div className="p-4 bg-[#6366f1]/5 border border-[#6366f1]/15 rounded-2xl">
                <p className="text-sm font-semibold text-[#a78bfa] uppercase tracking-widest mb-1">Cam kết của chúng tôi</p>
                <p className="text-[#838387] text-sm italic">"Dữ liệu của bạn là của bạn — không ai khác có quyền truy cập, kể cả chúng tôi."</p>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://umxxfeuo5ed9xpid.public.blob.vercel-storage.com/media/gemini_generated_image_3mlypz3mlypz3mly_1769612846736.png"
                className="rounded-2xl w-full"
                alt="Local AI running on your server"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
