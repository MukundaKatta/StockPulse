'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/formatters';
import { Bell, Check, Trash2, AlertTriangle, TrendingUp, DollarSign, Newspaper } from 'lucide-react';

interface Notification {
  id: string;
  type: 'price' | 'earnings' | 'news' | 'alert';
  title: string;
  message: string;
  time: string;
  read: boolean;
  symbol?: string;
}

const MOCK_NOTIFICATIONS: Notification[] = [
  { id: '1', type: 'price', title: 'Price Alert Triggered', message: 'AAPL crossed above $190.00', time: '5 min ago', read: false, symbol: 'AAPL' },
  { id: '2', type: 'earnings', title: 'Earnings Tomorrow', message: 'NVDA reports Q4 earnings before market open', time: '1 hour ago', read: false, symbol: 'NVDA' },
  { id: '3', type: 'news', title: 'Breaking News', message: 'Fed announces rate decision - holds steady at 5.25-5.50%', time: '2 hours ago', read: false },
  { id: '4', type: 'alert', title: 'Portfolio Alert', message: 'Your portfolio is down 2.5% today', time: '3 hours ago', read: true },
  { id: '5', type: 'price', title: 'Price Alert Triggered', message: 'TSLA dropped below $240.00 support', time: '4 hours ago', read: true, symbol: 'TSLA' },
  { id: '6', type: 'earnings', title: 'Earnings Beat', message: 'META beat EPS estimates by 12%', time: '6 hours ago', read: true, symbol: 'META' },
  { id: '7', type: 'news', title: 'Sector Alert', message: 'Energy sector down 3% on oil price decline', time: '8 hours ago', read: true },
  { id: '8', type: 'price', title: 'New 52-Week High', message: 'MSFT reached a new 52-week high of $420.82', time: '1 day ago', read: true, symbol: 'MSFT' },
];

const typeIcons = {
  price: TrendingUp,
  earnings: DollarSign,
  news: Newspaper,
  alert: AlertTriangle,
};

const typeColors = {
  price: 'text-indigo-400 bg-indigo-400/10',
  earnings: 'text-green-400 bg-green-400/10',
  news: 'text-blue-400 bg-blue-400/10',
  alert: 'text-amber-400 bg-amber-400/10',
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const filtered = notifications.filter((n) => filter === 'all' || !n.read);
  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = () => setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  const markRead = (id: string) => setNotifications((prev) => prev.map((n) => n.id === id ? { ...n, read: true } : n));
  const deleteNotification = (id: string) => setNotifications((prev) => prev.filter((n) => n.id !== id));
  const clearAll = () => setNotifications([]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl space-y-4 sm:space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            Notifications
            {unreadCount > 0 && <Badge variant="danger">{unreadCount}</Badge>}
          </h1>
          <p className="mt-1 text-sm text-gray-500">Stay updated on price alerts, earnings, and news</p>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" onClick={markAllRead}>
            <Check className="h-3.5 w-3.5 mr-1" /> Mark all read
          </Button>
          <Button variant="ghost" size="sm" onClick={clearAll}>
            <Trash2 className="h-3.5 w-3.5 mr-1" /> Clear
          </Button>
        </div>
      </div>

      <div className="flex gap-2">
        {(['all', 'unread'] as const).map((f) => (
          <button key={f} onClick={() => setFilter(f)}
            className={cn('rounded-lg px-3 py-1.5 text-xs font-medium capitalize transition-colors', filter === f ? 'bg-indigo-500/10 text-indigo-400' : 'text-gray-500 hover:text-gray-300')}
          >{f} {f === 'unread' && unreadCount > 0 ? `(${unreadCount})` : ''}</button>
        ))}
      </div>

      <div className="space-y-2">
        {filtered.length === 0 && (
          <Card className="!p-8 text-center">
            <Bell className="h-8 w-8 text-gray-600 mx-auto mb-2" />
            <p className="text-sm text-gray-500">No notifications</p>
          </Card>
        )}
        {filtered.map((n) => {
          const Icon = typeIcons[n.type];
          return (
            <Card key={n.id} className={cn('!p-3 cursor-pointer transition-colors', !n.read && 'ring-1 ring-indigo-500/20 bg-indigo-500/[0.02]')} onClick={() => markRead(n.id)}>
              <div className="flex items-start gap-3">
                <div className={cn('w-8 h-8 rounded-lg flex items-center justify-center shrink-0', typeColors[n.type])}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className={cn('text-sm font-medium', !n.read ? 'text-white' : 'text-gray-300')}>{n.title}</p>
                    {!n.read && <div className="w-2 h-2 rounded-full bg-indigo-400" />}
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">{n.message}</p>
                  <p className="text-[10px] text-gray-600 mt-1">{n.time}</p>
                </div>
                <button onClick={(e) => { e.stopPropagation(); deleteNotification(n.id); }} className="text-gray-600 hover:text-gray-400 p-1">
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </Card>
          );
        })}
      </div>
    </motion.div>
  );
}
