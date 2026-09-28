import React, { useState, useMemo } from 'react';
import { 
  Scale, 
  Search, 
  ArrowRight, 
  AlertTriangle, 
  Filter
} from 'lucide-react';
import { ViewType } from '../common/Sidebar';
import { Breadcrumb } from '../common/Breadcrumb';
import lawDataRaw from '../../data/law/lawComparison.json';
import { LawComparisonItem } from '../../types';

interface LawComparatorViewProps {
  language: 'hi' | 'en';
  onNavigate: (view: ViewType) => void;
}

export const LawComparatorView: React.FC<LawComparatorViewProps> = ({
  language,
  onNavigate
}) => {
  const allLawItems: LawComparisonItem[] = lawDataRaw as LawComparisonItem[];
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'bns_ipc' | 'bnss_crpc' | 'bsa_iea'>('all');

  const filteredItems = useMemo(() => {
    let items = allLawItems;
    if (selectedCategory !== 'all') {
      items = items.filter(i => i.category === selectedCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      items = items.filter(i => 
        i.oldLaw.toLowerCase().includes(q) ||
        i.newLaw.toLowerCase().includes(q) ||
        i.topic.toLowerCase().includes(q) ||
        i.topicHi.includes(q) ||
        i.keyChange.toLowerCase().includes(q) ||
        i.keyChangeHi.includes(q)
      );
    }
    return items;
  }, [allLawItems, selectedCategory, searchQuery]);

  return (
    <div className="space-y-6 pb-16 animate-fade-in">
      
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { labelEn: 'SI Mool Vidhi', labelHi: 'दरोगा मूल विधि' },
          { labelEn: 'Old Law ↔ New Law (BNS/BNSS)', labelHi: 'नवीन आपराधिक कानून (BNS/BNSS)' }
        ]}
        language={language}
        onSelectView={onNavigate}
      />

      {/* Top Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-br from-slate-950 via-emerald-950/40 to-slate-900 border border-emerald-500/40 shadow-xl space-y-3">
        <div className="inline-flex items-center space-x-1.5 text-xs font-bold text-emerald-400 bg-emerald-500/15 border border-emerald-500/30 px-3 py-1 rounded-full">
          <Scale className="w-4 h-4" />
          <span>{language === 'hi' ? '1 जुलाई 2024 से प्रभावी नवीन आपराधिक कानून' : 'New Criminal Laws Effective from July 1, 2024'}</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-black text-white">
          {language === 'hi' ? 'भारतीय न्याय संहिता (BNS) एवं धारा तुलना टूल' : 'Old Law ↔ New Law Criminal Code Converter'}
        </h1>

        <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
          {language === 'hi'
            ? 'भा.दं.सं. (IPC 1860), दं.प्र.सं. (CrPC 1973) एवं भारतीय साक्ष्य अधिनियम (IEA 1872) का भारतीय न्याय संहिता (BNS 2023), भारतीय नागरिक सुरक्षा संहिता (BNSS 2023) तथा भारतीय साक्ष्य अधिनियम (BSA 2023) में परिवर्तन। यूपी पुलिस दरोगा परीक्षा हेतु अनिवार्य तुलना।'
            : 'Interactive section-by-section transition mapping between colonial codes (IPC, CrPC, IEA) and modern criminal codes (BNS, BNSS, BSA) with key judicial shifts, punishments, and police procedures.'}
        </p>

        {/* Quick Notification alert */}
        <div className="p-3 rounded-xl bg-slate-900/80 border border-emerald-500/30 text-xs text-slate-300 flex items-center space-x-2">
          <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0" />
          <span>
            {language === 'hi'
              ? 'परीक्षा चेतावनी: आगामी UPPRPB उप-निरीक्षक (दरोगा) भर्ती में नवीन आपराधिक कानूनों (BNS/BNSS/BSA) से प्रश्न पूछे जाएंगे। पुराने और नए दोनों संदर्भ याद रखें।'
              : 'Exam Alert: UPPRPB SI examinations test new BNS/BNSS/BSA provisions alongside historical continuity. Learn both old and new sections.'}
          </span>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="p-4 sm:p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-md space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          
          {/* Category Tabs */}
          <div className="flex space-x-2 overflow-x-auto pb-1 scrollbar-none">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                selectedCategory === 'all' ? 'bg-emerald-600 text-white shadow' : 'bg-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              All Provisions ({allLawItems.length})
            </button>
            <button
              onClick={() => setSelectedCategory('bns_ipc')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                selectedCategory === 'bns_ipc' ? 'bg-blue-600 text-white shadow' : 'bg-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              BNS vs IPC (Offences)
            </button>
            <button
              onClick={() => setSelectedCategory('bnss_crpc')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                selectedCategory === 'bnss_crpc' ? 'bg-amber-600 text-slate-950 font-black shadow' : 'bg-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              BNSS vs CrPC (Procedure)
            </button>
            <button
              onClick={() => setSelectedCategory('bsa_iea')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                selectedCategory === 'bsa_iea' ? 'bg-purple-600 text-white shadow' : 'bg-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              BSA vs IEA (Evidence)
            </button>
          </div>

          {/* Quick Search */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={language === 'hi' ? 'खोजें: 302, 420, हत्या, FIR, राजद्रोह...' : 'Search: 302, 420, FIR, arrest...'}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500"
            />
          </div>

        </div>
      </div>

      {/* Law Comparison Cards Grid */}
      <div className="space-y-4">
        {filteredItems.map((item) => (
          <div 
            key={item.id}
            className="p-5 sm:p-6 rounded-3xl bg-slate-900 border border-slate-800 hover:border-emerald-500/50 shadow-xl transition space-y-4"
          >
            {/* Topic & Category */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-800 text-emerald-400 border border-slate-700">
                  {item.category === 'bns_ipc' ? 'Penal Offence' : item.category === 'bnss_crpc' ? 'Police Procedure' : 'Evidence Rule'}
                </span>
                <h3 className="text-lg font-bold text-white mt-1.5">
                  {language === 'hi' ? item.topicHi : item.topic}
                </h3>
              </div>

              {/* Old Law -> New Law Visual Badge */}
              <div className="flex items-center space-x-2 bg-slate-950 p-2 rounded-xl border border-slate-800 flex-shrink-0 font-mono text-xs">
                <span className="text-rose-400 font-bold line-through opacity-80">{item.oldLaw}</span>
                <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-emerald-400 font-extrabold text-sm">{item.newLaw}</span>
              </div>
            </div>

            {/* Description of Key Change */}
            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 text-xs sm:text-sm text-slate-200 leading-relaxed">
              <strong className="text-amber-400 block mb-1">
                {language === 'hi' ? 'प्रमुख विधिक परिवर्तन एवं नए प्रावधान:' : 'Core Statutory Shift & New Provisions:'}
              </strong>
              {language === 'hi' ? item.keyChangeHi : item.keyChange}
            </div>

            {/* Punishments & Exam Relevance Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-950/40 border border-slate-800 space-y-1">
                <span className="text-[11px] font-semibold text-slate-400 block">
                  {language === 'hi' ? 'दंड का प्रावधान (Punishment Comparison):' : 'Sentencing Comparison:'}
                </span>
                <div className="text-[11px] text-slate-300">
                  <span className="text-slate-400">Old:</span> {item.punishmentOld || 'N/A'}
                </div>
                <div className="text-[11px] text-emerald-300 font-medium">
                  <span className="text-emerald-400">New (BNS/BNSS):</span> {item.punishmentNew || 'N/A'}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/40 border border-slate-800 space-y-1">
                <span className="text-[11px] font-semibold text-slate-400 block">
                  {language === 'hi' ? 'परीक्षा प्रासंगिकता (Exam Relevance):' : 'UP Police Exam Importance:'}
                </span>
                <p className="text-[11px] text-amber-300 font-medium leading-relaxed">
                  {language === 'hi' ? item.examRelevanceHi : item.examRelevance}
                </p>
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
