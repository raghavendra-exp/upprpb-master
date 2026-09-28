import React, { useState } from 'react';
import { 
  Bookmark, 
  Trash2, 
  RotateCcw, 
  HelpCircle, 
  CheckCircle, 
  Clock,
  Sparkles
} from 'lucide-react';
import { ViewType } from '../common/Sidebar';
import { Breadcrumb } from '../common/Breadcrumb';
import { getErrorNotes, removeErrorNote, getBookmarkedIds, toggleBookmark } from '../../utils/storage';
import { allQuestions } from '../../data/questions';
import { ErrorNote, Question } from '../../types';

interface ErrorsViewProps {
  language: 'hi' | 'en';
  onNavigate: (view: ViewType, context?: any) => void;
}

export const ErrorsView: React.FC<ErrorsViewProps> = ({
  language,
  onNavigate
}) => {
  const [errorNotes, setErrorNotes] = useState<ErrorNote[]>(getErrorNotes());
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(getBookmarkedIds());
  const [activeTab, setActiveTab] = useState<'errors' | 'bookmarks'>('errors');

  const bookmarkedQuestions: Question[] = allQuestions.filter(q => bookmarkedIds.includes(q.id));

  const handleRemoveError = (qId: string) => {
    removeErrorNote(qId);
    setErrorNotes(getErrorNotes());
  };

  const handleToggleBookmark = (qId: string) => {
    toggleBookmark(qId);
    setBookmarkedIds(getBookmarkedIds());
  };

  return (
    <div className="space-y-6 pb-16 animate-fade-in">
      
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { labelEn: 'Notebook', labelHi: 'नोटबुक' },
          { 
            labelEn: activeTab === 'errors' ? `Error Notebook (${errorNotes.length})` : `Bookmarks (${bookmarkedQuestions.length})`, 
            labelHi: activeTab === 'errors' ? `त्रुटि पुस्तिका (${errorNotes.length})` : `सेव प्रश्न (${bookmarkedQuestions.length})` 
          }
        ]}
        language={language}
        onSelectView={onNavigate}
      />

      {/* Top Banner */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-3">
        <div className="inline-flex items-center space-x-1.5 text-xs font-bold text-rose-400 bg-rose-500/10 border border-rose-500/20 px-3 py-1 rounded-full">
          <Bookmark className="w-4 h-4" />
          <span>{language === 'hi' ? 'कमजोर क्षेत्रों का व्यक्तिगत सुधार केंद्र' : 'Weak Area Correction & Error Notebook'}</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-black text-white">
          {language === 'hi' ? 'त्रुटि पुस्तिका एवं सेव किए गए प्रश्न' : 'Error Notebook & Saved Questions'}
        </h1>

        <p className="text-xs sm:text-sm text-slate-400 max-w-3xl leading-relaxed">
          {language === 'hi'
            ? 'मॉक टेस्ट एवं टॉपिक अभ्यास के दौरान गलत हुए सभी प्रश्न स्वतः यहां संकलित होते हैं। अपनी गलतियों को दोहराने से बचें और पूर्ण सटीकता प्राप्त करें।'
            : 'All questions answered incorrectly during practice or mocks are automatically archived here for targeted re-testing and error elimination.'}
        </p>

        {/* Tab Switcher */}
        <div className="flex space-x-3 pt-2">
          <button
            onClick={() => setActiveTab('errors')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition border ${
              activeTab === 'errors' 
                ? 'bg-rose-600 text-white border-rose-500 shadow-md shadow-rose-900/30' 
                : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
            }`}
          >
            {language === 'hi' ? `त्रुटि पुस्तिका (${errorNotes.length})` : `Error Notebook (${errorNotes.length})`}
          </button>
          <button
            onClick={() => setActiveTab('bookmarks')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition border ${
              activeTab === 'bookmarks' 
                ? 'bg-amber-600 text-white border-amber-500 shadow-md shadow-amber-900/30' 
                : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
            }`}
          >
            {language === 'hi' ? `सेव प्रश्न (${bookmarkedQuestions.length})` : `Bookmarks (${bookmarkedQuestions.length})`}
          </button>
        </div>
      </div>

      {/* Content Section */}
      {activeTab === 'errors' ? (
        errorNotes.length === 0 ? (
          <div className="p-10 rounded-3xl bg-slate-900 border border-slate-800 text-center space-y-3">
            <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto" />
            <h3 className="text-lg font-bold text-white">
              {language === 'hi' ? 'त्रुटि पुस्तिका खाली है!' : 'No Errors in Notebook!'}
            </h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              {language === 'hi' 
                ? 'जब आप अभ्यास या मॉक टेस्ट में किसी प्रश्न का गलत उत्तर देंगे, तो वह विश्लेषण हेतु स्वतः यहां सुरक्षित हो जाएगा।' 
                : 'Questions you get wrong in Practice or Mocks will automatically appear here for review.'}
            </p>
            <button
              onClick={() => onNavigate('practice')}
              className="text-xs bg-blue-600 text-white font-bold px-4 py-2 rounded-xl shadow"
            >
              Start Practice Session
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {errorNotes.map((entry) => {
              const q = entry.question;
              return (
                <div 
                  key={entry.questionId}
                  className="p-5 sm:p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-lg hover:border-rose-500/40 transition"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
                        {q.subject}
                      </span>
                      <span className="text-xs text-slate-400 font-mono">
                        Topic: {q.topic}
                      </span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleRemoveError(entry.questionId)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition"
                        title="Remove from Errors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <h3 className="font-bold text-sm sm:text-base text-white leading-relaxed">
                    {language === 'hi' ? q.questionHi : q.question}
                  </h3>

                  {/* Options status */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {(language === 'hi' ? q.optionsHi : q.options).map((opt, idx) => {
                      const isCorrect = idx === q.answer;
                      const wasSelectedWrong = idx === entry.selectedAnswer;
                      let bg = 'bg-slate-950/40 border-slate-800 text-slate-400';
                      if (isCorrect) bg = 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-bold';
                      if (wasSelectedWrong) bg = 'bg-rose-950/80 border-rose-500 text-rose-200 line-through';

                      return (
                        <div key={idx} className={`p-2.5 rounded-xl border flex items-center justify-between ${bg}`}>
                          <span>{String.fromCharCode(65 + idx)}. {opt}</span>
                          {isCorrect && <span className="text-[10px] text-emerald-400 font-bold">Correct</span>}
                          {wasSelectedWrong && <span className="text-[10px] text-rose-400 font-bold">Your Choice</span>}
                        </div>
                      );
                    })}
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-300 leading-relaxed">
                    <strong className="text-amber-400 block mb-0.5">Solution & Concept:</strong>
                    {language === 'hi' ? q.explanationHi : q.explanation}
                  </div>
                </div>
              );
            })}
          </div>
        )
      ) : (
        /* Bookmarks Tab */
        bookmarkedQuestions.length === 0 ? (
          <div className="p-10 rounded-3xl bg-slate-900 border border-slate-800 text-center space-y-3">
            <Bookmark className="w-12 h-12 text-slate-400 mx-auto" />
            <h3 className="text-lg font-bold text-white">No bookmarked questions yet</h3>
            <p className="text-xs text-slate-400">
              Click the bookmark icon on any question in Practice or Mock tests to save it here for later.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {bookmarkedQuestions.map((q) => (
              <div 
                key={q.id}
                className="p-5 sm:p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-3 shadow-lg"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-amber-400">{q.subject} • {q.topic}</span>
                  <button
                    onClick={() => handleToggleBookmark(q.id)}
                    className="p-1 text-amber-400 hover:text-white"
                  >
                    <Bookmark className="w-4 h-4 fill-current" />
                  </button>
                </div>
                <h4 className="font-bold text-white text-sm sm:text-base">
                  {language === 'hi' ? q.questionHi : q.question}
                </h4>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300">
                  <strong className="text-emerald-400">Answer:</strong> Option {String.fromCharCode(65 + q.answer)} - {(language === 'hi' ? q.optionsHi : q.options)[q.answer]}
                </div>
              </div>
            ))}
          </div>
        )
      )}

    </div>
  );
};
