'use client';

import { cn } from '@/lib/formatters';

interface ScrollAreaProps {
  children: React.ReactNode;
  maxHeight?: string;
  className?: string;
}

export function ScrollArea({ children, maxHeight = '400px', className }: ScrollAreaProps) {
  return (
    <div
      className={cn(
        'overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent hover:scrollbar-thumb-white/20',
        className
      )}
      style={{ maxHeight }}
    >
      {children}
    </div>
  );
}
