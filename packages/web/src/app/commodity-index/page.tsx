'use client';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/formatters';
import { BarChart3 } from 'lucide-react';

interface IndexData { name: string; ticker: string; value: number; dayChange: number; ytdChange: number; category: string; }
const INDICES: IndexData[] = [
  { name: 'Bloomberg Commodity', ticker: 'BCOM', value: 228.4, dayChange: 0.4, ytdChange: -2.8, category: 'Broad' },
  { name: 'S&P GSCI', ticker: 'SPGSCI', value: 3482.8, dayChange: 0.8, ytdChange: 4.2, category: 'Broad' },
  { name: 'CRB Index', ticker: 'CRB', value: 284.2, dayChange: 0.2, ytdChange: 1.8, category: 'Broad' },
  { name: 'GSCI Energy', ticker: 'SPGSEN', value: 428.4, dayChange: 1.4, ytdChange: 8.4, category: 'Energy' },
  { name: 'GSCI Precious Metals', ticker: 'SPGSPM', value: 2184.8, dayChange: 0.6, ytdChange: 12.4, category: 'Metals' },
  { name: 'GSCI Agriculture', ticker: 'SPGSAG', value: 382.4, dayChange: -0.4, ytdChange: -6.8, category: 'Agriculture' },
  { name: 'GSCI Industrial Metals', ticker: 'SPGSIM', value: 1842.2, dayChange: 1.2, ytdChange: 2.4, category: 'Metals' },
  { name: 'GSCI Livestock', ticker: 'SPGSLI', value: 284.8, dayChange: -0.2, ytdChange: -1.2, category: 'Agriculture' },
];

export default function CommodityIndexPage() {
  const gainers = INDICES.filter((i) => i.dayChange > 0).length;
  const ytdPositive = INDICES.filter((i) => i.ytdChange > 0).length;
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div><h1 className="font-display text-xl sm:text-2xl font-bold text-white">Commodity Index</h1><p className="mt-1 text-sm text-gray-500">Major commodity index comparison and performance</p></div>
      <div className="grid grid-cols-3 gap-3">
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Today Green</p><p className="text-lg font-bold text-green-400">{gainers}/{INDICES.length}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">YTD Positive</p><p className="text-lg font-bold text-indigo-400">{ytdPositive}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Indices</p><p className="text-lg font-bold text-gray-400">{INDICES.length}</p></Card>
      </div>
      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><BarChart3 className="h-4 w-4 text-indigo-400" /> Index Comparison</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {INDICES.map((i) => (
            <div key={i.ticker} className="flex items-center justify-between px-4 py-2.5">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-white">{i.name}</span>
                <Badge variant="default">{i.category}</Badge>
              </div>
              <div className="flex items-center gap-3">
                <span className={cn('text-[10px] font-mono', i.dayChange > 0 ? 'text-green-400' : 'text-red-400')}>{i.dayChange > 0 ? '+' : ''}{i.dayChange.toFixed(1)}%</span>
                <span className={cn('text-sm font-bold font-mono', i.ytdChange > 0 ? 'text-green-400' : 'text-red-400')}>YTD: {i.ytdChange > 0 ? '+' : ''}{i.ytdChange.toFixed(1)}%</span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
