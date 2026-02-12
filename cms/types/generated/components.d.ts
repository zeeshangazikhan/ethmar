import type { Schema, Struct } from '@strapi/strapi';

export interface HomeContentSection extends Struct.ComponentSchema {
  collectionName: 'components_home_content_sections';
  info: {
    description: 'Legacy section below hero with heading, image and optional button';
    displayName: 'Legacy Block';
  };
  attributes: {
    ctaLabel: Schema.Attribute.String;
    ctaUrl: Schema.Attribute.String;
    defaultImage: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'/assets/horse.jpg'>;
    description: Schema.Attribute.Text;
    headingLine1: Schema.Attribute.String & Schema.Attribute.Required;
    headingLine2: Schema.Attribute.String;
    imageAlt: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface HomeFeaturedSector extends Struct.ComponentSchema {
  collectionName: 'components_home_featured_sectors';
  info: {
    description: 'Large highlighted sector section with title and image';
    displayName: 'Featured Sector Block';
  };
  attributes: {
    ctaLabel: Schema.Attribute.String & Schema.Attribute.DefaultTo<'Read More'>;
    ctaUrl: Schema.Attribute.String & Schema.Attribute.DefaultTo<'#'>;
    defaultImage: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'/assets/private-equity.png'>;
    description: Schema.Attribute.Text;
    imageAlt: Schema.Attribute.String & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface HomeGlobalSlide extends Struct.ComponentSchema {
  collectionName: 'components_home_global_slides';
  info: {
    description: 'One slide card in the Global Presence carousel';
    displayName: 'Global Presence Card';
  };
  attributes: {
    defaultImage: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'/assets/20.jpg'>;
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    imageAlt: Schema.Attribute.String & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface HomeHero extends Struct.ComponentSchema {
  collectionName: 'components_home_heroes';
  info: {
    description: 'Main hero content shown at the very top of homepage';
    displayName: 'Hero Banner';
  };
  attributes: {
    ctaLabel: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Dive Deeper'>;
    ctaUrl: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'#'>;
    defaultImage: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'/assets/hero.jpg'>;
    eyebrow: Schema.Attribute.String;
    heroImageAlt: Schema.Attribute.String & Schema.Attribute.Required;
    titleLine1: Schema.Attribute.String & Schema.Attribute.Required;
    titleLine2: Schema.Attribute.String & Schema.Attribute.Required;
    titleLine3: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface HomePartnerCta extends Struct.ComponentSchema {
  collectionName: 'components_home_partner_ctas';
  info: {
    description: 'Final partner call-to-action text and button';
    displayName: 'Final CTA Block';
  };
  attributes: {
    buttonLabel: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Get in Touch'>;
    buttonUrl: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'/contact-us'>;
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface HomePartnerLogo extends Struct.ComponentSchema {
  collectionName: 'components_home_partner_logos';
  info: {
    description: 'One logo in partnership logos row';
    displayName: 'Partner Logo Item';
  };
  attributes: {
    defaultImage: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'/assets/gh-logo.png'>;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    websiteUrl: Schema.Attribute.String;
  };
}

export interface HomeSectorFocusItem extends Struct.ComponentSchema {
  collectionName: 'components_home_sector_focus_items';
  info: {
    description: 'One card item inside Sectors of Focus carousel';
    displayName: 'Sector Focus Card';
  };
  attributes: {
    defaultImage: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'/assets/skyline.png'>;
    imageAlt: Schema.Attribute.String & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'home.content-section': HomeContentSection;
      'home.featured-sector': HomeFeaturedSector;
      'home.global-slide': HomeGlobalSlide;
      'home.hero': HomeHero;
      'home.partner-cta': HomePartnerCta;
      'home.partner-logo': HomePartnerLogo;
      'home.sector-focus-item': HomeSectorFocusItem;
    }
  }
}
