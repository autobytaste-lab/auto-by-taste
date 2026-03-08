
import React from 'react';
import { useI18n } from '../i18n/I18nContext';

export const Footer: React.FC = () => {
  const { translations: t } = useI18n();

  return (
    <footer className="relative bg-[#1D1D1F] border-t border-white/5 py-14">
      <div className="max-w-[980px] mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-7 h-7 rounded-lg overflow-hidden">
                <img src="/logo.jpg" alt={t.footer.brand} className="w-full h-full object-cover" />
              </div>
              <span className="text-[15px] font-semibold text-[#F5F5F7]">{t.footer.brand}</span>
            </div>
            <p className="text-[#86868B] max-w-sm leading-relaxed mb-6 text-sm">
              {t.footer.brandDescription}
            </p>
            <div className="flex space-x-3">
              <a href="https://zalo.me/0337776435" target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-[#0071E3]/10 hover:bg-[#0071E3]/15 border border-[#0071E3]/15 rounded-full text-xs font-medium text-[#2997FF] transition-all duration-300">
                {t.footer.zaloLink}
              </a>
              <a href="https://wa.me/84337776435" target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-[#30D158]/10 hover:bg-[#30D158]/15 border border-[#30D158]/15 rounded-full text-xs font-medium text-[#30D158] transition-all duration-300">
                {t.footer.whatsappLink}
              </a>
            </div>
          </div>

          <div>
            <h5 className="text-[#F5F5F7] font-semibold text-xs uppercase tracking-wider mb-5">{t.footer.linksTitle}</h5>
            <ul className="space-y-3 text-sm text-[#86868B]">
              <li><a href="#overview" className="hover:text-[#F5F5F7] transition-colors duration-300">{t.footer.aboutUs}</a></li>
              <li><a href="#products" className="hover:text-[#F5F5F7] transition-colors duration-300">{t.footer.solutions}</a></li>
              <li><a href="#pricing" className="hover:text-[#F5F5F7] transition-colors duration-300">{t.footer.pricing}</a></li>
              <li><a href="#" className="hover:text-[#F5F5F7] transition-colors duration-300">{t.footer.careers}</a></li>
            </ul>
          </div>

          <div>
            <h5 className="text-[#F5F5F7] font-semibold text-xs uppercase tracking-wider mb-5">{t.footer.contactTitle}</h5>
            <ul className="space-y-3 text-sm text-[#86868B]">
              <li>{t.footer.address}</li>
              <li>{t.footer.email}</li>
              <li className="flex flex-col space-y-1">
                <span className="text-[#A1A1A6] font-medium">{t.footer.founderLabel}</span>
                <a href="tel:0337776435" className="text-[#2997FF] font-semibold text-lg hover:underline transition-all">{t.footer.phone}</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs text-[#6E6E73]">
          <p>{t.footer.copyright}</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-[#A1A1A6] transition-colors duration-300">{t.footer.terms}</a>
            <a href="#" className="hover:text-[#A1A1A6] transition-colors duration-300">{t.footer.privacy}</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
