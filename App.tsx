import React, { useState } from 'react';
import { CardFace } from './components/CardFace';
import { PracticeMode } from './components/PracticeMode';
import { THEMES } from './constants';
import { ThemeId } from './types';
import { Printer, Sparkles, BookOpen, User, Eye } from 'lucide-react';

const App: React.FC = () => {
  const [currentThemeId, setCurrentThemeId] = useState<ThemeId>('classroom');
  const [isCardFlipped, setIsCardFlipped] = useState(false);

  const currentTheme = THEMES[currentThemeId];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 ${currentTheme.colors.background} ${currentTheme.colors.text} ${currentTheme.fonts.body}`}>
      
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-slate-200 shadow-sm p-4 no-print">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-slate-900 text-white p-2 rounded-lg">
              <Sparkles className="w-5 h-5" />
            </div>
            <h1 className={`text-xl md:text-2xl font-bold ${currentTheme.fonts.heading}`}>
              Keyword Detective
            </h1>
          </div>

          {/* Theme Switcher */}
          <div className="flex bg-slate-100 p-1 rounded-lg overflow-x-auto max-w-full">
             {(Object.keys(THEMES) as ThemeId[]).map((id) => (
               <button
                 key={id}
                 onClick={() => setCurrentThemeId(id)}
                 className={`px-3 py-1.5 rounded-md text-xs font-bold whitespace-nowrap transition-all ${
                   currentThemeId === id 
                     ? 'bg-white shadow-sm text-slate-900' 
                     : 'text-slate-500 hover:text-slate-700'
                 }`}
               >
                 {THEMES[id].name}
               </button>
             ))}
          </div>

          <button onClick={handlePrint} className="p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors" title="Print Card">
            <Printer className="w-5 h-5" />
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Left Column: The Card (Sticky on Desktop) */}
          <div className="flex flex-col items-center lg:sticky lg:top-24">
             <div className="mb-4 flex items-center gap-2 text-sm font-bold opacity-60 no-print">
                <BookOpen className="w-4 h-4" />
                <span>YOUR TOOLKIT</span>
             </div>
             
             <CardFace 
                theme={currentTheme} 
                isFlipped={isCardFlipped} 
                onFlip={() => setIsCardFlipped(!isCardFlipped)} 
             />

             <div className="mt-8 text-center max-w-xs opacity-70 text-sm no-print">
                <p>Designed based on Science of Reading principles to reduce cognitive load.</p>
             </div>
          </div>

          {/* Right Column: Practice Area */}
          <div className="no-print">
             <div className="mb-4 flex items-center gap-2 text-sm font-bold opacity-60">
                <Eye className="w-4 h-4" />
                <span>TRAINING ROOM</span>
             </div>
             <PracticeMode theme={currentTheme} />

             {/* Instructions Footer */}
             <div className="mt-12 p-6 bg-white/50 rounded-2xl border border-slate-200">
                <h3 className={`font-bold mb-2 ${currentTheme.fonts.heading}`}>How to use this studio:</h3>
                <ul className="list-disc list-inside space-y-2 text-sm opacity-80">
                   <li><strong>Study the Card:</strong> Click the card on the left to flip it. Learn the symbols.</li>
                   <li><strong>Generate Sentences:</strong> Click "New Case" to get a fresh sentence from our AI.</li>
                   <li><strong>Mark the Clues:</strong> Select a tool (Who, Action, Detail) and click the words in the sentence.</li>
                   <li><strong>Check Your Work:</strong> The AI Detective will verify if you found the right parts!</li>
                </ul>
             </div>
          </div>
        </div>
      </main>
      
      {/* Print Only Footer */}
      <div className="print-only fixed bottom-0 w-full text-center p-4 text-xs text-slate-400">
        Generatd by Keyword Detective Studio
      </div>
    </div>
  );
};

export default App;