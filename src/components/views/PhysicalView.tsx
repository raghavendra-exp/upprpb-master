import React, { useState } from 'react';
import { 
  Activity, 
  PlusCircle, 
  Calendar, 
  TrendingUp, 
  Clock, 
  AlertCircle
} from 'lucide-react';
import { ViewType } from '../common/Sidebar';
import { Breadcrumb } from '../common/Breadcrumb';
import physicalDataRaw from '../../data/physical/physicalData.json';
import { getRunningLogs, addRunningLog } from '../../utils/storage';
import { RunningLogEntry } from '../../types';

interface PhysicalViewProps {
  language: 'hi' | 'en';
  onNavigate: (view: ViewType) => void;
}

export const PhysicalView: React.FC<PhysicalViewProps> = ({
  language,
  onNavigate
}) => {
  const standards = physicalDataRaw.standards;
  const trainingWeeks = physicalDataRaw.trainingSchedule8Weeks;

  const [logs, setLogs] = useState<RunningLogEntry[]>(getRunningLogs());
  const [distanceKm, setDistanceKm] = useState<string>('4.8');
  const [timeMins, setTimeMins] = useState<string>('24');
  const [timeSecs, setTimeSecs] = useState<string>('30');
  const [notes, setNotes] = useState<string>('');
  const [selectedPost, setSelectedPost] = useState<string>(standards[0].post);

  const activeStandard = standards.find(s => s.post === selectedPost) || standards[0];

  const handleAddLog = (e: React.FormEvent) => {
    e.preventDefault();
    const d = parseFloat(distanceKm);
    const m = parseInt(timeMins) || 0;
    const s = parseInt(timeSecs) || 0;
    const totalSecs = m * 60 + s;
    if (isNaN(d) || d <= 0 || totalSecs <= 0) return;

    const pace = Number(((totalSecs / 60) / d).toFixed(2));
    const targetMet = (d >= 4.8 && totalSecs <= 1500) || (d >= 2.4 && totalSecs <= 840);

    const updated = addRunningLog({
      date: new Date().toISOString().split('T')[0],
      distanceKm: d,
      timeSeconds: totalSecs,
      paceMinPerKm: pace,
      notes: notes.trim() || 'Daily training run',
      targetMet
    });

    setLogs([...updated]);
    setNotes('');
  };

  // Analytics
  const totalDistance = logs.reduce((acc, l) => acc + l.distanceKm, 0);
  const best48Run = logs
    .filter(l => l.distanceKm >= 4.8)
    .sort((a, b) => a.timeSeconds - b.timeSeconds)[0];

  return (
    <div className="space-y-6 pb-16 animate-fade-in">
      
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { labelEn: 'Physical Preparation', labelHi: 'शारीरिक दक्षता (PST/PET)' },
          { labelEn: 'Running Tracker & Benchmarks', labelHi: 'दौड़ ट्रैकर एवं मानक' }
        ]}
        language={language}
        onSelectView={onNavigate}
      />

      {/* Top Banner */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-3">
        <div className="inline-flex items-center space-x-1.5 text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
          <Activity className="w-4 h-4" />
          <span>{language === 'hi' ? 'उत्तर प्रदेश पुलिस शारीरिक दक्षता एवं मानक परीक्षण' : 'Official UPPRPB Physical Standards (PST & PET)'}</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-black text-white">
          {language === 'hi' ? 'शारीरिक दक्षता (दौड़) एवं रनिंग ट्रैकर' : 'Physical Preparation & Running Endurance Tracker'}
        </h1>

        <p className="text-xs sm:text-sm text-slate-400 max-w-3xl leading-relaxed">
          {language === 'hi'
            ? 'आरक्षी (पुरुष: 4.8 किमी 25 मिनट / महिला: 2.4 किमी 14 मिनट) एवं दरोगा (पुरुष: 4.8 किमी 28 मिनट / महिला: 2.4 किमी 16 मिनट) हेतु आधिकारिक मानक, 8-सप्ताह का फिटनेस प्लान व दैनिक रनिंग लॉग।'
            : 'Track your daily training runs, calculate pace splits, and follow official 8-week endurance benchmarks for UP Police 4.8 km and 2.4 km RFID timed qualifying races.'}
        </p>

        {/* Disclaimer (Mandatory Section 34) */}
        <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-[11px] text-slate-400 flex items-center space-x-2">
          <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0" />
          <span>
            {language === 'hi'
              ? 'अस्वीकरण: यह केवल भर्ती दौड़ समय-सारिणी प्रबंधन हेतु एक ट्रैकर है। कोई चिकित्सीय सलाह नहीं दी गई है। दौड़ अभ्यास अपने शारीरिक सामर्थ्य अनुसार करें।'
              : 'Non-Medical Notice: This is an examination conditioning log and tracking tool. Consult medical professionals before intense aerobic training.'}
          </span>
        </div>
      </div>

      {/* Post Standard Selector & Metrics */}
      <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 shadow-md space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <h2 className="text-base font-bold text-white">
            {language === 'hi' ? 'आधिकारिक शारीरिक मानक (PST / PET)' : 'Official Physical Requirements'}
          </h2>
          <div className="flex space-x-2 overflow-x-auto pb-1 scrollbar-none">
            {standards.map(s => (
              <button
                key={s.post}
                onClick={() => setSelectedPost(s.post)}
                className={`px-3 py-1 rounded-xl text-xs font-semibold transition border ${
                  selectedPost === s.post 
                    ? 'bg-emerald-600 text-white border-emerald-500 shadow' 
                    : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-white'
                }`}
              >
                {s.post}
              </button>
            ))}
          </div>
        </div>

        {/* PST / PET details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          
          {/* PST Standards */}
          <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2">
            <span className="text-amber-400 font-bold uppercase tracking-wider block text-[11px]">
              Physical Standard Test (PST)
            </span>
            <div className="space-y-1.5 text-slate-300">
              <div>
                <strong className="text-white">Male Height:</strong> {activeStandard.malePst.heightGenObcSc} (ST: {activeStandard.malePst.heightSt})
              </div>
              <div>
                <strong className="text-white">Male Chest:</strong> {activeStandard.malePst.chestGenObcSc} (min 5 cm expansion strictly required)
              </div>
              <div>
                <strong className="text-white">Female Height:</strong> {activeStandard.femalePst.heightGenObcSc} (ST: {activeStandard.femalePst.heightSt})
              </div>
              <div>
                <strong className="text-white">Female Weight:</strong> Minimum 40 kg mandatory
              </div>
            </div>
          </div>

          {/* PET Running Standards */}
          <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2">
            <span className="text-emerald-400 font-bold uppercase tracking-wider block text-[11px]">
              Physical Efficiency Test (PET - Running)
            </span>
            <div className="space-y-1.5 text-slate-300">
              <div>
                <strong className="text-white">Male Running:</strong> {activeStandard.petRunning.maleDistance} in max {activeStandard.petRunning.maleTimeLimit}
              </div>
              <div>
                <strong className="text-white">Female Running:</strong> {activeStandard.petRunning.femaleDistance} in max {activeStandard.petRunning.femaleTimeLimit}
              </div>
              <div className="text-[11px] text-slate-400 pt-1 border-t border-slate-800">
                Method: {activeStandard.petRunning.method}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Running Tracker: Add Entry + Log History */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Form: Log a Run */}
        <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 shadow-md space-y-4">
          <div className="flex items-center space-x-2 text-white font-bold text-sm">
            <PlusCircle className="w-4 h-4 text-emerald-400" />
            <span>{language === 'hi' ? 'नया रन दर्ज करें' : 'Record Training Session'}</span>
          </div>

          <form onSubmit={handleAddLog} className="space-y-3 text-xs">
            <div>
              <label className="text-slate-400 block mb-1">Distance (km):</label>
              <input
                type="number"
                step="0.1"
                value={distanceKm}
                onChange={(e) => setDistanceKm(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500 font-mono"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-slate-400 block mb-1">Minutes:</label>
                <input
                  type="number"
                  value={timeMins}
                  onChange={(e) => setTimeMins(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500 font-mono"
                />
              </div>
              <div>
                <label className="text-slate-400 block mb-1">Seconds:</label>
                <input
                  type="number"
                  value={timeSecs}
                  onChange={(e) => setTimeSecs(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500 font-mono"
                />
              </div>
            </div>

            <div>
              <label className="text-slate-400 block mb-1">Notes / Training focus:</label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Track lap split, breathing, weather..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 rounded-xl transition shadow"
            >
              {language === 'hi' ? 'रनिंग लॉग सेव करें' : 'Save Running Entry'}
            </button>
          </form>

          {/* Quick Metrics */}
          <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-1.5 text-xs text-slate-300">
            <div className="flex justify-between">
              <span className="text-slate-400">Total Distance Logged:</span>
              <span className="font-bold text-emerald-400 font-mono">{totalDistance.toFixed(1)} km</span>
            </div>
            {best48Run && (
              <div className="flex justify-between">
                <span className="text-slate-400">Personal Best (4.8 km):</span>
                <span className="font-bold text-amber-400 font-mono">
                  {Math.floor(best48Run.timeSeconds / 60)}:{(best48Run.timeSeconds % 60).toString().padStart(2, '0')}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* History Table */}
        <div className="lg:col-span-2 p-5 rounded-3xl bg-slate-900 border border-slate-800 shadow-md space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-white flex items-center space-x-2">
              <TrendingUp className="w-4 h-4 text-amber-400" />
              <span>{language === 'hi' ? 'रनिंग लॉग इतिहास (Training History)' : 'Training Activity Log'}</span>
            </h3>
            <span className="text-xs text-slate-400 font-mono">{logs.length} Sessions</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="p-2.5 rounded-l-lg">Date</th>
                  <th className="p-2.5">Distance</th>
                  <th className="p-2.5">Time</th>
                  <th className="p-2.5">Pace (min/km)</th>
                  <th className="p-2.5">Notes</th>
                  <th className="p-2.5 rounded-r-lg">Standard</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                {logs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-850 transition">
                    <td className="p-2.5 font-mono text-slate-400">{log.date}</td>
                    <td className="p-2.5 font-bold text-white font-mono">{log.distanceKm} km</td>
                    <td className="p-2.5 font-mono text-slate-200">
                      {Math.floor(log.timeSeconds / 60)}:{(log.timeSeconds % 60).toString().padStart(2, '0')}
                    </td>
                    <td className="p-2.5 font-mono text-amber-400">{log.paceMinPerKm}</td>
                    <td className="p-2.5 text-slate-400 truncate max-w-[140px]">{log.notes}</td>
                    <td className="p-2.5">
                      {log.targetMet ? (
                        <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                          QUALIFY
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full">
                          TRAIN
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* 8-Week Progressive Training Schedule */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-md space-y-4">
        <div className="flex items-center space-x-2 text-white font-bold text-base">
          <Calendar className="w-5 h-5 text-blue-400" />
          <span>{language === 'hi' ? '8-सप्ताह की प्रगतिशील दौड़ एवं सहनशक्ति योजना' : '8-Week Progressive Endurance Training Guide'}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {trainingWeeks.map((tw, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
              <span className="text-amber-400 font-bold block">{language === 'hi' ? tw.weekHi : tw.week}</span>
              <p className="text-slate-300 font-medium">{tw.focus}</p>
              <p className="text-[11px] text-slate-400 leading-relaxed">{tw.plan}</p>
              <div className="pt-2 border-t border-slate-800 text-[10px] text-emerald-400 font-mono">
                Target Pace: {tw.targetPace}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
