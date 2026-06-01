'use client';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/formatters';
import { ShoppingCart } from 'lucide-react';

interface RetailData { month: string; totalSales: number; momChange: number; yoyChange: number; exAuto: number; signal: string; }
const DATA: RetailData[] = [
  { month: 'Mar 2024', totalSales: 709.8, momChange: 0.7, yoyChange: 4.2, exAuto: 568.4, signal: 'Strong' },
  { month: 'Feb 2024', totalSales: 704.8, momChange: 0.6, yoyChange: 3.8, exAuto: 564.2, signal: 'Strong' },
  { month: 'Jan 2024', totalSales: 700.6, momChange: -0.8, yoyChange: 3.2, exAuto: 558.8, signal: 'Weak' },
  { month: 'Dec 2023', totalSales: 706.2, momChange: 0.4, yoyChange: 5.4, exAuto: 562.4, signal: 'Moderate' },
  { month: 'Nov 2023', totalSales: 703.4, momChange: 0.2, yoyChange: 4.8, exAuto: 560.8, signal: 'Moderate' },
  { month: 'Oct 2023', totalSales: 702.0, momChange: 0.8, yoyChange: 4.2, exAuto: 558.2, signal: 'Strong' },
  { month: 'Sep 2023', totalSales: 696.4, momChange: 0.6, yoyChange: 3.4, exAuto: 554.8, signal: 'Moderate' },
];

export default function RetailSalesPage() {
  const latest = DATA[0];
  const avgGrowth = DATA.reduce((s, d) => s + d.yoyChange, 0) / DATA.length;
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div><h1 className="font-display text-xl sm:text-2xl font-bold text-white">Retail Sales</h1><p className="mt-1 text-sm text-gray-500">Monthly retail sales economic data releases</p></div>
      <div className="grid grid-cols-3 gap-3">
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Latest</p><p className="text-lg font-bold text-indigo-400">${latest.totalSales}B</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">MoM Change</p><p className={cn('text-lg font-bold', latest.momChange > 0 ? 'text-green-400' : 'text-red-400')}>{latest.momChange > 0 ? '+' : ''}{latest.momChange}%</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Avg YoY</p><p className="text-lg font-bold text-amber-400">{avgGrowth.toFixed(1)}%</p></Card>
      </div>
      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><ShoppingCart className="h-4 w-4 text-indigo-400" /> Monthly Data</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {DATA.map((d) => (
            <div key={d.month} className="flex items-center justify-between px-4 py-2.5">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-white">{d.month}</span>
                <Badge variant={d.signal === 'Strong' ? 'success' : d.signal === 'Weak' ? 'danger' : 'warning'}>{d.signal}</Badge>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[10px] text-gray-500">${d.totalSales}B</span>
                <span className={cn('text-[10px] font-mono', d.momChange > 0 ? 'text-green-400' : 'text-red-400')}>MoM: {d.momChange > 0 ? '+' : ''}{d.momChange}%</span>
                <span className={cn('text-sm font-bold font-mono', d.yoyChange > 4 ? 'text-green-400' : 'text-amber-400')}>YoY: +{d.yoyChange}%</span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
