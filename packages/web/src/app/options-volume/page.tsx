'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/formatters';
import { Activity } from 'lucide-react';

interface OptionsVol {
  symbol: string;
  name: string;
  callVol: number;
  putVol: number;
  totalVol: number;
  avgVol: number;
  pcRatio: number;
  ivRank: number;
  unusualActivity: boolean;
  topStrike: string;
}

const DATA: OptionsVol[] = [
  { symbol: 'TSLA', name: 'Tesla', callVol: 1450000, putVol: 1280000, totalVol: 2730000, avgVol: 1800000, pcRatio: 0.88, ivRank: 72, unusualActivity: true, topStrike: '$200C 2/16' },
  { symbol: 'NVDA', name: 'NVIDIA', callVol: 980000, putVol: 420000, totalVol: 1400000, avgVol: 850000, pcRatio: 0.43, ivRank: 85, unusualActivity: true, topStrike: '$900C 2/16' },
  { symbol: 'AAPL', name: 'Apple', callVol: 520000, putVol: 480000, totalVol: 1000000, avgVol: 780000, pcRatio: 0.92, ivRank: 35, unusualActivity: false, topStrike: '$190C 2/16' },
  { symbol: 'SPY', name: 'SPDR S&P 500', callVol: 2800000, putVol: 3200000, totalVol: 6000000, avgVol: 4500000, pcRatio: 1.14, ivRank: 28, unusualActivity: true, topStrike: '$500P 3/15' },
  { symbol: 'AMD', name: 'AMD', callVol: 620000, putVol: 380000, totalVol: 1000000, avgVol: 650000, pcRatio: 0.61, ivRank: 62, unusualActivity: true, topStrike: '$180C 2/16' },
  { symbol: 'META', name: 'Meta', callVol: 280000, putVol: 190000, totalVol: 470000, avgVol: 320000, pcRatio: 0.68, ivRank: 48, unusualActivity: false, topStrike: '$500C 3/15' },
  { symbol: 'QQQ', name: 'Invesco QQQ', callVol: 1200000, putVol: 1450000, totalVol: 2650000, avgVol: 2100000, pcRatio: 1.21, ivRank: 32, unusualActivity: false, topStrike: '$440P 2/16' },
  { symbol: 'AMZN', name: 'Amazon', callVol: 340000, putVol: 260000, totalVol: 600000, avgVol: 420000, pcRatio: 0.76, ivRank: 42, unusualActivity: true, topStrike: '$185C 2/16' },
];

function fmtK(n: number): string {
  if (n >= 1e6) return `${(n / 1e6).toFixed(1)}M`;
  return `${(n / 1e3).toFixed(0)}K`;
}

export default function OptionsVolumePage() {
  const totalVol = DATA.reduce((s, d) => s + d.totalVol, 0);
  const avgPCR = DATA.reduce((s, d) => s + d.pcRatio, 0) / DATA.length;
  const unusual = DATA.filter((d) => d.unusualActivity).length;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Options Volume</h1>
        <p className="mt-1 text-sm text-gray-500">Options flow, put/call ratios, and unusual activity</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Total Volume</p><p className="text-lg font-bold text-white">{fmtK(totalVol)}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Avg P/C Ratio</p><p className={cn('text-lg font-bold', avgPCR > 1 ? 'text-red-400' : 'text-green-400')}>{avgPCR.toFixed(2)}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Unusual</p><p className="text-lg font-bold text-amber-400">{unusual}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Symbols</p><p className="text-lg font-bold text-indigo-400">{DATA.length}</p></Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><Activity className="h-4 w-4 text-indigo-400" /> Options Flow</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {DATA.sort((a, b) => b.totalVol - a.totalVol).map((d) => {
            const relVol = d.totalVol / d.avgVol;
            return (
              <div key={d.symbol} className="px-4 py-2.5 space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white">{d.symbol}</span>
                    <span className="text-[10px] text-gray-500">{d.name}</span>
                    {d.unusualActivity && <Badge variant="warning">Unusual</Badge>}
                    <Badge variant={d.pcRatio > 1 ? 'danger' : 'success'}>{d.pcRatio > 1 ? 'Put Heavy' : 'Call Heavy'}</Badge>
                  </div>
                  <span className="text-xs font-mono text-white">{fmtK(d.totalVol)}</span>
                </div>
                <div className="h-2.5 rounded bg-white/5 flex overflow-hidden">
                  <div className="bg-green-500/70 h-full" style={{ width: `${(d.callVol / d.totalVol) * 100}%` }} />
                  <div className="bg-red-500/70 h-full" style={{ width: `${(d.putVol / d.totalVol) * 100}%` }} />
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-[10px]">
                  <span className="text-green-400 font-mono">Calls: {fmtK(d.callVol)}</span>
                  <span className="text-red-400 font-mono">Puts: {fmtK(d.putVol)}</span>
                  <span className="text-gray-400">P/C: <span className="font-mono text-white">{d.pcRatio.toFixed(2)}</span></span>
                  <span className="text-gray-400">IV Rank: <span className={cn('font-mono', d.ivRank > 60 ? 'text-amber-400' : 'text-gray-300')}>{d.ivRank}</span></span>
                  <span className="text-gray-400">Rel Vol: <span className={cn('font-mono', relVol > 1.3 ? 'text-amber-400' : 'text-gray-300')}>{relVol.toFixed(2)}x</span></span>
                  <span className="text-gray-500">{d.topStrike}</span>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </motion.div>
  );
}
