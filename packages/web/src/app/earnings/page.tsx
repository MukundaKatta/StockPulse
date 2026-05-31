'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, ChevronLeft, ChevronRight, TrendingUp, TrendingDown } from 'lucide-react';
import Link from 'next/link';
import { formatCurrency, cn } from '@/lib/formatters';
import api from '@/lib/api';

interface EarningsEvent {
  symbol: string;
  name: string;
  reportDate: string;
  fiscalQuarter: string;
  estimateEPS: number | null;
  actualEPS: number | null;
  surprise: number | null;
  timeOfDay: 'bmo' | 'amc' | 'unknown';
}

function getWeekDates(offset: number): { start: Date; end: Date; days: Date[] } {
  const now = new Date();
  const dayOfWeek = now.getDay();
  const monday = new Date(now);
  monday.setDate(now.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1) + offset * 7);
  monday.setHours(0, 0, 0, 0);

  const days: Date[] = [];
  for (let i = 0; i < 5; i++) {
    const day = new Date(monday);
    day.setDate(monday.getDate() + i);
    days.push(day);
  }

  return { start: monday, end: days[4], days };
}

function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function formatDateISO(date: Date): string {
  return date.toISOString().split('T')[0];
}

const MOCK_EARNINGS: EarningsEvent[] = [
  { symbol: 'AAPL', name: 'Apple Inc', reportDate: formatDateISO(new Date()), fiscalQuarter: 'Q2 2026', estimateEPS: 1.62, actualEPS: null, surprise: null, timeOfDay: 'amc' },
  { symbol: 'MSFT', name: 'Microsoft Corp', reportDate: formatDateISO(new Date()), fiscalQuarter: 'Q3 2026', estimateEPS: 2.85, actualEPS: null, surprise: null, timeOfDay: 'amc' },
  { symbol: 'GOOGL', name: 'Alphabet Inc', reportDate: formatDateISO(new Date(Date.now() + 86400000)), fiscalQuarter: 'Q1 2026', estimateEPS: 1.89, actualEPS: null, surprise: null, timeOfDay: 'bmo' },
  { symbol: 'AMZN', name: 'Amazon.com Inc', reportDate: formatDateISO(new Date(Date.now() + 86400000)), fiscalQuarter: 'Q1 2026', estimateEPS: 1.14, actualEPS: null, surprise: null, timeOfDay: 'amc' },
  { symbol: 'NVDA', name: 'NVIDIA Corp', reportDate: formatDateISO(new Date(Date.now() + 172800000)), fiscalQuarter: 'Q1 2026', estimateEPS: 0.74, actualEPS: null, surprise: null, timeOfDay: 'amc' },
  { symbol: 'META', name: 'Meta Platforms', reportDate: formatDateISO(new Date(Date.now() + 259200000)), fiscalQuarter: 'Q1 2026', estimateEPS: 4.71, actualEPS: null, surprise: null, timeOfDay: 'amc' },
  { symbol: 'TSLA', name: 'Tesla Inc', reportDate: formatDateISO(new Date(Date.now() + 345600000)), fiscalQuarter: 'Q1 2026', estimateEPS: 0.45, actualEPS: null, surprise: null, timeOfDay: 'bmo' },
];

