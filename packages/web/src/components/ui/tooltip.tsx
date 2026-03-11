'use client';

import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/formatters';

interface TooltipProps {
  content: string;
  children: React.ReactNode;
  className?: string;
}

export function Tooltip({ content, children, className }: TooltipProps) {
  const [show, setShow] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);

  const handleEnter = () => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setShow(true), 200);
  };

  const handleLeave = () => {
    clearTimeout(timeoutRef.current);
    setShow(false);
  };

  return (
    <span
      className={cn('relative inline-flex', className)}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onFocus={handleEnter}
      onBlur={handleLeave}
    >
      {children}
      {show && (
        <span
          role="tooltip"
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 max-w-[220px] rounded-lg border border-white/10 bg-[#1a1a2e] px-3 py-2 text-xs text-gray-300 shadow-xl whitespace-normal pointer-events-none"
        >
          {content}
          <span className="absolute top-full left-1/2 -translate-x-1/2 -mt-px border-4 border-transparent border-t-[#1a1a2e]" />
        </span>
      )}
    </span>
  );
}
