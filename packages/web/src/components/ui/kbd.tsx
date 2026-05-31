import { cn } from '@/lib/formatters';

interface KbdProps {
  children: React.ReactNode;
  className?: string;
}

export function Kbd({ children, className }: KbdProps) {
  return (
    <kbd
      className={cn(
        'inline-flex items-center justify-center rounded border border-white/10 bg-white/5 px-1.5 py-0.5 text-[10px] font-mono font-medium text-gray-400',
        className
      )}
    >
      {children}
    </kbd>
  );
}
