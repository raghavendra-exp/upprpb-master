import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Clock, 
  ExternalLink, 
  ArrowRight, 
  FileText, 
  Scale, 
  Activity, 
  BookOpen, 
  Filter
} from 'lucide-react';
import { ViewType } from '../common/Sidebar';
import { Breadcrumb } from '../common/Breadcrumb';
import constableDataRaw from '../../data/recruitments/constable-2025.json';
import siDataRaw from '../../data/recruitments/si-2025.json';
import computerDataRaw from '../../data/recruitments/computer-operator.json';
import radioDataRaw from '../../data/recruitments/radio-police.json';
import ministerialDataRaw from '../../data/recruitments/ministerial.json';
import jailDataRaw from '../../data/recruitments/jail-warder.json';
import fireDataRaw from '../../data/recruitments/fire-service.json';
import driverDataRaw from '../../data/recruitments/motor-transport.json';
import { RecruitmentData } from '../../types';

interface RecruitmentsViewProps {
  language: 'hi' | 'en';
  onNavigate: (view: ViewType) => void;
  selectedPostKey?: string;
}

export const RecruitmentsView: React.FC<RecruitmentsViewProps> = ({
  language,
  onNavigate,
  selectedPostKey
}) => {
  const recruitments: RecruitmentData[] = [
    constableDataRaw as unknown as RecruitmentData,
    siDataRaw as unknown as RecruitmentData,
    computerDataRaw as unknown as RecruitmentData,
    radioDataRaw as unknown as RecruitmentData,
    ministerialDataRaw as unknown as RecruitmentData,
    jailDataRaw as unknown as RecruitmentData,
    fireDataRaw as unknown as RecruitmentData,
    driverDataRaw as unknown as RecruitmentData
  ];

  const [activePostId, setActivePostId] = useState<string>(selectedPostKey || 'UPPRPB-CONSTABLE-2025');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const currentRecruitment = recruitments.find(r => r.id === activePostId || r.postKey === activePostId) || recruitments[0];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'PET':
      case 'DV/PST':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/40 animate-pulse';
      case 'WRITTEN EXAM':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/40';
      case 'APPLICATION OPEN':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
      case 'UPCOMING':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/40';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  return (
    <div className="space-y-6 pb-16 animate-fade-in">
      
      {/* Breadcrumb Navigation */}
      <Breadcrumb
        items={[
          { labelEn: 'Recruitments', labelHi: 'भर्तियां' },
          { labelEn: currentRecruitment.post, labelHi: currentRecruitment.postHi }
        ]}
        language={language}
        onSelectView={onNavigate}
      />

      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-md">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            {language === 'hi' ? 'उत्तर प्रदेश पुलिस भर्ती केंद्र' : 'UPPRPB Live Recruitment Center'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            {language === 'hi' 
              ? 'आधिकारिक सेवा नियमावली व विज्ञापन संख्या अनुसार 8 अलग-अलग संवर्गों का विस्तृत विवरण' 
              : 'Official post-specific eligibility, examination rules, physical standards, and timelines'}
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <select 
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-slate-800 border border-slate-700 text-xs text-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-amber-500"
          >
            <option value="all">{language === 'hi' ? 'सभी स्थितियां (All Status)' : 'All Statuses'}</option>
            <option value="active">{language === 'hi' ? 'सक्रिय प्रक्रिया (Active)' : 'Active Stages'}</option>
            <option value="upcoming">{language === 'hi' ? 'आगामी (Upcoming)' : 'Upcoming Recruitments'}</option>
          </select>
        </div>
      </div>

      {/* Cadre Tabs Selector */}
      <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-none">
        {recruitments.map((r) => {
          const isSelected = r.id === currentRecruitment.id;
          return (
            <button
              key={r.id}
              onClick={() => setActivePostId(r.id)}
              className={`flex-shrink-0 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition border ${
                isSelected
                  ? 'bg-blue-600 text-white border-blue-500 shadow-md shadow-blue-900/30'
                  : 'bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800/80 hover:text-white'
              }`}
            >
              <span>{language === 'hi' ? r.postHi : r.post}</span>
              <span className="ml-2 text-[10px] opacity-80 font-mono">({r.vacancies})</span>
            </button>
          );
        })}
      </div>

      {/* Active Recruitment Card Detail */}
      <div className="rounded-3xl bg-slate-900 border border-slate-800 overflow-hidden shadow-xl">
        
        {/* Post Title Banner */}
        <div className="p-6 bg-gradient-to-r from-slate-950 via-slate-900 to-blue-950 border-b border-slate-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center space-x-2">
                <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border uppercase tracking-wider ${getStatusBadge(currentRecruitment.status)}`}>
                  {currentRecruitment.status}
                </span>
                <span className="text-xs text-slate-400 font-mono">Cycle: {currentRecruitment.cycle}</span>
                <span className="text-xs text-slate-400 font-mono hidden sm:inline">• ID: {currentRecruitment.id}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
                {language === 'hi' ? currentRecruitment.postHi : currentRecruitment.post}
              </h2>
              <p className="text-xs sm:text-sm text-amber-400 font-medium mt-1">
                {language === 'hi' ? `वर्तमान चरण: ${currentRecruitment.currentStageHi}` : `Current Stage: ${currentRecruitment.currentStage}`}
              </p>
            </div>

            <div className="text-right sm:text-right">
              <div className="text-xs text-slate-400">{language === 'hi' ? 'कुल अधिसूचित रिक्तियां' : 'Total Vacancies'}</div>
              <div className="text-2xl sm:text-4xl font-black text-amber-400 font-mono">
                {typeof currentRecruitment.vacancies === 'number' 
                  ? currentRecruitment.vacancies.toLocaleString('en-IN') 
                  : currentRecruitment.vacancies}
              </div>
            </div>
          </div>
        </div>

        {/* Section 6: Stage Timeline Tracker */}
        <div className="p-6 border-b border-slate-800 bg-slate-950/40">
          <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-4 flex items-center space-x-2">
            <Clock className="w-4 h-4 text-amber-400" />
            <span>{language === 'hi' ? 'भर्ती चरण समय-सारिणी (Recruitment Timeline)' : 'Official Recruitment Stages'}</span>
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
            {currentRecruitment.stages.map((stg, sIdx) => {
              const isComp = stg.status === 'completed';
              const isCurr = stg.status === 'current';
              return (
                <div 
                  key={stg.id}
                  className={`p-2.5 rounded-xl border text-center relative transition ${
                    isCurr
                      ? 'bg-amber-500/20 border-amber-500 text-white shadow-lg shadow-amber-500/20'
                      : isComp
                      ? 'bg-slate-800/80 border-slate-700 text-slate-300'
                      : 'bg-slate-900/40 border-slate-800 text-slate-400'
                  }`}
                >
                  <div className="text-[10px] font-mono text-slate-400">Step {sIdx + 1}</div>
                  <div className="font-bold text-xs mt-1 truncate" title={language === 'hi' ? stg.nameHi : stg.name}>
                    {language === 'hi' ? stg.nameHi : stg.name}
                  </div>
                  {stg.dateText && (
                    <div className="text-[10px] text-amber-300/80 mt-1 font-mono truncate">{stg.dateText}</div>
                  )}
                  {isCurr && (
                    <span className="inline-block mt-1 text-[9px] font-bold bg-amber-500 text-slate-950 px-1.5 py-0.2 rounded-full uppercase">
                      Active
                    </span>
                  )}
                  {isComp && (
                    <span className="inline-block mt-1 text-[9px] font-bold text-emerald-400">
                      ✓ Done
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Eligibility & Exam Pattern & Physical Grid */}
        <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Eligibility Card */}
          <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-3">
            <h4 className="text-sm font-bold text-amber-400 uppercase tracking-wider flex items-center space-x-2">
              <FileText className="w-4 h-4" />
              <span>{language === 'hi' ? 'पात्रता एवं आयु सीमा' : 'Eligibility & Age Limit'}</span>
            </h4>

            <div className="space-y-2 text-xs text-slate-300">
              <div>
                <span className="text-slate-400 block">{language === 'hi' ? 'आयु सीमा (Age Limits):' : 'Age Limits:'}</span>
                <span className="font-semibold text-white">
                  {currentRecruitment.eligibility.ageLimit.min} to {currentRecruitment.eligibility.ageLimit.max} Years
                </span>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  {language === 'hi' ? currentRecruitment.eligibility.ageLimit.relaxationHi : currentRecruitment.eligibility.ageLimit.relaxation}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-800">
                <span className="text-slate-400 block">{language === 'hi' ? 'शैक्षणिक योग्यता (Qualification):' : 'Educational Qualification:'}</span>
                <p className="font-medium text-slate-200 mt-0.5 leading-relaxed">
                  {language === 'hi' ? currentRecruitment.eligibility.qualificationHi : currentRecruitment.eligibility.qualification}
                </p>
              </div>

              {currentRecruitment.eligibility.specialRequirements && (
                <div className="pt-2 border-t border-slate-800">
                  <span className="text-slate-400 block">{language === 'hi' ? 'अधिमानी / विशेष अर्हताएं:' : 'Preferential / Special Qualifications:'}</span>
                  <ul className="list-disc list-inside mt-1 space-y-1 text-[11px] text-slate-300">
                    {(language === 'hi' ? currentRecruitment.eligibility.specialRequirementsHi : currentRecruitment.eligibility.specialRequirements)?.map((req, i) => (
                      <li key={i}>{req}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Exam Pattern Card */}
          <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-3">
            <h4 className="text-sm font-bold text-blue-400 uppercase tracking-wider flex items-center space-x-2">
              <Scale className="w-4 h-4" />
              <span>{language === 'hi' ? 'लिखित परीक्षा पैटर्न' : 'Written Exam Pattern'}</span>
            </h4>

            <div className="space-y-2 text-xs text-slate-300">
              <div className="grid grid-cols-2 gap-2 text-center">
                <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Questions</span>
                  <span className="text-base font-bold text-white font-mono">{currentRecruitment.examPattern.totalQuestions}</span>
                </div>
                <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Total Marks</span>
                  <span className="text-base font-bold text-amber-400 font-mono">{currentRecruitment.examPattern.totalMarks}</span>
                </div>
                <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Duration</span>
                  <span className="text-base font-bold text-white font-mono">{currentRecruitment.examPattern.durationMinutes} Mins</span>
                </div>
                <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Negative Mark</span>
                  <span className="text-base font-bold text-red-400 font-mono">
                    {currentRecruitment.examPattern.negativeMarking > 0 ? `-${currentRecruitment.examPattern.negativeMarking}` : 'No Negative'}
                  </span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800 space-y-1">
                <span className="text-slate-400 block text-[11px] font-semibold">{language === 'hi' ? 'विषयवार विभाजन:' : 'Sectional Breakdown:'}</span>
                {currentRecruitment.examPattern.sections.map((sec) => (
                  <div key={sec.id} className="flex items-center justify-between text-[11px] py-0.5">
                    <span className="text-slate-300 truncate max-w-[160px]">{language === 'hi' ? sec.nameHi : sec.name}</span>
                    <span className="font-mono text-slate-400">{sec.questions} Qs / {sec.marks} M</span>
                  </div>
                ))}
              </div>

              {currentRecruitment.examPattern.qualifyingCriteria && (
                <div className="pt-2 border-t border-slate-800 text-[11px] text-amber-300/90 leading-tight">
                  <span className="font-bold">{language === 'hi' ? 'न्यूनतम अर्हकारी मानक: ' : 'Qualifying Standard: '}</span>
                  {language === 'hi' ? currentRecruitment.examPattern.qualifyingCriteriaHi : currentRecruitment.examPattern.qualifyingCriteria}
                </div>
              )}
            </div>
          </div>

          {/* Physical Standards Card */}
          <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-3">
            <h4 className="text-sm font-bold text-emerald-400 uppercase tracking-wider flex items-center space-x-2">
              <Activity className="w-4 h-4" />
              <span>{language === 'hi' ? 'शारीरिक मानक एवं दक्षता (PST/PET)' : 'Physical Standards (PST/PET)'}</span>
            </h4>

            {currentRecruitment.physical.length === 0 ? (
              <div className="p-4 rounded-xl bg-slate-900 text-center text-xs text-slate-400">
                {language === 'hi' ? 'इस पद हेतु कोई शारीरिक मानक (दौड़) आवश्यक नहीं है। टंकण/कौशल परीक्षा लागू है।' : 'Physical running test is exempt for this post. Typing/skill test applies.'}
              </div>
            ) : (
              <div className="space-y-3 text-xs text-slate-300">
                {currentRecruitment.physical.map((p, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-200">{language === 'hi' ? p.titleHi : p.title}</span>
                      <span className="text-[10px] uppercase font-bold px-1.5 py-0.2 rounded bg-slate-800 text-emerald-400">{p.category}</span>
                    </div>
                    <div className="text-[11px] text-slate-400 space-y-0.5">
                      <div><strong className="text-slate-300">पुरुष (Gen/OBC/SC):</strong> {p.maleGenObcSc}</div>
                      <div><strong className="text-slate-300">महिला (Gen/OBC/SC):</strong> {p.femaleGenObcSc}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Action Bottom Bar */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center space-x-2 text-xs text-slate-400">
            <span>Verified: {currentRecruitment.lastVerified}</span>
            <span>•</span>
            <a 
              href={currentRecruitment.officialSource} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-amber-400 hover:underline flex items-center space-x-1"
            >
              <span>Official Notice: uppbpb.gov.in</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => onNavigate('syllabus')}
              className="flex items-center space-x-1.5 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs px-3.5 py-2 rounded-xl border border-slate-700 transition"
            >
              <BookOpen className="w-4 h-4 text-blue-400" />
              <span>{language === 'hi' ? 'पाठ्यक्रम देखें' : 'View Syllabus'}</span>
            </button>

            <button
              onClick={() => onNavigate('practice')}
              className="flex items-center space-x-1.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs px-4 py-2 rounded-xl transition shadow"
            >
              <span>{language === 'hi' ? 'प्रश्न अभ्यास शुरू करें' : 'Practice Questions'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
