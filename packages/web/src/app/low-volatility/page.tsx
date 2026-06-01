'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/formatters';
import { Shield } from 'lucide-react';

interface LowVolStock {
  symbol: string;
  name: string;
  price: number;
  volatility30D: number;
  volatility1Y: number;
  beta: number;
  return1Y: number;
  sharpe: number;
  sector: string;
}

const mockData: LowVolStock[] = [
  { symbol: 'JNJ', name: 'Johnson & Johnson', price: 158.20, volatility30D: 12.5, volatility1Y: 14.8, beta: 0.55, return1Y: 8.2, sharpe: 0.55, sector: 'Healthcare' },
  { symbol: 'PG', name: 'Procter & Gamble', price: 162.80, volatility30D: 11.8, volatility1Y: 13.5, beta: 0.48, return1Y: 12.5, sharpe: 0.93, sector: 'Staples' },
  { symbol: 'KO', name: 'Coca-Cola', price: 58.50, volatility30D: 10.2, volatility1Y: 12.1, beta: 0.52, return1Y: 6.8, sharpe: 0.56, sector: 'Staples' },
  { symbol: 'WMT', name: 'Walmart', price: 168.40, volatility30D: 13.5, volatility1Y: 16.2, beta: 0.58, return1Y: 15.2, sharpe: 0.94, sector: 'Staples' },
  { symbol: 'NEE', name: 'NextEra Energy', price: 62.80, volatility30D: 14.2, volatility1Y: 18.5, beta: 0.62, return1Y: -5.2, sharpe: -0.28, sector: 'Utilities' },
  { symbol: 'CL', name: 'Colgate-Palmolive', price: 82.50, volatility30D: 11.5, volatility1Y: 13.8, beta: 0.50, return1Y: 10.8, sharpe: 0.78, sector: 'Staples' },
];

const summaryCards = [
  { label: 'Low Vol Premium', value: '+4.2%', sub: 'vs high vol basket' },
  { label: 'Avg Volatility', value: '12.3%', sub: 'Low vol quintile' },
  { label: 'Avg Beta', value: '0.54', sub: 'Low vol stocks' },
  { label: 'Sharpe Ratio', value: '0.72', sub: 'Low vol portfolio' },
];

export default function LowVolatilityPage() {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Low Volatility Anomaly</h1>
        <p className="mt-1 text-sm text-gray-500">Stocks with lower volatility that deliver superior risk-adjusted returns</p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {summaryCards.map((c) => (
          <Card key={c.label}>
            <p className="text-xs text-gray-500">{c.label}</p>
            <p className="mt-1 text-lg font-bold text-white">{c.value}</p>
            <p className="text-[11px] text-gray-600">{c.sub}</p>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Low Volatility Stocks</CardTitle>
          <Shield className="h-4 w-4 text-gray-500" />
        </CardHeader>
        <div className="space-y-3">
          {mockData.map((s) => (
            <div key={s.symbol} className="flex items-center justify-between rounded-lg border border-white/[0.06] p-3">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-bold text-white">{s.symbol}</p>
                  <span className="text-xs text-gray-500">{s.name}</span>
                  <Badge variant="info">{s.sector}</Badge>
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Vol 30D: {s.volatility30D}% | Vol 1Y: {s.volatility1Y}% | Beta: {s.beta} | Sharpe: {s.sharpe.toFixed(2)}
                </p>
              </div>
              <p className={cn('text-sm font-semibold', s.return1Y >= 0 ? 'text-green-400' : 'text-red-400')}>
                {s.return1Y >= 0 ? '+' : ''}{s.return1Y}%
              </p>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
