'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Keyboard } from 'lucide-react';

const shortcuts = [
  {
    category: 'Global',
    items: [
      { keys: ['Cmd/Ctrl', 'K'], description: 'Open search / command palette' },
      { keys: ['Cmd/Ctrl', 'B'], description: 'Toggle sidebar' },
      { keys: ['Cmd/Ctrl', 'Shift', 'D'], description: 'Toggle dark/light mode' },
      { keys: ['Esc'], description: 'Close modal / command palette' },
    ],
  },
  {
    category: 'Navigation (press g then...)',
    items: [
      { keys: ['g', 'h'], description: 'Go to Dashboard (home)' },
      { keys: ['g', 'p'], description: 'Go to Portfolio' },
      { keys: ['g', 's'], description: 'Go to Screener' },
      { keys: ['g', 'c'], description: 'Go to Compare' },
      { keys: ['g', 'a'], description: 'Go to Alerts' },
      { keys: ['g', 'n'], description: 'Go to News' },
      { keys: ['g', 'm'], description: 'Go to Heatmap' },
    ],
  },
];

export default function ShortcutsPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl space-y-4 sm:space-y-6"
    >
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Keyboard Shortcuts</h1>
        <p className="mt-1 text-sm text-gray-500">Navigate faster with keyboard shortcuts</p>
      </div>

      {shortcuts.map((group) => (
        <Card key={group.category}>
          <CardHeader>
            <CardTitle>
              <Keyboard className="mr-1 inline h-4 w-4" />
              {group.category}
            </CardTitle>
          </CardHeader>
          <div className="divide-y divide-white/[0.04]">
            {group.items.map((item) => (
              <div key={item.description} className="flex items-center justify-between py-2.5">
                <span className="text-sm text-gray-400">{item.description}</span>
                <div className="flex items-center gap-1">
                  {item.keys.map((key, i) => (
                    <span key={i}>
                      <kbd className="rounded border border-white/10 bg-white/5 px-2 py-0.5 text-xs font-mono text-gray-300">
                        {key}
                      </kbd>
                      {i < item.keys.length - 1 && <span className="mx-0.5 text-gray-600">+</span>}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Card>
      ))}
    </motion.div>
  );
}
