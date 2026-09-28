import React, { useState, useMemo } from 'react';
import { 
  Layers, 
  RotateCw, 
  Check, 
  HelpCircle, 
  Clock, 
  ArrowRight, 
  Sparkles,
  Filter
} from 'lucide-react';
import { ViewType } from '../common/Sidebar';
import { Breadcrumb } from '../common/Breadcrumb';
import flashcardsRaw from '../../data/flashcards/flashcards.json';
import { getFlashcardsState, setFlashcardStatus } from '../../utils/storage';
import { Flashcard } from '../../types';

interface FlashcardsViewProps {
  language: 'hi' | 'en';
  onNavigate: (view: ViewType) => void;
}

export const FlashcardsView: React.FC<FlashcardsViewProps> = ({
  language,
  onNavigate
}) => {
  const allCards: Flashcard[] = flashcardsRaw as Flashcard[];
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [userStates, setUserStates] = useState(getFlashcardsState());

  const subjects = ['all', 'UP GK', 'Law', 'Polity', 'General Hindi', 'Computer', 'General Science'];

  const filteredCards = useMemo(() => {
    if (selectedSubject === 'all') return allCards;
    return allCards.filter(c => c.subject.toLowerCase() === selectedSubject.toLowerCase());
  }, [allCards, selectedSubject]);

  const currentCard = filteredCards[currentIndex] || filteredCards[0];
  const cardStatus = currentCard ? (userStates[currentCard.id] || 'new') : 'new';

  const handleFlip = () => {
    setIsFlipped(prev => !prev);
  };

  const handleNext = () => {
    if (currentIndex < filteredCards.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setIsFlipped(false);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      setIsFlipped(false);
    }
  };

  const handleMarkStatus = (status: 'known' | 'learning' | 'review_later') => {
    if (!currentCard) return;
    setFlashcardStatus(currentCard.id, status);
    setUserStates(getFlashcardsState());
    handleNext();
  };

  return (
    <div className="space-y-6 pb-16 animate-fade-in">
      
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { labelEn: 'Flashcards', labelHi: 'फ्लैशकार्ड्स' },
          { labelEn: 'Spaced Repetition Revision', labelHi: 'अंतराल पुनरावृत्ति (1-3-7-15 दिन)' }
        ]}
        language={language}
        onSelectView={onNavigate}
      />

      {/* Top Banner */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-3">
        <div className="inline-flex items-center space-x-1.5 text-xs font-bold text-fuchsia-400 bg-fuchsia-500/10 border border-fuchsia-500/20 px-3 py-1 rounded-full">
          <Layers className="w-4 h-4" />
          <span>{language === 'hi' ? 'वैज्ञानिक अंतराल पुनरावृत्ति प्रणाली (Spaced Repetition)' : '1-3-7-15-30 Day Spaced Revision Engine'}</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-black text-white">
          {language === 'hi' ? 'रिवीजन फ्लैशकार्ड्स एवं त्वरित स्मरण' : 'Active Recall Revision Flashcards'}
        </h1>

        <p className="text-xs sm:text-sm text-slate-400 max-w-3xl leading-relaxed">
          {language === 'hi'
            ? 'उत्तर प्रदेश सामान्य ज्ञान, मूल विधि (BNS), संविधान अनुच्छेद, हिन्दी व्याकरण व विज्ञान के मुख्य तथ्यों का 3D फ्लिप कार्ड आधारित त्वरित अभ्यास।'
            : 'Master high-yield police exam facts through active recall and spaced interval repetition. Flip cards to test your knowledge.'}
        </p>

        {/* Spaced Repetition Cycle Note */}
        <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] text-slate-300 font-mono">
          <span className="text-amber-400 uppercase font-bold">Revision Intervals:</span>
          <span className="bg-slate-950 px-2 py-0.5 rounded border border-slate-800">1 Day</span>
          <span>➔</span>
          <span className="bg-slate-950 px-2 py-0.5 rounded border border-slate-800">3 Days</span>
          <span>➔</span>
          <span className="bg-slate-950 px-2 py-0.5 rounded border border-slate-800">7 Days</span>
          <span>➔</span>
          <span className="bg-slate-950 px-2 py-0.5 rounded border border-slate-800">15 Days</span>
          <span>➔</span>
          <span className="bg-emerald-900 text-emerald-200 px-2 py-0.5 rounded border border-emerald-700">30 Days (Permanent)</span>
        </div>
      </div>

      {/* Subject Filter Tabs */}
      <div className="flex space-x-2 overflow-x-auto pb-1 scrollbar-none">
        {subjects.map(s => (
          <button
            key={s}
            onClick={() => {
              setSelectedSubject(s);
              setCurrentIndex(0);
              setIsFlipped(false);
            }}
            className={`flex-shrink-0 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition border ${
              selectedSubject === s
                ? 'bg-fuchsia-600 text-white border-fuchsia-500 shadow-md shadow-fuchsia-900/30'
                : 'bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800 hover:text-white'
            }`}
          >
            {s === 'all' ? 'All Subjects' : s}
          </button>
        ))}
      </div>

      {/* Flashcard Area */}
      {currentCard ? (
        <div className="max-w-2xl mx-auto space-y-4">
          
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Card {currentIndex + 1} of {filteredCards.length}</span>
            <div className="flex items-center space-x-2">
              <span className="font-mono text-amber-400 font-bold">{currentCard.subject}</span>
              <span>•</span>
              <span className="capitalize font-bold text-slate-300">{cardStatus}</span>
            </div>
          </div>

          {/* Interactive Flip Card Container */}
          <div 
            onClick={handleFlip}
            className="min-h-[280px] sm:min-h-[320px] rounded-3xl bg-slate-900 border border-slate-800 hover:border-fuchsia-500/60 p-6 sm:p-8 flex flex-col justify-between cursor-pointer transition shadow-2xl relative overflow-hidden select-none"
          >
            <div className="flex items-center justify-between text-xs">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-950 text-slate-400 border border-slate-800">
                {isFlipped ? 'ANSWER (BACK)' : 'QUESTION (FRONT)'}
              </span>
              <span className="text-slate-400 flex items-center space-x-1 text-[11px]">
                <RotateCw className="w-3.5 h-3.5" />
                <span>Click card to flip</span>
              </span>
            </div>

            <div className="my-auto py-6 text-center space-y-3">
              <p className="text-lg sm:text-xl font-bold text-white leading-relaxed">
                {isFlipped 
                  ? (language === 'hi' ? currentCard.backHi : currentCard.back) 
                  : (language === 'hi' ? currentCard.frontHi : currentCard.front)}
              </p>
              {language !== 'hi' && (
                <p className="text-xs text-slate-400">
                  {isFlipped ? currentCard.backHi : currentCard.frontHi}
                </p>
              )}
            </div>

            <div className="text-center text-[11px] text-slate-400">
              Topic: <strong className="text-slate-300">{currentCard.topic}</strong>
            </div>
          </div>

          {/* Recall Feedback Action Buttons */}
          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={() => handleMarkStatus('learning')}
              className="p-3 rounded-2xl bg-rose-950/70 hover:bg-rose-900/80 border border-rose-500/30 text-rose-300 text-xs font-bold transition flex items-center justify-center space-x-1.5 shadow"
            >
              <HelpCircle className="w-4 h-4" />
              <span>Unknown</span>
            </button>

            <button
              onClick={() => handleMarkStatus('review_later')}
              className="p-3 rounded-2xl bg-amber-950/70 hover:bg-amber-900/80 border border-amber-500/30 text-amber-300 text-xs font-bold transition flex items-center justify-center space-x-1.5 shadow"
            >
              <Clock className="w-4 h-4" />
              <span>Review Later</span>
            </button>

            <button
              onClick={() => handleMarkStatus('known')}
              className="p-3 rounded-2xl bg-emerald-950/70 hover:bg-emerald-900/80 border border-emerald-500/30 text-emerald-300 text-xs font-bold transition flex items-center justify-center space-x-1.5 shadow"
            >
              <Check className="w-4 h-4" />
              <span>I Know This</span>
            </button>
          </div>

          {/* Card Prev/Next Navigation */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              className="text-xs text-slate-400 hover:text-white disabled:opacity-30 font-semibold px-4 py-2 rounded-xl"
            >
              ← Previous Card
            </button>

            <button
              onClick={handleNext}
              disabled={currentIndex === filteredCards.length - 1}
              className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold px-4 py-2 rounded-xl"
            >
              Next Card →
            </button>
          </div>

        </div>
      ) : (
        <div className="p-8 rounded-2xl bg-slate-900 text-center text-slate-400">
          No flashcards found for this subject.
        </div>
      )}

    </div>
  );
};
