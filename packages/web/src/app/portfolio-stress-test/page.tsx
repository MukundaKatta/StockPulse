'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn, formatCurrency } from '@/lib/formatters';
import { Shield } from 'lucide-react';

interface StressScenario {
  name: string;
  description: string;
  spxReturn: number;
  portfolioReturn: number;
  portfolioLoss: number;
  maxDrawdown: number;
  recoveryDays: number;
}

const SCENARIOS: StressScenario[] = [
  { name: '2008 Financial Crisis', description: 'Credit freeze, bank failures', spxReturn: -56.8, portfolioReturn: -48.2, portfolioLoss: -119834, maxDrawdown: 52.1, recoveryDays: 354 },
  { name: 'COVID Crash (2020)', description: 'Pandemic shutdown', spxReturn: -33.9, portfolioReturn: -28.5, portfolioLoss: -70893, maxDrawdown: 31.2, recoveryDays: 148 },
  { name: 'Dot-Com Bust', description: 'Tech bubble burst', spxReturn: -49.1, portfolioReturn: -42.8, portfolioLoss: -106446, maxDrawdown: 46.5, recoveryDays: 645 },
  { name: '2022 Bear Market', description: 'Rate hikes + inflation', spxReturn: -25.4, portfolioReturn: -22.1, portfolioLoss: -54953, maxDrawdown: 24.8, recoveryDays: 285 },
  { name: 'Flash Crash (2010)', description: 'Algorithmic cascade', spxReturn: -9.2, portfolioReturn: -11.5, portfolioLoss: -28602, maxDrawdown: 12.8, recoveryDays: 12 },
  { name: 'Rate Shock +300bps', description: 'Sudden rate increase', spxReturn: -18.5, portfolioReturn: -15.2, portfolioLoss: -37802, maxDrawdown: 16.8, recoveryDays: 180 },
  { name: 'Stagflation', description: 'High inflation + recession', spxReturn: -30.2, portfolioReturn: -25.8, portfolioLoss: -64152, maxDrawdown: 28.4, recoveryDays: 420 },
  { name: 'Geopolitical Crisis', description: 'Major conflict escalation', spxReturn: -15.8, portfolioReturn: -12.4, portfolioLoss: -30838, maxDrawdown: 14.2, recoveryDays: 95 },
];

export default function PortfolioStressTestPage() {
  const portfolioValue = 248700;
  const worstCase = SCENARIOS.reduce((min, s) => s.portfolioReturn < min.portfolioReturn ? s : min);
  const avgLoss = SCENARIOS.reduce((s, sc) => s + sc.portfolioReturn, 0) / SCENARIOS.length;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Portfolio Stress Test</h1>
        <p className="mt-1 text-sm text-gray-500">Simulated performance under historical crisis scenarios</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="!p-3">
          <p className="text-[10px] text-gray-500 uppercase">Portfolio</p>
          <p className="text-lg font-bold text-white">{formatCurrency(portfolioValue)}</p>
        </Card>
        <Card className="!p-3">
          <p className="text-[10px] text-gray-500 uppercase">Worst Case</p>
          <p className="text-lg font-bold text-red-400">{worstCase.portfolioReturn.toFixed(1)}%</p>
        </Card>
        <Card className="!p-3">
          <p className="text-[10px] text-gray-500 uppercase">Avg Loss</p>
          <p className="text-lg font-bold text-yellow-400">{avgLoss.toFixed(1)}%</p>
        </Card>
        <Card className="!p-3">
          <p className="text-[10px] text-gray-500 uppercase">Scenarios</p>
          <p className="text-lg font-bold text-indigo-400">{SCENARIOS.length}</p>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sm">
            <Shield className="h-4 w-4 text-red-400" /> Stress Scenarios
          </CardTitle>
        </CardHeader>
        <div className="divide-y divide-white/5">
          {SCENARIOS.sort((a, b) => a.portfolioReturn - b.portfolioReturn).map((s) => (
            <div key={s.name} className="flex items-center gap-3 py-2 px-4">
              <div className="w-36">
                <p className="text-xs font-bold text-white">{s.name}</p>
                <p className="text-[10px] text-gray-500 truncate">{s.description}</p>
              </div>
              <span className="text-xs font-mono text-red-400 w-14">{s.portfolioReturn.toFixed(1)}%</span>
              <span className="text-xs font-mono text-gray-400 w-20">{formatCurrency(s.portfolioLoss)}</span>
              <span className="text-[10px] text-gray-500 w-14">DD {s.maxDrawdown.toFixed(0)}%</span>
              <span className="text-[10px] text-gray-500 w-14">{s.recoveryDays}d rec.</span>
              <div className="flex-1 h-2 rounded-full bg-white/5 overflow-hidden">
                <div className="bg-red-500/40 h-full rounded-full" style={{ width: `${Math.abs(s.portfolioReturn)}%` }} />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
