'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn, formatLargeNumber } from '@/lib/formatters';
import { Vault } from 'lucide-react';

interface CashRichStock {
  symbol: string;
  name: string;
  cashOnHand: number;
  totalDebt: number;
  netCash: number;
  cashPerShare: number;
  price: number;
  cashToMktCap: number;
  sector: string;
}

const STOCKS: CashRichStock[] = [
  { symbol: 'AAPL', name: 'Apple Inc', cashOnHand: 162e9, totalDebt: 111e9, netCash: 51e9, cashPerShare: 10.50, price: 195.80, cashToMktCap: 5.4, sector: 'Technology' },
  { symbol: 'GOOGL', name: 'Alphabet', cashOnHand: 118e9, totalDebt: 28e9, netCash: 90e9, cashPerShare: 7.30, price: 148.20, cashToMktCap: 4.8, sector: 'Technology' },
  { symbol: 'MSFT', name: 'Microsoft', cashOnHand: 111e9, totalDebt: 59e9, netCash: 52e9, cashPerShare: 14.80, price: 405.60, cashToMktCap: 3.6, sector: 'Technology' },
  { symbol: 'META', name: 'Meta Platforms', cashOnHand: 65e9, totalDebt: 37e9, netCash: 28e9, cashPerShare: 10.20, price: 485.20, cashToMktCap: 2.1, sector: 'Technology' },
  { symbol: 'BRK.B', name: 'Berkshire Hathaway', cashOnHand: 167e9, totalDebt: 45e9, netCash: 122e9, cashPerShare: 56.40, price: 408.50, cashToMktCap: 13.8, sector: 'Financials' },
  { symbol: 'AMZN', name: 'Amazon', cashOnHand: 73e9, totalDebt: 67e9, netCash: 6e9, cashPerShare: 7.10, price: 172.40, cashToMktCap: 4.1, sector: 'Consumer Disc.' },
  { symbol: 'CSCO', name: 'Cisco Systems', cashOnHand: 25e9, totalDebt: 9e9, netCash: 16e9, cashPerShare: 6.10, price: 50.20, cashToMktCap: 12.2, sector: 'Technology' },
  { symbol: 'ORCL', name: 'Oracle Corp', cashOnHand: 12e9, totalDebt: 86e9, netCash: -74e9, cashPerShare: 4.40, price: 125.80, cashToMktCap: 3.5, sector: 'Technology' },
];

export default function CashRichStocksPage() {
  const totalCash = STOCKS.reduce((s, st) => s + st.cashOnHand, 0);
  const totalNetCash = STOCKS.reduce((s, st) => s + st.netCash, 0);
  const avgCashRatio = STOCKS.reduce((s, st) => s + st.cashToMktCap, 0) / STOCKS.length;
  const netPositive = STOCKS.filter((s) => s.netCash > 0).length;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Cash Rich Stocks</h1>
        <p className="mt-1 text-sm text-gray-500">Companies with most cash on hand</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Total Cash</p><p className="text-lg font-bold text-green-400">{formatLargeNumber(totalCash)}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Total Net Cash</p><p className={cn('text-lg font-bold', totalNetCash >= 0 ? 'text-green-400' : 'text-red-400')}>{formatLargeNumber(totalNetCash)}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Avg Cash/MktCap</p><p className="text-lg font-bold text-indigo-400">{avgCashRatio.toFixed(1)}%</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Net Cash Positive</p><p className="text-lg font-bold text-amber-400">{netPositive}/{STOCKS.length}</p></Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><Vault className="h-4 w-4 text-indigo-400" /> Cash Holdings</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {STOCKS.sort((a, b) => b.cashOnHand - a.cashOnHand).map((s) => (
            <div key={s.symbol} className="flex items-center gap-3 py-2.5 px-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-white">{s.symbol}</span>
                  <span className="text-[10px] text-gray-500">{s.name}</span>
                  <Badge variant={s.netCash > 0 ? 'success' : 'danger'}>{s.netCash > 0 ? 'Net Cash' : 'Net Debt'}</Badge>
                </div>
                <p className="text-[10px] text-gray-500">{s.sector} - ${s.cashPerShare.toFixed(2)}/share</p>
              </div>
              <span className="text-sm font-mono font-bold text-green-400">{formatLargeNumber(s.cashOnHand)}</span>
              <span className="text-xs font-mono text-red-400 w-16 text-right">Debt {formatLargeNumber(s.totalDebt)}</span>
              <span className={cn('text-xs font-mono w-16 text-right', s.netCash >= 0 ? 'text-green-400' : 'text-red-400')}>
                Net {formatLargeNumber(Math.abs(s.netCash))}
              </span>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
