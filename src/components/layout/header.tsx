
"use client";
import { UserCircle, Globe } from 'lucide-react'; // Added Globe
import { SidebarTrigger } from '@/components/ui/sidebar';
import { useIsMobile } from '@/hooks/use-mobile';
import { useI18n } from '@/locales/client';
import { LanguageSwitcher } from '@/components/language-switcher';
import React, { useEffect, useState } from 'react'; // Added React, useEffect, useState
import { Button } from '@/components/ui/button'; // Added Button

export function Header() {
  const t = useI18n();
  const isMobile = useIsMobile();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-md md:px-6">
      {isMobile && (
         <SidebarTrigger />
      )}
      <h1 className="text-xl font-semibold font-headline text-foreground">{t('header.title')}</h1>
      <div className="ml-auto flex items-center gap-4">
        {mounted ? <LanguageSwitcher /> : (
          <Button variant="ghost" size="icon" aria-label={t('language.change') + " (Loading)"} disabled>
            <Globe className="h-5 w-5" />
          </Button>
        )}
        <UserCircle className="h-8 w-8 text-muted-foreground" />
      </div>
    </header>
  );
}

