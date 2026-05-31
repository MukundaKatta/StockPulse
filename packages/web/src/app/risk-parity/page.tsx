'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/formatters';
import { Shield } from 'lucide-react';

interface AssetClass {
  name: string;
  weight: number;
  riskContrib: number;
  volatility: number;
  expectedReturn: number;
  color: string;
}

const ASSETS: AssetClass[] = [
  { name: 'US Equities', weight: 20, riskContrib: 20, volatility: 16.5, expectedReturn: 8.2, color: 'bg-blue-500' },
  { name: 'Intl Equities', weight: 15, riskContrib: 20, volatility: 18.2, expectedReturn: 7.5, color: 'bg-indigo-500' },
  { name: 'Long Treasuries', weight: 30, riskContrib: 20, volatility: 12.8, expectedReturn: 4.5, color: 'bg-green-500' },
  { name: 'TIPS', weight: 15, riskContrib: 20, volatility: 8.5, expectedReturn: 3.8, color: 'bg-yellow-500' },
  { name: 'Commodities', weight: 20, riskContrib: 20, volatility: 15.2, expectedReturn: 5.2, color: 'bg-orange-500' },
];

export default function RiskParityPage() {
  const portfolioVol = Math.sqrt(
    ASSETS.reduce((s, a) => s + (a.weight / 100) ** 2 * a.volatility ** 2, 0)
  );
  const expReturn = ASSETS.reduce((s, a) => s + (a.weight / 100) * a.expectedReturn, 0);
  const sharpe = expReturn / portfolioVol;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Risk Parity</h1>
        <p className="mt-1 text-sm text-gray-500">Equal risk contribution portfolio allocation</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="!p-3">
          <p className="text-[10px] text-gray-500 uppercase">Expected Return</p>
          <p className="text-lg font-bold text-green-400">{expReturn.toFixed(1)}%</p>
        </Card>
        <Card className="!p-3">
          <p className="text-[10px] text-gray-500 uppercase">Portfolio Vol</p>
          <p className="text-lg font-bold text-yellow-400">{portfolioVol.toFixed(1)}%</p>
        </Card>
        <Card className="!p-3">
          <p className="text-[10px] text-gray-500 uppercase">Sharpe Ratio</p>
          <p className="text-lg font-bold text-indigo-400">{sharpe.toFixed(2)}</p>
        </Card>
        <Card className="!p-3">
          <p className="text-[10px] text-gray-500 uppercase">Asset Classes</p>
          <p className="text-lg font-bold text-white">{ASSETS.length}</p>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sm">
            <Shield className="h-4 w-4 text-indigo-400" /> Risk Contributions
          </CardTitle>
        </CardHeader>
        <div className="px-4 pb-3">
          <div className="flex h-6 rounded-full overflow-hidden mb-3">
            {ASSETS.map((a) => (
              <div key={a.name} className={cn('h-full', a.color)} style={{ width: `${a.weight}%` }} title={a.name} />
            ))}
          </div>
        </div>
        <div className="divide-y divide-white/5">
          {ASSETS.map((a) => (
            <div key={a.name} className="flex items-center gap-3 py-2 px-4">
              <div className={cn('h-3 w-3 rounded-full', a.color)} />
              <span className="text-xs text-white w-24">{a.name}</span>
              <span className="text-xs font-mono text-gray-400 w-14">{a.weight}% wt</span>
              <span className="text-xs font-mono text-indigo-400 w-14">{a.riskContrib}% risk</span>
              <span className="text-xs font-mono text-yellow-400 w-14">{a.volatility}% vol</span>
              <span className="text-xs font-mono text-green-400 w-14">{a.expectedReturn}% ret</span>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
