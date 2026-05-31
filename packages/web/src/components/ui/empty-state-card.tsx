import { cn } from '@/lib/formatters';
import { LucideIcon, Inbox } from 'lucide-react';

interface EmptyStateCardProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyStateCard({ icon: Icon = Inbox, title, description, action, className }: EmptyStateCardProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center py-12 px-6 text-center', className)}>
      <div className="rounded-full bg-white/5 p-4 mb-4">
        <Icon className="h-8 w-8 text-gray-500" />
      </div>
      <h3 className="text-sm font-medium text-gray-300">{title}</h3>
      {description && <p className="mt-1 text-xs text-gray-500 max-w-xs">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
