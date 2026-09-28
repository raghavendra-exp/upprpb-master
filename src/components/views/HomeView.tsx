import React from 'react';
import { 
  Shield, 
  CheckCircle2, 
  Scale, 
  Keyboard, 
  Activity, 
  BookOpen, 
  HelpCircle, 
  Clock, 
  BookMarked, 
  Sparkles, 
  ArrowRight, 
  ExternalLink,
  MapPin,
  Award
} from 'lucide-react';
import { ViewType } from '../common/Sidebar';
import { questionStats } from '../../data/questions';
import currentDataRaw from '../../data/recruitments/current.json';

interface HomeViewProps {
  language: 'hi' | 'en';
  onNavigate: (view: ViewType) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  language,
  onNavigate
}) => {
  const currentSummary = currentDataRaw;

  return (
    <div className="space-y-8 animate-fade-in pb-16">
      
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 border border-slate-800 p-6 sm:p-10 shadow-2xl">
        {/* Background accent badge */}
        <div className="absolute -top-12 -right-12 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-4xl space-y-4">
          <div className="inline-flex items-center space-x-2 bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs sm:text-sm px-3.5 py-1 rounded-full font-semibold">
            <Shield className="w-4 h-4 text-amber-400" />
            <span>
              {language === 'hi' ? 'उत्तर प्रदेश पुलिस भर्ती एवं प्रोन्नति बोर्ड' : 'Uttar Pradesh Police Recruitment & Promotion Board'}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            UPPRPB <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500">MASTER</span>
          </h1>

          <p className="text-slate-300 text-base sm:text-lg max-w-3xl leading-relaxed">
            {language === 'hi' 
              ? 'आरक्षी (Constable), उप-निरीक्षक (SI), कंप्यूटर ऑपरेटर, रेडियो संवर्ग, जेल वार्डर एवं लिपिकीय पदों हेतु संपूर्ण प्रामाणिक अध्ययन, अभ्यास, मॉक टेस्ट एवं शारीरिक तैयारी मंच।'
              : 'Complete learning, verified PYQs, timed mock tests, criminal law transition (BNS/BNSS), and PET/PST training ecosystem for all UP Police direct recruitments.'}
          </p>

          {/* User Journey Banner */}
          <div className="pt-2 flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-300">
            <span className="text-amber-400 uppercase tracking-wider font-mono">
              {language === 'hi' ? 'तैयारी का सफर:' : 'STUDENT JOURNEY:'}
            </span>
            <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-300">
              <span className="bg-slate-800 px-2 py-0.5 rounded border border-slate-700">ZERO</span>
              <span>➔</span>
              <span className="bg-slate-800 px-2 py-0.5 rounded border border-slate-700">FOUNDATION</span>
              <span>➔</span>
              <span className="bg-slate-800 px-2 py-0.5 rounded border border-slate-700">SYLLABUS</span>
              <span>➔</span>
              <span className="bg-slate-800 px-2 py-0.5 rounded border border-slate-700">PYQ</span>
              <span>➔</span>
              <span className="bg-blue-900/60 text-blue-200 px-2 py-0.5 rounded border border-blue-700/50">PRACTICE</span>
              <span>➔</span>
              <span className="bg-indigo-900/60 text-indigo-200 px-2 py-0.5 rounded border border-indigo-700/50">MOCK</span>
              <span>➔</span>
              <span className="bg-amber-900/60 text-amber-200 px-2 py-0.5 rounded border border-amber-700/50">PHYSICAL</span>
              <span>➔</span>
              <span className="bg-emerald-800 text-emerald-100 font-bold px-2 py-0.5 rounded shadow">EXAM SELECTION</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-4 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigate('recruitments')}
              className="flex items-center space-x-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold px-5 py-2.5 rounded-xl shadow-lg shadow-amber-500/20 transition transform active:scale-95"
            >
              <span>{language === 'hi' ? 'भर्ती पद चुनें' : 'Choose Your Exam'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onNavigate('practice')}
              className="flex items-center space-x-2 bg-slate-800 hover:bg-slate-700 text-white font-semibold px-4 py-2.5 rounded-xl border border-slate-700 transition"
            >
              <HelpCircle className="w-4 h-4 text-amber-400" />
              <span>{language === 'hi' ? '1,244+ प्रश्नों का अभ्यास' : 'Start Practice (1,244+ Qs)'}</span>
            </button>

            <button
              onClick={() => onNavigate('mock')}
              className="flex items-center space-x-2 bg-blue-900/40 hover:bg-blue-800/50 text-blue-200 font-semibold px-4 py-2.5 rounded-xl border border-blue-700/50 transition"
            >
              <Clock className="w-4 h-4 text-blue-400" />
              <span>{language === 'hi' ? 'फुल मॉक टेस्ट' : 'Full Mock Tests'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Dynamic Question Bank Counters (Mandatory Section 63) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-md">
          <div className="text-2xl sm:text-3xl font-black text-amber-400 font-mono">
            {questionStats.totalQuestions}+
          </div>
          <div className="text-xs sm:text-sm font-semibold text-white mt-1">
            {language === 'hi' ? 'कुल प्रामाणिक प्रश्न' : 'Practice Questions'}
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">
            {language === 'hi' ? '100% उत्तर व विस्तृत व्याख्या सहित' : 'With detailed bilingual explanations'}
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-md">
          <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">
            {questionStats.verifiedPyqs}+
          </div>
          <div className="text-xs sm:text-sm font-semibold text-white mt-1">
            {language === 'hi' ? 'सत्यापित पूर्व वर्ष प्रश्न (PYQ)' : 'Verified PYQs'}
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">
            {language === 'hi' ? '2018, 2019, 2021, 2024 शिफ्ट्स' : 'From official UPPRPB test shifts'}
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-md">
          <div className="text-2xl sm:text-3xl font-black text-blue-400 font-mono">
            {questionStats.bySubject.upGk}+
          </div>
          <div className="text-xs sm:text-sm font-semibold text-white mt-1">
            {language === 'hi' ? 'उत्तर प्रदेश विशेष (UP GK)' : 'Uttar Pradesh GK'}
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">
            {language === 'hi' ? '75 जिले, नदियां, मेले व ODOP' : '75 Districts, ODOP, Police Admin'}
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-md">
          <div className="text-2xl sm:text-3xl font-black text-purple-400 font-mono">
            73,470+
          </div>
          <div className="text-xs sm:text-sm font-semibold text-white mt-1">
            {language === 'hi' ? 'ट्रैक्ड भर्ती रिक्तियां' : 'Tracked Vacancies'}
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">
            {language === 'hi' ? 'आरक्षी, दरोगा, रेडियो, लिपिक' : 'Constable, SI, Radio & Clerical'}
          </div>
        </div>
      </div>

      {/* Latest Official UPPRPB Notice Board Ticker (Section 43) */}
      <div className="rounded-2xl bg-amber-500/10 border border-amber-500/30 p-4 sm:p-5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2 text-amber-400 font-bold text-sm sm:text-base">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse"></span>
            <span>{language === 'hi' ? 'शीर्ष आधिकारिक सूचनाएं (Official Notices)' : 'Latest UPPRPB Notices'}</span>
          </div>
          <button
            onClick={() => onNavigate('notices')}
            className="text-xs text-amber-300 hover:text-white font-medium flex items-center space-x-1"
          >
            <span>{language === 'hi' ? 'सभी सूचनाएं देखें' : 'View Notice Archive'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="space-y-2">
          {currentSummary.topNotices.slice(0, 3).map((notice) => (
            <div 
              key={notice.id}
              className="flex items-start justify-between p-2.5 rounded-xl bg-slate-900/70 border border-amber-500/20 text-xs sm:text-sm text-slate-200 hover:bg-slate-900 transition"
            >
              <div className="flex-1 pr-3">
                <div className="flex items-center space-x-2">
                  <span className="font-mono text-[11px] text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded">
                    {notice.date}
                  </span>
                  <span className="font-semibold text-slate-300 text-xs">
                    {notice.post}
                  </span>
                </div>
                <p className="mt-1 text-slate-200">
                  {language === 'hi' ? notice.titleHi : notice.title}
                </p>
              </div>
              <a
                href={notice.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-400 hover:text-amber-300 text-xs font-semibold flex items-center space-x-1 flex-shrink-0 bg-slate-800 px-2 py-1 rounded border border-slate-700"
              >
                <span>uppbpb.gov.in</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Cadre Navigation Cards (Section 4 & Section 8) */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              {language === 'hi' ? 'संवर्ग अनुसार संपूर्ण तैयारी' : 'Recruitment Cadre Portals'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              {language === 'hi' ? 'प्रत्येक पद का अलग सिलेबस, परीक्षा पैटर्न, शारीरिक मानक व प्रश्न बैंक' : 'Post-specific syllabus, exam pattern, eligibility, and study modules'}
            </p>
          </div>
          <button
            onClick={() => onNavigate('recruitments')}
            className="text-xs sm:text-sm text-blue-400 hover:text-blue-300 font-semibold flex items-center space-x-1"
          >
            <span>{language === 'hi' ? 'सभी 8 संवर्ग' : 'All 8 Cadres'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          
          {/* Constable Card */}
          <div 
            onClick={() => onNavigate('constable')}
            className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-amber-500/50 cursor-pointer transition transform hover:-translate-y-1 shadow-lg group"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400 group-hover:bg-amber-500 group-hover:text-slate-950 transition">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                60,244 Posts (PET Active)
              </span>
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition">
              {language === 'hi' ? 'आरक्षी नागरिक पुलिस एवं पीएसी' : 'UP Police Constable Civil/PAC'}
            </h3>
            <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
              {language === 'hi' 
                ? '150 प्रश्न • 300 अंक • -0.5 नेगेटिव मार्किंग • दौड़: पुरुष 4.8 किमी (25 मिनट) / महिला 2.4 किमी (14 मिनट)' 
                : '150 Qs • 300 Marks • -0.5 Negative • PET Run: 4.8 km in 25 min (Male) / 2.4 km in 14 min (Female)'}
            </p>
            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-amber-400 font-semibold">
              <span>{language === 'hi' ? 'कांस्टेबल मॉड्यूल खोलें' : 'Open Constable Hub'}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </div>
          </div>

          {/* Sub-Inspector Card */}
          <div 
            onClick={() => onNavigate('si')}
            className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-blue-500/50 cursor-pointer transition transform hover:-translate-y-1 shadow-lg group"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition">
                <Scale className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
                4,543 Posts (CBT Mode)
              </span>
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition">
              {language === 'hi' ? 'उप-निरीक्षक (दरोगा) एवं प्लाटून कमांडर' : 'Sub-Inspector (SI) Master'}
            </h3>
            <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
              {language === 'hi' 
                ? '160 प्रश्न • 400 अंक • मूल विधि (BNS/BNSS) + संविधान + हिन्दी + गणित + रीजनिंग • न्यूनतम 35% विषयवार कटऑफ' 
                : '160 Qs • 400 Marks • Basic Law (BNS/BNSS) + Constitution + Hindi + Maths + Reasoning • 35% Sectional Cutoff'}
            </p>
            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-blue-400 font-semibold">
              <span>{language === 'hi' ? 'दरोगा मॉड्यूल खोलें' : 'Open SI Hub'}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </div>
          </div>

          {/* Computer Operator Card */}
          <div 
            onClick={() => onNavigate('computer')}
            className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-cyan-500/50 cursor-pointer transition transform hover:-translate-y-1 shadow-lg group"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400 group-hover:bg-cyan-600 group-hover:text-white transition">
                <Keyboard className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                985 Posts (Written + Typing)
              </span>
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition">
              {language === 'hi' ? 'कंप्यूटर ऑपरेटर ग्रेड-ए व प्रोग्रामर' : 'Computer Operator Grade-A'}
            </h3>
            <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
              {language === 'hi' 
                ? '160 प्रश्न • 200 अंक • कंप्यूटर विज्ञान 80 प्रश्न (100 अंक) + टंकण परीक्षा (हिन्दी 25 wpm, अंग्रेजी 30 wpm)' 
                : '160 Qs • 200 Marks • CS Core 80 Qs (100 M) + Typing Test (Hindi 25 wpm / English 30 wpm)'}
            </p>
            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-cyan-400 font-semibold">
              <span>{language === 'hi' ? 'कंप्यूटर मॉड्यूल खोलें' : 'Open Computer Hub'}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </div>
          </div>

          {/* Radio Police Card */}
          <div 
            onClick={() => onNavigate('radio')}
            className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-purple-500/50 cursor-pointer transition transform hover:-translate-y-1 shadow-lg group"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400 group-hover:bg-purple-600 group-hover:text-white transition">
                <Activity className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                2,430 Posts (Technical)
              </span>
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-purple-400 transition">
              {language === 'hi' ? 'रेडियो पुलिस (प्रधान/सहायक परिचालक)' : 'Radio Police Technical Cadre'}
            </h3>
            <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
              {language === 'hi' 
                ? '160 प्रश्न • 400 अंक • 150 मिनट • भौतिकी व दूरसंचार विशेष • न्यूनतम 50% विषयवार अर्हता' 
                : '160 Qs • 400 Marks • 150 Mins • Physics & Electronics Specialization • 50% Sectional Cutoff'}
            </p>
            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-purple-400 font-semibold">
              <span>{language === 'hi' ? 'रेडियो मॉड्यूल खोलें' : 'Open Radio Hub'}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </div>
          </div>

          {/* Ministerial Clerical Card */}
          <div 
            onClick={() => onNavigate('ministerial')}
            className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-rose-500/50 cursor-pointer transition transform hover:-translate-y-1 shadow-lg group"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="p-3 rounded-xl bg-rose-500/10 text-rose-400 group-hover:bg-rose-600 group-hover:text-white transition">
                <Keyboard className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
                921 Posts (ASI Clerk/Accts)
              </span>
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-rose-400 transition">
              {language === 'hi' ? 'पुलिस एएसआई लिपिक / लेखा संवर्ग' : 'Police ASI Ministerial & Clerk'}
            </h3>
            <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
              {language === 'hi' 
                ? '200 प्रश्न • 400 अंक • हिन्दी + कंप्यूटर + सामान्य ज्ञान + टंकण परीक्षा (हिन्दी इनस्क्रिप्ट 25 wpm)' 
                : '200 Qs • 400 Marks • Hindi + Computer + GK + Speed Typing Test (Hindi 25 wpm)'}
            </p>
            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-rose-400 font-semibold">
              <span>{language === 'hi' ? 'लिपिक मॉड्यूल खोलें' : 'Open Ministerial Hub'}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </div>
          </div>

          {/* Old Law vs New Law Card */}
          <div 
            onClick={() => onNavigate('law')}
            className="p-5 rounded-2xl bg-gradient-to-br from-emerald-950/40 via-slate-900 to-slate-900 border border-emerald-500/40 hover:border-emerald-400 cursor-pointer transition transform hover:-translate-y-1 shadow-lg group"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-slate-950 transition">
                <Scale className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Essential for SI
              </span>
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition">
              {language === 'hi' ? 'नवीन आपराधिक कानून (BNS / BNSS / BSA)' : 'Old Law ↔ New Law Converter'}
            </h3>
            <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
              {language === 'hi' 
                ? 'IPC 302 ➔ BNS 103, CrPC 154 ➔ BNSS 173 (जीरो व ई-एफआईआर), साक्ष्य धारा 63। धारा खोजक व तुलना।' 
                : 'Section converter: IPC 302 ➔ BNS 103, CrPC 154 ➔ BNSS 173 (Zero FIR & e-FIR), Digital evidence 63 BSA.'}
            </p>
            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-emerald-400 font-semibold">
              <span>{language === 'hi' ? 'कानून तुलना टूल खोलें' : 'Launch Law Comparator'}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </div>
          </div>

        </div>
      </div>

      {/* Zero to Master Roadmap Banner (Section 32) */}
      <div 
        onClick={() => onNavigate('roadmap')}
        className="p-6 rounded-3xl bg-gradient-to-r from-blue-900/50 via-indigo-900/50 to-slate-900 border border-blue-700/50 hover:border-blue-500 cursor-pointer transition shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
      >
        <div className="space-y-1">
          <div className="flex items-center space-x-2 text-blue-300 text-xs font-bold uppercase tracking-wider">
            <Award className="w-4 h-4 text-amber-400" />
            <span>{language === 'hi' ? '10-चरणीय शून्य से चयन रोडमैप' : '10-Level Zero-to-Master Roadmap'}</span>
          </div>
          <h3 className="text-xl font-bold text-white">
            {language === 'hi' ? 'व्यक्तिगत अध्ययन योजना (Study Plan Generator)' : 'Structured Study Planner & Goal Tracker'}
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
            {language === 'hi' 
              ? 'दैनिक अध्ययन घंटे, कमजोर विषय एवं लक्ष्य पद चुनकर अपनी स्वचालित दैनिक समय-सारिणी एवं दौड़ अभ्यास चार्ट तैयार करें।'
              : 'Configure your daily available hours and target exam date to generate an automated daily study timetable and physical running progression.'}
          </p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-4 py-2 rounded-xl text-xs sm:text-sm flex items-center space-x-1.5 flex-shrink-0 shadow transition">
          <MapPin className="w-4 h-4" />
          <span>{language === 'hi' ? 'रोडमैप देखें' : 'View Roadmap'}</span>
        </button>
      </div>

      {/* Official Source Transparency Guarantee (Section 59) */}
      <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-400 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <div className="flex items-center space-x-2">
          <Shield className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span>
            {language === 'hi' 
              ? 'प्रामाणिकता गारंटी: सभी नियम, आयु सीमा, शारीरिक माप एवं सिलेबस केवल आधिकारिक UPPRPB अधिसूचनाओं से सत्यापित हैं।' 
              : 'Primary Source Rule: All eligibility rules, physical standards, and syllabus are verified directly from official UPPRPB notifications.'}
          </span>
        </div>
        <a 
          href="https://uppbpb.gov.in/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-amber-400 hover:underline flex items-center space-x-1 flex-shrink-0"
        >
          <span>https://uppbpb.gov.in/</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>

    </div>
  );
};
