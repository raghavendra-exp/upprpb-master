import React from 'react';
import { Home, BookOpen, HelpCircle, Clock, Activity } from 'lucide-react';
import { ViewType } from './Sidebar';

interface BottomNavProps {
  currentView: ViewType;
  onSelectView: (view: ViewType) => void;
  language: 'hi' | 'en';
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentView,
  onSelectView,
  language
}) => {
  const items: { id: ViewType; labelEn: string; labelHi: string; icon: React.ReactNode }[] = [
    { id: 'home', labelEn: 'Home', labelHi: 'होम', icon: <Home className="w-5 h-5" /> },
    { id: 'syllabus', labelEn: 'Syllabus', labelHi: 'सिलेबस', icon: <BookOpen className="w-5 h-5" /> },
    { id: 'practice', labelEn: 'Practice', labelHi: 'अभ्यास', icon: <HelpCircle className="w-5 h-5" /> },
    { id: 'mock', labelEn: 'Mocks', labelHi: 'मॉक', icon: <Clock className="w-5 h-5" /> },
    { id: 'physical', labelEn: 'PET/PST', labelHi: 'शारीरिक', icon: <Activity className="w-5 h-5" /> },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-900 border-t border-slate-800 shadow-2xl px-2 py-1.5 flex items-center justify-around">
      {items.map((item) => {
        const isActive = currentView === item.id;
        return (
          <button
            key={item.id}
            onClick={() => onSelectView(item.id)}
            className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition ${
              isActive 
                ? 'text-amber-400 font-bold scale-105' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {item.icon}
            <span className="text-[10px] mt-0.5 tracking-tight">
              {language === 'hi' ? item.labelHi : item.labelEn}
            </span>
          </button>
        );
      })}
    </nav>
  );
};
