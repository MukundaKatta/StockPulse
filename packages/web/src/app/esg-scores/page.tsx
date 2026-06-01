'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/formatters';
import { Leaf } from 'lucide-react';

interface ESGData {
  symbol: string;
  name: string;
  totalScore: number;
  environmental: number;
  social: number;
  governance: number;
  rating: 'AAA' | 'AA' | 'A' | 'BBB' | 'BB' | 'B' | 'CCC';
  controversy: number;
}

const STOCKS: ESGData[] = [
  { symbol: 'MSFT', name: 'Microsoft', totalScore: 82, environmental: 88, social: 78, governance: 80, rating: 'AAA', controversy: 1 },
  { symbol: 'AAPL', name: 'Apple Inc', totalScore: 75, environmental: 82, social: 72, governance: 71, rating: 'AA', controversy: 2 },
  { symbol: 'GOOGL', name: 'Alphabet', totalScore: 72, environmental: 78, social: 68, governance: 70, rating: 'AA', controversy: 3 },
  { symbol: 'NVDA', name: 'NVIDIA Corp', totalScore: 68, environmental: 72, social: 65, governance: 67, rating: 'A', controversy: 1 },
  { symbol: 'JNJ', name: 'Johnson & Johnson', totalScore: 65, environmental: 70, social: 58, governance: 67, rating: 'A', controversy: 4 },
  { symbol: 'META', name: 'Meta Platforms', totalScore: 55, environmental: 62, social: 42, governance: 61, rating: 'BBB', controversy: 5 },
  { symbol: 'XOM', name: 'Exxon Mobil', totalScore: 42, environmental: 28, social: 52, governance: 46, rating: 'BB', controversy: 4 },
  { symbol: 'TSLA', name: 'Tesla Inc', totalScore: 38, environmental: 65, social: 22, governance: 27, rating: 'B', controversy: 5 },
];

function ratingVariant(r: string): 'success' | 'info' | 'warning' | 'danger' | 'default' {
  if (r === 'AAA' || r === 'AA') return 'success';
  if (r === 'A') return 'info';
  if (r === 'BBB') return 'warning';
  return 'danger';
}

export default function ESGScoresPage() {
  const avgScore = STOCKS.reduce((s, st) => s + st.totalScore, 0) / STOCKS.length;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">ESG Scores</h1>
        <p className="mt-1 text-sm text-gray-500">Environmental, Social & Governance ratings</p>
      </div>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><Leaf className="h-4 w-4 text-green-400" /> ESG Ratings</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {STOCKS.sort((a, b) => b.totalScore - a.totalScore).map((s) => (
            <div key={s.symbol} className="flex items-center gap-3 py-2 px-4">
              <div className="w-20"><p className="text-xs font-bold text-white">{s.symbol}</p><p className="text-[10px] text-gray-500 truncate">{s.name}</p></div>
              <Badge variant={ratingVariant(s.rating)}>{s.rating}</Badge>
              <div className="flex-1 grid grid-cols-3 gap-2">
                <div><p className="text-[9px] text-gray-500">E</p><div className="h-1.5 rounded bg-white/5 overflow-hidden"><div className="bg-green-500/50 h-full" style={{ width: `${s.environmental}%` }} /></div></div>
                <div><p className="text-[9px] text-gray-500">S</p><div className="h-1.5 rounded bg-white/5 overflow-hidden"><div className="bg-blue-500/50 h-full" style={{ width: `${s.social}%` }} /></div></div>
                <div><p className="text-[9px] text-gray-500">G</p><div className="h-1.5 rounded bg-white/5 overflow-hidden"><div className="bg-purple-500/50 h-full" style={{ width: `${s.governance}%` }} /></div></div>
              </div>
              <span className="text-xs font-mono font-bold text-white w-8">{s.totalScore}</span>
              <span className="text-[10px] text-gray-500">Ctrv: {s.controversy}/5</span>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
