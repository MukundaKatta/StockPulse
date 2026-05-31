'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/formatters';
import { Globe } from 'lucide-react';

interface Indicator {
  name: string;
  value: string;
  prior: string;
  forecast: string;
  date: string;
  impact: 'High' | 'Medium' | 'Low';
  category: string;
}

const INDICATORS: Indicator[] = [
  { name: 'GDP Growth (QoQ)', value: '3.3%', prior: '4.9%', forecast: '2.0%', date: '2024-01-25', impact: 'High', category: 'Growth' },
  { name: 'CPI (YoY)', value: '3.4%', prior: '3.1%', forecast: '3.2%', date: '2024-01-11', impact: 'High', category: 'Inflation' },
  { name: 'Core PCE (YoY)', value: '2.9%', prior: '3.2%', forecast: '3.0%', date: '2024-01-26', impact: 'High', category: 'Inflation' },
  { name: 'Unemployment Rate', value: '3.7%', prior: '3.7%', forecast: '3.8%', date: '2024-02-02', impact: 'High', category: 'Employment' },
  { name: 'Non-Farm Payrolls', value: '353K', prior: '333K', forecast: '180K', date: '2024-02-02', impact: 'High', category: 'Employment' },
  { name: 'Fed Funds Rate', value: '5.50%', prior: '5.50%', forecast: '5.50%', date: '2024-01-31', impact: 'High', category: 'Rates' },
  { name: 'ISM Manufacturing', value: '49.1', prior: '47.4', forecast: '47.2', date: '2024-02-01', impact: 'Medium', category: 'Activity' },
  { name: 'Consumer Confidence', value: '114.8', prior: '108.0', forecast: '115.0', date: '2024-01-30', impact: 'Medium', category: 'Sentiment' },
  { name: 'Retail Sales (MoM)', value: '0.6%', prior: '0.3%', forecast: '0.4%', date: '2024-01-17', impact: 'Medium', category: 'Spending' },
  { name: 'Housing Starts', value: '1.46M', prior: '1.56M', forecast: '1.43M', date: '2024-01-18', impact: 'Low', category: 'Housing' },
];

export default function EconomicIndicatorsPage() {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Economic Indicators</h1>
        <p className="mt-1 text-sm text-gray-500">Key U.S. macroeconomic data releases</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sm">
            <Globe className="h-4 w-4 text-indigo-400" /> Latest Releases
          </CardTitle>
        </CardHeader>
        <div className="divide-y divide-white/5">
          {INDICATORS.map((ind) => (
            <div key={ind.name} className="flex items-center gap-3 py-2 px-4">
              <div className="w-36">
                <p className="text-xs font-bold text-white">{ind.name}</p>
                <p className="text-[10px] text-gray-500">{ind.date}</p>
              </div>
              <Badge variant={ind.impact === 'High' ? 'danger' : ind.impact === 'Medium' ? 'warning' : 'default'}>
                {ind.impact}
              </Badge>
              <span className="text-xs font-mono text-white w-14 text-right">{ind.value}</span>
              <span className="text-[10px] text-gray-500 w-14 text-right">Est: {ind.forecast}</span>
              <span className="text-[10px] text-gray-500 w-14 text-right">Prior: {ind.prior}</span>
              <Badge variant="info">{ind.category}</Badge>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
