import { cn } from '@/lib/formatters';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface TrendArrowProps {
  value: number;
  showValue?: boolean;
  format?: 'percent' | 'number' | 'currency';
  size?: 'sm' | 'md';
  className?: string;
}

export function TrendArrow({ value, showValue = true, format = 'percent', size = 'md', className }: TrendArrowProps) {
  const isUp = value > 0;
  const isDown = value < 0;
  const iconSize = size === 'sm' ? 'h-3 w-3' : 'h-4 w-4';
  const textSize = size === 'sm' ? 'text-[10px]' : 'text-xs';

  const formatted = format === 'percent'
    ? `${isUp ? '+' : ''}${value.toFixed(2)}%`
    : format === 'currency'
    ? `${isUp ? '+' : ''}$${Math.abs(value).toFixed(2)}`
    : `${isUp ? '+' : ''}${value.toFixed(2)}`;

  return (
    <span className={cn('inline-flex items-center gap-0.5 font-mono', textSize, isUp ? 'text-green-400' : isDown ? 'text-red-400' : 'text-gray-400', className)}>
      {isUp ? <TrendingUp className={iconSize} /> : isDown ? <TrendingDown className={iconSize} /> : <Minus className={iconSize} />}
      {showValue && formatted}
    </span>
  );
}
