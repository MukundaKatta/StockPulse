import { cn } from '@/lib/formatters';

export type SortDirection = 'asc' | 'desc' | null;

interface Column {
  key: string;
  label: string;
  sortable?: boolean;
  align?: 'left' | 'center' | 'right';
}

interface DataTableHeaderProps {
  columns: Column[];
  sortKey?: string | null;
  sortDirection?: SortDirection;
  onSort?: (key: string) => void;
  className?: string;
}

function SortIndicator({ direction }: { direction: SortDirection }) {
  return (
    <span className="ml-1.5 inline-flex flex-col text-[10px] leading-none">
      <span className={cn(direction === 'asc' ? 'text-indigo-400' : 'text-gray-600')}>
        ▲
      </span>
      <span className={cn(direction === 'desc' ? 'text-indigo-400' : 'text-gray-600')}>
        ▼
      </span>
    </span>
  );
}

export function DataTableHeader({
  columns,
  sortKey,
  sortDirection,
  onSort,
  className,
}: DataTableHeaderProps) {
  return (
    <thead className={cn('border-b border-gray-800 bg-gray-900/60', className)}>
      <tr>
        {columns.map((col) => {
          const isActive = sortKey === col.key;
          const direction = isActive ? sortDirection ?? null : null;

          return (
            <th
              key={col.key}
              className={cn(
                'px-4 py-3 text-xs font-medium uppercase tracking-wider text-gray-400',
                col.align === 'center' && 'text-center',
                col.align === 'right' && 'text-right',
                col.sortable && 'cursor-pointer select-none hover:text-gray-200 transition-colors'
              )}
              onClick={() => col.sortable && onSort?.(col.key)}
            >
              <span className="inline-flex items-center">
                {col.label}
                {col.sortable && <SortIndicator direction={direction} />}
              </span>
            </th>
          );
        })}
      </tr>
    </thead>
  );
}
