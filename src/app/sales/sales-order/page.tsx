
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Eye, Edit3, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const mockSalesOrders = [
  { id: "SO-001", customer: "Alpha Inc.", date: "2024-05-15", status: "Processing", amount: 1250.75, items: 3 },
  { id: "SO-002", customer: "Beta LLC", date: "2024-05-20", status: "Shipped", amount: 899.00, items: 1 },
  { id: "SO-003", customer: "Gamma Corp", date: "2024-06-01", status: "Delivered", amount: 2400.50, items: 5 },
  { id: "SO-004", customer: "Delta Ltd.", date: "2024-06-03", status: "Pending", amount: 350.00, items: 2 },
];

export default function SalesOrderPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <h1 className="text-2xl md:text-3xl font-bold font-headline">訂單 (Sales Order)</h1>
        <Button asChild>
          <Link href="/sales/sales-order/new">
            <PlusCircle className="mr-2 h-4 w-4" /> Add New Order
          </Link>
        </Button>
      </div>
      
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-lg md:text-xl">Recent Sales Orders</CardTitle>
          <CardDescription>A list of the most recent sales orders and their statuses.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="text-center">Items</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockSalesOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={
                        order.status === "Delivered" ? "default" : 
                        order.status === "Shipped" ? "secondary" :
                        order.status === "Processing" ? "outline" :
                        "destructive" // for Pending or other statuses
                      }
                      className={
                        order.status === "Delivered" ? "bg-green-500/20 text-green-700 border-green-500/50" :
                        order.status === "Shipped" ? "bg-blue-500/20 text-blue-700 border-blue-500/50" :
                        order.status === "Processing" ? "bg-yellow-500/20 text-yellow-700 border-yellow-500/50" :
                        "bg-red-500/20 text-red-700 border-red-500/50" 
                      }
                    >
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">${order.amount.toFixed(2)}</TableCell>
                  <TableCell className="text-center">{order.items}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" className="mr-1" disabled>
                      <Eye className="h-4 w-4" />
                      <span className="sr-only">View</span>
                    </Button>
                    <Button variant="ghost" size="icon" className="mr-1" disabled>
                      <Edit3 className="h-4 w-4" />
                       <span className="sr-only">Edit</span>
                    </Button>
                    <Button variant="ghost" size="icon" disabled>
                      <Trash2 className="h-4 w-4" />
                       <span className="sr-only">Delete</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:gap-6 md:grid-cols-1 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="font-headline text-lg md:text-xl">Customer Insights</CardTitle>
            <CardDescription>Key metrics and trends related to customers.</CardDescription>
          </CardHeader>
          <CardContent className="aspect-[16/7] relative"> {/* Adjusted aspect ratio for wider chart */}
             <Image 
              src="https://placehold.co/800x350.png" 
              alt="Customer Insights Chart" 
              layout="fill"
              objectFit="cover" 
              className="rounded-md" 
              data-ai-hint="customer chart graph"
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-lg md:text-xl">Sales Reports (Related)</CardTitle>
            <CardDescription>Quick access to sales analytics.</CardDescription>
          </CardHeader>
          <CardContent className="aspect-[4/3] relative">
            <Image 
              src="https://placehold.co/400x300.png" 
              alt="Sales Reports Links" 
              layout="fill"
              objectFit="cover" 
              className="rounded-md" 
              data-ai-hint="report document"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
