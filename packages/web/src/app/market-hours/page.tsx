'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/formatters';
import { Clock, Globe } from 'lucide-react';

interface MarketSession {
  name: string;
  location: string;
  openTime: string;
  closeTime: string;
  timezone: string;
  utcOpen: number;
  utcClose: number;
}

const MARKETS: MarketSession[] = [
  { name: 'NYSE / NASDAQ', location: 'New York', openTime: '9:30 AM', closeTime: '4:00 PM', timezone: 'ET', utcOpen: 14.5, utcClose: 21 },
  { name: 'LSE', location: 'London', openTime: '8:00 AM', closeTime: '4:30 PM', timezone: 'GMT', utcOpen: 8, utcClose: 16.5 },
  { name: 'TSE', location: 'Tokyo', openTime: '9:00 AM', closeTime: '3:00 PM', timezone: 'JST', utcOpen: 0, utcClose: 6 },
  { name: 'SSE', location: 'Shanghai', openTime: '9:30 AM', closeTime: '3:00 PM', timezone: 'CST', utcOpen: 1.5, utcClose: 7 },
  { name: 'HKEX', location: 'Hong Kong', openTime: '9:30 AM', closeTime: '4:00 PM', timezone: 'HKT', utcOpen: 1.5, utcClose: 8 },
  { name: 'ASX', location: 'Sydney', openTime: '10:00 AM', closeTime: '4:00 PM', timezone: 'AEST', utcOpen: 0, utcClose: 6 },
  { name: 'FSE', location: 'Frankfurt', openTime: '9:00 AM', closeTime: '5:30 PM', timezone: 'CET', utcOpen: 8, utcClose: 16.5 },
  { name: 'BSE', location: 'Mumbai', openTime: '9:15 AM', closeTime: '3:30 PM', timezone: 'IST', utcOpen: 3.75, utcClose: 10 },
];

function getMarketStatus(utcOpen: number, utcClose: number): 'open' | 'closed' | 'pre' | 'post' {
  const now = new Date();
  const utcHour = now.getUTCHours() + now.getUTCMinutes() / 60;

  if (utcHour >= utcOpen && utcHour < utcClose) return 'open';
  if (utcHour >= utcOpen - 1 && utcHour < utcOpen) return 'pre';
  if (utcHour >= utcClose && utcHour < utcClose + 1) return 'post';
  return 'closed';
}

export default function MarketHoursPage() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4 sm:space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Market Hours</h1>
          <p className="mt-1 text-sm text-gray-500">Global exchange trading sessions</p>
        </div>
        <div className="text-right">
          <p className="text-lg font-mono font-bold text-white">
            {time.toLocaleTimeString('en-US', { hour12: true })}
          </p>
          <p className="text-[10px] text-gray-500">
            UTC: {time.toISOString().slice(11, 19)}
          </p>
        </div>
      </div>

      {/* 24h Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-4 w-4 text-indigo-400" />
            24-Hour Timeline (UTC)
          </CardTitle>
        </CardHeader>
        <div className="space-y-2">
          {MARKETS.map((market) => {
            const utcHour = time.getUTCHours() + time.getUTCMinutes() / 60;
            const openPct = (market.utcOpen / 24) * 100;
            const widthPct = ((market.utcClose - market.utcOpen) / 24) * 100;
            const nowPct = (utcHour / 24) * 100;

            return (
              <div key={market.name} className="flex items-center gap-3">
                <span className="w-20 text-xs text-gray-400 shrink-0">{market.name}</span>
                <div className="flex-1 relative h-5 rounded bg-white/5">
                  <div
                    className="absolute top-0 h-full rounded bg-indigo-500/30"
                    style={{ left: `${openPct}%`, width: `${widthPct}%` }}
                  />
                  <div
                    className="absolute top-0 w-px h-full bg-amber-400"
                    style={{ left: `${nowPct}%` }}
                  />
                </div>
                <span className="w-12 text-[10px] text-gray-500 shrink-0">{market.timezone}</span>
              </div>
            );
          })}
          <div className="flex items-center gap-3 mt-1">
            <span className="w-20" />
            <div className="flex-1 flex justify-between text-[9px] text-gray-600">
              {Array.from({ length: 9 }).map((_, i) => (
                <span key={i}>{(i * 3).toString().padStart(2, '0')}:00</span>
              ))}
            </div>
            <span className="w-12" />
          </div>
        </div>
      </Card>

      {/* Status Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {MARKETS.map((market) => {
          const status = getMarketStatus(market.utcOpen, market.utcClose);
          return (
            <Card key={market.name} className="!p-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium text-white">{market.name}</span>
                <Badge variant={status === 'open' ? 'success' : status === 'pre' || status === 'post' ? 'warning' : 'info'}>
                  {status}
                </Badge>
              </div>
              <p className="text-[10px] text-gray-500">{market.location}</p>
              <p className="text-[10px] text-gray-600 font-mono">{market.openTime} - {market.closeTime} {market.timezone}</p>
            </Card>
          );
        })}
      </div>
    </motion.div>
  );
}
