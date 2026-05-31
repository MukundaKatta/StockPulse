'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { formatCurrency, cn } from '@/lib/formatters';
import { Activity, ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface OptionsFlow {
  id: string;
  symbol: string;
  type: 'CALL' | 'PUT';
  strike: number;
  expiry: string;
  premium: number;
  volume: number;
  openInterest: number;
  sentiment: 'bullish' | 'bearish' | 'neutral';
  timestamp: string;
}

const MOCK_FLOW: OptionsFlow[] = [
  { id: '1', symbol: 'AAPL', type: 'CALL', strike: 200, expiry: '2026-06-20', premium: 2340000, volume: 15200, openInterest: 45000, sentiment: 'bullish', timestamp: '10:32 AM' },
  { id: '2', symbol: 'NVDA', type: 'CALL', strike: 1000, expiry: '2026-07-18', premium: 5670000, volume: 8900, openInterest: 22000, sentiment: 'bullish', timestamp: '10:28 AM' },
  { id: '3', symbol: 'TSLA', type: 'PUT', strike: 150, expiry: '2026-06-13', premium: 1890000, volume: 12300, openInterest: 38000, sentiment: 'bearish', timestamp: '10:25 AM' },
  { id: '4', symbol: 'SPY', type: 'PUT', strike: 520, expiry: '2026-06-20', premium: 8900000, volume: 42000, openInterest: 125000, sentiment: 'bearish', timestamp: '10:20 AM' },
  { id: '5', symbol: 'MSFT', type: 'CALL', strike: 450, expiry: '2026-07-18', premium: 3210000, volume: 6500, openInterest: 18000, sentiment: 'bullish', timestamp: '10:15 AM' },
  { id: '6', symbol: 'AMD', type: 'CALL', strike: 180, expiry: '2026-06-20', premium: 1560000, volume: 9800, openInterest: 29000, sentiment: 'bullish', timestamp: '10:10 AM' },
  { id: '7', symbol: 'META', type: 'PUT', strike: 450, expiry: '2026-06-13', premium: 2780000, volume: 5400, openInterest: 15000, sentiment: 'bearish', timestamp: '10:05 AM' },
  { id: '8', symbol: 'AMZN', type: 'CALL', strike: 200, expiry: '2026-07-18', premium: 4100000, volume: 7200, openInterest: 21000, sentiment: 'bullish', timestamp: '10:00 AM' },
];

function formatPremium(value: number): string {
  if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
  if (value >= 1000) return `$${(value / 1000).toFixed(0)}K`;
  return `$${value}`;
}

export default function OptionsPage() {
  const [filter, setFilter] = useState<'all' | 'calls' | 'puts'>('all');
  const [search, setSearch] = useState('');

  const filtered = MOCK_FLOW.filter((f) => {
    if (filter === 'calls' && f.type !== 'CALL') return false;
    if (filter === 'puts' && f.type !== 'PUT') return false;
    if (search && !f.symbol.includes(search.toUpperCase())) return false;
    return true;
  });

  const totalCallPremium = MOCK_FLOW.filter((f) => f.type === 'CALL').reduce((s, f) => s + f.premium, 0);
  const totalPutPremium = MOCK_FLOW.filter((f) => f.type === 'PUT').reduce((s, f) => s + f.premium, 0);
  const putCallRatio = totalCallPremium > 0 ? totalPutPremium / totalCallPremium : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4 sm:space-y-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Options Flow</h1>
          <p className="mt-1 text-sm text-gray-500">Track unusual options activity and smart money moves</p>
        </div>
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Filter by symbol..."
          className="w-40"
        />
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-3">
        <Card className="!p-3">
          <div className="flex items-center gap-2">
            <ArrowUpRight className="h-4 w-4 text-green-400" />
            <div>
              <p className="text-xs text-gray-500">Call Premium</p>
              <p className="text-sm font-bold text-green-400">{formatPremium(totalCallPremium)}</p>
            </div>
          </div>
        </Card>
        <Card className="!p-3">
          <div className="flex items-center gap-2">
            <ArrowDownRight className="h-4 w-4 text-red-400" />
            <div>
              <p className="text-xs text-gray-500">Put Premium</p>
              <p className="text-sm font-bold text-red-400">{formatPremium(totalPutPremium)}</p>
            </div>
          </div>
        </Card>
        <Card className="!p-3">
          <div className="flex items-center gap-2">
            <Activity className="h-4 w-4 text-indigo-400" />
            <div>
              <p className="text-xs text-gray-500">Put/Call Ratio</p>
              <p className="text-sm font-bold text-white">{putCallRatio.toFixed(2)}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex gap-2">
        {(['all', 'calls', 'puts'] as const).map((f) => (
          <Button key={f} variant={filter === f ? 'primary' : 'secondary'} onClick={() => setFilter(f)}>
            {f === 'all' ? 'All' : f === 'calls' ? 'Calls Only' : 'Puts Only'}
          </Button>
        ))}
      </div>

      {/* Flow table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/[0.06]">
                <th className="px-3 py-2.5 text-left text-xs font-medium uppercase text-gray-500">Time</th>
                <th className="px-3 py-2.5 text-left text-xs font-medium uppercase text-gray-500">Symbol</th>
                <th className="px-3 py-2.5 text-center text-xs font-medium uppercase text-gray-500">Type</th>
                <th className="px-3 py-2.5 text-right text-xs font-medium uppercase text-gray-500">Strike</th>
                <th className="px-3 py-2.5 text-center text-xs font-medium uppercase text-gray-500">Expiry</th>
                <th className="px-3 py-2.5 text-right text-xs font-medium uppercase text-gray-500">Premium</th>
                <th className="px-3 py-2.5 text-right text-xs font-medium uppercase text-gray-500">Volume</th>
                <th className="px-3 py-2.5 text-center text-xs font-medium uppercase text-gray-500">Signal</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((flow) => (
                <tr key={flow.id} className="border-b border-white/[0.03] hover:bg-white/[0.02]">
                  <td className="px-3 py-2.5 text-xs text-gray-500">{flow.timestamp}</td>
                  <td className="px-3 py-2.5 font-mono font-bold text-indigo-400">{flow.symbol}</td>
                  <td className="px-3 py-2.5 text-center">
                    <Badge variant={flow.type === 'CALL' ? 'success' : 'danger'}>
                      {flow.type}
                    </Badge>
                  </td>
                  <td className="px-3 py-2.5 text-right font-mono text-gray-300">{formatCurrency(flow.strike)}</td>
                  <td className="px-3 py-2.5 text-center text-gray-400 text-xs">
                    {new Date(flow.expiry).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </td>
                  <td className="px-3 py-2.5 text-right font-mono font-medium text-white">{formatPremium(flow.premium)}</td>
                  <td className="px-3 py-2.5 text-right font-mono text-gray-400">{flow.volume.toLocaleString()}</td>
                  <td className="px-3 py-2.5 text-center">
                    <Badge variant={flow.sentiment === 'bullish' ? 'success' : flow.sentiment === 'bearish' ? 'danger' : 'info'}>
                      {flow.sentiment}
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
