import { cn } from '@/lib/formatters';

interface MetricRowProps {
  label: string;
  value: string | number;
  subValue?: string;
  trend?: 'up' | 'down' | 'neutral';
  className?: string;
}

export function MetricRow({ label, value, subValue, trend, className }: MetricRowProps) {
  return (
    <div className={cn('flex items-center justify-between py-2', className)}>
      <span className="text-xs text-gray-500">{label}</span>
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-white font-mono">{value}</span>
        {subValue && (
          <span className="text-[10px] text-gray-500">{subValue}</span>
        )}
        {trend && (
          <span
            className={cn(
              'text-[10px] font-medium',
              trend === 'up' ? 'text-green-400' : trend === 'down' ? 'text-red-400' : 'text-gray-400'
            )}
          >
            {trend === 'up' ? '▲' : trend === 'down' ? '▼' : '—'}
          </span>
        )}
      </div>
    </div>
  );
}
