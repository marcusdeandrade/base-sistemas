'use client';

import { Sidebar } from '@/components/Sidebar';
import { Button } from '@/components/ui/button';
import { Icon } from '@iconify/react';
import { cn } from '@/lib/utils';
import { SidebarProvider, useSidebar } from '@/lib/sidebar-context';

interface ClientLayoutProps {
  children: React.ReactNode;
}

function ClientLayoutContent({ children }: { children: React.ReactNode }) {
  const { isMobile, isMobileOpen, setIsMobileOpen, isCollapsed } = useSidebar();

  return (
    <div className='flex min-h-screen bg-background'>
      {/* Mobile Menu Button - Moved to top left */}
      {isMobile && (
        <Button
          variant="ghost"
          size="icon"
          className="fixed top-4 left-4 z-50 bg-background/80 backdrop-blur-sm"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
        >
          <Icon 
            icon={isMobileOpen ? "heroicons:x-mark" : "heroicons:bars-3"} 
            className="h-6 w-6" 
          />
        </Button>
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-40 transform transition-all duration-200 ease-in-out',
          isMobile 
            ? cn('lg:translate-x-0 lg:static lg:z-0', isMobileOpen ? 'translate-x-0' : '-translate-x-full')
            : isCollapsed ? 'w-[80px]' : 'w-[280px]'
        )}
      >
        <Sidebar />
      </aside>

      {/* Main Content */}
      <main 
        className={cn(
          "flex-1 min-w-0 overflow-auto transition-all duration-200 ease-in-out",
          !isMobile && (isCollapsed ? 'ml-[80px]' : 'ml-[280px]')
        )}
      >
        <div 
          className={cn(
            "pt-16 px-4 pb-6 sm:pt-6 sm:px-6 lg:p-6", // Added top padding on mobile for the fixed button
            isMobile ? "transition-none" : "transition-all duration-200 ease-in-out"
          )}
        >
          {children}
        </div>
      </main>

      {/* Overlay */}
      {isMobile && isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
    </div>
  );
}

export function ClientLayout({ children }: ClientLayoutProps) {
  return (
    <SidebarProvider>
      <ClientLayoutContent>
        {children}
      </ClientLayoutContent>
    </SidebarProvider>
  );
} 