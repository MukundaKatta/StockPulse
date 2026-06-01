'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn, formatCurrency } from '@/lib/formatters';
import { Layers } from 'lucide-react';

interface DeFiProtocol {
  name: string;
  chain: string;
  tvl: number;
  tvlChange7d: number;
  apy: number;
  category: 'DEX' | 'Lending' | 'Yield' | 'Liquid Staking';
  token: string;
  tokenPrice: number;
}

const PROTOCOLS: DeFiProtocol[] = [
  { name: 'Lido', chain: 'Ethereum', tvl: 33.2e9, tvlChange7d: 2.1, apy: 3.9, category: 'Liquid Staking', token: 'LDO', tokenPrice: 2.45 },
  { name: 'Aave V3', chain: 'Multi-chain', tvl: 12.8e9, tvlChange7d: 4.5, apy: 5.2, category: 'Lending', token: 'AAVE', tokenPrice: 92.30 },
  { name: 'Uniswap V3', chain: 'Ethereum', tvl: 5.4e9, tvlChange7d: -1.2, apy: 18.4, category: 'DEX', token: 'UNI', tokenPrice: 6.85 },
  { name: 'MakerDAO', chain: 'Ethereum', tvl: 8.1e9, tvlChange7d: 0.8, apy: 8.0, category: 'Lending', token: 'MKR', tokenPrice: 1520.00 },
  { name: 'Curve', chain: 'Multi-chain', tvl: 3.2e9, tvlChange7d: -3.4, apy: 6.8, category: 'DEX', token: 'CRV', tokenPrice: 0.58 },
  { name: 'Rocket Pool', chain: 'Ethereum', tvl: 4.5e9, tvlChange7d: 1.9, apy: 3.6, category: 'Liquid Staking', token: 'RPL', tokenPrice: 28.40 },
  { name: 'Compound', chain: 'Ethereum', tvl: 2.8e9, tvlChange7d: -0.5, apy: 4.1, category: 'Lending', token: 'COMP', tokenPrice: 52.10 },
  { name: 'Yearn', chain: 'Multi-chain', tvl: 1.2e9, tvlChange7d: 6.2, apy: 12.5, category: 'Yield', token: 'YFI', tokenPrice: 7840.00 },
];

export default function CryptoDefiPage() {
  const totalTvl = PROTOCOLS.reduce((s, p) => s + p.tvl, 0);
  const avgApy = PROTOCOLS.reduce((s, p) => s + p.apy, 0) / PROTOCOLS.length;
  const growing = PROTOCOLS.filter((p) => p.tvlChange7d > 0).length;
  const categories = new Set(PROTOCOLS.map((p) => p.category)).size;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">DeFi Protocols</h1>
        <p className="mt-1 text-sm text-gray-500">Total value locked and yield across DeFi protocols</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="!p-3">
          <p className="text-[10px] text-gray-500 uppercase">Total TVL</p>
          <p className="text-lg font-bold text-green-400">${(totalTvl / 1e9).toFixed(1)}B</p>
        </Card>
        <Card className="!p-3">
          <p className="text-[10px] text-gray-500 uppercase">Avg APY</p>
          <p className="text-lg font-bold text-indigo-400">{avgApy.toFixed(1)}%</p>
        </Card>
        <Card className="!p-3">
          <p className="text-[10px] text-gray-500 uppercase">TVL Growing</p>
          <p className="text-lg font-bold text-green-400">{growing}/{PROTOCOLS.length}</p>
        </Card>
        <Card className="!p-3">
          <p className="text-[10px] text-gray-500 uppercase">Categories</p>
          <p className="text-lg font-bold text-white">{categories}</p>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sm">
            <Layers className="h-4 w-4 text-indigo-400" /> Protocol TVL &amp; Yields
          </CardTitle>
        </CardHeader>
        <div className="divide-y divide-white/5">
          {PROTOCOLS.sort((a, b) => b.tvl - a.tvl).map((p) => (
            <div key={p.name} className="flex items-center gap-3 py-2 px-4">
              <div className="w-24">
                <p className="text-xs font-bold text-white">{p.name}</p>
                <p className="text-[10px] text-gray-500">{p.chain}</p>
              </div>
              <Badge variant={p.category === 'DEX' ? 'info' : p.category === 'Lending' ? 'success' : p.category === 'Yield' ? 'warning' : 'default'}>
                {p.category}
              </Badge>
              <span className="text-xs font-mono text-white w-16">${(p.tvl / 1e9).toFixed(1)}B</span>
              <span className={cn('text-xs font-mono w-14', p.tvlChange7d >= 0 ? 'text-green-400' : 'text-red-400')}>
                {p.tvlChange7d >= 0 ? '+' : ''}{p.tvlChange7d}%
              </span>
              <span className="text-xs font-mono text-indigo-400 w-12">{p.apy}% APY</span>
              <span className="text-[10px] text-gray-500 ml-auto">{p.token}: {formatCurrency(p.tokenPrice)}</span>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
