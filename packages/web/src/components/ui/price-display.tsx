import { cn } from '@/lib/formatters';

interface PriceDisplayProps {
  price: number;
  change?: number;
  changePct?: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function PriceDisplay({ price, change, changePct, size = 'md', className }: PriceDisplayProps) {
  const isPositive = (change ?? 0) >= 0;

  const priceSize = size === 'sm' ? 'text-sm' : size === 'lg' ? 'text-2xl' : 'text-lg';
  const changeSize = size === 'sm' ? 'text-[10px]' : size === 'lg' ? 'text-sm' : 'text-xs';

  return (
    <div className={cn('flex flex-col', className)}>
      <span className={cn('font-bold font-mono text-white', priceSize)}>
        ${price.toFixed(2)}
      </span>
      {(change !== undefined || changePct !== undefined) && (
        <span
          className={cn(
            'font-mono',
            changeSize,
            isPositive ? 'text-green-400' : 'text-red-400'
          )}
        >
          {change !== undefined && (
            <>{isPositive ? '+' : ''}{change.toFixed(2)}</>
          )}
          {change !== undefined && changePct !== undefined && ' '}
          {changePct !== undefined && (
            <>({isPositive ? '+' : ''}{changePct.toFixed(2)}%)</>
          )}
        </span>
      )}
    </div>
  );
}
