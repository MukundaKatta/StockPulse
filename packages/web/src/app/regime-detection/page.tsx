'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/formatters';
import { Radar } from 'lucide-react';

interface MarketRegime {
  name: string;
  probability: number;
  duration: string;
  characteristics: string;
  recommendation: string;
  status: 'active' | 'emerging' | 'fading' | 'dormant';
}

const mockData: MarketRegime[] = [
  { name: 'Risk-On Rally', probability: 45, duration: '3-6 months', characteristics: 'Low VIX, rising equities, tight spreads', recommendation: 'Overweight equities, reduce hedges', status: 'active' },
  { name: 'Volatility Regime', probability: 25, duration: '1-3 months', characteristics: 'Rising VIX, sector rotation, high volume', recommendation: 'Increase hedges, reduce leverage', status: 'emerging' },
  { name: 'Bear Market', probability: 15, duration: '6-18 months', characteristics: 'Falling prices, widening spreads, fear', recommendation: 'Defensive positioning, raise cash', status: 'dormant' },
  { name: 'Rate Shock', probability: 10, duration: '1-2 months', characteristics: 'Rapid rate moves, bond selloff, USD rally', recommendation: 'Short duration, avoid rate-sensitive', status: 'fading' },
  { name: 'Inflation Surge', probability: 5, duration: '3-12 months', characteristics: 'Rising CPI, commodity rally, wage growth', recommendation: 'TIPS, commodities, value stocks', status: 'dormant' },
];

const summaryCards = [
  { label: 'Current Regime', value: 'Risk-On', sub: '45% confidence' },
  { label: 'Regime Duration', value: '47 days', sub: 'Since detection' },
  { label: 'Transition Risk', value: '25%', sub: 'Next 30 days' },
  { label: 'Model Accuracy', value: '78%', sub: 'Historical backtest' },
];

const statusVariant: Record<string, 'success' | 'info' | 'warning' | 'default'> = {
  active: 'success', emerging: 'info', fading: 'warning', dormant: 'default',
};

export default function RegimeDetectionPage() {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Market Regime Detection</h1>
        <p className="mt-1 text-sm text-gray-500">Identify current market regime using statistical models</p>
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
          <CardTitle>Detected Regimes</CardTitle>
          <Radar className="h-4 w-4 text-gray-500" />
        </CardHeader>
        <div className="space-y-3">
          {mockData.map((r) => (
            <div key={r.name} className="rounded-lg border border-white/[0.06] p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-white">{r.name}</p>
                  <Badge variant={statusVariant[r.status]}>{r.status}</Badge>
                </div>
                <p className={cn('text-sm font-semibold', r.probability >= 40 ? 'text-green-400' : r.probability >= 20 ? 'text-amber-400' : 'text-gray-400')}>
                  {r.probability}%
                </p>
              </div>
              <p className="mt-1 text-xs text-gray-500">{r.characteristics}</p>
              <p className="mt-1 text-xs text-indigo-400">Rec: {r.recommendation}</p>
              <p className="mt-1 text-[10px] text-gray-600">Expected Duration: {r.duration}</p>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
