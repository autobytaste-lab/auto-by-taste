
import React from 'react';
import { I18nProvider, useI18n } from './i18n/I18nContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProblemSolution } from './components/ProblemSolution';
import { TargetSegments } from './components/TargetSegments';
import { ChipComparison } from './components/ChipComparison';
import { ModelHardwareGraph } from './components/ModelHardwareGraph';
import { AIArchitectureGraph } from './components/AIArchitectureGraph';
import { OrgChartAgents } from './components/OrgChartAgents';
import { ProductTiers } from './components/ProductTiers';
import { BusinessModel } from './components/BusinessModel';
import { StrategySection } from './components/StrategySection';
import { ServicePricing } from './components/ServicePricing';
import { Footer } from './components/Footer';
import { OpenClawServices } from './components/OpenClawServices';
import { ChatWidget } from './components/ChatWidget';
import ParticleBackground from './components/particles/ParticleBackground';

const AppContent: React.FC = () => {
  const { translations: t } = useI18n();

  return (
    <div className="min-h-screen flex flex-col relative">
      <ParticleBackground />

      <Navbar />
      <main className="flex-grow pt-16">
        <section id="overview">
          <Hero />
        </section>

        <section id="problem">
          <ProblemSolution />
        </section>

        <section id="segments">
          <TargetSegments />
        </section>

        <section id="architecture">
          <AIArchitectureGraph />
        </section>

        <section id="org-chart">
          <OrgChartAgents />
        </section>

        <section id="chip-comparison">
          <ChipComparison />
        </section>

        <section id="models">
          <ModelHardwareGraph />
        </section>

        <section id="products">
          <ProductTiers />
        </section>

        <section id="business">
          <BusinessModel />
        </section>

        <section id="strategy">
          <StrategySection />
        </section>

        <section id="pricing">
          <ServicePricing />
        </section>

        <section id="openclaw">
          <OpenClawServices />
        </section>
      </main>
      <Footer />

      {/* Floating action buttons */}
      <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-end space-y-3">
        {/* Telegram link */}
        <a
          href="https://t.me/autobytaste_community"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center space-x-2 bg-[#161920] border border-[#1e2028] text-[#14b8a6] pl-3 pr-2 py-2 rounded-full shadow-lg hover:border-[#14b8a6]/30 transition-all duration-300 hover:scale-105"
        >
          <span className="text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">Telegram</span>
          <div className="w-9 h-9 bg-[#14b8a6]/15 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
          </div>
        </a>

        {/* Zalo link */}
        <a
          href="https://zalo.me/0337776435"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center space-x-2 bg-[#ff5c5c] text-white pl-3 pr-2 py-2 rounded-full shadow-lg shadow-[#ff5c5c]/20 hover:bg-[#ff7070] transition-all duration-300 hover:scale-105"
        >
          <span className="text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">{t.floatingButton.label}</span>
          <div className="w-9 h-9 bg-[#161920] rounded-full flex items-center justify-center">
            <img src="https://img.icons8.com/color/48/zalo.png" alt={t.floatingButton.zaloAlt} className="w-5 h-5" />
          </div>
        </a>

        {/* Chat Widget */}
        <ChatWidget />
      </div>
    </div>
  );
};

function App() {
  return (
    <I18nProvider>
      <AppContent />
    </I18nProvider>
  );
}

export default App;
