
import React, { useState, useRef, useEffect } from 'react';
import { useScroll, AnimatePresence, motion } from 'framer-motion';
import { Hero } from './components/Hero';
import { EventTeaser } from './components/EventTeaser';
import { HowItWorks } from './components/HowItWorks';
import { ScenarioPreview } from './components/ScenarioPreview';
import { RulesChecklist } from './components/RulesChecklist';
import { FinalCTA } from './components/FinalCTA';
import { CrimeTape } from './components/CrimeTape';
import { FlashlightCursor } from './components/FlashlightCursor';
import { LightToggle } from './components/LightToggle';

// Core Services
import { api } from './api';

// Interactive Components
import { EnvelopeScreen } from './components/EnvelopeScreen';
import { Dashboard } from './components/Dashboard';
import { CaseFileView } from './components/CaseFileView';
import { SuspectsView } from './components/SuspectsView';
import { EvidenceVerification } from './components/EvidenceVerification';
import { Notes } from './components/Notes';
import { FinalSubmission } from './components/FinalSubmission';
import { AdminPanel } from './components/AdminPanel';

type ViewState = 'landing' | 'envelope' | 'dashboard' | 'casefile' | 'suspects' | 'evidence' | 'notes' | 'submission' | 'admin';

const App: React.FC = () => {
  const [flashlightEnabled, setFlashlightEnabled] = useState(true);
  const [view, setView] = useState<ViewState>('landing');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  
  const containerRef = useRef<HTMLDivElement>(null);

  // Sync with Virtual Backend on load
  useEffect(() => {
    const init = async () => {
      const data = await api.getTeamData();
      if (data.startTime) setStartTime(data.startTime);
    };
    init();
  }, []);

  const handleLoginSuccess = async () => {
    const now = Date.now();
    await api.initializeTimer(now);
    setStartTime(now);
    setIsLoggedIn(true);
    setView('envelope');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setView('landing');
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        setView('admin');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div ref={containerRef} className="relative bg-[#050505] min-h-screen font-inter overflow-x-hidden">
      <FlashlightCursor enabled={flashlightEnabled} />
      
      <LightToggle 
        enabled={flashlightEnabled} 
        onToggle={() => setFlashlightEnabled(!flashlightEnabled)} 
      />
      
      <AnimatePresence mode="wait">
        {view === 'landing' && (
          <motion.div 
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Hero onEnter={handleLoginSuccess} />
            <main className="relative z-10">
              <CrimeTape />
              <EventTeaser />
              <CrimeTape reverse />
              <HowItWorks />
              <ScenarioPreview />
              <CrimeTape />
              <RulesChecklist />
              <FinalCTA />
            </main>
          </motion.div>
        )}

        {view === 'envelope' && (
          <EnvelopeScreen 
            key="envelope"
            onComplete={() => setView('dashboard')} 
          />
        )}

        {view === 'dashboard' && (
          <Dashboard 
            key="dashboard"
            startTime={startTime}
            onNavigate={(v) => setView(v as ViewState)} 
            onLogout={handleLogout}
          />
        )}

        {view === 'casefile' && (
          <CaseFileView 
            key="casefile"
            onBack={() => setView('dashboard')} 
          />
        )}

        {view === 'suspects' && (
          <SuspectsView 
            key="suspects"
            onBack={() => setView('dashboard')} 
          />
        )}

        {view === 'evidence' && (
          <EvidenceVerification 
            key="evidence"
            onBack={() => setView('dashboard')} 
          />
        )}

        {view === 'notes' && (
          <Notes 
            key="notes"
            onBack={() => setView('dashboard')} 
          />
        )}

        {view === 'submission' && (
          <FinalSubmission 
            key="submission"
            startTime={startTime}
            onBack={() => setView('dashboard')} 
          />
        )}

        {view === 'admin' && (
          <AdminPanel 
            key="admin"
            onBack={() => setView(isLoggedIn ? 'dashboard' : 'landing')} 
          />
        )}
      </AnimatePresence>

      <div className="fixed inset-0 pointer-events-none opacity-20 z-0">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-red-900 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-gray-900 rounded-full blur-[120px]"></div>
      </div>
    </div>
  );
};

export default App;
