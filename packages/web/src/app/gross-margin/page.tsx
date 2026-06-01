'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn, formatCurrency } from '@/lib/formatters';
import { BarChart3 } from 'lucide-react';

interface GrossMarginData {
  symbol: string;
  name: string;
  grossMargin: number;
  marginChange: number;
  revenue: number;
  cogs: number;
  grossProfit: number;
  sector: string;
  quarterTrend: 'Up' | 'Down' | 'Flat';
}

const STOCKS: GrossMarginData[] = [
  { symbol: 'NVDA', name: 'NVIDIA', grossMargin: 72.7, marginChange: 8.4, revenue: 60.9, cogs: 16.6, grossProfit: 44.3, sector: 'Semis', quarterTrend: 'Up' },
  { symbol: 'MSFT', name: 'Microsoft', grossMargin: 69.4, marginChange: 1.2, revenue: 227.6, cogs: 69.6, grossProfit: 158.0, sector: 'Software', quarterTrend: 'Up' },
  { symbol: 'META', name: 'Meta', grossMargin: 80.8, marginChange: 2.5, revenue: 134.9, cogs: 25.9, grossProfit: 109.0, sector: 'Social', quarterTrend: 'Up' },
  { symbol: 'GOOGL', name: 'Alphabet', grossMargin: 57.5, marginChange: 1.8, revenue: 307.4, cogs: 130.6, grossProfit: 176.8, sector: 'Ads', quarterTrend: 'Up' },
  { symbol: 'AAPL', name: 'Apple', grossMargin: 45.0, marginChange: 0.4, revenue: 383.3, cogs: 210.8, grossProfit: 172.5, sector: 'Hardware', quarterTrend: 'Flat' },
  { symbol: 'AMZN', name: 'Amazon', grossMargin: 47.6, marginChange: 2.1, revenue: 574.8, cogs: 301.2, grossProfit: 273.6, sector: 'E-Comm', quarterTrend: 'Up' },
  { symbol: 'TSLA', name: 'Tesla', grossMargin: 18.2, marginChange: -7.8, revenue: 96.8, cogs: 79.2, grossProfit: 17.6, sector: 'Auto', quarterTrend: 'Down' },
  { symbol: 'CRM', name: 'Salesforce', grossMargin: 75.8, marginChange: 1.1, revenue: 34.9, cogs: 8.4, grossProfit: 26.5, sector: 'Software', quarterTrend: 'Flat' },
];

export default function GrossMarginPage() {
  const avgMargin = STOCKS.reduce((s, st) => s + st.grossMargin, 0) / STOCKS.length;
  const improving = STOCKS.filter((s) => s.marginChange > 0).length;
  const highest = Math.max(...STOCKS.map((s) => s.grossMargin));
  const totalGrossProfit = STOCKS.reduce((s, st) => s + st.grossProfit, 0);

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Gross Margin</h1>
        <p className="mt-1 text-sm text-gray-500">Gross margin trends and profitability analysis</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="!p-3">
          <p className="text-[10px] text-gray-500 uppercase">Avg Gross Margin</p>
          <p className="text-lg font-bold text-white">{avgMargin.toFixed(1)}%</p>
        </Card>
        <Card className="!p-3">
          <p className="text-[10px] text-gray-500 uppercase">Improving</p>
          <p className="text-lg font-bold text-green-400">{improving}/{STOCKS.length}</p>
        </Card>
        <Card className="!p-3">
          <p className="text-[10px] text-gray-500 uppercase">Highest</p>
          <p className="text-lg font-bold text-indigo-400">{highest}%</p>
        </Card>
        <Card className="!p-3">
          <p className="text-[10px] text-gray-500 uppercase">Total GP</p>
          <p className="text-lg font-bold text-white">{formatCurrency(totalGrossProfit)}B</p>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sm">
            <BarChart3 className="h-4 w-4 text-indigo-400" /> Gross Margin by Company
          </CardTitle>
        </CardHeader>
        <div className="divide-y divide-white/5">
          {STOCKS.sort((a, b) => b.grossMargin - a.grossMargin).map((s) => (
            <div key={s.symbol} className="flex items-center gap-3 py-2 px-4">
              <div className="w-20">
                <p className="text-xs font-bold text-white">{s.symbol}</p>
                <p className="text-[10px] text-gray-500">{s.name}</p>
              </div>
              <Badge variant={s.quarterTrend === 'Up' ? 'success' : s.quarterTrend === 'Down' ? 'danger' : 'default'}>
                {s.quarterTrend}
              </Badge>
              <span className="text-xs font-mono text-white w-12">{s.grossMargin}%</span>
              <span className={cn('text-xs font-mono w-14', s.marginChange >= 0 ? 'text-green-400' : 'text-red-400')}>
                {s.marginChange >= 0 ? '+' : ''}{s.marginChange}%
              </span>
              <span className="text-[10px] text-gray-400 w-16">GP: {formatCurrency(s.grossProfit)}B</span>
              <span className="text-[10px] text-gray-500 ml-auto">COGS: {formatCurrency(s.cogs)}B</span>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
