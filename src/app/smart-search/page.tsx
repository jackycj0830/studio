import { SmartSearchForm } from '@/components/smart-search-form';

export default function SmartSearchPage() {
  return (
    <div className="flex flex-col gap-6 items-center justify-center min-h-[calc(100vh-10rem)]"> {/* Adjust min-height as needed */}
      <SmartSearchForm />
    </div>
  );
}
