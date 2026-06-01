'use client';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/formatters';
import { BarChart3 } from 'lucide-react';

interface McClellanData { date: string; oscillator: number; sumIndex: number; advancing: number; declining: number; signal: string; }
const READINGS: McClellanData[] = [
  { date: '2024-03-28', oscillator: 42.8, sumIndex: 1284, advancing: 1842, declining: 1358, signal: 'Bullish' },
  { date: '2024-03-27', oscillator: 38.2, sumIndex: 1241, advancing: 1780, declining: 1420, signal: 'Bullish' },
  { date: '2024-03-26', oscillator: 28.4, sumIndex: 1203, advancing: 1680, declining: 1520, signal: 'Neutral' },
  { date: '2024-03-25', oscillator: -12.4, sumIndex: 1175, advancing: 1420, declining: 1780, signal: 'Neutral' },
  { date: '2024-03-22', oscillator: -28.8, sumIndex: 1187, advancing: 1280, declining: 1920, signal: 'Bearish' },
  { date: '2024-03-21', oscillator: -42.2, sumIndex: 1216, advancing: 1180, declining: 2020, signal: 'Bearish' },
  { date: '2024-03-20', oscillator: 8.4, sumIndex: 1258, advancing: 1620, declining: 1580, signal: 'Neutral' },
  { date: '2024-03-19', oscillator: 52.4, sumIndex: 1250, advancing: 1920, declining: 1280, signal: 'Bullish' },
];

export default function McClellanOscillatorPage() {
  const latest = READINGS[0];
  const bullish = READINGS.filter((r) => r.signal === 'Bullish').length;
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div><h1 className="font-display text-xl sm:text-2xl font-bold text-white">McClellan Oscillator</h1><p className="mt-1 text-sm text-gray-500">Market breadth oscillator — advance/decline momentum</p></div>
      <div className="grid grid-cols-3 gap-3">
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Current</p><p className={cn('text-lg font-bold', latest.oscillator > 0 ? 'text-green-400' : 'text-red-400')}>{latest.oscillator.toFixed(1)}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Sum Index</p><p className="text-lg font-bold text-indigo-400">{latest.sumIndex}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Bullish Days</p><p className="text-lg font-bold text-green-400">{bullish}/{READINGS.length}</p></Card>
      </div>
      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><BarChart3 className="h-4 w-4 text-indigo-400" /> Daily Readings</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {READINGS.map((r) => (
            <div key={r.date} className="flex items-center justify-between px-4 py-2.5">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-white">{r.date}</span>
                <Badge variant={r.signal === 'Bullish' ? 'success' : r.signal === 'Bearish' ? 'danger' : 'default'}>{r.signal}</Badge>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[10px] text-gray-500">Adv: {r.advancing}</span>
                <span className="text-[10px] text-gray-500">Dec: {r.declining}</span>
                <span className={cn('text-sm font-bold font-mono', r.oscillator > 0 ? 'text-green-400' : 'text-red-400')}>{r.oscillator > 0 ? '+' : ''}{r.oscillator.toFixed(1)}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
