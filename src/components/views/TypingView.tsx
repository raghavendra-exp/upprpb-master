import React, { useState, useEffect, useRef } from 'react';
import { 
  Keyboard, 
  RotateCcw, 
  CheckCircle, 
  XCircle, 
  Sparkles 
} from 'lucide-react';
import { ViewType } from '../common/Sidebar';
import { Breadcrumb } from '../common/Breadcrumb';
import typingDataRaw from '../../data/typing/typingTexts.json';

interface TypingViewProps {
  language: 'hi' | 'en';
  onNavigate: (view: ViewType) => void;
}

export const TypingView: React.FC<TypingViewProps> = ({
  language,
  onNavigate
}) => {
  const passages = typingDataRaw.passages;
  const qualifying = typingDataRaw.qualifyingCriteria;

  const [selectedPassageId, setSelectedPassageId] = useState<string>(passages[0].id);
  const activePassage = passages.find(p => p.id === selectedPassageId) || passages[0];

  const [userInput, setUserInput] = useState('');
  const [timerSeconds, setTimerSeconds] = useState(300); // 5 min default
  const [isActive, setIsActive] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Countdown timer
  useEffect(() => {
    let interval: any = null;
    if (isActive && !isFinished && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds(prev => {
          if (prev <= 1) {
            clearInterval(interval);
            setIsFinished(true);
            setIsActive(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive, isFinished, timerSeconds]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    if (!isActive && !isFinished) {
      setIsActive(true);
    }
    setUserInput(val);
    if (val.length >= activePassage.text.length) {
      setIsFinished(true);
      setIsActive(false);
    }
  };

  const handleReset = () => {
    setUserInput('');
    setTimerSeconds(300);
    setIsActive(false);
    setIsFinished(false);
    if (inputRef.current) inputRef.current.focus();
  };

  // Calculations
  const elapsedMinutes = Math.max(0.1, (300 - timerSeconds) / 60);
  const wordsTyped = userInput.trim().split(/\s+/).filter(w => w.length > 0).length;
  const wpm = Math.round(wordsTyped / elapsedMinutes);

  // Accuracy calculation based on character matching
  let errors = 0;
  for (let i = 0; i < userInput.length; i++) {
    if (userInput[i] !== activePassage.text[i]) {
      errors++;
    }
  }
  const accuracy = userInput.length > 0 
    ? Math.max(0, Math.round(((userInput.length - errors) / userInput.length) * 100)) 
    : 100;

  const isHindi = activePassage.language === 'hindi';
  const targetWpm = isHindi ? qualifying.asiClerk.hindiWpm : qualifying.asiClerk.englishWpm;
  const isQualifying = wpm >= targetWpm && accuracy >= qualifying.asiClerk.minAccuracy;

  return (
    <div className="space-y-6 pb-16 animate-fade-in">
      
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { labelEn: 'Typing Simulator', labelHi: 'टंकण गति परीक्षा' },
          { labelEn: activePassage.title, labelHi: activePassage.title }
        ]}
        language={language}
        onSelectView={onNavigate}
      />

      {/* Top Banner */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-3">
        <div className="inline-flex items-center space-x-1.5 text-xs font-bold text-teal-400 bg-teal-500/10 border border-teal-500/20 px-3 py-1 rounded-full">
          <Keyboard className="w-4 h-4" />
          <span>{language === 'hi' ? 'उत्तर प्रदेश पुलिस टंकण मानक सिम्युलेटर' : 'Official UPPRPB Typing Test Benchmark'}</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-black text-white">
          {language === 'hi' ? 'कंप्यूटर टंकण गति एवं शुद्धता अभ्यास' : 'Computer Typing Speed & Accuracy Simulator'}
        </h1>

        <p className="text-xs sm:text-sm text-slate-400 max-w-3xl leading-relaxed">
          {language === 'hi'
            ? 'एएसआई लिपिक (25 wpm हिन्दी इनस्क्रिप्ट / 30 wpm अंग्रेजी), कंप्यूटर ऑपरेटर एवं एएसआई लेखा (15 wpm) हेतु वास्तविक परीक्षा वातावरण एवं लाइव शुद्धता मूल्यांकन।'
            : 'Accurate qualifying test simulation for ASI Clerk (25 wpm Hindi / 30 wpm English, 85% accuracy), Computer Operator, and Accounts cadre.'}
        </p>

        {/* Standard Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-300">
            <span className="text-slate-400 block text-[11px]">Hindi Standard:</span>
            <span className="font-bold text-white">25 WPM • Unicode Inscript</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-300">
            <span className="text-slate-400 block text-[11px]">English Standard:</span>
            <span className="font-bold text-white">30 WPM • 85% Accuracy</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-300">
            <span className="text-slate-400 block text-[11px]">Accounts Post:</span>
            <span className="font-bold text-white">15 WPM (Hindi only)</span>
          </div>
        </div>
      </div>

      {/* Passage Selector Tabs */}
      <div className="flex space-x-2 overflow-x-auto pb-1 scrollbar-none">
        {passages.map(p => (
          <button
            key={p.id}
            onClick={() => {
              setSelectedPassageId(p.id);
              handleReset();
            }}
            className={`flex-shrink-0 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition border ${
              selectedPassageId === p.id
                ? 'bg-teal-600 text-white border-teal-500 shadow-md shadow-teal-900/30'
                : 'bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <span>{p.title}</span>
            <span className="ml-2 text-[10px] uppercase font-mono px-1.5 py-0.2 rounded bg-slate-950">
              {p.language}
            </span>
          </button>
        ))}
      </div>

      {/* Live Stats Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-center">
          <span className="text-[11px] text-slate-400 uppercase tracking-wider block font-semibold">Speed (WPM)</span>
          <span className="text-2xl sm:text-3xl font-black text-amber-400 font-mono mt-1 block">{wpm}</span>
          <span className="text-[10px] text-slate-400">Target: {targetWpm} WPM</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-center">
          <span className="text-[11px] text-slate-400 uppercase tracking-wider block font-semibold">Accuracy</span>
          <span className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono mt-1 block">{accuracy}%</span>
          <span className="text-[10px] text-slate-400">Min 85% Required</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-center">
          <span className="text-[11px] text-slate-400 uppercase tracking-wider block font-semibold">Time Remaining</span>
          <span className="text-2xl sm:text-3xl font-black text-blue-400 font-mono mt-1 block">
            {Math.floor(timerSeconds / 60)}:{(timerSeconds % 60).toString().padStart(2, '0')}
          </span>
          <span className="text-[10px] text-slate-400">{isActive ? 'Typing in Progress...' : 'Ready'}</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-center">
          <span className="text-[11px] text-slate-400 uppercase tracking-wider block font-semibold">Status</span>
          <div className="mt-1 flex items-center justify-center space-x-1">
            {isQualifying ? (
              <span className="text-xs font-bold text-emerald-400 flex items-center space-x-1">
                <CheckCircle className="w-4 h-4" />
                <span>QUALIFIED</span>
              </span>
            ) : (
              <span className="text-xs font-bold text-rose-400 flex items-center space-x-1">
                <XCircle className="w-4 h-4" />
                <span>NOT QUALIFIED</span>
              </span>
            )}
          </div>
          <span className="text-[10px] text-slate-400">{errors} errors</span>
        </div>
      </div>

      {/* Typing Reference Text Box */}
      <div className="p-5 sm:p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-md space-y-3">
        <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800/80 pb-2">
          <span className="font-semibold text-slate-200">Official Test Passage (Type text as shown):</span>
          <span className="font-mono text-amber-400">{activePassage.text.length} Characters</span>
        </div>

        <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans bg-slate-950/60 p-4 rounded-2xl border border-slate-800 select-none">
          {activePassage.text}
        </p>

        {/* Input Area */}
        <div className="space-y-2 pt-2">
          <textarea
            ref={inputRef}
            rows={5}
            value={userInput}
            onChange={handleInputChange}
            disabled={isFinished}
            placeholder={language === 'hi' ? 'टाइप करना शुरू करें (टाइपिंग आरंभ करते ही टाइमर स्वतः शुरू हो जाएगा)...' : 'Start typing here (timer begins automatically upon keystroke)...'}
            className="w-full bg-slate-950 border border-slate-700 rounded-2xl p-4 text-sm sm:text-base text-white placeholder-slate-500 focus:outline-none focus:border-teal-500 font-sans leading-relaxed shadow-inner"
          />

          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400">
              Characters typed: <strong className="text-white">{userInput.length}</strong> / {activePassage.text.length}
            </span>
            <button
              onClick={handleReset}
              className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold px-4 py-2 rounded-xl flex items-center space-x-1.5 transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Test</span>
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
