'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { cn, formatLargeNumber } from '@/lib/formatters';
import { PieChart } from 'lucide-react';

interface Segment {
  name: string;
  revenue: number;
  growth: number;
  margin: number;
  color: string;
}

const PRODUCT: Segment[] = [
  { name: 'iPhone', revenue: 200.6e9, growth: -2.8, margin: 36.5, color: 'bg-blue-500' },
  { name: 'Services', revenue: 85.2e9, growth: 16.3, margin: 70.8, color: 'bg-green-500' },
  { name: 'Mac', revenue: 29.4e9, growth: -26.8, margin: 28.2, color: 'bg-purple-500' },
  { name: 'iPad', revenue: 28.3e9, growth: -3.4, margin: 30.5, color: 'bg-yellow-500' },
  { name: 'Wearables', revenue: 39.8e9, growth: -3.2, margin: 32.1, color: 'bg-orange-500' },
];

const GEOGRAPHIC: Segment[] = [
  { name: 'Americas', revenue: 169.7e9, growth: -4.2, margin: 38.5, color: 'bg-blue-500' },
  { name: 'Europe', revenue: 94.3e9, growth: -1.5, margin: 36.2, color: 'bg-green-500' },
  { name: 'Greater China', revenue: 72.6e9, growth: -2.5, margin: 34.8, color: 'bg-red-500' },
  { name: 'Japan', revenue: 24.3e9, growth: -7.2, margin: 35.1, color: 'bg-yellow-500' },
  { name: 'Rest of Asia Pacific', revenue: 29.6e9, growth: 1.5, margin: 33.5, color: 'bg-purple-500' },
];

function SegmentList({ segments }: { segments: Segment[] }) {
  const total = segments.reduce((s, seg) => s + seg.revenue, 0);
  return (
    <div className="divide-y divide-white/5">
      {segments.sort((a, b) => b.revenue - a.revenue).map((seg) => {
        const pct = (seg.revenue / total) * 100;
        return (
          <div key={seg.name} className="flex items-center gap-3 py-2 px-4">
            <div className={cn('h-3 w-3 rounded-full', seg.color)} />
            <span className="text-xs text-white w-32">{seg.name}</span>
            <span className="text-xs font-mono text-white w-16">{formatLargeNumber(seg.revenue)}</span>
            <span className="text-xs font-mono text-gray-400 w-12">{pct.toFixed(1)}%</span>
            <span className={cn('text-xs font-mono w-14', seg.growth >= 0 ? 'text-green-400' : 'text-red-400')}>
              {seg.growth >= 0 ? '+' : ''}{seg.growth.toFixed(1)}%
            </span>
            <div className="flex-1 h-2 rounded-full bg-white/5 overflow-hidden">
              <div className={cn('h-full rounded-full opacity-50', seg.color)} style={{ width: `${pct}%` }} />
            </div>
            <span className="text-[10px] text-gray-500 w-14">{seg.margin.toFixed(1)}% mgn</span>
          </div>
        );
      })}
    </div>
  );
}

export default function RevenueBreakdownPage() {
  const totalRev = PRODUCT.reduce((s, p) => s + p.revenue, 0);

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Revenue Breakdown</h1>
        <p className="mt-1 text-sm text-gray-500">AAPL revenue by product and geography (TTM)</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Card className="!p-3 text-center"><p className="text-[10px] text-gray-500 uppercase">Total Revenue</p><p className="text-lg font-bold text-white">{formatLargeNumber(totalRev)}</p></Card>
        <Card className="!p-3 text-center"><p className="text-[10px] text-gray-500 uppercase">Segments</p><p className="text-lg font-bold text-indigo-400">{PRODUCT.length}</p></Card>
        <Card className="!p-3 text-center"><p className="text-[10px] text-gray-500 uppercase">Regions</p><p className="text-lg font-bold text-green-400">{GEOGRAPHIC.length}</p></Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><PieChart className="h-4 w-4 text-indigo-400" /> By Product</CardTitle></CardHeader>
        <SegmentList segments={PRODUCT} />
      </Card>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><PieChart className="h-4 w-4 text-green-400" /> By Geography</CardTitle></CardHeader>
        <SegmentList segments={GEOGRAPHIC} />
      </Card>
    </motion.div>
  );
}
