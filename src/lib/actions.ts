
'use server';
import { smartDataDiscovery, type SmartDataDiscoveryInput, type SmartDataDiscoveryOutput } from '@/ai/flows/smart-data-discovery';
import { z } from 'zod';

// It's better to use translation keys for Zod error messages as well,
// but for simplicity, we'll keep them as is for now and translate them in the component if needed.
// Or, you can map them here. For next-international, Zod integration might require a custom setup.
const SmartSearchSchema = z.object({
  query: z.string()
    .min(3, 'smartSearch.form.error.queryMin') // Using keys now
    .max(200, 'smartSearch.form.error.queryMax'), // Using keys now
});

export interface SmartSearchFormState {
  message: string | null; // Can be a translation key or a direct message
  suggestions?: string[]; // These come from AI, so likely not translation keys themselves
  errors?: {
    query?: string[]; // Array of translation keys
    _form?: string[]; // Array of translation keys
  };
}

export async function handleSmartSearch(prevState: SmartSearchFormState, formData: FormData): Promise<SmartSearchFormState> {
  const validatedFields = SmartSearchSchema.safeParse({
    query: formData.get('query'),
  });

  if (!validatedFields.success) {
    return {
      message: 'smartSearch.form.error.invalidQuery', // General error key
      errors: validatedFields.error.flatten().fieldErrors, // fieldErrors will contain the keys from Zod schema
    };
  }

  try {
    const input: SmartDataDiscoveryInput = { query: validatedFields.data.query };
    const result: SmartDataDiscoveryOutput = await smartDataDiscovery(input);
    
    if (result.suggestions && result.suggestions.length > 0) {
      return {
        message: 'Suggestions found.', // This message might not be displayed directly if suggestions exist.
        suggestions: result.suggestions,
      };
    } else {
      return {
        // message key for 'no suggestions' handled in component for better UI control
        message: 'No specific suggestions found. Try rephrasing your query.', // This specific string is checked in the component.
        suggestions: [],
      }
    }
  } catch (error) {
    console.error('Smart search error:', error);
    return {
      message: null, 
      errors: {
        _form: ['smartSearch.form.error.unexpected'], // Error key for unexpected errors
      }
    };
  }
}
