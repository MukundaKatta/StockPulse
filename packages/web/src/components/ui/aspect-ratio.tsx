import { cn } from '@/lib/formatters';

interface AspectRatioProps {
  ratio: number;
  children: React.ReactNode;
  className?: string;
}

export function AspectRatio({ ratio, children, className }: AspectRatioProps) {
  return (
    <div
      className={cn('relative w-full overflow-hidden', className)}
      style={{ paddingBottom: `${(1 / ratio) * 100}%` }}
    >
      <div className="absolute inset-0">{children}</div>
    </div>
  );
}
