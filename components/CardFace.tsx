import React from 'react';
import { motion } from 'framer-motion';
import * as LucideIcons from 'lucide-react';
import { Theme } from '../types';

interface CardFaceProps {
  theme: Theme;
  isFlipped: boolean;
  onFlip: () => void;
}

export const CardFace: React.FC<CardFaceProps> = ({ theme, isFlipped, onFlip }) => {
  // Dynamic Icon Component Helper
  const Icon = ({ name, className }: { name: string; className?: string }) => {
    const LucideIcon = (LucideIcons as any)[name] || LucideIcons.Star;
    return <LucideIcon className={className} />;
  };

  return (
    <div className="relative w-full max-w-md aspect-[3/4] cursor-pointer group perspective-1000" onClick={onFlip}>
      <motion.div
        className={`relative w-full h-full transition-all duration-700 transform-style-3d shadow-2xl rounded-3xl ${theme.colors.cardBg} border-4 ${theme.colors.border}`}
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
      >
        {/* FRONT FACE */}
        <div className="absolute w-full h-full backface-hidden p-6 flex flex-col justify-between">
          <div className="text-center mb-2">
            <h2 className={`text-2xl font-bold ${theme.fonts.heading} ${theme.colors.text} opacity-90`}>
              THE SENTENCE FINDER
            </h2>
            <p className={`text-sm opacity-60 ${theme.fonts.body} ${theme.colors.text}`}>Tap to flip for clues</p>
          </div>

          <div className="flex-1 flex flex-col gap-4 justify-center">
            {/* Step 1: Who */}
            <div className={`p-4 rounded-2xl border-2 flex items-center gap-4 transition-transform hover:scale-105 ${theme.colors.primary}`}>
              <div className="p-3 bg-white rounded-full shadow-sm">
                <Icon name={theme.icons.star} className="w-8 h-8 text-current" />
              </div>
              <div>
                <h3 className={`font-bold text-lg ${theme.fonts.heading}`}>STEP 1: THE STAR</h3>
                <p className={`text-sm ${theme.fonts.body}`}>Who is doing the job?</p>
              </div>
            </div>

            {/* Step 2: Action */}
            <div className={`p-4 rounded-2xl border-2 flex items-center gap-4 transition-transform hover:scale-105 ${theme.colors.secondary}`}>
              <div className="p-3 bg-white rounded-full shadow-sm">
                <Icon name={theme.icons.lightning} className="w-8 h-8 text-current" />
              </div>
              <div>
                <h3 className={`font-bold text-lg ${theme.fonts.heading}`}>STEP 2: POWER WORD</h3>
                <p className={`text-sm ${theme.fonts.body}`}>What did the star DO?</p>
              </div>
            </div>

            {/* Step 3: Detail */}
            <div className={`p-4 rounded-2xl border-2 flex items-center gap-4 transition-transform hover:scale-105 ${theme.colors.tertiary}`}>
              <div className="p-3 bg-white rounded-full shadow-sm">
                <Icon name={theme.icons.puzzle} className="w-8 h-8 text-current" />
              </div>
              <div>
                <h3 className={`font-bold text-lg ${theme.fonts.heading}`}>STEP 3: JUICY DETAIL</h3>
                <p className={`text-sm ${theme.fonts.body}`}>Where? When? How?</p>
              </div>
            </div>
          </div>
          
          <div className="mt-4 text-center">
             <span className={`text-xs font-bold px-3 py-1 rounded-full ${theme.colors.text} bg-slate-100`}>
                KEYWORD DETECTIVE CARD
             </span>
          </div>
        </div>

        {/* BACK FACE */}
        <div className="absolute w-full h-full backface-hidden rotate-y-180 p-6 flex flex-col bg-slate-50 rounded-3xl overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-400 via-red-400 to-green-400"></div>
            
            <div className="text-center mb-4 mt-2">
                <h2 className={`text-xl font-bold ${theme.fonts.heading} ${theme.colors.text}`}>THE 6 CLUE TYPES</h2>
            </div>

            <div className="flex-1 overflow-y-auto space-y-3 pr-1 scrollbar-thin">
                {/* WHO CLUES */}
                <div className={`p-3 rounded-xl border-l-4 ${theme.colors.primary.replace('text-', 'border-').split(' ')[0]} bg-white shadow-sm`}>
                    <div className="flex items-center gap-2 mb-2">
                         <Icon name={theme.icons.star} className="w-5 h-5" />
                         <h4 className="font-bold text-sm">WHO CLUES (Nouns)</h4>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                        <span className="bg-slate-100 p-1 rounded px-2">👤 People</span>
                        <span className="bg-slate-100 p-1 rounded px-2">🐶 Animals</span>
                        <span className="bg-slate-100 p-1 rounded px-2">🧸 Characters</span>
                        <span className="bg-slate-100 p-1 rounded px-2">📦 Objects</span>
                    </div>
                </div>

                {/* ACTION CLUES */}
                <div className={`p-3 rounded-xl border-l-4 ${theme.colors.secondary.replace('text-', 'border-').split(' ')[0]} bg-white shadow-sm`}>
                    <div className="flex items-center gap-2 mb-2">
                         <Icon name={theme.icons.lightning} className="w-5 h-5" />
                         <h4 className="font-bold text-sm">ACTION CLUES (Verbs)</h4>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                        <span className="bg-slate-100 p-1 rounded px-2">🏃 Movement</span>
                        <span className="bg-slate-100 p-1 rounded px-2">🗣 Talking</span>
                        <span className="bg-slate-100 p-1 rounded px-2">❤️ Feeling</span>
                        <span className="bg-slate-100 p-1 rounded px-2">⚙️ Thinking</span>
                    </div>
                </div>

                {/* DETAIL CLUES */}
                <div className={`p-3 rounded-xl border-l-4 ${theme.colors.tertiary.replace('text-', 'border-').split(' ')[0]} bg-white shadow-sm`}>
                    <div className="flex items-center gap-2 mb-2">
                         <Icon name={theme.icons.puzzle} className="w-5 h-5" />
                         <h4 className="font-bold text-sm">DETAIL CLUES</h4>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                        <span className="bg-slate-100 p-1 rounded px-2">📍 Place</span>
                        <span className="bg-slate-100 p-1 rounded px-2">⏰ Time</span>
                        <span className="bg-slate-100 p-1 rounded px-2">🎨 Describing</span>
                        <span className="bg-slate-100 p-1 rounded px-2">🤲 How</span>
                    </div>
                </div>
            </div>

            <div className="mt-4 pt-4 border-t text-center">
                 <p className={`text-xs ${theme.fonts.body} opacity-70`}>Use these clues to solve the sentence!</p>
            </div>
        </div>
      </motion.div>
    </div>
  );
};