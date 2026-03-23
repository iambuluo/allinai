export interface Tool {
  id: string;
  name: string;
  url: string;
  description: string;
  icon: string;
}

export interface Category {
  id: string;
  icon: string;
  color: string;
}

export const categories: Category[] = [
  { id: 'ai-writing-tools', icon: '✍️', color: 'from-blue-500 to-indigo-600' },
  { id: 'ai-image-tools', icon: '🎨', color: 'from-pink-500 to-rose-600' },
  { id: 'ai-video-tools', icon: '🎬', color: 'from-purple-500 to-violet-600' },
  { id: 'ai-office-tools', icon: '📊', color: 'from-green-500 to-emerald-600' },
  { id: 'ai-agent', icon: '🤖', color: 'from-cyan-500 to-teal-600' },
  { id: 'ai-chatbots', icon: '💬', color: 'from-orange-500 to-amber-600' },
  { id: 'ai-programming-tools', icon: '💻', color: 'from-slate-500 to-gray-700' },
  { id: 'ai-design-tools', icon: '🎯', color: 'from-fuchsia-500 to-pink-600' },
  { id: 'ai-audio-tools', icon: '🎵', color: 'from-red-500 to-rose-600' },
  { id: 'ai-search-engines', icon: '🔍', color: 'from-yellow-500 to-orange-600' },
  { id: 'ai-frameworks', icon: '⚙️', color: 'from-indigo-500 to-blue-600' },
  { id: 'websites-to-learn-ai', icon: '📚', color: 'from-teal-500 to-cyan-600' },
  { id: 'ai-models', icon: '🧠', color: 'from-violet-500 to-purple-600' },
  { id: 'ai-content-detection-and-optimization-tools', icon: '🔎', color: 'from-emerald-500 to-green-600' },
  { id: 'ai-prompt-tools', icon: '💡', color: 'from-amber-500 to-yellow-600' },
];

export const localeNames: Record<string, string> = {
  zh: '中文',
  en: 'English',
  ja: '日本語',
  ko: '한국어',
  es: 'Español',
};

export const localeFlags: Record<string, string> = {
  zh: '🇨🇳',
  en: '🇺🇸',
  ja: '🇯🇵',
  ko: '🇰🇷',
  es: '🇪🇸',
};
