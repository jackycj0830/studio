
"use client";
import { UserCircle, Globe, LogOut, User } from 'lucide-react';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { useIsMobile } from '@/hooks/use-mobile';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/auth-context';

export function Header() {
  const isMobile = useIsMobile();
  const { logout, isAuthenticated, isLoading } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || isLoading) {
    return (
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-md md:px-6">
        {isMobile && mounted && (
           <SidebarTrigger />
        )}
        <h1 className="text-xl font-semibold font-headline text-foreground">ERP Central</h1>
        <div className="ml-auto flex items-center gap-4">
          <Button variant="ghost" size="icon" aria-label="Change language" disabled>
            <Globe className="h-5 w-5 opacity-50" />
          </Button>
          {/* UserCircle icon was here, now removed for loading state as well */}
        </div>
      </header>
    );
  }

  if (!isAuthenticated) {
    return null; 
  }

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-md md:px-6">
      {isMobile && (
         <SidebarTrigger />
      )}
      <h1 className="text-xl font-semibold font-headline text-foreground">ERP Central</h1>
      <div className="ml-auto flex items-center gap-4">
        {isAuthenticated && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <User className="h-4 w-4" />
            <span>Logged in as: admin</span>
          </div>
        )}
        <Button variant="ghost" size="icon" aria-label="Change language" disabled>
          <Globe className="h-5 w-5" />
        </Button>
        {/* <UserCircle className="h-8 w-8 text-muted-foreground" /> Removed UserCircle icon */}
        {isAuthenticated && (
          <Button variant="ghost" size="icon" aria-label="Logout" onClick={logout}>
            <LogOut className="h-5 w-5" />
          </Button>
        )}
      </div>
    </header>
  );
}
