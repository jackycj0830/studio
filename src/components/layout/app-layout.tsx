
"use client"; 

import type { ReactNode } from 'react';
import React from 'react'; // Added React import
import { SidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarInset, useSidebar } from '@/components/ui/sidebar';
import { MainNav } from '@/components/layout/main-nav';
import { Header } from '@/components/layout/header';
import { Logotype } from '@/components/logotype';
import { SheetTitle } from '@/components/ui/sheet';

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <SidebarProvider defaultOpen>
      <AppLayoutContent>{children}</AppLayoutContent>
    </SidebarProvider>
  );
}

function AppLayoutContent({ children }: AppLayoutProps) {
  const { isMobile } = useSidebar();
  const [hasMounted, setHasMounted] = React.useState(false);

  React.useEffect(() => {
    setHasMounted(true);
  }, []);

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
        {/* <SidebarFooter className="p-2">
          Optional: Footer content for sidebar
        </SidebarFooter> */}
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

