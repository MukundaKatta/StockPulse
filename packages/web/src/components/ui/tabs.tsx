'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/formatters';

interface TabsProps {
  tabs: string[];
  active: string;
  onChange: (tab: string) => void;
  layoutId?: string;
}

export function Tabs({ tabs, active, onChange, layoutId = 'tabs' }: TabsProps) {
  return (
    <div className="flex gap-1 border-b border-white/[0.06]" role="tablist">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          className={cn(
            'relative px-4 py-2.5 text-sm font-medium transition-all whitespace-nowrap',
            active === tab ? 'text-indigo-400' : 'text-gray-500 hover:text-gray-300'
          )}
          role="tab"
          aria-selected={active === tab}
        >
          {tab}
          {active === tab && (
            <motion.div
              layoutId={layoutId}
              className="absolute inset-x-0 bottom-0 h-0.5 bg-indigo-500"
            />
          )}
        </button>
      ))}
    </div>
  );
}
