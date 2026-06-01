'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/formatters';
import { Award } from 'lucide-react';

interface QualityStock {
  symbol: string;
  name: string;
  roe: number;
  roic: number;
  debtToEquity: number;
  earningsStability: number;
  grossMargin: number;
  qualityScore: number;
  rating: 'excellent' | 'good' | 'average' | 'poor';
}

const mockData: QualityStock[] = [
  { symbol: 'MSFT', name: 'Microsoft', roe: 38.5, roic: 28.2, debtToEquity: 0.35, earningsStability: 95, grossMargin: 69.8, qualityScore: 96, rating: 'excellent' },
  { symbol: 'AAPL', name: 'Apple', roe: 145.0, roic: 52.8, debtToEquity: 1.82, earningsStability: 92, grossMargin: 45.2, qualityScore: 88, rating: 'excellent' },
  { symbol: 'V', name: 'Visa', roe: 42.1, roic: 30.5, debtToEquity: 0.58, earningsStability: 90, grossMargin: 67.5, qualityScore: 92, rating: 'excellent' },
  { symbol: 'JNJ', name: 'Johnson & Johnson', roe: 22.8, roic: 18.5, debtToEquity: 0.45, earningsStability: 88, grossMargin: 68.1, qualityScore: 82, rating: 'good' },
  { symbol: 'PG', name: 'Procter & Gamble', roe: 28.5, roic: 19.2, debtToEquity: 0.72, earningsStability: 85, grossMargin: 51.2, qualityScore: 78, rating: 'good' },
  { symbol: 'F', name: 'Ford Motor', roe: 8.2, roic: 4.5, debtToEquity: 3.85, earningsStability: 42, grossMargin: 12.5, qualityScore: 28, rating: 'poor' },
];

const summaryCards = [
  { label: 'Factor Return', value: '+12.5%', sub: 'Top quintile YTD' },
  { label: 'Avg ROE', value: '38.5%', sub: 'Top quintile' },
  { label: 'Avg ROIC', value: '28.2%', sub: 'Top quintile' },
  { label: 'Sharpe Ratio', value: '1.62', sub: 'Risk-adjusted' },
];

const ratingVariant: Record<string, 'success' | 'info' | 'default' | 'danger'> = {
  excellent: 'success', good: 'info', average: 'default', poor: 'danger',
};

export default function QualityFactorPage() {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Quality Factor Analysis</h1>
        <p className="mt-1 text-sm text-gray-500">Rank stocks by profitability, stability, and financial health</p>
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
          <CardTitle>Quality Rankings</CardTitle>
          <Award className="h-4 w-4 text-gray-500" />
        </CardHeader>
        <div className="space-y-3">
          {mockData.map((s) => (
            <div key={s.symbol} className="flex items-center justify-between rounded-lg border border-white/[0.06] p-3">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-bold text-white">{s.symbol}</p>
                  <span className="text-xs text-gray-500">{s.name}</span>
                  <Badge variant={ratingVariant[s.rating]}>{s.rating}</Badge>
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  ROE: {s.roe}% | ROIC: {s.roic}% | D/E: {s.debtToEquity}x | Margin: {s.grossMargin}%
                </p>
              </div>
              <p className={cn('text-sm font-semibold', s.qualityScore >= 70 ? 'text-green-400' : s.qualityScore >= 40 ? 'text-amber-400' : 'text-red-400')}>
                {s.qualityScore}/100
              </p>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
