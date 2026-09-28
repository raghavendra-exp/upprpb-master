import React, { useState, useMemo } from 'react';
import { 
  HelpCircle, 
  Sparkles, 
  Bookmark, 
  RotateCcw, 
  Check, 
  X, 
  ArrowRight, 
  BookOpen,
  Filter,
  CheckCircle2
} from 'lucide-react';
import { ViewType } from '../common/Sidebar';
import { Breadcrumb } from '../common/Breadcrumb';
import { allQuestions, verifiedPyqQuestions } from '../../data/questions';
import { toggleBookmark, getBookmarkedIds, saveErrorNote } from '../../utils/storage';
import { Question } from '../../types';
import confetti from 'canvas-confetti';

interface PracticeViewProps {
  language: 'hi' | 'en';
  onNavigate: (view: ViewType) => void;
  initialFilter?: { subject?: string; topic?: string };
}

export const PracticeView: React.FC<PracticeViewProps> = ({
  language,
  onNavigate,
  initialFilter
}) => {
  const [mode, setMode] = useState<'quick' | 'topic' | 'subject' | 'pyq' | 'bookmarks'>('quick');
  const [selectedSubject, setSelectedSubject] = useState<string>(initialFilter?.subject || 'All');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(getBookmarkedIds());
  const [showExplanation, setShowExplanation] = useState(false);

  // Available subjects for filtering
  const subjectsList = ['All', 'UP GK', 'General Hindi', 'Polity', 'Law', 'Mathematics', 'Reasoning', 'Computer', 'General Science', 'History', 'Geography', 'Economy', 'Current Affairs'];

  // Filter questions based on mode and subject
  const filteredQuestions: Question[] = useMemo(() => {
    let pool = allQuestions;

    if (mode === 'pyq') {
      pool = verifiedPyqQuestions;
    } else if (mode === 'bookmarks') {
      const ids = getBookmarkedIds();
      pool = allQuestions.filter(q => ids.includes(q.id));
      if (pool.length === 0) pool = allQuestions.slice(0, 10);
    }

    if (selectedSubject !== 'All') {
      pool = pool.filter(q => q.subject.toLowerCase() === selectedSubject.toLowerCase());
    }

    // Limit based on mode
    if (mode === 'quick') return pool.slice(0, 10);
    if (mode === 'topic') return pool.slice(0, 20);
    if (mode === 'subject') return pool.slice(0, 50);

    return pool.slice(0, 100);
  }, [mode, selectedSubject]);

  const currentQ = filteredQuestions[currentIndex] || filteredQuestions[0];

  const handleSelectOption = (index: number) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(index);
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null || isAnswerSubmitted) return;
    setIsAnswerSubmitted(true);
    setShowExplanation(true);

    const isCorrect = selectedOption === currentQ.answer;
    if (isCorrect) {
      setScore(prev => prev + 1);
    } else {
      // Auto save to Error Notebook
      saveErrorNote(currentQ, selectedOption);
    }

    // Trigger celebration if it was the last question and scored well
    if (currentIndex === filteredQuestions.length - 1 && isCorrect) {
      try {
        confetti({ particleCount: 80, spread: 60, origin: { y: 0.7 } });
      } catch {}
    }
  };

  const handleNext = () => {
    if (currentIndex < filteredQuestions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
      setShowExplanation(false);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
      setShowExplanation(false);
    }
  };

  const handleBookmarkToggle = () => {
    if (!currentQ) return;
    toggleBookmark(currentQ.id);
    setBookmarkedIds(getBookmarkedIds());
  };

  const handleResetQuiz = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setShowExplanation(false);
    setScore(0);
  };

  const isBookmarked = currentQ && bookmarkedIds.includes(currentQ.id);

  return (
    <div className="space-y-6 pb-16 animate-fade-in">
      
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { labelEn: 'Practice Engine', labelHi: 'अभ्यास इंजन' },
          { labelEn: `${mode.toUpperCase()} Mode (${filteredQuestions.length} Qs)`, labelHi: `${mode.toUpperCase()} मोड` }
        ]}
        language={language}
        onSelectView={onNavigate}
      />

      {/* Mode Switcher & Filter Bar */}
      <div className="p-4 sm:p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-md space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          
          {/* Practice Modes */}
          <div className="flex space-x-1.5 overflow-x-auto pb-1 scrollbar-none">
            <button
              onClick={() => { setMode('quick'); handleResetQuiz(); }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                mode === 'quick' ? 'bg-amber-500 text-slate-950 shadow' : 'bg-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              {language === 'hi' ? 'त्वरित 10 (Quick 10)' : 'Quick 10'}
            </button>
            <button
              onClick={() => { setMode('topic'); handleResetQuiz(); }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                mode === 'topic' ? 'bg-blue-600 text-white shadow' : 'bg-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              {language === 'hi' ? 'टॉपिक 20' : 'Topic 20'}
            </button>
            <button
              onClick={() => { setMode('subject'); handleResetQuiz(); }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                mode === 'subject' ? 'bg-indigo-600 text-white shadow' : 'bg-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              {language === 'hi' ? 'विषय 50' : 'Subject 50'}
            </button>
            <button
              onClick={() => { setMode('pyq'); handleResetQuiz(); }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                mode === 'pyq' ? 'bg-emerald-600 text-white shadow' : 'bg-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              {language === 'hi' ? 'केवल PYQ' : 'Verified PYQs'}
            </button>
            <button
              onClick={() => { setMode('bookmarks'); handleResetQuiz(); }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                mode === 'bookmarks' ? 'bg-purple-600 text-white shadow' : 'bg-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              {language === 'hi' ? 'सेव प्रश्न' : 'Bookmarks'}
            </button>
          </div>

          {/* Subject Filter Dropdown */}
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-slate-400" />
            <select
              value={selectedSubject}
              onChange={(e) => { setSelectedSubject(e.target.value); handleResetQuiz(); }}
              className="bg-slate-800 border border-slate-700 text-xs text-white rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-amber-500"
            >
              {subjectsList.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Progress bar and Score Status */}
        <div className="flex items-center justify-between text-xs text-slate-400 border-t border-slate-800/80 pt-3">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-white">Question {currentIndex + 1} of {filteredQuestions.length}</span>
            <span className="text-slate-600">•</span>
            <span className="font-mono text-amber-400 font-semibold">{currentQ?.subject}</span>
          </div>

          <div className="flex items-center space-x-3">
            <span className="font-medium text-emerald-400">Score: {score} / {currentIndex + (isAnswerSubmitted ? 1 : 0)}</span>
            <button
              onClick={handleResetQuiz}
              className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800"
              title="Reset Quiz"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Visual Progress Bar */}
        <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-amber-500 to-blue-500 transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / filteredQuestions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Main Question Card */}
      {currentQ ? (
        <div className="rounded-3xl bg-slate-900 border border-slate-800 overflow-hidden shadow-xl p-5 sm:p-7 space-y-6">
          
          {/* Question Header Tags */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 flex-wrap gap-y-1">
              <span className={`text-[10px] uppercase font-extrabold px-2.5 py-0.5 rounded-full ${
                currentQ.sourceType === 'verified_pyq'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
              }`}>
                {currentQ.sourceType === 'verified_pyq' ? `✓ VERIFIED PYQ (${currentQ.year || 'Official'})` : 'ORIGINAL PRACTICE'}
              </span>

              <span className="text-[10px] font-mono bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700">
                {currentQ.id}
              </span>

              <span className="text-[10px] font-medium text-slate-400">
                Topic: <strong className="text-slate-200">{currentQ.topic}</strong>
              </span>
            </div>

            <button
              onClick={handleBookmarkToggle}
              className={`p-2 rounded-xl border transition ${
                isBookmarked 
                  ? 'bg-amber-500/20 border-amber-500 text-amber-400' 
                  : 'bg-slate-800/80 border-slate-700 text-slate-400 hover:text-white'
              }`}
              title={isBookmarked ? 'Bookmarked' : 'Add to Bookmarks'}
            >
              <Bookmark className="w-4 h-4 fill-current" />
            </button>
          </div>

          {/* Question Text */}
          <div className="space-y-2">
            <h3 className="text-lg sm:text-xl font-bold text-white leading-relaxed">
              {language === 'hi' ? currentQ.questionHi : currentQ.question}
            </h3>
            {language !== 'hi' && (
              <p className="text-sm text-slate-400 leading-normal">
                {currentQ.questionHi}
              </p>
            )}
          </div>

          {/* Options Grid */}
          <div className="space-y-2.5">
            {(language === 'hi' ? currentQ.optionsHi : currentQ.options).map((optText, optIndex) => {
              const isSelected = selectedOption === optIndex;
              const isCorrectAnswer = optIndex === currentQ.answer;

              let btnStyle = 'bg-slate-800/60 border-slate-700 text-slate-200 hover:bg-slate-800 hover:border-slate-600';
              if (isSelected && !isAnswerSubmitted) {
                btnStyle = 'bg-blue-900/60 border-blue-500 text-white shadow-md';
              }
              if (isAnswerSubmitted) {
                if (isCorrectAnswer) {
                  btnStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-semibold shadow-md';
                } else if (isSelected && !isCorrectAnswer) {
                  btnStyle = 'bg-rose-950/80 border-rose-500 text-rose-200 font-semibold';
                } else {
                  btnStyle = 'bg-slate-900/50 border-slate-800 text-slate-400 opacity-60';
                }
              }

              return (
                <button
                  key={optIndex}
                  onClick={() => handleSelectOption(optIndex)}
                  disabled={isAnswerSubmitted}
                  className={`w-full flex items-center justify-between p-3.5 sm:p-4 rounded-xl border text-left text-xs sm:text-sm transition transform active:scale-99 ${btnStyle}`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="w-6 h-6 rounded-lg bg-slate-900 flex items-center justify-center font-mono text-xs font-bold border border-slate-700 flex-shrink-0">
                      {String.fromCharCode(65 + optIndex)}
                    </span>
                    <span>{optText}</span>
                  </div>

                  {isAnswerSubmitted && isCorrectAnswer && (
                    <Check className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                  )}
                  {isAnswerSubmitted && isSelected && !isCorrectAnswer && (
                    <X className="w-5 h-5 text-rose-400 flex-shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Action Row: Check Answer or Next */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              className="text-xs text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed font-semibold px-3 py-1.5 rounded-lg"
            >
              ← Previous
            </button>

            {!isAnswerSubmitted ? (
              <button
                onClick={handleSubmitAnswer}
                disabled={selectedOption === null}
                className="bg-amber-500 hover:bg-amber-400 disabled:opacity-40 disabled:cursor-not-allowed text-slate-950 font-bold px-6 py-2 rounded-xl text-xs sm:text-sm shadow-md transition"
              >
                {language === 'hi' ? 'उत्तर जांचें' : 'Check Answer'}
              </button>
            ) : (
              <button
                onClick={handleNext}
                disabled={currentIndex === filteredQuestions.length - 1}
                className="bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-white font-bold px-6 py-2 rounded-xl text-xs sm:text-sm shadow-md flex items-center space-x-1.5 transition"
              >
                <span>{language === 'hi' ? 'अगला प्रश्न' : 'Next Question'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Detailed Explanation Panel */}
          {showExplanation && (
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-2 animate-fade-in">
              <div className="flex items-center justify-between text-xs text-amber-400 font-bold uppercase tracking-wider">
                <span className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{language === 'hi' ? 'विस्तृत व्याख्या (Explanation)' : 'Detailed Solution'}</span>
                </span>
                <span className="text-slate-400 text-[11px] font-normal">
                  Source: {currentQ.reference}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                {language === 'hi' ? currentQ.explanationHi : currentQ.explanation}
              </p>
            </div>
          )}

        </div>
      ) : (
        <div className="p-10 rounded-2xl bg-slate-900 border border-slate-800 text-center space-y-3">
          <BookOpen className="w-10 h-10 text-slate-400 mx-auto" />
          <h3 className="text-lg font-bold text-white">No questions in this filter</h3>
          <button 
            onClick={handleResetQuiz}
            className="text-xs bg-blue-600 text-white font-semibold px-4 py-2 rounded-xl"
          >
            Reset Filters
          </button>
        </div>
      )}

    </div>
  );
};
