import React from 'react';
import { Shield, ExternalLink, Heart } from 'lucide-react';
import { ViewType } from './Sidebar';

interface FooterProps {
  language: 'hi' | 'en';
  onNavigate: (view: ViewType) => void;
}

export const Footer: React.FC<FooterProps> = ({
  language,
  onNavigate
}) => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800/80 text-slate-400 text-xs py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          
          <div className="space-y-2 md:col-span-2">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
                <Shield className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-base text-white tracking-tight">
                UPPRPB <span className="text-amber-400">MASTER</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-md">
              {language === 'hi'
                ? 'उत्तर प्रदेश पुलिस भर्ती एवं प्रोन्नति बोर्ड (UPPRPB) द्वारा आयोजित सभी सीधी भर्ती परीक्षाओं हेतु स्वतंत्र एवं प्रामाणिक शैक्षिक तैयारी मंच।'
                : 'Dedicated preparation platform for direct recruitment examinations conducted by Uttar Pradesh Police Recruitment and Promotion Board.'}
            </p>
            <div className="pt-1 text-[11px] text-slate-300">
              Official Board Website:{' '}
              <a 
                href="https://uppbpb.gov.in/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-amber-400 hover:underline inline-flex items-center space-x-1"
              >
                <span>uppbpb.gov.in</span>
                <ExternalLink className="w-3 h-3 ml-0.5" />
              </a>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-200">
              {language === 'hi' ? 'भर्ती संवर्ग (Cadres)' : 'Recruitment Cadres'}
            </h4>
            <ul className="space-y-1 text-slate-400 text-xs">
              <li><button onClick={() => onNavigate('constable')} className="hover:text-amber-400">Constable Civil Police & PAC</button></li>
              <li><button onClick={() => onNavigate('si')} className="hover:text-amber-400">Sub-Inspector (SI) Master</button></li>
              <li><button onClick={() => onNavigate('computer')} className="hover:text-amber-400">Computer Operator Grade-A</button></li>
              <li><button onClick={() => onNavigate('radio')} className="hover:text-amber-400">Radio Police Cadre</button></li>
              <li><button onClick={() => onNavigate('ministerial')} className="hover:text-amber-400">ASI Ministerial & Clerk</button></li>
            </ul>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-200">
              {language === 'hi' ? 'तैयारी टूल्स (Tools)' : 'Preparation Engines'}
            </h4>
            <ul className="space-y-1 text-slate-400 text-xs">
              <li><button onClick={() => onNavigate('practice')} className="hover:text-amber-400">1,244+ Practice Questions</button></li>
              <li><button onClick={() => onNavigate('mock')} className="hover:text-amber-400">Official CBT & OMR Mocks</button></li>
              <li><button onClick={() => onNavigate('law')} className="hover:text-amber-400">BNS/BNSS Law Converter</button></li>
              <li><button onClick={() => onNavigate('typing')} className="hover:text-amber-400">Hindi/English Typing Test</button></li>
              <li><button onClick={() => onNavigate('physical')} className="hover:text-amber-400">PST/PET Running Tracker</button></li>
            </ul>
          </div>

        </div>

        {/* Disclaimer & Copyright (Section 65) */}
        <div className="pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-300 gap-3">
          <p>
            © {new Date().getFullYear()} UPPRPB MASTER. Educational preparation platform. Sourced from public gazettes at uppbpb.gov.in.
          </p>
          <div className="flex items-center space-x-1">
            <span>Designed for UP Police Aspirants with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-current inline" />
          </div>
        </div>

      </div>
    </footer>
  );
};
