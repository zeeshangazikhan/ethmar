import fs from 'fs';
import path from 'path';
import type { Core } from '@strapi/strapi';

type LocaleCode = 'en' | 'ar';

const HOMEPAGE_UID = 'api::homepage.homepage';
const HOMEPAGE_FIELDS = [
  'internalName',
  'editorInstructions',
  'heroBanner',
  'legacyBlock',
  'globalHeadingLine1',
  'globalHeadingLine2',
  'globalPresenceCards',
  'featuredSectorBlock',
  'sectorsHeadingLine1',
  'sectorsHeadingLine2',
  'sectorsCardsHeading',
  'sectorsCards',
  'partnershipHeading',
  'partnershipLogos',
  'finalCta',
  'notesForEditors',
] as const;

const disableAiLocalizations = async (strapi: Core.Strapi) => {
  try {
    const settingsService = strapi.plugin('i18n').service('settings') as {
      getSettings: () => Promise<Record<string, unknown> | undefined>;
      setSettings: (value: Record<string, unknown>) => Promise<unknown>;
    };

    const currentSettings = (await settingsService.getSettings()) || {};

    if (currentSettings.aiLocalizations !== false) {
      await settingsService.setSettings({
        ...currentSettings,
        aiLocalizations: false,
      });
    }
  } catch (error) {
    strapi.log.warn(`Could not disable AI localizations automatically: ${String(error)}`);
  }
};

const META_KEYS = new Set([
  'id',
  'documentId',
  'createdAt',
  'updatedAt',
  'publishedAt',
  'locale',
  'localizations',
  '__pivot',
  '__temp_key__',
]);

const sanitizeValue = (value: unknown): unknown => {
  if (Array.isArray(value)) {
    return value
      .map((item) => sanitizeValue(item))
      .filter((item) => !(item && typeof item === 'object' && Object.keys(item as Record<string, unknown>).length === 0));
  }

  if (value && typeof value === 'object') {
    const result: Record<string, unknown> = {};

    for (const [key, nested] of Object.entries(value as Record<string, unknown>)) {
      if (META_KEYS.has(key)) continue;
      result[key] = sanitizeValue(nested);
    }

    return result;
  }

  return value;
};

const repairHomepageComponents = async (strapi: Core.Strapi) => {
  const documents = strapi.documents(HOMEPAGE_UID as any) as any;
  const locales: LocaleCode[] = ['en', 'ar'];

  for (const locale of locales) {
    const draftRaw = await documents.findMany({ locale, status: 'draft', limit: 1 });
    const publishedRaw = await documents.findMany({ locale, status: 'published', limit: 1 });

    const draftEntry = Array.isArray(draftRaw) ? draftRaw[0] : draftRaw;
    const publishedEntry = Array.isArray(publishedRaw) ? publishedRaw[0] : publishedRaw;
    const entry = draftEntry || publishedEntry;

    if (!entry) continue;

    const documentId = entry.documentId ?? entry.id;
    if (!documentId) continue;

    const data: Record<string, unknown> = {};

    for (const key of HOMEPAGE_FIELDS) {
      if (key in entry) {
        data[key] = sanitizeValue(entry[key]);
      }
    }

    if (Object.keys(data).length === 0) continue;

    if (entry.publishedAt) {
      await documents.update({ documentId, locale, data, status: 'published' });
    } else {
      await documents.update({ documentId, locale, data });
    }
  }
};

const ensureI18nLocales = async (strapi: Core.Strapi) => {
  try {
    const localeQuery = strapi.db.query('plugin::i18n.locale');
    const existingLocales = (await localeQuery.findMany({
      select: ['code'],
    })) as Array<{ code?: string }>;

    const existingCodes = new Set(existingLocales.map((item) => item.code).filter(Boolean));

    if (!existingCodes.has('en')) {
      await localeQuery.create({
        data: {
          code: 'en',
          name: 'English (en)',
        },
      });
    }

    if (!existingCodes.has('ar')) {
      await localeQuery.create({
        data: {
          code: 'ar',
          name: 'Arabic (ar)',
        },
      });
    }
  } catch (error) {
    strapi.log.warn(`Could not ensure EN/AR locales: ${String(error)}`);
  }
};

const readLocaleFile = (locale: LocaleCode) => {
  const localePath = path.resolve(process.cwd(), '..', 'src', 'locales', `${locale}.json`);
  const raw = fs.readFileSync(localePath, 'utf-8');
  return JSON.parse(raw) as any;
};

