import { Theme, ThemeId } from './types';

export const THEMES: Record<ThemeId, Theme> = {
  classroom: {
    id: 'classroom',
    name: 'Classroom Pro',
    description: 'Clean, clear, and perfect for focus.',
    fonts: {
      heading: 'font-sans',
      body: 'font-sans',
    },
    colors: {
      background: 'bg-slate-100',
      cardBg: 'bg-white',
      text: 'text-slate-800',
      primary: 'text-blue-600 bg-blue-50 border-blue-200',
      secondary: 'text-red-600 bg-red-50 border-red-200',
      tertiary: 'text-green-600 bg-green-50 border-green-200',
      border: 'border-slate-200',
    },
    icons: {
      star: 'Star',
      lightning: 'Zap',
      puzzle: 'Puzzle',
    },
  },
  cute: {
    id: 'cute',
    name: 'Playful Explorer',
    description: 'Friendly colors and rounded fonts.',
    fonts: {
      heading: 'font-comic',
      body: 'font-comic',
    },
    colors: {
      background: 'bg-pink-50',
      cardBg: 'bg-white',
      text: 'text-slate-700',
      primary: 'text-sky-500 bg-sky-50 border-sky-200',
      secondary: 'text-rose-500 bg-rose-50 border-rose-200',
      tertiary: 'text-emerald-500 bg-emerald-50 border-emerald-200',
      border: 'border-pink-100',
    },
    icons: {
      star: 'Sparkles',
      lightning: 'Zap',
      puzzle: 'Cookie',
    },
  },
  detective: {
    id: 'detective',
    name: 'Secret Agent',
    description: 'High contrast dark mode for serious sleuthing.',
    fonts: {
      heading: 'font-mono',
      body: 'font-mono',
    },
    colors: {
      background: 'bg-slate-900',
      cardBg: 'bg-slate-800',
      text: 'text-slate-100',
      primary: 'text-cyan-400 bg-cyan-900/30 border-cyan-700',
      secondary: 'text-yellow-400 bg-yellow-900/30 border-yellow-700',
      tertiary: 'text-lime-400 bg-lime-900/30 border-lime-700',
      border: 'border-slate-700',
    },
    icons: {
      star: 'Search',
      lightning: 'Zap',
      puzzle: 'Map',
    },
  },
  minimal: {
    id: 'minimal',
    name: 'Focus Mode',
    description: 'Black and white, zero distractions.',
    fonts: {
      heading: 'font-sans',
      body: 'font-serif',
    },
    colors: {
      background: 'bg-white',
      cardBg: 'bg-white',
      text: 'text-black',
      primary: 'text-black bg-gray-100 border-black',
      secondary: 'text-black bg-gray-100 border-black',
      tertiary: 'text-black bg-gray-100 border-black',
      border: 'border-black',
    },
    icons: {
      star: 'Circle',
      lightning: 'Triangle',
      puzzle: 'Square',
    },
  },
};