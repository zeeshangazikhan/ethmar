'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

interface LanguageContextType {
  isArabic: boolean;
  toggleLanguage: () => void;
  setArabic: () => void;
  setEnglish: () => void;
}

const LanguageContext = createContext<LanguageContextType>({
  isArabic: false,
  toggleLanguage: () => {},
  setArabic: () => {},
  setEnglish: () => {},
});

export const useLanguage = () => useContext(LanguageContext);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [isArabic, setIsArabic] = useState(false);

  // On mount, read cookie to determine current language
  useEffect(() => {
    if (document.cookie.includes('googtrans=/en/ar')) {
      setIsArabic(true);
      document.documentElement.dir = 'rtl';
      document.documentElement.lang = 'ar';
      document.documentElement.classList.add('translated-rtl');
    }
  }, []);

  const switchTo = useCallback((lang: 'en' | 'ar') => {
    const hostname = window.location.hostname;
    if (lang === 'en') {
      // Clear translation cookies
      document.cookie = 'googtrans=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/';
      document.cookie = `googtrans=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;domain=.${hostname}`;
      document.cookie = `googtrans=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;domain=${hostname}`;
    } else {
      // Set Arabic translation cookie
      document.cookie = `googtrans=/en/ar;path=/`;
      document.cookie = `googtrans=/en/ar;path=/;domain=.${hostname}`;
    }
    window.location.reload();
  }, []);

  const setArabic = useCallback(() => {
    if (!isArabic) switchTo('ar');
  }, [isArabic, switchTo]);

  const setEnglish = useCallback(() => {
    if (isArabic) switchTo('en');
  }, [isArabic, switchTo]);

  const toggleLanguage = useCallback(() => {
    switchTo(isArabic ? 'en' : 'ar');
  }, [isArabic, switchTo]);

  return (
    <LanguageContext.Provider value={{ isArabic, toggleLanguage, setArabic, setEnglish }}>
      {children}
    </LanguageContext.Provider>
  );
}
