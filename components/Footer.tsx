
import React from 'react';
import { useI18n } from '../i18n/I18nContext';

export const Footer: React.FC = () => {
  const { translations: t } = useI18n();

  return (
    <footer className="relative bg-[#0e1015] border-t border-[#1e2028] py-14">
      <div className="max-w-[980px] mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-2">
            <div className="mb-6">
              <div className="flex items-center space-x-2">
                <img src="/logo.jpg" alt="AutoByTaste" className="w-9 h-9 rounded-full object-cover" />
                <span className="text-xl font-bold text-white tracking-tight">AutoByTaste</span>
              </div>
              <span className="text-[10px] text-[#ff5c5c] font-medium tracking-widest uppercase ml-8">Agentic AI · Việt Nam</span>
            </div>
            <p className="text-[#838387] max-w-sm leading-relaxed mb-6 text-sm">
              {t.footer.brandDescription}
            </p>
            <div className="flex flex-wrap gap-2">
              <a href="https://zalo.me/0337776435" target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-[#ff5c5c]/10 hover:bg-[#ff5c5c]/15 border border-[#ff5c5c]/15 rounded-full text-xs font-medium text-[#ff5c5c] transition-all duration-300">
                {t.footer.zaloLink}
              </a>
              <a href="https://t.me/agentic_ai_vn" target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-[#14b8a6]/10 hover:bg-[#14b8a6]/15 border border-[#14b8a6]/15 rounded-full text-xs font-medium text-[#14b8a6] transition-all duration-300">
                {t.footer.telegramLink}
              </a>
              <a href="https://wa.me/84337776435" target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-[#30D158]/10 hover:bg-[#30D158]/15 border border-[#30D158]/15 rounded-full text-xs font-medium text-[#30D158] transition-all duration-300">
                {t.footer.whatsappLink}
              </a>
            </div>
          </div>

          <div>
            <h5 className="text-[#f4f4f5] font-semibold text-xs uppercase tracking-wider mb-5">{t.footer.linksTitle}</h5>
            <ul className="space-y-3 text-sm text-[#838387]">
              <li><a href="#overview" className="hover:text-[#f4f4f5] transition-colors duration-300">{t.footer.aboutUs}</a></li>
              <li><a href="#products" className="hover:text-[#f4f4f5] transition-colors duration-300">{t.footer.solutions}</a></li>
              <li><a href="#pricing" className="hover:text-[#f4f4f5] transition-colors duration-300">{t.footer.pricing}</a></li>
              <li><a href="#" className="hover:text-[#f4f4f5] transition-colors duration-300">{t.footer.careers}</a></li>
            </ul>
          </div>

          <div>
            <h5 className="text-[#f4f4f5] font-semibold text-xs uppercase tracking-wider mb-5">{t.footer.contactTitle}</h5>
            <ul className="space-y-3 text-sm text-[#838387]">
              <li>{t.footer.address}</li>
              <li>{t.footer.email}</li>
              <li className="flex flex-col space-y-1">
                <span className="text-[#838387] font-medium">{t.footer.founderLabel}</span>
                <a href="tel:0337776435" className="text-[#ff5c5c] font-semibold text-lg hover:underline transition-all">{t.footer.phone}</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-[#1e2028] flex flex-col md:flex-row justify-between items-center text-xs text-[#636366]">
          <p>{t.footer.copyright}</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="/disclaimer" className="hover:text-[#838387] transition-colors duration-300">{t.footer.terms}</a>
            <a href="/disclaimer" className="hover:text-[#838387] transition-colors duration-300">{t.footer.privacy}</a>
            <a href="/disclaimer" className="hover:text-[#838387] transition-colors duration-300">Bảo mật & Miễn trừ</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
