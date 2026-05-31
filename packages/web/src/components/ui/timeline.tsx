import { cn } from '@/lib/formatters';

interface TimelineItem {
  title: string;
  description?: string;
  time?: string;
  icon?: React.ReactNode;
  status?: 'completed' | 'active' | 'pending';
}

interface TimelineProps {
  items: TimelineItem[];
  className?: string;
}

export function Timeline({ items, className }: TimelineProps) {
  return (
    <div className={cn('space-y-0', className)}>
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        const statusColor = item.status === 'completed' ? 'bg-green-500' : item.status === 'active' ? 'bg-indigo-500' : 'bg-gray-600';
        return (
          <div key={i} className="flex gap-3">
            <div className="flex flex-col items-center">
              <div className={cn('w-2.5 h-2.5 rounded-full mt-1.5 shrink-0', statusColor)} />
              {!isLast && <div className="w-px flex-1 bg-white/[0.06] my-1" />}
            </div>
            <div className={cn('pb-4', isLast && 'pb-0')}>
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium text-white">{item.title}</p>
                {item.time && <span className="text-[10px] text-gray-600">{item.time}</span>}
              </div>
              {item.description && <p className="text-xs text-gray-500 mt-0.5">{item.description}</p>}
            </div>
          </div>
        );
      })}
    </div>
  );
}
