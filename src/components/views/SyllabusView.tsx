import React, { useState } from 'react';
import { 
  BookOpen, 
  HelpCircle, 
  ExternalLink, 
  CheckCircle, 
  Sparkles,
  Search
} from 'lucide-react';
import { ViewType } from '../common/Sidebar';
import { Breadcrumb } from '../common/Breadcrumb';
import constableSyllabusRaw from '../../data/syllabus/constable-syllabus.json';
import siSyllabusRaw from '../../data/syllabus/si-syllabus.json';
import computerSyllabusRaw from '../../data/syllabus/computer-operator-syllabus.json';
import ncertMappingRaw from '../../data/books/ncertMapping.json';

interface SyllabusViewProps {
  language: 'hi' | 'en';
  onNavigate: (view: ViewType, context?: any) => void;
}

export const SyllabusView: React.FC<SyllabusViewProps> = ({
  language,
  onNavigate
}) => {
  const [activeExam, setActiveExam] = useState<'constable' | 'si' | 'computer'>('constable');
  const [searchFilter, setSearchFilter] = useState('');

  const syllabusMap = {
    constable: constableSyllabusRaw,
    si: siSyllabusRaw,
    computer: computerSyllabusRaw
  };

  const currentSyllabus = syllabusMap[activeExam];
  const [activeSubjectId, setActiveSubjectId] = useState<string>(currentSyllabus.subjects[0]?.id || '');

  const activeSubject = currentSyllabus.subjects.find(s => s.id === activeSubjectId) || currentSyllabus.subjects[0];

  return (
    <div className="space-y-6 pb-16 animate-fade-in">
      
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { labelEn: 'Syllabus', labelHi: 'पाठ्यक्रम' },
          { labelEn: currentSyllabus.exam, labelHi: currentSyllabus.examHi }
        ]}
        language={language}
        onSelectView={onNavigate}
      />

      {/* Top Banner */}
      <div className="p-5 sm:p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-1.5 text-xs text-amber-400 font-semibold bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{currentSyllabus.officialReference}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            {language === 'hi' ? currentSyllabus.examHi : currentSyllabus.exam}
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            {language === 'hi' 
              ? `कुल विषय: ${currentSyllabus.subjects.length} • पूर्णांक: ${currentSyllabus.totalMarks} अंक • आधिकारिक अधिसूचना से सत्यापित` 
              : `Total Subjects: ${currentSyllabus.subjects.length} • Max Marks: ${currentSyllabus.totalMarks} • Verified from Official UPPRPB Annexures`}
          </p>
        </div>

        {/* Post Switcher */}
        <div className="flex bg-slate-950 p-1.5 rounded-2xl border border-slate-800 flex-shrink-0">
          <button
            onClick={() => {
              setActiveExam('constable');
              setActiveSubjectId(constableSyllabusRaw.subjects[0].id);
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
              activeExam === 'constable' 
                ? 'bg-amber-500 text-slate-950 shadow' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {language === 'hi' ? 'आरक्षी (Constable)' : 'Constable'}
          </button>
          <button
            onClick={() => {
              setActiveExam('si');
              setActiveSubjectId(siSyllabusRaw.subjects[0].id);
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
              activeExam === 'si' 
                ? 'bg-blue-600 text-white shadow' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {language === 'hi' ? 'दरोगा (SI)' : 'Sub-Inspector'}
          </button>
          <button
            onClick={() => {
              setActiveExam('computer');
              setActiveSubjectId(computerSyllabusRaw.subjects[0].id);
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
              activeExam === 'computer' 
                ? 'bg-cyan-600 text-white shadow' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {language === 'hi' ? 'कंप्यूटर' : 'Computer'}
          </button>
        </div>
      </div>

      {/* Subject Tabs and Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div 
          onWheel={(e) => { if (e.deltaY !== 0) e.currentTarget.scrollLeft += e.deltaY; }}
          className="flex space-x-2 overflow-x-auto pb-1 scrollable-tabs scroll-smooth"
        >
          {currentSyllabus.subjects.map((sub) => {
            const isSubActive = sub.id === activeSubject.id;
            return (
              <button
                key={sub.id}
                onClick={() => setActiveSubjectId(sub.id)}
                className={`flex-shrink-0 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition border ${
                  isSubActive
                    ? 'bg-blue-600 text-white border-blue-500 shadow-md shadow-blue-900/30'
                    : 'bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <span>{language === 'hi' ? sub.nameHi : sub.name}</span>
                <span className="ml-2 text-[10px] opacity-80 font-mono">({sub.marksWeightage} M)</span>
              </button>
            );
          })}
        </div>

        {/* Filter Input */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            placeholder={language === 'hi' ? 'टॉपिक खोजें...' : 'Filter topics...'}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* Subject Details & Chapters */}
      <div className="space-y-4">
        {activeSubject.chapters.map((chapter) => {
          const filteredTopics = (chapter.topics as any[]).filter((t: any) => 
            t.name.toLowerCase().includes(searchFilter.toLowerCase()) || 
            t.nameHi.includes(searchFilter)
          );

          if (filteredTopics.length === 0 && searchFilter) return null;

          return (
            <div 
              key={chapter.id}
              className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-md"
            >
              <div className="px-5 py-3.5 bg-slate-950/60 border-b border-slate-800/80 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <BookOpen className="w-4 h-4 text-amber-400" />
                  <h3 className="font-bold text-sm sm:text-base text-white">
                    {language === 'hi' ? chapter.nameHi : chapter.name}
                  </h3>
                </div>
                <span className="text-xs text-slate-400 font-mono">
                  {filteredTopics.length} Topics
                </span>
              </div>

              <div className="divide-y divide-slate-800/60">
                {filteredTopics.map((topic: any) => (
                  <div 
                    key={topic.id}
                    className="p-4 sm:p-5 hover:bg-slate-850/50 transition flex flex-col md:flex-row md:items-center justify-between gap-3"
                  >
                    <div className="space-y-1.5 flex-1 pr-4">
                      <div className="flex items-center space-x-2">
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                          topic.importance === 'high' 
                            ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' 
                            : 'bg-slate-800 text-slate-300'
                        }`}>
                          {topic.importance} Importance
                        </span>
                        {topic.ncertRef && (
                          <span className="text-[10px] bg-blue-500/15 text-blue-300 border border-blue-500/30 px-2 py-0.5 rounded-full">
                            NCERT Mapped
                          </span>
                        )}
                      </div>

                      <h4 className="font-bold text-sm sm:text-base text-slate-100">
                        {language === 'hi' ? topic.nameHi : topic.name}
                      </h4>

                      {topic.description && (
                        <p className="text-xs text-slate-400 leading-relaxed">
                          {topic.description}
                        </p>
                      )}

                      {topic.ncertRef && (
                        <div className="flex items-center space-x-1.5 text-[11px] text-sky-400 pt-0.5">
                          <span>Reference:</span>
                          <span className="text-slate-300 font-medium">{topic.ncertRef}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center space-x-2 flex-shrink-0">
                      <button
                        onClick={() => onNavigate('practice', { subject: activeSubject.name, topic: topic.name })}
                        className="flex items-center space-x-1.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs px-3.5 py-2 rounded-xl transition shadow"
                      >
                        <HelpCircle className="w-3.5 h-3.5" />
                        <span>{language === 'hi' ? 'टॉपिक अभ्यास' : 'Practice MCQs'}</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* NCERT Direct References Card (Section 40) */}
      <div className="p-6 rounded-3xl bg-gradient-to-br from-slate-900 to-blue-950/60 border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-amber-400 font-bold text-base">
            <CheckCircle className="w-5 h-5" />
            <span>{language === 'hi' ? 'एनसीईआरटी 6-12 पाठ्यक्रम मैपिंग (NCERT Mapping)' : 'Official NCERT Textbook Mappings'}</span>
          </div>
          <a
            href="https://ncert.nic.in/textbook.php"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-blue-400 hover:underline flex items-center space-x-1"
          >
            <span>ePathshala / NCERT Portal</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          {language === 'hi' 
            ? 'भारतीय इतिहास (1857 विद्रोह), भारतीय राजव्यवस्था (मौलिक अधिकार व अनुच्छेद), भूगोल (नदियां व अपवाह तंत्र) तथा सामान्य विज्ञान के मूल सिद्धांतों को एनसीईआरटी कक्षा 8 से 12 की प्रामाणिक पुस्तकों से जोड़ा गया है।' 
            : 'Core conceptual foundations across Indian History, Polity Articles, Rivers Drainage, and Science are directly aligned with verified NCERT textbooks.'}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
          {ncertMappingRaw.map((nc) => (
            <div key={nc.id} className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 text-xs space-y-1">
              <div className="flex items-center justify-between text-amber-400 font-bold">
                <span>{nc.subject} • {nc.class}</span>
                <span className="text-[10px] text-slate-400 font-normal">{nc.chapter}</span>
              </div>
              <div className="font-semibold text-slate-200">
                {language === 'hi' ? nc.topicHi : nc.topic}
              </div>
              <ul className="list-disc list-inside text-[11px] text-slate-400 pt-1 space-y-0.5">
                {nc.keyTakeaways.slice(0, 2).map((take, i) => (
                  <li key={i}>{take}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
