import React, { useState } from 'react';
import { 
  Bell, 
  ExternalLink, 
  Calendar, 
  Shield, 
  Search, 
  FileText 
} from 'lucide-react';
import { ViewType } from '../common/Sidebar';
import { Breadcrumb } from '../common/Breadcrumb';
import currentDataRaw from '../../data/recruitments/current.json';

interface NoticesViewProps {
  language: 'hi' | 'en';
  onNavigate: (view: ViewType) => void;
}

export const NoticesView: React.FC<NoticesViewProps> = ({
  language,
  onNavigate
}) => {
  const currentData = currentDataRaw;
  const [selectedPost, setSelectedPost] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const notices = currentData.topNotices;

  const filteredNotices = notices.filter(n => {
    if (selectedPost !== 'all' && !n.post.toLowerCase().includes(selectedPost.toLowerCase())) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      return n.title.toLowerCase().includes(q) || n.titleHi.includes(q) || n.post.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="space-y-6 pb-16 animate-fade-in">
      
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { labelEn: 'Notifications', labelHi: 'आधिकारिक सूचनाएं' },
          { labelEn: 'Notice Board Archive', labelHi: 'सूचना पट (Notice Board)' }
        ]}
        language={language}
        onSelectView={onNavigate}
      />

      {/* Top Banner */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-3">
        <div className="inline-flex items-center space-x-1.5 text-xs font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full">
          <Bell className="w-4 h-4" />
          <span>{language === 'hi' ? 'उत्तर प्रदेश पुलिस भर्ती एवं प्रोन्नति बोर्ड नोटिस बोर्ड' : 'Official UPPRPB Notice Archive'}</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-black text-white">
          {language === 'hi' ? 'आधिकारिक सूचनाएं एवं विज्ञप्ति अभिलेखागार' : 'Official Notifications & Gazette Archive'}
        </h1>

        <p className="text-xs sm:text-sm text-slate-400 max-w-3xl leading-relaxed">
          {language === 'hi'
            ? 'uppbpb.gov.in से सत्यापित प्रत्यक्ष भर्ती सूचनाएं, परीक्षा कार्यक्रम, परिणाम, डीवी/पीएसटी व पीईटी तिथियां तथा ओ.टी.आर. संबंधी सार्वजनिक दिशा-निर्देश।'
            : 'Track official recruitment circulars, examination schedules, admit card notifications, and answer keys sourced directly from the UPPRPB official portal.'}
        </p>

        {/* Primary Source Rule Badge */}
        <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Shield className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>Official Portal Verification: All notices point directly to verified gov.in domain links.</span>
          </div>
          <a
            href="https://uppbpb.gov.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-amber-400 font-semibold hover:underline flex items-center space-x-1 flex-shrink-0"
          >
            <span>uppbpb.gov.in</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 sm:p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        
        <div className="flex space-x-2 overflow-x-auto pb-1 scrollbar-none">
          <button
            onClick={() => setSelectedPost('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition border ${
              selectedPost === 'all' ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-300'
            }`}
          >
            All Notices
          </button>
          <button
            onClick={() => setSelectedPost('constable')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition border ${
              selectedPost === 'constable' ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-300'
            }`}
          >
            Constable
          </button>
          <button
            onClick={() => setSelectedPost('sub-inspector')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition border ${
              selectedPost === 'sub-inspector' ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-300'
            }`}
          >
            SI (Sub-Inspector)
          </button>
          <button
            onClick={() => setSelectedPost('computer')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition border ${
              selectedPost === 'computer' ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-300'
            }`}
          >
            Computer Operator
          </button>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search notice..."
            className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-amber-500"
          />
        </div>

      </div>

      {/* Notices List */}
      <div className="space-y-3">
        {filteredNotices.map((n) => (
          <div
            key={n.id}
            className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-amber-500/40 shadow-lg transition flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div className="space-y-1.5 flex-1 pr-3">
              <div className="flex items-center space-x-2">
                <span className="font-mono text-xs font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                  {n.date}
                </span>
                <span className="text-xs text-slate-400 font-semibold">
                  {n.post}
                </span>
                {n.isImportant && (
                  <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
                    Important
                  </span>
                )}
              </div>

              <h3 className="font-bold text-sm sm:text-base text-white leading-snug">
                {language === 'hi' ? n.titleHi : n.title}
              </h3>

              <div className="text-[11px] text-slate-400 flex items-center space-x-2">
                <span>Verified Source: UPPRPB Notice Board</span>
              </div>
            </div>

            <a
              href={n.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1.5 bg-slate-800 hover:bg-slate-700 text-amber-400 font-bold text-xs px-4 py-2 rounded-xl border border-slate-700 transition flex-shrink-0"
            >
              <FileText className="w-4 h-4" />
              <span>{language === 'hi' ? 'आधिकारिक सूचना देखें' : 'View Official Notice'}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        ))}
      </div>

    </div>
  );
};
