'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn, formatCurrency } from '@/lib/formatters';
import { Globe } from 'lucide-react';

interface GDPData {
  country: string;
  code: string;
  gdpTrillions: number;
  growthQ: number;
  growthAnnual: number;
  forecast: number;
  region: 'Americas' | 'Europe' | 'Asia-Pacific';
  perCapita: number;
}

const COUNTRIES: GDPData[] = [
  { country: 'United States', code: 'US', gdpTrillions: 27.36, growthQ: 3.3, growthAnnual: 2.5, forecast: 2.1, region: 'Americas', perCapita: 80412 },
  { country: 'China', code: 'CN', gdpTrillions: 17.79, growthQ: 5.2, growthAnnual: 5.2, forecast: 4.6, region: 'Asia-Pacific', perCapita: 12541 },
  { country: 'Japan', code: 'JP', gdpTrillions: 4.21, growthQ: -0.4, growthAnnual: 1.9, forecast: 1.0, region: 'Asia-Pacific', perCapita: 33815 },
  { country: 'Germany', code: 'DE', gdpTrillions: 4.43, growthQ: 0.0, growthAnnual: -0.3, forecast: 0.5, region: 'Europe', perCapita: 52824 },
  { country: 'India', code: 'IN', gdpTrillions: 3.73, growthQ: 8.4, growthAnnual: 7.8, forecast: 6.5, region: 'Asia-Pacific', perCapita: 2612 },
  { country: 'United Kingdom', code: 'UK', gdpTrillions: 3.33, growthQ: -0.3, growthAnnual: 0.1, forecast: 0.6, region: 'Europe', perCapita: 48913 },
  { country: 'France', code: 'FR', gdpTrillions: 3.05, growthQ: 0.7, growthAnnual: 0.9, forecast: 1.0, region: 'Europe', perCapita: 44408 },
  { country: 'Brazil', code: 'BR', gdpTrillions: 2.13, growthQ: 2.0, growthAnnual: 2.9, forecast: 1.5, region: 'Americas', perCapita: 9883 },
];

export default function GdpTrackerPage() {
  const totalGdp = COUNTRIES.reduce((s, c) => s + c.gdpTrillions, 0);
  const avgGrowth = COUNTRIES.reduce((s, c) => s + c.growthAnnual, 0) / COUNTRIES.length;
  const growing = COUNTRIES.filter((c) => c.growthAnnual > 0).length;
  const avgForecast = COUNTRIES.reduce((s, c) => s + c.forecast, 0) / COUNTRIES.length;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">GDP Tracker</h1>
        <p className="mt-1 text-sm text-gray-500">Gross domestic product growth by country</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="!p-3">
          <p className="text-[10px] text-gray-500 uppercase">Total GDP</p>
          <p className="text-lg font-bold text-white">${totalGdp.toFixed(1)}T</p>
        </Card>
        <Card className="!p-3">
          <p className="text-[10px] text-gray-500 uppercase">Avg Growth</p>
          <p className={cn('text-lg font-bold', avgGrowth >= 0 ? 'text-green-400' : 'text-red-400')}>{avgGrowth.toFixed(1)}%</p>
        </Card>
        <Card className="!p-3">
          <p className="text-[10px] text-gray-500 uppercase">Growing</p>
          <p className="text-lg font-bold text-green-400">{growing}/{COUNTRIES.length}</p>
        </Card>
        <Card className="!p-3">
          <p className="text-[10px] text-gray-500 uppercase">Avg Forecast</p>
          <p className="text-lg font-bold text-indigo-400">{avgForecast.toFixed(1)}%</p>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sm">
            <Globe className="h-4 w-4 text-indigo-400" /> GDP by Country
          </CardTitle>
        </CardHeader>
        <div className="divide-y divide-white/5">
          {COUNTRIES.sort((a, b) => b.gdpTrillions - a.gdpTrillions).map((c) => (
            <div key={c.code} className="flex items-center gap-3 py-2 px-4">
              <div className="w-28">
                <p className="text-xs font-bold text-white">{c.country}</p>
                <p className="text-[10px] text-gray-500">{c.code}</p>
              </div>
              <Badge variant={c.region === 'Americas' ? 'info' : c.region === 'Europe' ? 'warning' : 'success'}>
                {c.region}
              </Badge>
              <span className="text-xs font-mono text-white w-14">${c.gdpTrillions.toFixed(1)}T</span>
              <span className={cn('text-xs font-mono w-12', c.growthAnnual >= 0 ? 'text-green-400' : 'text-red-400')}>
                {c.growthAnnual >= 0 ? '+' : ''}{c.growthAnnual}%
              </span>
              <span className={cn('text-[10px] font-mono w-14', c.growthQ >= 0 ? 'text-green-400' : 'text-red-400')}>
                Q: {c.growthQ >= 0 ? '+' : ''}{c.growthQ}%
              </span>
              <span className="text-[10px] text-gray-500 ml-auto">Per capita: {formatCurrency(c.perCapita)}</span>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
