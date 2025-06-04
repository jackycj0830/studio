
"use client";
import { UserCircle, Globe, LogOut } from 'lucide-react';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { useIsMobile } from '@/hooks/use-mobile';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/auth-context';

export function Header() {
  const isMobile = useIsMobile();
  const { logout, isAuthenticated, isLoading } = useAuth(); // Added isLoading
  const [mounted, setMounted] = useState(false); // For client-side only rendering logic

  useEffect(() => {
    setMounted(true);
  }, []);

  // While loading auth state or if not mounted yet, don't render the full header
  // Or if not authenticated (which means AppLayout will likely be showing login or loading)
  if (!mounted || isLoading) {
     // Render a minimal placeholder or nothing, as AppLayoutContent handles main loading/redirect
    return (
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-md md:px-6">
        {isMobile && mounted && ( // Only show trigger if mobile and mounted
           <SidebarTrigger />
        )}
        <h1 className="text-xl font-semibold font-headline text-foreground">ERP Central</h1>
        {/* Minimal icons during load */}
        <div className="ml-auto flex items-center gap-4">
          <Button variant="ghost" size="icon" aria-label="Change language" disabled>
            <Globe className="h-5 w-5 opacity-50" />
          </Button>
          <UserCircle className="h-8 w-8 text-muted-foreground opacity-50" />
        </div>
      </header>
    );
  }

  // If not authenticated and loading is finished, AppLayoutContent should handle showing LoginPage
  // So, Header shouldn't render fully if not authenticated.
  // This logic is somewhat implicitly handled by AppLayoutContent now, but this is a safeguard.
  if (!isAuthenticated) {
    return null; // Or a very minimal header if absolutely needed on non-auth pages (which isn't the case here)
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
        {isAuthenticated && (
          <Button variant="ghost" size="icon" aria-label="Logout" onClick={logout}>
            <LogOut className="h-5 w-5" />
          </Button>
        )}
      </div>
    </header>
  );
}
