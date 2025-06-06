
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, Save, Loader2, ArrowLeft, FileSpreadsheet } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import React, { useState } from "react";
import { handleCreatePurchaseOrder, type CreatePurchaseOrderFormState } from "@/lib/actions";

const createPurchaseOrderSchema = z.object({
  supplierName: z.string().min(2, "Supplier name must be at least 2 characters.").max(100),
  orderDate: z.date({ required_error: "Order date is required." }),
  itemName: z.string().min(2, "Item name must be at least 2 characters.").max(100),
  quantity: z.coerce.number().min(1, "Quantity must be at least 1."),
  unitPrice: z.coerce.number().min(0.01, "Unit price must be greater than 0."),
  shippingAddress: z.string().min(5, "Shipping address is too short.").max(200).optional(),
  paymentTerms: z.string().max(50).optional(),
});

type CreatePurchaseOrderFormData = z.infer<typeof createPurchaseOrderSchema>;

const initialState: CreatePurchaseOrderFormState = {
  message: null,
  errors: {},
};

export default function NewPurchaseOrderPage() {
  const { toast } = useToast();
  const [formState, setFormState] = useState<CreatePurchaseOrderFormState>(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<CreatePurchaseOrderFormData>({
    resolver: zodResolver(createPurchaseOrderSchema),
    defaultValues: {
      supplierName: "",
      orderDate: new Date(),
      itemName: "",
      quantity: 1,
      unitPrice: 0,
      shippingAddress: "",
      paymentTerms: "Net 30",
    },
  });

  async function onSubmit(data: CreatePurchaseOrderFormData) {
    setIsSubmitting(true);
    setFormState(initialState); 

    const formData = new FormData();
    formData.append("supplierName", data.supplierName);
    formData.append("orderDate", data.orderDate.toISOString());
    formData.append("itemName", data.itemName);
    formData.append("quantity", data.quantity.toString());
    formData.append("unitPrice", data.unitPrice.toString());
    if (data.shippingAddress) {
      formData.append("shippingAddress", data.shippingAddress);
    }
    if (data.paymentTerms) {
      formData.append("paymentTerms", data.paymentTerms);
    }
    
    const result = await handleCreatePurchaseOrder(formState, formData); // Ensure this is the correct action
    setFormState(result);
    setIsSubmitting(false);

    if (result.message === "Purchase order created successfully (mock).") {
      toast({
        title: "Success",
        description: result.message,
      });
      form.reset();
    } else if (result.errors?._form) {
      toast({
        title: "Error Creating Purchase Order",
        description: result.errors._form.join(", "),
        variant: "destructive",
      });
    } else if (Object.keys(result.errors || {}).length > 0) {
       toast({
        title: "Validation Error",
        description: "Please check the form fields for errors.",
        variant: "destructive",
      });
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl md:text-3xl font-bold font-headline flex items-center">
          <FileSpreadsheet className="mr-3 h-8 w-8 text-primary" />
          Create New Purchase Order
        </h1>
        <Button variant="outline" asChild>
          <Link href="/purchasing/purchase-order">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Purchase Orders
          </Link>
        </Button>
      </div>

      <Card className="w-full max-w-3xl mx-auto shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline">New Purchase Order Details</CardTitle>
          <CardDescription>Fill in the details to create a new purchase order.</CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="supplierName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Supplier Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Acme Corp" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="orderDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Order Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="itemName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Item Name / Description</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 10ft Steel Rods, Grade A" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="quantity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Quantity</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="e.g., 100" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="unitPrice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Unit Price ($)</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.01" placeholder="e.g., 12.50" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="shippingAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Shipping Address (Optional)</FormLabel>
                    <FormControl>
                      <Textarea placeholder="123 Main St, Anytown, USA" {...field} rows={3} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="paymentTerms"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Payment Terms (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Net 30, Upon Receipt" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

               {formState.errors?._form && (
                <FormMessage className="text-destructive text-sm">
                  {formState.errors._form.join(", ")}
                </FormMessage>
              )}
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full md:w-auto" disabled={isSubmitting}>
                {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                Save Purchase Order
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
