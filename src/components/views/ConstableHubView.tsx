import React from 'react';
import { 
  CheckCircle2, 
  HelpCircle, 
  Clock, 
  BookOpen, 
  Activity, 
  BookMarked, 
  ArrowRight, 
  ExternalLink,
  Scale
} from 'lucide-react';
import { ViewType } from '../common/Sidebar';
import { Breadcrumb } from '../common/Breadcrumb';
import constableDataRaw from '../../data/recruitments/constable-2025.json';

interface ConstableHubViewProps {
  language: 'hi' | 'en';
  onNavigate: (view: ViewType, context?: any) => void;
}

export const ConstableHubView: React.FC<ConstableHubViewProps> = ({
  language,
  onNavigate
}) => {
  const data = constableDataRaw;

  return (
    <div className="space-y-6 pb-16 animate-fade-in">
      
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { labelEn: 'Recruitments', labelHi: 'भर्तियां', view: 'recruitments' },
          { labelEn: 'Constable Hub', labelHi: 'आरक्षी (कांस्टेबल) संपूर्ण तैयारी' }
        ]}
        language={language}
        onSelectView={onNavigate}
      />

      {/* Top Hero Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-amber-950/40 border border-amber-500/30 shadow-2xl space-y-4">
        <div className="inline-flex items-center space-x-2 text-xs font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full">
          <CheckCircle2 className="w-4 h-4" />
          <span>{language === 'hi' ? 'उत्तर प्रदेश पुलिस आरक्षी नागरिक पुलिस एवं पीएसी' : 'UP Police Constable Civil Police & PAC Master Hub'}</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-black text-white">
          {language === 'hi' ? 'आरक्षी (Constable) भर्ती संपूर्ण तैयारी मंच' : 'UP Police Constable Preparation Hub'}
        </h1>

        <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
          {language === 'hi'
            ? '60,244 पदों हेतु पाठ्यक्रम, परीक्षा पैटर्न, शारीरिक मानक, 4.8 किमी दौड़ तैयारी, विगत वर्षों के हल प्रश्नपत्र व फुल मॉक टेस्ट।'
            : 'Complete preparation ecosystem for UP Police Constable Civil Police & PAC posts: official syllabus, -0.5 negative marking engine, physical PET running tracker, and verified PYQs.'}
        </p>

        {/* Quick Parameters Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-xs">
          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-300">
            <span className="text-[10px] text-slate-400 block">Total Vacancies</span>
            <span className="text-base font-bold text-amber-400 font-mono">60,244 Posts</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-300">
            <span className="text-[10px] text-slate-400 block">Written Questions</span>
            <span className="text-base font-bold text-white font-mono">150 Qs / 300 Marks</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-300">
            <span className="text-[10px] text-slate-400 block">Negative Marking</span>
            <span className="text-base font-bold text-rose-400 font-mono">-0.5 Marks / Wrong</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-300">
            <span className="text-[10px] text-slate-400 block">PET Running Standard</span>
            <span className="text-base font-bold text-emerald-400 font-mono">Male 4.8km / Fem 2.4km</span>
          </div>
        </div>

        {/* Action Row */}
        <div className="pt-2 flex flex-wrap gap-2.5">
          <button
            onClick={() => onNavigate('practice', { subject: 'All' })}
            className="flex items-center space-x-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs px-4 py-2 rounded-xl transition shadow"
          >
            <HelpCircle className="w-4 h-4" />
            <span>{language === 'hi' ? 'कांस्टेबल प्रश्न अभ्यास' : 'Practice Questions'}</span>
          </button>

          <button
            onClick={() => onNavigate('mock')}
            className="flex items-center space-x-1.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs px-4 py-2 rounded-xl transition shadow"
          >
            <Clock className="w-4 h-4" />
            <span>{language === 'hi' ? 'फुल मॉक टेस्ट (150 प्रश्न)' : 'Full 150-Q Mock Test'}</span>
          </button>

          <button
            onClick={() => onNavigate('physical')}
            className="flex items-center space-x-1.5 bg-slate-800 hover:bg-slate-700 text-emerald-300 font-semibold text-xs px-4 py-2 rounded-xl border border-slate-700 transition"
          >
            <Activity className="w-4 h-4" />
            <span>{language === 'hi' ? 'दौड़ (PET) गाइड' : 'PET Running Tracker'}</span>
          </button>
        </div>
      </div>

      {/* 4 Pillars of Constable Examination */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* General Knowledge & UP GK */}
        <div 
          onClick={() => onNavigate('practice', { subject: 'UP GK' })}
          className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-amber-500/50 cursor-pointer transition shadow-md group"
        >
          <div className="flex items-center justify-between text-xs text-amber-400 font-bold mb-2">
            <span>38 Questions • 76 Marks</span>
            <span className="text-[10px] uppercase bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">Section 1</span>
          </div>
          <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition">
            {language === 'hi' ? 'सामान्य ज्ञान एवं उत्तर प्रदेश ज्ञान' : 'General Knowledge & UP Special GK'}
          </h3>
          <p className="text-xs text-slate-400 mt-1 leading-relaxed">
            {language === 'hi' 
              ? 'इतिहास (1857 क्रांति), भूगोल, संविधान, 75 जिले, नदियां, दुधवा राष्ट्रीय उद्यान, पुलिस प्रणाली व जीएसटी।' 
              : 'History, Indian Polity, 75 UP Districts, Rivers, Dudhwa NP, Internal Security, and GST.'}
          </p>
        </div>

        {/* General Hindi */}
        <div 
          onClick={() => onNavigate('practice', { subject: 'General Hindi' })}
          className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-blue-500/50 cursor-pointer transition shadow-md group"
        >
          <div className="flex items-center justify-between text-xs text-blue-400 font-bold mb-2">
            <span>37 Questions • 74 Marks</span>
            <span className="text-[10px] uppercase bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">Section 2</span>
          </div>
          <h3 className="text-base font-bold text-white group-hover:text-blue-400 transition">
            {language === 'hi' ? 'सामान्य हिन्दी (व्याकरण एवं साहित्य)' : 'General Hindi (Grammar & Literature)'}
          </h3>
          <p className="text-xs text-slate-400 mt-1 leading-relaxed">
            {language === 'hi' 
              ? 'वर्णमाला, तत्सम-तद्भव, सन्धि, समास, रस, छन्द, अलंकार, मुहावरे एवं ज्ञानपीठ/साहित्य अकादमी पुरस्कार।' 
              : 'Hindi Varnamala, Tatsam-Tadbhav, Sandhi, Samas, Ras-Chhand-Alankar, and Literature Awards.'}
          </p>
        </div>

        {/* Numerical Ability */}
        <div 
          onClick={() => onNavigate('practice', { subject: 'Mathematics' })}
          className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-emerald-500/50 cursor-pointer transition shadow-md group"
        >
          <div className="flex items-center justify-between text-xs text-emerald-400 font-bold mb-2">
            <span>38 Questions • 76 Marks</span>
            <span className="text-[10px] uppercase bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">Section 3</span>
          </div>
          <h3 className="text-base font-bold text-white group-hover:text-emerald-400 transition">
            {language === 'hi' ? 'संख्यात्मक एवं मानसिक योग्यता (गणित)' : 'Numerical & Mental Ability (Mathematics)'}
          </h3>
          <p className="text-xs text-slate-400 mt-1 leading-relaxed">
            {language === 'hi' 
              ? 'संख्या पद्धति, प्रतिशत, लाभ-हानि, साधारण व चक्रवृद्धि ब्याज, समय-कार्य, चाल-दूरी एवं क्षेत्रमिति।' 
              : 'Number Systems, Percentage, Profit/Loss, SI/CI, Time & Work, Speed Distance, and Mensuration.'}
          </p>
        </div>

        {/* Reasoning Ability */}
        <div 
          onClick={() => onNavigate('practice', { subject: 'Reasoning' })}
          className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-purple-500/50 cursor-pointer transition shadow-md group"
        >
          <div className="flex items-center justify-between text-xs text-purple-400 font-bold mb-2">
            <span>37 Questions • 74 Marks</span>
            <span className="text-[10px] uppercase bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20">Section 4</span>
          </div>
          <h3 className="text-base font-bold text-white group-hover:text-purple-400 transition">
            {language === 'hi' ? 'मानसिक अभिरुचि, बुद्धिलब्धि एवं तार्किक क्षमता' : 'Mental Aptitude, IQ & Reasoning'}
          </h3>
          <p className="text-xs text-slate-400 mt-1 leading-relaxed">
            {language === 'hi' 
              ? 'कोडिंग-डिकोडिंग, दिशा परीक्षण, रक्त संबंध, सादृश्यता, पुलिस स्वभाव, कानून एवं व्यवस्था।' 
              : 'Coding-Decoding, Direction Test, Blood Relations, Police Temperament, and Law & Order.'}
          </p>
        </div>

      </div>

    </div>
  );
};
