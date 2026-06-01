import { useState, useEffect } from 'react';
import { cn } from '@/lib/formatters';

interface CountdownTimerProps {
  targetDate: Date;
  onComplete?: () => void;
  showDays?: boolean;
  className?: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calcTimeLeft(target: Date): TimeLeft {
  const diff = Math.max(0, target.getTime() - Date.now());
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export function CountdownTimer({
  targetDate,
  onComplete,
  showDays = true,
  className,
}: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calcTimeLeft(targetDate));
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const tl = calcTimeLeft(targetDate);
      setTimeLeft(tl);

      if (tl.days === 0 && tl.hours === 0 && tl.minutes === 0 && tl.seconds === 0) {
        if (!completed) {
          setCompleted(true);
          onComplete?.();
        }
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate, onComplete, completed]);

  const segments = [
    ...(showDays ? [{ value: timeLeft.days, label: 'Days' }] : []),
    { value: timeLeft.hours, label: 'Hours' },
    { value: timeLeft.minutes, label: 'Min' },
    { value: timeLeft.seconds, label: 'Sec' },
  ];

  return (
    <div className={cn('inline-flex items-center gap-3', className)}>
      {segments.map((seg, index) => (
        <div key={seg.label} className="flex items-center gap-3">
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold tabular-nums text-gray-100">
              {String(seg.value).padStart(2, '0')}
            </span>
            <span className="text-[10px] uppercase tracking-wider text-gray-500">
              {seg.label}
            </span>
          </div>
          {index < segments.length - 1 && (
            <span className="text-xl font-bold text-gray-600 -mt-4">:</span>
          )}
        </div>
      ))}
    </div>
  );
}
