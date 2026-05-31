import { cn } from '@/lib/formatters';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface PriceChangeProps {
  value: number;
  showIcon?: boolean;
  showSign?: boolean;
  suffix?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeStyles = {
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-base',
};

export function PriceChange({ value, showIcon = false, showSign = true, suffix = '%', size = 'sm', className }: PriceChangeProps) {
  const isPositive = value > 0;
  const isNeutral = value === 0;
  const color = isPositive ? 'text-green-400' : isNeutral ? 'text-gray-400' : 'text-red-400';
  const Icon = isPositive ? TrendingUp : isNeutral ? Minus : TrendingDown;

  return (
    <span className={cn('inline-flex items-center gap-0.5 font-mono', color, sizeStyles[size], className)}>
      {showIcon && <Icon className={cn(size === 'sm' ? 'h-3 w-3' : size === 'md' ? 'h-3.5 w-3.5' : 'h-4 w-4')} />}
      {showSign && value > 0 ? '+' : ''}{value.toFixed(2)}{suffix}
    </span>
  );
}
