export type CmsSlide = {
  id: number;
  img: string;
  title: string;
  description: string;
  alt: string;
};

export type CmsSectorItem = {
  id: number;
  img: string;
  title: string;
  alt: string;
};

export type CmsPartnerLogo = {
  id: number;
  name: string;
  logo: string;
  websiteUrl: string;
};

export type HomepageCmsData = {
  hero: {
    titleLine1: string;
    titleLine2: string;
    titleLine3: string;
    ctaLabel: string;
    ctaUrl: string;
    image: string;
    alt: string;
  };
  legacySection: {
    headingLine1: string;
    headingLine2: string;
    description: string;
    image: string;
    alt: string;
    ctaLabel: string;
    ctaUrl: string;
  };
  globalHeadingLine1: string;
  globalHeadingLine2: string;
  globalSlides: CmsSlide[];
  sectorsHeadingLine1: string;
  sectorsHeadingLine2: string;
  featuredSector: {
    title: string;
    description: string;
    image: string;
    alt: string;
    ctaLabel: string;
    ctaUrl: string;
  };
  sectorsOfFocusHeading: string;
  sectorsOfFocusItems: CmsSectorItem[];
  partnershipHeading: string;
  partnerLogos: CmsPartnerLogo[];
  partnerCta: {
    title: string;
    description: string;
    buttonLabel: string;
    buttonUrl: string;
  };
};

import { getStaticHomepageData } from './homepage-static-data';

// =============================================================================
// CMS CONFIGURATION FLAG
// Set to false to use static data, true to use Strapi CMS
// When Strapi is back online, set this to true
// =============================================================================
export const USE_STRAPI_CMS = false;
// =============================================================================

const baseUrl = (process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337').replace(/\/$/, '');

const toAbsoluteUrl = (value: string, fallback: string) => {
  if (!value) return fallback;
  if (value.startsWith('http://') || value.startsWith('https://')) return value;
  if (value.startsWith('/')) return `${baseUrl}${value}`;
  return `${baseUrl}/${value}`;
};

const asText = (value: unknown, fallback = '') => {
  if (typeof value === 'string') return value;
  if (typeof value === 'number') return String(value);
  return fallback;
};

const pickMediaUrl = (media: any, pathFallback: string) => {
  const mediaUrl =
    media?.url ||
    media?.data?.url ||
    media?.data?.attributes?.url ||
    media?.attributes?.url ||
    '';

  if (mediaUrl) return toAbsoluteUrl(mediaUrl, pathFallback);
  return pathFallback;
};

const asArray = <T>(value: unknown): T[] => {
  if (Array.isArray(value)) return value as T[];
  return [];
};

export const fetchHomepageCms = async (locale: string): Promise<HomepageCmsData> => {
  // If CMS is disabled, return static data immediately
  if (!USE_STRAPI_CMS) {
    console.log('[Homepage] Using static data (CMS disabled)');
    return getStaticHomepageData(locale);
  }

  // Try to fetch from Strapi CMS
  try {
    const params = new URLSearchParams();
    params.set('locale', locale);
    params.set('populate[heroBanner][populate]', '*');
    params.set('populate[legacyBlock][populate]', '*');
    params.set('populate[globalPresenceCards][populate]', '*');
    params.set('populate[featuredSectorBlock][populate]', '*');
    params.set('populate[sectorsCards][populate]', '*');
    params.set('populate[partnershipLogos][populate]', '*');
    params.set('populate[finalCta][populate]', '*');

    const response = await fetch(`${baseUrl}/api/homepage?${params.toString()}`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`Homepage API failed (${response.status})`);
    }

    const payload = await response.json();
    const raw = payload?.data?.attributes || payload?.data;

    if (!raw) {
      throw new Error('Homepage not published yet');
    }

    const hero = raw.heroBanner || {};
    const legacySection = raw.legacyBlock || {};
    const featuredSector = raw.featuredSectorBlock || {};
    const partnerCta = raw.finalCta || {};

    const globalSlides = asArray<any>(raw.globalPresenceCards).map((slide, index) => ({
      id: Number(slide?.id || index + 1),
      img: pickMediaUrl(slide?.image, asText(slide?.defaultImage, '/assets/20.jpg')),
      title: asText(slide?.title),
      description: asText(slide?.description),
      alt: asText(slide?.imageAlt, asText(slide?.title)),
    }));

    const sectorsOfFocusItems = asArray<any>(raw.sectorsCards).map((item, index) => ({
      id: Number(item?.id || index + 1),
      img: pickMediaUrl(item?.image, asText(item?.defaultImage, '/assets/skyline.png')),
      title: asText(item?.title),
      alt: asText(item?.imageAlt, asText(item?.title)),
    }));

    const partnerLogos = asArray<any>(raw.partnershipLogos).map((logo, index) => ({
      id: Number(logo?.id || index + 1),
      name: asText(logo?.name),
      logo: pickMediaUrl(logo?.logo, asText(logo?.defaultImage, '/assets/gh-logo.png')),
      websiteUrl: asText(logo?.websiteUrl, '#'),
    }));

    return {
      hero: {
        titleLine1: asText(hero?.titleLine1),
        titleLine2: asText(hero?.titleLine2),
        titleLine3: asText(hero?.titleLine3),
        ctaLabel: asText(hero?.ctaLabel),
        ctaUrl: asText(hero?.ctaUrl, '#'),
        image: pickMediaUrl(hero?.heroImage, asText(hero?.defaultImage, '/assets/hero.jpg')),
        alt: asText(hero?.heroImageAlt),
      },
      legacySection: {
        headingLine1: asText(legacySection?.headingLine1),
        headingLine2: asText(legacySection?.headingLine2),
        description: asText(legacySection?.description),
        image: pickMediaUrl(legacySection?.image, asText(legacySection?.defaultImage, '/assets/horse.jpg')),
        alt: asText(legacySection?.imageAlt),
        ctaLabel: asText(legacySection?.ctaLabel),
        ctaUrl: asText(legacySection?.ctaUrl, '#'),
      },
      globalHeadingLine1: asText(raw.globalHeadingLine1),
      globalHeadingLine2: asText(raw.globalHeadingLine2),
      globalSlides,
      sectorsHeadingLine1: asText(raw.sectorsHeadingLine1),
      sectorsHeadingLine2: asText(raw.sectorsHeadingLine2),
      featuredSector: {
        title: asText(featuredSector?.title),
        description: asText(featuredSector?.description),
        image: pickMediaUrl(featuredSector?.image, asText(featuredSector?.defaultImage, '/assets/private-equity.png')),
        alt: asText(featuredSector?.imageAlt, asText(featuredSector?.title)),
        ctaLabel: asText(featuredSector?.ctaLabel),
        ctaUrl: asText(featuredSector?.ctaUrl, '#'),
      },
      sectorsOfFocusHeading: asText(raw.sectorsCardsHeading),
      sectorsOfFocusItems,
      partnershipHeading: asText(raw.partnershipHeading),
      partnerLogos,
      partnerCta: {
        title: asText(partnerCta?.title),
        description: asText(partnerCta?.description),
        buttonLabel: asText(partnerCta?.buttonLabel),
        buttonUrl: asText(partnerCta?.buttonUrl, '/contact-us'),
      },
    };
  } catch (error) {
    // If CMS fetch fails, fallback to static data
    console.warn('[Homepage] CMS fetch failed, using static fallback:', error);
    return getStaticHomepageData(locale);
  }
};
