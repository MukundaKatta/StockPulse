'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn, formatCurrency } from '@/lib/formatters';
import { AlertTriangle } from 'lucide-react';

interface ConcentrationEntry {
  holding: string;
  ticker: string;
  value: number;
  portfolioPct: number;
  sectorPct: number;
  maxAllowed: number;
  riskLevel: 'Low' | 'Elevated' | 'High' | 'Critical';
}

const HOLDINGS: ConcentrationEntry[] = [
  { holding: 'NVIDIA Corp', ticker: 'NVDA', value: 185000, portfolioPct: 28.5, sectorPct: 65.2, maxAllowed: 10, riskLevel: 'Critical' },
  { holding: 'Apple Inc', ticker: 'AAPL', value: 95000, portfolioPct: 14.6, sectorPct: 33.5, maxAllowed: 10, riskLevel: 'High' },
  { holding: 'Microsoft', ticker: 'MSFT', value: 82000, portfolioPct: 12.6, sectorPct: 28.9, maxAllowed: 10, riskLevel: 'High' },
  { holding: 'S&P 500 ETF', ticker: 'SPY', value: 120000, portfolioPct: 18.5, sectorPct: 100, maxAllowed: 25, riskLevel: 'Low' },
  { holding: 'Bond Fund', ticker: 'BND', value: 65000, portfolioPct: 10.0, sectorPct: 100, maxAllowed: 20, riskLevel: 'Low' },
  { holding: 'Tesla Inc', ticker: 'TSLA', value: 58000, portfolioPct: 8.9, sectorPct: 20.4, maxAllowed: 10, riskLevel: 'Elevated' },
  { holding: 'Amazon', ticker: 'AMZN', value: 45000, portfolioPct: 6.9, sectorPct: 15.9, maxAllowed: 10, riskLevel: 'Low' },
];

const riskVariant = (r: string) => r === 'Low' ? 'success' : r === 'Critical' ? 'danger' : r === 'High' ? 'danger' : 'warning';

export default function ConcentrationRiskPage() {
  const totalValue = HOLDINGS.reduce((s, h) => s + h.value, 0);
  const topHoldingPct = Math.max(...HOLDINGS.map(h => h.portfolioPct));
  const overConcentrated = HOLDINGS.filter(h => h.portfolioPct > h.maxAllowed).length;
  const hhi = HOLDINGS.reduce((s, h) => s + Math.pow(h.portfolioPct, 2), 0);

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Concentration Risk</h1>
        <p className="mt-1 text-sm text-gray-500">Portfolio concentration risk analysis</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="!p-3 text-center"><p className="text-[10px] text-gray-500 uppercase">Portfolio</p><p className="text-lg font-bold text-white">{formatCurrency(totalValue)}</p></Card>
        <Card className="!p-3 text-center"><p className="text-[10px] text-gray-500 uppercase">Top Holding</p><p className="text-lg font-bold text-red-400">{topHoldingPct.toFixed(1)}%</p></Card>
        <Card className="!p-3 text-center"><p className="text-[10px] text-gray-500 uppercase">Over Limit</p><p className="text-lg font-bold text-yellow-400">{overConcentrated}</p></Card>
        <Card className="!p-3 text-center"><p className="text-[10px] text-gray-500 uppercase">HHI Index</p><p className="text-lg font-bold text-indigo-400">{hhi.toFixed(0)}</p></Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><AlertTriangle className="h-4 w-4 text-yellow-400" /> Concentration Analysis</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {HOLDINGS.map((h) => (
            <div key={h.ticker} className="flex items-center justify-between px-4 py-3">
              <div>
                <p className="text-sm font-medium text-white">{h.ticker} <span className="text-gray-500">{h.holding}</span></p>
                <p className="text-xs text-gray-500">Sector {h.sectorPct}% &middot; Max {h.maxAllowed}%</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-mono text-white">{formatCurrency(h.value)}</p>
                  <p className={cn('text-[10px] font-mono', h.portfolioPct > h.maxAllowed ? 'text-red-400' : 'text-green-400')}>{h.portfolioPct}% of portfolio</p>
                </div>
                <Badge variant={riskVariant(h.riskLevel)}>{h.riskLevel}</Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
