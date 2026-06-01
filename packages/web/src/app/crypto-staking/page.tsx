'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/formatters';
import { Coins } from 'lucide-react';

interface StakingProtocol {
  name: string;
  token: string;
  apy: number;
  tvl: string;
  lockup: string;
  risk: 'Low' | 'Medium' | 'High';
}

const PROTOCOLS: StakingProtocol[] = [
  { name: 'Lido', token: 'ETH', apy: 3.9, tvl: '$14.2B', lockup: 'None', risk: 'Low' },
  { name: 'Rocket Pool', token: 'ETH', apy: 3.6, tvl: '$3.8B', lockup: 'None', risk: 'Low' },
  { name: 'Marinade', token: 'SOL', apy: 7.2, tvl: '$1.5B', lockup: 'None', risk: 'Medium' },
  { name: 'Jito', token: 'SOL', apy: 7.8, tvl: '$1.1B', lockup: 'None', risk: 'Medium' },
  { name: 'Coinbase', token: 'ETH', apy: 3.3, tvl: '$8.4B', lockup: 'None', risk: 'Low' },
  { name: 'Ankr', token: 'MATIC', apy: 5.1, tvl: '$420M', lockup: '28 days', risk: 'Medium' },
  { name: 'Stride', token: 'ATOM', apy: 15.2, tvl: '$60M', lockup: '21 days', risk: 'High' },
];

const riskVariant = (r: string) => r === 'Low' ? 'success' : r === 'Medium' ? 'warning' : 'danger';

export default function CryptoStakingPage() {
  const avgApy = PROTOCOLS.reduce((s, p) => s + p.apy, 0) / PROTOCOLS.length;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Crypto Staking</h1>
        <p className="mt-1 text-sm text-gray-500">Yields and protocols across networks</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Card className="!p-4">
          <p className="text-[10px] text-gray-500 uppercase">Protocols</p>
          <p className="text-lg font-bold text-white">{PROTOCOLS.length}</p>
        </Card>
        <Card className="!p-4">
          <p className="text-[10px] text-gray-500 uppercase">Avg APY</p>
          <p className="text-lg font-bold text-green-400">{avgApy.toFixed(1)}%</p>
        </Card>
        <Card className="!p-4">
          <p className="text-[10px] text-gray-500 uppercase">Top APY</p>
          <p className="text-lg font-bold text-green-400">{Math.max(...PROTOCOLS.map(p => p.apy)).toFixed(1)}%</p>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm"><Coins className="inline h-4 w-4 mr-1" />Staking Protocols</CardTitle>
        </CardHeader>
        <div className="space-y-2">
          {PROTOCOLS.map((p) => (
            <div key={p.name} className="flex items-center justify-between rounded-lg border border-white/5 px-3 py-2">
              <div>
                <p className="text-sm font-medium text-white">{p.name}</p>
                <p className="text-xs text-gray-500">{p.token} &middot; Lock: {p.lockup}</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-mono text-green-400">{p.apy}%</p>
                  <p className="text-[10px] text-gray-500">TVL {p.tvl}</p>
                </div>
                <Badge variant={riskVariant(p.risk)}>{p.risk}</Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
