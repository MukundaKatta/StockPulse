import { cn } from '@/lib/formatters';

interface PercentageBarProps {
  value: number;
  max?: number;
  label?: string;
  showValue?: boolean;
  color?: string;
  size?: 'sm' | 'md';
  className?: string;
}

export function PercentageBar({ value, max = 100, label, showValue = true, color = 'bg-indigo-500', size = 'md', className }: PercentageBarProps) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div className={cn('space-y-1', className)}>
      {(label || showValue) && (
        <div className="flex justify-between">
          {label && <span className={cn('text-gray-400', size === 'sm' ? 'text-[9px]' : 'text-[10px]')}>{label}</span>}
          {showValue && <span className={cn('font-mono text-white', size === 'sm' ? 'text-[9px]' : 'text-[10px]')}>{pct.toFixed(0)}%</span>}
        </div>
      )}
      <div className={cn('rounded bg-white/5', size === 'sm' ? 'h-1' : 'h-2')}>
        <div className={cn('h-full rounded transition-all', color)} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
