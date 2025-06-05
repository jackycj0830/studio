
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-15rem)] text-center p-6">
      <AlertTriangle className="w-20 h-20 text-destructive mb-8" />
      <h1 className="text-5xl font-bold font-headline mb-4 text-foreground">404</h1>
      <h2 className="text-2xl font-semibold font-headline mb-4 text-foreground">Page Not Found</h2>
      <p className="text-lg text-muted-foreground mb-10 max-w-md">
        Oops! The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Button asChild size="lg">
        <Link href="/">Go Back to Homepage</Link>
      </Button>
    </div>
  );
}
