
import React, { useState, useEffect } from 'react';
import { useI18n } from '../i18n/I18nContext';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const { translations: t, language, setLanguage } = useI18n();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-20 transition-all duration-500 ${scrolled ? 'bg-black/80 backdrop-blur-xl saturate-150 border-b border-white/5 py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-[980px] mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg overflow-hidden">
            <img src="/logo.jpg" alt={t.navbar.title} className="w-full h-full object-cover" />
          </div>
          <span className="text-[17px] font-semibold tracking-tight text-[#F5F5F7]">{t.navbar.title}</span>
        </div>

        <div className="hidden md:flex items-center space-x-7">
          <a href="#overview" className="text-xs font-normal text-[#A1A1A6] hover:text-[#F5F5F7] transition-colors duration-300">{t.navbar.overview}</a>
          <a href="#problem" className="text-xs font-normal text-[#A1A1A6] hover:text-[#F5F5F7] transition-colors duration-300">{t.navbar.solution}</a>
          <a href="#architecture" className="text-xs font-normal text-[#A1A1A6] hover:text-[#F5F5F7] transition-colors duration-300">{t.navbar.architecture}</a>
          <a href="#org-chart" className="text-xs font-normal text-[#A1A1A6] hover:text-[#F5F5F7] transition-colors duration-300">{t.navbar.orgChart}</a>
          <a href="#products" className="text-xs font-normal text-[#A1A1A6] hover:text-[#F5F5F7] transition-colors duration-300">{t.navbar.products}</a>
          <a href="#business" className="text-xs font-normal text-[#A1A1A6] hover:text-[#F5F5F7] transition-colors duration-300">{t.navbar.business}</a>
          <a href="#pricing" className="text-xs font-normal text-[#A1A1A6] hover:text-[#F5F5F7] transition-colors duration-300">{t.navbar.pricing}</a>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={() => setLanguage(language === 'en' ? 'vi' : 'en')}
            className="text-xs font-medium text-[#A1A1A6] hover:text-[#F5F5F7] transition-colors duration-300"
          >
            {language === 'en' ? 'VI' : 'EN'}
          </button>
          <a href="#pricing" className="bg-[#0071E3] hover:bg-[#0077ED] text-white px-5 py-2 rounded-full text-xs font-medium transition-all duration-300">
            {t.navbar.ctaButton}
          </a>
        </div>
      </div>
    </nav>
  );
};
