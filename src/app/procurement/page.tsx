
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Truck } from "lucide-react";
import Image from "next/image";
import { getI18n } from '@/locales/server';

export default async function ProcurementPage() {
  const t = await getI18n();
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <h1 className="text-2xl md:text-3xl font-bold font-headline">{t('procurement.title')}</h1>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" /> Create Purchase Order
        </Button>
      </div>
      <div className="grid gap-4 md:gap-6 md:grid-cols-1 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="font-headline text-lg md:text-xl">Active Purchase Orders</CardTitle>
            <CardDescription>Track ongoing purchase orders and their statuses.</CardDescription>
          </CardHeader>
          <CardContent className="aspect-[16/7] relative">
            <Image 
              src="https://placehold.co/800x350.png" 
              alt="Purchase Orders Table" 
              layout="fill"
              objectFit="cover" 
              className="rounded-md" 
              data-ai-hint="data table"
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-lg md:text-xl">Supplier Management</CardTitle>
            <CardDescription>Overview of suppliers and performance.</CardDescription>
          </CardHeader>
          <CardContent className="aspect-[4/3] relative">
             <Image 
              src="https://placehold.co/400x300.png" 
              alt="Supplier List" 
              layout="fill"
              objectFit="cover" 
              className="rounded-md" 
              data-ai-hint="supplier list"
            />
          </CardContent>
        </Card>
      </div>
       <Card>
        <CardHeader>
          <CardTitle className="font-headline text-lg md:text-xl">Receiving & Invoices</CardTitle>
          <CardDescription>Manage goods receipts and supplier invoices.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col md:flex-row gap-4 items-center">
            <Truck className="h-16 w-16 text-primary hidden md:block" />
            <p className="text-muted-foreground flex-1">
              Placeholder for managing incoming shipments and processing invoices. This section would typically include lists of expected deliveries, received goods, and supplier invoices pending payment.
            </p>
        </CardContent>
      </Card>
    </div>
  );
}
