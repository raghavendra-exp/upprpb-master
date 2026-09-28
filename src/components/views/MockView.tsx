import React, { useState, useEffect, useMemo } from 'react';
import { 
  Clock, 
  AlertCircle, 
  HelpCircle, 
  RotateCcw,
  Trophy
} from 'lucide-react';
import { ViewType } from '../common/Sidebar';
import { Breadcrumb } from '../common/Breadcrumb';
import mockConfigsRaw from '../../data/mock/mockConfigs.json';
import { allQuestions } from '../../data/questions';
import { Question } from '../../types';
import confetti from 'canvas-confetti';

interface MockViewProps {
  language: 'hi' | 'en';
  onNavigate: (view: ViewType) => void;
}

export const MockView: React.FC<MockViewProps> = ({
  language,
  onNavigate
}) => {
  const configs = mockConfigsRaw;
  const [selectedConfigId, setSelectedConfigId] = useState<string>(configs[0].id);
  const activeConfig = configs.find(c => c.id === selectedConfigId) || configs[0];

  const [isTestStarted, setIsTestStarted] = useState(false);
  const [isTestSubmitted, setIsTestSubmitted] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState<number>(activeConfig.durationMinutes * 60);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  
  // User answers map: questionId -> selectedOptionIndex (0..3)
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  // Marked for review array
  const [markedForReview, setMarkedForReview] = useState<string[]>([]);
  // Visited questions
  const [visitedIndices, setVisitedIndices] = useState<number[]>([0]);

  // Questions allocated for the mock
  const mockQuestions: Question[] = useMemo(() => {
    // Collect balanced questions across subjects
    let qs: Question[] = [];
    if (activeConfig.id === 'mock-constable-01') {
      const gk = allQuestions.filter(q => q.subject === 'UP GK' || q.subject === 'General Science' || q.subject === 'History' || q.subject === 'Polity').slice(0, 38);
      const hin = allQuestions.filter(q => q.subject === 'General Hindi').slice(0, 37);
      const math = allQuestions.filter(q => q.subject === 'Mathematics').slice(0, 38);
      const reas = allQuestions.filter(q => q.subject === 'Reasoning').slice(0, 37);
      qs = [...gk, ...hin, ...math, ...reas];
    } else if (activeConfig.id === 'mock-si-01') {
      const hin = allQuestions.filter(q => q.subject === 'General Hindi').slice(0, 40);
      const lawGk = allQuestions.filter(q => q.subject === 'Law' || q.subject === 'Polity').slice(0, 40);
      const math = allQuestions.filter(q => q.subject === 'Mathematics').slice(0, 40);
      const reas = allQuestions.filter(q => q.subject === 'Reasoning').slice(0, 40);
      qs = [...hin, ...lawGk, ...math, ...reas];
    } else {
      qs = allQuestions.slice(0, activeConfig.totalQuestions);
    }
    // Fallback if less than required
    if (qs.length < 50) qs = allQuestions.slice(0, 50);
    return qs;
  }, [activeConfig]);

  // Countdown timer
  useEffect(() => {
    let timer: any = null;
    if (isTestStarted && !isTestSubmitted && secondsRemaining > 0) {
      timer = setInterval(() => {
        setSecondsRemaining(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            handleSubmitTest();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isTestStarted, isTestSubmitted, secondsRemaining]);

  const currentQ = mockQuestions[currentQuestionIndex] || mockQuestions[0];

  const handleStartTest = () => {
    setIsTestStarted(true);
    setIsTestSubmitted(false);
    setSecondsRemaining(activeConfig.durationMinutes * 60);
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setMarkedForReview([]);
    setVisitedIndices([0]);
  };

  const handleSelectOption = (optIndex: number) => {
    if (!currentQ || isTestSubmitted) return;
    setUserAnswers(prev => ({
      ...prev,
      [currentQ.id]: optIndex
    }));
  };

  const handleClearResponse = () => {
    if (!currentQ || isTestSubmitted) return;
    setUserAnswers(prev => {
      const copy = { ...prev };
      delete copy[currentQ.id];
      return copy;
    });
  };

  const handleToggleMarkForReview = () => {
    if (!currentQ) return;
    setMarkedForReview(prev => {
      if (prev.includes(currentQ.id)) {
        return prev.filter(id => id !== currentQ.id);
      } else {
        return [...prev, currentQ.id];
      }
    });
  };

  const handleNavigateQuestion = (index: number) => {
    if (index >= 0 && index < mockQuestions.length) {
      setCurrentQuestionIndex(index);
      if (!visitedIndices.includes(index)) {
        setVisitedIndices(prev => [...prev, index]);
      }
    }
  };

  const handleSubmitTest = () => {
    setIsTestSubmitted(true);
    try {
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    } catch {}
  };

  // Result Calculations
  const resultStats = useMemo(() => {
    if (!isTestSubmitted) return null;

    let correctCount = 0;
    let incorrectCount = 0;
    let unattemptedCount = 0;

    mockQuestions.forEach(q => {
      const userAns = userAnswers[q.id];
      if (userAns === undefined) {
        unattemptedCount++;
      } else if (userAns === q.answer) {
        correctCount++;
      } else {
        incorrectCount++;
      }
    });

    const marksGained = correctCount * activeConfig.marksPerQuestion;
    const marksLost = incorrectCount * activeConfig.negativeMarking;
    const totalScore = Math.max(0, marksGained - marksLost);
    const accuracy = (correctCount + incorrectCount) > 0 
      ? Math.round((correctCount / (correctCount + incorrectCount)) * 100) 
      : 0;

    return {
      correctCount,
      incorrectCount,
      unattemptedCount,
      marksGained,
      marksLost,
      totalScore: Number(totalScore.toFixed(2)),
      accuracy,
      percentage: Math.round((totalScore / activeConfig.totalMarks) * 100)
    };
  }, [isTestSubmitted, mockQuestions, userAnswers, activeConfig]);

  // Format seconds to HH:MM:SS
  const formatTime = (secs: number) => {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    return `${h > 0 ? `${h.toString().padStart(2, '0')}:` : ''}${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6 pb-16 animate-fade-in">
      
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { labelEn: 'Mock Tests', labelHi: 'मॉक टेस्ट' },
          { labelEn: activeConfig.title, labelHi: activeConfig.titleHi }
        ]}
        language={language}
        onSelectView={onNavigate}
      />

      {/* Screen 1: Test Selection & Instructions (Not yet started) */}
      {!isTestStarted && !isTestSubmitted && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
            <h1 className="text-2xl sm:text-3xl font-black text-white">
              {language === 'hi' ? 'उत्तर प्रदेश पुलिस आधिकारिक फुल मॉक टेस्ट' : 'UPPRPB Official Mock Examination'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-400">
              {language === 'hi' 
                ? 'वास्तविक परीक्षा समय-सीमा, प्रश्न पैलेट, नेगेटिव मार्किंग एवं विषयवार कटऑफ गणना सहित' 
                : 'Exact official duration, question palette, negative marking, and sectional qualifying analytics.'}
            </p>

            {/* Test Selector Tabs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {configs.map(cfg => (
                <div
                  key={cfg.id}
                  onClick={() => setSelectedConfigId(cfg.id)}
                  className={`p-4 rounded-2xl border cursor-pointer transition ${
                    selectedConfigId === cfg.id
                      ? 'bg-blue-900/40 border-blue-500 shadow-md shadow-blue-900/30'
                      : 'bg-slate-950/60 border-slate-800 hover:bg-slate-850 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs text-amber-400 font-bold">
                    <span>{cfg.post}</span>
                    <span className="font-mono">{cfg.durationMinutes} Mins</span>
                  </div>
                  <h3 className="font-bold text-sm text-white mt-1">
                    {language === 'hi' ? cfg.titleHi : cfg.title}
                  </h3>
                  <div className="flex items-center space-x-3 text-[11px] text-slate-400 mt-2 font-mono">
                    <span>{cfg.totalQuestions} Questions</span>
                    <span>•</span>
                    <span>{cfg.totalMarks} Marks</span>
                    <span>•</span>
                    <span>Negative: {cfg.negativeMarking > 0 ? `-${cfg.negativeMarking}` : 'None'}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Instructions box */}
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300 space-y-2">
              <div className="font-bold text-amber-400 uppercase tracking-wider flex items-center space-x-1.5">
                <AlertCircle className="w-4 h-4" />
                <span>{language === 'hi' ? 'परीक्षा निर्देश एवं सावधानियां' : 'Exam Rules & Instructions'}</span>
              </div>
              <ul className="list-disc list-inside space-y-1 text-slate-400 text-[11px]">
                <li>{activeConfig.qualifyingNote}</li>
                <li>{language === 'hi' ? 'समय समाप्त होने पर टेस्ट स्वतः सबमिट हो जाएगा।' : 'Test will auto-submit when the countdown hits 00:00.'}</li>
                <li>{language === 'hi' ? 'प्रत्येक सही उत्तर पर निर्धारित अंक मिलेंगे तथा गलत उत्तर पर आधिकारिक नियमानुसार कटौती होगी।' : 'Accurate positive and negative score evaluation as per UPPRPB norms.'}</li>
              </ul>
            </div>

            <button
              onClick={handleStartTest}
              className="w-full sm:w-auto bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black px-8 py-3 rounded-xl shadow-lg shadow-amber-500/20 text-sm transition"
            >
              {language === 'hi' ? 'मॉक टेस्ट शुरू करें (START TEST)' : 'START MOCK EXAMINATION'}
            </button>
          </div>
        </div>
      )}

      {/* Screen 2: Live Test Interface */}
      {isTestStarted && !isTestSubmitted && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          
          {/* Left 3 cols: Question Area */}
          <div className="lg:col-span-3 space-y-4">
            
            {/* Top Toolbar: Question number & Live Timer */}
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="font-bold text-white text-sm">
                  Q {currentQuestionIndex + 1} of {mockQuestions.length}
                </span>
                <span className="text-slate-600">•</span>
                <span className="text-xs text-amber-400 font-semibold">{currentQ?.subject}</span>
              </div>

              {/* Countdown Timer */}
              <div className={`flex items-center space-x-2 px-3 py-1.5 rounded-xl border font-mono font-bold text-sm ${
                secondsRemaining < 300 
                  ? 'bg-rose-950/80 border-rose-500 text-rose-300 animate-pulse' 
                  : 'bg-slate-950 border-slate-700 text-amber-400'
              }`}>
                <Clock className="w-4 h-4" />
                <span>{formatTime(secondsRemaining)}</span>
              </div>
            </div>

            {/* Question Card */}
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-6">
              
              <div className="space-y-2">
                <h3 className="text-base sm:text-lg font-bold text-white leading-relaxed">
                  {language === 'hi' ? currentQ?.questionHi : currentQ?.question}
                </h3>
                {language !== 'hi' && (
                  <p className="text-xs text-slate-400">{currentQ?.questionHi}</p>
                )}
              </div>

              {/* Options */}
              <div className="space-y-2.5">
                {(language === 'hi' ? currentQ?.optionsHi : currentQ?.options)?.map((optText, optIdx) => {
                  const isSelected = userAnswers[currentQ.id] === optIdx;
                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleSelectOption(optIdx)}
                      className={`w-full flex items-center space-x-3 p-3.5 rounded-xl border text-left text-xs sm:text-sm transition ${
                        isSelected 
                          ? 'bg-blue-900/60 border-blue-500 text-white font-semibold shadow-md' 
                          : 'bg-slate-800/60 border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white'
                      }`}
                    >
                      <span className="w-6 h-6 rounded-lg bg-slate-900 flex items-center justify-center font-mono text-xs font-bold border border-slate-700 flex-shrink-0">
                        {String.fromCharCode(65 + optIdx)}
                      </span>
                      <span>{optText}</span>
                    </button>
                  );
                })}
              </div>

              {/* Navigation Controls */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-4 border-t border-slate-800">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleClearResponse}
                    className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-2 rounded-xl transition"
                  >
                    Clear Response
                  </button>
                  <button
                    onClick={handleToggleMarkForReview}
                    className={`text-xs px-3 py-2 rounded-xl border transition ${
                      markedForReview.includes(currentQ.id)
                        ? 'bg-purple-900/60 border-purple-500 text-purple-200'
                        : 'bg-slate-800 hover:bg-slate-700 text-purple-300 border-slate-700'
                    }`}
                  >
                    Mark for Review
                  </button>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleNavigateQuestion(currentQuestionIndex - 1)}
                    disabled={currentQuestionIndex === 0}
                    className="text-xs bg-slate-800 text-slate-300 hover:text-white disabled:opacity-30 px-3 py-2 rounded-xl font-medium"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => handleNavigateQuestion(currentQuestionIndex + 1)}
                    disabled={currentQuestionIndex === mockQuestions.length - 1}
                    className="text-xs bg-blue-600 hover:bg-blue-500 text-white font-bold px-4 py-2 rounded-xl transition shadow"
                  >
                    Save & Next
                  </button>
                </div>
              </div>

            </div>

          </div>

          {/* Right 1 col: Question Palette */}
          <div className="space-y-4">
            <div className="p-4 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-300">
                Question Palette
              </h4>

              {/* Status Legend */}
              <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-400">
                <div className="flex items-center space-x-1.5">
                  <span className="w-3 h-3 rounded bg-emerald-600"></span>
                  <span>Answered</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <span className="w-3 h-3 rounded bg-purple-600"></span>
                  <span>Marked Review</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <span className="w-3 h-3 rounded bg-slate-800 border border-slate-700"></span>
                  <span>Not Visited</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <span className="w-3 h-3 rounded bg-amber-600"></span>
                  <span>Current</span>
                </div>
              </div>

              {/* Palette Grid */}
              <div className="max-h-64 overflow-y-auto grid grid-cols-5 gap-1.5 p-1 border-t border-slate-800 pt-3">
                {mockQuestions.map((q, idx) => {
                  const isCurrent = idx === currentQuestionIndex;
                  const isAnswered = userAnswers[q.id] !== undefined;
                  const isMarked = markedForReview.includes(q.id);

                  let bg = 'bg-slate-800 text-slate-400 border border-slate-700';
                  if (isAnswered) bg = 'bg-emerald-600 text-white font-bold';
                  if (isMarked) bg = 'bg-purple-600 text-white font-bold';
                  if (isCurrent) bg = 'bg-amber-500 text-slate-950 font-black ring-2 ring-amber-300';

                  return (
                    <button
                      key={q.id}
                      onClick={() => handleNavigateQuestion(idx)}
                      className={`h-8 rounded-lg text-xs font-mono transition flex items-center justify-center ${bg}`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>

              {/* Submit Test Button */}
              <button
                onClick={handleSubmitTest}
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 rounded-xl text-xs uppercase tracking-wider transition shadow-lg shadow-emerald-900/30"
              >
                Submit Examination
              </button>
            </div>
          </div>

        </div>
      )}

      {/* Screen 3: Post-Examination Scorecard & Detailed Analytics */}
      {isTestSubmitted && resultStats && (
        <div className="space-y-6">
          
          {/* Scorecard Hero */}
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 border border-slate-800 shadow-2xl text-center space-y-4">
            <div className="inline-flex p-3 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <Trophy className="w-8 h-8" />
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-white">
              {language === 'hi' ? 'मॉक टेस्ट परीक्षा परिणाम (Scorecard)' : 'Examination Scorecard'}
            </h2>

            <div className="flex justify-center items-baseline space-x-2 font-mono">
              <span className="text-4xl sm:text-6xl font-black text-amber-400">{resultStats.totalScore}</span>
              <span className="text-xl sm:text-2xl text-slate-400">/ {activeConfig.totalMarks}</span>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
              Accuracy: <strong className="text-emerald-400">{resultStats.accuracy}%</strong> • Score: <strong>{resultStats.percentage}%</strong>
            </p>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-3 max-w-lg mx-auto pt-2">
              <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/30 text-emerald-300">
                <div className="text-lg font-bold font-mono">{resultStats.correctCount}</div>
                <div className="text-[10px] uppercase font-semibold">Correct</div>
              </div>
              <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-500/30 text-rose-300">
                <div className="text-lg font-bold font-mono">{resultStats.incorrectCount}</div>
                <div className="text-[10px] uppercase font-semibold">Incorrect</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-400">
                <div className="text-lg font-bold font-mono">{resultStats.unattemptedCount}</div>
                <div className="text-[10px] uppercase font-semibold">Unattempted</div>
              </div>
            </div>

            <div className="pt-4 flex justify-center space-x-3">
              <button
                onClick={handleStartTest}
                className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-5 py-2.5 rounded-xl text-xs sm:text-sm flex items-center space-x-2 shadow transition"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Re-Attempt Test</span>
              </button>
              <button
                onClick={() => { setIsTestStarted(false); setIsTestSubmitted(false); }}
                className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold px-5 py-2.5 rounded-xl text-xs sm:text-sm transition"
              >
                Choose Another Mock
              </button>
            </div>
          </div>

          {/* Solutions & Explanations Review */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center space-x-2">
              <HelpCircle className="w-5 h-5 text-amber-400" />
              <span>{language === 'hi' ? 'प्रश्नवार हल एवं आधिकारिक व्याख्या' : 'Question by Question Solutions & Explanations'}</span>
            </h3>

            <div className="space-y-3">
              {mockQuestions.map((q, idx) => {
                const userAns = userAnswers[q.id];
                const isCorrect = userAns === q.answer;
                const isUnattempted = userAns === undefined;

                return (
                  <div 
                    key={q.id}
                    className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 text-xs sm:text-sm"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-300">Q {idx + 1}. {q.subject}</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        isUnattempted 
                          ? 'bg-slate-800 text-slate-400' 
                          : isCorrect 
                          ? 'bg-emerald-500/20 text-emerald-300' 
                          : 'bg-rose-500/20 text-rose-300'
                      }`}>
                        {isUnattempted ? 'Unattempted' : isCorrect ? '+ Marks Gained' : '- Negative Deduction'}
                      </span>
                    </div>

                    <div className="font-semibold text-white">
                      {language === 'hi' ? q.questionHi : q.question}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {(language === 'hi' ? q.optionsHi : q.options).map((opt, oIdx) => (
                        <div 
                          key={oIdx}
                          className={`p-2 rounded-lg border flex items-center justify-between ${
                            oIdx === q.answer 
                              ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-semibold' 
                              : userAns === oIdx 
                              ? 'bg-rose-950/80 border-rose-500 text-rose-200' 
                              : 'bg-slate-950/40 border-slate-800 text-slate-400'
                          }`}
                        >
                          <span>{String.fromCharCode(65 + oIdx)}. {opt}</span>
                          {oIdx === q.answer && <span className="text-[10px] font-bold text-emerald-400">Correct Answer</span>}
                        </div>
                      ))}
                    </div>

                    <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300 leading-relaxed">
                      <strong className="text-amber-400 block mb-0.5">Solution:</strong>
                      {language === 'hi' ? q.explanationHi : q.explanation}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
