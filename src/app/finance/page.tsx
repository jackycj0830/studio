
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, TrendingUp, Landmark as BankIcon } from "lucide-react"; 
import Image from "next/image";
import { getI18n } from '@/locales/server';

export default async function FinancePage() {
  const t = await getI18n();
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl md:text-3xl font-bold font-headline">{t('finance.title')}</h1>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-1 md:grid-cols-3">
          <TabsTrigger value="overview">
            <TrendingUp className="mr-2 h-4 w-4" /> Financial Overview
          </TabsTrigger>
          <TabsTrigger value="reports">
            <FileText className="mr-2 h-4 w-4" /> Reports
          </TabsTrigger>
          <TabsTrigger value="accounts">
            <BankIcon className="mr-2 h-4 w-4" /> Accounts & Ledgers
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline text-lg md:text-xl">Key Financial Indicators</CardTitle>
              <CardDescription>Summary of your company's financial health.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <div className="p-4 border rounded-lg bg-card">
                <h3 className="text-sm font-medium text-muted-foreground">Net Profit Margin</h3>
                <p className="text-2xl font-bold">15.2%</p>
              </div>
              <div className="p-4 border rounded-lg bg-card">
                <h3 className="text-sm font-medium text-muted-foreground">Accounts Receivable</h3>
                <p className="text-2xl font-bold">$125,670</p>
              </div>
              <div className="p-4 border rounded-lg bg-card">
                <h3 className="text-sm font-medium text-muted-foreground">Accounts Payable</h3>
                <p className="text-2xl font-bold">$88,400</p>
              </div>
            </CardContent>
            <CardContent className="aspect-[16/7] relative mt-4">
               <Image 
                src="https://placehold.co/800x350.png" 
                alt="Financial Overview Chart" 
                layout="fill"
                objectFit="cover" 
                className="rounded-md" 
                data-ai-hint="financial dashboard"
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline text-lg md:text-xl">Financial Reports</CardTitle>
              <CardDescription>Generate and view detailed financial statements.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">List of available reports (e.g., Balance Sheet, Income Statement, Cash Flow Statement).</p>
              <div className="aspect-[16/5] relative">
                <Image 
                  src="https://placehold.co/800x250.png" 
                  alt="Financial Reports List" 
                  layout="fill"
                  objectFit="cover" 
                  className="rounded-md" 
                  data-ai-hint="document list"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="accounts" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline text-lg md:text-xl">Chart of Accounts & General Ledger</CardTitle>
              <CardDescription>Manage accounting科目 and view ledger details.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Interface for managing chart of accounts and browsing general ledger entries.</p>
              <div className="aspect-[16/7] relative mt-4">
                <Image 
                  src="https://placehold.co/800x350.png" 
                  alt="Chart of Accounts" 
                  layout="fill"
                  objectFit="cover" 
                  className="rounded-md" 
                  data-ai-hint="accounting ledger"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
