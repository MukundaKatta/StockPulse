import { cn } from '@/lib/formatters';

interface NotificationBadgeProps {
  count: number;
  max?: number;
  className?: string;
}

export function NotificationBadge({ count, max = 99, className }: NotificationBadgeProps) {
  if (count <= 0) return null;

  const display = count > max ? `${max}+` : String(count);

  return (
    <span
      className={cn(
        'inline-flex items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white min-w-[18px] h-[18px] px-1',
        className
      )}
    >
      {display}
    </span>
  );
}
