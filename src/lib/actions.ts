'use server';
import { smartDataDiscovery, type SmartDataDiscoveryInput, type SmartDataDiscoveryOutput } from '@/ai/flows/smart-data-discovery';
import { z } from 'zod';

const SmartSearchSchema = z.object({
  query: z.string().min(3, 'Query must be at least 3 characters long.').max(200, 'Query must be at most 200 characters long.'),
});

export interface SmartSearchFormState {
  message: string | null;
  suggestions?: string[];
  errors?: {
    query?: string[];
    _form?: string[];
  };
}

export async function handleSmartSearch(prevState: SmartSearchFormState, formData: FormData): Promise<SmartSearchFormState> {
  const validatedFields = SmartSearchSchema.safeParse({
    query: formData.get('query'),
  });

  if (!validatedFields.success) {
    return {
      message: 'Invalid query.',
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
      message: null, // Keep previous suggestions if any, or clear them. For now, clear.
      errors: {
        _form: ['An unexpected error occurred while fetching suggestions. Please try again.'],
      }
    };
  }
}
