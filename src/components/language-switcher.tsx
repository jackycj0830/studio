
'use client';

import type React from 'react';
import type { Locale } from '@/locales/config';
import { i18nConfig } from '@/locales/config';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Globe } from 'lucide-react';

interface LanguageSwitcherProps {
  changeLocale: (locale: Locale) => void;
  currentLocale: Locale;
  t: (key: string) => string; // Basic type for the t function
}

export function LanguageSwitcher({ changeLocale, currentLocale, t }: LanguageSwitcherProps) {
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
