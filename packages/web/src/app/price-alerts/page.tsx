'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatCurrency, cn } from '@/lib/formatters';
import { Bell, Plus, Trash2, BellOff } from 'lucide-react';

interface PriceAlert {
  id: string;
  symbol: string;
  condition: 'above' | 'below';
  price: number;
  currentPrice: number;
  active: boolean;
  triggered: boolean;
  createdAt: string;
}

const MOCK_ALERTS: PriceAlert[] = [
  { id: '1', symbol: 'AAPL', condition: 'above', price: 195, currentPrice: 189.45, active: true, triggered: false, createdAt: '2 days ago' },
  { id: '2', symbol: 'TSLA', condition: 'below', price: 240, currentPrice: 245.80, active: true, triggered: false, createdAt: '1 day ago' },
  { id: '3', symbol: 'NVDA', condition: 'above', price: 850, currentPrice: 875.20, active: false, triggered: true, createdAt: '5 days ago' },
  { id: '4', symbol: 'MSFT', condition: 'above', price: 420, currentPrice: 415.60, active: true, triggered: false, createdAt: '3 days ago' },
  { id: '5', symbol: 'AMD', condition: 'below', price: 165, currentPrice: 172.60, active: true, triggered: false, createdAt: '1 week ago' },
  { id: '6', symbol: 'SPY', condition: 'above', price: 500, currentPrice: 502.15, active: false, triggered: true, createdAt: '2 weeks ago' },
];

export default function PriceAlertsPage() {
  const [alerts, setAlerts] = useState(MOCK_ALERTS);
  const [newSymbol, setNewSymbol] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newCondition, setNewCondition] = useState<'above' | 'below'>('above');
  const [filter, setFilter] = useState<'all' | 'active' | 'triggered'>('all');

  const filtered = alerts.filter((a) => {
    if (filter === 'active') return a.active && !a.triggered;
    if (filter === 'triggered') return a.triggered;
    return true;
  });

  const addAlert = () => {
    if (!newSymbol || !newPrice) return;
    const alert: PriceAlert = {
      id: Date.now().toString(),
      symbol: newSymbol.toUpperCase(),
      condition: newCondition,
      price: parseFloat(newPrice),
      currentPrice: parseFloat(newPrice) * (0.9 + Math.random() * 0.2),
      active: true,
      triggered: false,
      createdAt: 'just now',
    };
    setAlerts([alert, ...alerts]);
    setNewSymbol('');
    setNewPrice('');
  };

  const toggleAlert = (id: string) => {
    setAlerts(alerts.map((a) => a.id === id ? { ...a, active: !a.active } : a));
  };

  const deleteAlert = (id: string) => {
    setAlerts(alerts.filter((a) => a.id !== id));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl space-y-4 sm:space-y-6"
    >
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Price Alerts</h1>
        <p className="mt-1 text-sm text-gray-500">Get notified when prices hit your targets</p>
      </div>

      {/* Create Alert */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-4 w-4 text-indigo-400" />
            New Alert
          </CardTitle>
        </CardHeader>
        <div className="flex gap-2 items-end">
          <Input label="Symbol" value={newSymbol} onChange={(e) => setNewSymbol(e.target.value.toUpperCase())} placeholder="AAPL" className="w-24" />
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-400">When price is</label>
            <div className="flex gap-1">
              {(['above', 'below'] as const).map((c) => (
                <button key={c} onClick={() => setNewCondition(c)}
                  className={cn('rounded-lg px-3 py-2 text-xs font-medium capitalize border', newCondition === c ? 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30' : 'bg-white/5 text-gray-500 border-white/[0.06]')}
                >{c}</button>
              ))}
            </div>
          </div>
          <Input label="Price ($)" type="number" step="0.01" value={newPrice} onChange={(e) => setNewPrice(e.target.value)} placeholder="0.00" className="w-28" />
          <Button onClick={addAlert}>Create</Button>
        </div>
      </Card>

      {/* Filter */}
      <div className="flex gap-2">
        {(['all', 'active', 'triggered'] as const).map((f) => (
          <button key={f} onClick={() => setFilter(f)}
            className={cn('rounded-lg px-3 py-1.5 text-xs font-medium capitalize transition-colors', filter === f ? 'bg-indigo-500/10 text-indigo-400' : 'text-gray-500 hover:text-gray-300')}
          >{f}</button>
        ))}
      </div>

      {/* Alerts List */}
      <div className="space-y-2">
        {filtered.map((alert) => {
          const distance = ((alert.price - alert.currentPrice) / alert.currentPrice * 100);
          return (
            <Card key={alert.id} className={cn('!p-3', alert.triggered && 'border-green-500/20')}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={cn('w-8 h-8 rounded-lg flex items-center justify-center', alert.triggered ? 'bg-green-500/10' : alert.active ? 'bg-indigo-500/10' : 'bg-gray-500/10')}>
                    {alert.active ? <Bell className="h-4 w-4 text-indigo-400" /> : <BellOff className="h-4 w-4 text-gray-500" />}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-sm text-indigo-400">{alert.symbol}</span>
                      <span className="text-xs text-gray-400">{alert.condition}</span>
                      <span className="text-sm font-mono font-medium text-white">{formatCurrency(alert.price)}</span>
                      {alert.triggered && <Badge variant="success">Triggered</Badge>}
                    </div>
                    <p className="text-[10px] text-gray-600">Current: {formatCurrency(alert.currentPrice)} • {alert.createdAt}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {!alert.triggered && (
                    <span className={cn('text-xs font-mono', Math.abs(distance) < 2 ? 'text-amber-400' : 'text-gray-500')}>
                      {distance >= 0 ? '+' : ''}{distance.toFixed(1)}% away
                    </span>
                  )}
                  <button onClick={() => toggleAlert(alert.id)} className="text-gray-600 hover:text-gray-400 p-1">
                    {alert.active ? <BellOff className="h-3.5 w-3.5" /> : <Bell className="h-3.5 w-3.5" />}
                  </button>
                  <button onClick={() => deleteAlert(alert.id)} className="text-gray-600 hover:text-red-400 p-1">
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </motion.div>
  );
}
