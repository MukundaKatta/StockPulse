import { cn } from '@/lib/formatters';

interface HeatCellProps {
  value: number;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

function getHeatColor(value: number): string {
  if (value >= 3) return 'bg-green-500/30 text-green-300';
  if (value >= 1) return 'bg-green-500/15 text-green-400';
  if (value >= 0) return 'bg-gray-500/10 text-gray-300';
  if (value >= -1) return 'bg-red-500/15 text-red-400';
  return 'bg-red-500/30 text-red-300';
}

export function HeatCell({ value, label, size = 'md', className }: HeatCellProps) {
  const sizeClasses = {
    sm: 'h-8 w-12 text-[9px]',
    md: 'h-10 w-16 text-[10px]',
    lg: 'h-12 w-20 text-xs',
  };

  return (
    <div className={cn('flex flex-col items-center justify-center rounded', getHeatColor(value), sizeClasses[size], className)}>
      <span className="font-mono font-bold">{value >= 0 ? '+' : ''}{value.toFixed(1)}%</span>
      {label && <span className="text-[8px] opacity-60">{label}</span>}
    </div>
  );
}
