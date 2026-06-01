'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/formatters';
import { FlaskConical } from 'lucide-react';

interface Scenario {
  name: string;
  description: string;
  portfolioImpact: number;
  probability: string;
  severity: 'low' | 'medium' | 'high' | 'extreme';
  affectedAssets: string[];
}

const mockData: Scenario[] = [
  { name: 'Rate Hike +100bp', description: 'Fed raises rates by 100 basis points unexpectedly', portfolioImpact: -8.5, probability: '15%', severity: 'high', affectedAssets: ['Bonds', 'REITs', 'Growth'] },
  { name: 'Recession', description: 'US enters recession within 6 months', portfolioImpact: -22.3, probability: '25%', severity: 'extreme', affectedAssets: ['Equities', 'HY Bonds', 'Commodities'] },
  { name: 'Bull Market Cont.', description: 'Continued expansion with strong earnings', portfolioImpact: 15.8, probability: '35%', severity: 'low', affectedAssets: ['Equities', 'Small Cap'] },
  { name: 'Stagflation', description: 'High inflation with slowing growth', portfolioImpact: -14.2, probability: '10%', severity: 'high', affectedAssets: ['Bonds', 'Growth', 'Consumer'] },
  { name: 'USD Crash', description: 'Dollar index falls 15%+', portfolioImpact: -6.1, probability: '5%', severity: 'medium', affectedAssets: ['Intl Equity', 'Gold', 'Commodities'] },
  { name: 'Tech Correction', description: 'Tech sector drops 30%+', portfolioImpact: -18.7, probability: '20%', severity: 'extreme', affectedAssets: ['NASDAQ', 'Semiconductors', 'SaaS'] },
];

const summaryCards = [
  { label: 'Worst Case', value: '-22.3%', sub: 'Recession scenario' },
  { label: 'Best Case', value: '+15.8%', sub: 'Bull continuation' },
  { label: 'Expected Value', value: '-2.4%', sub: 'Probability weighted' },
  { label: 'Scenarios Run', value: '6', sub: 'Active models' },
];

const severityVariant: Record<string, 'success' | 'warning' | 'danger' | 'info'> = {
  low: 'success', medium: 'info', high: 'warning', extreme: 'danger',
};

export default function ScenarioAnalysisPage() {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Scenario Analysis</h1>
        <p className="mt-1 text-sm text-gray-500">Model portfolio outcomes under different market scenarios</p>
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
          <CardTitle>Scenario Models</CardTitle>
          <FlaskConical className="h-4 w-4 text-gray-500" />
        </CardHeader>
        <div className="space-y-3">
          {mockData.map((s) => (
            <div key={s.name} className="rounded-lg border border-white/[0.06] p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-white">{s.name}</p>
                  <Badge variant={severityVariant[s.severity]}>{s.severity}</Badge>
                </div>
                <p className={cn('text-sm font-semibold', s.portfolioImpact >= 0 ? 'text-green-400' : 'text-red-400')}>
                  {s.portfolioImpact >= 0 ? '+' : ''}{s.portfolioImpact}%
                </p>
              </div>
              <p className="mt-1 text-xs text-gray-500">{s.description}</p>
              <div className="mt-2 flex items-center gap-2">
                <span className="text-[10px] text-gray-600">Probability: {s.probability}</span>
                <span className="text-[10px] text-gray-600">|</span>
                {s.affectedAssets.map((a) => (
                  <span key={a} className="text-[10px] text-gray-500">{a}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
