'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatLargeNumber, cn } from '@/lib/formatters';
import { ArrowUpRight, ArrowDownRight, DollarSign } from 'lucide-react';
import Link from 'next/link';

interface MoneyFlowData {
  symbol: string;
  name: string;
  mfi: number;
  netFlow: number;
  buyVolume: number;
  sellVolume: number;
  signal: 'accumulation' | 'distribution' | 'neutral';
}

const MF_DATA: MoneyFlowData[] = [
  { symbol: 'NVDA', name: 'NVIDIA', mfi: 72, netFlow: 850000000, buyVolume: 28000000, sellVolume: 17000000, signal: 'accumulation' },
  { symbol: 'AAPL', name: 'Apple', mfi: 58, netFlow: 420000000, buyVolume: 30000000, sellVolume: 22000000, signal: 'accumulation' },
  { symbol: 'TSLA', name: 'Tesla', mfi: 35, netFlow: -680000000, buyVolume: 35000000, sellVolume: 50000000, signal: 'distribution' },
  { symbol: 'MSFT', name: 'Microsoft', mfi: 62, netFlow: 350000000, buyVolume: 12000000, sellVolume: 10000000, signal: 'accumulation' },
  { symbol: 'META', name: 'Meta', mfi: 65, netFlow: 280000000, buyVolume: 10000000, sellVolume: 8000000, signal: 'accumulation' },
  { symbol: 'AMD', name: 'AMD', mfi: 42, netFlow: -120000000, buyVolume: 18000000, sellVolume: 22000000, signal: 'distribution' },
  { symbol: 'AMZN', name: 'Amazon', mfi: 55, netFlow: 180000000, buyVolume: 20000000, sellVolume: 15000000, signal: 'neutral' },
  { symbol: 'GOOGL', name: 'Alphabet', mfi: 52, netFlow: 95000000, buyVolume: 15000000, sellVolume: 13000000, signal: 'neutral' },
  { symbol: 'JPM', name: 'JPMorgan', mfi: 68, netFlow: 220000000, buyVolume: 8000000, sellVolume: 4000000, signal: 'accumulation' },
  { symbol: 'DIS', name: 'Disney', mfi: 28, netFlow: -340000000, buyVolume: 12000000, sellVolume: 18000000, signal: 'distribution' },
];

export default function MoneyFlowPage() {
  const [filter, setFilter] = useState<'all' | 'accumulation' | 'distribution'>('all');

  const filtered = MF_DATA
    .filter((s) => filter === 'all' || s.signal === filter)
    .sort((a, b) => Math.abs(b.netFlow) - Math.abs(a.netFlow));

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4 sm:space-y-6"
    >
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Money Flow Index</h1>
        <p className="mt-1 text-sm text-gray-500">Track institutional accumulation and distribution</p>
      </div>

      <div className="flex gap-2">
        {(['all', 'accumulation', 'distribution'] as const).map((f) => (
          <button key={f} onClick={() => setFilter(f)}
            className={cn('rounded-lg px-3 py-1.5 text-xs font-medium capitalize transition-colors', filter === f ? 'bg-indigo-500/10 text-indigo-400' : 'text-gray-500 hover:text-gray-300')}
          >{f}</button>
        ))}
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/[0.06]">
                <th className="px-3 py-2.5 text-left text-xs font-medium uppercase text-gray-500">Symbol</th>
                <th className="px-3 py-2.5 text-right text-xs font-medium uppercase text-gray-500">MFI</th>
                <th className="px-3 py-2.5 text-right text-xs font-medium uppercase text-gray-500">Net Flow</th>
                <th className="px-3 py-2.5 text-right text-xs font-medium uppercase text-gray-500">Buy Vol</th>
                <th className="px-3 py-2.5 text-right text-xs font-medium uppercase text-gray-500">Sell Vol</th>
                <th className="px-3 py-2.5 text-center text-xs font-medium uppercase text-gray-500">Signal</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((stock) => (
                <tr key={stock.symbol} className="border-b border-white/[0.03] hover:bg-white/[0.02]">
                  <td className="px-3 py-2.5">
                    <Link href={`/stock/${stock.symbol}`} className="font-mono font-bold text-indigo-400 hover:text-indigo-300">{stock.symbol}</Link>
                    <p className="text-[10px] text-gray-500">{stock.name}</p>
                  </td>
                  <td className="px-3 py-2.5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <div className="w-12 h-1.5 rounded-full bg-white/5 overflow-hidden">
                        <div className={cn('h-full rounded-full', stock.mfi > 70 ? 'bg-red-500' : stock.mfi < 30 ? 'bg-green-500' : 'bg-indigo-500')}
                          style={{ width: `${stock.mfi}%` }} />
                      </div>
                      <span className={cn('font-mono text-xs', stock.mfi > 70 ? 'text-red-400' : stock.mfi < 30 ? 'text-green-400' : 'text-gray-300')}>{stock.mfi}</span>
                    </div>
                  </td>
                  <td className={cn('px-3 py-2.5 text-right font-mono text-xs', stock.netFlow >= 0 ? 'text-green-400' : 'text-red-400')}>
                    {stock.netFlow >= 0 ? '+' : ''}{formatLargeNumber(stock.netFlow)}
                  </td>
                  <td className="px-3 py-2.5 text-right font-mono text-xs text-green-400/70">{formatLargeNumber(stock.buyVolume)}</td>
                  <td className="px-3 py-2.5 text-right font-mono text-xs text-red-400/70">{formatLargeNumber(stock.sellVolume)}</td>
                  <td className="px-3 py-2.5 text-center">
                    <Badge variant={stock.signal === 'accumulation' ? 'success' : stock.signal === 'distribution' ? 'danger' : 'info'}>
                      {stock.signal}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </motion.div>
  );
}
