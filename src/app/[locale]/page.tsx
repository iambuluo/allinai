import { useTranslations } from 'next-intl';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CategoryGrid from '@/components/CategoryGrid';
import SearchBar from '@/components/SearchBar';
import ToolCard from '@/components/ToolCard';
import { categories } from '@/data/categories';
import toolsData from '@/data/tools/zh.json';

// Re-export for static generation
export { generateStaticParams } from './layout';

// Get tool counts per category
function getToolCounts() {
  const counts: Record<string, number> = {};
  for (const cat of categories) {
    const tools = (toolsData as Record<string, any[]>)[cat.id];
    counts[cat.id] = tools ? tools.length : 0;
  }
  return counts;
}

// Get featured tools (first few from popular categories)
function getFeaturedTools() {
  const featured: any[] = [];
  const popularCats = ['ai-chatbots', 'ai-writing-tools', 'ai-image-tools', 'ai-programming-tools'];
  for (const catId of popularCats) {
    const tools = (toolsData as Record<string, any[]>)[catId];
    if (tools) {
      featured.push(...tools.slice(0, 3));
    }
  }
  return featured.slice(0, 12);
}

export default function HomePage() {
  const t = useTranslations();
  const counts = getToolCounts();
  const featured = getFeaturedTools();
  const totalTools = Object.values(counts).reduce((a, b) => a + b, 0);

  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-indigo-50 dark:from-slate-900 dark:via-slate-900 dark:to-primary-950" />
          <div className="absolute inset-0">
            <div className="absolute top-20 left-10 w-72 h-72 bg-primary-200/30 dark:bg-primary-800/10 rounded-full blur-3xl" />
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-200/30 dark:bg-indigo-800/10 rounded-full blur-3xl" />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-6">
                {t('home.hero_title')}
              </h1>
              <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto">
                {t('home.hero_subtitle')}
              </p>
              <div className="mb-4">
                <SearchBar placeholder={t('home.search_placeholder')} />
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {totalTools}+ {t('home.tool_count')}
              </p>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-8">
            {t('home.popular_categories')}
          </h2>
          <CategoryGrid showCount={counts} />
        </section>

        {/* Featured Tools Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-8">
            {t('home.featured_tools')}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {featured.map((tool, i) => (
              <ToolCard
                key={`${tool.id}-${i}`}
                name={tool.name}
                url={tool.url}
                description={tool.description}
                icon={tool.icon}
              />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
