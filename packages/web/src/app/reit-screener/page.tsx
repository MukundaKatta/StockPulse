'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/formatters';
import { Home } from 'lucide-react';

interface REIT {
  symbol: string;
  name: string;
  price: number;
  divYield: number;
  ffo: number;
  priceFfo: number;
  sector: string;
  occupancy: number;
  debtEquity: number;
}

const REITS: REIT[] = [
  { symbol: 'PLD', name: 'Prologis', price: 128.45, divYield: 2.8, ffo: 5.42, priceFfo: 23.7, sector: 'Industrial', occupancy: 97.2, debtEquity: 0.48 },
  { symbol: 'AMT', name: 'American Tower', price: 198.20, divYield: 3.4, ffo: 10.82, priceFfo: 18.3, sector: 'Infrastructure', occupancy: 98.5, debtEquity: 1.85 },
  { symbol: 'O', name: 'Realty Income', price: 54.30, divYield: 5.6, ffo: 4.02, priceFfo: 13.5, sector: 'Net Lease', occupancy: 98.8, debtEquity: 0.68 },
  { symbol: 'SPG', name: 'Simon Property', price: 148.60, divYield: 5.2, ffo: 12.45, priceFfo: 11.9, sector: 'Retail', occupancy: 95.8, debtEquity: 1.42 },
  { symbol: 'WELL', name: 'Welltower', price: 92.80, divYield: 2.6, ffo: 3.85, priceFfo: 24.1, sector: 'Healthcare', occupancy: 82.4, debtEquity: 0.72 },
  { symbol: 'EQR', name: 'Equity Residential', price: 62.15, divYield: 4.1, ffo: 3.82, priceFfo: 16.3, sector: 'Residential', occupancy: 96.1, debtEquity: 0.85 },
  { symbol: 'DLR', name: 'Digital Realty', price: 142.50, divYield: 3.4, ffo: 6.58, priceFfo: 21.6, sector: 'Data Center', occupancy: 85.2, debtEquity: 1.15 },
  { symbol: 'VICI', name: 'VICI Properties', price: 30.20, divYield: 5.5, ffo: 2.18, priceFfo: 13.9, sector: 'Gaming', occupancy: 100.0, debtEquity: 0.55 },
];

export default function REITScreenerPage() {
  const avgYield = REITS.reduce((s, r) => s + r.divYield, 0) / REITS.length;
  const avgPFFO = REITS.reduce((s, r) => s + r.priceFfo, 0) / REITS.length;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">REIT Screener</h1>
        <p className="mt-1 text-sm text-gray-500">Real Estate Investment Trusts by sector</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Card className="!p-3 text-center"><p className="text-[10px] text-gray-500 uppercase">Avg Yield</p><p className="text-lg font-bold text-green-400">{avgYield.toFixed(1)}%</p></Card>
        <Card className="!p-3 text-center"><p className="text-[10px] text-gray-500 uppercase">Avg P/FFO</p><p className="text-lg font-bold text-indigo-400">{avgPFFO.toFixed(1)}x</p></Card>
        <Card className="!p-3 text-center"><p className="text-[10px] text-gray-500 uppercase">REITs</p><p className="text-lg font-bold text-white">{REITS.length}</p></Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><Home className="h-4 w-4 text-indigo-400" /> REIT Listings</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {REITS.sort((a, b) => b.divYield - a.divYield).map((r) => (
            <div key={r.symbol} className="flex items-center gap-3 py-2 px-4">
              <div className="w-20"><p className="text-xs font-bold text-white">{r.symbol}</p><p className="text-[10px] text-gray-500 truncate">{r.name}</p></div>
              <Badge variant="info">{r.sector}</Badge>
              <span className="text-xs font-mono text-green-400 w-12">{r.divYield.toFixed(1)}%</span>
              <span className="text-xs font-mono text-gray-400 w-14">{r.priceFfo.toFixed(1)}x FFO</span>
              <span className="text-xs font-mono text-gray-400 w-12">{r.occupancy.toFixed(0)}% occ</span>
              <span className="text-xs font-mono text-gray-400 w-12">{r.debtEquity.toFixed(2)} D/E</span>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
