'use client';

import { useCallback, useRef, useEffect, useState } from 'react';
import { cn } from '@/lib/formatters';

interface RangeSliderProps {
  min: number;
  max: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
  step?: number;
  className?: string;
  formatLabel?: (value: number) => string;
}

export function RangeSlider({
  min,
  max,
  value,
  onChange,
  step = 1,
  className,
  formatLabel,
}: RangeSliderProps) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [dragging, setDragging] = useState<'min' | 'max' | null>(null);

  const clamp = useCallback(
    (val: number) => Math.min(max, Math.max(min, Math.round(val / step) * step)),
    [min, max, step]
  );

  const getPercent = useCallback(
    (val: number) => ((val - min) / (max - min)) * 100,
    [min, max]
  );

  const getValueFromPosition = useCallback(
    (clientX: number) => {
      const track = trackRef.current;
      if (!track) return min;
      const rect = track.getBoundingClientRect();
      const percent = (clientX - rect.left) / rect.width;
      return clamp(min + percent * (max - min));
    },
    [min, max, clamp]
  );

  const handleMouseDown = useCallback(
    (handle: 'min' | 'max') => () => {
      setDragging(handle);
    },
    []
  );

  useEffect(() => {
    if (!dragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      const newVal = getValueFromPosition(e.clientX);
      if (dragging === 'min') {
        onChange([Math.min(newVal, value[1]), value[1]]);
      } else {
        onChange([value[0], Math.max(newVal, value[0])]);
      }
    };

    const handleMouseUp = () => {
      setDragging(null);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragging, value, onChange, getValueFromPosition]);

  const minPercent = getPercent(value[0]);
  const maxPercent = getPercent(value[1]);
  const displayLabel = formatLabel ?? ((v: number) => String(v));

  return (
    <div className={cn('w-full px-2 py-4', className)}>
      <div className="relative mb-6 h-2" ref={trackRef}>
        {/* Track background */}
        <div className="absolute inset-0 rounded-full bg-gray-700" />

        {/* Active track */}
        <div
          className="absolute top-0 bottom-0 rounded-full bg-indigo-500"
          style={{
            left: `${minPercent}%`,
            right: `${100 - maxPercent}%`,
          }}
        />

        {/* Min handle */}
        <button
          type="button"
          className={cn(
            'absolute top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full',
            'border-2 border-indigo-500 bg-gray-900 shadow-lg',
            'cursor-grab transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-indigo-500/50',
            dragging === 'min' && 'cursor-grabbing scale-110'
          )}
          style={{ left: `${minPercent}%` }}
          onMouseDown={handleMouseDown('min')}
        />

        {/* Max handle */}
        <button
          type="button"
          className={cn(
            'absolute top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full',
            'border-2 border-indigo-500 bg-gray-900 shadow-lg',
            'cursor-grab transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-indigo-500/50',
            dragging === 'max' && 'cursor-grabbing scale-110'
          )}
          style={{ left: `${maxPercent}%` }}
          onMouseDown={handleMouseDown('max')}
        />
      </div>

      {/* Labels */}
      <div className="flex justify-between text-xs text-gray-400">
        <span>{displayLabel(value[0])}</span>
        <span>{displayLabel(value[1])}</span>
      </div>
    </div>
  );
}
