import { cn } from '@/lib/formatters';

interface SkeletonTableProps {
  rows?: number;
  columns?: number;
  className?: string;
}

export function SkeletonTable({ rows = 5, columns = 4, className }: SkeletonTableProps) {
  return (
    <div className={cn('w-full overflow-hidden rounded-lg border border-gray-800', className)}>
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-800 bg-gray-900/50">
            {Array.from({ length: columns }).map((_, colIdx) => (
              <th key={colIdx} className="px-4 py-3">
                <div className="h-4 w-24 animate-pulse rounded bg-gray-700" />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rows }).map((_, rowIdx) => (
            <tr
              key={rowIdx}
              className={cn(
                'border-b border-gray-800/50 last:border-b-0',
                rowIdx % 2 === 0 ? 'bg-gray-900/20' : 'bg-gray-900/40'
              )}
            >
              {Array.from({ length: columns }).map((_, colIdx) => (
                <td key={colIdx} className="px-4 py-3">
                  <div
                    className="h-4 animate-pulse rounded bg-gray-700/60"
                    style={{ width: `${60 + ((colIdx * 17 + rowIdx * 13) % 30)}%` }}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
