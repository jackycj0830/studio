
"use client";
import { UserCircle, Globe } from 'lucide-react';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { useIsMobile } from '@/hooks/use-mobile';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

export function Header() {
  const isMobile = useIsMobile();
  const [mounted, setMounted] = useState(false);

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
          <Button variant="ghost" size="icon" aria-label="Change language" disabled>
            <Globe className="h-5 w-5" />
          </Button>
          <UserCircle className="h-8 w-8 text-muted-foreground" />
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-md md:px-6">
      {isMobile && (
         <SidebarTrigger />
      )}
      <h1 className="text-xl font-semibold font-headline text-foreground">ERP Central</h1>
      <div className="ml-auto flex items-center gap-4">
        <Button variant="ghost" size="icon" aria-label="Change language" disabled>
          <Globe className="h-5 w-5" />
        </Button>
        <UserCircle className="h-8 w-8 text-muted-foreground" />
      </div>
    </header>
  );
}
