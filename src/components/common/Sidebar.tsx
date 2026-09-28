import React from 'react';
import { 
  Home, 
  Briefcase, 
  BookOpen, 
  CheckCircle2, 
  HelpCircle, 
  Scale, 
  Keyboard, 
  Activity, 
  BookMarked, 
  Layers, 
  Bookmark, 
  MapPin, 
  Bell, 
  Clock, 
  Sparkles,
  X,
  Sun,
  Moon
} from 'lucide-react';

export type ViewType = 
  | 'home'
  | 'recruitments'
  | 'constable'
  | 'si'
  | 'computer'
  | 'radio'
  | 'ministerial'
  | 'syllabus'
  | 'pyq'
  | 'practice'
  | 'mock'
  | 'law'
  | 'typing'
  | 'physical'
  | 'books'
  | 'flashcards'
  | 'errors'
  | 'roadmap'
  | 'notices';

interface SidebarProps {
  currentView: ViewType;
  onSelectView: (view: ViewType) => void;
  language: 'hi' | 'en';
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  isOpen: boolean;
  onClose: () => void;
  errorCount: number;
  bookmarkCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  onSelectView,
  language,
  theme,
  onToggleTheme,
  isOpen,
  onClose,
  errorCount,
  bookmarkCount
}) => {

  const navItems: { id: ViewType; labelEn: string; labelHi: string; icon: React.ReactNode; badge?: string | number; badgeColor?: string; group?: string }[] = [
    { id: 'home', labelEn: 'Dashboard', labelHi: 'डैशबोर्ड', icon: <Home className="w-4 h-4" /> },
    { id: 'recruitments', labelEn: 'Recruitment Hub', labelHi: 'भर्ती केंद्र (Live)', icon: <Briefcase className="w-4 h-4" />, badge: '8 Posts', badgeColor: 'bg-emerald-500/20 text-emerald-400' },
    
    // Core Recruitment Modules
    { id: 'constable', labelEn: 'Constable Civil/PAC', labelHi: 'आरक्षी (कांस्टेबल)', icon: <CheckCircle2 className="w-4 h-4 text-amber-400" />, badge: '60,244', badgeColor: 'bg-amber-500/20 text-amber-300' },
    { id: 'si', labelEn: 'Sub-Inspector (SI)', labelHi: 'उप-निरीक्षक (दरोगा)', icon: <Scale className="w-4 h-4 text-blue-400" />, badge: '4,543', badgeColor: 'bg-blue-500/20 text-blue-300' },
    { id: 'computer', labelEn: 'Computer Operator', labelHi: 'कंप्यूटर ऑपरेटर', icon: <Keyboard className="w-4 h-4 text-cyan-400" /> },
    { id: 'radio', labelEn: 'Radio Police', labelHi: 'रेडियो पुलिस', icon: <Activity className="w-4 h-4 text-purple-400" /> },
    { id: 'ministerial', labelEn: 'ASI Ministerial (Clerk)', labelHi: 'एएसआई लिपिक संवर्ग', icon: <Briefcase className="w-4 h-4 text-rose-400" /> },
    
    // Learning & Syllabus
    { id: 'syllabus', labelEn: 'Official Syllabus', labelHi: 'आधिकारिक पाठ्यक्रम', icon: <BookOpen className="w-4 h-4 text-blue-400" /> },
    { id: 'law', labelEn: 'Old Law ↔ New Law (BNS)', labelHi: 'नवीन आपराधिक कानून (BNS)', icon: <Scale className="w-4 h-4 text-emerald-400" />, badge: 'New', badgeColor: 'bg-emerald-600 text-white' },
    { id: 'books', labelEn: 'Book Library & NCERT', labelHi: 'पुस्तकें एवं एनसीईआरटी', icon: <BookMarked className="w-4 h-4 text-yellow-400" /> },
    
    // Practice & Tests
    { id: 'practice', labelEn: 'Practice Engine (1,244+ Qs)', labelHi: 'अभ्यास इंजन (1244+ प्रश्न)', icon: <HelpCircle className="w-4 h-4 text-indigo-400" />, badge: '1,244', badgeColor: 'bg-indigo-600 text-white' },
    { id: 'mock', labelEn: 'Full Mock Tests', labelHi: 'फुल मॉक टेस्ट', icon: <Clock className="w-4 h-4 text-red-400" />, badge: 'Timed', badgeColor: 'bg-red-500/20 text-red-300' },
    { id: 'pyq', labelEn: 'Verified PYQs Analysis', labelHi: 'प्रामाणिक PYQ विश्लेषण', icon: <Sparkles className="w-4 h-4 text-amber-400" /> },
    { id: 'typing', labelEn: 'Typing Simulator', labelHi: 'टंकण गति परीक्षा', icon: <Keyboard className="w-4 h-4 text-teal-400" /> },
    
    // Physical & Revision
    { id: 'physical', labelEn: 'PST/PET & Running Tracker', labelHi: 'शारीरिक दक्षता एवं रनिंग', icon: <Activity className="w-4 h-4 text-green-400" /> },
    { id: 'flashcards', labelEn: 'Spaced Flashcards', labelHi: 'रिवीजन फ्लैशकार्ड्स', icon: <Layers className="w-4 h-4 text-fuchsia-400" /> },
    { id: 'errors', labelEn: 'Error Notebook & Saved', labelHi: 'त्रुटि पुस्तिका एवं सेव', icon: <Bookmark className="w-4 h-4 text-orange-400" />, badge: errorCount > 0 ? errorCount : (bookmarkCount > 0 ? bookmarkCount : undefined), badgeColor: 'bg-rose-500 text-white' },
    { id: 'roadmap', labelEn: '10-Level Study Planner', labelHi: '10-लेवल स्टडी प्लानर', icon: <MapPin className="w-4 h-4 text-sky-400" /> },
    { id: 'notices', labelEn: 'Official Notice Archive', labelHi: 'सूचना पट (Notice Board)', icon: <Bell className="w-4 h-4 text-yellow-400" />, badge: 'Active', badgeColor: 'bg-amber-600 text-white' }
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          onClick={onClose} 
          className="fixed inset-0 z-40 bg-slate-950/70 backdrop-blur-sm lg:hidden transition-opacity" 
        />
      )}

      {/* Sidebar Container */}
      <aside 
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-slate-900 border-r border-slate-800 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:static lg:h-[calc(100vh-4rem)]`}
      >
        {/* Mobile Header in Drawer */}
        <div className="flex items-center justify-between p-4 border-b border-slate-800 lg:hidden">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-white text-base">UPPRPB MASTER</span>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Links Scrollable List */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {navItems.map((item) => {
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onSelectView(item.id);
                  onClose();
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition group ${
                  isActive 
                    ? 'bg-blue-600 text-white font-semibold shadow-md shadow-blue-900/30' 
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                }`}
              >
                <div className="flex items-center space-x-3 truncate">
                  <span className={`transition-transform group-hover:scale-110 ${isActive ? 'text-white' : ''}`}>
                    {item.icon}
                  </span>
                  <span className="truncate">
                    {language === 'hi' ? item.labelHi : item.labelEn}
                  </span>
                </div>

                {item.badge && (
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${item.badgeColor || 'bg-slate-800 text-slate-300'}`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Theme Toggle in Sidebar */}
        <div className="p-3 border-t border-slate-800 bg-slate-900/60">
          <button
            onClick={onToggleTheme}
            className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 border border-slate-700/60 cursor-pointer"
          >
            <div className="flex items-center space-x-2">
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-indigo-500" />
              )}
              <span>{language === 'hi' ? 'थीम मोड' : 'Theme Mode'}</span>
            </div>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
              theme === 'dark' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30'
            }`}>
              {theme === 'dark' ? (language === 'hi' ? 'डार्क' : 'Dark') : (language === 'hi' ? 'लाइट' : 'Light')}
            </span>
          </button>
        </div>

        {/* Sidebar Footer: Official Helpline & Disclaimer */}
        <div className="p-3 border-t border-slate-800 bg-slate-950/60 text-[11px] text-slate-400 space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-slate-400">UPPRPB Helpline:</span>
            <span className="text-amber-400 font-mono font-medium">0522-2235752</span>
          </div>
          <div className="text-[10px] text-slate-300 leading-tight">
            {language === 'hi' 
              ? 'आधिकारिक स्रोत: uppbpb.gov.in। गैर-सरकारी शैक्षिक मंच।' 
              : 'Primary Source: uppbpb.gov.in. Independent study platform.'}
          </div>
        </div>

      </aside>
    </>
  );
};
