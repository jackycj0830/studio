
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Eye, Edit3, Trash2, FileSpreadsheet } from "lucide-react";
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

const mockPurchaseOrders = [
  { id: "PO-2024-001", supplier: "Tech Supplies Inc.", date: "2024-05-20", status: "Approved", amount: 5500.00, items: 2 },
  { id: "PO-2024-002", supplier: "OfficeMart LLC", date: "2024-05-25", status: "Pending Supplier", amount: 1250.50, items: 5 },
  { id: "PO-2024-003", supplier: "Component Kings", date: "2024-06-01", status: "Shipped", amount: 870.00, items: 10 },
  { id: "PO-2024-004", supplier: "Global Solutions Ltd.", date: "2024-06-05", status: "Received Partially", amount: 12500.00, items: 3 },
];

export default function PurchaseOrderListPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <h1 className="text-2xl md:text-3xl font-bold font-headline flex items-center">
          <FileSpreadsheet className="mr-3 h-8 w-8 text-primary" />
          採購單 (Purchase Order)
        </h1>
        <Button asChild>
          <Link href="/purchasing/purchase-order/new">
            <PlusCircle className="mr-2 h-4 w-4" /> Add New Purchase Order
          </Link>
        </Button>
      </div>
      
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-lg md:text-xl">Existing Purchase Orders</CardTitle>
          <CardDescription>A list of purchase orders and their current statuses.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>PO ID</TableHead>
                <TableHead>Supplier</TableHead>
                <TableHead>Order Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="text-center">Items</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockPurchaseOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.supplier}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={
                        order.status === "Approved" ? "default" :
                        order.status === "Shipped" ? "secondary" :
                        order.status === "Pending Supplier" ? "outline" :
                        "destructive" 
                      }
                      className={
                        order.status === "Approved" ? "bg-green-500/20 text-green-700 border-green-500/50" :
                        order.status === "Shipped" ? "bg-blue-500/20 text-blue-700 border-blue-500/50" :
                        order.status === "Pending Supplier" ? "bg-yellow-500/20 text-yellow-700 border-yellow-500/50" :
                        "bg-orange-500/20 text-orange-700 border-orange-500/50" // For Received Partially or other custom statuses
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
    </div>
  );
}
