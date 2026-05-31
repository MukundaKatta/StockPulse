'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { formatCurrency, formatLargeNumber, cn } from '@/lib/formatters';
import { Filter, Search } from 'lucide-react';
import Link from 'next/link';

interface ScreenerStock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  marketCap: number;
  pe: number;
  volume: number;
  sector: string;
}

const SCREENER_DATA: ScreenerStock[] = [
  { symbol: 'AAPL', name: 'Apple', price: 189.45, change: 1.2, marketCap: 2950000000000, pe: 28.5, volume: 52000000, sector: 'Technology' },
  { symbol: 'MSFT', name: 'Microsoft', price: 415.60, change: 0.8, marketCap: 3100000000000, pe: 35.2, volume: 22000000, sector: 'Technology' },
  { symbol: 'NVDA', name: 'NVIDIA', price: 875.20, change: 3.5, marketCap: 2150000000000, pe: 68.4, volume: 45000000, sector: 'Technology' },
  { symbol: 'AMZN', name: 'Amazon', price: 178.90, change: 2.1, marketCap: 1850000000000, pe: 58.2, volume: 35000000, sector: 'Consumer' },
  { symbol: 'GOOGL', name: 'Alphabet', price: 155.80, change: -0.5, marketCap: 1960000000000, pe: 24.8, volume: 28000000, sector: 'Technology' },
  { symbol: 'META', name: 'Meta', price: 485.30, change: 1.5, marketCap: 1250000000000, pe: 28.2, volume: 18000000, sector: 'Technology' },
  { symbol: 'JPM', name: 'JPMorgan', price: 195.40, change: 0.3, marketCap: 580000000000, pe: 11.8, volume: 12000000, sector: 'Finance' },
  { symbol: 'JNJ', name: 'J&J', price: 158.20, change: -0.2, marketCap: 420000000000, pe: 15.2, volume: 8000000, sector: 'Healthcare' },
  { symbol: 'XOM', name: 'Exxon', price: 108.50, change: -1.8, marketCap: 450000000000, pe: 12.5, volume: 15000000, sector: 'Energy' },
  { symbol: 'TSLA', name: 'Tesla', price: 245.80, change: -2.8, marketCap: 780000000000, pe: 62.5, volume: 85000000, sector: 'Consumer' },
  { symbol: 'V', name: 'Visa', price: 282.50, change: 0.6, marketCap: 540000000000, pe: 32.1, volume: 7000000, sector: 'Finance' },
  { symbol: 'UNH', name: 'UnitedHealth', price: 528.40, change: -1.5, marketCap: 480000000000, pe: 22.8, volume: 5000000, sector: 'Healthcare' },
];

export default function StockScreenerPage() {
  const [minPE, setMinPE] = useState('');
  const [maxPE, setMaxPE] = useState('');
  const [minCap, setMinCap] = useState('');
  const [sector, setSector] = useState('all');
  const [minChange, setMinChange] = useState('');

  const filtered = useMemo(() => {
    return SCREENER_DATA.filter((s) => {
      if (minPE && s.pe < parseFloat(minPE)) return false;
      if (maxPE && s.pe > parseFloat(maxPE)) return false;
      if (minCap && s.marketCap < parseFloat(minCap) * 1e9) return false;
      if (sector !== 'all' && s.sector !== sector) return false;
      if (minChange && s.change < parseFloat(minChange)) return false;
      return true;
    });
  }, [minPE, maxPE, minCap, sector, minChange]);

  const sectors = [...new Set(SCREENER_DATA.map((s) => s.sector))];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4 sm:space-y-6"
    >
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Stock Screener</h1>
        <p className="mt-1 text-sm text-gray-500">Filter stocks by fundamental and technical criteria</p>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-indigo-400" />
            Filters
          </CardTitle>
        </CardHeader>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          <Input label="Min P/E" type="number" value={minPE} onChange={(e) => setMinPE(e.target.value)} placeholder="Any" />
          <Input label="Max P/E" type="number" value={maxPE} onChange={(e) => setMaxPE(e.target.value)} placeholder="Any" />
          <Input label="Min Cap ($B)" type="number" value={minCap} onChange={(e) => setMinCap(e.target.value)} placeholder="Any" />
          <Input label="Min Change (%)" type="number" step="0.1" value={minChange} onChange={(e) => setMinChange(e.target.value)} placeholder="Any" />
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-400">Sector</label>
            <select
              value={sector} onChange={(e) => setSector(e.target.value)}
              className="w-full rounded-lg border border-white/[0.06] bg-[#1a1a2e] px-3 py-2 text-sm text-gray-300"
            >
              <option value="all">All</option>
              {sectors.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>
        <div className="mt-3 flex items-center gap-2">
          <Badge variant="info">{filtered.length} results</Badge>
          <button onClick={() => { setMinPE(''); setMaxPE(''); setMinCap(''); setSector('all'); setMinChange(''); }}
            className="text-xs text-gray-500 hover:text-gray-300">Clear all</button>
        </div>
      </Card>

      {/* Results */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/[0.06]">
                <th className="px-3 py-2.5 text-left text-xs font-medium uppercase text-gray-500">Symbol</th>
                <th className="px-3 py-2.5 text-right text-xs font-medium uppercase text-gray-500">Price</th>
                <th className="px-3 py-2.5 text-right text-xs font-medium uppercase text-gray-500">Change</th>
                <th className="px-3 py-2.5 text-right text-xs font-medium uppercase text-gray-500">Market Cap</th>
                <th className="px-3 py-2.5 text-right text-xs font-medium uppercase text-gray-500">P/E</th>
                <th className="px-3 py-2.5 text-right text-xs font-medium uppercase text-gray-500">Volume</th>
                <th className="px-3 py-2.5 text-left text-xs font-medium uppercase text-gray-500">Sector</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((stock) => (
                <tr key={stock.symbol} className="border-b border-white/[0.03] hover:bg-white/[0.02]">
                  <td className="px-3 py-2.5">
                    <Link href={`/stock/${stock.symbol}`} className="font-mono font-bold text-indigo-400 hover:text-indigo-300">{stock.symbol}</Link>
                    <p className="text-[10px] text-gray-500">{stock.name}</p>
                  </td>
                  <td className="px-3 py-2.5 text-right font-mono text-white">{formatCurrency(stock.price)}</td>
                  <td className={cn('px-3 py-2.5 text-right font-mono text-xs', stock.change >= 0 ? 'text-green-400' : 'text-red-400')}>
                    {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)}%
                  </td>
                  <td className="px-3 py-2.5 text-right font-mono text-xs text-gray-400">{formatLargeNumber(stock.marketCap)}</td>
                  <td className="px-3 py-2.5 text-right font-mono text-xs text-gray-300">{stock.pe.toFixed(1)}</td>
                  <td className="px-3 py-2.5 text-right font-mono text-xs text-gray-400">{formatLargeNumber(stock.volume)}</td>
                  <td className="px-3 py-2.5 text-xs text-gray-400">{stock.sector}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </motion.div>
  );
}
