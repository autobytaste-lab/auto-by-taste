
import React from 'react';
import { useI18n } from '../i18n/I18nContext';

const Card: React.FC<{ title: string; description: string; icon: string; isProblem?: boolean }> = ({ title, description, icon, isProblem }) => (
  <div className={`p-8 rounded-3xl bg-[#161920] border ${isProblem ? 'border-[#FF453A]/10' : 'border-[#30D158]/10'} transition-all duration-300 hover:scale-[1.01]`}>
    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 ${isProblem ? 'bg-[#FF453A]/10' : 'bg-[#30D158]/10'}`}>
      <span className="text-2xl">{icon}</span>
    </div>
    <h3 className="text-xl font-semibold text-[#f4f4f5] mb-3">{title}</h3>
    <p className="text-[#838387] leading-relaxed">{description}</p>
  </div>
);

export const ProblemSolution: React.FC = () => {
  const { translations: t } = useI18n();

  return (
    <div className="apple-section bg-[#13151b]">
      <div className="max-w-[980px] mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl lg:text-[56px] font-bold text-[#f4f4f5] mb-4 tracking-[-0.03em] leading-tight">{t.problemSolution.heading}</h2>
          <p className="text-[#838387] max-w-2xl mx-auto text-lg">{t.problemSolution.description}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-5 mb-16">
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

        <div className="p-10 lg:p-14 rounded-[28px] bg-[#161920] border border-[#1e2028] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#ff5c5c]/5 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-[#f4f4f5] mb-6 tracking-[-0.02em]">{t.problemSolution.solutionTitle}</h3>
              <p className="text-[#838387] mb-8 leading-relaxed">
                {t.problemSolution.solutionDescription}
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center space-x-3">
                  <span className="w-5 h-5 bg-[#30D158]/15 text-[#30D158] rounded-full flex items-center justify-center text-xs">✓</span>
                  <span className="text-[#838387]">{t.problemSolution.check1}</span>
                </li>
                <li className="flex items-center space-x-3">
                  <span className="w-5 h-5 bg-[#30D158]/15 text-[#30D158] rounded-full flex items-center justify-center text-xs">✓</span>
                  <span className="text-[#838387]">{t.problemSolution.check2}</span>
                </li>
                <li className="flex items-center space-x-3">
                  <span className="w-5 h-5 bg-[#30D158]/15 text-[#30D158] rounded-full flex items-center justify-center text-xs">✓</span>
                  <span className="text-[#838387]">{t.problemSolution.check3}</span>
                </li>
              </ul>
              <div className="p-4 bg-[#30D158]/5 border border-[#30D158]/10 rounded-2xl">
                 <p className="text-sm font-semibold text-[#30D158] uppercase tracking-widest mb-1">{t.problemSolution.commitmentTitle}</p>
                 <p className="text-[#838387] text-sm italic">{t.problemSolution.commitmentQuote}</p>
              </div>
            </div>
            <div className="relative">
              <img src="https://umxxfeuo5ed9xpid.public.blob.vercel-storage.com/media/gemini_generated_image_3mlypz3mlypz3mly_1769612846736.png" className="rounded-2xl" alt={t.problemSolution.solutionImageAlt} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
