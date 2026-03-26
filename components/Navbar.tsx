
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
    <nav className={`fixed top-0 left-0 right-0 z-20 transition-all duration-500 ${scrolled ? 'bg-[#0e1015]/90 backdrop-blur-xl saturate-150 border-b border-[#1e2028] py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-[980px] mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-36 h-12 overflow-hidden">
            <img src="https://umxxfeuo5ed9xpid.public.blob.vercel-storage.com/media/4833d5d3_f7a3_4c37_b648_5e433d2e2a1c_1773368431203.png" alt={t.navbar.title} className="w-full h-full object-contain" />
          </div>
        </div>

        <div className="hidden md:flex items-center space-x-7">
          <a href="#overview" className="text-xs font-normal text-[#838387] hover:text-[#f4f4f5] transition-colors duration-300">{t.navbar.overview}</a>
          <a href="#problem" className="text-xs font-normal text-[#838387] hover:text-[#f4f4f5] transition-colors duration-300">{t.navbar.solution}</a>
          <a href="#architecture" className="text-xs font-normal text-[#838387] hover:text-[#f4f4f5] transition-colors duration-300">{t.navbar.architecture}</a>
          <a href="#org-chart" className="text-xs font-normal text-[#838387] hover:text-[#f4f4f5] transition-colors duration-300">{t.navbar.orgChart}</a>
          <a href="#products" className="text-xs font-normal text-[#838387] hover:text-[#f4f4f5] transition-colors duration-300">{t.navbar.products}</a>
          <a href="#business" className="text-xs font-normal text-[#838387] hover:text-[#f4f4f5] transition-colors duration-300">{t.navbar.business}</a>
          <a href="#pricing" className="text-xs font-normal text-[#838387] hover:text-[#f4f4f5] transition-colors duration-300">{t.navbar.pricing}</a>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={() => setLanguage(language === 'en' ? 'vi' : 'en')}
            className="text-xs font-medium text-[#838387] hover:text-[#f4f4f5] transition-colors duration-300"
          >
            {language === 'en' ? 'VI' : 'EN'}
          </button>
          <a href="#pricing" className="bg-[#ff5c5c] hover:bg-[#ff7070] text-white px-5 py-2 rounded-full text-xs font-semibold transition-all duration-300">
            {t.navbar.ctaButton}
          </a>
        </div>
      </div>
    </nav>
  );
};
