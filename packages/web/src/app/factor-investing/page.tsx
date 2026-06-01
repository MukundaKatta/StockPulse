'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn, formatCurrency } from '@/lib/formatters';
import { Layers } from 'lucide-react';

interface FactorExposure {
  factor: string;
  etf: string;
  returnYTD: number;
  return1Y: number;
  sharpe: number;
  exposure: number;
  aum: string;
  momentum: 'Strong' | 'Moderate' | 'Weak';
}

const FACTORS: FactorExposure[] = [
  { factor: 'Momentum', etf: 'MTUM', returnYTD: 14.2, return1Y: 22.5, sharpe: 1.8, exposure: 0.95, aum: '$12.5B', momentum: 'Strong' },
  { factor: 'Value', etf: 'VLUE', returnYTD: 6.8, return1Y: 10.2, sharpe: 0.9, exposure: 0.88, aum: '$8.2B', momentum: 'Moderate' },
  { factor: 'Quality', etf: 'QUAL', returnYTD: 10.5, return1Y: 18.4, sharpe: 1.5, exposure: 0.92, aum: '$28.4B', momentum: 'Strong' },
  { factor: 'Low Volatility', etf: 'USMV', returnYTD: 4.2, return1Y: 8.8, sharpe: 1.2, exposure: 0.78, aum: '$25.1B', momentum: 'Weak' },
  { factor: 'Size (Small Cap)', etf: 'SIZE', returnYTD: 2.5, return1Y: 5.4, sharpe: 0.5, exposure: 0.82, aum: '$2.8B', momentum: 'Weak' },
  { factor: 'Growth', etf: 'IWF', returnYTD: 15.8, return1Y: 28.2, sharpe: 1.6, exposure: 0.90, aum: '$85.2B', momentum: 'Strong' },
  { factor: 'Dividend Yield', etf: 'HDV', returnYTD: 3.8, return1Y: 7.5, sharpe: 0.8, exposure: 0.85, aum: '$10.5B', momentum: 'Moderate' },
];

const momVariant = (m: string) => m === 'Strong' ? 'success' : m === 'Moderate' ? 'warning' : 'danger';

export default function FactorInvestingPage() {
  const avgReturn = FACTORS.reduce((s, f) => s + f.returnYTD, 0) / FACTORS.length;
  const strongFactors = FACTORS.filter(f => f.momentum === 'Strong').length;
  const avgSharpe = FACTORS.reduce((s, f) => s + f.sharpe, 0) / FACTORS.length;
  const bestFactor = FACTORS.reduce((best, f) => f.returnYTD > best.returnYTD ? f : best);

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Factor Investing</h1>
        <p className="mt-1 text-sm text-gray-500">Multi-factor exposure and performance dashboard</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Avg Return YTD</p><p className="text-lg font-bold text-green-400">{avgReturn.toFixed(1)}%</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Strong Factors</p><p className="text-lg font-bold text-white">{strongFactors}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Avg Sharpe</p><p className="text-lg font-bold text-indigo-400">{avgSharpe.toFixed(2)}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Top Factor</p><p className="text-lg font-bold text-amber-400">{bestFactor.factor}</p></Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><Layers className="h-4 w-4 text-indigo-400" /> Factor Performance</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {FACTORS.map((f) => (
            <div key={f.factor} className="flex items-center justify-between px-4 py-2.5">
              <div>
                <p className="text-sm font-medium text-white">{f.factor} <span className="text-gray-500">{f.etf}</span></p>
                <p className="text-xs text-gray-500">AUM {f.aum} &middot; Sharpe {f.sharpe} &middot; Exposure {f.exposure}</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-mono text-white">+{f.returnYTD}% YTD</p>
                  <p className="text-[10px] text-gray-500">1Y +{f.return1Y}%</p>
                </div>
                <Badge variant={momVariant(f.momentum)}>{f.momentum}</Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
