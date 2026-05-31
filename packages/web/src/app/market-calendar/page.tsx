'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar } from 'lucide-react';

interface CalendarEvent {
  date: string;
  day: string;
  events: { name: string; type: 'Holiday' | 'Earnings' | 'Economic' | 'Expiration' | 'Fed' }[];
}

const CALENDAR: CalendarEvent[] = [
  { date: 'Feb 12', day: 'Mon', events: [{ name: 'CPI Report', type: 'Economic' }] },
  { date: 'Feb 13', day: 'Tue', events: [{ name: 'Coca-Cola Earnings', type: 'Earnings' }, { name: 'Airbnb Earnings', type: 'Earnings' }] },
  { date: 'Feb 14', day: 'Wed', events: [{ name: 'Cisco Earnings', type: 'Earnings' }] },
  { date: 'Feb 15', day: 'Thu', events: [{ name: 'PPI Report', type: 'Economic' }, { name: 'Retail Sales', type: 'Economic' }, { name: 'Deere Earnings', type: 'Earnings' }] },
  { date: 'Feb 16', day: 'Fri', events: [{ name: 'Options Expiration', type: 'Expiration' }, { name: 'Michigan Sentiment', type: 'Economic' }] },
  { date: 'Feb 19', day: 'Mon', events: [{ name: "Presidents' Day", type: 'Holiday' }] },
  { date: 'Feb 20', day: 'Tue', events: [{ name: 'Walmart Earnings', type: 'Earnings' }, { name: 'Home Depot Earnings', type: 'Earnings' }] },
  { date: 'Feb 21', day: 'Wed', events: [{ name: 'NVDA Earnings', type: 'Earnings' }, { name: 'FOMC Minutes', type: 'Fed' }] },
  { date: 'Feb 22', day: 'Thu', events: [{ name: 'Jobless Claims', type: 'Economic' }, { name: 'Intuit Earnings', type: 'Earnings' }] },
  { date: 'Feb 23', day: 'Fri', events: [{ name: 'PCE Price Index', type: 'Economic' }] },
];

function eventVariant(type: string): 'danger' | 'success' | 'info' | 'warning' | 'default' {
  if (type === 'Holiday') return 'danger';
  if (type === 'Earnings') return 'success';
  if (type === 'Economic') return 'info';
  if (type === 'Fed') return 'warning';
  return 'default';
}

export default function MarketCalendarPage() {
  const totalEvents = CALENDAR.reduce((s, d) => s + d.events.length, 0);
  const earningsCount = CALENDAR.reduce((s, d) => s + d.events.filter((e) => e.type === 'Earnings').length, 0);

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Market Calendar</h1>
        <p className="mt-1 text-sm text-gray-500">Upcoming market events and earnings dates</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Card className="!p-3 text-center">
          <p className="text-[10px] text-gray-500 uppercase">Total Events</p>
          <p className="text-lg font-bold text-white">{totalEvents}</p>
        </Card>
        <Card className="!p-3 text-center">
          <p className="text-[10px] text-gray-500 uppercase">Earnings</p>
          <p className="text-lg font-bold text-green-400">{earningsCount}</p>
        </Card>
        <Card className="!p-3 text-center">
          <p className="text-[10px] text-gray-500 uppercase">Trading Days</p>
          <p className="text-lg font-bold text-indigo-400">{CALENDAR.filter((d) => !d.events.some((e) => e.type === 'Holiday')).length}</p>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-indigo-400" /> Two-Week Outlook
          </CardTitle>
        </CardHeader>
        <div className="divide-y divide-white/5">
          {CALENDAR.map((day) => (
            <div key={day.date} className="flex items-start gap-3 py-2 px-4">
              <div className="w-16 pt-0.5">
                <p className="text-xs font-bold text-white">{day.date}</p>
                <p className="text-[10px] text-gray-500">{day.day}</p>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {day.events.map((e) => (
                  <Badge key={e.name} variant={eventVariant(e.type)}>
                    {e.name}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
