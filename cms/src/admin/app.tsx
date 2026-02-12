import type { StrapiApp } from '@strapi/strapi/admin';
import authLogo from './extensions/ethmar-logo.svg';
import menuLogo from './extensions/ethmar-favicon.svg';
import favicon from './extensions/ethmar-favicon.svg';

export default {
  config: {
    auth: {
      logo: authLogo,
    },
    menu: {
      logo: menuLogo,
    },
    head: {
      favicon,
      title: 'Ethmar CMS',
    },
    locales: ['en', 'ar'],
    tutorials: false,
    notifications: {
      releases: false,
    },
    theme: {
      light: {
        colors: {
          primary100: '#f2efe6',
          primary200: '#e7decb',
          primary500: '#b69c6b',
          primary600: '#927e58',
          primary700: '#7a6848',
          neutral0: '#fffcf8',
          neutral100: '#f7f3ec',
          neutral150: '#f1eadf',
          neutral200: '#e9dfcf',
          neutral300: '#d5c7af',
          neutral600: '#5f564a',
          neutral700: '#3b352e',
          neutral800: '#24211d',
          neutral900: '#191817',
        },
      },
      dark: {
        colors: {
          primary600: '#b69c6b',
          primary700: '#d8c39d',
          neutral0: '#0b1320',
          neutral100: '#1a2332',
          neutral200: '#223041',
          neutral300: '#2f435b',
          neutral600: '#b4b8bd',
          neutral700: '#ced3d8',
          neutral800: '#e9edf2',
          neutral900: '#f8fafc',
        },
      },
    },
  },
  bootstrap(_app: StrapiApp) {},
};
