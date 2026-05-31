'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn, formatLargeNumber } from '@/lib/formatters';
import { FileText } from 'lucide-react';

interface Fundamental {
  label: string;
  value: string;
  category: string;
}

const FUNDAMENTALS: Fundamental[] = [
  { label: 'Market Cap', value: '$2.89T', category: 'Valuation' },
  { label: 'Enterprise Value', value: '$2.95T', category: 'Valuation' },
  { label: 'P/E (TTM)', value: '29.8x', category: 'Valuation' },
  { label: 'Forward P/E', value: '27.2x', category: 'Valuation' },
  { label: 'PEG Ratio', value: '2.85', category: 'Valuation' },
  { label: 'P/S (TTM)', value: '7.52x', category: 'Valuation' },
  { label: 'P/B', value: '45.2x', category: 'Valuation' },
  { label: 'EV/EBITDA', value: '22.8x', category: 'Valuation' },
  { label: 'Revenue (TTM)', value: '$385.1B', category: 'Income' },
  { label: 'Revenue Growth', value: '-2.8%', category: 'Income' },
  { label: 'Gross Margin', value: '45.6%', category: 'Income' },
  { label: 'Operating Margin', value: '30.2%', category: 'Income' },
  { label: 'Net Margin', value: '26.4%', category: 'Income' },
  { label: 'EPS (TTM)', value: '$6.42', category: 'Income' },
  { label: 'Total Cash', value: '$162.1B', category: 'Balance Sheet' },
  { label: 'Total Debt', value: '$111.1B', category: 'Balance Sheet' },
  { label: 'Debt/Equity', value: '181%', category: 'Balance Sheet' },
  { label: 'Current Ratio', value: '0.99', category: 'Balance Sheet' },
  { label: 'ROE', value: '156.1%', category: 'Profitability' },
  { label: 'ROA', value: '28.4%', category: 'Profitability' },
  { label: 'ROIC', value: '52.8%', category: 'Profitability' },
  { label: 'FCF/Share', value: '$6.85', category: 'Profitability' },
  { label: 'Dividend Yield', value: '0.55%', category: 'Dividends' },
  { label: 'Payout Ratio', value: '15.8%', category: 'Dividends' },
  { label: 'Ex-Dividend', value: '2024-02-09', category: 'Dividends' },
  { label: '52W High', value: '$199.62', category: 'Trading' },
  { label: '52W Low', value: '$143.90', category: 'Trading' },
  { label: 'Beta', value: '1.28', category: 'Trading' },
  { label: 'Avg Volume', value: '54.2M', category: 'Trading' },
  { label: 'Short Interest', value: '0.82%', category: 'Trading' },
];

export default function StockFundamentalsPage() {
  const categories = [...new Set(FUNDAMENTALS.map((f) => f.category))];

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl space-y-4 sm:space-y-6">
      <div className="flex items-center gap-3">
        <div>
          <h1 className="font-display text-xl sm:text-2xl font-bold text-white">AAPL Fundamentals</h1>
          <p className="mt-1 text-sm text-gray-500">Apple Inc - Key financial metrics</p>
        </div>
        <Badge variant="info" className="ml-auto">$186.05</Badge>
      </div>

      {categories.map((cat) => (
        <Card key={cat}>
          <CardHeader>
            <CardTitle className="text-sm flex items-center gap-2">
              <FileText className="h-3.5 w-3.5 text-indigo-400" /> {cat}
            </CardTitle>
          </CardHeader>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-px bg-white/5">
            {FUNDAMENTALS.filter((f) => f.category === cat).map((f) => (
              <div key={f.label} className="bg-[#12121a] p-2.5">
                <p className="text-[10px] text-gray-500 uppercase">{f.label}</p>
                <p className="text-xs font-mono font-bold text-white mt-0.5">{f.value}</p>
              </div>
            ))}
          </div>
        </Card>
      ))}
    </motion.div>
  );
}
