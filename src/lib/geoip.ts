// IP to locale mapping based on country codes
const COUNTRY_LOCALE_MAP: Record<string, string> = {
  // Chinese-speaking regions
  CN: 'zh', TW: 'zh', HK: 'zh', MO: 'zh', SG: 'zh',
  // Japan
  JP: 'ja',
  // Korea
  KR: 'ko',
  // Spanish-speaking regions
  ES: 'es', MX: 'es', AR: 'es', CO: 'es', CL: 'es', PE: 'es',
  VE: 'es', EC: 'es', GT: 'es', CU: 'es', BO: 'es', DO: 'es',
  HN: 'es', PY: 'es', SV: 'es', NI: 'es', CR: 'es', PA: 'es',
  UY: 'es', PR: 'es', GQ: 'es',
};

export function getLocaleFromIP(ip: string): string | null {
  // For localhost / private IPs, return null (use default)
  if (!ip || ip === '::1' || ip === '127.0.0.1' || ip.startsWith('192.168.') || ip.startsWith('10.')) {
    return null;
  }

  // Try to extract country from IP using a free GeoIP API
  // This is called server-side only
  return null; // Will be handled by the middleware
}

export function getLocaleFromHeaders(acceptLanguage: string | null): string | null {
  if (!acceptLanguage) return null;

  const localeMap: Record<string, string> = {
    'zh': 'zh', 'zh-cn': 'zh', 'zh-tw': 'zh', 'zh-hk': 'zh',
    'ja': 'ja', 'ja-jp': 'ja',
    'ko': 'ko', 'ko-kr': 'ko',
    'es': 'es', 'es-es': 'es', 'es-mx': 'es',
    'en': 'en', 'en-us': 'en', 'en-gb': 'en',
  };

  const langs = acceptLanguage.split(',').map(l => l.split(';')[0].trim().toLowerCase());
  for (const lang of langs) {
    if (localeMap[lang]) return localeMap[lang];
  }

  // Check prefix match
  for (const lang of langs) {
    const prefix = lang.split('-')[0];
    if (localeMap[prefix]) return localeMap[prefix];
  }

  return null;
}
