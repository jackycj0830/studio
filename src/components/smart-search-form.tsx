
"use client";

import { useFormState, useFormStatus } from 'react-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { handleSmartSearch, type SmartSearchFormState } from '@/lib/actions';
import { Lightbulb, Loader2, AlertTriangle } from 'lucide-react';
import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useI18n } from '@/locales/client';


const initialState: SmartSearchFormState = {
  message: null,
  suggestions: [],
  errors: {},
};

function SubmitButton() {
  const { pending } = useFormStatus();
  const t = useI18n();
  return (
    <Button type="submit" disabled={pending} aria-disabled={pending} className="w-full sm:w-auto">
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Lightbulb className="mr-2 h-4 w-4" />}
      {t('smartSearch.form.button')}
    </Button>
  );
}

export function SmartSearchForm() {
  const [state, formAction] = useFormState(handleSmartSearch, initialState);
  const { toast } = useToast();
  const t = useI18n();

  useEffect(() => {
    if (state.errors?._form?.[0]) {
       toast({
        title: "Error", // This title also needs localization
        description: t(state.errors._form[0] as any), // Assuming error keys are used
        variant: "destructive",
      });
    } else if (state.message && state.message !== 'Suggestions found.' && state.message !== 'No specific suggestions found. Try rephrasing your query.') {
      // Handle other general messages if they are keys
       toast({
        title: "Info", // This title also needs localization
        description: t(state.message as any),
      });
    }
  }, [state.errors?._form, state.message, toast, t]);


  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="font-headline text-xl md:text-2xl">{t('smartSearch.form.title')}</CardTitle>
        <CardDescription>
          {t('smartSearch.form.description')}
        </CardDescription>
      </CardHeader>
      <form action={formAction}>
        <CardContent className="space-y-4">
          <div className="space-y-1">
            <Input
              id="query"
              name="query"
              placeholder={t('smartSearch.form.inputPlaceholder')}
              required
              className="text-base"
              aria-describedby="query-error"
            />
            {state?.errors?.query && (
              <p id="query-error" className="text-sm font-medium text-destructive flex items-center gap-1">
                <AlertTriangle className="h-4 w-4" /> 
                {/* Assuming error messages from Zod are keys or need to be mapped */}
                {state.errors.query.map(errKey => t(errKey as any)).join(', ')}
              </p>
            )}
          </div>
          <SubmitButton />
        </CardContent>
      </form>
      {/* Logic for displaying suggestions or 'no suggestions' message */}
      {state?.suggestions && state.suggestions.length > 0 && (
        <CardFooter className="flex flex-col items-start gap-3 border-t pt-4 md:pt-6">
          <h3 className="font-semibold text-md md:text-lg">{t('smartSearch.form.suggestionsTitle')}</h3>
          <ul className="list-disc list-inside space-y-1.5 text-sm text-muted-foreground">
            {state.suggestions.map((suggestion, index) => (
              <li key={index}>{suggestion}</li> // Suggestions themselves are from AI, not keys
            ))}
          </ul>
        </CardFooter>
      )}
      {state?.message === 'No specific suggestions found. Try rephrasing your query.' && (!state.suggestions || state.suggestions.length === 0) && (
         <CardFooter className="flex flex-col items-start gap-3 border-t pt-4 md:pt-6">
           <h3 className="font-semibold text-md md:text-lg">{t('smartSearch.form.suggestionsTitle')}</h3>
           <p className="text-sm text-muted-foreground">{t('smartSearch.form.noSuggestions')}</p>
         </CardFooter>
      )}
    </Card>
  );
}
