'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { cn, formatLargeNumber } from '@/lib/formatters';
import { DollarSign } from 'lucide-react';

interface CashFlowItem {
  label: string;
  q1: number;
  q2: number;
  q3: number;
  q4: number;
}

const CFO: CashFlowItem[] = [
  { label: 'Net Income', q1: 33.9e9, q2: 21.4e9, q3: 22.9e9, q4: 23.6e9 },
  { label: 'Depreciation', q1: 3.0e9, q2: 2.9e9, q3: 2.8e9, q4: 2.9e9 },
  { label: 'Stock Comp', q1: 2.8e9, q2: 2.6e9, q3: 2.5e9, q4: 2.7e9 },
  { label: 'Working Capital', q1: -1.2e9, q2: 0.8e9, q3: -0.5e9, q4: 1.1e9 },
  { label: 'Operating CF', q1: 39.8e9, q2: 28.2e9, q3: 28.8e9, q4: 31.5e9 },
];

const CFI: CashFlowItem[] = [
  { label: 'CapEx', q1: -3.8e9, q2: -3.5e9, q3: -3.2e9, q4: -3.6e9 },
  { label: 'Acquisitions', q1: -0.5e9, q2: -0.2e9, q3: 0, q4: -1.2e9 },
  { label: 'Investments', q1: -2.1e9, q2: -1.8e9, q3: -1.5e9, q4: -2.0e9 },
];

const CFF: CashFlowItem[] = [
  { label: 'Buybacks', q1: -22.0e9, q2: -20.5e9, q3: -21.8e9, q4: -23.5e9 },
  { label: 'Dividends', q1: -3.8e9, q2: -3.8e9, q3: -3.8e9, q4: -3.9e9 },
  { label: 'Debt Repay', q1: -2.5e9, q2: -1.0e9, q3: -3.2e9, q4: -1.5e9 },
];

function FlowSection({ title, items }: { title: string; items: CashFlowItem[] }) {
  return (
    <div>
      <p className="text-[10px] text-indigo-400 uppercase tracking-wide px-4 py-1">{title}</p>
      {items.map((item) => (
        <div key={item.label} className="flex items-center gap-2 py-1 px-4">
          <span className={cn('text-xs w-28', item.label === 'Operating CF' ? 'font-bold text-white' : 'text-gray-400')}>{item.label}</span>
          {[item.q1, item.q2, item.q3, item.q4].map((v, i) => (
            <span key={i} className={cn('text-xs font-mono w-18 text-right', v >= 0 ? 'text-green-400' : 'text-red-400')}>
              {formatLargeNumber(v)}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}

export default function CashFlowAnalysisPage() {
  const totalOCF = CFO[CFO.length - 1].q1 + CFO[CFO.length - 1].q2 + CFO[CFO.length - 1].q3 + CFO[CFO.length - 1].q4;
  const totalCapex = CFI[0].q1 + CFI[0].q2 + CFI[0].q3 + CFI[0].q4;
  const fcf = totalOCF + totalCapex;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Cash Flow Analysis</h1>
        <p className="mt-1 text-sm text-gray-500">AAPL quarterly cash flow statement</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Card className="!p-3 text-center">
          <p className="text-[10px] text-gray-500 uppercase">Operating CF</p>
          <p className="text-lg font-bold text-green-400">{formatLargeNumber(totalOCF)}</p>
        </Card>
        <Card className="!p-3 text-center">
          <p className="text-[10px] text-gray-500 uppercase">CapEx</p>
          <p className="text-lg font-bold text-red-400">{formatLargeNumber(totalCapex)}</p>
        </Card>
        <Card className="!p-3 text-center">
          <p className="text-[10px] text-gray-500 uppercase">Free Cash Flow</p>
          <p className="text-lg font-bold text-indigo-400">{formatLargeNumber(fcf)}</p>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sm">
            <DollarSign className="h-4 w-4 text-indigo-400" /> Quarterly Cash Flows
          </CardTitle>
          <div className="flex gap-2 ml-auto">
            {['Q1', 'Q2', 'Q3', 'Q4'].map((q) => (
              <span key={q} className="text-[10px] text-gray-500 w-18 text-right">{q}</span>
            ))}
          </div>
        </CardHeader>
        <div className="divide-y divide-white/5">
          <FlowSection title="Operating Activities" items={CFO} />
          <FlowSection title="Investing Activities" items={CFI} />
          <FlowSection title="Financing Activities" items={CFF} />
        </div>
      </Card>
    </motion.div>
  );
}
