
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation'; // from next/navigation
import {
  LayoutDashboard,
  ShoppingBag,
  ShoppingCart,
  Archive,
  Landmark,
  Users,
  Search,
  type LucideIcon,
} from 'lucide-react';
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarMenuBadge } from '@/components/ui/sidebar';
import { useI18n } from '@/locales/client'; // Removed useCurrentLocale
import type enMessages from '@/locales/en'; // For keyof

type TranslationKeys = keyof typeof enMessages;

interface NavItemConfig {
  titleKey: TranslationKeys; // Use a specific key from your translation files
  href: string;
  icon: LucideIcon;
  label?: string;
  disabled?: boolean;
  badge?: string;
}

const navItemConfigs: NavItemConfig[] = [
  { titleKey: 'nav.dashboard', href: '/', icon: LayoutDashboard },
  { titleKey: 'nav.sales', href: '/sales', icon: ShoppingBag },
  { titleKey: 'nav.procurement', href: '/procurement', icon: ShoppingCart },
  { titleKey: 'nav.inventory', href: '/inventory', icon: Archive },
  { titleKey: 'nav.finance', href: '/finance', icon: Landmark },
  { titleKey: 'nav.hr', href: '/hr', icon: Users },
  { titleKey: 'nav.smartSearch', href: '/smart-search', icon: Search },
];

export function MainNav() {
  const pathname = usePathname(); // According to next-international, this is locale-stripped
  const t = useI18n();
  // const currentLocale = useCurrentLocale(); // Removed this line

  return (
    <nav className="flex flex-col p-2">
      <SidebarMenu>
        {navItemConfigs.map((item) => (
          <SidebarMenuItem key={item.href} className="w-full">
            {/* Next.js Link should automatically handle locale prefixing with middleware */}
            <Link href={item.href} legacyBehavior passHref>
              <SidebarMenuButton
                className="w-full justify-start"
                isActive={pathname === item.href} // pathname from usePathname is locale-stripped
                tooltip={{ content: t(item.titleKey), side: 'right' }}
                disabled={item.disabled}
                aria-disabled={item.disabled}
              >
                <item.icon className="h-5 w-5" />
                <span className="truncate">{t(item.titleKey)}</span>
                {item.badge && <SidebarMenuBadge>{item.badge}</SidebarMenuBadge>}
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </nav>
  );
}
