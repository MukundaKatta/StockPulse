'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/formatters';
import { Activity } from 'lucide-react';

interface GammaLevel {
  ticker: string;
  strike: number;
  callGamma: number;
  putGamma: number;
  netGamma: number;
  notional: string;
  flipPoint: number;
}

const GAMMA_DATA: GammaLevel[] = [
  { ticker: 'SPY', strike: 480, callGamma: 2.8, putGamma: -1.2, netGamma: 1.6, notional: '$4.2B', flipPoint: 472 },
  { ticker: 'QQQ', strike: 410, callGamma: 1.9, putGamma: -0.8, netGamma: 1.1, notional: '$2.1B', flipPoint: 402 },
  { ticker: 'AAPL', strike: 185, callGamma: 0.8, putGamma: -0.5, netGamma: 0.3, notional: '$950M', flipPoint: 180 },
  { ticker: 'NVDA', strike: 135, callGamma: 1.5, putGamma: -1.8, netGamma: -0.3, notional: '$1.8B', flipPoint: 128 },
  { ticker: 'TSLA', strike: 245, callGamma: 1.2, putGamma: -2.1, netGamma: -0.9, notional: '$2.5B', flipPoint: 235 },
  { ticker: 'META', strike: 475, callGamma: 0.6, putGamma: -0.3, netGamma: 0.3, notional: '$680M', flipPoint: 468 },
];

export default function GammaExposurePage() {
  const positive = GAMMA_DATA.filter(g => g.netGamma > 0).length;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Gamma Exposure</h1>
        <p className="mt-1 text-sm text-gray-500">Options dealer gamma positioning</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Card className="!p-4">
          <p className="text-[10px] text-gray-500 uppercase">Tickers</p>
          <p className="text-lg font-bold text-white">{GAMMA_DATA.length}</p>
        </Card>
        <Card className="!p-4">
          <p className="text-[10px] text-gray-500 uppercase">Positive GEX</p>
          <p className="text-lg font-bold text-green-400">{positive}</p>
        </Card>
        <Card className="!p-4">
          <p className="text-[10px] text-gray-500 uppercase">Negative GEX</p>
          <p className="text-lg font-bold text-red-400">{GAMMA_DATA.length - positive}</p>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm"><Activity className="inline h-4 w-4 mr-1" />Gamma Exposure Levels</CardTitle>
        </CardHeader>
        <div className="space-y-2">
          {GAMMA_DATA.map((g) => (
            <div key={g.ticker} className="flex items-center justify-between rounded-lg border border-white/5 px-3 py-2">
              <div>
                <p className="text-sm font-medium text-white">{g.ticker} <span className="text-gray-500">@ ${g.strike}</span></p>
                <p className="text-xs text-gray-500">Call {g.callGamma}B &middot; Put {g.putGamma}B &middot; Flip ${g.flipPoint}</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className={cn('text-sm font-mono', g.netGamma >= 0 ? 'text-green-400' : 'text-red-400')}>
                    {g.netGamma > 0 ? '+' : ''}{g.netGamma}B GEX
                  </p>
                  <p className="text-[10px] text-gray-500">{g.notional}</p>
                </div>
                <Badge variant={g.netGamma >= 0 ? 'success' : 'danger'}>{g.netGamma >= 0 ? 'Stabilizing' : 'Amplifying'}</Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
