import { cn } from '@/lib/formatters';

export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-lg bg-white/5',
        className
      )}
    />
  );
}

export function ChartSkeleton() {
  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        {Array.from({ length: 7 }).map((_, i) => (
          <Skeleton key={i} className="h-7 w-12" />
        ))}
      </div>
      <Skeleton className="h-[400px] w-full" />
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className="rounded-xl border border-white/[0.06] bg-[#12121a] p-4 space-y-3">
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-8 w-32" />
      <Skeleton className="h-3 w-20" />
    </div>
  );
}
