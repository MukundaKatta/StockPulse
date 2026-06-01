'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { cn, formatLargeNumber } from '@/lib/formatters';
import { FileText } from 'lucide-react';

interface LineItem {
  label: string;
  values: number[];
  bold?: boolean;
  indent?: boolean;
}

const PERIODS = ['Q4 2023', 'Q3 2023', 'Q2 2023', 'Q1 2023'];

const ITEMS: LineItem[] = [
  { label: 'Revenue', values: [119.6e9, 89.5e9, 81.8e9, 94.8e9], bold: true },
  { label: 'Cost of Revenue', values: [-64.7e9, -49.1e9, -45.4e9, -51.9e9], indent: true },
  { label: 'Gross Profit', values: [54.9e9, 40.4e9, 36.4e9, 42.9e9], bold: true },
  { label: 'R&D Expenses', values: [-7.7e9, -7.3e9, -7.4e9, -7.5e9], indent: true },
  { label: 'SG&A Expenses', values: [-6.8e9, -6.2e9, -5.9e9, -6.2e9], indent: true },
  { label: 'Operating Income', values: [40.4e9, 26.9e9, 23.1e9, 29.2e9], bold: true },
  { label: 'Interest Income', values: [1.0e9, 0.9e9, 0.8e9, 0.8e9], indent: true },
  { label: 'Other Income', values: [-0.4e9, -0.1e9, 0.2e9, -0.2e9], indent: true },
  { label: 'Pre-Tax Income', values: [41.0e9, 27.7e9, 24.1e9, 29.8e9], bold: true },
  { label: 'Tax Provision', values: [-7.1e9, -4.8e9, -4.2e9, -5.6e9], indent: true },
  { label: 'Net Income', values: [33.9e9, 22.9e9, 19.9e9, 24.2e9], bold: true },
];

export default function IncomeStatementPage() {
  const ttmRevenue = ITEMS[0].values.reduce((s, v) => s + v, 0);
  const ttmNetIncome = ITEMS[ITEMS.length - 1].values.reduce((s, v) => s + v, 0);
  const netMargin = (ttmNetIncome / ttmRevenue) * 100;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Income Statement</h1>
        <p className="mt-1 text-sm text-gray-500">AAPL quarterly income statement</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Card className="!p-3 text-center"><p className="text-[10px] text-gray-500 uppercase">TTM Revenue</p><p className="text-lg font-bold text-white">{formatLargeNumber(ttmRevenue)}</p></Card>
        <Card className="!p-3 text-center"><p className="text-[10px] text-gray-500 uppercase">TTM Net Income</p><p className="text-lg font-bold text-green-400">{formatLargeNumber(ttmNetIncome)}</p></Card>
        <Card className="!p-3 text-center"><p className="text-[10px] text-gray-500 uppercase">Net Margin</p><p className="text-lg font-bold text-indigo-400">{netMargin.toFixed(1)}%</p></Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sm"><FileText className="h-4 w-4 text-indigo-400" /> Quarterly Data</CardTitle>
          <div className="flex gap-2 ml-auto">{PERIODS.map((p) => <span key={p} className="text-[10px] text-gray-500 w-18 text-right">{p}</span>)}</div>
        </CardHeader>
        <div className="divide-y divide-white/5">
          {ITEMS.map((item) => (
            <div key={item.label} className="flex items-center gap-2 py-1 px-4">
              <span className={cn('text-xs w-32', item.indent ? 'pl-3 text-gray-400' : item.bold ? 'font-bold text-white' : 'text-gray-400')}>{item.label}</span>
              {item.values.map((v, i) => (
                <span key={i} className={cn('text-xs font-mono w-18 text-right', v >= 0 ? (item.bold ? 'text-white' : 'text-gray-400') : 'text-red-400')}>
                  {formatLargeNumber(v)}
                </span>
              ))}
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
