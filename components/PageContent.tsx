'use client';

import { ReactNode } from 'react';
import { PageContainer } from '@/components/PageContainer';
import { PageTitle } from '@/components/PageTitle';
import { cn } from '@/lib/utils';

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
  return (
    <PageContainer className={cn(
      "px-4 sm:px-6 lg:px-8 py-6 space-y-6 max-w-[1400px]",
      className
    )}>
      <PageTitle 
        title={title}
        subtitle={subtitle}
        className={cn("mb-6", titleClassName)}
      />
      <div className="space-y-6">
        {children}
      </div>
    </PageContainer>
  );
} 