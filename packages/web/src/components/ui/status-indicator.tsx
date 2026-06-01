import { cn } from '@/lib/formatters';

type Status = 'online' | 'offline' | 'busy' | 'away';

interface StatusIndicatorProps {
  status: Status;
  label?: string;
  className?: string;
}

const STATUS_COLORS: Record<Status, string> = {
  online: 'bg-green-400',
  offline: 'bg-gray-500',
  busy: 'bg-red-400',
  away: 'bg-yellow-400',
};

const STATUS_LABELS: Record<Status, string> = {
  online: 'Online',
  offline: 'Offline',
  busy: 'Busy',
  away: 'Away',
};

export function StatusIndicator({ status, label, className }: StatusIndicatorProps) {
  return (
    <span className={cn('inline-flex items-center gap-1.5', className)}>
      <span className={cn('h-2 w-2 rounded-full', STATUS_COLORS[status])} />
      <span className="text-xs text-gray-400">{label ?? STATUS_LABELS[status]}</span>
    </span>
  );
}
