'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/formatters';
import { ArrowUpCircle } from 'lucide-react';

interface RatingChange {
  symbol: string;
  name: string;
  firm: string;
  action: 'Upgrade' | 'Downgrade' | 'Initiate' | 'Reiterate';
  from: string;
  to: string;
  priorPT: number;
  newPT: number;
  current: number;
  date: string;
}

const CHANGES: RatingChange[] = [
  { symbol: 'NVDA', name: 'NVIDIA', firm: 'Morgan Stanley', action: 'Upgrade', from: 'Equal Weight', to: 'Overweight', priorPT: 750, newPT: 1000, current: 878, date: '2024-02-12' },
  { symbol: 'META', name: 'Meta Platforms', firm: 'Goldman Sachs', action: 'Upgrade', from: 'Neutral', to: 'Buy', priorPT: 400, newPT: 535, current: 484, date: '2024-02-11' },
  { symbol: 'TSLA', name: 'Tesla Inc', firm: 'Bernstein', action: 'Downgrade', from: 'Market Perform', to: 'Underperform', priorPT: 250, newPT: 150, current: 188, date: '2024-02-10' },
  { symbol: 'AMD', name: 'AMD Inc', firm: 'KeyBanc', action: 'Initiate', from: '-', to: 'Overweight', priorPT: 0, newPT: 225, current: 172, date: '2024-02-09' },
  { symbol: 'AMZN', name: 'Amazon', firm: 'JP Morgan', action: 'Reiterate', from: 'Overweight', to: 'Overweight', priorPT: 185, newPT: 220, current: 178, date: '2024-02-08' },
  { symbol: 'AAPL', name: 'Apple Inc', firm: 'Barclays', action: 'Downgrade', from: 'Overweight', to: 'Equal Weight', priorPT: 200, newPT: 180, current: 186, date: '2024-02-07' },
  { symbol: 'CRM', name: 'Salesforce', firm: 'Piper Sandler', action: 'Upgrade', from: 'Neutral', to: 'Overweight', priorPT: 275, newPT: 340, current: 292, date: '2024-02-06' },
  { symbol: 'GOOGL', name: 'Alphabet', firm: 'UBS', action: 'Initiate', from: '-', to: 'Buy', priorPT: 0, newPT: 175, current: 141, date: '2024-02-05' },
];

export default function AnalystUpgradesPage() {
  const upgrades = CHANGES.filter((c) => c.action === 'Upgrade' || c.action === 'Initiate').length;
  const downgrades = CHANGES.filter((c) => c.action === 'Downgrade').length;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Analyst Upgrades & Downgrades</h1>
        <p className="mt-1 text-sm text-gray-500">Recent rating changes from Wall Street analysts</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Upgrades</p><p className="text-lg font-bold text-green-400">{upgrades}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Downgrades</p><p className="text-lg font-bold text-red-400">{downgrades}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Total Changes</p><p className="text-lg font-bold text-white">{CHANGES.length}</p></Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><ArrowUpCircle className="h-4 w-4 text-indigo-400" /> Recent Changes</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {CHANGES.map((c, i) => {
            const upside = c.newPT > 0 ? ((c.newPT - c.current) / c.current) * 100 : 0;
            const actionColor = c.action === 'Upgrade' ? 'success' : c.action === 'Downgrade' ? 'danger' : c.action === 'Initiate' ? 'info' : 'default';
            return (
              <div key={`${c.symbol}-${i}`} className="px-4 py-3 space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white">{c.symbol}</span>
                    <span className="text-[10px] text-gray-500">{c.name}</span>
                    <Badge variant={actionColor}>{c.action}</Badge>
                  </div>
                  <span className="text-[10px] text-gray-500">{c.date}</span>
                </div>
                <div className="flex items-center gap-2 text-[10px]">
                  <span className="text-gray-400">{c.firm}</span>
                  <span className="text-gray-600">|</span>
                  <span className="text-gray-500">{c.from}</span>
                  <span className="text-gray-600">&rarr;</span>
                  <span className="text-white">{c.to}</span>
                </div>
                <div className="flex gap-4 text-[10px]">
                  {c.priorPT > 0 && <span className="text-gray-400">Prior PT: <span className="font-mono text-gray-300">${c.priorPT}</span></span>}
                  <span className="text-gray-400">New PT: <span className="font-mono text-white">${c.newPT}</span></span>
                  <span className="text-gray-400">Current: <span className="font-mono text-white">${c.current}</span></span>
                  {c.newPT > 0 && (
                    <span className={cn('font-mono', upside >= 0 ? 'text-green-400' : 'text-red-400')}>
                      {upside >= 0 ? '+' : ''}{upside.toFixed(1)}% upside
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </motion.div>
  );
}
