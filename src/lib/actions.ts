
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
    _form?: string[]; // For form-level errors
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
    console.log("Validation errors:", validatedFields.error.flatten().fieldErrors);
    return {
      message: "Validation failed. Please correct the errors below.",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // Simulate saving the data
  console.log("Mock saving Sales Order:", validatedFields.data);

  // In a real application, you would save to a database here.
  // For now, we just simulate success.
  
  // Simulate a potential server-side error (uncomment to test)
  // if (validatedFields.data.customerName === "ErrorTest") {
  //   return {
  //     message: null,
  //     errors: { _form: ["Simulated server error during save."] },
  //   };
  // }

  return {
    message: "Sales order created successfully (mock).",
    errors: {}, // Clear errors on success
  };
}
