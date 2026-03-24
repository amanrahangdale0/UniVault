import { ReactNode } from 'react';
import AppSidebar from './AppSidebar';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <AppSidebar />
      <main className="ml-0 md:ml-[260px] min-h-screen transition-all duration-300">
        <div className="p-4 md:p-8 pt-20 md:pt-8">
          {children}
        </div>
      </main>
    </div>
  );
}
