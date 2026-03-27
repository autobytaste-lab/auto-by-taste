import React, { useState } from 'react';
import { useI18n } from '../i18n/I18nContext';

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export const ChatWidget: React.FC = () => {
  const { translations: t } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [showQuickActions, setShowQuickActions] = useState(true);

  const handleSend = (text?: string) => {
    const messageText = text || input.trim();
    if (!messageText) return;

    const userMsg: Message = {
      id: Date.now(),
      text: messageText,
      isUser: true,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setShowQuickActions(false);

    // Auto-reply after a short delay
    setTimeout(() => {
      const botMsg: Message = {
        id: Date.now() + 1,
        text: t.chatWidget.offlineMessage,
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMsg]);
    }, 800);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-105 ${
          isOpen
            ? 'bg-[#161920] border border-[#2e3040] text-[#838387]'
            : 'bg-[#14b8a6] text-white shadow-[#14b8a6]/20'
        }`}
        aria-label="Toggle chat"
      >
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-[360px] max-h-[520px] bg-[#161920] border border-[#1e2028] rounded-2xl shadow-2xl shadow-black/40 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="px-5 py-4 border-b border-[#1e2028] bg-[#13151b]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#14b8a6]/15 flex items-center justify-center">
                <span className="text-lg">🦞</span>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-[#f4f4f5]">{t.chatWidget.title}</h4>
                <p className="text-xs text-[#636366]">{t.chatWidget.subtitle}</p>
              </div>
              <div className="ml-auto flex items-center gap-1.5">
                <span className="w-2 h-2 bg-[#22c55e] rounded-full"></span>
                <span className="text-[10px] text-[#22c55e]">Online</span>
              </div>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[200px] max-h-[300px]">
            {messages.length === 0 && showQuickActions && (
              <div className="space-y-2">
                <p className="text-xs text-[#636366] mb-3">{t.chatWidget.subtitle}</p>
                {t.chatWidget.quickActions.map((action, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(action)}
                    className="block w-full text-left px-4 py-2.5 bg-[#191c24] border border-[#1e2028] hover:border-[#6366f1]/30 rounded-xl text-sm text-[#d4d4d8] hover:text-[#f4f4f5] transition-all duration-200"
                  >
                    {action}
                  </button>
                ))}
              </div>
            )}

            {messages.map(msg => (
              <div
                key={msg.id}
                className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    msg.isUser
                      ? 'bg-[#6366f1] text-white rounded-br-md'
                      : 'bg-[#191c24] border border-[#1e2028] text-[#d4d4d8] rounded-bl-md'
                  }`}
                >
                  {msg.text}
                  {!msg.isUser && (
                    <div className="flex gap-2 mt-3">
                      <a
                        href="https://zalo.me/0337776435"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#6366f1]/10 border border-[#6366f1]/20 rounded-lg text-xs text-[#6366f1] hover:bg-[#6366f1]/15 transition-colors"
                      >
                        <img src="https://img.icons8.com/color/48/zalo.png" alt="Zalo" className="w-3.5 h-3.5" />
                        {t.chatWidget.zaloLabel}
                      </a>
                      <a
                        href="https://t.me/autobytaste_bot"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#14b8a6]/10 border border-[#14b8a6]/20 rounded-lg text-xs text-[#14b8a6] hover:bg-[#14b8a6]/15 transition-colors"
                      >
                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
                        {t.chatWidget.telegramLabel}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div className="px-4 py-3 border-t border-[#1e2028] bg-[#13151b]">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={t.chatWidget.placeholder}
                className="flex-1 bg-[#191c24] border border-[#1e2028] rounded-xl px-4 py-2.5 text-sm text-[#f4f4f5] placeholder-[#636366] focus:outline-none focus:border-[#6366f1]/40 transition-colors"
              />
              <button
                onClick={() => handleSend()}
                disabled={!input.trim()}
                className="w-10 h-10 rounded-xl bg-[#6366f1] hover:bg-[#8b5cf6] text-white flex items-center justify-center transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
