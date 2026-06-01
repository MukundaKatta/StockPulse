import { cn } from '@/lib/formatters';

interface CountBadgeProps {
  count: number;
  max?: number;
  color?: 'green' | 'red' | 'blue' | 'yellow' | 'gray';
  className?: string;
}

const COLORS = {
  green: 'bg-green-500/20 text-green-400',
  red: 'bg-red-500/20 text-red-400',
  blue: 'bg-indigo-500/20 text-indigo-400',
  yellow: 'bg-yellow-500/20 text-yellow-400',
  gray: 'bg-white/10 text-gray-400',
};

export function CountBadge({ count, max, color = 'gray', className }: CountBadgeProps) {
  const display = max !== undefined && count > max ? `${max}+` : String(count);

  return (
    <span
      className={cn(
        'inline-flex items-center justify-center rounded-full px-1.5 min-w-[20px] h-5 text-[10px] font-bold',
        COLORS[color],
        className
      )}
    >
      {display}
    </span>
  );
}
