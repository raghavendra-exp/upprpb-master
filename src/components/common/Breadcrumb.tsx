import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { ViewType } from './Sidebar';

export interface BreadcrumbItem {
  labelEn: string;
  labelHi: string;
  view?: ViewType;
  onClick?: () => void;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  language: 'hi' | 'en';
  onSelectView: (view: ViewType) => void;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  language,
  onSelectView
}) => {
  return (
    <nav className="flex items-center space-x-1.5 text-xs text-slate-400 py-2.5 px-4 bg-slate-900/50 rounded-xl border border-slate-800/80 mb-4 overflow-x-auto whitespace-nowrap">
      
      {/* Root Home Link */}
      <button
        onClick={() => onSelectView('home')}
        className="flex items-center space-x-1 hover:text-amber-400 transition"
      >
        <Home className="w-3.5 h-3.5" />
        <span className="font-semibold text-slate-300">UPPRPB</span>
      </button>

      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <React.Fragment key={index}>
            <ChevronRight className="w-3 h-3 text-slate-400 flex-shrink-0" />
            {isLast ? (
              <span className="font-bold text-amber-400 truncate max-w-[200px] sm:max-w-none">
                {language === 'hi' ? item.labelHi : item.labelEn}
              </span>
            ) : (
              <button
                onClick={() => {
                  if (item.onClick) item.onClick();
                  else if (item.view) onSelectView(item.view);
                }}
                className="hover:text-amber-400 text-slate-300 transition truncate max-w-[120px] sm:max-w-none"
              >
                {language === 'hi' ? item.labelHi : item.labelEn}
              </button>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};