const buildHomepageData = (locale: LocaleCode) => {
  const messages = readLocaleFile(locale);
  const home = messages.home;
  const common = messages.common;

  return {
    internalName: 'Homepage Content',
    editorInstructions:
      'How to edit: 1) Fill Section 1 to Section 7 in order. 2) Publish English first. 3) Switch locale to Arabic and translate. 4) Publish Arabic.',
    heroBanner: {
      eyebrow: '',
      titleLine1: home.heroTitle1,
      titleLine2: home.heroTitle2,
      titleLine3: home.heroTitle3,
      ctaLabel: home.heroCta,
      ctaUrl: '#',
      defaultImage: '/assets/hero.jpg',
      heroImageAlt: home.heroAlt,
    },
    legacyBlock: {
      headingLine1: home.legacyHeading1,
      headingLine2: home.legacyHeading2,
      description: '',
      defaultImage: '/assets/horse.jpg',
      imageAlt: home.legacyAlt,
      ctaLabel: common.learnMore,
      ctaUrl: '#',
    },
    globalHeadingLine1: home.globalHeading1,
    globalHeadingLine2: home.globalHeading2,
    globalPresenceCards: [
      { title: home.slides.usa, description: home.carouselDescription, defaultImage: '/assets/45.jpg', imageAlt: home.slides.usa },
      { title: home.slides.region2, description: home.carouselDescription, defaultImage: '/assets/20.jpg', imageAlt: home.slides.region2 },
      { title: home.slides.region3, description: home.carouselDescription, defaultImage: '/assets/20.jpg', imageAlt: home.slides.region3 },
      { title: home.slides.region4, description: home.carouselDescription, defaultImage: '/assets/20.jpg', imageAlt: home.slides.region4 },
      { title: home.slides.region5, description: home.carouselDescription, defaultImage: '/assets/20.jpg', imageAlt: home.slides.region5 },
      { title: home.slides.region6, description: home.carouselDescription, defaultImage: '/assets/20.jpg', imageAlt: home.slides.region6 },
      { title: home.slides.region7, description: home.carouselDescription, defaultImage: '/assets/20.jpg', imageAlt: home.slides.region7 },
    ],
    featuredSectorBlock: {
      title: home.privateEquityGrowth,
      description: '',
      defaultImage: '/assets/private-equity.png',
      imageAlt: home.privateEquityGrowth,
      ctaLabel: common.readMore,
      ctaUrl: '#',
    },
    sectorsHeadingLine1: home.sectorsHeading1,
    sectorsHeadingLine2: home.sectorsHeading2,
    sectorsCardsHeading: home.sectorsOfFocus,
    sectorsCards: [
      { title: home.technologyAi, defaultImage: '/assets/skyline.png', imageAlt: home.technologyAi },
      { title: home.financialServices, defaultImage: '/assets/skyline.png', imageAlt: home.financialServices },
      { title: home.infrastructure, defaultImage: '/assets/skyline.png', imageAlt: home.infrastructure },
      { title: home.healthcareBiotech, defaultImage: '/assets/skyline.png', imageAlt: home.healthcareBiotech },
      { title: home.energySustainability, defaultImage: '/assets/skyline.png', imageAlt: home.energySustainability },
      { title: home.realEstateLogistics, defaultImage: '/assets/skyline.png', imageAlt: home.realEstateLogistics },
    ],
    partnershipHeading: home.partnershipHeading,
    partnershipLogos: [
      { name: home.partnerAltGuggenheim, defaultImage: '/assets/gh-logo.png', websiteUrl: '#' },
      { name: home.partnerAltSpacex, defaultImage: '/assets/spacex-logo.png', websiteUrl: '#' },
      { name: home.partnerAltOpenai, defaultImage: '/assets/openai-logo.png', websiteUrl: '#' },
      { name: home.partnerAltLambda, defaultImage: '/assets/lambda-logo.png', websiteUrl: '#' },
    ],
    finalCta: {
      title: home.partnerWithUs,
      description: home.partnerDescription,
      buttonLabel: common.getInTouch,
      buttonUrl: locale === 'ar' ? '/ar/contact-us' : '/en/contact-us',
    },
    notesForEditors: 'Tip: Update English first, then switch locale to Arabic and publish both.',
  };
};

const upsertAndPublishHomepage = async (strapi: Core.Strapi, locale: LocaleCode) => {
  const data = buildHomepageData(locale);
  const documents = strapi.documents(HOMEPAGE_UID as any) as any;
  const existingRaw = await documents.findMany({ locale, limit: 1 });
  const existing = Array.isArray(existingRaw) ? existingRaw[0] : existingRaw;

  if (!existing) {
    await documents.create({ locale, data, status: 'published' });
    return;
  }

  const documentId = existing.documentId ?? existing.id;

  try {
    await documents.update({ documentId, locale, data, status: 'published' });
  } catch {
    const saved = await documents.update({ documentId, locale, data });
    const savedDocumentId = saved?.documentId ?? documentId;
    if (savedDocumentId) {
      await documents.publish({ documentId: savedDocumentId, locale });
    }
  }
};

const enablePublicHomepageRead = async (strapi: Core.Strapi) => {
  try {
    const role = await strapi.db.query('plugin::users-permissions.role').findOne({
      where: { type: 'public' },
    });

    if (!role) return;

    const ensurePermission = async (action: string) => {
      const existing = await strapi.db.query('plugin::users-permissions.permission').findOne({
        where: { action, role: role.id },
      });

      if (!existing) {
        await strapi.db.query('plugin::users-permissions.permission').create({
          data: {
            action,
            role: role.id,
            enabled: true,
          },
        });
      }
    };

    await ensurePermission('api::homepage.homepage.find');
  } catch (error) {
    strapi.log.warn(`Could not auto-enable public homepage permission: ${String(error)}`);
  }
};

export default {
  register() {},
  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    await ensureI18nLocales(strapi);
    await disableAiLocalizations(strapi);
    await repairHomepageComponents(strapi);
    const shouldSeedHomepage = process.env.SEED_HOMEPAGE === 'true';

    if (shouldSeedHomepage) {
      try {
        await upsertAndPublishHomepage(strapi, 'en');
      } catch (error) {
        const details = error instanceof Error ? error.stack || error.message : String(error);
        strapi.log.warn(`Could not seed EN homepage automatically: ${details}`);
      }

      try {
        await upsertAndPublishHomepage(strapi, 'ar');
      } catch (error) {
        const details = error instanceof Error ? error.stack || error.message : String(error);
        strapi.log.warn(`Could not seed AR homepage automatically: ${details}`);
      }
    }

    await enablePublicHomepageRead(strapi);
    strapi.log.info(
      shouldSeedHomepage
        ? 'Homepage bootstrap completed with auto-seed attempt'
        : 'Homepage bootstrap completed (auto-seed disabled)'
    );
  },
};
