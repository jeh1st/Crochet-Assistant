
import React, { useState, useEffect } from 'react';
import { Router, Routes, Route } from './components/SimpleRouter';
import Navbar from './components/Navbar';
import ScrollToTopButton from './components/ScrollToTopButton';
import ScrollToTop from './components/ScrollToTop';
import OnboardingTutorial from './components/OnboardingTutorial';

// Pages
import HomePage from './pages/HomePage';
import GlossaryPage from './pages/GlossaryPage';
import TechniquesPage from './pages/TechniquesPage';
import YarnPage from './pages/YarnPage';
import ProjectPlannerPage from './pages/ProjectPlannerPage';

const LOCAL_STORAGE_TUTORIAL_KEY = 'hasSeenOnboardingTutorial';

const App: React.FC = () => {
  const [showTutorial, setShowTutorial] = useState(false);

  useEffect(() => {
    const hasSeenTutorial = localStorage.getItem(LOCAL_STORAGE_TUTORIAL_KEY);
    if (!hasSeenTutorial) {
      setShowTutorial(true);
    }
  }, []);

  const handleDismissTutorial = () => {
    setShowTutorial(false);
    localStorage.setItem(LOCAL_STORAGE_TUTORIAL_KEY, 'true');
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <ScrollToTop /> {/* Handles scrolling on route changes */}
        
        <main className="flex-grow pb-16">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/glossary" element={<GlossaryPage />} />
            <Route path="/techniques" element={<TechniquesPage />} />
            <Route path="/yarn" element={<YarnPage />} />
            <Route path="/planner" element={<ProjectPlannerPage />} />
          </Routes>
        </main>

        <ScrollToTopButton /> {/* The floating button */}

        <footer className="bg-gray-800 text-white py-6 text-center mt-auto">
          <div className="container mx-auto px-4">
            <p>&copy; {new Date().getFullYear()} Amy's Crochet Assistant. All rights reserved.</p>
            <p className="text-sm mt-2">Crafted with ❤️ for crocheters everywhere. But especially for Amy!</p>
          </div>
        </footer>

        <OnboardingTutorial isVisible={showTutorial} onDismiss={handleDismissTutorial} />
      </div>
    </Router>
  );
};

export default App;