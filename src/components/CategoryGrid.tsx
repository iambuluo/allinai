import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { categories } from '@/data/categories';

interface CategoryGridProps {
  showCount?: Record<string, number>;
}

export default function CategoryGrid({ showCount }: CategoryGridProps) {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {categories.map((cat) => {
        const count = showCount?.[cat.id] || 0;
        return (
          <Link
            key={cat.id}
            href={`/${locale}/favorites/${cat.id}`}
            className="group relative overflow-hidden rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-4 card-hover hover:border-primary-300 dark:hover:border-primary-600"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-0 group-hover:opacity-5 transition-opacity`} />
            <div className="relative">
              <span className="text-3xl">{cat.icon}</span>
              <h3 className="mt-2 font-semibold text-sm text-slate-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-2">
                {t(`categories.${cat.id}`)}
              </h3>
              {count > 0 && (
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  {count} {t('home.tool_count')}
                </p>
              )}
            </div>
          </Link>
        );
      })}
    </div>
  );
}
