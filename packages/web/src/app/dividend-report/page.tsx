'use client';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/formatters';
import { DollarSign } from 'lucide-react';

interface DividendData { symbol: string; name: string; shares: number; dividend: number; annualIncome: number; yield: number; frequency: string; nextExDate: string; }
const HOLDINGS: DividendData[] = [
  { symbol: 'AAPL', name: 'Apple', shares: 50, dividend: 0.96, annualIncome: 192, yield: 0.52, frequency: 'Quarterly', nextExDate: '2024-05-10' },
  { symbol: 'MSFT', name: 'Microsoft', shares: 30, dividend: 3.00, annualIncome: 360, yield: 0.74, frequency: 'Quarterly', nextExDate: '2024-05-15' },
  { symbol: 'JNJ', name: 'Johnson & Johnson', shares: 40, dividend: 4.76, annualIncome: 762, yield: 3.04, frequency: 'Quarterly', nextExDate: '2024-05-21' },
  { symbol: 'KO', name: 'Coca-Cola', shares: 80, dividend: 1.84, annualIncome: 590, yield: 3.12, frequency: 'Quarterly', nextExDate: '2024-06-14' },
  { symbol: 'O', name: 'Realty Income', shares: 60, dividend: 3.08, annualIncome: 739, yield: 5.48, frequency: 'Monthly', nextExDate: '2024-04-30' },
  { symbol: 'VZ', name: 'Verizon', shares: 100, dividend: 2.66, annualIncome: 1064, yield: 6.42, frequency: 'Quarterly', nextExDate: '2024-04-10' },
  { symbol: 'PG', name: 'Procter & Gamble', shares: 25, dividend: 3.76, annualIncome: 376, yield: 2.38, frequency: 'Quarterly', nextExDate: '2024-04-18' },
];

export default function DividendReportPage() {
  const totalIncome = HOLDINGS.reduce((s, h) => s + h.annualIncome, 0);
  const avgYield = HOLDINGS.reduce((s, h) => s + h.yield, 0) / HOLDINGS.length;
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div><h1 className="font-display text-xl sm:text-2xl font-bold text-white">Dividend Report</h1><p className="mt-1 text-sm text-gray-500">Dividend income breakdown by holding</p></div>
      <div className="grid grid-cols-3 gap-3">
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Annual Income</p><p className="text-lg font-bold text-green-400">${totalIncome.toLocaleString()}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Avg Yield</p><p className="text-lg font-bold text-indigo-400">{avgYield.toFixed(2)}%</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Holdings</p><p className="text-lg font-bold text-gray-400">{HOLDINGS.length}</p></Card>
      </div>
      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><DollarSign className="h-4 w-4 text-indigo-400" /> Dividend Income</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {HOLDINGS.sort((a, b) => b.annualIncome - a.annualIncome).map((h) => (
            <div key={h.symbol} className="flex items-center justify-between px-4 py-2.5">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-white">{h.symbol}</span>
                <span className="text-[10px] text-gray-500">{h.name}</span>
                <Badge variant={h.yield > 4 ? 'success' : h.yield > 2 ? 'info' : 'default'}>{h.yield.toFixed(1)}%</Badge>
                <Badge variant="default">{h.frequency}</Badge>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[10px] text-gray-500">{h.shares} shares</span>
                <span className={cn('text-sm font-bold font-mono text-green-400')}>${h.annualIncome}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
