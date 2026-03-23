'use client';

import { useTranslations } from 'next-intl';

interface ToolCardProps {
  name: string;
  url: string;
  description: string;
  icon: string;
}

export default function ToolCard({ name, url, description, icon }: ToolCardProps) {
  const t = useTranslations('tool');

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4 card-hover hover:border-primary-300 dark:hover:border-primary-600"
    >
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900 dark:to-primary-800 flex items-center justify-center text-lg overflow-hidden">
          {icon ? (
            <img
              src={icon}
              alt={name}
              className="w-6 h-6 rounded"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
                (e.target as HTMLImageElement).parentElement!.textContent = '🤖';
              }}
            />
          ) : (
            '🤖'
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-slate-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors truncate">
            {name}
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
            {description}
          </p>
        </div>
        <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="inline-flex items-center px-2 py-1 rounded-md bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-xs font-medium">
            {t('visit')} →
          </span>
        </div>
      </div>
    </a>
  );
}
