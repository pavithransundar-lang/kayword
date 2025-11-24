export type ThemeId = 'classroom' | 'cute' | 'detective' | 'minimal';

export interface Theme {
  id: ThemeId;
  name: string;
  description: string;
  fonts: {
    heading: string;
    body: string;
  };
  colors: {
    background: string;
    cardBg: string;
    text: string;
    primary: string; // Who/Star
    secondary: string; // Action/Lightning
    tertiary: string; // Detail/Puzzle
    border: string;
  };
  icons: {
    star: string;
    lightning: string;
    puzzle: string;
  };
}

export interface SentencePart {
  id: string;
  text: string;
  type: 'who' | 'action' | 'detail' | 'none';
}

export interface PracticeSentence {
  text: string;
  difficulty: string;
}

export interface AnalysisResult {
  correct: boolean;
  feedback: string;
}

export enum ToolType {
  WHO = 'who',
  ACTION = 'action',
  DETAIL = 'detail',
  ERASER = 'eraser'
}