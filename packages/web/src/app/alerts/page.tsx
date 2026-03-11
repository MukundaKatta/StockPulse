'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bell, Plus, Trash2, TrendingUp, TrendingDown, X } from 'lucide-react';
import { formatCurrency, cn } from '@/lib/formatters';

interface PriceAlert {
  id: string;
  symbol: string;
  targetPrice: number;
  condition: 'above' | 'below';
  active: boolean;
  createdAt: string;
}

export default function AlertsPage() {
  const [alerts, setAlerts] = useState<PriceAlert[]>(() => {
    if (typeof window === 'undefined') return [];
    const stored = localStorage.getItem('sp-alerts');
    return stored ? JSON.parse(stored) : [];
  });
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ symbol: '', targetPrice: '', condition: 'above' as 'above' | 'below' });

  const saveAlerts = (newAlerts: PriceAlert[]) => {
    setAlerts(newAlerts);
    localStorage.setItem('sp-alerts', JSON.stringify(newAlerts));
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.symbol.trim() || !form.targetPrice) {
      toast.error('Please fill in all fields');
      return;
    }

    const newAlert: PriceAlert = {
      id: crypto.randomUUID(),
      symbol: form.symbol.toUpperCase(),
      targetPrice: parseFloat(form.targetPrice),
      condition: form.condition,
      active: true,
      createdAt: new Date().toISOString(),
    };

    saveAlerts([newAlert, ...alerts]);
    setForm({ symbol: '', targetPrice: '', condition: 'above' });
    setShowForm(false);
    toast.success(`Alert set: ${newAlert.symbol} ${newAlert.condition} ${formatCurrency(newAlert.targetPrice)}`);
  };

  const handleDelete = (id: string) => {
    saveAlerts(alerts.filter((a) => a.id !== id));
    toast.success('Alert removed');
  };

  const handleToggle = (id: string) => {
    saveAlerts(alerts.map((a) => a.id === id ? { ...a, active: !a.active } : a));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4 sm:space-y-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Price Alerts</h1>
          <p className="mt-1 text-sm text-gray-500">Get notified when stocks hit your target prices</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)}>
          {showForm ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
          {showForm ? 'Cancel' : 'New Alert'}
        </Button>
      </div>

      {/* Add Alert Form */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Create Price Alert</CardTitle>
              </CardHeader>
              <form onSubmit={handleAdd} className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                <Input
                  label="Symbol"
                  value={form.symbol}
                  onChange={(e) => setForm((f) => ({ ...f, symbol: e.target.value.toUpperCase() }))}
                  placeholder="AAPL"
                  maxLength={10}
                  required
                />
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-400">Condition</label>
                  <div className="flex gap-2">
                    {(['above', 'below'] as const).map((cond) => (
                      <button
                        key={cond}
                        type="button"
                        onClick={() => setForm((f) => ({ ...f, condition: cond }))}
                        className={cn(
                          'flex-1 rounded-lg py-2.5 text-sm font-medium transition-all border',
                          form.condition === cond
                            ? cond === 'above'
                              ? 'bg-green-500/20 text-green-400 border-green-500/30'
                              : 'bg-red-500/20 text-red-400 border-red-500/30'
                            : 'bg-white/5 text-gray-500 border-white/[0.06]'
                        )}
                      >
                        {cond === 'above' ? 'Above' : 'Below'}
                      </button>
                    ))}
                  </div>
                </div>
                <Input
                  label="Target Price"
                  type="number"
                  step="0.01"
                  min="0.01"
                  value={form.targetPrice}
                  onChange={(e) => setForm((f) => ({ ...f, targetPrice: e.target.value }))}
                  placeholder="150.00"
                  required
                />
                <div className="flex items-end">
                  <Button type="submit" className="w-full">
                    <Bell className="h-4 w-4" />
                    Set Alert
                  </Button>
                </div>
              </form>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Alerts List */}
      <Card>
        <CardHeader>
          <CardTitle>Active Alerts ({alerts.filter((a) => a.active).length})</CardTitle>
        </CardHeader>

        {alerts.length === 0 ? (
          <div className="py-12 text-center text-gray-500">
            <Bell className="mx-auto mb-3 h-8 w-8 text-gray-600" />
            <p className="text-sm">No alerts configured</p>
            <p className="mt-1 text-xs text-gray-600">Create alerts to track price movements</p>
          </div>
        ) : (
          <div className="space-y-2">
            {alerts.map((alert) => (
              <div
                key={alert.id}
                className={cn(
                  'flex items-center justify-between rounded-lg border p-3 transition-all',
                  alert.active
                    ? 'border-white/[0.06] bg-[#0a0a0f]'
                    : 'border-white/[0.03] bg-[#0a0a0f]/50 opacity-50'
                )}
              >
                <div className="flex items-center gap-3">
                  <div className={cn(
                    'flex h-8 w-8 items-center justify-center rounded-lg',
                    alert.condition === 'above' ? 'bg-green-500/10' : 'bg-red-500/10'
                  )}>
                    {alert.condition === 'above'
                      ? <TrendingUp className="h-4 w-4 text-green-400" />
                      : <TrendingDown className="h-4 w-4 text-red-400" />
                    }
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm font-bold text-white">{alert.symbol}</span>
                      <Badge variant={alert.condition === 'above' ? 'success' : 'danger'}>
                        {alert.condition} {formatCurrency(alert.targetPrice)}
                      </Badge>
                    </div>
                    <span className="text-xs text-gray-600">
                      Created {new Date(alert.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleToggle(alert.id)}
                    className={cn(
                      'rounded-full px-3 py-1 text-xs font-medium transition-all',
                      alert.active ? 'bg-indigo-500/10 text-indigo-400' : 'bg-white/5 text-gray-500'
                    )}
                  >
                    {alert.active ? 'Active' : 'Paused'}
                  </button>
                  <button
                    onClick={() => handleDelete(alert.id)}
                    className="rounded p-1 text-gray-600 hover:text-red-400 transition-colors"
                    aria-label="Delete alert"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </motion.div>
  );
}
