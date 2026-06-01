'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn, formatCurrency } from '@/lib/formatters';
import { BarChart3 } from 'lucide-react';

interface StockRatios {
  symbol: string;
  name: string;
  pe: number;
  pb: number;
  roe: number;
  debtEquity: number;
  currentRatio: number;
  profitMargin: number;
  health: 'Strong' | 'Fair' | 'Weak';
}

const STOCKS: StockRatios[] = [
  { symbol: 'AAPL', name: 'Apple', pe: 28.5, pb: 42.8, roe: 152.0, debtEquity: 1.8, currentRatio: 1.07, profitMargin: 25.3, health: 'Strong' },
  { symbol: 'MSFT', name: 'Microsoft', pe: 34.2, pb: 12.5, roe: 38.4, debtEquity: 0.4, currentRatio: 1.77, profitMargin: 35.1, health: 'Strong' },
  { symbol: 'GOOGL', name: 'Alphabet', pe: 24.8, pb: 6.2, roe: 26.5, debtEquity: 0.1, currentRatio: 2.15, profitMargin: 24.2, health: 'Strong' },
  { symbol: 'TSLA', name: 'Tesla', pe: 62.4, pb: 12.8, roe: 22.1, debtEquity: 0.1, currentRatio: 1.73, profitMargin: 8.2, health: 'Fair' },
  { symbol: 'META', name: 'Meta', pe: 26.1, pb: 7.8, roe: 28.5, debtEquity: 0.3, currentRatio: 2.68, profitMargin: 31.8, health: 'Strong' },
  { symbol: 'INTC', name: 'Intel', pe: 108.5, pb: 1.2, roe: 1.1, debtEquity: 0.5, currentRatio: 1.54, profitMargin: 1.8, health: 'Weak' },
  { symbol: 'BA', name: 'Boeing', pe: 0, pb: 0, roe: -45.2, debtEquity: -8.5, currentRatio: 1.12, profitMargin: -2.5, health: 'Weak' },
  { symbol: 'JNJ', name: 'Johnson & Johnson', pe: 10.8, pb: 5.4, roe: 51.2, debtEquity: 0.4, currentRatio: 1.18, profitMargin: 42.8, health: 'Strong' },
];

const healthVariant = (h: string) => h === 'Strong' ? 'success' : h === 'Fair' ? 'warning' : 'danger';

export default function FinancialRatiosPage() {
  const valid = STOCKS.filter(s => s.pe > 0);
  const avgPE = valid.reduce((s, st) => s + st.pe, 0) / valid.length;
  const strongCount = STOCKS.filter(s => s.health === 'Strong').length;
  const avgROE = STOCKS.filter(s => s.roe > 0).reduce((s, st) => s + st.roe, 0) / STOCKS.filter(s => s.roe > 0).length;
  const avgMargin = STOCKS.filter(s => s.profitMargin > 0).reduce((s, st) => s + st.profitMargin, 0) / STOCKS.filter(s => s.profitMargin > 0).length;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Financial Ratios</h1>
        <p className="mt-1 text-sm text-gray-500">Key financial ratio comparison across stocks</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Avg P/E</p><p className="text-lg font-bold text-white">{avgPE.toFixed(1)}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Strong Health</p><p className="text-lg font-bold text-green-400">{strongCount}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Avg ROE</p><p className="text-lg font-bold text-indigo-400">{avgROE.toFixed(1)}%</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Avg Margin</p><p className="text-lg font-bold text-amber-400">{avgMargin.toFixed(1)}%</p></Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><BarChart3 className="h-4 w-4 text-indigo-400" /> Ratio Comparison</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {STOCKS.map((s) => (
            <div key={s.symbol} className="flex items-center justify-between px-4 py-2.5">
              <div>
                <p className="text-sm font-medium text-white">{s.symbol} <span className="text-gray-500">{s.name}</span></p>
                <p className="text-xs text-gray-500">P/E {s.pe || 'N/A'} &middot; P/B {s.pb} &middot; D/E {s.debtEquity} &middot; CR {s.currentRatio}</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-mono text-white">ROE {s.roe > 0 ? s.roe + '%' : 'N/A'}</p>
                  <p className="text-[10px] text-gray-500">Margin {s.profitMargin}%</p>
                </div>
                <Badge variant={healthVariant(s.health)}>{s.health}</Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
