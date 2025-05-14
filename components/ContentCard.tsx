'use client';

import { ReactNode } from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useSidebar } from '@/lib/sidebar-context';

interface ContentCardProps {
  className?: string;
  headerClassName?: string;
  contentClassName?: string;
  footerClassName?: string;
  header?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  gradient?: boolean;
}

export function ContentCard({
  className,
  headerClassName,
  contentClassName,
  footerClassName,
  header,
  children,
  footer,
  gradient = true,
}: ContentCardProps) {
  const { isMobile } = useSidebar();

  return (
    <Card className={cn(
      gradient && "bg-gradient-to-br from-card/50 to-card shadow-xl",
      isMobile && "overflow-hidden",
      className
    )}>
      {header && (
        <CardHeader className={cn(
          isMobile && "px-4 py-4",
          headerClassName
        )}>
          {header}
        </CardHeader>
      )}
      <CardContent className={cn(
        isMobile && "px-4 py-4",
        contentClassName
      )}>
        {children}
      </CardContent>
      {footer && (
        <CardFooter className={cn(
          "border-t bg-gray-50/50",
          isMobile && "px-4 py-3",
          footerClassName
        )}>
          {footer}
        </CardFooter>
      )}
    </Card>
  );
} 