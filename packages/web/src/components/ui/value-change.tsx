import { cn } from '@/lib/formatters';

interface ValueChangeProps {
  value: number;
  previousValue: number;
  format?: 'currency' | 'percent' | 'number';
  showArrow?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function ValueChange({ value, previousValue, format = 'number', showArrow = true, size = 'md', className }: ValueChangeProps) {
  const change = value - previousValue;
  const changePct = previousValue !== 0 ? (change / previousValue) * 100 : 0;
  const isUp = change > 0;
  const isDown = change < 0;

  const textSize = size === 'sm' ? 'text-[10px]' : size === 'lg' ? 'text-sm' : 'text-xs';

  const formatted = format === 'currency'
    ? `$${Math.abs(change).toFixed(2)}`
    : format === 'percent'
    ? `${Math.abs(changePct).toFixed(2)}%`
    : Math.abs(change).toFixed(2);

  const arrow = isUp ? '▲' : isDown ? '▼' : '';

  return (
    <span className={cn('inline-flex items-center gap-0.5 font-mono', textSize, isUp ? 'text-green-400' : isDown ? 'text-red-400' : 'text-gray-400', className)}>
      {showArrow && arrow && <span className="text-[8px]">{arrow}</span>}
      {isUp ? '+' : isDown ? '-' : ''}{formatted}
    </span>
  );
}
