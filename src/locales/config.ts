
export const locales = ['en', 'zh-CN', 'zh-TW'] as const;
export const defaultLocale = 'en';

export const i18nConfig = {
  locales,
  defaultLocale,
  prefixDefault: true, // URLs will be /en/..., /zh-CN/..., etc.
};

export type Locale = (typeof locales)[number];
