import React, { useState, useMemo, useEffect } from 'react';
import { Search, X, BookOpen, Scale, HelpCircle, Briefcase, ChevronRight } from 'lucide-react';
import { ViewType } from './Sidebar';
import { allQuestions } from '../../data/questions';
import lawDataRaw from '../../data/law/lawComparison.json';
import booksDataRaw from '../../data/books/books.json';
import { LawComparisonItem, BookItem } from '../../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: 'hi' | 'en';
  onNavigate: (view: ViewType, context?: any) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  language,
  onNavigate
}) => {
  const [query, setQuery] = useState('');

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const searchResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q || q.length < 2) return [];

    const results: {
      type: 'recruitment' | 'law' | 'question' | 'book' | 'syllabus';
      title: string;
      subtitle: string;
      badge: string;
      view: ViewType;
      data?: any;
    }[] = [];

    // Search Recruitments
    const recruitments = [
      { name: 'Constable Civil Police & PAC', nameHi: 'आरक्षी नागरिक पुलिस एवं पीएसी', view: 'constable' as ViewType },
      { name: 'Sub-Inspector (SI)', nameHi: 'उप-निरीक्षक (दरोगा)', view: 'si' as ViewType },
      { name: 'Computer Operator Grade-A', nameHi: 'कंप्यूटर ऑपरेटर ग्रेड-ए', view: 'computer' as ViewType },
      { name: 'Radio Police (Head / Assistant Operator)', nameHi: 'रेडियो पुलिस', view: 'radio' as ViewType },
      { name: 'ASI Ministerial (Clerk / Accounts)', nameHi: 'एएसआई लिपिक संवर्ग', view: 'ministerial' as ViewType }
    ];

    recruitments.forEach(r => {
      if (r.name.toLowerCase().includes(q) || r.nameHi.includes(q)) {
        results.push({
          type: 'recruitment',
          title: language === 'hi' ? r.nameHi : r.name,
          subtitle: 'Recruitment Guidelines & Exam Pattern',
          badge: 'Recruitment',
          view: r.view
        });
      }
    });

    // Search Law Comparison (BNS/IPC/BNSS/CrPC)
    const lawData = lawDataRaw as LawComparisonItem[];
    lawData.forEach(item => {
      if (
        item.oldLaw.toLowerCase().includes(q) ||
        item.newLaw.toLowerCase().includes(q) ||
        item.topic.toLowerCase().includes(q) ||
        item.topicHi.includes(q) ||
        item.keyChange.toLowerCase().includes(q) ||
        item.keyChangeHi.includes(q)
      ) {
        results.push({
          type: 'law',
          title: `${item.oldLaw} ➔ ${item.newLaw}`,
          subtitle: language === 'hi' ? item.topicHi : item.topic,
          badge: 'Law / BNS',
          view: 'law',
          data: item
        });
      }
    });

    // Search Books
    const books = booksDataRaw as BookItem[];
    books.forEach(b => {
      if (
        b.title.toLowerCase().includes(q) ||
        b.publisher.toLowerCase().includes(q) ||
        b.subject.toLowerCase().includes(q)
      ) {
        results.push({
          type: 'book',
          title: b.title,
          subtitle: `${b.publisher} • ${b.subject}`,
          badge: 'Book Library',
          view: 'books'
        });
      }
    });

    // Search Questions
    let matchedQCount = 0;
    for (const quest of allQuestions) {
      if (matchedQCount >= 8) break;
      if (
        quest.question.toLowerCase().includes(q) ||
        quest.questionHi.includes(q) ||
        quest.topic.toLowerCase().includes(q) ||
        quest.chapter.toLowerCase().includes(q) ||
        quest.subject.toLowerCase().includes(q)
      ) {
        results.push({
          type: 'question',
          title: language === 'hi' ? quest.questionHi : quest.question,
          subtitle: `${quest.subject} ➔ ${quest.chapter} (${quest.sourceType === 'verified_pyq' ? 'Verified PYQ' : 'Practice'})`,
          badge: quest.sourceType === 'verified_pyq' ? 'PYQ' : 'Question',
          view: 'practice'
        });
        matchedQCount++;
      }
    }

    return results;
  }, [query, language]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div 
        className="w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Box */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-800 bg-slate-900">
          <Search className="w-5 h-5 text-amber-400 mr-3 flex-shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={language === 'hi' ? 'खोजें: धारा 103, 1857 विद्रोह, प्रतिशत, दुधवा, BNS, रीजनिंग...' : 'Search: Section 103, 1857 revolt, percentage, Dudhwa, BNS, reasoning...'}
            className="w-full bg-transparent text-white placeholder-slate-400 text-sm sm:text-base focus:outline-none"
          />
          {query && (
            <button 
              onClick={() => setQuery('')}
              className="p-1 rounded-lg text-slate-400 hover:text-white mr-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button 
            onClick={onClose}
            className="text-xs bg-slate-800 text-slate-300 hover:bg-slate-700 px-2 py-1 rounded border border-slate-700"
          >
            ESC
          </button>
        </div>

        {/* Results Area */}
        <div className="flex-1 overflow-y-auto p-3 space-y-1.5">
          {!query.trim() ? (
            <div className="py-10 text-center text-slate-400 text-xs sm:text-sm">
              <p className="font-medium text-slate-300">
                {language === 'hi' ? 'उत्तर प्रदेश पुलिस भर्ती के संपूर्ण डेटाबेस में खोजें' : 'Universal search across entire UPPRPB ecosystem'}
              </p>
              <p className="text-slate-400 mt-1">
                {language === 'hi' ? '1,244+ प्रश्न, 8 संवर्ग, धारा तुलना (BNS/IPC), पुस्तकें व नोटिस' : '1,244+ questions, 8 cadres, law converter (BNS/IPC), books & notices'}
              </p>
            </div>
          ) : searchResults.length === 0 ? (
            <div className="py-10 text-center text-slate-400 text-xs sm:text-sm">
              <p>{language === 'hi' ? `"${query}" के लिए कोई परिणाम नहीं मिला` : `No results found for "${query}"`}</p>
              <p className="text-slate-400 mt-1">
                {language === 'hi' ? 'कृपया अन्य कीवर्ड जैसे "1857", "Constable", "Dudhwa", "IPC" का प्रयोग करें।' : 'Try alternative keywords like "1857", "Constable", "Dudhwa", "IPC".'}
              </p>
            </div>
          ) : (
            searchResults.map((res, index) => (
              <div
                key={index}
                onClick={() => {
                  onNavigate(res.view, res.data);
                  onClose();
                }}
                className="flex items-center justify-between p-3 rounded-xl bg-slate-800/40 hover:bg-blue-900/30 border border-slate-800 hover:border-blue-500/40 cursor-pointer transition group"
              >
                <div className="flex items-center space-x-3 truncate">
                  <div className="p-2 rounded-lg bg-slate-800 text-amber-400 group-hover:bg-blue-600 group-hover:text-white transition">
                    {res.type === 'recruitment' && <Briefcase className="w-4 h-4" />}
                    {res.type === 'law' && <Scale className="w-4 h-4" />}
                    {res.type === 'question' && <HelpCircle className="w-4 h-4" />}
                    {res.type === 'book' && <BookOpen className="w-4 h-4" />}
                  </div>
                  <div className="truncate">
                    <div className="font-semibold text-sm text-slate-200 group-hover:text-white truncate">
                      {res.title}
                    </div>
                    <div className="text-xs text-slate-400 truncate">
                      {res.subtitle}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2 flex-shrink-0 ml-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                    {res.badge}
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-amber-400 transition" />
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2.5 bg-slate-950/80 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
          <span>{language === 'hi' ? 'द्विभाषी खोज समर्थित (हिन्दी + English)' : 'Bilingual search enabled (Hindi + English)'}</span>
          <span className="text-amber-400 font-medium">1,244 Questions Indexed</span>
        </div>

      </div>
    </div>
  );
};
