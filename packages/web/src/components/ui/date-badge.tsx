import { cn } from '@/lib/formatters';

interface DateBadgeProps {
  date: string;
  format?: 'short' | 'long' | 'relative';
  className?: string;
}

function formatDate(date: string, format: 'short' | 'long' | 'relative'): string {
  const d = new Date(date);
  if (format === 'relative') {
    const now = Date.now();
    const diff = now - d.getTime();
    const seconds = Math.floor(diff / 1000);
    if (seconds < 60) return 'just now';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  }
  if (format === 'long') {
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  }
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export function DateBadge({ date, format = 'short', className }: DateBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-md bg-white/5 px-2 py-0.5 text-[10px] font-mono text-gray-400 border border-white/10',
        className
      )}
    >
      {formatDate(date, format)}
    </span>
  );
}
