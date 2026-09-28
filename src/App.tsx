import React, { useState, useEffect } from 'react';
import { Header } from './components/common/Header';
import { Sidebar, ViewType } from './components/common/Sidebar';
import { BottomNav } from './components/common/BottomNav';
import { SearchModal } from './components/common/SearchModal';
import { Footer } from './components/common/Footer';

// Views
import { HomeView } from './components/views/HomeView';
import { RecruitmentsView } from './components/views/RecruitmentsView';
import { ConstableHubView } from './components/views/ConstableHubView';
import { SubInspectorHubView } from './components/views/SubInspectorHubView';
import { SyllabusView } from './components/views/SyllabusView';
import { PracticeView } from './components/views/PracticeView';
import { MockView } from './components/views/MockView';
import { PyqAnalysisView } from './components/views/PyqAnalysisView';
import { LawComparatorView } from './components/views/LawComparatorView';
import { TypingView } from './components/views/TypingView';
import { PhysicalView } from './components/views/PhysicalView';
import { BooksView } from './components/views/BooksView';
import { FlashcardsView } from './components/views/FlashcardsView';
import { ErrorsView } from './components/views/ErrorsView';
import { RoadmapView } from './components/views/RoadmapView';
import { NoticesView } from './components/views/NoticesView';

import { 
  getStoredLanguage, 
  setStoredLanguage, 
  getStoredTheme,
  setStoredTheme,
  getErrorNotes, 
  getBookmarkedIds 
} from './utils/storage';

export function App() {
  const [language, setLanguage] = useState<'hi' | 'en'>(getStoredLanguage());
  const [theme, setTheme] = useState<'dark' | 'light'>(getStoredTheme());
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [viewContext, setViewContext] = useState<any>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const [errorCount, setErrorCount] = useState<number>(getErrorNotes().length);
  const [bookmarkCount, setBookmarkCount] = useState<number>(getBookmarkedIds().length);

  // Sync theme with document element and persistence
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
    setStoredTheme(theme);
  }, [theme]);

  const handleToggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Sync language changes
  const handleToggleLanguage = () => {
    const nextLang = language === 'hi' ? 'en' : 'hi';
    setLanguage(nextLang);
    setStoredLanguage(nextLang);
  };

  const handleNavigate = (view: ViewType, context?: any) => {
    setCurrentView(view);
    setViewContext(context || null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // Update live badge counts
    setErrorCount(getErrorNotes().length);
    setBookmarkCount(getBookmarkedIds().length);
  };

  // Keyboard shortcut Ctrl+K / Cmd+K for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const renderActiveView = () => {
    switch (currentView) {
      case 'home':
        return <HomeView language={language} onNavigate={handleNavigate} />;
      case 'recruitments':
        return <RecruitmentsView language={language} onNavigate={handleNavigate} selectedPostKey={viewContext?.postKey} />;
      case 'constable':
        return <ConstableHubView language={language} onNavigate={handleNavigate} />;
      case 'si':
        return <SubInspectorHubView language={language} onNavigate={handleNavigate} />;
      case 'computer':
        return <RecruitmentsView language={language} onNavigate={handleNavigate} selectedPostKey="computer-operator" />;
      case 'radio':
        return <RecruitmentsView language={language} onNavigate={handleNavigate} selectedPostKey="radio-police" />;
      case 'ministerial':
        return <RecruitmentsView language={language} onNavigate={handleNavigate} selectedPostKey="ministerial" />;
      case 'syllabus':
        return <SyllabusView language={language} onNavigate={handleNavigate} />;
      case 'practice':
        return <PracticeView language={language} onNavigate={handleNavigate} initialFilter={viewContext} />;
      case 'mock':
        return <MockView language={language} onNavigate={handleNavigate} />;
      case 'pyq':
        return <PyqAnalysisView language={language} onNavigate={handleNavigate} />;
      case 'law':
        return <LawComparatorView language={language} onNavigate={handleNavigate} />;
      case 'typing':
        return <TypingView language={language} onNavigate={handleNavigate} />;
      case 'physical':
        return <PhysicalView language={language} onNavigate={handleNavigate} />;
      case 'books':
        return <BooksView language={language} onNavigate={handleNavigate} />;
      case 'flashcards':
        return <FlashcardsView language={language} onNavigate={handleNavigate} />;
      case 'errors':
        return <ErrorsView language={language} onNavigate={handleNavigate} />;
      case 'roadmap':
        return <RoadmapView language={language} onNavigate={handleNavigate} />;
      case 'notices':
        return <NoticesView language={language} onNavigate={handleNavigate} />;
      default:
        return <HomeView language={language} onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className={`min-h-screen flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950 transition-colors duration-200 theme-root ${
      theme === 'dark' ? 'bg-slate-950 text-slate-100' : 'bg-slate-100 text-slate-900'
    }`}>
      
      {/* Sticky Header */}
      <Header
        language={language}
        theme={theme}
        onToggleTheme={handleToggleTheme}
        onToggleLanguage={handleToggleLanguage}
        onOpenSearch={() => setIsSearchOpen(true)}
        onToggleSidebar={() => setIsSidebarOpen(prev => !prev)}
        onNavigateNotice={() => handleNavigate('notices')}
      />

      {/* Main Body Layout (Sidebar + Content) */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        
        {/* Desktop Sidebar / Mobile Drawer */}
        <Sidebar
          currentView={currentView}
          onSelectView={handleNavigate}
          language={language}
          theme={theme}
          onToggleTheme={handleToggleTheme}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          errorCount={errorCount}
          bookmarkCount={bookmarkCount}
        />

        {/* Dynamic View Content Area */}
        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6 w-full max-w-full overflow-hidden">
          {renderActiveView()}
        </main>

      </div>

      {/* Mobile Sticky Bottom Navigation */}
      <BottomNav
        currentView={currentView}
        onSelectView={handleNavigate}
        language={language}
      />

      {/* Global Bilingual Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        language={language}
        onNavigate={handleNavigate}
      />

      {/* Footer */}
      <Footer
        language={language}
        onNavigate={handleNavigate}
      />

    </div>
  );
}

export default App;
