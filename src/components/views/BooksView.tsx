import React, { useState, useMemo } from 'react';
import { 
  BookMarked, 
  ExternalLink, 
  ShieldCheck, 
  CheckCircle, 
  Search,
  BookOpen
} from 'lucide-react';
import { ViewType } from '../common/Sidebar';
import { Breadcrumb } from '../common/Breadcrumb';
import booksDataRaw from '../../data/books/books.json';
import ncertMappingRaw from '../../data/books/ncertMapping.json';
import { BookItem } from '../../types';

interface BooksViewProps {
  language: 'hi' | 'en';
  onNavigate: (view: ViewType) => void;
}

export const BooksView: React.FC<BooksViewProps> = ({
  language,
  onNavigate
}) => {
  const books: BookItem[] = booksDataRaw as BookItem[];
  const [selectedPost, setSelectedPost] = useState<string>('all');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBooks = useMemo(() => {
    let result = books;
    if (selectedPost !== 'all') {
      result = result.filter(b => b.post.includes(selectedPost as any));
    }
    if (selectedLevel !== 'all') {
      result = result.filter(b => b.level === selectedLevel);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(b => 
        b.title.toLowerCase().includes(q) ||
        b.author.toLowerCase().includes(q) ||
        b.publisher.toLowerCase().includes(q) ||
        b.subject.toLowerCase().includes(q)
      );
    }
    return result;
  }, [books, selectedPost, selectedLevel, searchQuery]);

  return (
    <div className="space-y-6 pb-16 animate-fade-in">
      
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { labelEn: 'Book Library', labelHi: 'प्रामाणिक पुस्तक पुस्तकालय' },
          { labelEn: 'Recommended Books & NCERT', labelHi: 'अनुशंसित पुस्तकें एवं एनसीईआरटी' }
        ]}
        language={language}
        onSelectView={onNavigate}
      />

      {/* Top Banner */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-3">
        <div className="inline-flex items-center space-x-1.5 text-xs font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full">
          <BookMarked className="w-4 h-4" />
          <span>{language === 'hi' ? 'उत्तर प्रदेश पुलिस भर्ती अनुशंसित संदर्भ साहित्य' : 'Official UPPRPB Syllabus-Aligned Reading List'}</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-black text-white">
          {language === 'hi' ? 'प्रामाणिक पुस्तकें एवं पाठ्यक्रम मैपिंग' : 'UPPRPB Master Book Library & NCERT Integration'}
        </h1>

        <p className="text-xs sm:text-sm text-slate-400 max-w-3xl leading-relaxed">
          {language === 'hi'
            ? 'यूथ कॉम्पिटिशन टाइम्स (YCT), किरण, लूसेंट, आदित्य पब्लिकेशन एवं परीक्षा मंथन की प्रामाणिक पुस्तकों का अध्यायवार पाठ्यक्रम संबंध। कोई पायरेटेड सामग्री नहीं; केवल वैध प्रकाशक व स्टोर संदर्भ।'
            : 'Carefully curated reference library with direct syllabus topic mapping, official NCERT chapter alignments, and legitimate bookstore links. Strictly copyright-safe with zero pirated PDFs.'}
        </p>

        {/* Copyright Safety Policy Note (Section 38 & 65) */}
        <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-[11px] text-slate-400 flex items-center space-x-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span>
            {language === 'hi'
              ? 'कॉपीराइट नीति: हम किसी भी पुस्तक की पायरेटेड पीडीएफ या अवैध डाउनलोड लिंक उपलब्ध नहीं कराते। छात्रों को केवल अधिकृत प्रकाशकों व पुस्तक विक्रेताओं से जोड़ने की नीति।'
              : 'Copyright Safety: We never host or link pirated PDFs or unauthorized repositories. All links direct only to authorized publishers, NCERT, and recognized bookstores.'}
          </span>
        </div>
      </div>

      {/* Filter and Search Controls */}
      <div className="p-4 sm:p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-md space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          
          <div className="flex flex-wrap items-center gap-2">
            <select
              value={selectedPost}
              onChange={(e) => setSelectedPost(e.target.value)}
              className="bg-slate-800 border border-slate-700 text-xs text-white rounded-lg px-2.5 py-1.5 focus:outline-none"
            >
              <option value="all">{language === 'hi' ? 'सभी पद (All Posts)' : 'All Posts'}</option>
              <option value="constable">Constable</option>
              <option value="si">Sub-Inspector (SI)</option>
              <option value="computer-operator">Computer Operator</option>
              <option value="radio-police">Radio Police</option>
              <option value="ministerial">Ministerial</option>
            </select>

            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="bg-slate-800 border border-slate-700 text-xs text-white rounded-lg px-2.5 py-1.5 focus:outline-none"
            >
              <option value="all">{language === 'hi' ? 'सभी स्तर (All Levels)' : 'All Pedagogical Levels'}</option>
              <option value="Foundation">Foundation</option>
              <option value="Concept">Concept</option>
              <option value="Practice">Practice</option>
              <option value="PYQ">PYQ</option>
              <option value="Complete Guide">Complete Guide</option>
            </select>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={language === 'hi' ? 'पुस्तक, लेखक, प्रकाशक खोजें...' : 'Search books, authors, publisher...'}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-amber-500"
            />
          </div>

        </div>
      </div>

      {/* Book Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredBooks.map((book) => (
          <div 
            key={book.id}
            className="p-5 sm:p-6 rounded-3xl bg-slate-900 border border-slate-800 hover:border-amber-500/50 shadow-xl transition space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  {book.level} Level
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  {book.edition}
                </span>
              </div>

              <div>
                <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
                  {book.title}
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Author: <strong className="text-slate-300">{book.author}</strong> • Publisher: <strong className="text-slate-300">{book.publisher}</strong>
                </p>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                {language === 'hi' ? book.purposeHi : book.purpose}
              </p>

              {/* Subject & PYQ metadata */}
              <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-300">
                <div className="p-2 rounded-lg bg-slate-950/40 border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">Subject:</span>
                  <span className="font-semibold">{book.subject}</span>
                </div>
                <div className="p-2 rounded-lg bg-slate-950/40 border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">Questions:</span>
                  <span className="font-semibold text-amber-400">{book.practiceQuestionsCount}</span>
                </div>
              </div>

              {/* Syllabus Topic Mapping */}
              <div className="pt-2 border-t border-slate-800/80">
                <span className="text-[11px] font-bold text-slate-400 block mb-1.5">Syllabus Topic Alignment:</span>
                <div className="flex flex-wrap gap-1">
                  {book.syllabusMapping.map((mapItem, idx) => (
                    <span 
                      key={idx}
                      className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded-md border border-slate-700"
                    >
                      {mapItem}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
              <span className="text-[10px] text-slate-400 font-mono">
                Verified: {book.lastVerified}
              </span>

              <a
                href={book.officialOrStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1.5 bg-slate-800 hover:bg-slate-700 text-amber-400 font-semibold text-xs px-3.5 py-1.5 rounded-xl border border-slate-700 transition"
              >
                <span>View Authorized Listing</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
