'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn, formatCurrency } from '@/lib/formatters';
import { Calendar } from 'lucide-react';

interface DividendEvent {
  symbol: string;
  name: string;
  exDate: string;
  payDate: string;
  amount: number;
  yield: number;
  frequency: 'Monthly' | 'Quarterly' | 'Semi-Annual' | 'Annual';
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const EVENTS: DividendEvent[] = [
  { symbol: 'AAPL', name: 'Apple Inc', exDate: '2024-02-09', payDate: '2024-02-15', amount: 0.24, yield: 0.52, frequency: 'Quarterly' },
  { symbol: 'MSFT', name: 'Microsoft', exDate: '2024-02-14', payDate: '2024-03-14', amount: 0.75, yield: 0.74, frequency: 'Quarterly' },
  { symbol: 'JNJ', name: 'Johnson & Johnson', exDate: '2024-02-20', payDate: '2024-03-05', amount: 1.19, yield: 3.04, frequency: 'Quarterly' },
  { symbol: 'PG', name: 'Procter & Gamble', exDate: '2024-01-18', payDate: '2024-02-15', amount: 0.94, yield: 2.45, frequency: 'Quarterly' },
  { symbol: 'KO', name: 'Coca-Cola', exDate: '2024-03-14', payDate: '2024-04-01', amount: 0.485, yield: 3.12, frequency: 'Quarterly' },
  { symbol: 'PEP', name: 'PepsiCo', exDate: '2024-03-01', payDate: '2024-03-29', amount: 1.265, yield: 2.98, frequency: 'Quarterly' },
  { symbol: 'O', name: 'Realty Income', exDate: '2024-01-31', payDate: '2024-02-15', amount: 0.256, yield: 5.48, frequency: 'Monthly' },
  { symbol: 'T', name: 'AT&T Inc', exDate: '2024-01-09', payDate: '2024-02-01', amount: 0.278, yield: 6.52, frequency: 'Quarterly' },
  { symbol: 'VZ', name: 'Verizon', exDate: '2024-01-09', payDate: '2024-02-01', amount: 0.665, yield: 6.78, frequency: 'Quarterly' },
  { symbol: 'XOM', name: 'Exxon Mobil', exDate: '2024-02-13', payDate: '2024-03-11', amount: 0.95, yield: 3.64, frequency: 'Quarterly' },
];

export default function DividendCalendarPage() {
  const grouped = EVENTS.reduce<Record<string, DividendEvent[]>>((acc, e) => {
    const m = MONTHS[new Date(e.exDate).getMonth()];
    (acc[m] ??= []).push(e);
    return acc;
  }, {});

  const totalAnnual = EVENTS.reduce((s, e) => {
    const mult = e.frequency === 'Monthly' ? 12 : e.frequency === 'Quarterly' ? 4 : e.frequency === 'Semi-Annual' ? 2 : 1;
    return s + e.amount * mult;
  }, 0);

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Dividend Calendar</h1>
        <p className="mt-1 text-sm text-gray-500">Upcoming ex-dividend and payment dates</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Upcoming Payments</p><p className="text-lg font-bold text-white">{EVENTS.length}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Est. Annual Income</p><p className="text-lg font-bold text-green-400">{formatCurrency(totalAnnual)}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Avg Yield</p><p className="text-lg font-bold text-indigo-400">{(EVENTS.reduce((s, e) => s + e.yield, 0) / EVENTS.length).toFixed(2)}%</p></Card>
      </div>

      {Object.entries(grouped).map(([month, events]) => (
        <Card key={month}>
          <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><Calendar className="h-4 w-4 text-indigo-400" /> {month} 2024</CardTitle></CardHeader>
          <div className="divide-y divide-white/5">
            {events.map((e) => (
              <div key={e.symbol} className="flex items-center gap-3 py-2 px-4">
                <div className="w-16"><p className="text-xs font-bold text-white">{e.symbol}</p><p className="text-[10px] text-gray-500 truncate">{e.name}</p></div>
                <Badge variant="info">{e.frequency}</Badge>
                <div className="text-[10px] text-gray-400 w-20"><span className="text-gray-500">Ex:</span> {e.exDate.slice(5)}</div>
                <div className="text-[10px] text-gray-400 w-20"><span className="text-gray-500">Pay:</span> {e.payDate.slice(5)}</div>
                <span className="text-xs font-mono text-green-400 w-14">${e.amount.toFixed(3)}</span>
                <span className="text-xs font-mono text-indigo-400 ml-auto">{e.yield.toFixed(2)}%</span>
              </div>
            ))}
          </div>
        </Card>
      ))}
    </motion.div>
  );
}
