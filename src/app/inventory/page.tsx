
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PackagePlus, Search, Move } from "lucide-react";
import { Input } from "@/components/ui/input";
import Image from "next/image";

export default async function InventoryPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <h1 className="text-2xl md:text-3xl font-bold font-headline">Inventory Control</h1>
        <div className="flex gap-2">
          <Button variant="outline">
            <Move className="mr-2 h-4 w-4" /> Stock Transfer
          </Button>
          <Button>
            <PackagePlus className="mr-2 h-4 w-4" /> Add New Item
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-lg md:text-xl">Product Search & Overview</CardTitle>
          <CardDescription>Find products and view their current stock levels.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex w-full max-w-sm items-center space-x-2 mb-4">
            <Input type="text" placeholder="Search products..." />
            <Button type="submit" variant="secondary">
              <Search className="h-4 w-4 mr-2" /> Search
            </Button>
          </div>
          <div className="aspect-[16/6] relative">
            <Image 
              src="https://placehold.co/800x300.png" 
              alt="Product List Table" 
              layout="fill"
              objectFit="cover" 
              className="rounded-md" 
              data-ai-hint="product list"
            />
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-lg md:text-xl">Low Stock Alerts</CardTitle>
            <CardDescription>Items that are running low on stock.</CardDescription>
          </CardHeader>
          <CardContent className="aspect-[16/9] relative">
            <Image 
              src="https://placehold.co/600x338.png" 
              alt="Low Stock Items" 
              layout="fill"
              objectFit="cover" 
              className="rounded-md" 
              data-ai-hint="alert notification"
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-lg md:text-xl">Stock Value Report</CardTitle>
            <CardDescription>Total value of current inventory.</CardDescription>
          </CardHeader>
          <CardContent className="aspect-[16/9] relative">
            <Image 
              src="https://placehold.co/600x338.png" 
              alt="Stock Value Chart" 
              layout="fill"
              objectFit="cover" 
              className="rounded-md" 
              data-ai-hint="financial chart"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
