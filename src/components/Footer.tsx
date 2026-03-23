import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations();

  return (
    <footer className="mt-auto border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2">
            <span className="text-xl">🤖</span>
            <span className="text-lg font-bold gradient-text">AllInAI</span>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400 text-center">
            {t('footer.disclaimer')}
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {t('footer.copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
}
