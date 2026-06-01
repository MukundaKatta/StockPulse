import { cn } from '@/lib/formatters';

interface InlineStatProps {
  label: string;
  value: string | number;
  suffix?: string;
  trend?: 'up' | 'down' | 'neutral';
  size?: 'sm' | 'md';
  className?: string;
}

export function InlineStat({ label, value, suffix, trend, size = 'md', className }: InlineStatProps) {
  const trendColor = trend === 'up' ? 'text-green-400' : trend === 'down' ? 'text-red-400' : 'text-white';

  return (
    <span className={cn('inline-flex items-center gap-1', className)}>
      <span className={cn('text-gray-500', size === 'sm' ? 'text-[9px]' : 'text-[10px]')}>{label}</span>
      <span className={cn('font-mono', trendColor, size === 'sm' ? 'text-[9px]' : 'text-[10px]')}>{value}{suffix}</span>
    </span>
  );
}
