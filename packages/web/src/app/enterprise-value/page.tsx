'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn, formatCurrency } from '@/lib/formatters';
import { Building2 } from 'lucide-react';

interface EVData {
  symbol: string;
  name: string;
  marketCap: number;
  totalDebt: number;
  cash: number;
  enterpriseValue: number;
  evToEbitda: number;
  evToRevenue: number;
  sector: string;
}

const STOCKS: EVData[] = [
  { symbol: 'AAPL', name: 'Apple', marketCap: 2950, totalDebt: 111, cash: 162, enterpriseValue: 2899, evToEbitda: 22.4, evToRevenue: 7.6, sector: 'Tech' },
  { symbol: 'MSFT', name: 'Microsoft', marketCap: 3080, totalDebt: 47, cash: 81, enterpriseValue: 3046, evToEbitda: 25.8, evToRevenue: 13.4, sector: 'Tech' },
  { symbol: 'NVDA', name: 'NVIDIA', marketCap: 1820, totalDebt: 11, cash: 26, enterpriseValue: 1805, evToEbitda: 48.2, evToRevenue: 29.6, sector: 'Tech' },
  { symbol: 'AMZN', name: 'Amazon', marketCap: 1580, totalDebt: 67, cash: 73, enterpriseValue: 1574, evToEbitda: 18.5, evToRevenue: 2.7, sector: 'Consumer' },
  { symbol: 'GOOGL', name: 'Alphabet', marketCap: 1740, totalDebt: 29, cash: 111, enterpriseValue: 1658, evToEbitda: 15.2, evToRevenue: 5.4, sector: 'Tech' },
  { symbol: 'META', name: 'Meta', marketCap: 1210, totalDebt: 18, cash: 65, enterpriseValue: 1163, evToEbitda: 16.8, evToRevenue: 8.6, sector: 'Tech' },
  { symbol: 'TSLA', name: 'Tesla', marketCap: 590, totalDebt: 5, cash: 29, enterpriseValue: 566, evToEbitda: 42.1, evToRevenue: 5.8, sector: 'Auto' },
  { symbol: 'JPM', name: 'JP Morgan', marketCap: 540, totalDebt: 295, cash: 32, enterpriseValue: 803, evToEbitda: 8.2, evToRevenue: 4.8, sector: 'Finance' },
];

export default function EnterpriseValuePage() {
  const totalEv = STOCKS.reduce((s, st) => s + st.enterpriseValue, 0);
  const avgEvEbitda = STOCKS.reduce((s, st) => s + st.evToEbitda, 0) / STOCKS.length;
  const avgEvRev = STOCKS.reduce((s, st) => s + st.evToRevenue, 0) / STOCKS.length;
  const undervalued = STOCKS.filter((s) => s.evToEbitda < 20).length;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Enterprise Value</h1>
        <p className="mt-1 text-sm text-gray-500">Enterprise value calculation and valuation multiples</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="!p-3">
          <p className="text-[10px] text-gray-500 uppercase">Total EV</p>
          <p className="text-lg font-bold text-white">${(totalEv / 1000).toFixed(1)}T</p>
        </Card>
        <Card className="!p-3">
          <p className="text-[10px] text-gray-500 uppercase">Avg EV/EBITDA</p>
          <p className="text-lg font-bold text-indigo-400">{avgEvEbitda.toFixed(1)}x</p>
        </Card>
        <Card className="!p-3">
          <p className="text-[10px] text-gray-500 uppercase">Avg EV/Rev</p>
          <p className="text-lg font-bold text-amber-400">{avgEvRev.toFixed(1)}x</p>
        </Card>
        <Card className="!p-3">
          <p className="text-[10px] text-gray-500 uppercase">EV/EBITDA &lt;20</p>
          <p className="text-lg font-bold text-green-400">{undervalued}</p>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sm">
            <Building2 className="h-4 w-4 text-indigo-400" /> Enterprise Value Breakdown
          </CardTitle>
        </CardHeader>
        <div className="divide-y divide-white/5">
          {STOCKS.sort((a, b) => b.enterpriseValue - a.enterpriseValue).map((s) => (
            <div key={s.symbol} className="flex items-center gap-3 py-2 px-4">
              <div className="w-20">
                <p className="text-xs font-bold text-white">{s.symbol}</p>
                <p className="text-[10px] text-gray-500">{s.name}</p>
              </div>
              <Badge variant={s.sector === 'Tech' ? 'info' : s.sector === 'Consumer' ? 'warning' : s.sector === 'Finance' ? 'success' : 'default'}>
                {s.sector}
              </Badge>
              <span className="text-xs font-mono text-white w-16">{formatCurrency(s.enterpriseValue)}B</span>
              <span className="text-[10px] font-mono text-gray-400 w-16">MCap: ${s.marketCap}B</span>
              <span className={cn('text-xs font-mono w-14', s.evToEbitda < 20 ? 'text-green-400' : s.evToEbitda < 30 ? 'text-amber-400' : 'text-red-400')}>
                {s.evToEbitda}x EV/E
              </span>
              <span className="text-[10px] text-gray-500 ml-auto">Debt: ${s.totalDebt}B | Cash: ${s.cash}B</span>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
