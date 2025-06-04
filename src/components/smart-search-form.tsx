
"use client";

import { useFormState, useFormStatus } from 'react-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { handleSmartSearch, type SmartSearchFormState } from '@/lib/actions';
import { Lightbulb, Loader2, AlertTriangle } from 'lucide-react';
import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

const initialState: SmartSearchFormState = {
  message: null,
  suggestions: [],
  errors: {},
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} aria-disabled={pending} className="w-full sm:w-auto">
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Lightbulb className="mr-2 h-4 w-4" />}
      Get Suggestions
    </Button>
  );
}

export function SmartSearchForm() {
  const [state, formAction] = useFormState(handleSmartSearch, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state.errors?._form?.[0]) {
       toast({
        title: "Error",
        description: state.errors._form[0],
        variant: "destructive",
      });
    } else if (state.message && state.message !== 'Suggestions found.' && state.message !== 'No specific suggestions found. Try rephrasing your query.') {
       toast({
        title: "Info",
        description: state.message,
      });
    }
  }, [state.errors?._form, state.message, toast]);

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="font-headline text-xl md:text-2xl">Smart Data Discovery</CardTitle>
        <CardDescription>
          Ask a question about your business, and we&apos;ll suggest relevant reports or data views. For example: &quot;What were my sales last quarter?&quot;
        </CardDescription>
      </CardHeader>
      <form action={formAction}>
        <CardContent className="space-y-4">
          <div className="space-y-1">
            <Input
              id="query"
              name="query"
              placeholder="e.g., How are my product sales in the East region?"
              required
              className="text-base"
              aria-describedby="query-error"
            />
            {state?.errors?.query && (
              <p id="query-error" className="text-sm font-medium text-destructive flex items-center gap-1">
                <AlertTriangle className="h-4 w-4" /> 
                {state.errors.query.join(', ')}
              </p>
            )}
          </div>
          <SubmitButton />
        </CardContent>
      </form>
      {state?.suggestions && state.suggestions.length > 0 && (
        <CardFooter className="flex flex-col items-start gap-3 border-t pt-4 md:pt-6">
          <h3 className="font-semibold text-md md:text-lg">Suggestions:</h3>
          <ul className="list-disc list-inside space-y-1.5 text-sm text-muted-foreground">
            {state.suggestions.map((suggestion, index) => (
              <li key={index}>{suggestion}</li>
            ))}
          </ul>
        </CardFooter>
      )}
      {state?.message === 'No specific suggestions found. Try rephrasing your query.' && (!state.suggestions || state.suggestions.length === 0) && (
         <CardFooter className="flex flex-col items-start gap-3 border-t pt-4 md:pt-6">
           <h3 className="font-semibold text-md md:text-lg">Suggestions:</h3>
           <p className="text-sm text-muted-foreground">No specific suggestions found. Try rephrasing your query.</p>
         </CardFooter>
      )}
    </Card>
  );
}
