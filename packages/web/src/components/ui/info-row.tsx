import { cn } from '@/lib/formatters';

interface InfoRowProps {
  label: string;
  value: React.ReactNode;
  className?: string;
  valueClassName?: string;
}

export function InfoRow({ label, value, className, valueClassName }: InfoRowProps) {
  return (
    <div className={cn('flex items-center justify-between py-1.5', className)}>
      <span className="text-xs text-gray-500">{label}</span>
      <span className={cn('text-xs font-mono text-gray-200', valueClassName)}>{value}</span>
    </div>
  );
}

interface InfoGroupProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export function InfoGroup({ title, children, className }: InfoGroupProps) {
  return (
    <div className={cn('space-y-0', className)}>
      {title && <p className="text-[10px] text-gray-600 uppercase tracking-wide mb-1">{title}</p>}
      <div className="divide-y divide-white/5">{children}</div>
    </div>
  );
}
