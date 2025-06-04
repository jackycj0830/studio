
import { createI18nServer } from 'next-international/server';
import type { Locale } from './config';

export const { getI18n, getScopedI18n, getCurrentLocale } =
  createI18nServer<Locale>({
    en: () => import('./en'),
    'zh-CN': () => import('./zh-CN'),
    'zh-TW': () => import('./zh-TW'),
  });
