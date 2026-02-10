'use client';

import React, { createContext, useContext } from 'react';
import { Locale, getTranslation, getDirection } from '@/lib/i18n';

interface LanguageContextType {
  locale: Locale;
  isArabic: boolean;
  t: (key: string) => string;
  dir: 'ltr' | 'rtl';
}

const LanguageContext = createContext<LanguageContextType>({
  locale: 'en',
  isArabic: false,
  t: (key: string) => key,
  dir: 'ltr',
});

export const useLanguage = () => useContext(LanguageContext);

export function LanguageProvider({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  const { t, isArabic } = getTranslation(locale);
  const dir = getDirection(locale);

  return (
    <LanguageContext.Provider value={{ locale, isArabic, t, dir }}>
      {children}
    </LanguageContext.Provider>
  );
}
