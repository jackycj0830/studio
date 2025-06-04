"use client";
import { UserCircle } from 'lucide-react';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { useIsMobile } from '@/hooks/use-mobile';

export function Header() {
  const isMobile = useIsMobile();

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-md md:px-6">
      {isMobile && (
         <SidebarTrigger />
      )}
      <h1 className="text-xl font-semibold font-headline text-foreground">ERP Central</h1>
      <div className="ml-auto flex items-center gap-4">
        {/* Placeholder for future features like search, notifications, user menu */}
        <UserCircle className="h-8 w-8 text-muted-foreground" />
      </div>
    </header>
  );
}
