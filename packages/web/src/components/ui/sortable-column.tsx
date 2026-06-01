import { cn } from '@/lib/formatters';

type SortDirection = 'asc' | 'desc' | null;

interface SortableColumnProps {
  label: string;
  direction: SortDirection;
  onToggle: () => void;
  className?: string;
}

export function SortableColumn({ label, direction, onToggle, className }: SortableColumnProps) {
  return (
    <th
      className={cn(
        'cursor-pointer select-none px-4 py-3 text-left text-xs font-medium uppercase tracking-wider',
        'text-gray-400 transition-colors hover:text-gray-200',
        direction !== null && 'text-indigo-400',
        className
      )}
      onClick={onToggle}
    >
      <span className="inline-flex items-center gap-1.5">
        {label}
        <span className="inline-flex flex-col text-[10px] leading-none">
          <span
            className={cn(
              'transition-colors',
              direction === 'asc' ? 'text-indigo-400' : 'text-gray-600'
            )}
          >
            ▲
          </span>
          <span
            className={cn(
              'transition-colors',
              direction === 'desc' ? 'text-indigo-400' : 'text-gray-600'
            )}
          >
            ▼
          </span>
        </span>
      </span>
    </th>
  );
}
