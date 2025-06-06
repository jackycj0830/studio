
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
import { CalendarIcon, Save, Loader2, FileText, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import React, { useState } from "react";
import { handleCreatePurchaseRequest, type CreatePurchaseRequestFormState } from "@/lib/actions";

const createPurchaseRequestSchema = z.object({
  requestedBy: z.string().min(2, "Requester name must be at least 2 characters.").max(100),
  department: z.string().min(2, "Department name must be at least 2 characters.").max(50),
  requestDate: z.date({ required_error: "Request date is required." }),
  itemName: z.string().min(2, "Item name must be at least 2 characters.").max(100),
  quantity: z.coerce.number().min(1, "Quantity must be at least 1."),
  unit: z.string().min(1, "Unit is required.").max(20),
  reason: z.string().min(5, "Reason must be at least 5 characters.").max(500),
  suggestedSupplier: z.string().max(100).optional(),
});

type CreatePurchaseRequestFormData = z.infer<typeof createPurchaseRequestSchema>;

const initialState: CreatePurchaseRequestFormState = {
  message: null,
  errors: {},
};

export default function NewPurchaseRequestPage() {
  const { toast } = useToast();
  const [formState, setFormState] = useState<CreatePurchaseRequestFormState>(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<CreatePurchaseRequestFormData>({
    resolver: zodResolver(createPurchaseRequestSchema),
    defaultValues: {
      requestedBy: "",
      department: "",
      requestDate: new Date(),
      itemName: "",
      quantity: 1,
      unit: "",
      reason: "",
      suggestedSupplier: "",
    },
  });

  async function onSubmit(data: CreatePurchaseRequestFormData) {
    setIsSubmitting(true);
    setFormState(initialState); 

    const formData = new FormData();
    formData.append("requestedBy", data.requestedBy);
    formData.append("department", data.department);
    formData.append("requestDate", data.requestDate.toISOString());
    formData.append("itemName", data.itemName);
    formData.append("quantity", data.quantity.toString());
    formData.append("unit", data.unit);
    formData.append("reason", data.reason);
    if (data.suggestedSupplier) {
      formData.append("suggestedSupplier", data.suggestedSupplier);
    }
    
    const result = await handleCreatePurchaseRequest(formState, formData);
    setFormState(result);
    setIsSubmitting(false);

    if (result.message === "Purchase request created successfully (mock).") {
      toast({
        title: "Success",
        description: result.message,
      });
      form.reset();
    } else if (result.errors?._form) {
      toast({
        title: "Error Creating Request",
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
          <FileText className="mr-3 h-8 w-8 text-primary" />
          Create New Purchase Request
        </h1>
        <Button variant="outline" asChild>
          <Link href="/purchasing/purchase-request">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Purchase Requests
          </Link>
        </Button>
      </div>

      <Card className="w-full max-w-3xl mx-auto shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline">New Purchase Request Details</CardTitle>
          <CardDescription>Fill in the details to create a new purchase request.</CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="requestedBy"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Requester Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Jane Smith" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="department"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Department</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Operations" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="requestDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Request Date</FormLabel>
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
                name="itemName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Item Name / Description</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Heavy Duty Stapler, Office Supplies" {...field} />
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
                        <Input type="number" placeholder="e.g., 5" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="unit"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Unit</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., pcs, box, kg" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="reason"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Reason for Request</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Briefly explain why this item is needed." {...field} rows={3} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="suggestedSupplier"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Suggested Supplier (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., OfficeMax, Local Vendor Inc." {...field} />
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
                Submit Purchase Request
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}

