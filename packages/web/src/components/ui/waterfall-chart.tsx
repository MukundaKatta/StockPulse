import { cn } from '@/lib/formatters';

interface WaterfallItem {
  label: string;
  value: number;
}

interface WaterfallChartProps {
  items: WaterfallItem[];
  className?: string;
}

export function WaterfallChart({ items, className }: WaterfallChartProps) {
  const maxAbsValue = Math.max(...items.map((item) => Math.abs(item.value)), 1);

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      {items.map((item) => {
        const widthPercent = (Math.abs(item.value) / maxAbsValue) * 100;
        const isPositive = item.value >= 0;

        return (
          <div key={item.label} className="flex items-center gap-3">
            <span className="w-24 shrink-0 text-right text-xs text-gray-500">
              {item.label}
            </span>
            <div className="flex-1">
              <div className="relative h-5 w-full overflow-hidden rounded bg-white/[0.03]">
                <div
                  className={cn(
                    'absolute top-0 h-full rounded transition-all',
                    isPositive ? 'left-1/2 bg-green-500/60' : 'right-1/2 bg-red-500/60'
                  )}
                  style={{ width: `${widthPercent / 2}%` }}
                />
              </div>
            </div>
            <span
              className={cn(
                'w-16 shrink-0 text-right text-xs font-medium',
                isPositive ? 'text-green-400' : 'text-red-400'
              )}
            >
              {isPositive ? '+' : ''}
              {item.value}
            </span>
          </div>
        );
      })}
    </div>
  );
}
