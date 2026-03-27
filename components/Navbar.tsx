import React, { useState, useEffect } from 'react';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-[#0a0a0a]/90 backdrop-blur-xl border-b border-[#1a1a1a] py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-[980px] mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <div className="flex flex-col">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">🦞</span>
            <span className="text-base font-bold text-white tracking-tight">AutoByTaste</span>
          </div>
          <span className="text-[10px] text-[#ff5c5c] font-medium tracking-widest uppercase ml-8 -mt-0.5">Cộng đồng Agentic AI Việt Nam</span>
        </div>

        {/* Nav links */}
        <div className="hidden md:flex items-center space-x-6">
          <a href="#services" className="text-xs font-normal text-[#707070] hover:text-white transition-colors duration-300">Dịch vụ</a>
          <a href="#usecases" className="text-xs font-normal text-[#707070] hover:text-white transition-colors duration-300">Use Cases</a>
          <a href="#architecture" className="text-xs font-normal text-[#707070] hover:text-white transition-colors duration-300">Kiến trúc</a>
          <a href="#pricing" className="text-xs font-normal text-[#707070] hover:text-white transition-colors duration-300">Bảng giá</a>
        </div>

        {/* CTA */}
        <a
          href="https://zalo.me/0337776435"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#ff5c5c] hover:bg-[#ff7070] text-white px-5 py-2 rounded-full text-xs font-semibold transition-all duration-300 shadow-lg shadow-[#ff5c5c]/25"
        >
          Tư vấn miễn phí
        </a>
      </div>
    </nav>
  );
};
