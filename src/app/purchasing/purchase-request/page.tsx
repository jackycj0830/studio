
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Eye, Edit3, Trash2, FileText } from "lucide-react";
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

const mockPurchaseRequests = [
  { id: "PR-001", requestedBy: "Alice Smith", department: "Marketing", date: "2024-06-01", items: "Office Supplies (Pens, Notepads)", status: "Approved" },
  { id: "PR-002", requestedBy: "Bob Johnson", department: "Engineering", date: "2024-06-03", items: "New Monitor, Keyboard", status: "Pending Review" },
  { id: "PR-003", requestedBy: "Carol Lee", department: "Operations", date: "2024-06-05", items: "Safety Equipment", status: "Rejected" },
  { id: "PR-004", requestedBy: "David Green", department: "Sales", date: "2024-06-07", items: "Travel Expenses Reimbursement", status: "Approved" },
];

export default function PurchaseRequestListPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <h1 className="text-2xl md:text-3xl font-bold font-headline flex items-center">
          <FileText className="mr-3 h-8 w-8 text-primary" />
          請購單 (Purchase Request)
        </h1>
        <Button asChild>
          <Link href="/purchasing/purchase-request/new">
            <PlusCircle className="mr-2 h-4 w-4" /> Add New Purchase Request
          </Link>
        </Button>
      </div>
      
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-lg md:text-xl">Existing Purchase Requests</CardTitle>
          <CardDescription>A list of submitted purchase requests and their statuses.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Request ID</TableHead>
                <TableHead>Requested By</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Items Summary</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockPurchaseRequests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell className="font-medium">{request.id}</TableCell>
                  <TableCell>{request.requestedBy}</TableCell>
                  <TableCell>{request.department}</TableCell>
                  <TableCell>{request.date}</TableCell>
                  <TableCell className="max-w-[200px] truncate" title={request.items}>{request.items}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={
                        request.status === "Approved" ? "default" : 
                        request.status === "Pending Review" ? "secondary" :
                        "destructive"
                      }
                      className={
                        request.status === "Approved" ? "bg-green-500/20 text-green-700 border-green-500/50" :
                        request.status === "Pending Review" ? "bg-yellow-500/20 text-yellow-700 border-yellow-500/50" :
                        "bg-red-500/20 text-red-700 border-red-500/50" 
                      }
                    >
                      {request.status}
                    </Badge>
                  </TableCell>
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
