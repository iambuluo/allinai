import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['zh', 'en', 'ja', 'ko', 'es'],
  defaultLocale: 'zh',
  localeDetection: true,
});
