import { cn } from '@/lib/formatters';

interface StatusDotProps {
  status: 'online' | 'offline' | 'busy' | 'away';
  pulse?: boolean;
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  className?: string;
}

const statusColors = {
  online: 'bg-green-500',
  offline: 'bg-gray-500',
  busy: 'bg-red-500',
  away: 'bg-yellow-500',
};

const pulseColors = {
  online: 'bg-green-400',
  offline: 'bg-gray-400',
  busy: 'bg-red-400',
  away: 'bg-yellow-400',
};

const sizeMap = {
  sm: 'h-1.5 w-1.5',
  md: 'h-2.5 w-2.5',
  lg: 'h-3.5 w-3.5',
};

export function StatusDot({ status, pulse = false, size = 'md', label, className }: StatusDotProps) {
  return (
    <span className={cn('inline-flex items-center gap-1.5', className)}>
      <span className="relative inline-flex">
        <span className={cn('rounded-full', sizeMap[size], statusColors[status])} />
        {pulse && status === 'online' && (
          <span className={cn('absolute inline-flex h-full w-full animate-ping rounded-full opacity-75', pulseColors[status])} />
        )}
      </span>
      {label && <span className="text-xs text-gray-400 capitalize">{label || status}</span>}
    </span>
  );
}
