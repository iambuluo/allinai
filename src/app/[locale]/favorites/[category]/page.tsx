import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ToolCard from '@/components/ToolCard';
import { categories } from '@/data/categories';
import toolsData from '@/data/tools/zh.json';

export function generateStaticParams() {
  return categories.map((cat) => ({ category: cat.id }));
}

export default async function CategoryPage({
  params,
}: {
  params: { locale: string; category: string };
}) {
  const { locale, category } = await params;
  const t = await getTranslations();

  // Validate category
  const cat = categories.find((c) => c.id === category);
  if (!cat) {
    notFound();
  }

  const tools = (toolsData as Record<string, any[]>)[category] || [];

  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Category Header */}
        <section className="bg-gradient-to-br from-primary-50 to-indigo-50 dark:from-slate-800 dark:to-slate-900 border-b border-slate-200 dark:border-slate-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex items-center space-x-4">
              <span className="text-5xl">{cat.icon}</span>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
                  {t(`categories.${category}`)}
                </h1>
                <p className="text-slate-600 dark:text-slate-300 mt-2">
                  {tools.length} {t('category.tools_count')} · {t('category.description')}
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar - Other Categories */}
            <aside className="lg:w-64 flex-shrink-0">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                {t('home.popular_categories')}
              </h3>
              <div className="space-y-2">
                {categories.map((c) => (
                  <a
                    key={c.id}
                    href={`/${locale}/favorites/${c.id}`}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                      c.id === category
                        ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 font-medium'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <span>{c.icon}</span>
                    <span>{t(`categories.${c.id}`)}</span>
                  </a>
                ))}
              </div>
            </aside>

            {/* Main Content - Tools Grid */}
            <div className="flex-1">
              {tools.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                  {tools.map((tool, i) => (
                    <ToolCard
                      key={`${tool.id}-${i}`}
                      name={tool.name}
                      url={tool.url}
                      description={tool.description}
                      icon={tool.icon}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <span className="text-6xl mb-4 block">🔍</span>
                  <p className="text-lg text-slate-500 dark:text-slate-400">
                    {t('category.no_tools')}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
