import { useState, useRef } from 'react';
import { cn } from '@/lib/formatters';

interface HoverCardProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  side?: 'top' | 'bottom';
  align?: 'start' | 'center' | 'end';
  delayMs?: number;
  className?: string;
}

export function HoverCard({
  trigger,
  children,
  side = 'bottom',
  align = 'center',
  delayMs = 200,
  className,
}: HoverCardProps) {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setOpen(true), delayMs);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setOpen(false), 150);
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {trigger}
      {open && (
        <div
          className={cn(
            'absolute z-50 w-64 rounded-lg border border-gray-700 bg-gray-800 p-4 shadow-xl',
            'animate-in fade-in-0 zoom-in-95',
            side === 'top' && 'bottom-full mb-2',
            side === 'bottom' && 'top-full mt-2',
            align === 'start' && 'left-0',
            align === 'center' && 'left-1/2 -translate-x-1/2',
            align === 'end' && 'right-0',
            className
          )}
        >
          {children}
        </div>
      )}
    </div>
  );
}
