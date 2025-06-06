
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, ArrowLeft, Save, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import React, { useEffect, useState } from "react";
import { handleCreateSalesOrder, type CreateSalesOrderFormState } from "@/lib/actions";


const createSalesOrderSchema = z.object({
  customerName: z.string().min(2, { message: "Customer name must be at least 2 characters." }).max(100, { message: "Customer name must be at most 100 characters." }),
  orderDate: z.date({ required_error: "Order date is required." }),
  productName: z.string().min(2, { message: "Product name must be at least 2 characters." }).max(100, { message: "Product name must be at most 100 characters." }),
  quantity: z.coerce.number().min(1, { message: "Quantity must be at least 1." }),
  price: z.coerce.number().min(0.01, { message: "Price must be greater than 0." }),
});

type CreateSalesOrderFormData = z.infer<typeof createSalesOrderSchema>;

const initialState: CreateSalesOrderFormState = {
  message: null,
  errors: {},
};

export default function NewSalesOrderPage() {
  const { toast } = useToast();
  const [formState, setFormState] = useState<CreateSalesOrderFormState>(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<CreateSalesOrderFormData>({
    resolver: zodResolver(createSalesOrderSchema),
    defaultValues: {
      customerName: "",
      orderDate: new Date(),
      productName: "",
      quantity: 1,
      price: 0,
    },
  });

  async function onSubmit(data: CreateSalesOrderFormData) {
    setIsSubmitting(true);
    setFormState(initialState); // Reset previous errors

    const formData = new FormData();
    formData.append("customerName", data.customerName);
    formData.append("orderDate", data.orderDate.toISOString()); // Send as ISO string
    formData.append("productName", data.productName);
    formData.append("quantity", data.quantity.toString());
    formData.append("price", data.price.toString());
    
    const result = await handleCreateSalesOrder(formState, formData);
    setFormState(result);
    setIsSubmitting(false);

    if (result.message === "Sales order created successfully (mock).") {
      toast({
        title: "Success",
        description: result.message,
      });
      form.reset(); // Reset form on success
    } else if (result.errors?._form) {
      toast({
        title: "Error Creating Order",
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
        <h1 className="text-2xl md:text-3xl font-bold font-headline">Create New Sales Order</h1>
        <Button variant="outline" asChild>
          <Link href="/sales/sales-order">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Sales Orders
          </Link>
        </Button>
      </div>

      <Card className="w-full max-w-2xl mx-auto shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline">Order Details</CardTitle>
          <CardDescription>Fill in the details for the new sales order.</CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-6">
              <FormField
                control={form.control}
                name="customerName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Customer Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., John Doe" {...field} />
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

              <FormField
                control={form.control}
                name="productName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Widget Pro" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="quantity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Quantity</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="e.g., 10" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Unit Price ($)</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.01" placeholder="e.g., 19.99" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
               {formState.errors?._form && (
                <FormMessage className="text-destructive text-sm">
                  {formState.errors._form.join(", ")}
                </FormMessage>
              )}
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                Save Order
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
