'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn, formatCurrency } from '@/lib/formatters';
import { Percent } from 'lucide-react';

interface MarginData {
  symbol: string;
  name: string;
  operatingMargin: number;
  marginChange: number;
  revenue: number;
  operatingIncome: number;
  sector: string;
  fiveYearAvg: number;
}

const STOCKS: MarginData[] = [
  { symbol: 'NVDA', name: 'NVIDIA', operatingMargin: 54.1, marginChange: 18.2, revenue: 60.9, operatingIncome: 32.9, sector: 'Semis', fiveYearAvg: 35.8 },
  { symbol: 'MSFT', name: 'Microsoft', operatingMargin: 44.6, marginChange: 2.4, revenue: 227.6, operatingIncome: 101.5, sector: 'Software', fiveYearAvg: 42.1 },
  { symbol: 'AAPL', name: 'Apple', operatingMargin: 30.7, marginChange: -0.8, revenue: 383.3, operatingIncome: 117.7, sector: 'Hardware', fiveYearAvg: 29.4 },
  { symbol: 'META', name: 'Meta', operatingMargin: 41.2, marginChange: 16.8, revenue: 134.9, operatingIncome: 55.6, sector: 'Social', fiveYearAvg: 33.1 },
  { symbol: 'GOOGL', name: 'Alphabet', operatingMargin: 30.5, marginChange: 5.2, revenue: 307.4, operatingIncome: 93.8, sector: 'Ads', fiveYearAvg: 27.8 },
  { symbol: 'AMZN', name: 'Amazon', operatingMargin: 7.8, marginChange: 3.4, revenue: 574.8, operatingIncome: 44.8, sector: 'E-Comm', fiveYearAvg: 5.2 },
  { symbol: 'CRM', name: 'Salesforce', operatingMargin: 30.5, marginChange: 12.1, revenue: 34.9, operatingIncome: 10.6, sector: 'Software', fiveYearAvg: 18.4 },
  { symbol: 'TSLA', name: 'Tesla', operatingMargin: 8.2, marginChange: -8.5, revenue: 96.8, operatingIncome: 7.9, sector: 'Auto', fiveYearAvg: 11.4 },
];

export default function OperatingMarginPage() {
  const avgMargin = STOCKS.reduce((s, st) => s + st.operatingMargin, 0) / STOCKS.length;
  const improving = STOCKS.filter((s) => s.marginChange > 0).length;
  const highest = Math.max(...STOCKS.map((s) => s.operatingMargin));
  const aboveAvg = STOCKS.filter((s) => s.operatingMargin > s.fiveYearAvg).length;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Operating Margin</h1>
        <p className="mt-1 text-sm text-gray-500">Operating margin comparison across companies</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="!p-3">
          <p className="text-[10px] text-gray-500 uppercase">Avg Margin</p>
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
          <p className="text-[10px] text-gray-500 uppercase">Above 5Y Avg</p>
          <p className="text-lg font-bold text-green-400">{aboveAvg}</p>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sm">
            <Percent className="h-4 w-4 text-indigo-400" /> Operating Margins
          </CardTitle>
        </CardHeader>
        <div className="divide-y divide-white/5">
          {STOCKS.sort((a, b) => b.operatingMargin - a.operatingMargin).map((s) => (
            <div key={s.symbol} className="flex items-center gap-3 py-2 px-4">
              <div className="w-20">
                <p className="text-xs font-bold text-white">{s.symbol}</p>
                <p className="text-[10px] text-gray-500">{s.name}</p>
              </div>
              <Badge variant="info">{s.sector}</Badge>
              <span className="text-xs font-mono text-white w-12">{s.operatingMargin}%</span>
              <span className={cn('text-xs font-mono w-14', s.marginChange >= 0 ? 'text-green-400' : 'text-red-400')}>
                {s.marginChange >= 0 ? '+' : ''}{s.marginChange}%
              </span>
              <span className="text-[10px] text-gray-400 w-20">Rev: {formatCurrency(s.revenue)}B</span>
              <span className="text-[10px] text-gray-500 ml-auto">5Y Avg: {s.fiveYearAvg}%</span>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
