
"use client";

import type { ReactNode } from 'react';
import React, { useEffect } from 'react';
import { SidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarInset, useSidebar } from '@/components/ui/sidebar';
import { MainNav } from '@/components/layout/main-nav';
import { Header } from '@/components/layout/header';
import { Logotype } from '@/components/logotype';
import { SheetTitle } from '@/components/ui/sheet';
import { useAuth } from '@/context/auth-context';
import { useRouter, usePathname } from 'next/navigation';
import { Loader2 } from 'lucide-react'; // For loading spinner

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  // AuthProvider is now in RootLayout, so AppLayout directly uses AppLayoutContent
  return (
    <SidebarProvider defaultOpen>
      <AppLayoutContent>{children}</AppLayoutContent>
    </SidebarProvider>
  );
}

function AppLayoutContent({ children }: AppLayoutProps) {
  const { isMobile } = useSidebar();
  const [hasMounted, setHasMounted] = React.useState(false);
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  React.useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (isLoading) {
      return; 
    }

    const isLoginPage = pathname === '/login';

    if (!isAuthenticated && !isLoginPage) {
      router.push('/login');
    }
    // Redirection from /login if authenticated is handled by AuthProvider's effect
    // or can be also handled by LoginPage's own useEffect.
  }, [isAuthenticated, isLoading, pathname, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="ml-4 text-lg text-foreground">載入中...</p>
      </div>
    );
  }

  if (pathname === '/login') {
    // If on login page and not authenticated, render only children (LoginPage)
    // If authenticated, the effect in AuthProvider or LoginPage should redirect away
    return <>{children}</>;
  }
  
  // If not authenticated and not on login page, the effect above should have redirected.
  // However, as a fallback or during slight transition, we can show loader.
  if (!isAuthenticated && pathname !== '/login') {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
         <p className="ml-4 text-lg text-foreground">正在重新導向至登入頁面...</p>
      </div>
    );
  }

  // Authenticated user on a protected page
  return (
    <>
      <Sidebar>
        <SidebarHeader className="p-4 border-b border-sidebar-border">
          {(hasMounted && isMobile) ? (
            <SheetTitle>
              <Logotype />
            </SheetTitle>
          ) : (
            <Logotype />
          )}
        </SidebarHeader>
        <SidebarContent>
          <MainNav />
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <Header />
        <main className="flex-1 p-4 md:p-6 lg:p-8 bg-background overflow-auto">
          {children}
        </main>
      </SidebarInset>
    </>
  );
}
