
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  ShoppingBag,
  ShoppingCart,
  Factory,
  BookText,
  Calculator,
  Users,
  Archive as FixedAssetsIcon, 
  Activity,
  Search,
  ShieldCheck, // Icon for Admin
  Settings2, // Icon for Permissions
  UserPlus, // Icon for Add Account
  Users2, // Icon for View Accounts
  type LucideIcon,
} from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';

interface SubNavItem {
  title: string;
  href: string;
  disabled?: boolean;
  icon?: LucideIcon;
}

interface NavCycleConfig {
  id: string;
  title: string;
  icon: LucideIcon;
  subItems: SubNavItem[];
  basePath?: string; 
}

const navCycles: NavCycleConfig[] = [
  {
    id: 'purchasing',
    title: '進貨循環',
    icon: ShoppingCart,
    basePath: '/purchasing',
    subItems: [
      { title: '請購單', href: '/purchasing/purchase-request' },
      { title: '採購單', href: '/purchasing/purchase-order' },
      { title: '驗收單', href: '/purchasing/receiving-slip' },
      { title: '進貨單', href: '/purchasing/goods-receipt-note' },
      { title: '廠商貨款', href: '/purchasing/vendor-payments' },
    ],
  },
  {
    id: 'sales',
    title: '銷貨循環',
    icon: ShoppingBag,
    basePath: '/sales',
    subItems: [
      { title: '報價單', href: '/sales/quotation' },
      { title: '訂單', href: '/sales/sales-order' },
      { title: '銷貨單', href: '/sales/sales-invoice' },
      { title: '客戶應收帳款', href: '/sales/customer-receivables' },
    ],
  },
  {
    id: 'production',
    title: '生產循環',
    icon: Factory,
    basePath: '/production',
    subItems: [
      { title: 'BOM表', href: '/production/bom' },
      { title: '工單', href: '/production/work-order' },
      { title: '生產入庫', href: '/production/production-receipt' },
    ],
  },
  {
    id: 'general-ledger',
    title: '總帳循環',
    icon: BookText,
    basePath: '/general-ledger',
    subItems: [
      { title: '傳票', href: '/general-ledger/voucher' },
      { title: '日記帳', href: '/general-ledger/journal' },
      { title: '總分類帳', href: '/general-ledger/main-ledger' },
      { title: '試算表', href: '/general-ledger/trial-balance' },
    ],
  },
  {
    id: 'costing',
    title: '成本循環',
    icon: Calculator,
    basePath: '/costing',
    subItems: [
      { title: '成本計算', href: '/costing/cost-calculation' },
      { title: '成本分析', href: '/costing/cost-analysis' },
    ],
  },
  {
    id: 'payroll',
    title: '薪資循環',
    icon: Users, // Using the plural Users icon for the main cycle
    basePath: '/payroll',
    subItems: [
      { title: '員工薪資計算', href: '/payroll/salary-calculation' },
      { title: '薪資發放', href: '/payroll/salary-disbursement' },
    ],
  },
  {
    id: 'fixed-assets',
    title: '財產循環',
    icon: FixedAssetsIcon,
    basePath: '/fixed-assets',
    subItems: [
      { title: '財產管理', href: '/fixed-assets/asset-management' },
      { title: '折舊計算', href: '/fixed-assets/depreciation-calculation' },
    ],
  },
  {
    id: 'cash-flow',
    title: '現金流量循環',
    icon: Activity,
    basePath: '/cash-flow',
    subItems: [
      { title: '銀行存款', href: '/cash-flow/bank-transactions' },
      { title: '現金流量表', href: '/cash-flow/cash-flow-statement' },
    ],
  },
];

const adminNavCycle: NavCycleConfig = {
  id: 'administrator',
  title: 'Administrator',
  icon: ShieldCheck,
  basePath: '/admin',
  subItems: [
    { title: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { title: 'View Accounts', href: '/admin/accounts', icon: Users2 },
    { title: 'Add New Account', href: '/admin/add-account', icon: UserPlus },
    { title: 'Permissions', href: '/admin/permissions', icon: Settings2 },
    { title: 'View README', href: '/admin/view-document/readme' },
    { title: 'View Spec', href: '/admin/view-document/spec' },
    { title: 'View Todo List', href: '/admin/view-document/todolist' },
  ],
};

const topLevelNavItems: { title: string; href: string; icon: LucideIcon; disabled?: boolean }[] = [
  { title: '首頁', href: '/', icon: LayoutDashboard },
  { title: 'Smart Search', href: '/smart-search', icon: Search },
];


export function MainNav() {
  const pathname = usePathname();

  const getDefaultAccordionValues = () => {
    const activeCycles = navCycles.filter(cycle => cycle.basePath && pathname.startsWith(cycle.basePath)).map(cycle => cycle.id);
    if (adminNavCycle.basePath && pathname.startsWith(adminNavCycle.basePath)) {
      activeCycles.push(adminNavCycle.id);
    }
    return activeCycles;
  };

  return (
    <nav className="flex flex-col p-2">
      <SidebarMenu>
        {topLevelNavItems.map((item) => (
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
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>

      <Accordion type="multiple" defaultValue={getDefaultAccordionValues()} className="w-full">
        {[...navCycles, adminNavCycle].map((cycle) => (
          <AccordionItem value={cycle.id} key={cycle.id} className="border-none">
            <AccordionTrigger className="px-2 py-1.5 text-sm hover:bg-sidebar-accent hover:text-sidebar-accent-foreground rounded-md hover:no-underline [&[data-state=open]>svg]:text-sidebar-accent-foreground">
              <div className="flex items-center gap-2">
                <cycle.icon className="h-5 w-5" />
                <span className="truncate">{cycle.title}</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pl-4 pr-1 pb-1 pt-0">
              <SidebarMenu className="mt-1 border-l border-sidebar-border ml-2.5 pl-3.5 py-1">
                {cycle.subItems.map((item) => (
                  <SidebarMenuItem key={item.href} className="w-full">
                    <Link href={item.href} legacyBehavior passHref>
                      <SidebarMenuButton
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start font-normal text-sidebar-foreground/80 hover:text-sidebar-accent-foreground"
                        isActive={pathname === item.href}
                        tooltip={{ content: item.title, side: 'right' }}
                        disabled={item.disabled}
                        aria-disabled={item.disabled}
                      >
                        {item.icon && <item.icon className="h-4 w-4 mr-2 text-sidebar-foreground/70" />}
                        <span className="truncate">{item.title}</span>
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </nav>
  );
}
