
import React from 'react';

export const Hero: React.FC = () => {
  return (
    <div className="relative pt-10 pb-24 lg:pt-20 lg:pb-40 overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[800px] h-[800px] bg-blue-600/10 blur-[150px] rounded-full"></div>
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-[600px] h-[600px] bg-purple-600/10 blur-[120px] rounded-full"></div>

      {/* Floating UI Decorative Elements (resembling the image) */}
      <div className="hidden lg:block absolute top-1/4 left-10 w-48 h-32 glass-card rounded-xl border-blue-500/20 animate-float opacity-40 p-4">
        <div className="w-full h-1.5 bg-blue-500/20 rounded-full mb-3"></div>
        <div className="w-2/3 h-1.5 bg-blue-500/20 rounded-full mb-3"></div>
        <div className="w-full h-1.5 bg-blue-500/20 rounded-full"></div>
      </div>
      <div className="hidden lg:block absolute bottom-1/3 right-10 w-56 h-40 glass-card rounded-xl border-purple-500/20 animate-float opacity-30 p-4" style={{ animationDelay: '2s' }}>
        <div className="flex items-center space-x-2 mb-4">
          <div className="w-3 h-3 rounded-full bg-purple-500/40"></div>
          <div className="w-12 h-2 bg-purple-500/20 rounded-full"></div>
        </div>
        <div className="space-y-2">
          <div className="w-full h-1 bg-purple-500/10 rounded-full"></div>
          <div className="w-full h-1 bg-purple-500/10 rounded-full"></div>
          <div className="w-full h-1 bg-purple-500/10 rounded-full"></div>
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <div className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-1.5 mb-8">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          <span className="text-xs font-bold text-blue-400 tracking-wider uppercase">Dịch vụ Nhân sự AI Agent 24/7</span>
        </div>

        <h1 className="text-5xl lg:text-8xl font-extrabold text-white mb-6 leading-tight tracking-tight">
          Thuê Nhân Viên AI<br />
          <span className="text-gradient">Làm Việc 24/7.</span>
        </h1>

        <p className="max-w-3xl mx-auto text-lg lg:text-xl text-slate-400 mb-10 leading-relaxed font-light">
          Đội ngũ AI Agent chuyên nghiệp - không nghỉ phép, không tăng ca, không lương thưởng.
          Chi phí chỉ từ <span className="text-green-400 font-semibold">3 triệu/tháng</span> - bằng 1/5 nhân viên thực.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-20">
          <a href="#pricing" className="w-full sm:w-auto px-10 py-5 bg-white text-black font-bold rounded-2xl hover:bg-slate-200 transition-all shadow-2xl shadow-white/10 flex items-center justify-center">
            Thuê AI Agent ngay
          </a>
          <a href="https://zalo.me/0337776435" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto px-10 py-5 glass-card text-white font-bold rounded-2xl hover:bg-white/10 transition-all border border-white/10 flex items-center justify-center">
            Tư vấn miễn phí
          </a>
        </div>

        {/* Updated Hero Image Container with Holographic Pedestal Look */}
        <div className="mt-12 relative max-w-5xl mx-auto group">
          <div className="absolute -inset-10 bg-gradient-to-t from-blue-600/30 to-transparent rounded-full blur-3xl opacity-30 animate-pulse"></div>
          
          <div className="relative">
             {/* Glowing base effect like the image */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-32 bg-blue-500/20 blur-[100px] rounded-full -z-10"></div>
            
            <img 
              src="https://umxxfeuo5ed9xpid.public.blob.vercel-storage.com/media/gemini_generated_image_3lbbj3lbbj3lbbj3_1769612732090.png" 
              alt="AI Local Hub Agent on Macmini M4" 
              className="relative rounded-3xl border border-white/10 shadow-[0_0_100px_rgba(59,130,246,0.15)] mx-auto transform hover:scale-[1.02] transition-transform duration-700 ease-out"
            />
            
            {/* Visual overlay for "Pedestal" feel */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-full max-w-md h-12 bg-gradient-to-t from-blue-500/20 to-transparent blur-xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
