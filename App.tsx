import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { I18nProvider } from './i18n/I18nContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { UseCaseGrid } from './components/UseCaseGrid';
import { ToolUseGraph } from './components/ToolUseGraph';
import { UseCaseScenarios } from './components/UseCaseScenarios';
import { IntegrationStrip } from './components/IntegrationStrip';
import { OpenClawServices } from './components/OpenClawServices';
import { QuickStartBlock } from './components/QuickStartBlock';
import { OrgChartAgents } from './components/OrgChartAgents';
import { ServicePricing } from './components/ServicePricing';
import { Footer } from './components/Footer';
import { ChatWidget } from './components/ChatWidget';
import { DisclaimerPage } from './components/DisclaimerPage';
import { CostCalculator } from './components/CostCalculator';
import { IndustrySolutions } from './components/IndustrySolutions';
import { ShowcaseSection } from './components/ShowcaseSection';
import { DocsPage } from './components/DocsPage';
import { BlogPage } from './components/BlogPage';
import { BlogPost } from './components/BlogPost';
import { BlogPreview } from './components/BlogPreview';
import { DemoChatSection } from './components/DemoChatSection';
import { AgentShowcase } from './components/AgentShowcase';
import { GlowCycle } from './components/GlowCycle';

function HomePage() {
  return (
    <div className="min-h-screen flex flex-col relative">
      <Navbar />
      <main className="flex-grow pt-16">
        <section id="overview">
          <Hero />
        </section>

        <section id="glow-cycle">
          <GlowCycle />
        </section>

        <section id="agent-showcase">
          <AgentShowcase />
        </section>

        <section id="demo-chat">
          <DemoChatSection />
        </section>

        <section id="usecases">
          <UseCaseGrid />
        </section>

        <section id="architecture">
          <ToolUseGraph />
        </section>

        <section id="scenarios">
          <UseCaseScenarios />
        </section>

        <section id="integrations">
          <IntegrationStrip />
        </section>

        <section id="services">
          <OpenClawServices />
        </section>

        <section id="quickstart">
          <QuickStartBlock />
        </section>

        <section id="org-chart">
          <OrgChartAgents />
        </section>

        <section id="industry-solutions">
          <IndustrySolutions />
        </section>

        <section id="showcase">
          <ShowcaseSection />
        </section>

        <section id="cost-calculator">
          <CostCalculator />
        </section>

        <section id="pricing">
          <ServicePricing />
        </section>

        <section id="blog-preview">
          <BlogPreview />
        </section>
      </main>
      <Footer />

      {/* Floating action buttons — HomePage only */}
      <div className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-[100] flex flex-col items-end space-y-2 sm:space-y-3">
        {/* Telegram link */}
        <a
          href="https://t.me/agentic_ai_vn"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center space-x-2 bg-[#0f0f0f] border border-[#1e1e1e] text-[#22c55e] pl-2 pr-1.5 py-1.5 sm:pl-3 sm:pr-2 sm:py-2 rounded-full shadow-lg hover:border-[#22c55e]/30 transition-all duration-300 hover:scale-105"
        >
          <span className="text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap hidden sm:inline">Telegram</span>
          <div className="w-7 h-7 sm:w-9 sm:h-9 bg-[#22c55e]/10 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
          </div>
        </a>

        {/* Zalo link */}
        <a
          href="https://zalo.me/0337776435"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center space-x-2 bg-[#4ade80] text-black pl-2 pr-1.5 py-1.5 sm:pl-3 sm:pr-2 sm:py-2 rounded-full shadow-lg shadow-[#4ade80]/20 hover:bg-[#86efac] transition-all duration-300 hover:scale-105"
        >
          <span className="text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap hidden sm:inline">Tư vấn Zalo</span>
          <div className="w-7 h-7 sm:w-9 sm:h-9 bg-black/20 rounded-full flex items-center justify-center">
            <img src="https://img.icons8.com/color/48/zalo.png" alt="Zalo" className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
        </a>

        {/* Chat Widget */}
        <ChatWidget />
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <I18nProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/docs" element={<DocsPage />} />
          <Route path="/docs/*" element={<DocsPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/disclaimer" element={<DisclaimerPage />} />
        </Routes>
      </I18nProvider>
    </BrowserRouter>
  );
}

export default App;
