
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, DollarSign, Package, Users2 as UsersIcon } from "lucide-react";
import Image from "next/image";
import { getI18n } from '@/locales/server';

export default async function DashboardPage() {
  const t = await getI18n();
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl md:text-3xl font-bold font-headline">{t('dashboard.title')}</h1>
      <div className="grid gap-4 md:gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
            <DollarSign className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231.89</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Customers</CardTitle>
            <UsersIcon className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+2350</div>
            <p className="text-xs text-muted-foreground">+180.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Inventory Items</CardTitle>
            <Package className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12,873</div>
            <p className="text-xs text-muted-foreground">+5% from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Receivables</CardTitle>
            <BarChart className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$12,050.00</div>
            <p className="text-xs text-muted-foreground">Overdue by $1,230</p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-lg md:text-xl">Sales Performance</CardTitle>
            <CardDescription>Monthly sales trend visualization</CardDescription>
          </CardHeader>
          <CardContent className="aspect-[16/9] relative">
            <Image 
              src="https://placehold.co/600x338.png" 
              alt="Sales Chart" 
              layout="fill"
              objectFit="cover" 
              className="rounded-md" 
              data-ai-hint="sales chart"
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-lg md:text-xl">Inventory Status</CardTitle>
            <CardDescription>Overview of stock levels and movement</CardDescription>
          </CardHeader>
          <CardContent className="aspect-[16/9] relative">
             <Image 
              src="https://placehold.co/600x338.png" 
              alt="Inventory Chart" 
              layout="fill"
              objectFit="cover" 
              className="rounded-md" 
              data-ai-hint="inventory graph"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
