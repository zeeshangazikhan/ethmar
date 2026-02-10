'use client';

import { useLanguage } from './LanguageProvider';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

/**
 * Navbar language toggle – shows "ع" when in English, "EN" when in Arabic.
 * Navigates to the same page in the other locale.
 */
export function NavLangToggle({ className = '' }: { className?: string }) {
  const { locale, isArabic, t } = useLanguage();
  const pathname = usePathname();

  const otherLocale = locale === 'en' ? 'ar' : 'en';
  // Replace /en/ or /ar/ at the start of the path
  const newPath = pathname.replace(`/${locale}`, `/${otherLocale}`) || `/${otherLocale}`;

  return (
    <Link
      href={newPath}
      className={`cursor-pointer leading-none ${className}`}
      aria-label={isArabic ? t('common.switchToEnglish') : t('common.switchToArabic')}
    >
      {isArabic ? (
        <span className="font-serif tracking-[0.1em]">EN</span>
      ) : (
        <span className="font-arabic">ع</span>
      )}
    </Link>
  );
}

/**
 * Sidebar menu language toggle – shows EN | AR with active highlighting.
 * Navigates to the same page in the selected locale.
 */
export function SidebarLangToggle() {
  const { locale, isArabic } = useLanguage();
  const pathname = usePathname();

  const enPath = pathname.replace(`/${locale}`, '/en') || '/en';
  const arPath = pathname.replace(`/${locale}`, '/ar') || '/ar';

  return (
    <div className="pt-8 border-t border-[#191817]/10">
      <div className="flex gap-4">
        <Link
          href={enPath}
          className={`font-serif text-[16px] sm:text-[18px] transition-colors ${
            !isArabic
              ? 'text-[#191817] font-medium'
              : 'text-[#191817]/50 hover:text-[#191817]'
          }`}
        >
          EN
        </Link>
        <span className="text-[#191817]/30">|</span>
        <Link
          href={arPath}
          className={`font-serif text-[16px] sm:text-[18px] transition-colors ${
            isArabic
              ? 'text-[#191817] font-medium'
              : 'text-[#191817]/50 hover:text-[#191817]'
          }`}
        >
          AR
        </Link>
      </div>
    </div>
  );
}
