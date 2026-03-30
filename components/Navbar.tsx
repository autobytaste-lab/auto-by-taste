import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useI18n } from '../i18n/I18nContext';

const navLinks = [
  { href: '#services', label: 'Dịch vụ' },
  { href: '#usecases', label: 'Use Cases' },
  { href: '#architecture', label: 'Kiến trúc' },
  { href: '#pricing', label: 'Bảng giá' },
];

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { language, setLanguage } = useI18n();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on scroll
  useEffect(() => {
    if (scrolled) setMenuOpen(false);
  }, [scrolled]);

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-[#0a0a0a]/90 backdrop-blur-xl border-b border-[#1a1a1a] py-3' : 'bg-transparent py-5'}`}>
        <div className="max-w-[980px] mx-auto px-6 flex items-center justify-between">
          {/* Logo — OptimAI style */}
          <Link to="/" className="flex flex-col group">
            <div className="flex items-center space-x-2">
              <img src="https://umxxfeuo5ed9xpid.public.blob.vercel-storage.com/media/img_6726_1774809379159.jpeg" alt="AutoByTaste" className="w-8 h-8 rounded-full object-cover group-hover:opacity-80 transition-opacity" />
              <div className="flex flex-col">
                <span className="text-base font-bold text-white tracking-tight group-hover:text-[#4ade80] transition-colors">AutoByTaste</span>
                <span className="text-[10px] text-[#9ca3af] font-medium -mt-0.5">AI Agent · 24/7</span>
              </div>
            </div>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map(l => (
              <a key={l.href} href={l.href} className="text-xs font-normal text-[#707070] hover:text-white transition-colors duration-300">{l.label}</a>
            ))}
            <Link to="/blog" className="text-xs font-normal text-[#707070] hover:text-white transition-colors duration-300">✍️ Blog</Link>
            <Link to="/docs" className="text-xs font-normal text-[#707070] hover:text-white transition-colors duration-300">📚 Tài liệu</Link>
          </div>

          {/* Right: CTA + language switch + hamburger */}
          <div className="flex items-center gap-3">
            <a
              href="https://zalo.me/0337776435"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex btn-gradient px-5 py-2 rounded-full text-xs transition-all duration-300"
            >
              Download
            </a>

            {/* Language switch (mobile only) */}
            <button
              onClick={() => setLanguage(language === 'vi' ? 'en' : 'vi')}
              className="md:hidden relative w-14 h-7 rounded-full bg-[#111] border border-[#222] transition-colors duration-300"
              aria-label="Switch language"
            >
              <span
                className={`absolute top-0.5 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-all duration-300 ${
                  language === 'vi'
                    ? 'left-0.5 bg-[#4ade80] text-white'
                    : 'left-[26px] bg-[#14b8a6] text-white'
                }`}
              >
                {language === 'vi' ? 'VI' : 'EN'}
              </span>
            </button>

            {/* Hamburger button (mobile only) */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden flex flex-col items-center justify-center w-9 h-9 rounded-lg bg-[#111] border border-[#222] gap-1.5"
              aria-label="Toggle menu"
            >
              <span className={`block w-4 h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`block w-4 h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`block w-4 h-0.5 bg-white transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile sidebar overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Mobile sidebar drawer */}
      <div className={`fixed top-0 right-0 h-full w-72 z-50 bg-[#0a0a0a] border-l border-[#1a1a1a] flex flex-col transition-transform duration-300 md:hidden ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#1a1a1a]">
          <Link to="/" onClick={() => setMenuOpen(false)} className="flex items-center gap-2">
            <img src="https://umxxfeuo5ed9xpid.public.blob.vercel-storage.com/media/img_6726_1774809379159.jpeg" alt="AutoByTaste" className="w-8 h-8 rounded-full object-cover" />
            <span className="text-sm font-bold text-white">AutoByTaste</span>
          </Link>
          <button onClick={() => setMenuOpen(false)} className="w-8 h-8 flex items-center justify-center text-[#606060] hover:text-white">
            ✕
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex-1 px-4 py-6 space-y-1">
          {navLinks.map(l => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="flex items-center px-4 py-3 rounded-xl text-sm text-[#888] hover:text-white hover:bg-[#111] transition-all duration-200"
            >
              {l.label}
            </a>
          ))}
          <Link
            to="/blog"
            onClick={() => setMenuOpen(false)}
            className="flex items-center px-4 py-3 rounded-xl text-sm text-[#888] hover:text-white hover:bg-[#111] transition-all duration-200"
          >
            ✍️ Blog
          </Link>
          <Link
            to="/docs"
            onClick={() => setMenuOpen(false)}
            className="flex items-center px-4 py-3 rounded-xl text-sm text-[#888] hover:text-white hover:bg-[#111] transition-all duration-200"
          >
            📚 Tài liệu
          </Link>
        </nav>

        {/* Language toggle */}
        <div className="px-4 pb-4">
          <div className="flex items-center justify-between px-4 py-3 rounded-xl bg-[#111] border border-[#222]">
            <span className="text-xs text-[#888]">Ngôn ngữ</span>
            <button
              onClick={() => setLanguage(language === 'vi' ? 'en' : 'vi')}
              className="relative w-14 h-7 rounded-full bg-[#1a1a1a] border border-[#333] transition-colors duration-300"
            >
              <span
                className={`absolute top-0.5 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-all duration-300 ${
                  language === 'vi'
                    ? 'left-0.5 bg-[#4ade80] text-white'
                    : 'left-[26px] bg-[#14b8a6] text-white'
                }`}
              >
                {language === 'vi' ? 'VI' : 'EN'}
              </span>
            </button>
          </div>
        </div>

        {/* CTA */}
        <div className="px-4 pb-8">
          <a
            href="https://zalo.me/0337776435"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center btn-gradient px-5 py-3 rounded-full text-sm transition-all duration-300"
          >
            Tư vấn →
          </a>
          <a
            href="https://t.me/agentic_ai_vn"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center mt-3 bg-[#111] border border-[#222] text-[#888] hover:text-white px-5 py-3 rounded-full text-sm font-medium transition-all duration-300"
          >
            Telegram Community
          </a>
        </div>
      </div>
    </>
  );
};
