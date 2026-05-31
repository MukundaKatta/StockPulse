import { cn } from '@/lib/formatters';

interface MetricCardProps {
  label: string;
  value: string | number;
  subtitle?: string;
  trend?: { value: number; label?: string };
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function MetricCard({ label, value, subtitle, trend, size = 'md', className }: MetricCardProps) {
  const valueSize = size === 'sm' ? 'text-sm' : size === 'lg' ? 'text-2xl' : 'text-lg';

  return (
    <div className={cn('rounded-xl border border-white/[0.06] bg-[#12121a] p-4', className)}>
      <p className="text-[10px] text-gray-500 uppercase tracking-wide">{label}</p>
      <p className={cn('font-bold text-white mt-0.5', valueSize)}>{value}</p>
      {trend && (
        <p className={cn('text-xs font-mono mt-0.5', trend.value >= 0 ? 'text-green-400' : 'text-red-400')}>
          {trend.value >= 0 ? '+' : ''}{trend.value.toFixed(2)}%{trend.label ? ` ${trend.label}` : ''}
        </p>
      )}
      {subtitle && <p className="text-[10px] text-gray-600 mt-0.5">{subtitle}</p>}
    </div>
  );
}
