import React, { useState } from 'react';
import { 
  MapPin, 
  CheckCircle2, 
  Clock, 
  Calendar, 
  Sparkles, 
  Activity, 
  BookOpen, 
  RotateCcw
} from 'lucide-react';
import { ViewType } from '../common/Sidebar';
import { Breadcrumb } from '../common/Breadcrumb';
import studyRoadmapRaw from '../../data/planner/studyRoadmap.json';

interface RoadmapViewProps {
  language: 'hi' | 'en';
  onNavigate: (view: ViewType) => void;
}

export const RoadmapView: React.FC<RoadmapViewProps> = ({
  language,
  onNavigate
}) => {
  const levels = studyRoadmapRaw.roadmapLevels;

  // Study Plan Generator inputs
  const [targetPost, setTargetPost] = useState<'constable' | 'si' | 'computer'>('constable');
  const [dailyHours, setDailyHours] = useState<number>(6);
  const [targetWeeks, setTargetWeeks] = useState<number>(12);
  const [fitnessLevel, setFitnessLevel] = useState<'beginner' | 'intermediate' | 'advanced'>('intermediate');

  return (
    <div className="space-y-6 pb-16 animate-fade-in">
      
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { labelEn: 'Study Planner', labelHi: 'स्टडी प्लानर' },
          { labelEn: '10-Level Zero-to-Master Roadmap', labelHi: '10-लेवल शून्य से चयन रोडमैप' }
        ]}
        language={language}
        onSelectView={onNavigate}
      />

      {/* Top Banner */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-3">
        <div className="inline-flex items-center space-x-1.5 text-xs font-bold text-sky-400 bg-sky-500/10 border border-sky-500/20 px-3 py-1 rounded-full">
          <MapPin className="w-4 h-4" />
          <span>{language === 'hi' ? 'उत्तर प्रदेश पुलिस तैयारी का सम्पूर्ण मार्गचित्र' : 'End-to-End UPPRPB Preparation Architecture'}</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-black text-white">
          {language === 'hi' ? 'शून्य से चयन (Zero to Master) रोडमैप एवं टाइमटेबल' : 'Zero to Master 10-Level Roadmap & Timetable Generator'}
        </h1>

        <p className="text-xs sm:text-sm text-slate-400 max-w-3xl leading-relaxed">
          {language === 'hi'
            ? 'लेवल 0 (विज्ञप्ति समझ) से लेकर लेवल 10 (अंतिम परीक्षा सिमुलेशन) तक चरणबद्ध 10-स्तरीय तैयारी योजना एवं व्यक्तिगत दैनिक अध्ययन समय-सारिणी।'
            : 'Structured 10-stage preparation roadmap and dynamic custom timetable generator based on your daily available hours and target examination.'}
        </p>
      </div>

      {/* Study Plan Generator Form */}
      <div className="p-6 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950 border border-slate-800 shadow-xl space-y-4">
        <h2 className="text-lg font-bold text-white flex items-center space-x-2">
          <Sparkles className="w-5 h-5 text-amber-400" />
          <span>{language === 'hi' ? 'व्यक्तिगत अध्ययन योजना जनरेटर (Study Plan Generator)' : 'Custom Study Plan Generator'}</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          
          <div>
            <label className="text-slate-400 block mb-1.5 font-semibold">Target Post / Exam:</label>
            <select
              value={targetPost}
              onChange={(e) => setTargetPost(e.target.value as any)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-blue-500"
            >
              <option value="constable">Constable Civil Police & PAC</option>
              <option value="si">Sub-Inspector (SI) & Platoon Commander</option>
              <option value="computer">Computer Operator Grade-A</option>
            </select>
          </div>

          <div>
            <label className="text-slate-400 block mb-1.5 font-semibold">Daily Available Hours:</label>
            <select
              value={dailyHours}
              onChange={(e) => setDailyHours(parseInt(e.target.value))}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-blue-500"
            >
              <option value={4}>4 Hours / Day (Working Aspirant)</option>
              <option value={6}>6 Hours / Day (Standard)</option>
              <option value={8}>8 Hours / Day (Full-time Intensive)</option>
              <option value={10}>10+ Hours / Day (Sprint Mode)</option>
            </select>
          </div>

          <div>
            <label className="text-slate-400 block mb-1.5 font-semibold">Preparation Duration:</label>
            <select
              value={targetWeeks}
              onChange={(e) => setTargetWeeks(parseInt(e.target.value))}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-blue-500"
            >
              <option value={8}>8 Weeks (Crash Course)</option>
              <option value={12}>12 Weeks (Recommended 90 Days)</option>
              <option value={16}>16 Weeks (Complete Foundation)</option>
              <option value={24}>24 Weeks (Long-term Mastery)</option>
            </select>
          </div>

          <div>
            <label className="text-slate-400 block mb-1.5 font-semibold">Physical Fitness Level:</label>
            <select
              value={fitnessLevel}
              onChange={(e) => setFitnessLevel(e.target.value as any)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-blue-500"
            >
              <option value="beginner">Beginner (Starting 4.8 km run from scratch)</option>
              <option value="intermediate">Intermediate (Can jog 2-3 km)</option>
              <option value="advanced">Advanced (Can complete 4.8 km in 26-28 min)</option>
            </select>
          </div>

        </div>

        {/* Generated Timetable Preview */}
        <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3 pt-4">
          <div className="flex items-center justify-between text-xs border-b border-slate-800/80 pb-2">
            <span className="font-bold text-amber-400 uppercase tracking-wider">
              Recommended Daily Schedule ({dailyHours} Hours + Physical):
            </span>
            <span className="text-slate-400 font-mono">90-Day Strategy</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
              <span className="font-bold text-emerald-400 block">Morning: 05:30 - 07:00 AM</span>
              <p className="text-slate-300 font-medium">PET Running & Fitness</p>
              <p className="text-[11px] text-slate-400">Warmup + 3-4 km progressive run + core stretches.</p>
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
              <span className="font-bold text-blue-400 block">Slot 1: 08:30 - 11:30 AM</span>
              <p className="text-slate-300 font-medium">
                {targetPost === 'si' ? 'Law (BNS/BNSS) & Constitution' : 'Numerical & Reasoning Mastery'}
              </p>
              <p className="text-[11px] text-slate-400">Concept study + 40 topic questions solving.</p>
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
              <span className="font-bold text-amber-400 block">Slot 2: 02:00 - 05:00 PM</span>
              <p className="text-slate-300 font-medium">General Hindi & UP GK</p>
              <p className="text-[11px] text-slate-400">Grammar rules, 75 districts data, and flashcard review.</p>
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
              <span className="font-bold text-purple-400 block">Slot 3: 07:30 - 09:30 PM</span>
              <p className="text-slate-300 font-medium">Full Mock Test & Error Notebook</p>
              <p className="text-[11px] text-slate-400">Timed practice sprint, analyze errors, add to notebook.</p>
            </div>
          </div>
        </div>

      </div>

      {/* 10-Level Zero-to-Master Roadmap Display (Section 32) */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white flex items-center space-x-2">
          <CheckCircle2 className="w-5 h-5 text-amber-400" />
          <span>{language === 'hi' ? '10-स्तरीय शून्य से चयन रोडमैप' : 'Official 10-Level Roadmap'}</span>
        </h2>

        <div className="space-y-3">
          {levels.map((lvl) => (
            <div 
              key={lvl.level}
              className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2 hover:border-blue-500/40 transition shadow-md"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="w-7 h-7 rounded-lg bg-blue-600/30 text-blue-300 font-black font-mono flex items-center justify-center text-xs border border-blue-500/40">
                    L{lvl.level}
                  </span>
                  <h3 className="font-bold text-sm sm:text-base text-white">
                    {language === 'hi' ? lvl.titleHi : lvl.title}
                  </h3>
                </div>
                <span className="text-[11px] text-amber-400 font-mono font-semibold">
                  {lvl.duration}
                </span>
              </div>

              <ul className="list-disc list-inside text-xs text-slate-300 space-y-1 pl-1">
                {lvl.actions.map((act, i) => (
                  <li key={i} className="leading-relaxed">{act}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
