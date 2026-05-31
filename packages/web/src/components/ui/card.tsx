import { cn } from '@/lib/formatters';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export function Card({ children, className, hover, onClick }: CardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        'rounded-xl border border-white/[0.06] bg-[#12121a] p-4',
        hover && 'transition-all duration-200 hover:border-indigo-500/30 hover:shadow-lg hover:shadow-indigo-500/5 hover:-translate-y-0.5',
        onClick && 'cursor-pointer',
        className
      )}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn('mb-3 flex items-center justify-between', className)}>{children}</div>;
}

export function CardTitle({ children, className }: { children: React.ReactNode; className?: string }) {
  return <h3 className={cn('text-sm font-medium text-gray-400', className)}>{children}</h3>;
}
