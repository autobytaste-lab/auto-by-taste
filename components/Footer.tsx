
import React from 'react';
import { useI18n } from '../i18n/I18nContext';

const socialLinks = [
  { name: 'Telegram', href: 'https://t.me/agentic_ai_vn', icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg> },
  { name: 'Twitter', href: '#', icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg> },
  { name: 'Github', href: '#', icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg> },
  { name: 'Discord', href: '#', icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z"/></svg> },
  { name: 'LinkedIn', href: '#', icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> },
  { name: 'Facebook', href: '#', icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg> },
  { name: 'Youtube', href: '#', icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg> },
];

export const Footer: React.FC = () => {
  const { translations: t } = useI18n();

  return (
    <footer className="relative bg-[#0a0c10] border-t border-[#1e2028] py-16">
      <div className="max-w-[980px] mx-auto px-6">
        {/* Top section: Solutions + Resources */}
        <div className="grid md:grid-cols-2 gap-12 mb-14">
          {/* Our Solutions */}
          <div>
            <h4 className="text-xl font-bold text-white mb-6">Dịch Vụ AI Agent</h4>
            <div className="grid grid-cols-2 gap-3">
              <ul className="space-y-3 text-sm text-[#9ca3af]">
                <li><a href="#services" className="flex items-center gap-2 hover:text-white transition-colors"><span className="w-1.5 h-1.5 rounded-full bg-[#4ade80]/50"></span>Cho Thuê AI Agent</a></li>
                <li><a href="#usecases" className="flex items-center gap-2 hover:text-white transition-colors"><span className="w-1.5 h-1.5 rounded-full bg-[#4ade80]/50"></span>Sales & CSKH Agent</a></li>
              </ul>
              <ul className="space-y-3 text-sm text-[#9ca3af]">
                <li><a href="#usecases" className="flex items-center gap-2 hover:text-white transition-colors"><span className="w-1.5 h-1.5 rounded-full bg-[#4ade80]/50"></span>Marketing Agent</a></li>
                <li><a href="#pricing" className="flex items-center gap-2 hover:text-white transition-colors"><span className="w-1.5 h-1.5 rounded-full bg-[#4ade80]/50"></span>Bảng Giá Dịch Vụ</a></li>
              </ul>
            </div>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-xl font-bold text-white mb-6">Resources</h4>
            <div className="grid grid-cols-2 gap-3">
              <ul className="space-y-3 text-sm text-[#9ca3af]">
                <li><a href="#" className="flex items-center gap-2 hover:text-white transition-colors"><span className="w-1.5 h-1.5 rounded-full bg-[#4ade80]/50"></span>Whitepaper</a></li>
                <li><a href="/blog" className="flex items-center gap-2 hover:text-white transition-colors"><span className="w-1.5 h-1.5 rounded-full bg-[#4ade80]/50"></span>Latest News</a></li>
              </ul>
              <ul className="space-y-3 text-sm text-[#9ca3af]">
                <li><a href="/docs" className="flex items-center gap-2 hover:text-white transition-colors"><span className="w-1.5 h-1.5 rounded-full bg-[#4ade80]/50"></span>Documentation</a></li>
                <li><a href="https://zalo.me/0337776435" className="flex items-center gap-2 hover:text-white transition-colors"><span className="w-1.5 h-1.5 rounded-full bg-[#4ade80]/50"></span>Tư Vấn Miễn Phí</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-[#1e2028] mb-10"></div>

        {/* Social Media */}
        <div className="mb-12">
          <h4 className="text-xl font-bold text-white mb-6">Social Media</h4>
          <div className="flex flex-col space-y-3">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between px-5 py-4 rounded-full border border-[#1e2028] bg-[#111]/50 hover:border-[#4ade80]/30 hover:bg-[#111] transition-all duration-300 group"
              >
                <div className="flex items-center gap-3">
                  <span className="text-[#9ca3af] group-hover:text-white transition-colors">{link.icon}</span>
                  <span className="text-sm font-medium text-[#9ca3af] group-hover:text-white transition-colors">{link.name}</span>
                </div>
                <svg className="w-4 h-4 text-[#4a4a4a] group-hover:text-[#4ade80] transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </a>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-[#1e2028] flex flex-col md:flex-row justify-between items-center text-xs text-[#636366]">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <img src="https://umxxfeuo5ed9xpid.public.blob.vercel-storage.com/media/img_6726_1774809379159.jpeg" alt="AutoByTaste" className="w-6 h-6 rounded-full object-cover" />
            <p>{t.footer.copyright}</p>
          </div>
          <div className="flex space-x-6">
            <a href="mailto:contact@autobytaste.tech" className="hover:text-[#9ca3af] transition-colors">Email: contact@autobytaste.tech</a>
            <a href="/disclaimer" className="hover:text-[#9ca3af] transition-colors">{t.footer.privacy}</a>
            <a href="/disclaimer" className="hover:text-[#9ca3af] transition-colors">{t.footer.terms}</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
