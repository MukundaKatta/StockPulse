import { cn } from '@/lib/formatters';

interface ActivityCardProps {
  title: string;
  description: string;
  time: string;
  icon?: React.ReactNode;
  className?: string;
}

export function ActivityCard({ title, description, time, icon, className }: ActivityCardProps) {
  return (
    <div
      className={cn(
        'flex items-start gap-3 rounded-lg border border-white/[0.06] bg-[#12121a] p-3',
        className
      )}
    >
      {icon && (
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-500/10 text-indigo-400">
          {icon}
        </div>
      )}
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-gray-200">{title}</p>
        <p className="mt-0.5 text-xs text-gray-500">{description}</p>
      </div>
      <span className="shrink-0 text-xs text-gray-600">{time}</span>
    </div>
  );
}
