import en from '@/locales/en.json';
import ar from '@/locales/ar.json';

export const locales = ['en', 'ar'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

// Use a permissive record type for dictionaries because imported JSON
// modules can produce distinct anonymous types that are incompatible
// with each other. We only need an indexable dictionary at runtime.
const dictionaries: Record<Locale, Record<string, unknown>> = { en, ar };

export function getDictionary(locale: Locale) {
  return dictionaries[locale] ?? dictionaries.en;
}

/**
 * Get a nested value from a dictionary using dot notation
 * e.g. t('home.heroTitle1') => dictionary.home.heroTitle1
 */
export function getTranslation(locale: Locale) {
  const dict = getDictionary(locale);

  function t(key: string): string {
    const keys = key.split('.');
    let value: unknown = dict;
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = (value as Record<string, unknown>)[k];
      } else {
        // Fallback to English
        let fallback: unknown = dictionaries.en;
        for (const fk of keys) {
          if (fallback && typeof fallback === 'object' && fk in fallback) {
            fallback = (fallback as Record<string, unknown>)[fk];
          } else {
            return key; // Return key if not found
          }
        }
        return typeof fallback === 'string' ? fallback : key;
      }
    }
    return typeof value === 'string' ? value : key;
  }

  return { t, dict, locale, isArabic: locale === 'ar' };
}

/**
 * Determine direction based on locale
 */
export function getDirection(locale: Locale): 'ltr' | 'rtl' {
  return locale === 'ar' ? 'rtl' : 'ltr';
}

/**
 * Build a path with locale prefix
 */
export function localePath(locale: Locale, path: string) {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `/${locale}${cleanPath}`;
}
