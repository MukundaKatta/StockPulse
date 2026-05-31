import { cn } from '@/lib/formatters';
import { Check } from 'lucide-react';

interface StepIndicatorProps {
  steps: string[];
  currentStep: number;
  className?: string;
}

export function StepIndicator({ steps, currentStep, className }: StepIndicatorProps) {
  return (
    <div className={cn('flex items-center', className)}>
      {steps.map((step, i) => {
        const isComplete = i < currentStep;
        const isCurrent = i === currentStep;
        return (
          <div key={i} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center gap-1">
              <div className={cn(
                'h-7 w-7 rounded-full flex items-center justify-center text-xs font-medium border transition-colors',
                isComplete ? 'bg-green-500/20 border-green-500/50 text-green-400' :
                isCurrent ? 'bg-indigo-500/20 border-indigo-500/50 text-indigo-400' :
                'bg-white/5 border-white/10 text-gray-500'
              )}>
                {isComplete ? <Check className="h-3.5 w-3.5" /> : i + 1}
              </div>
              <span className={cn('text-[10px] whitespace-nowrap', isCurrent ? 'text-indigo-400' : isComplete ? 'text-green-400' : 'text-gray-600')}>{step}</span>
            </div>
            {i < steps.length - 1 && (
              <div className={cn('flex-1 h-px mx-2 mt-[-16px]', isComplete ? 'bg-green-500/30' : 'bg-white/5')} />
            )}
          </div>
        );
      })}
    </div>
  );
}
