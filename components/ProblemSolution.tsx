
import React from 'react';
import { useI18n } from '../i18n/I18nContext';

const Card: React.FC<{ title: string; description: string; icon: string; isProblem?: boolean }> = ({ title, description, icon, isProblem }) => (
  <div className={`p-8 rounded-3xl glass-card border ${isProblem ? 'border-red-500/10' : 'border-emerald-500/10'}`}>
    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${isProblem ? 'bg-red-500/10 text-red-500' : 'bg-emerald-500/10 text-emerald-500'}`}>
      <span className="text-2xl">{icon}</span>
    </div>
    <h3 className="text-xl font-bold text-white mb-4">{title}</h3>
    <p className="text-slate-400 leading-relaxed">{description}</p>
  </div>
);

export const ProblemSolution: React.FC = () => {
  const { translations: t } = useI18n();

  return (
    <div className="py-24 bg-[#0a0a0a]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-4">{t.problemSolution.heading}</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">{t.problemSolution.description}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card
            title={t.problemSolution.problem1Title}
            description={t.problemSolution.problem1Description}
            icon="🔒"
            isProblem
          />
          <Card
            title={t.problemSolution.problem2Title}
            description={t.problemSolution.problem2Description}
            icon="💸"
            isProblem
          />
        </div>

        <div className="p-8 lg:p-12 rounded-[2rem] glass-card-strong bg-gradient-to-br from-blue-600/20 via-transparent to-purple-600/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-white mb-6">{t.problemSolution.solutionTitle}</h3>
              <p className="text-slate-300 mb-8 leading-relaxed">
                {t.problemSolution.solutionDescription}
              </p>
              <ul className="space-y-4 text-slate-400 mb-8">
                <li className="flex items-center space-x-3">
                  <span className="w-5 h-5 bg-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center text-xs">✓</span>
                  <span>{t.problemSolution.check1}</span>
                </li>
                <li className="flex items-center space-x-3">
                  <span className="w-5 h-5 bg-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center text-xs">✓</span>
                  <span>{t.problemSolution.check2}</span>
                </li>
                <li className="flex items-center space-x-3">
                  <span className="w-5 h-5 bg-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center text-xs">✓</span>
                  <span>{t.problemSolution.check3}</span>
                </li>
              </ul>
              <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                 <p className="text-sm font-bold text-emerald-400 uppercase tracking-widest mb-1">{t.problemSolution.commitmentTitle}</p>
                 <p className="text-slate-300 text-sm italic">{t.problemSolution.commitmentQuote}</p>
              </div>
            </div>
            <div className="relative">
              <img src="https://umxxfeuo5ed9xpid.public.blob.vercel-storage.com/media/gemini_generated_image_3mlypz3mlypz3mly_1769612846736.png" className="rounded-2xl shadow-2xl" alt={t.problemSolution.solutionImageAlt} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
