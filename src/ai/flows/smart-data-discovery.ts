'use server';

/**
 * @fileOverview Smart data discovery flow that suggests relevant reports or data views based on user query.
 *
 * - smartDataDiscovery - A function that handles the smart data discovery process.
 * - SmartDataDiscoveryInput - The input type for the smartDataDiscovery function.
 * - SmartDataDiscoveryOutput - The return type for the smartDataDiscovery function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SmartDataDiscoveryInputSchema = z.object({
  query: z.string().describe('The user query about their business.'),
});
export type SmartDataDiscoveryInput = z.infer<typeof SmartDataDiscoveryInputSchema>;

const SmartDataDiscoveryOutputSchema = z.object({
  suggestions: z.array(
    z.string().describe('A list of suggested reports or data views.')
  ).describe('The suggested reports or data views based on the user query.'),
});
export type SmartDataDiscoveryOutput = z.infer<typeof SmartDataDiscoveryOutputSchema>;

export async function smartDataDiscovery(input: SmartDataDiscoveryInput): Promise<SmartDataDiscoveryOutput> {
  return smartDataDiscoveryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'smartDataDiscoveryPrompt',
  input: {schema: SmartDataDiscoveryInputSchema},
  output: {schema: SmartDataDiscoveryOutputSchema},
  prompt: `You are an AI assistant for an ERP system. A user has asked the following question: {{{query}}}. Suggest relevant reports or data views that could help the user find the information they need. Return the suggestions as a JSON array of strings.

For example, if the user asks 'What were my sales last quarter?' you might return ['Sales Report', 'Quarterly Sales Dashboard'].`,
});

const smartDataDiscoveryFlow = ai.defineFlow(
  {
    name: 'smartDataDiscoveryFlow',
    inputSchema: SmartDataDiscoveryInputSchema,
    outputSchema: SmartDataDiscoveryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
