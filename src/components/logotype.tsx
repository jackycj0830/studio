
import { Building2 } from 'lucide-react';
import { useI18n } from '@/locales/client';

export function Logotype() {
  const t = useI18n();
  return (
    <div className="flex items-center gap-2">
      <Building2 className="h-7 w-7 text-primary" />
      <span className="text-xl font-semibold font-headline text-foreground">{t('logotype.title')}</span>
    </div>
  );
}
