import { ReactNode } from 'react';
import AppSidebar from './AppSidebar';

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <AppSidebar />
      <main className="ml-0 md:ml-[260px] min-h-screen transition-all duration-300">
        <div className="p-4 md:p-8 pt-20 md:pt-8">
          {children}
        </div>
      </main>
      
      {/* Admin-specific footer */}
      <div className="ml-0 md:ml-[260px] border-t border-border bg-card p-4">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Admin Panel v2.0.1</span>
          <span>System Status: Operational</span>
        </div>
      </div>
    </div>
  );
}
