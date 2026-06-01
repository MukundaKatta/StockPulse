'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn, formatCurrency } from '@/lib/formatters';
import { Cpu } from 'lucide-react';

interface MiningOperation {
  coin: string;
  algorithm: string;
  hashRate: string;
  dailyRevenue: number;
  electricityCost: number;
  dailyProfit: number;
  difficulty: string;
  profitability: 'Profitable' | 'Marginal' | 'Unprofitable';
}

const OPERATIONS: MiningOperation[] = [
  { coin: 'Bitcoin (BTC)', algorithm: 'SHA-256', hashRate: '125 TH/s', dailyRevenue: 28.50, electricityCost: 12.80, dailyProfit: 15.70, difficulty: '72.5T', profitability: 'Profitable' },
  { coin: 'Ethereum Classic', algorithm: 'Etchash', hashRate: '2.4 GH/s', dailyRevenue: 8.20, electricityCost: 5.40, dailyProfit: 2.80, difficulty: '2.8P', profitability: 'Marginal' },
  { coin: 'Litecoin (LTC)', algorithm: 'Scrypt', hashRate: '9.5 GH/s', dailyRevenue: 12.40, electricityCost: 8.20, dailyProfit: 4.20, difficulty: '28.5M', profitability: 'Profitable' },
  { coin: 'Kaspa (KAS)', algorithm: 'kHeavyHash', hashRate: '18 TH/s', dailyRevenue: 6.80, electricityCost: 3.20, dailyProfit: 3.60, difficulty: '4.2E', profitability: 'Profitable' },
  { coin: 'Ravencoin (RVN)', algorithm: 'KawPoW', hashRate: '120 MH/s', dailyRevenue: 2.40, electricityCost: 4.80, dailyProfit: -2.40, difficulty: '85.2K', profitability: 'Unprofitable' },
  { coin: 'Dogecoin (DOGE)', algorithm: 'Scrypt', hashRate: '9.5 GH/s', dailyRevenue: 5.60, electricityCost: 4.20, dailyProfit: 1.40, difficulty: '15.2M', profitability: 'Marginal' },
  { coin: 'Monero (XMR)', algorithm: 'RandomX', hashRate: '48 KH/s', dailyRevenue: 4.80, electricityCost: 2.40, dailyProfit: 2.40, difficulty: '385G', profitability: 'Profitable' },
];

const profitVariant = (p: string) => p === 'Profitable' ? 'success' : p === 'Unprofitable' ? 'danger' : 'warning';

export default function CryptoMiningPage() {
  const totalRevenue = OPERATIONS.reduce((s, o) => s + o.dailyRevenue, 0);
  const totalProfit = OPERATIONS.reduce((s, o) => s + o.dailyProfit, 0);
  const totalCost = OPERATIONS.reduce((s, o) => s + o.electricityCost, 0);
  const profitable = OPERATIONS.filter(o => o.profitability === 'Profitable').length;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Crypto Mining</h1>
        <p className="mt-1 text-sm text-gray-500">Crypto mining profitability tracker</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="!p-3 text-center"><p className="text-[10px] text-gray-500 uppercase">Daily Revenue</p><p className="text-lg font-bold text-white">{formatCurrency(totalRevenue)}</p></Card>
        <Card className="!p-3 text-center"><p className="text-[10px] text-gray-500 uppercase">Daily Profit</p><p className={cn('text-lg font-bold', totalProfit >= 0 ? 'text-green-400' : 'text-red-400')}>{formatCurrency(totalProfit)}</p></Card>
        <Card className="!p-3 text-center"><p className="text-[10px] text-gray-500 uppercase">Elec Cost</p><p className="text-lg font-bold text-red-400">{formatCurrency(totalCost)}</p></Card>
        <Card className="!p-3 text-center"><p className="text-[10px] text-gray-500 uppercase">Profitable</p><p className="text-lg font-bold text-indigo-400">{profitable}/{OPERATIONS.length}</p></Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><Cpu className="h-4 w-4 text-indigo-400" /> Mining Operations</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {OPERATIONS.map((o) => (
            <div key={o.coin} className="flex items-center justify-between px-4 py-3">
              <div>
                <p className="text-sm font-medium text-white">{o.coin}</p>
                <p className="text-xs text-gray-500">{o.algorithm} &middot; {o.hashRate} &middot; Diff {o.difficulty}</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className={cn('text-sm font-mono', o.dailyProfit >= 0 ? 'text-green-400' : 'text-red-400')}>{formatCurrency(o.dailyProfit)}/day</p>
                  <p className="text-[10px] text-gray-500">Rev {formatCurrency(o.dailyRevenue)} - Cost {formatCurrency(o.electricityCost)}</p>
                </div>
                <Badge variant={profitVariant(o.profitability)}>{o.profitability}</Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
