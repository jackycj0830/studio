import { Building2 } from 'lucide-react';

export function Logotype() {
  return (
    <div className="flex items-center gap-2">
      <Building2 className="h-7 w-7 text-primary" />
      <span className="text-xl font-semibold font-headline text-foreground">ERP Central</span>
    </div>
  );
}
