'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/formatters';
import { BarChart3 } from 'lucide-react';

interface VWAPData {
  time: string;
  price: number;
  volume: number;
  vwap: number;
  upperBand: number;
  lowerBand: number;
}

const DATA: VWAPData[] = [
  { time: '09:30', price: 184.20, volume: 8500000, vwap: 184.20, upperBand: 185.40, lowerBand: 183.00 },
  { time: '10:00', price: 184.85, volume: 5200000, vwap: 184.48, upperBand: 185.68, lowerBand: 183.28 },
  { time: '10:30', price: 185.50, volume: 4100000, vwap: 184.72, upperBand: 185.92, lowerBand: 183.52 },
  { time: '11:00', price: 185.20, volume: 3800000, vwap: 184.85, upperBand: 186.05, lowerBand: 183.65 },
  { time: '11:30', price: 185.80, volume: 3200000, vwap: 185.01, upperBand: 186.21, lowerBand: 183.81 },
  { time: '12:00', price: 185.45, volume: 2500000, vwap: 185.08, upperBand: 186.28, lowerBand: 183.88 },
  { time: '12:30', price: 185.60, volume: 2100000, vwap: 185.15, upperBand: 186.35, lowerBand: 183.95 },
  { time: '13:00', price: 185.90, volume: 2800000, vwap: 185.25, upperBand: 186.45, lowerBand: 184.05 },
  { time: '13:30', price: 186.20, volume: 3500000, vwap: 185.40, upperBand: 186.60, lowerBand: 184.20 },
  { time: '14:00', price: 185.75, volume: 4200000, vwap: 185.45, upperBand: 186.65, lowerBand: 184.25 },
  { time: '14:30', price: 186.10, volume: 4800000, vwap: 185.55, upperBand: 186.75, lowerBand: 184.35 },
  { time: '15:00', price: 185.92, volume: 6100000, vwap: 185.58, upperBand: 186.78, lowerBand: 184.38 },
  { time: '15:30', price: 186.05, volume: 8200000, vwap: 185.65, upperBand: 186.85, lowerBand: 184.45 },
];

export default function VWAPCalculatorPage() {
  const latest = DATA[DATA.length - 1];
  const aboveVWAP = latest.price > latest.vwap;
  const totalVolume = DATA.reduce((s, d) => s + d.volume, 0);

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">VWAP Analysis</h1>
        <p className="mt-1 text-sm text-gray-500">Volume-Weighted Average Price for AAPL</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Current</p><p className="text-sm font-bold text-white">${latest.price.toFixed(2)}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">VWAP</p><p className="text-sm font-bold text-indigo-400">${latest.vwap.toFixed(2)}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Position</p><p className={cn('text-sm font-bold', aboveVWAP ? 'text-green-400' : 'text-red-400')}>{aboveVWAP ? 'Above' : 'Below'}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Deviation</p><p className="text-sm font-bold text-white">{((latest.price - latest.vwap) / latest.vwap * 100).toFixed(2)}%</p></Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><BarChart3 className="h-4 w-4 text-indigo-400" /> Intraday VWAP</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {DATA.map((d) => {
            const vs = d.price > d.vwap;
            return (
              <div key={d.time} className="flex items-center gap-3 py-1.5 px-2">
                <span className="text-xs font-mono text-gray-500 w-12">{d.time}</span>
                <span className={cn('text-xs font-mono w-16', vs ? 'text-green-400' : 'text-red-400')}>${d.price.toFixed(2)}</span>
                <span className="text-xs font-mono text-indigo-400 w-16">${d.vwap.toFixed(2)}</span>
                <div className="flex-1 h-2 relative rounded-full bg-white/5 overflow-hidden">
                  <div className="absolute inset-y-0 left-0 bg-indigo-500/30 rounded-full" style={{ width: `${(d.volume / 8500000) * 100}%` }} />
                </div>
                <span className="text-[10px] text-gray-500 w-12 text-right">{(d.volume / 1e6).toFixed(1)}M</span>
              </div>
            );
          })}
        </div>
      </Card>
    </motion.div>
  );
}
