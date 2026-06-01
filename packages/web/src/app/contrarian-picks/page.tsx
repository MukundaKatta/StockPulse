'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn, formatCurrency } from '@/lib/formatters';
import { RefreshCw } from 'lucide-react';

interface ContrarianPick {
  ticker: string;
  company: string;
  price: number;
  ytdChange: number;
  consensusRating: string;
  contrarianView: string;
  upside: number;
  catalyst: string;
  conviction: 'High' | 'Medium' | 'Low';
}

const PICKS: ContrarianPick[] = [
  { ticker: 'INTC', company: 'Intel Corp', price: 42.80, ytdChange: -18.5, consensusRating: 'Sell', contrarianView: 'Turnaround Play', upside: 45, catalyst: 'Foundry business ramp', conviction: 'Medium' },
  { ticker: 'PFE', company: 'Pfizer Inc', price: 28.40, ytdChange: -22.3, consensusRating: 'Hold', contrarianView: 'Deep Value', upside: 38, catalyst: 'Pipeline approvals', conviction: 'High' },
  { ticker: 'BA', company: 'Boeing Co', price: 195.20, ytdChange: -15.8, consensusRating: 'Hold', contrarianView: 'Recovery Bet', upside: 52, catalyst: 'Production ramp-up', conviction: 'Medium' },
  { ticker: 'DIS', company: 'Walt Disney', price: 102.50, ytdChange: -8.4, consensusRating: 'Hold', contrarianView: 'Streaming Inflection', upside: 35, catalyst: 'DTC profitability', conviction: 'High' },
  { ticker: 'NKE', company: 'Nike Inc', price: 98.40, ytdChange: -25.2, consensusRating: 'Sell', contrarianView: 'Brand Recovery', upside: 42, catalyst: 'DTC channel growth', conviction: 'Low' },
  { ticker: 'PYPL', company: 'PayPal', price: 62.80, ytdChange: -12.5, consensusRating: 'Hold', contrarianView: 'Undervalued Fintech', upside: 48, catalyst: 'Venmo monetization', conviction: 'High' },
  { ticker: 'BABA', company: 'Alibaba Group', price: 78.50, ytdChange: -30.1, consensusRating: 'Sell', contrarianView: 'China Reopening', upside: 55, catalyst: 'Regulatory easing', conviction: 'Low' },
];

const convictionVariant = (c: string) => c === 'High' ? 'success' : c === 'Low' ? 'danger' : 'warning';

export default function ContrarianPicksPage() {
  const avgUpside = PICKS.reduce((s, p) => s + p.upside, 0) / PICKS.length;
  const avgYtd = PICKS.reduce((s, p) => s + p.ytdChange, 0) / PICKS.length;
  const highConviction = PICKS.filter(p => p.conviction === 'High').length;
  const totalPicks = PICKS.length;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Contrarian Picks</h1>
        <p className="mt-1 text-sm text-gray-500">Contrarian investment picks</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="!p-3 text-center"><p className="text-[10px] text-gray-500 uppercase">Avg Upside</p><p className="text-lg font-bold text-green-400">{avgUpside.toFixed(0)}%</p></Card>
        <Card className="!p-3 text-center"><p className="text-[10px] text-gray-500 uppercase">Avg YTD</p><p className="text-lg font-bold text-red-400">{avgYtd.toFixed(1)}%</p></Card>
        <Card className="!p-3 text-center"><p className="text-[10px] text-gray-500 uppercase">High Conviction</p><p className="text-lg font-bold text-indigo-400">{highConviction}</p></Card>
        <Card className="!p-3 text-center"><p className="text-[10px] text-gray-500 uppercase">Total Picks</p><p className="text-lg font-bold text-white">{totalPicks}</p></Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><RefreshCw className="h-4 w-4 text-indigo-400" /> Contrarian Ideas</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {PICKS.map((p) => (
            <div key={p.ticker} className="flex items-center justify-between px-4 py-3">
              <div>
                <p className="text-sm font-medium text-white">{p.ticker} <span className="text-gray-500">{p.company}</span></p>
                <p className="text-xs text-gray-500">{p.contrarianView} &middot; {p.catalyst} &middot; Consensus: {p.consensusRating}</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-mono text-white">{formatCurrency(p.price)}</p>
                  <p className="text-[10px] text-green-400">+{p.upside}% upside</p>
                </div>
                <Badge variant={convictionVariant(p.conviction)}>{p.conviction}</Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
