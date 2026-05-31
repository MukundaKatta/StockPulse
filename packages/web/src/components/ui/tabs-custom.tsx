'use client';

import { useState } from 'react';
import { cn } from '@/lib/formatters';

interface TabItem {
  key: string;
  label: string;
  content: React.ReactNode;
  count?: number;
}

interface TabsCustomProps {
  tabs: TabItem[];
  defaultTab?: string;
  variant?: 'underline' | 'pills';
  className?: string;
}

export function TabsCustom({ tabs, defaultTab, variant = 'underline', className }: TabsCustomProps) {
  const [active, setActive] = useState(defaultTab || tabs[0]?.key || '');

  const activeTab = tabs.find((t) => t.key === active);

  return (
    <div className={className}>
      <div className={cn('flex gap-1', variant === 'underline' ? 'border-b border-white/[0.06] mb-4' : 'rounded-lg bg-white/5 p-1 mb-4')}>
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActive(tab.key)}
            className={cn(
              'px-4 py-2 text-sm font-medium transition-colors',
              variant === 'underline'
                ? cn('border-b-2 -mb-px', active === tab.key ? 'text-indigo-400 border-indigo-400' : 'text-gray-500 border-transparent hover:text-gray-300')
                : cn('rounded-md', active === tab.key ? 'bg-indigo-500/20 text-indigo-400' : 'text-gray-500 hover:text-gray-300'),
            )}
          >
            {tab.label}
            {tab.count !== undefined && (
              <span className="ml-1.5 rounded-full bg-white/5 px-1.5 py-0.5 text-[10px] text-gray-500">{tab.count}</span>
            )}
          </button>
        ))}
      </div>
      {activeTab && <div>{activeTab.content}</div>}
    </div>
  );
}
