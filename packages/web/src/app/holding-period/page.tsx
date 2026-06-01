'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn, formatCurrency } from '@/lib/formatters';
import { Timer } from 'lucide-react';

interface HoldingAnalysis {
  symbol: string;
  name: string;
  entryPrice: number;
  currentPrice: number;
  holdingDays: number;
  totalReturn: number;
  annualizedReturn: number;
  taxStatus: 'Short-Term' | 'Long-Term' | 'Near LT';
  unrealizedPnL: number;
}

const HOLDINGS: HoldingAnalysis[] = [
  { symbol: 'AAPL', name: 'Apple', entryPrice: 145.50, currentPrice: 185.20, holdingDays: 485, totalReturn: 27.3, annualizedReturn: 20.5, taxStatus: 'Long-Term', unrealizedPnL: 3970.00 },
  { symbol: 'NVDA', name: 'NVIDIA', entryPrice: 45.80, currentPrice: 132.40, holdingDays: 720, totalReturn: 189.1, annualizedReturn: 95.8, taxStatus: 'Long-Term', unrealizedPnL: 17320.00 },
  { symbol: 'MSFT', name: 'Microsoft', entryPrice: 340.20, currentPrice: 404.80, holdingDays: 280, totalReturn: 19.0, annualizedReturn: 24.7, taxStatus: 'Near LT', unrealizedPnL: 6460.00 },
  { symbol: 'GOOGL', name: 'Alphabet', entryPrice: 125.40, currentPrice: 141.80, holdingDays: 165, totalReturn: 13.1, annualizedReturn: 28.9, taxStatus: 'Short-Term', unrealizedPnL: 3280.00 },
  { symbol: 'AMZN', name: 'Amazon', entryPrice: 148.50, currentPrice: 190.30, holdingDays: 390, totalReturn: 28.1, annualizedReturn: 26.3, taxStatus: 'Long-Term', unrealizedPnL: 4180.00 },
  { symbol: 'TSLA', name: 'Tesla', entryPrice: 265.40, currentPrice: 245.80, holdingDays: 95, totalReturn: -7.4, annualizedReturn: -28.4, taxStatus: 'Short-Term', unrealizedPnL: -1960.00 },
  { symbol: 'META', name: 'Meta', entryPrice: 310.50, currentPrice: 484.10, holdingDays: 550, totalReturn: 55.9, annualizedReturn: 37.1, taxStatus: 'Long-Term', unrealizedPnL: 8680.00 },
];

const taxVariant = (t: string) => t === 'Long-Term' ? 'success' : t === 'Near LT' ? 'warning' : 'danger';

export default function HoldingPeriodPage() {
  const avgHolding = HOLDINGS.reduce((s, h) => s + h.holdingDays, 0) / HOLDINGS.length;
  const totalPnL = HOLDINGS.reduce((s, h) => s + h.unrealizedPnL, 0);
  const longTerm = HOLDINGS.filter(h => h.taxStatus === 'Long-Term').length;
  const avgAnnReturn = HOLDINGS.reduce((s, h) => s + h.annualizedReturn, 0) / HOLDINGS.length;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Holding Period Analysis</h1>
        <p className="mt-1 text-sm text-gray-500">Position holding periods and tax efficiency</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Avg Holding</p><p className="text-lg font-bold text-white">{avgHolding.toFixed(0)} days</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Total Unreal. P&L</p><p className={cn('text-lg font-bold', totalPnL >= 0 ? 'text-green-400' : 'text-red-400')}>{formatCurrency(totalPnL)}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Long-Term</p><p className="text-lg font-bold text-indigo-400">{longTerm}/{HOLDINGS.length}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Avg Ann. Return</p><p className="text-lg font-bold text-amber-400">{avgAnnReturn.toFixed(1)}%</p></Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><Timer className="h-4 w-4 text-indigo-400" /> Position Analysis</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {HOLDINGS.map((h) => (
            <div key={h.symbol} className="flex items-center justify-between px-4 py-2.5">
              <div>
                <p className="text-sm font-medium text-white">{h.symbol} <span className="text-gray-500">{h.name}</span></p>
                <p className="text-xs text-gray-500">{h.holdingDays} days &middot; Entry {formatCurrency(h.entryPrice)} &middot; Ann. {h.annualizedReturn >= 0 ? '+' : ''}{h.annualizedReturn}%</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-mono text-white">{formatCurrency(h.currentPrice)}</p>
                  <p className={cn('text-[10px] font-mono', h.unrealizedPnL >= 0 ? 'text-green-400' : 'text-red-400')}>{h.unrealizedPnL >= 0 ? '+' : ''}{formatCurrency(h.unrealizedPnL)}</p>
                </div>
                <Badge variant={taxVariant(h.taxStatus)}>{h.taxStatus}</Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
