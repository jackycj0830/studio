
"use client";
import { UserCircle, Globe } from 'lucide-react';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { useIsMobile } from '@/hooks/use-mobile';
import { useI18n, useChangeLocale, useCurrentLocale } from '@/locales/client';
import React, { useEffect, useState, Suspense } from 'react'; // Import Suspense
import { Button } from '@/components/ui/button';
import dynamic from 'next/dynamic';
import type { LanguageSwitcher as LanguageSwitcherType } from '@/components/language-switcher';

// Dynamically import LanguageSwitcher, ensuring it only runs on the client
const LanguageSwitcherClient = dynamic(
  () => import('@/components/language-switcher').then(mod => mod.LanguageSwitcher as typeof LanguageSwitcherType),
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
  
  // Call i18n hooks here, at the top level of Header.
  // Their usage in JSX is deferred until mounted.
  const t = useI18n();
  // changeLocale and currentLocale are not used directly by Header anymore,
  // but keeping them here if LanguageSwitcherClient needed them as props.
  // For the current approach, LanguageSwitcherClient calls its own hooks.

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
        <h1 className="text-xl font-semibold font-headline text-foreground">ERP Central</h1> {/* Default title */}
        <div className="ml-auto flex items-center gap-4">
          <Button variant="ghost" size="icon" aria-label="Change language (Loading)" disabled> {/* Hardcoded aria-label */}
            <Globe className="h-5 w-5" />
          </Button>
          <UserCircle className="h-8 w-8 text-muted-foreground" />
        </div>
      </header>
    );
  }

  // Now that mounted is true, we can safely use t() and render LanguageSwitcherClient
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-md md:px-6">
      {isMobile && (
         <SidebarTrigger />
      )}
      <h1 className="text-xl font-semibold font-headline text-foreground">{t('header.title')}</h1>
      <div className="ml-auto flex items-center gap-4">
        <Suspense fallback={
          <Button variant="ghost" size="icon" aria-label="Loading language options" disabled>
            <Globe className="h-5 w-5" />
          </Button>
        }>
          <LanguageSwitcherClient />
        </Suspense>
        <UserCircle className="h-8 w-8 text-muted-foreground" />
      </div>
    </header>
  );
}

