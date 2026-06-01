'use client';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/formatters';
import { Landmark } from 'lucide-react';

interface RateData { country: string; centralBank: string; rate: number; lastChange: number; direction: string; nextMeeting: string; }
const RATES: RateData[] = [
  { country: 'United States', centralBank: 'Fed', rate: 5.50, lastChange: 0.00, direction: 'Hold', nextMeeting: '2024-05-01' },
  { country: 'Eurozone', centralBank: 'ECB', rate: 4.50, lastChange: 0.00, direction: 'Hold', nextMeeting: '2024-04-11' },
  { country: 'United Kingdom', centralBank: 'BoE', rate: 5.25, lastChange: 0.00, direction: 'Hold', nextMeeting: '2024-05-09' },
  { country: 'Japan', centralBank: 'BoJ', rate: 0.10, lastChange: 0.20, direction: 'Hike', nextMeeting: '2024-04-26' },
  { country: 'Canada', centralBank: 'BoC', rate: 5.00, lastChange: 0.00, direction: 'Hold', nextMeeting: '2024-04-10' },
  { country: 'Australia', centralBank: 'RBA', rate: 4.35, lastChange: 0.00, direction: 'Hold', nextMeeting: '2024-05-07' },
  { country: 'Switzerland', centralBank: 'SNB', rate: 1.50, lastChange: -0.25, direction: 'Cut', nextMeeting: '2024-06-20' },
  { country: 'China', centralBank: 'PBoC', rate: 3.45, lastChange: -0.25, direction: 'Cut', nextMeeting: '2024-04-22' },
];

export default function InterestRatesPage() {
  const avgRate = RATES.reduce((s, r) => s + r.rate, 0) / RATES.length;
  const cuts = RATES.filter((r) => r.direction === 'Cut').length;
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div><h1 className="font-display text-xl sm:text-2xl font-bold text-white">Interest Rates</h1><p className="mt-1 text-sm text-gray-500">Global central bank interest rate tracker</p></div>
      <div className="grid grid-cols-3 gap-3">
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Fed Rate</p><p className="text-lg font-bold text-indigo-400">{RATES[0].rate}%</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Avg Global</p><p className="text-lg font-bold text-amber-400">{avgRate.toFixed(2)}%</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Cutting</p><p className="text-lg font-bold text-green-400">{cuts}</p></Card>
      </div>
      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><Landmark className="h-4 w-4 text-indigo-400" /> Central Bank Rates</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {RATES.map((r) => (
            <div key={r.country} className="flex items-center justify-between px-4 py-2.5">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-white">{r.country}</span>
                <span className="text-[10px] text-gray-500">{r.centralBank}</span>
                <Badge variant={r.direction === 'Hike' ? 'danger' : r.direction === 'Cut' ? 'success' : 'default'}>{r.direction}</Badge>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[10px] text-gray-500">Next: {r.nextMeeting}</span>
                <span className={cn('text-sm font-bold font-mono text-white')}>{r.rate.toFixed(2)}%</span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
