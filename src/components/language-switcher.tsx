
'use client';

import React, { useEffect, useState } from 'react';
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
  // All hooks are called at the top level, in the same order on every render.
  const [mounted, setMounted] = useState(false);
  const changeLocale = useChangeLocale();
  const currentLocale = useCurrentLocale();
  const t = useI18n();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Render a placeholder if not mounted.
    // Hooks above have already been called.
    // Using a hardcoded aria-label as 't' function might not be fully ready for complex translations here,
    // though for simple strings it might work if default locale is picked up.
    return (
      <Button variant="ghost" size="icon" aria-label="Change language (Loading)" disabled>
        <Globe className="h-5 w-5" />
      </Button>
    );
  }

  // Now that we are mounted, we can safely use the values from the i18n hooks.
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
