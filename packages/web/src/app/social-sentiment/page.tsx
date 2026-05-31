'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { formatLargeNumber, cn } from '@/lib/formatters';
import { MessageSquare, TrendingUp, TrendingDown, Search, Hash } from 'lucide-react';
import Link from 'next/link';

interface SentimentData {
  symbol: string;
  name: string;
  sentiment: number;
  sentimentLabel: 'bullish' | 'bearish' | 'neutral';
  mentions: number;
  change24h: number;
  sources: { reddit: number; twitter: number; news: number };
}

const MOCK_SENTIMENT: SentimentData[] = [
  { symbol: 'NVDA', name: 'NVIDIA', sentiment: 82, sentimentLabel: 'bullish', mentions: 45200, change24h: 15, sources: { reddit: 18000, twitter: 22000, news: 5200 } },
  { symbol: 'TSLA', name: 'Tesla', sentiment: 45, sentimentLabel: 'neutral', mentions: 89000, change24h: -8, sources: { reddit: 35000, twitter: 45000, news: 9000 } },
  { symbol: 'GME', name: 'GameStop', sentiment: 71, sentimentLabel: 'bullish', mentions: 32000, change24h: 42, sources: { reddit: 25000, twitter: 5000, news: 2000 } },
  { symbol: 'AAPL', name: 'Apple', sentiment: 68, sentimentLabel: 'bullish', mentions: 28000, change24h: 3, sources: { reddit: 8000, twitter: 15000, news: 5000 } },
  { symbol: 'PLTR', name: 'Palantir', sentiment: 75, sentimentLabel: 'bullish', mentions: 18500, change24h: 22, sources: { reddit: 12000, twitter: 5000, news: 1500 } },
  { symbol: 'AMC', name: 'AMC Entertainment', sentiment: 38, sentimentLabel: 'bearish', mentions: 15000, change24h: -15, sources: { reddit: 10000, twitter: 4000, news: 1000 } },
  { symbol: 'SOFI', name: 'SoFi Technologies', sentiment: 62, sentimentLabel: 'bullish', mentions: 12000, change24h: 8, sources: { reddit: 7000, twitter: 4000, news: 1000 } },
  { symbol: 'META', name: 'Meta Platforms', sentiment: 55, sentimentLabel: 'neutral', mentions: 22000, change24h: -3, sources: { reddit: 6000, twitter: 12000, news: 4000 } },
];

function getSentimentColor(score: number): string {
  if (score >= 70) return 'text-green-400';
  if (score >= 50) return 'text-gray-400';
  return 'text-red-400';
}

function getSentimentBg(score: number): string {
  if (score >= 70) return 'bg-green-500';
  if (score >= 50) return 'bg-gray-500';
  return 'bg-red-500';
}

export default function SocialSentimentPage() {
  const [search, setSearch] = useState('');

  const filtered = MOCK_SENTIMENT.filter((s) =>
    s.symbol.toLowerCase().includes(search.toLowerCase()) ||
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4 sm:space-y-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Social Sentiment</h1>
          <p className="mt-1 text-sm text-gray-500">Track social media buzz and market sentiment</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search..." className="pl-9 w-48" />
        </div>
      </div>

      {/* Top trending */}
      <div className="flex gap-3 overflow-x-auto pb-2">
        {MOCK_SENTIMENT.slice(0, 5).map((item) => (
          <Card key={item.symbol} className="!p-3 shrink-0 min-w-[140px]">
            <div className="flex items-center gap-2">
              <Hash className="h-3 w-3 text-gray-500" />
              <Link href={`/stock/${item.symbol}`} className="font-mono text-sm font-bold text-indigo-400">
                {item.symbol}
              </Link>
            </div>
            <div className="mt-1 flex items-center gap-1">
              <span className={cn('text-xs font-mono', item.change24h >= 0 ? 'text-green-400' : 'text-red-400')}>
                {item.change24h >= 0 ? '+' : ''}{item.change24h}%
              </span>
              <span className="text-[10px] text-gray-600">mentions</span>
            </div>
          </Card>
        ))}
      </div>

      {/* Main table */}
      <Card>
        <CardHeader>
          <CardTitle>Sentiment Tracker</CardTitle>
        </CardHeader>
        <div className="space-y-3">
          {filtered.map((item) => (
            <div key={item.symbol} className="flex items-center gap-4 rounded-lg border border-white/[0.03] p-3 hover:bg-white/[0.02] transition-colors">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <Link href={`/stock/${item.symbol}`} className="font-mono font-bold text-white hover:text-indigo-400">
                    {item.symbol}
                  </Link>
                  <span className="text-xs text-gray-500 truncate">{item.name}</span>
                </div>
                <div className="mt-1 flex items-center gap-2">
                  <MessageSquare className="h-3 w-3 text-gray-600" />
                  <span className="text-xs text-gray-500">{formatLargeNumber(item.mentions)} mentions</span>
                  <span className={cn('text-xs font-mono', item.change24h >= 0 ? 'text-green-400' : 'text-red-400')}>
                    {item.change24h >= 0 ? '↑' : '↓'}{Math.abs(item.change24h)}%
                  </span>
                </div>
              </div>

              {/* Sentiment gauge */}
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className={cn('text-lg font-bold font-mono', getSentimentColor(item.sentiment))}>
                    {item.sentiment}
                  </p>
                  <Badge variant={item.sentimentLabel === 'bullish' ? 'success' : item.sentimentLabel === 'bearish' ? 'danger' : 'info'}>
                    {item.sentimentLabel}
                  </Badge>
                </div>
                <div className="w-16 h-2 rounded-full bg-white/5 overflow-hidden">
                  <div
                    className={cn('h-full rounded-full', getSentimentBg(item.sentiment))}
                    style={{ width: `${item.sentiment}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
