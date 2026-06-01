'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/formatters';
import { Sliders } from 'lucide-react';

interface SensitivityFactor {
  factor: string;
  currentExposure: number;
  sensitivity: number;
  impact1Pct: number;
  direction: 'positive' | 'negative' | 'mixed';
  confidence: string;
}

const mockData: SensitivityFactor[] = [
  { factor: 'Interest Rates', currentExposure: -0.42, sensitivity: -3.8, impact1Pct: -3800, direction: 'negative', confidence: 'High' },
  { factor: 'S&P 500 (Beta)', currentExposure: 1.12, sensitivity: 1.12, impact1Pct: 11200, direction: 'positive', confidence: 'High' },
  { factor: 'USD Index', currentExposure: -0.18, sensitivity: -1.2, impact1Pct: -1200, direction: 'negative', confidence: 'Medium' },
  { factor: 'Oil Prices', currentExposure: 0.08, sensitivity: 0.35, impact1Pct: 350, direction: 'positive', confidence: 'Low' },
  { factor: 'VIX', currentExposure: -0.25, sensitivity: -0.8, impact1Pct: -800, direction: 'negative', confidence: 'Medium' },
  { factor: 'Credit Spreads', currentExposure: -0.15, sensitivity: -2.1, impact1Pct: -2100, direction: 'negative', confidence: 'Medium' },
];

const summaryCards = [
  { label: 'Most Sensitive', value: 'Rates', sub: '-3.8% per 1% move' },
  { label: 'Portfolio Beta', value: '1.12', sub: 'vs S&P 500' },
  { label: 'Factor Count', value: '6', sub: 'Tracked factors' },
  { label: 'R-Squared', value: '0.87', sub: 'Model fit' },
];

const dirVariant: Record<string, 'success' | 'danger' | 'warning'> = {
  positive: 'success', negative: 'danger', mixed: 'warning',
};

export default function SensitivityAnalysisPage() {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Sensitivity Analysis</h1>
        <p className="mt-1 text-sm text-gray-500">Measure portfolio sensitivity to key market factors</p>
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
          <CardTitle>Factor Sensitivities</CardTitle>
          <Sliders className="h-4 w-4 text-gray-500" />
        </CardHeader>
        <div className="space-y-3">
          {mockData.map((f) => (
            <div key={f.factor} className="flex items-center justify-between rounded-lg border border-white/[0.06] p-3">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-white">{f.factor}</p>
                  <Badge variant={dirVariant[f.direction]}>{f.direction}</Badge>
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Exposure: {f.currentExposure.toFixed(2)} | Impact/1%: ${f.impact1Pct.toLocaleString()} | Confidence: {f.confidence}
                </p>
              </div>
              <p className={cn('text-sm font-semibold', f.sensitivity >= 0 ? 'text-green-400' : 'text-red-400')}>
                {f.sensitivity >= 0 ? '+' : ''}{f.sensitivity.toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
