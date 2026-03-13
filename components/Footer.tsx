
import React from 'react';
import { useI18n } from '../i18n/I18nContext';

export const Footer: React.FC = () => {
  const { translations: t } = useI18n();

  return (
    <footer className="relative bg-white border-t border-black/5 py-14">
      <div className="max-w-[980px] mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-2">
            <div className="mb-6">
              <div className="w-40 h-14 overflow-hidden">
                <img src="https://umxxfeuo5ed9xpid.public.blob.vercel-storage.com/media/4833d5d3_f7a3_4c37_b648_5e433d2e2a1c_1773368431203.png" alt={t.footer.brand} className="w-full h-full object-contain" />
              </div>
            </div>
            <p className="text-[#6B7280] max-w-sm leading-relaxed mb-6 text-sm">
              {t.footer.brandDescription}
            </p>
            <div className="flex space-x-3">
              <a href="https://zalo.me/0337776435" target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-[#D4AF37]/10 hover:bg-[#D4AF37]/15 border border-[#D4AF37]/15 rounded-full text-xs font-medium text-[#D4AF37] transition-all duration-300">
                {t.footer.zaloLink}
              </a>
              <a href="https://wa.me/84337776435" target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-[#30D158]/10 hover:bg-[#30D158]/15 border border-[#30D158]/15 rounded-full text-xs font-medium text-[#30D158] transition-all duration-300">
                {t.footer.whatsappLink}
              </a>
            </div>
          </div>

          <div>
            <h5 className="text-[#2C2C2C] font-semibold text-xs uppercase tracking-wider mb-5">{t.footer.linksTitle}</h5>
            <ul className="space-y-3 text-sm text-[#6B7280]">
              <li><a href="#overview" className="hover:text-[#2C2C2C] transition-colors duration-300">{t.footer.aboutUs}</a></li>
              <li><a href="#products" className="hover:text-[#2C2C2C] transition-colors duration-300">{t.footer.solutions}</a></li>
              <li><a href="#pricing" className="hover:text-[#2C2C2C] transition-colors duration-300">{t.footer.pricing}</a></li>
              <li><a href="#" className="hover:text-[#2C2C2C] transition-colors duration-300">{t.footer.careers}</a></li>
            </ul>
          </div>

          <div>
            <h5 className="text-[#2C2C2C] font-semibold text-xs uppercase tracking-wider mb-5">{t.footer.contactTitle}</h5>
            <ul className="space-y-3 text-sm text-[#6B7280]">
              <li>{t.footer.address}</li>
              <li>{t.footer.email}</li>
              <li className="flex flex-col space-y-1">
                <span className="text-[#78716C] font-medium">{t.footer.founderLabel}</span>
                <a href="tel:0337776435" className="text-[#D4AF37] font-semibold text-lg hover:underline transition-all">{t.footer.phone}</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-black/5 flex flex-col md:flex-row justify-between items-center text-xs text-[#9CA3AF]">
          <p>{t.footer.copyright}</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-[#78716C] transition-colors duration-300">{t.footer.terms}</a>
            <a href="#" className="hover:text-[#78716C] transition-colors duration-300">{t.footer.privacy}</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
