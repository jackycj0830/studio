
'use client';

import React from 'react'; // Removed useEffect, useState
import { useChangeLocale, useCurrentLocale, useI18n } from '@/locales/client';
import { i18nConfig, type Locale } from '@/locales/config';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Globe } from 'lucide-react';

export function LanguageSwitcher() {
  // Hooks are called now that the component is only rendered client-side after parent (Header) is mounted
  // and dynamic import with ssr:false is used.
  const changeLocale = useChangeLocale();
  const currentLocale = useCurrentLocale();
  const t = useI18n();

  const languageNames: Record<Locale, string> = {
    en: t('language.english'),
    'zh-CN': t('language.simplifiedChinese'),
    'zh-TW': t('language.traditionalChinese'),
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label={t('language.change')}>
          <Globe className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {i18nConfig.locales.map((locale) => (
          <DropdownMenuItem
            key={locale}
            onClick={() => changeLocale(locale)}
            disabled={currentLocale === locale}
          >
            {languageNames[locale] || locale.toUpperCase()}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
