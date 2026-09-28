import React from 'react';
import { 
  Shield, 
  Search, 
  Languages, 
  Menu, 
  ExternalLink,
  Bell
} from 'lucide-react';

interface HeaderProps {
  language: 'hi' | 'en';
  onToggleLanguage: () => void;
  onOpenSearch: () => void;
  onToggleSidebar: () => void;
  onNavigateNotice: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  language,
  onToggleLanguage,
  onOpenSearch,
  onToggleSidebar,
  onNavigateNotice
}) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-900 text-white shadow-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Left: Mobile Menu Trigger + Logo */}
          <div className="flex items-center space-x-3">
            <button
              onClick={onToggleSidebar}
              className="lg:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
              aria-label="Toggle Navigation Menu"
            >
              <Menu className="w-6 h-6" />
            </button>

            <div className="flex items-center space-x-2.5 cursor-pointer">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 via-amber-600 to-blue-800 flex items-center justify-center shadow-lg border border-amber-400/40">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center space-x-2">
                  <span className="font-extrabold text-lg sm:text-xl tracking-tight text-white">
                    UPPRPB <span className="text-amber-400">MASTER</span>
                  </span>
                  <span className="hidden sm:inline-block text-[10px] uppercase font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded-full">
                    {language === 'hi' ? 'आधिकारिक पैटर्न' : 'Official Pattern'}
                  </span>
                </div>
                <span className="text-[11px] text-slate-300 tracking-wide hidden sm:block">
                  {language === 'hi' ? 'उत्तर प्रदेश पुलिस भर्ती एवं प्रोन्नति बोर्ड तैयारी पोर्टल' : 'Uttar Pradesh Police Recruitment Preparation Ecosystem'}
                </span>
              </div>
            </div>
          </div>

          {/* Right: Quick actions */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            
            {/* Live official source badge */}
            <a 
              href="https://uppbpb.gov.in/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hidden md:flex items-center space-x-1.5 text-xs text-emerald-300 bg-emerald-950/60 border border-emerald-500/30 px-2.5 py-1.5 rounded-lg hover:bg-emerald-900/60 transition"
              title="Official Portal: uppbpb.gov.in"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="font-medium">uppbpb.gov.in</span>
              <ExternalLink className="w-3 h-3 text-emerald-400" />
            </a>

            {/* Global Search Button */}
            <button
              onClick={onOpenSearch}
              className="flex items-center space-x-2 text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700/80 px-3 py-1.5 rounded-lg border border-slate-700 text-xs sm:text-sm transition"
              title={language === 'hi' ? 'खोजें (Ctrl+K)' : 'Search (Ctrl+K)'}
            >
              <Search className="w-4 h-4 text-amber-400" />
              <span className="hidden sm:inline">{language === 'hi' ? 'खोजें...' : 'Search...'}</span>
              <kbd className="hidden lg:inline text-[10px] bg-slate-900 text-slate-400 px-1.5 py-0.5 rounded border border-slate-700">⌘K</kbd>
            </button>

            {/* Notification Center Trigger */}
            <button
              onClick={onNavigateNotice}
              className="relative p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition"
              title={language === 'hi' ? 'आधिकारिक सूचनाएं' : 'Official Notices'}
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500"></span>
            </button>

            {/* Bilingual Toggle */}
            <button
              onClick={onToggleLanguage}
              className="flex items-center space-x-1.5 bg-gradient-to-r from-blue-700 to-indigo-700 hover:from-blue-600 hover:to-indigo-600 text-white px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold shadow-sm transition border border-blue-500/40"
              title="Toggle Hindi / English"
            >
              <Languages className="w-4 h-4" />
              <span>{language === 'hi' ? 'English' : 'हिन्दी'}</span>
            </button>

          </div>

        </div>
      </div>
    </header>
  );
};