export default function EarningsPage() {
  const [weekOffset, setWeekOffset] = useState(0);
  const { start, end, days } = getWeekDates(weekOffset);

  const earningsByDay = days.map((day) => ({
    date: day,
    events: MOCK_EARNINGS.filter((e) => e.reportDate === formatDateISO(day)),
  }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4 sm:space-y-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Earnings Calendar</h1>
          <p className="mt-1 text-sm text-gray-500">Track upcoming earnings reports</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" onClick={() => setWeekOffset((o) => o - 1)}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="secondary" onClick={() => setWeekOffset(0)} disabled={weekOffset === 0}>
            This Week
          </Button>
          <Button variant="secondary" onClick={() => setWeekOffset((o) => o + 1)}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Card>
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
          <Calendar className="h-4 w-4" />
          <span>{formatDate(start)} — {formatDate(end)}, {start.getFullYear()}</span>
          {weekOffset !== 0 && (
            <Badge variant="info">{weekOffset > 0 ? `+${weekOffset}` : weekOffset} week{Math.abs(weekOffset) !== 1 ? 's' : ''}</Badge>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
          {earningsByDay.map(({ date, events }) => {
            const isToday = formatDateISO(date) === formatDateISO(new Date());
            return (
              <div
                key={date.toISOString()}
                className={cn(
                  'rounded-lg border p-3 min-h-[120px]',
                  isToday ? 'border-indigo-500/30 bg-indigo-500/5' : 'border-white/[0.06] bg-white/[0.02]'
                )}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={cn('text-xs font-medium', isToday ? 'text-indigo-400' : 'text-gray-500')}>
                    {date.toLocaleDateString('en-US', { weekday: 'short' })}
                  </span>
                  <span className={cn('text-xs', isToday ? 'text-indigo-400' : 'text-gray-600')}>
                    {date.getDate()}
                  </span>
                </div>

                {events.length === 0 ? (
                  <p className="text-xs text-gray-700 mt-4 text-center">No reports</p>
                ) : (
                  <div className="space-y-2">
                    {events.map((event) => (
                      <Link
                        key={event.symbol}
                        href={`/stock/${event.symbol}`}
                        className="block rounded-md bg-white/5 p-2 hover:bg-white/10 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-xs font-bold text-white">{event.symbol}</span>
                          <Badge variant={event.timeOfDay === 'bmo' ? 'info' : 'warning'}>
                            {event.timeOfDay === 'bmo' ? 'Pre' : event.timeOfDay === 'amc' ? 'Post' : '—'}
                          </Badge>
                        </div>
                        <p className="text-[10px] text-gray-500 mt-0.5 truncate">{event.name}</p>
                        {event.estimateEPS !== null && (
                          <div className="mt-1 flex items-center gap-1">
                            <span className="text-[10px] text-gray-600">Est:</span>
                            <span className="text-[10px] font-mono text-gray-400">
                              {formatCurrency(event.estimateEPS)}
                            </span>
                          </div>
                        )}
                        {event.actualEPS !== null && event.surprise !== null && (
                          <div className="mt-1 flex items-center gap-1">
                            {event.surprise >= 0 ? (
                              <TrendingUp className="h-2.5 w-2.5 text-green-400" />
                            ) : (
                              <TrendingDown className="h-2.5 w-2.5 text-red-400" />
                            )}
                            <span className={cn(
                              'text-[10px] font-mono',
                              event.surprise >= 0 ? 'text-green-400' : 'text-red-400'
                            )}>
                              {event.surprise >= 0 ? '+' : ''}{event.surprise.toFixed(2)}%
                            </span>
                          </div>
                        )}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>All Reports This Week</CardTitle>
        </CardHeader>
        {MOCK_EARNINGS.length === 0 ? (
          <p className="text-sm text-gray-500 text-center py-8">No earnings reports this week</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/[0.06]">
                  <th className="px-3 py-2 text-left text-xs font-medium uppercase text-gray-500">Symbol</th>
                  <th className="px-3 py-2 text-left text-xs font-medium uppercase text-gray-500">Company</th>
                  <th className="px-3 py-2 text-center text-xs font-medium uppercase text-gray-500">Date</th>
                  <th className="px-3 py-2 text-center text-xs font-medium uppercase text-gray-500">Time</th>
                  <th className="px-3 py-2 text-center text-xs font-medium uppercase text-gray-500">Quarter</th>
                  <th className="px-3 py-2 text-right text-xs font-medium uppercase text-gray-500">Est. EPS</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_EARNINGS.map((event) => (
                  <tr key={event.symbol} className="border-b border-white/[0.03] hover:bg-white/[0.02]">
                    <td className="px-3 py-2.5">
                      <Link href={`/stock/${event.symbol}`} className="font-mono font-bold text-indigo-400 hover:text-indigo-300">
                        {event.symbol}
                      </Link>
                    </td>
                    <td className="px-3 py-2.5 text-gray-400 truncate max-w-[200px]">{event.name}</td>
                    <td className="px-3 py-2.5 text-center text-gray-400">
                      {new Date(event.reportDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </td>
                    <td className="px-3 py-2.5 text-center">
                      <Badge variant={event.timeOfDay === 'bmo' ? 'info' : 'warning'}>
                        {event.timeOfDay === 'bmo' ? 'Before Open' : 'After Close'}
                      </Badge>
                    </td>
                    <td className="px-3 py-2.5 text-center text-gray-500">{event.fiscalQuarter}</td>
                    <td className="px-3 py-2.5 text-right font-mono text-gray-300">
                      {event.estimateEPS !== null ? formatCurrency(event.estimateEPS) : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </motion.div>
  );
}
