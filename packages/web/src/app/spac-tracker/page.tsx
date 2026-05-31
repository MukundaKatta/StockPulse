'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatCurrency, cn } from '@/lib/formatters';
import { Rocket } from 'lucide-react';

interface SPAC {
  symbol: string;
  name: string;
  price: number;
  trustValue: number;
  premium: number;
  status: 'searching' | 'definitive_agreement' | 'completed';
  targetName?: string;
  deadline: string;
}

const SPACS: SPAC[] = [
  { symbol: 'PSNY', name: 'Polestar Automotive', price: 2.85, trustValue: 10.20, premium: -72.1, status: 'completed', targetName: 'Polestar', deadline: 'Completed' },
  { symbol: 'DKNG', name: 'DraftKings', price: 42.50, trustValue: 10.00, premium: 325, status: 'completed', targetName: 'DraftKings', deadline: 'Completed' },
  { symbol: 'IPOF', name: 'Social Capital VI', price: 10.15, trustValue: 10.10, premium: 0.5, status: 'searching', deadline: 'Sep 2024' },
  { symbol: 'AJAX', name: 'Ajax Financial', price: 10.25, trustValue: 10.20, premium: 0.5, status: 'definitive_agreement', targetName: 'TechFlow AI', deadline: 'Mar 2024' },
  { symbol: 'CCIV', name: 'Churchill Capital IV', price: 10.30, trustValue: 10.15, premium: 1.5, status: 'searching', deadline: 'Jun 2024' },
  { symbol: 'SPCE', name: 'Chamath Holdings', price: 10.45, trustValue: 10.20, premium: 2.5, status: 'definitive_agreement', targetName: 'GreenEnergy Corp', deadline: 'Apr 2024' },
];

export default function SPACTrackerPage() {
  const [filter, setFilter] = useState<'all' | 'searching' | 'definitive_agreement' | 'completed'>('all');

  const filtered = SPACS.filter((s) => filter === 'all' || s.status === filter);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4 sm:space-y-6"
    >
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">SPAC Tracker</h1>
        <p className="mt-1 text-sm text-gray-500">Track Special Purpose Acquisition Companies</p>
      </div>

      <div className="flex gap-2 flex-wrap">
        {(['all', 'searching', 'definitive_agreement', 'completed'] as const).map((f) => (
          <button key={f} onClick={() => setFilter(f)}
            className={cn('rounded-lg px-3 py-1.5 text-xs font-medium transition-colors', filter === f ? 'bg-indigo-500/10 text-indigo-400' : 'text-gray-500 hover:text-gray-300')}
          >{f === 'definitive_agreement' ? 'DA Signed' : f === 'all' ? 'All' : f.charAt(0).toUpperCase() + f.slice(1)}</button>
        ))}
      </div>

      <div className="space-y-2">
        {filtered.map((spac) => (
          <Card key={spac.symbol} className="!p-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <Rocket className="h-3.5 w-3.5 text-indigo-400" />
                  <span className="font-mono font-bold text-sm text-indigo-400">{spac.symbol}</span>
                  <Badge variant={spac.status === 'completed' ? 'success' : spac.status === 'definitive_agreement' ? 'warning' : 'info'}>
                    {spac.status === 'definitive_agreement' ? 'DA Signed' : spac.status}
                  </Badge>
                </div>
                <p className="text-xs text-gray-500 mt-0.5">
                  {spac.targetName ? `Target: ${spac.targetName}` : spac.name}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-mono text-white">{formatCurrency(spac.price)}</p>
                <p className={cn('text-[10px] font-mono', spac.premium > 5 ? 'text-amber-400' : spac.premium > 0 ? 'text-gray-400' : 'text-red-400')}>
                  {spac.premium > 0 ? '+' : ''}{spac.premium.toFixed(1)}% vs trust
                </p>
                <p className="text-[10px] text-gray-600">{spac.deadline}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </motion.div>
  );
}
