'use client';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/formatters';
import { ClipboardList } from 'lucide-react';

interface ReportSection { label: string; value: string; change: number; status: string; }
const SECTIONS: ReportSection[] = [
  { label: 'Total Value', value: '$548,200', change: 13.7, status: 'On Track' },
  { label: 'Cash Position', value: '$42,800', change: -2.4, status: 'Low' },
  { label: 'Equity Allocation', value: '72.4%', change: 3.2, status: 'Overweight' },
  { label: 'Fixed Income', value: '18.2%', change: -1.8, status: 'Underweight' },
  { label: 'Dividend Yield', value: '2.4%', change: 0.2, status: 'On Track' },
  { label: 'Expense Ratio', value: '0.18%', change: -0.02, status: 'Good' },
  { label: 'Sharpe Ratio', value: '1.34', change: 0.12, status: 'Good' },
  { label: 'Max Drawdown', value: '-8.4%', change: 1.2, status: 'Improved' },
  { label: 'Win Rate', value: '64.2%', change: 2.8, status: 'Good' },
  { label: 'Turnover', value: '28.4%', change: -4.2, status: 'On Track' },
];

export default function PortfolioReportPage() {
  const good = SECTIONS.filter((s) => s.status === 'Good' || s.status === 'On Track' || s.status === 'Improved').length;
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div><h1 className="font-display text-xl sm:text-2xl font-bold text-white">Portfolio Report</h1><p className="mt-1 text-sm text-gray-500">Comprehensive portfolio health and performance report</p></div>
      <div className="grid grid-cols-3 gap-3">
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Health Score</p><p className="text-lg font-bold text-green-400">{Math.round((good / SECTIONS.length) * 100)}%</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">On Track</p><p className="text-lg font-bold text-indigo-400">{good}/{SECTIONS.length}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Needs Attention</p><p className="text-lg font-bold text-amber-400">{SECTIONS.length - good}</p></Card>
      </div>
      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><ClipboardList className="h-4 w-4 text-indigo-400" /> Report Card</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {SECTIONS.map((s) => (
            <div key={s.label} className="flex items-center justify-between px-4 py-2.5">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-white">{s.label}</span>
                <Badge variant={s.status === 'Good' || s.status === 'On Track' || s.status === 'Improved' ? 'success' : s.status === 'Low' ? 'danger' : 'warning'}>{s.status}</Badge>
              </div>
              <div className="flex items-center gap-3">
                <span className={cn('text-[10px] font-mono', s.change > 0 ? 'text-green-400' : 'text-red-400')}>{s.change > 0 ? '+' : ''}{s.change}</span>
                <span className="text-sm font-bold font-mono text-white">{s.value}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
