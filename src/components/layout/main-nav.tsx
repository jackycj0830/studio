
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
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

interface NavItemConfig {
  title: string;
  href: string;
  icon: LucideIcon;
  label?: string;
  disabled?: boolean;
  badge?: string;
}

const navItemConfigs: NavItemConfig[] = [
  { title: 'Dashboard', href: '/', icon: LayoutDashboard },
  { title: 'Sales', href: '/sales', icon: ShoppingBag },
  { title: 'Procurement', href: '/procurement', icon: ShoppingCart },
  { title: 'Inventory', href: '/inventory', icon: Archive },
  { title: 'Finance', href: '/finance', icon: Landmark },
  { title: 'Team Directory', href: '/hr', icon: Users },
  { title: 'Smart Search', href: '/smart-search', icon: Search },
];

export function MainNav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col p-2">
      <SidebarMenu>
        {navItemConfigs.map((item) => (
          <SidebarMenuItem key={item.href} className="w-full">
            <Link href={item.href} legacyBehavior passHref>
              <SidebarMenuButton
                className="w-full justify-start"
                isActive={pathname === item.href}
                tooltip={{ content: item.title, side: 'right' }}
                disabled={item.disabled}
                aria-disabled={item.disabled}
              >
                <item.icon className="h-5 w-5" />
                <span className="truncate">{item.title}</span>
                {item.badge && <SidebarMenuBadge>{item.badge}</SidebarMenuBadge>}
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </nav>
  );
}
