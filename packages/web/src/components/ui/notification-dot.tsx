import { cn } from '@/lib/formatters';

interface NotificationDotProps {
  show?: boolean;
  color?: 'red' | 'green' | 'blue' | 'amber' | 'indigo';
  size?: 'sm' | 'md' | 'lg';
  pulse?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const colorClasses = {
  red: 'bg-red-500',
  green: 'bg-green-500',
  blue: 'bg-blue-500',
  amber: 'bg-amber-500',
  indigo: 'bg-indigo-500',
};

const pulseColorClasses = {
  red: 'bg-red-400',
  green: 'bg-green-400',
  blue: 'bg-blue-400',
  amber: 'bg-amber-400',
  indigo: 'bg-indigo-400',
};

const sizeClasses = {
  sm: 'h-1.5 w-1.5',
  md: 'h-2.5 w-2.5',
  lg: 'h-3.5 w-3.5',
};

export function NotificationDot({
  show = true,
  color = 'red',
  size = 'md',
  pulse = false,
  className,
  children,
}: NotificationDotProps) {
  if (!children) {
    return show ? (
      <span
        className={cn(
          'inline-block rounded-full',
          sizeClasses[size],
          colorClasses[color],
          className
        )}
      />
    ) : null;
  }

  return (
    <span className={cn('relative inline-flex', className)}>
      {children}
      {show && (
        <span className="absolute -right-0.5 -top-0.5 flex">
          {pulse && (
            <span
              className={cn(
                'absolute inline-flex h-full w-full animate-ping rounded-full opacity-75',
                pulseColorClasses[color]
              )}
            />
          )}
          <span
            className={cn(
              'relative inline-flex rounded-full',
              sizeClasses[size],
              colorClasses[color]
            )}
          />
        </span>
      )}
    </span>
  );
}
