'use client';

import { useLanguage } from './LanguageProvider';

/**
 * Navbar language toggle – shows "ع" when in English, "EN" when in Arabic.
 * Used in both mobile and desktop headers.
 */
export function NavLangToggle({ className = '' }: { className?: string }) {
  const { isArabic, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className={`cursor-pointer leading-none notranslate ${className}`}
      aria-label={isArabic ? 'Switch to English' : 'Switch to Arabic'}
    >
      {isArabic ? (
        <span className="font-serif tracking-[0.1em]">EN</span>
      ) : (
        <span className="font-arabic">ع</span>
      )}
    </button>
  );
}

/**
 * Sidebar menu language toggle – shows EN | AR with active highlighting.
 */
export function SidebarLangToggle() {
  const { isArabic, setArabic, setEnglish } = useLanguage();

  return (
    <div className="pt-8 border-t border-[#191817]/10">
      <div className="flex gap-4 notranslate">
        <button
          onClick={setEnglish}
          className={`font-serif text-[16px] sm:text-[18px] transition-colors ${
            !isArabic
              ? 'text-[#191817] font-medium'
              : 'text-[#191817]/50 hover:text-[#191817]'
          }`}
        >
          EN
        </button>
        <span className="text-[#191817]/30">|</span>
        <button
          onClick={setArabic}
          className={`font-serif text-[16px] sm:text-[18px] transition-colors ${
            isArabic
              ? 'text-[#191817] font-medium'
              : 'text-[#191817]/50 hover:text-[#191817]'
          }`}
        >
          AR
        </button>
      </div>
    </div>
  );
}
