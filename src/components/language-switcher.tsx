
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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Render a disabled placeholder button before hooks are ready
    // Using a hardcoded aria-label as 't' function is not available yet
    return (
      <Button variant="ghost" size="icon" aria-label="Change language" disabled>
        <Globe className="h-5 w-5" />
      </Button>
    );
  }

  // Hooks are now called only after the component has mounted
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
