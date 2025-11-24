import React, { useState, useEffect } from 'react';
import { Theme, ToolType } from '../types';
import { generatePracticeSentence, checkSentenceAnalysis } from '../services/geminiService';
import * as LucideIcons from 'lucide-react';

interface PracticeModeProps {
  theme: Theme;
}

export const PracticeMode: React.FC<PracticeModeProps> = ({ theme }) => {
  const [sentence, setSentence] = useState<string>("");
  const [words, setWords] = useState<{ text: string; type: ToolType | null; id: number }[]>([]);
  const [selectedTool, setSelectedTool] = useState<ToolType>(ToolType.WHO);
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState<{ correct: boolean; message: string } | null>(null);

  const Icon = ({ name, className }: { name: string; className?: string }) => {
    const LucideIcon = (LucideIcons as any)[name] || LucideIcons.Star;
    return <LucideIcon className={className} />;
  };

  useEffect(() => {
    handleNewSentence();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleNewSentence = async () => {
    setIsLoading(true);
    setFeedback(null);
    const newText = await generatePracticeSentence();
    setSentence(newText);
    // Split by space but preserve punctuation attached to words for simplicity in this demo
    // A better parser would separate punctuation.
    const wordList = newText.split(' ').map((word, idx) => ({
      text: word,
      type: null,
      id: idx,
    }));
    setWords(wordList);
    setIsLoading(false);
  };

  const handleWordClick = (id: number) => {
    if (feedback?.correct) return; // Disable editing if already correct

    setWords((prev) =>
      prev.map((w) => {
        if (w.id === id) {
          if (selectedTool === ToolType.ERASER) {
            return { ...w, type: null };
          }
          return { ...w, type: selectedTool };
        }
        return w;
      })
    );
  };

  const handleCheck = async () => {
    setIsLoading(true);
    
    const whoParts = words.filter(w => w.type === ToolType.WHO).map(w => w.text);
    const actionParts = words.filter(w => w.type === ToolType.ACTION).map(w => w.text);
    const detailParts = words.filter(w => w.type === ToolType.DETAIL).map(w => w.text);

    const result = await checkSentenceAnalysis(sentence, whoParts, actionParts, detailParts);
    
    setFeedback({
      correct: result.correct,
      message: result.feedback
    });
    setIsLoading(false);
  };

  const getWordStyle = (type: ToolType | null) => {
    if (!type) return 'bg-transparent border-transparent';
    switch (type) {
      case ToolType.WHO: return `${theme.colors.primary} shadow-sm scale-105 transform`;
      case ToolType.ACTION: return `${theme.colors.secondary} shadow-sm scale-105 transform`;
      case ToolType.DETAIL: return `${theme.colors.tertiary} shadow-sm scale-105 transform`;
      default: return '';
    }
  };

  return (
    <div className={`w-full max-w-2xl mx-auto p-6 rounded-3xl ${theme.colors.cardBg} border-4 ${theme.colors.border} shadow-xl`}>
      <div className="flex justify-between items-center mb-6">
        <h2 className={`text-2xl font-bold ${theme.fonts.heading} ${theme.colors.text}`}>DETECTIVE TRAINING</h2>
        <button 
          onClick={handleNewSentence}
          disabled={isLoading}
          className="px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors text-sm font-bold disabled:opacity-50"
        >
          {isLoading ? 'Loading...' : 'New Case'}
        </button>
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap gap-2 justify-center mb-8 bg-slate-100 p-2 rounded-xl">
        <button
          onClick={() => setSelectedTool(ToolType.WHO)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${selectedTool === ToolType.WHO ? 'bg-white shadow-md ring-2 ring-blue-400 scale-105' : 'opacity-60 hover:opacity-100'}`}
        >
          <div className="text-blue-500"><Icon name={theme.icons.star} className="w-5 h-5" /></div>
          <span className={`font-bold text-slate-700 ${theme.fonts.heading}`}>WHO</span>
        </button>

        <button
          onClick={() => setSelectedTool(ToolType.ACTION)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${selectedTool === ToolType.ACTION ? 'bg-white shadow-md ring-2 ring-red-400 scale-105' : 'opacity-60 hover:opacity-100'}`}
        >
          <div className="text-red-500"><Icon name={theme.icons.lightning} className="w-5 h-5" /></div>
          <span className={`font-bold text-slate-700 ${theme.fonts.heading}`}>ACTION</span>
        </button>

        <button
          onClick={() => setSelectedTool(ToolType.DETAIL)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${selectedTool === ToolType.DETAIL ? 'bg-white shadow-md ring-2 ring-green-400 scale-105' : 'opacity-60 hover:opacity-100'}`}
        >
          <div className="text-green-500"><Icon name={theme.icons.puzzle} className="w-5 h-5" /></div>
          <span className={`font-bold text-slate-700 ${theme.fonts.heading}`}>DETAIL</span>
        </button>

        <div className="w-px h-8 bg-slate-300 mx-2"></div>

        <button
          onClick={() => setSelectedTool(ToolType.ERASER)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${selectedTool === ToolType.ERASER ? 'bg-white shadow-md ring-2 ring-slate-400 scale-105' : 'opacity-60 hover:opacity-100'}`}
        >
          <div className="text-slate-500"><LucideIcons.Eraser className="w-5 h-5" /></div>
        </button>
      </div>

      {/* Sentence Area */}
      <div className="mb-8 p-8 bg-slate-50 rounded-xl border-2 border-dashed border-slate-300 min-h-[120px] flex flex-wrap gap-3 items-center content-center justify-center">
        {isLoading && words.length === 0 ? (
             <div className="animate-pulse flex gap-2">
                 <div className="h-8 w-16 bg-slate-200 rounded"></div>
                 <div className="h-8 w-24 bg-slate-200 rounded"></div>
                 <div className="h-8 w-12 bg-slate-200 rounded"></div>
             </div>
        ) : (
            words.map((word) => (
            <span
                key={word.id}
                onClick={() => handleWordClick(word.id)}
                className={`cursor-pointer px-3 py-1.5 rounded-lg border-2 text-xl font-medium transition-all duration-200 select-none ${getWordStyle(word.type)} hover:bg-white hover:shadow-md`}
            >
                {word.text}
            </span>
            ))
        )}
      </div>

      {/* Controls */}
      <div className="text-center">
        {!feedback ? (
             <button
                onClick={handleCheck}
                disabled={isLoading || words.length === 0}
                className={`w-full md:w-auto px-8 py-3 rounded-xl font-bold text-lg text-white shadow-lg transition-transform active:scale-95 ${isLoading ? 'bg-slate-400' : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:shadow-blue-500/30'}`}
             >
               {isLoading ? 'Checking...' : 'CHECK MY CLUES'}
             </button>
        ) : (
            <div className={`p-4 rounded-xl animate-[fadeIn_0.5s_ease-out] ${feedback.correct ? 'bg-green-100 border-green-300 text-green-800' : 'bg-amber-100 border-amber-300 text-amber-900'}`}>
                <div className="flex items-center justify-center gap-2 mb-2">
                    {feedback.correct ? (
                        <LucideIcons.CheckCircle2 className="w-6 h-6 text-green-600" />
                    ) : (
                        <LucideIcons.HelpCircle className="w-6 h-6 text-amber-600" />
                    )}
                    <h3 className="font-bold text-lg">{feedback.correct ? 'CASE SOLVED!' : 'GOOD TRY!'}</h3>
                </div>
                <p className="text-md">{feedback.message}</p>
                <button 
                    onClick={handleNewSentence}
                    className="mt-4 text-sm font-bold underline opacity-80 hover:opacity-100"
                >
                    Try Another Sentence
                </button>
            </div>
        )}
      </div>
    </div>
  );
};