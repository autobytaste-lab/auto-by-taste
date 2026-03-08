
import React from 'react';
import { useI18n } from '../i18n/I18nContext';

export const Footer: React.FC = () => {
  const { translations: t } = useI18n();

  return (
    <footer className="relative glass-card border-t border-white/10 py-12">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <span className="text-lg font-bold text-white">{t.footer.brand}</span>
            </div>
            <p className="text-slate-400 max-w-sm leading-relaxed mb-6">
              {t.footer.brandDescription}
            </p>
            <div className="flex space-x-4">
              <a href="https://zalo.me/0337776435" target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-blue-600/10 hover:bg-blue-600/20 border border-blue-500/20 rounded-xl text-xs font-bold text-blue-400 transition-all">
                {t.footer.zaloLink}
              </a>
              <a href="https://wa.me/84337776435" target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-emerald-600/10 hover:bg-emerald-600/20 border border-emerald-500/20 rounded-xl text-xs font-bold text-emerald-400 transition-all">
                {t.footer.whatsappLink}
              </a>
            </div>
          </div>

          <div>
            <h5 className="text-white font-bold mb-6">{t.footer.linksTitle}</h5>
            <ul className="space-y-4 text-sm text-slate-500">
              <li><a href="#overview" className="hover:text-blue-400">{t.footer.aboutUs}</a></li>
              <li><a href="#products" className="hover:text-blue-400">{t.footer.solutions}</a></li>
              <li><a href="#pricing" className="hover:text-blue-400">{t.footer.pricing}</a></li>
              <li><a href="#" className="hover:text-blue-400">{t.footer.careers}</a></li>
            </ul>
          </div>

          <div>
            <h5 className="text-white font-bold mb-6">{t.footer.contactTitle}</h5>
            <ul className="space-y-4 text-sm text-slate-500">
              <li>{t.footer.address}</li>
              <li>{t.footer.email}</li>
              <li className="flex flex-col space-y-1">
                <span className="text-slate-300 font-bold">{t.footer.founderLabel}</span>
                <a href="tel:0337776435" className="text-blue-400 font-bold text-lg hover:underline transition-all">{t.footer.phone}</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs text-slate-600">
          <p>{t.footer.copyright}</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-slate-400 transition-colors">{t.footer.terms}</a>
            <a href="#" className="hover:text-slate-400 transition-colors">{t.footer.privacy}</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
