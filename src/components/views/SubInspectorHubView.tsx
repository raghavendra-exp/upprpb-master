import React from 'react';
import { 
  Scale, 
  HelpCircle, 
  Clock, 
  BookOpen, 
  Activity, 
  ArrowRight, 
  ShieldAlert, 
  ExternalLink 
} from 'lucide-react';
import { ViewType } from '../common/Sidebar';
import { Breadcrumb } from '../common/Breadcrumb';
import siDataRaw from '../../data/recruitments/si-2025.json';

interface SubInspectorHubViewProps {
  language: 'hi' | 'en';
  onNavigate: (view: ViewType, context?: any) => void;
}

export const SubInspectorHubView: React.FC<SubInspectorHubViewProps> = ({
  language,
  onNavigate
}) => {
  const data = siDataRaw;

  return (
    <div className="space-y-6 pb-16 animate-fade-in">
      
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { labelEn: 'Recruitments', labelHi: 'भर्तियां', view: 'recruitments' },
          { labelEn: 'SI Master Hub', labelHi: 'उप-निरीक्षक (दरोगा) संपूर्ण तैयारी' }
        ]}
        language={language}
        onSelectView={onNavigate}
      />

      {/* Top Hero Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950/60 border border-blue-500/30 shadow-2xl space-y-4">
        <div className="inline-flex items-center space-x-2 text-xs font-bold text-blue-400 bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full">
          <Scale className="w-4 h-4" />
          <span>{language === 'hi' ? 'उत्तर प्रदेश पुलिस उप-निरीक्षक (नागरिक पुलिस) एवं प्लाटून कमांडर' : 'UP Police Sub-Inspector (Civil Police) & Platoon Commander'}</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-black text-white">
          {language === 'hi' ? 'उप-निरीक्षक (दरोगा) संपूर्ण तैयारी मंच' : 'UP Police Sub-Inspector (SI) Master'}
        </h1>

        <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
          {language === 'hi'
            ? '4,543 पदों हेतु मूल विधि (BNS/BNSS/BSA), संविधान, सामान्य हिन्दी, संख्यात्मक अभियोग्यता, तार्किक क्षमता, विषयवार 35% कटऑफ व शारीरिक दक्षता परीक्षण।'
            : 'End-to-end preparation for UP Police Sub-Inspector direct recruitment: modernized criminal law transition (BNS/BNSS), Indian constitution, Hindi, maths, and timed CBT mocks.'}
        </p>

        {/* Sectional Cutoff Alert Banner */}
        <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-300 flex items-center space-x-2.5">
          <ShieldAlert className="w-5 h-5 flex-shrink-0" />
          <span>
            {language === 'hi'
              ? 'अनिवार्य विषयवार कटऑफ: प्रत्येक विषय में न्यूनतम 35% (35/100 अंक) तथा कुल चारों विषयों में मिलाकर न्यूनतम 50% (200/400 अंक) प्राप्त करना अनिवार्य है।'
              : 'Mandatory Cutoff Rule: Candidate must secure min 35% in each of the 4 sections AND 50% in aggregate (200/400 marks).'}
          </span>
        </div>

        {/* Action Row */}
        <div className="pt-2 flex flex-wrap gap-2.5">
          <button
            onClick={() => onNavigate('law')}
            className="flex items-center space-x-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-4 py-2 rounded-xl transition shadow"
          >
            <Scale className="w-4 h-4" />
            <span>{language === 'hi' ? 'मूल विधि: BNS / BNSS तुलना टूल' : 'Mool Vidhi (BNS/BNSS Converter)'}</span>
          </button>

          <button
            onClick={() => onNavigate('mock')}
            className="flex items-center space-x-1.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs px-4 py-2 rounded-xl transition shadow"
          >
            <Clock className="w-4 h-4" />
            <span>{language === 'hi' ? 'दरोगा सीबीटी मॉक टेस्ट (160 प्रश्न)' : 'Full 160-Q CBT Mock'}</span>
          </button>

          <button
            onClick={() => onNavigate('practice', { subject: 'Law' })}
            className="flex items-center space-x-1.5 bg-slate-800 hover:bg-slate-700 text-amber-400 font-semibold text-xs px-4 py-2 rounded-xl border border-slate-700 transition"
          >
            <HelpCircle className="w-4 h-4" />
            <span>{language === 'hi' ? 'विधि एवं संविधान प्रश्न अभ्यास' : 'Law & Constitution MCQs'}</span>
          </button>
        </div>
      </div>

      {/* 4 Core Sections of SI Syllabus */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Section 1: Hindi */}
        <div 
          onClick={() => onNavigate('practice', { subject: 'General Hindi' })}
          className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-blue-500/50 cursor-pointer transition shadow-md group"
        >
          <div className="flex items-center justify-between text-xs text-blue-400 font-bold mb-2">
            <span>40 Questions • 100 Marks</span>
            <span className="text-[10px] uppercase bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">Min 35 Marks Req</span>
          </div>
          <h3 className="text-base font-bold text-white group-hover:text-blue-400 transition">
            {language === 'hi' ? 'सामान्य हिन्दी' : 'General Hindi'}
          </h3>
          <p className="text-xs text-slate-400 mt-1 leading-relaxed">
            {language === 'hi'
              ? 'तत्सम-तद्भव, सन्धि, समास, कारक, काल, वाच्य, रस-छन्द-अलंकार एवं हिन्दी साहित्य का प्रामाणिक इतिहास।'
              : 'Hindi Grammar, Tatsam-Tadbhav, Sandhi, Samas, Case-ending Karak, and Literature Awards.'}
          </p>
        </div>

        {/* Section 2: Law & Constitution */}
        <div 
          onClick={() => onNavigate('law')}
          className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-emerald-500/50 cursor-pointer transition shadow-md group"
        >
          <div className="flex items-center justify-between text-xs text-emerald-400 font-bold mb-2">
            <span>40 Questions • 100 Marks</span>
            <span className="text-[10px] uppercase bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">Min 35 Marks Req</span>
          </div>
          <h3 className="text-base font-bold text-white group-hover:text-emerald-400 transition">
            {language === 'hi' ? 'मूल विधि / संविधान / सामान्य ज्ञान' : 'Basic Law, Constitution & GK'}
          </h3>
          <p className="text-xs text-slate-400 mt-1 leading-relaxed">
            {language === 'hi'
              ? 'भारतीय न्याय संहिता (BNS), BNSS, पॉक्सो, मोटर वाहन अधिनियम, मानव अधिकार, साइबर अपराध एवं संविधान के अनुच्छेद।'
              : 'Bharatiya Nyaya Sanhita, BNSS, POCSO, Motor Vehicles Act, Cyber Law, and Constitutional Articles.'}
          </p>
        </div>

        {/* Section 3: Numerical Ability */}
        <div 
          onClick={() => onNavigate('practice', { subject: 'Mathematics' })}
          className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-amber-500/50 cursor-pointer transition shadow-md group"
        >
          <div className="flex items-center justify-between text-xs text-amber-400 font-bold mb-2">
            <span>40 Questions • 100 Marks</span>
            <span className="text-[10px] uppercase bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">Min 35 Marks Req</span>
          </div>
          <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition">
            {language === 'hi' ? 'संख्यात्मक एवं मानसिक योग्यता परीक्षा' : 'Numerical & Mental Ability'}
          </h3>
          <p className="text-xs text-slate-400 mt-1 leading-relaxed">
            {language === 'hi'
              ? 'प्रतिशत, लाभ-हानि, चक्रवृद्धि ब्याज, कार्य-समय, चाल-दूरी, क्षेत्रमिति एवं उच्च स्तरीय डेटा इंटरप्रिटेशन।'
              : 'Percentage, Profit/Loss, CI/SI, Time & Work, Speed Distance, and Data Interpretation.'}
          </p>
        </div>

        {/* Section 4: Reasoning */}
        <div 
          onClick={() => onNavigate('practice', { subject: 'Reasoning' })}
          className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-purple-500/50 cursor-pointer transition shadow-md group"
        >
          <div className="flex items-center justify-between text-xs text-purple-400 font-bold mb-2">
            <span>40 Questions • 100 Marks</span>
            <span className="text-[10px] uppercase bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20">Min 35 Marks Req</span>
          </div>
          <h3 className="text-base font-bold text-white group-hover:text-purple-400 transition">
            {language === 'hi' ? 'मानसिक अभिरुचि, बुद्धिलब्धि एवं तार्किक परीक्षा' : 'Reasoning, IQ & Police Aptitude'}
          </h3>
          <p className="text-xs text-slate-400 mt-1 leading-relaxed">
            {language === 'hi'
              ? 'न्याय निगमन (Syllogisms), कथन-तर्क, इनपुट-आउटपुट, पहेलियां, दिशा परीक्षण एवं पुलिस व्यावसायिकता।'
              : 'Syllogisms, Statement-Inference, Machine Input-Output, Puzzles, and Police Aptitude.'}
          </p>
        </div>

      </div>

    </div>
  );
};
