'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { cn, formatLargeNumber } from '@/lib/formatters';
import { Building } from 'lucide-react';

interface BalanceSheetItem {
  label: string;
  values: number[];
  bold?: boolean;
}

const PERIODS = ['Q4 2023', 'Q3 2023', 'Q2 2023', 'Q1 2023'];

const ASSETS: BalanceSheetItem[] = [
  { label: 'Cash & Equivalents', values: [29.9e9, 29.6e9, 28.4e9, 24.7e9] },
  { label: 'Short-Term Investments', values: [31.5e9, 31.1e9, 34.1e9, 31.0e9] },
  { label: 'Accounts Receivable', values: [60.9e9, 60.2e9, 39.2e9, 26.7e9] },
  { label: 'Inventories', values: [6.5e9, 6.3e9, 7.4e9, 7.5e9] },
  { label: 'Total Current Assets', values: [143.6e9, 143.5e9, 135.4e9, 112.3e9], bold: true },
  { label: 'PP&E', values: [43.7e9, 43.3e9, 43.3e9, 42.1e9] },
  { label: 'Goodwill & Intangibles', values: [0, 0, 0, 0] },
  { label: 'Total Assets', values: [352.6e9, 352.4e9, 335.0e9, 332.2e9], bold: true },
];

const LIABILITIES: BalanceSheetItem[] = [
  { label: 'Accounts Payable', values: [58.1e9, 58.0e9, 46.7e9, 37.6e9] },
  { label: 'Short-Term Debt', values: [17.4e9, 15.8e9, 18.2e9, 11.9e9] },
  { label: 'Total Current Liab.', values: [145.3e9, 145.1e9, 137.3e9, 124.6e9], bold: true },
  { label: 'Long-Term Debt', values: [95.3e9, 95.3e9, 98.1e9, 98.1e9] },
  { label: 'Total Liabilities', values: [290.4e9, 290.0e9, 278.0e9, 273.3e9], bold: true },
  { label: "Stockholders' Equity", values: [62.2e9, 62.4e9, 57.0e9, 58.9e9], bold: true },
];

function Section({ title, items }: { title: string; items: BalanceSheetItem[] }) {
  return (
    <div>
      <p className="text-[10px] text-indigo-400 uppercase tracking-wide px-4 py-1">{title}</p>
      {items.map((item) => (
        <div key={item.label} className="flex items-center gap-2 py-1 px-4">
          <span className={cn('text-xs w-32 truncate', item.bold ? 'font-bold text-white' : 'text-gray-400')}>{item.label}</span>
          {item.values.map((v, i) => (
            <span key={i} className={cn('text-xs font-mono w-20 text-right', item.bold ? 'text-white' : 'text-gray-400')}>
              {v === 0 ? '-' : formatLargeNumber(v)}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}

export default function BalanceSheetPage() {
  const equity = LIABILITIES[LIABILITIES.length - 1].values[0];
  const totalAssets = ASSETS[ASSETS.length - 1].values[0];
  const totalDebt = LIABILITIES[3].values[0] + LIABILITIES[1]?.values[0];

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Balance Sheet</h1>
        <p className="mt-1 text-sm text-gray-500">AAPL quarterly balance sheet summary</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Card className="!p-3 text-center">
          <p className="text-[10px] text-gray-500 uppercase">Total Assets</p>
          <p className="text-lg font-bold text-white">{formatLargeNumber(totalAssets)}</p>
        </Card>
        <Card className="!p-3 text-center">
          <p className="text-[10px] text-gray-500 uppercase">Total Debt</p>
          <p className="text-lg font-bold text-red-400">{formatLargeNumber(totalDebt)}</p>
        </Card>
        <Card className="!p-3 text-center">
          <p className="text-[10px] text-gray-500 uppercase">Equity</p>
          <p className="text-lg font-bold text-green-400">{formatLargeNumber(equity)}</p>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sm">
            <Building className="h-4 w-4 text-indigo-400" /> Quarterly Data
          </CardTitle>
          <div className="flex gap-2 ml-auto">
            {PERIODS.map((p) => (
              <span key={p} className="text-[10px] text-gray-500 w-20 text-right">{p}</span>
            ))}
          </div>
        </CardHeader>
        <div className="divide-y divide-white/5">
          <Section title="Assets" items={ASSETS} />
          <Section title="Liabilities & Equity" items={LIABILITIES} />
        </div>
      </Card>
    </motion.div>
  );
}
