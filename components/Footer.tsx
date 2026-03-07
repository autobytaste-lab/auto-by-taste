
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="relative glass-card border-t border-white/10 py-12">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <span className="text-lg font-bold text-white">Auto By Taste</span>
            </div>
            <p className="text-slate-400 max-w-sm leading-relaxed mb-6">
              Cung cấp dịch vụ Nhân sự AI Agent 24/7 cho doanh nghiệp Việt Nam. Chi phí thấp, hiệu suất cao, bảo mật tuyệt đối.
            </p>
            <div className="flex space-x-4">
              <a href="https://zalo.me/0337776435" target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-blue-600/10 hover:bg-blue-600/20 border border-blue-500/20 rounded-xl text-xs font-bold text-blue-400 transition-all">
                Zalo Founder
              </a>
              <a href="https://wa.me/84337776435" target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-emerald-600/10 hover:bg-emerald-600/20 border border-emerald-500/20 rounded-xl text-xs font-bold text-emerald-400 transition-all">
                WhatsApp
              </a>
            </div>
          </div>
          
          <div>
            <h5 className="text-white font-bold mb-6">Liên kết</h5>
            <ul className="space-y-4 text-sm text-slate-500">
              <li><a href="#overview" className="hover:text-blue-400">Về chúng tôi</a></li>
              <li><a href="#products" className="hover:text-blue-400">Gói giải pháp</a></li>
              <li><a href="#pricing" className="hover:text-blue-400">Bảng giá dịch vụ</a></li>
              <li><a href="#" className="hover:text-blue-400">Tuyển dụng</a></li>
            </ul>
          </div>

          <div>
            <h5 className="text-white font-bold mb-6">Liên hệ trực tiếp</h5>
            <ul className="space-y-4 text-sm text-slate-500">
              <li>Hà Nội: Nguyễn Xiển</li>
              <li>Email: contact@autobytaste@gmail.com</li>
              <li className="flex flex-col space-y-1">
                <span className="text-slate-300 font-bold">Founder Hotline:</span>
                <a href="tel:0337776435" className="text-blue-400 font-bold text-lg hover:underline transition-all">033 777 6435</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs text-slate-600">
          <p>© 2026 Auto By Taste. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-slate-400 transition-colors">Điều khoản dịch vụ</a>
            <a href="#" className="hover:text-slate-400 transition-colors">Chính sách bảo mật</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
