'use client';

import { ReactNode } from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { cn } from '@/lib/utils';

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
  return (
    <Card className={cn(
      gradient && "bg-gradient-to-br from-card/50 to-card shadow-xl",
      className
    )}>
      {header && (
        <CardHeader className={cn(
          headerClassName
        )}>
          {header}
        </CardHeader>
      )}
      <CardContent className={cn(
        contentClassName
      )}>
        {children}
      </CardContent>
      {footer && (
        <CardFooter className={cn(
          "border-t bg-gray-50/50",
          footerClassName
        )}>
          {footer}
        </CardFooter>
      )}
    </Card>
  );
} 