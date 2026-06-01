import { cn } from '@/lib/formatters';

interface CalloutProps {
  variant?: 'info' | 'warning' | 'error' | 'success';
  title?: string;
  children: React.ReactNode;
  className?: string;
}

const variants = {
  info: 'border-indigo-500/30 bg-indigo-500/5 text-indigo-300',
  warning: 'border-amber-500/30 bg-amber-500/5 text-amber-300',
  error: 'border-red-500/30 bg-red-500/5 text-red-300',
  success: 'border-green-500/30 bg-green-500/5 text-green-300',
};

const titleColors = {
  info: 'text-indigo-200',
  warning: 'text-amber-200',
  error: 'text-red-200',
  success: 'text-green-200',
};

export function Callout({ variant = 'info', title, children, className }: CalloutProps) {
  return (
    <div
      className={cn(
        'rounded-lg border px-4 py-3 text-sm',
        variants[variant],
        className
      )}
    >
      {title && (
        <p className={cn('mb-1 font-semibold', titleColors[variant])}>{title}</p>
      )}
      <div>{children}</div>
    </div>
  );
}
