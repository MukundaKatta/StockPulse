'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/formatters';
import { Users } from 'lucide-react';

interface UnemploymentData {
  country: string;
  code: string;
  rate: number;
  previousRate: number;
  change: number;
  laborForce: number;
  youthRate: number;
  trend: 'Rising' | 'Falling' | 'Stable';
}

const DATA: UnemploymentData[] = [
  { country: 'United States', code: 'US', rate: 3.7, previousRate: 3.8, change: -0.1, laborForce: 167.2, youthRate: 8.5, trend: 'Falling' },
  { country: 'Germany', code: 'DE', rate: 5.9, previousRate: 5.7, change: 0.2, laborForce: 46.1, youthRate: 6.1, trend: 'Rising' },
  { country: 'Japan', code: 'JP', rate: 2.4, previousRate: 2.5, change: -0.1, laborForce: 69.2, youthRate: 4.2, trend: 'Falling' },
  { country: 'United Kingdom', code: 'UK', rate: 4.2, previousRate: 4.0, change: 0.2, laborForce: 33.8, youthRate: 12.1, trend: 'Rising' },
  { country: 'Canada', code: 'CA', rate: 5.8, previousRate: 5.7, change: 0.1, laborForce: 21.4, youthRate: 11.8, trend: 'Rising' },
  { country: 'Australia', code: 'AU', rate: 3.9, previousRate: 4.1, change: -0.2, laborForce: 14.6, youthRate: 9.5, trend: 'Falling' },
  { country: 'France', code: 'FR', rate: 7.3, previousRate: 7.4, change: -0.1, laborForce: 30.8, youthRate: 17.2, trend: 'Falling' },
  { country: 'Spain', code: 'ES', rate: 11.8, previousRate: 11.9, change: -0.1, laborForce: 24.1, youthRate: 28.4, trend: 'Falling' },
];

export default function UnemploymentTrackerPage() {
  const avgRate = DATA.reduce((s, d) => s + d.rate, 0) / DATA.length;
  const falling = DATA.filter((d) => d.trend === 'Falling').length;
  const lowestRate = Math.min(...DATA.map((d) => d.rate));
  const avgYouthRate = DATA.reduce((s, d) => s + d.youthRate, 0) / DATA.length;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Unemployment Tracker</h1>
        <p className="mt-1 text-sm text-gray-500">Unemployment rates and labor market trends by country</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="!p-3">
          <p className="text-[10px] text-gray-500 uppercase">Avg Rate</p>
          <p className="text-lg font-bold text-white">{avgRate.toFixed(1)}%</p>
        </Card>
        <Card className="!p-3">
          <p className="text-[10px] text-gray-500 uppercase">Improving</p>
          <p className="text-lg font-bold text-green-400">{falling}/{DATA.length}</p>
        </Card>
        <Card className="!p-3">
          <p className="text-[10px] text-gray-500 uppercase">Lowest Rate</p>
          <p className="text-lg font-bold text-indigo-400">{lowestRate}%</p>
        </Card>
        <Card className="!p-3">
          <p className="text-[10px] text-gray-500 uppercase">Avg Youth Rate</p>
          <p className="text-lg font-bold text-amber-400">{avgYouthRate.toFixed(1)}%</p>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sm">
            <Users className="h-4 w-4 text-indigo-400" /> Unemployment by Country
          </CardTitle>
        </CardHeader>
        <div className="divide-y divide-white/5">
          {DATA.sort((a, b) => a.rate - b.rate).map((d) => (
            <div key={d.code} className="flex items-center gap-3 py-2 px-4">
              <div className="w-28">
                <p className="text-xs font-bold text-white">{d.country}</p>
                <p className="text-[10px] text-gray-500">{d.code}</p>
              </div>
              <Badge variant={d.trend === 'Falling' ? 'success' : d.trend === 'Rising' ? 'danger' : 'default'}>
                {d.trend}
              </Badge>
              <span className="text-xs font-mono text-white w-10">{d.rate}%</span>
              <span className={cn('text-xs font-mono w-12', d.change <= 0 ? 'text-green-400' : 'text-red-400')}>
                {d.change >= 0 ? '+' : ''}{d.change}%
              </span>
              <span className="text-[10px] text-gray-400 w-14">Youth: {d.youthRate}%</span>
              <span className="text-[10px] text-gray-500 ml-auto">{d.laborForce}M labor force</span>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
