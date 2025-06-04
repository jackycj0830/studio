import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Image from "next/image";

export default function SalesPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <h1 className="text-2xl md:text-3xl font-bold font-headline">Sales Management</h1>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" /> Add New Order
        </Button>
      </div>
      <div className="grid gap-4 md:gap-6 md:grid-cols-1 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="font-headline text-lg md:text-xl">Recent Orders</CardTitle>
            <CardDescription>A list of the most recent sales orders.</CardDescription>
          </CardHeader>
          <CardContent className="aspect-[16/7] relative">
            <Image 
              src="https://placehold.co/800x350.png" 
              alt="Recent Orders Table" 
              layout="fill"
              objectFit="cover" 
              className="rounded-md" 
              data-ai-hint="data table"
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-lg md:text-xl">Customer Insights</CardTitle>
            <CardDescription>Key metrics and trends related to customers.</CardDescription>
          </CardHeader>
          <CardContent className="aspect-[4/3] relative">
             <Image 
              src="https://placehold.co/400x300.png" 
              alt="Customer Insights Chart" 
              layout="fill"
              objectFit="cover" 
              className="rounded-md" 
              data-ai-hint="customer chart"
            />
          </CardContent>
        </Card>
      </div>
       <Card>
        <CardHeader>
          <CardTitle className="font-headline text-lg md:text-xl">Sales Reports</CardTitle>
          <CardDescription>Access various sales-related reports.</CardDescription>
        </CardHeader>
        <CardContent className="aspect-[16/5] relative">
          <Image 
            src="https://placehold.co/800x250.png" 
            alt="Sales Reports Links" 
            layout="fill"
            objectFit="cover" 
            className="rounded-md" 
            data-ai-hint="report document"
          />
        </CardContent>
      </Card>
    </div>
  );
}
