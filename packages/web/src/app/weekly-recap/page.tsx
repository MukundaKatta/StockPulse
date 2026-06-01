'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/formatters';
import { CalendarDays } from 'lucide-react';

interface WeeklyPerformance {
  name: string;
  mondayClose: number;
  fridayClose: number;
  weekChange: number;
  weekChangePct: number;
  weekHigh: number;
  weekLow: number;
  avgVolume: string;
}

interface WeeklyEvent {
  date: string;
  event: string;
  impact: 'High' | 'Medium' | 'Low';
  result: string;
}

const PERFORMANCE: WeeklyPerformance[] = [
  { name: 'S&P 500', mondayClose: 5150.42, fridayClose: 5224.62, weekChange: 74.20, weekChangePct: 1.44, weekHigh: 5240.80, weekLow: 5128.50, avgVolume: '3.6B' },
  { name: 'Dow Jones', mondayClose: 39280.50, fridayClose: 39512.84, weekChange: 232.34, weekChangePct: 0.59, weekHigh: 39580.20, weekLow: 39100.10, avgVolume: '305M' },
  { name: 'Nasdaq', mondayClose: 16020.40, fridayClose: 16340.87, weekChange: 320.47, weekChangePct: 2.00, weekHigh: 16380.50, weekLow: 15920.30, avgVolume: '4.9B' },
  { name: 'Russell 2000', mondayClose: 2092.30, fridayClose: 2075.80, weekChange: -16.50, weekChangePct: -0.79, weekHigh: 2105.40, weekLow: 2058.20, avgVolume: '1.1B' },
];

const EVENTS: WeeklyEvent[] = [
  { date: 'Mon 3/11', event: 'CPI Data Release', impact: 'High', result: 'Inline at 3.2% YoY' },
  { date: 'Tue 3/12', event: 'FOMC Minutes', impact: 'High', result: 'Dovish tone maintained' },
  { date: 'Wed 3/13', event: 'Retail Sales', impact: 'Medium', result: 'Beat expectations +0.6%' },
  { date: 'Thu 3/14', event: 'Jobless Claims', impact: 'Medium', result: '209K vs 215K expected' },
  { date: 'Fri 3/15', event: 'Quad Witching', impact: 'High', result: 'Elevated volume $4.2T' },
  { date: 'Fri 3/15', event: 'Michigan Sentiment', impact: 'Low', result: '76.5 vs 77.1 expected' },
];

export default function WeeklyRecapPage() {
  const bestPerformer = PERFORMANCE.reduce((best, p) => p.weekChangePct > best.weekChangePct ? p : best);
  const worstPerformer = PERFORMANCE.reduce((worst, p) => p.weekChangePct < worst.weekChangePct ? p : worst);
  const highImpactEvents = EVENTS.filter((e) => e.impact === 'High').length;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Weekly Recap</h1>
        <p className="mt-1 text-sm text-gray-500">Weekly market performance recap - Week of March 11, 2024</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Best Performer</p><p className="text-lg font-bold text-green-400">{bestPerformer.name}</p><p className="text-xs font-mono text-green-400">+{bestPerformer.weekChangePct.toFixed(2)}%</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Worst Performer</p><p className="text-lg font-bold text-red-400">{worstPerformer.name}</p><p className="text-xs font-mono text-red-400">{worstPerformer.weekChangePct.toFixed(2)}%</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">High Impact Events</p><p className="text-lg font-bold text-amber-400">{highImpactEvents}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Total Events</p><p className="text-lg font-bold text-white">{EVENTS.length}</p></Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><CalendarDays className="h-4 w-4 text-indigo-400" /> Index Performance</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {PERFORMANCE.map((p) => (
            <div key={p.name} className="px-4 py-2.5 space-y-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-white">{p.name}</span>
                  <Badge variant={p.weekChangePct >= 0 ? 'success' : 'danger'}>
                    {p.weekChangePct >= 0 ? '+' : ''}{p.weekChangePct.toFixed(2)}%
                  </Badge>
                </div>
                <span className="text-sm font-mono font-bold text-white">{p.fridayClose.toLocaleString()}</span>
              </div>
              <div className="flex gap-4 text-[10px] text-gray-500">
                <span>Open: <span className="text-white font-mono">{p.mondayClose.toLocaleString()}</span></span>
                <span>High: <span className="text-green-400 font-mono">{p.weekHigh.toLocaleString()}</span></span>
                <span>Low: <span className="text-red-400 font-mono">{p.weekLow.toLocaleString()}</span></span>
                <span>Avg Vol: <span className="text-gray-400 font-mono">{p.avgVolume}</span></span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-sm">Key Events</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {EVENTS.map((e, i) => (
            <div key={i} className="flex items-center gap-3 px-4 py-2.5">
              <span className="text-[10px] font-mono text-gray-500 w-16">{e.date}</span>
              <div className="flex-1 min-w-0">
                <span className="text-xs text-white">{e.event}</span>
                <p className="text-[10px] text-gray-500">{e.result}</p>
              </div>
              <Badge variant={e.impact === 'High' ? 'danger' : e.impact === 'Medium' ? 'warning' : 'default'}>{e.impact}</Badge>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
