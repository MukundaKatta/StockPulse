'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Globe, TrendingUp, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/formatters';

interface EconomicEvent {
  id: string;
  date: string;
  time: string;
  event: string;
  country: string;
  impact: 'high' | 'medium' | 'low';
  previous: string;
  forecast: string;
  actual: string | null;
}

const MOCK_EVENTS: EconomicEvent[] = [
  { id: '1', date: '2026-06-02', time: '08:30', event: 'Non-Farm Payrolls', country: 'US', impact: 'high', previous: '175K', forecast: '190K', actual: null },
  { id: '2', date: '2026-06-02', time: '08:30', event: 'Unemployment Rate', country: 'US', impact: 'high', previous: '3.9%', forecast: '3.9%', actual: null },
  { id: '3', date: '2026-06-03', time: '10:00', event: 'ISM Services PMI', country: 'US', impact: 'high', previous: '49.4', forecast: '51.0', actual: null },
  { id: '4', date: '2026-06-04', time: '14:00', event: 'FOMC Minutes', country: 'US', impact: 'high', previous: '-', forecast: '-', actual: null },
  { id: '5', date: '2026-06-05', time: '08:30', event: 'Initial Jobless Claims', country: 'US', impact: 'medium', previous: '219K', forecast: '215K', actual: null },
  { id: '6', date: '2026-06-05', time: '08:30', event: 'Trade Balance', country: 'US', impact: 'medium', previous: '-$69.4B', forecast: '-$68.5B', actual: null },
  { id: '7', date: '2026-06-06', time: '07:00', event: 'ECB Interest Rate Decision', country: 'EU', impact: 'high', previous: '4.50%', forecast: '4.25%', actual: null },
  { id: '8', date: '2026-06-06', time: '10:00', event: 'Consumer Sentiment', country: 'US', impact: 'medium', previous: '67.4', forecast: '68.0', actual: null },
  { id: '9', date: '2026-06-09', time: '08:30', event: 'CPI (MoM)', country: 'US', impact: 'high', previous: '0.3%', forecast: '0.2%', actual: null },
  { id: '10', date: '2026-06-09', time: '08:30', event: 'Core CPI (YoY)', country: 'US', impact: 'high', previous: '3.6%', forecast: '3.5%', actual: null },
];

const impactColors = {
  high: 'text-red-400 bg-red-500/10',
  medium: 'text-amber-400 bg-amber-500/10',
  low: 'text-green-400 bg-green-500/10',
};

export default function EconomicCalendarPage() {
  const [impactFilter, setImpactFilter] = useState<'all' | 'high' | 'medium'>('all');

  const filtered = impactFilter === 'all'
    ? MOCK_EVENTS
    : MOCK_EVENTS.filter((e) => e.impact === impactFilter);

  const grouped = filtered.reduce<Record<string, EconomicEvent[]>>((acc, event) => {
    if (!acc[event.date]) acc[event.date] = [];
    acc[event.date].push(event);
    return acc;
  }, {});

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4 sm:space-y-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Economic Calendar</h1>
          <p className="mt-1 text-sm text-gray-500">Key economic events that move markets</p>
        </div>
        <div className="flex gap-2">
          {(['all', 'high', 'medium'] as const).map((f) => (
            <Button key={f} variant={impactFilter === f ? 'primary' : 'secondary'} onClick={() => setImpactFilter(f)}>
              {f === 'all' ? 'All' : f === 'high' ? 'High Impact' : 'Medium'}
            </Button>
          ))}
        </div>
      </div>

      {/* Impact legend */}
      <div className="flex items-center gap-4 text-xs text-gray-500">
        <span className="flex items-center gap-1">
          <span className="h-2 w-2 rounded-full bg-red-400" /> High Impact
        </span>
        <span className="flex items-center gap-1">
          <span className="h-2 w-2 rounded-full bg-amber-400" /> Medium Impact
        </span>
        <span className="flex items-center gap-1">
          <span className="h-2 w-2 rounded-full bg-green-400" /> Low Impact
        </span>
      </div>

      {/* Grouped by date */}
      {Object.entries(grouped).map(([date, events]) => (
        <Card key={date}>
          <div className="flex items-center gap-2 mb-3 pb-2 border-b border-white/[0.06]">
            <Calendar className="h-4 w-4 text-indigo-400" />
            <span className="text-sm font-medium text-white">
              {new Date(date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            </span>
          </div>

          <div className="space-y-2">
            {events.map((event) => (
              <div
                key={event.id}
                className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 rounded-lg border border-white/[0.03] p-3 hover:bg-white/[0.02] transition-colors"
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className={cn('flex h-7 w-7 items-center justify-center rounded-lg', impactColors[event.impact])}>
                    {event.impact === 'high' ? (
                      <AlertTriangle className="h-3.5 w-3.5" />
                    ) : (
                      <Globe className="h-3.5 w-3.5" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">{event.event}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[10px] text-gray-500">{event.time} ET</span>
                      <Badge variant="info">{event.country}</Badge>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-xs sm:text-sm">
                  <div className="text-center">
                    <p className="text-[10px] text-gray-600">Previous</p>
                    <p className="font-mono text-gray-400">{event.previous}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-[10px] text-gray-600">Forecast</p>
                    <p className="font-mono text-white">{event.forecast}</p>
                  </div>
                  <div className="text-center min-w-[50px]">
                    <p className="text-[10px] text-gray-600">Actual</p>
                    <p className="font-mono text-gray-500">{event.actual || '—'}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      ))}

      {filtered.length === 0 && (
        <Card>
          <div className="py-12 text-center">
            <Calendar className="mx-auto h-8 w-8 text-gray-600" />
            <p className="mt-3 text-sm text-gray-500">No events match the filter</p>
          </div>
        </Card>
      )}
    </motion.div>
  );
}
