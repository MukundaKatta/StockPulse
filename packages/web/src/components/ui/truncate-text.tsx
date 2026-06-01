'use client';

import { useState } from 'react';
import { cn } from '@/lib/formatters';

interface TruncateTextProps {
  text: string;
  maxLength: number;
  className?: string;
}

export function TruncateText({ text, maxLength, className }: TruncateTextProps) {
  const [expanded, setExpanded] = useState(false);
  const shouldTruncate = text.length > maxLength;

  if (!shouldTruncate) {
    return <span className={cn('text-sm text-gray-300', className)}>{text}</span>;
  }

  return (
    <span className={cn('text-sm text-gray-300', className)}>
      {expanded ? text : `${text.slice(0, maxLength)}...`}
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="ml-1 text-indigo-400 hover:text-indigo-300 text-xs font-medium transition-colors"
      >
        {expanded ? 'show less' : 'show more'}
      </button>
    </span>
  );
}
