'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/formatters';
import { Globe } from 'lucide-react';

interface GlobalIndex {
  region: string;
  name: string;
  country: string;
  value: number;
  change: number;
  status: 'open' | 'closed' | 'pre';
}

const INDICES: GlobalIndex[] = [
  { region: 'Americas', name: 'S&P 500', country: 'US', value: 4783.83, change: 0.56, status: 'open' },
  { region: 'Americas', name: 'Dow Jones', country: 'US', value: 37468.61, change: 0.31, status: 'open' },
  { region: 'Americas', name: 'Nasdaq', country: 'US', value: 15055.65, change: 0.74, status: 'open' },
  { region: 'Americas', name: 'TSX', country: 'CA', value: 20958.40, change: 0.18, status: 'open' },
  { region: 'Americas', name: 'Bovespa', country: 'BR', value: 130988, change: -0.42, status: 'closed' },
  { region: 'Europe', name: 'FTSE 100', country: 'UK', value: 7624.93, change: -0.15, status: 'closed' },
  { region: 'Europe', name: 'DAX', country: 'DE', value: 16751.64, change: 0.28, status: 'closed' },
  { region: 'Europe', name: 'CAC 40', country: 'FR', value: 7465.25, change: 0.12, status: 'closed' },
  { region: 'Europe', name: 'Euro Stoxx 50', country: 'EU', value: 4480.25, change: 0.22, status: 'closed' },
  { region: 'Asia-Pacific', name: 'Nikkei 225', country: 'JP', value: 35577.11, change: 1.15, status: 'closed' },
  { region: 'Asia-Pacific', name: 'Shanghai', country: 'CN', value: 2886.29, change: -0.55, status: 'closed' },
  { region: 'Asia-Pacific', name: 'Hang Seng', country: 'HK', value: 15952.23, change: -0.82, status: 'closed' },
  { region: 'Asia-Pacific', name: 'ASX 200', country: 'AU', value: 7526.30, change: 0.38, status: 'closed' },
  { region: 'Asia-Pacific', name: 'KOSPI', country: 'KR', value: 2556.15, change: 0.65, status: 'closed' },
  { region: 'Asia-Pacific', name: 'Sensex', country: 'IN', value: 71892.48, change: 0.42, status: 'closed' },
];

export default function GlobalMarketsPage() {
  const regions = [...new Set(INDICES.map((i) => i.region))];

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Global Markets</h1>
        <p className="mt-1 text-sm text-gray-500">Worldwide stock market indices</p>
      </div>

      {regions.map((region) => (
        <Card key={region}>
          <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><Globe className="h-4 w-4 text-indigo-400" /> {region}</CardTitle></CardHeader>
          <div className="divide-y divide-white/5">
            {INDICES.filter((i) => i.region === region).map((idx) => (
              <div key={idx.name} className="flex items-center gap-3 py-2 px-2">
                <span className="text-[10px] text-gray-500 w-6 font-mono">{idx.country}</span>
                <div className="flex-1">
                  <p className="text-sm text-white">{idx.name}</p>
                </div>
                <Badge variant={idx.status === 'open' ? 'success' : 'default'} className="text-[8px] capitalize">{idx.status}</Badge>
                <span className="text-sm font-mono text-white w-24 text-right">{idx.value.toLocaleString()}</span>
                <span className={cn('text-xs font-mono w-16 text-right', idx.change >= 0 ? 'text-green-400' : 'text-red-400')}>
                  {idx.change >= 0 ? '+' : ''}{idx.change.toFixed(2)}%
                </span>
              </div>
            ))}
          </div>
        </Card>
      ))}
    </motion.div>
  );
}
