
// This layout can be used to provide a consistent structure for all admin pages.
// For now, it will just render its children, relying on the root AppLayout for overall structure.
// You could add admin-specific navigation or headers here in the future.

import type { ReactNode } from 'react';

export default function AdminLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
