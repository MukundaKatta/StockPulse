'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/formatters';
import { Landmark } from 'lucide-react';

interface LendingRate {
  platform: string;
  asset: string;
  supplyApy: number;
  borrowApy: number;
  utilization: number;
  tvl: string;
}

const RATES: LendingRate[] = [
  { platform: 'Aave V3', asset: 'USDC', supplyApy: 4.8, borrowApy: 5.9, utilization: 82, tvl: '$6.1B' },
  { platform: 'Aave V3', asset: 'ETH', supplyApy: 2.1, borrowApy: 3.2, utilization: 65, tvl: '$4.3B' },
  { platform: 'Compound', asset: 'USDC', supplyApy: 4.2, borrowApy: 5.5, utilization: 78, tvl: '$2.8B' },
  { platform: 'Compound', asset: 'WBTC', supplyApy: 0.3, borrowApy: 2.1, utilization: 35, tvl: '$1.1B' },
  { platform: 'Morpho', asset: 'USDC', supplyApy: 5.5, borrowApy: 6.2, utilization: 88, tvl: '$900M' },
  { platform: 'Spark', asset: 'DAI', supplyApy: 5.0, borrowApy: 5.5, utilization: 90, tvl: '$1.4B' },
];

export default function CryptoLendingPage() {
  const avgSupply = RATES.reduce((s, r) => s + r.supplyApy, 0) / RATES.length;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Crypto Lending</h1>
        <p className="mt-1 text-sm text-gray-500">DeFi lending and borrowing rates</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Card className="!p-4">
          <p className="text-[10px] text-gray-500 uppercase">Markets</p>
          <p className="text-lg font-bold text-white">{RATES.length}</p>
        </Card>
        <Card className="!p-4">
          <p className="text-[10px] text-gray-500 uppercase">Avg Supply APY</p>
          <p className="text-lg font-bold text-green-400">{avgSupply.toFixed(1)}%</p>
        </Card>
        <Card className="!p-4">
          <p className="text-[10px] text-gray-500 uppercase">Best Supply</p>
          <p className="text-lg font-bold text-green-400">{Math.max(...RATES.map(r => r.supplyApy)).toFixed(1)}%</p>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm"><Landmark className="inline h-4 w-4 mr-1" />Lending Markets</CardTitle>
        </CardHeader>
        <div className="space-y-2">
          {RATES.map((r, i) => (
            <div key={i} className="flex items-center justify-between rounded-lg border border-white/5 px-3 py-2">
              <div>
                <p className="text-sm font-medium text-white">{r.platform}</p>
                <p className="text-xs text-gray-500">{r.asset} &middot; TVL {r.tvl}</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className={cn('text-sm font-mono', 'text-green-400')}>{r.supplyApy}% supply</p>
                  <p className="text-xs font-mono text-red-400">{r.borrowApy}% borrow</p>
                </div>
                <Badge variant={r.utilization > 85 ? 'danger' : r.utilization > 70 ? 'warning' : 'success'}>{r.utilization}%</Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
