'use client';

import { ReactNode } from 'react';
import { PageContainer } from '@/components/PageContainer';
import { PageTitle } from '@/components/PageTitle';
import { cn } from '@/lib/utils';
import { useSidebar } from '@/lib/sidebar-context';

interface PageContentProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  titleClassName?: string;
}

export function PageContent({
  title,
  subtitle,
  children,
  className,
  titleClassName,
}: PageContentProps) {
  const { isMobile } = useSidebar();

  return (
    <PageContainer className={cn(
      "px-2 sm:px-4 md:px-6 lg:px-8 py-3 sm:py-6 space-y-4 sm:space-y-6 max-w-[1400px]",
      className
    )}>
      <PageTitle 
        title={title}
        subtitle={subtitle}
        className={cn(
          "mb-4 sm:mb-6",
          isMobile && "text-center",
          titleClassName
        )}
      />
      <div className="space-y-4 sm:space-y-6">
        {children}
      </div>
    </PageContainer>
  );
} 