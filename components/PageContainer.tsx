'use client';

import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface PageContainerProps {
  children: ReactNode;
  className?: string;
}

export function PageContainer({ children, className }: PageContainerProps) {
  // Não aplicamos margens baseadas no estado da sidebar aqui porque isso é
  // feito pelo layout pai no ClientLayout.tsx
  
  return (
    <div className={cn(
      "w-full transition-all duration-200 ease-in-out",
      className
    )}>
      {children}
    </div>
  );
} 