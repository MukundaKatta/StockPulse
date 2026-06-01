'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn, formatLargeNumber } from '@/lib/formatters';
import { DollarSign } from 'lucide-react';

interface CapitalGain {
  symbol: string;
  name: string;
  buyPrice: number;
  sellPrice: number;
  shares: number;
  gainLoss: number;
  gainPct: number;
  holdingPeriod: string;
  term: 'Short' | 'Long';
  dateSold: string;
}

const GAINS: CapitalGain[] = [
  { symbol: 'AAPL', name: 'Apple Inc', buyPrice: 142.50, sellPrice: 195.80, shares: 200, gainLoss: 10660, gainPct: 37.4, holdingPeriod: '14 months', term: 'Long', dateSold: '2024-01-15' },
  { symbol: 'TSLA', name: 'Tesla Inc', buyPrice: 248.20, sellPrice: 198.50, shares: 50, gainLoss: -2485, gainPct: -20.0, holdingPeriod: '8 months', term: 'Short', dateSold: '2024-02-08' },
  { symbol: 'MSFT', name: 'Microsoft', buyPrice: 285.00, sellPrice: 405.60, shares: 100, gainLoss: 12060, gainPct: 42.3, holdingPeriod: '18 months', term: 'Long', dateSold: '2024-01-22' },
  { symbol: 'NVDA', name: 'NVIDIA Corp', buyPrice: 180.40, sellPrice: 680.20, shares: 75, gainLoss: 37485, gainPct: 277.0, holdingPeriod: '13 months', term: 'Long', dateSold: '2024-03-01' },
  { symbol: 'META', name: 'Meta Platforms', buyPrice: 315.50, sellPrice: 485.20, shares: 60, gainLoss: 10182, gainPct: 53.8, holdingPeriod: '11 months', term: 'Short', dateSold: '2024-02-14' },
  { symbol: 'AMZN', name: 'Amazon', buyPrice: 128.90, sellPrice: 172.40, shares: 150, gainLoss: 6525, gainPct: 33.7, holdingPeriod: '16 months', term: 'Long', dateSold: '2024-01-30' },
  { symbol: 'GOOGL', name: 'Alphabet', buyPrice: 138.20, sellPrice: 125.40, shares: 120, gainLoss: -1536, gainPct: -9.3, holdingPeriod: '5 months', term: 'Short', dateSold: '2024-03-12' },
  { symbol: 'JPM', name: 'JP Morgan', buyPrice: 148.60, sellPrice: 192.80, shares: 80, gainLoss: 3536, gainPct: 29.7, holdingPeriod: '22 months', term: 'Long', dateSold: '2024-02-28' },
];

export default function CapitalGainsPage() {
  const totalGains = GAINS.filter((g) => g.gainLoss > 0).reduce((s, g) => s + g.gainLoss, 0);
  const totalLosses = GAINS.filter((g) => g.gainLoss < 0).reduce((s, g) => s + g.gainLoss, 0);
  const netGainLoss = totalGains + totalLosses;
  const longTermGains = GAINS.filter((g) => g.term === 'Long').reduce((s, g) => s + g.gainLoss, 0);

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Capital Gains</h1>
        <p className="mt-1 text-sm text-gray-500">Realized capital gains and losses summary</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Total Gains</p><p className="text-lg font-bold text-green-400">{formatLargeNumber(totalGains)}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Total Losses</p><p className="text-lg font-bold text-red-400">{formatLargeNumber(Math.abs(totalLosses))}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Net Gain/Loss</p><p className={cn('text-lg font-bold', netGainLoss >= 0 ? 'text-green-400' : 'text-red-400')}>{formatLargeNumber(Math.abs(netGainLoss))}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Long-Term</p><p className="text-lg font-bold text-indigo-400">{formatLargeNumber(longTermGains)}</p></Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><DollarSign className="h-4 w-4 text-indigo-400" /> Realized Transactions</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {GAINS.sort((a, b) => b.gainLoss - a.gainLoss).map((g) => (
            <div key={g.symbol} className="flex items-center gap-3 py-2.5 px-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-white">{g.symbol}</span>
                  <span className="text-[10px] text-gray-500">{g.name}</span>
                  <Badge variant={g.term === 'Long' ? 'info' : 'warning'}>{g.term}-Term</Badge>
                </div>
                <p className="text-[10px] text-gray-500">{g.shares} shares - Sold {g.dateSold}</p>
              </div>
              <span className={cn('text-sm font-mono font-bold', g.gainLoss >= 0 ? 'text-green-400' : 'text-red-400')}>
                {g.gainLoss >= 0 ? '+' : ''}{formatLargeNumber(g.gainLoss)}
              </span>
              <span className={cn('text-xs font-mono w-16 text-right', g.gainPct >= 0 ? 'text-green-400' : 'text-red-400')}>
                {g.gainPct >= 0 ? '+' : ''}{g.gainPct.toFixed(1)}%
              </span>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
