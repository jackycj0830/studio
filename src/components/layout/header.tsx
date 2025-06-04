
"use client";
import { UserCircle, Globe } from 'lucide-react';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { useIsMobile } from '@/hooks/use-mobile';
import { useI18n, useChangeLocale, useCurrentLocale } from '@/locales/client'; // Added useChangeLocale, useCurrentLocale
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import dynamic from 'next/dynamic';
import type { LanguageSwitcher as LanguageSwitcherType } from '@/components/language-switcher'; // Import type

const LanguageSwitcherClient = dynamic(
  () => import('@/components/language-switcher').then(mod => mod.LanguageSwitcher as typeof LanguageSwitcherType), // Cast for props
  {
    ssr: false,
    loading: () => (
      <Button variant="ghost" size="icon" aria-label="Loading language options" disabled>
        <Globe className="h-5 w-5" />
      </Button>
    )
  }
);

export function Header() {
  const isMobile = useIsMobile();
  const [mounted, setMounted] = useState(false);
  
  // Call all i18n hooks here, at the top level of Header
  const t = useI18n();
  const changeLocale = useChangeLocale();
  const currentLocale = useCurrentLocale();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Render a loading state or minimal header if not mounted
    return (
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-md md:px-6">
        {isMobile && (
           <SidebarTrigger />
        )}
        <h1 className="text-xl font-semibold font-headline text-foreground">ERP Central</h1>
        <div className="ml-auto flex items-center gap-4">
          <Button variant="ghost" size="icon" aria-label="Change language (Loading)" disabled>
            <Globe className="h-5 w-5" />
          </Button>
          <UserCircle className="h-8 w-8 text-muted-foreground" />
        </div>
      </header>
    );
  }

  // Now that mounted is true, we can safely use t() and pass i18n props
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-md md:px-6">
      {isMobile && (
         <SidebarTrigger />
      )}
      <h1 className="text-xl font-semibold font-headline text-foreground">{t('header.title')}</h1>
      <div className="ml-auto flex items-center gap-4">
        <LanguageSwitcherClient 
          t={t}
          changeLocale={changeLocale}
          currentLocale={currentLocale}
        />
        <UserCircle className="h-8 w-8 text-muted-foreground" />
      </div>
    </header>
  );
}
