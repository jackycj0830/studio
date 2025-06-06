
'use server';
import { smartDataDiscovery, type SmartDataDiscoveryInput, type SmartDataDiscoveryOutput } from '@/ai/flows/smart-data-discovery';
import { z } from 'zod';

const SmartSearchSchema = z.object({
  query: z.string()
    .min(3, 'Query must be at least 3 characters long.')
    .max(200, 'Query must be at most 200 characters long.'),
});

export interface SmartSearchFormState {
  message: string | null;
  suggestions?: string[];
  errors?: {
    query?: string[];
    _form?: string[]; // For form-level errors
  };
}

export async function handleSmartSearch(prevState: SmartSearchFormState, formData: FormData): Promise<SmartSearchFormState> {
  const validatedFields = SmartSearchSchema.safeParse({
    query: formData.get('query'),
  });

  if (!validatedFields.success) {
    return {
      message: 'Please correct the errors below.',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const input: SmartDataDiscoveryInput = { query: validatedFields.data.query };
    const result: SmartDataDiscoveryOutput = await smartDataDiscovery(input);
    
    if (result.suggestions && result.suggestions.length > 0) {
      return {
        message: 'Suggestions found.',
        suggestions: result.suggestions,
      };
    } else {
      return {
        message: 'No specific suggestions found. Try rephrasing your query.',
        suggestions: [],
      }
    }
  } catch (error) {
    console.error('Smart search error:', error);
    return {
      message: null, 
      errors: {
        _form: ['An unexpected error occurred while fetching suggestions. Please try again.'],
      }
    };
  }
}

// Sales Order Action
const CreateSalesOrderSchema = z.object({
  customerName: z.string().min(2, "Customer name is too short").max(100),
  orderDate: z.string().refine((date) => !isNaN(Date.parse(date)), { message: "Invalid date format" }),
  productName: z.string().min(2, "Product name is too short").max(100),
  quantity: z.coerce.number().min(1, "Quantity must be at least 1"),
  price: z.coerce.number().min(0.01, "Price must be positive"),
});

export interface CreateSalesOrderFormState {
  message: string | null;
  errors?: {
    customerName?: string[];
    orderDate?: string[];
    productName?: string[];
    quantity?: string[];
    price?: string[];
    _form?: string[]; 
  };
}

export async function handleCreateSalesOrder(
  prevState: CreateSalesOrderFormState,
  formData: FormData
): Promise<CreateSalesOrderFormState> {
  const rawFormData = {
    customerName: formData.get('customerName'),
    orderDate: formData.get('orderDate'),
    productName: formData.get('productName'),
    quantity: formData.get('quantity'),
    price: formData.get('price'),
  };

  const validatedFields = CreateSalesOrderSchema.safeParse(rawFormData);

  if (!validatedFields.success) {
    console.log("Validation errors (Sales Order):", validatedFields.error.flatten().fieldErrors);
    return {
      message: "Validation failed. Please correct the errors below.",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  console.log("Mock saving Sales Order:", validatedFields.data);
  
  return {
    message: "Sales order created successfully (mock).",
    errors: {}, 
  };
}

// Purchase Request Action
const CreatePurchaseRequestSchema = z.object({
  requestedBy: z.string().min(2, "Requester name must be at least 2 characters.").max(100),
  department: z.string().min(2, "Department name must be at least 2 characters.").max(50),
  requestDate: z.string().refine((date) => !isNaN(Date.parse(date)), { message: "Invalid date format" }),
  itemName: z.string().min(2, "Item name must be at least 2 characters.").max(100),
  quantity: z.coerce.number().min(1, "Quantity must be at least 1."),
  unit: z.string().min(1, "Unit is required.").max(20),
  reason: z.string().min(5, "Reason must be at least 5 characters.").max(500),
  suggestedSupplier: z.string().max(100).optional(),
});

export interface CreatePurchaseRequestFormState {
  message: string | null;
  errors?: {
    requestedBy?: string[];
    department?: string[];
    requestDate?: string[];
    itemName?: string[];
    quantity?: string[];
    unit?: string[];
    reason?: string[];
    suggestedSupplier?: string[];
    _form?: string[];
  };
}

export async function handleCreatePurchaseRequest(
  prevState: CreatePurchaseRequestFormState,
  formData: FormData
): Promise<CreatePurchaseRequestFormState> {
  const rawFormData = {
    requestedBy: formData.get('requestedBy'),
    department: formData.get('department'),
    requestDate: formData.get('requestDate'),
    itemName: formData.get('itemName'),
    quantity: formData.get('quantity'),
    unit: formData.get('unit'),
    reason: formData.get('reason'),
    suggestedSupplier: formData.get('suggestedSupplier'),
  };

  const validatedFields = CreatePurchaseRequestSchema.safeParse(rawFormData);

  if (!validatedFields.success) {
    console.log("Validation errors (Purchase Request):", validatedFields.error.flatten().fieldErrors);
    return {
      message: "Validation failed. Please correct the errors below.",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  console.log("Mock saving Purchase Request:", validatedFields.data);

  return {
    message: "Purchase request created successfully (mock).",
    errors: {},
  };
}

    