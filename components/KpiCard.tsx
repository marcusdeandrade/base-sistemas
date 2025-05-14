'use client';

import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Icon } from '@iconify/react';

interface KpiCardProps {
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'neutral' | 'negative';
  trendType: 'up' | 'neutral' | 'down';
  description?: string;
  icon?: string;
  className?: string;
}

export function KpiCard({
  title,
  value,
  change,
  changeType,
  trendType,
  description,
  icon,
  className,
}: KpiCardProps) {
  const getTrendIcon = () => {
    switch (trendType) {
      case 'up':
        return 'heroicons:arrow-trending-up';
      case 'down':
        return 'heroicons:arrow-trending-down';
      default:
        return 'heroicons:minus';
    }
  };

  const getChangeColor = () => {
    switch (changeType) {
      case 'positive':
        return 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400';
      case 'negative':
        return 'bg-rose-50 text-rose-700 dark:bg-rose-500/20 dark:text-rose-400';
      default:
        return 'bg-zinc-100 text-zinc-700 dark:bg-zinc-500/20 dark:text-zinc-400';
    }
  };

  return (
    <Card className={cn('relative overflow-hidden transition-all hover:shadow-lg', className)}>
      <div className='p-6'>
        {/* Header */}
        <div className='flex items-center justify-between mb-4'>
          <h3 className='text-sm font-medium text-muted-foreground'>{title}</h3>
          {icon && (
            <div className='rounded-full bg-primary/10 p-2'>
              <Icon icon={icon} className='h-5 w-5 text-primary' />
            </div>
          )}
        </div>

        {/* Value and Trend */}
        <div className='flex items-baseline gap-2 mb-2'>
          <p className='text-3xl font-bold tracking-tight'>{value}</p>
          <div
            className={cn(
              'flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium',
              getChangeColor()
            )}
          >
            <Icon icon={getTrendIcon()} className='h-3.5 w-3.5' />
            <span>{change}</span>
          </div>
        </div>

        {/* Description */}
        {description && (
          <p className='text-sm text-muted-foreground mt-2'>{description}</p>
        )}

        {/* Decorative Element */}
        <div
          className={cn(
            'absolute bottom-0 left-0 h-1 w-full',
            {
              'bg-emerald-500/20': changeType === 'positive',
              'bg-rose-500/20': changeType === 'negative',
              'bg-zinc-200/50': changeType === 'neutral',
            }
          )}
        />
      </div>
    </Card>
  );
} 