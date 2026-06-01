import { cn } from '@/lib/formatters';

interface StatItem {
  label: string;
  value: string | number;
  color?: string;
}

interface StatGroupProps {
  items: StatItem[];
  className?: string;
}

export function StatGroup({ items, className }: StatGroupProps) {
  return (
    <div className={cn('flex items-center gap-6', className)}>
      {items.map((item) => (
        <div key={item.label} className="flex flex-col">
          <span className="text-xs text-gray-500">{item.label}</span>
          <span
            className={cn('text-sm font-semibold', item.color || 'text-gray-200')}
          >
            {item.value}
          </span>
        </div>
      ))}
    </div>
  );
}
