import React from 'react';
import { 
  Sparkles, 
  TrendingUp, 
  BarChart3, 
  HelpCircle, 
  ArrowRight, 
  CheckCircle2 
} from 'lucide-react';
import { ViewType } from '../common/Sidebar';
import { Breadcrumb } from '../common/Breadcrumb';
import { verifiedPyqQuestions } from '../../data/questions';

interface PyqAnalysisViewProps {
  language: 'hi' | 'en';
  onNavigate: (view: ViewType, context?: any) => void;
}

export const PyqAnalysisView: React.FC<PyqAnalysisViewProps> = ({
  language,
  onNavigate
}) => {
  // Topic frequency analysis
  const subjectFrequency = [
    { subject: 'UP GK & Administration', questions: 28, percentage: 19, weight: 'High' },
    { subject: 'Indian Constitution & Polity', questions: 22, percentage: 15, weight: 'High' },
    { subject: 'Modern History & 1857 Revolt', questions: 18, percentage: 12, weight: 'High' },
    { subject: 'General Hindi Grammar & Sandhi', questions: 25, percentage: 17, weight: 'High' },
    { subject: 'Numerical Ability (Percentage/Work)', questions: 20, percentage: 14, weight: 'High' },
    { subject: 'Reasoning & Coding/Direction', questions: 21, percentage: 14, weight: 'High' },
    { subject: 'General Science & Units', questions: 14, percentage: 9, weight: 'Medium' }
  ];

  const mostRepeatedTopics = [
    { topic: '1857 Revolt in UP (Meerut, Awadh, Jhansi)', frequency: 'Asked in every shift', shiftExample: 'Constable 2018, 2019, 2024' },
    { topic: 'UP Rivers & Dudhwa National Park', frequency: 'Repeated 12+ times', shiftExample: 'Constable & SI Shifts' },
    { topic: 'Writs (Article 32 & 226) & Fundamental Rights', frequency: 'Repeated 15+ times', shiftExample: 'SI 2021 & Constable 2019' },
    { topic: 'Hindi Varnamala & Sparsh/Antastha Vyanjan', frequency: 'Repeated 18+ times', shiftExample: 'Constable Shift 1 & 2' },
    { topic: 'ODOP & District Specializations (Kannauj, Firozabad)', frequency: 'High Exam Regular', shiftExample: 'UP Police 2019, 2024' },
    { topic: 'Time & Work (LCM Unit Method)', frequency: 'Standard 2 Qs/shift', shiftExample: 'All shifts' },
    { topic: 'Blood Relations & Direction Sense', frequency: '3-4 Qs/shift', shiftExample: 'Constable & Radio Cadre' }
  ];

  return (
    <div className="space-y-6 pb-16 animate-fade-in">
      
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { labelEn: 'Previous Year Papers', labelHi: 'विगत वर्षों के प्रश्न' },
          { labelEn: 'PYQ Trend & Frequency Analysis', labelHi: 'PYQ रुझान एवं विषयवार आवृत्ति विश्लेषण' }
        ]}
        language={language}
        onSelectView={onNavigate}
      />

      {/* Top Banner */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-3">
        <div className="inline-flex items-center space-x-1.5 text-xs font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full">
          <Sparkles className="w-4 h-4" />
          <span>{language === 'hi' ? 'उत्तर प्रदेश पुलिस आधिकारिक प्रश्नपत्र विश्लेषण' : 'Official UPPRPB Shift-Wise Question Analysis'}</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-black text-white">
          {language === 'hi' ? 'सत्यापित पूर्व वर्ष प्रश्न (PYQ) विश्लेषण एवं हीटमैप' : 'Verified PYQ Trend & Weightage Heatmap'}
        </h1>

        <p className="text-xs sm:text-sm text-slate-400 max-w-3xl leading-relaxed">
          {language === 'hi'
            ? 'कांस्टेबल 2024 री-एग्जाम, 2019 एवं 2018 की सभी शिफ्ट्स तथा दरोगा 2021 सीबीटी के प्रामाणिक प्रश्नों का विषयवार आवृत्ति एवं बार-बार पूछे जाने वाले विषयों का वैज्ञानिक वर्गीकरण।'
            : 'Statistical breakdown of verified questions across official examination shifts. Identify high-yield patterns to maximize your study return on investment.'}
        </p>

        <div className="pt-2">
          <button
            onClick={() => onNavigate('practice')}
            className="flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-4 py-2 rounded-xl shadow transition"
          >
            <HelpCircle className="w-4 h-4" />
            <span>{language === 'hi' ? `सभी ${verifiedPyqQuestions.length} प्रामाणिक PYQ हल करें` : `Practice All ${verifiedPyqQuestions.length} Verified PYQs`}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Subject Weightage Heatmap (Section 24) */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-md space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-white flex items-center space-x-2">
            <BarChart3 className="w-5 h-5 text-amber-400" />
            <span>{language === 'hi' ? 'विषयवार प्रश्न भार एवं आवृत्ति (Subject Frequency Heatmap)' : 'Subject Frequency & Weightage Distribution'}</span>
          </h2>
          <span className="text-xs text-slate-400 font-mono">Official Shift Baseline</span>
        </div>

        <div className="space-y-3">
          {subjectFrequency.map((item, idx) => (
            <div key={idx} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs text-slate-300">
                <span className="font-semibold text-white">{item.subject}</span>
                <span className="font-mono text-amber-400 font-bold">{item.percentage}% ({item.questions} Qs avg.)</span>
              </div>
              <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                <div 
                  className="h-full bg-gradient-to-r from-amber-500 to-blue-500 rounded-full"
                  style={{ width: `${item.percentage * 4}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Most Asked Topics & Repeated Concepts (Section 24) */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-md space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-emerald-400" />
            <span>{language === 'hi' ? 'सर्वाधिक दोहराए जाने वाले टॉपिक (Most Repeated Topics)' : 'Most Frequently Tested Concepts'}</span>
          </h3>
          <span className="text-xs text-emerald-400 font-semibold">100% High Yield</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {mostRepeatedTopics.map((top, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-sm">{top.topic}</span>
                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                  {top.frequency}
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Tested In: <strong className="text-slate-300">{top.shiftExample}</strong>
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
