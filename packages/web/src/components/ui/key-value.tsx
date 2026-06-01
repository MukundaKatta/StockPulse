import { cn } from '@/lib/formatters';

interface KeyValueProps {
  label: string;
  value: string | number;
  trend?: 'up' | 'down' | 'neutral';
  className?: string;
}

const trendColors = {
  up: 'text-green-400',
  down: 'text-red-400',
  neutral: 'text-gray-400',
};

export function KeyValue({ label, value, trend, className }: KeyValueProps) {
  return (
    <div className={cn('flex items-center justify-between py-1.5', className)}>
      <span className="text-sm text-gray-500">{label}</span>
      <span
        className={cn(
          'text-sm font-medium',
          trend ? trendColors[trend] : 'text-gray-200'
        )}
      >
        {value}
      </span>
    </div>
  );
}
