import { cn } from '@/lib/formatters';

interface TrendBadgeProps {
  value: number;
  label?: string;
  showArrow?: boolean;
  size?: 'sm' | 'md';
  className?: string;
}

export function TrendBadge({ value, label, showArrow = true, size = 'md', className }: TrendBadgeProps) {
  const isPositive = value >= 0;
  const color = isPositive ? 'bg-green-500/15 text-green-400' : 'bg-red-500/15 text-red-400';
  const arrow = isPositive ? '▲' : '▼';

  return (
    <span className={cn('inline-flex items-center gap-1 rounded-full font-mono', color, size === 'sm' ? 'px-1.5 py-0.5 text-[9px]' : 'px-2 py-0.5 text-[10px]', className)}>
      {showArrow && <span className="text-[8px]">{arrow}</span>}
      {label && <span className="opacity-70">{label}</span>}
      {isPositive ? '+' : ''}{value.toFixed(2)}%
    </span>
  );
}
