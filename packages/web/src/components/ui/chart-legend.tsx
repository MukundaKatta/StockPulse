import { cn } from '@/lib/formatters';

interface LegendItem {
  label: string;
  color: string;
  value?: string;
}

interface ChartLegendProps {
  items: LegendItem[];
  direction?: 'horizontal' | 'vertical';
  size?: 'sm' | 'md';
  className?: string;
}

export function ChartLegend({ items, direction = 'horizontal', size = 'md', className }: ChartLegendProps) {
  return (
    <div className={cn('flex gap-3', direction === 'vertical' ? 'flex-col gap-1.5' : 'flex-wrap', className)}>
      {items.map((item) => (
        <div key={item.label} className="flex items-center gap-1.5">
          <span className={cn('rounded-full', size === 'sm' ? 'h-1.5 w-1.5' : 'h-2 w-2', item.color)} />
          <span className={cn('text-gray-400', size === 'sm' ? 'text-[9px]' : 'text-[10px]')}>{item.label}</span>
          {item.value && <span className={cn('font-mono text-white', size === 'sm' ? 'text-[9px]' : 'text-[10px]')}>{item.value}</span>}
        </div>
      ))}
    </div>
  );
}
