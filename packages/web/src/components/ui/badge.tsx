import { cn } from '@/lib/formatters';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'danger' | 'warning' | 'info';
  className?: string;
}

const variants = {
  default: 'bg-gray-500/10 text-gray-400',
  success: 'bg-green-500/15 text-green-400',
  danger: 'bg-red-500/15 text-red-400',
  warning: 'bg-amber-500/15 text-amber-400',
  info: 'bg-indigo-500/15 text-indigo-400',
};

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
