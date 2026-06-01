'use client';

import { useNetworkState } from '@/hooks/useNetworkState';
import { cn } from '@/lib/formatters';

interface OfflineIndicatorProps {
  className?: string;
}

export function OfflineIndicator({ className }: OfflineIndicatorProps) {
  const { online } = useNetworkState();

  if (online) return null;

  return (
    <div
      className={cn(
        'fixed bottom-0 left-0 right-0 z-50 bg-red-600 px-4 py-2 text-center text-sm font-medium text-white',
        className
      )}
    >
      You are currently offline. Some features may be unavailable.
    </div>
  );
}
