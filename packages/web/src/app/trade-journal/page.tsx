'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { formatCurrency, cn } from '@/lib/formatters';
import { BookOpen, Plus, Trash2, X } from 'lucide-react';
import { toast } from 'sonner';

interface JournalEntry {
  id: string;
  date: string;
  symbol: string;
  type: 'BUY' | 'SELL';
  price: number;
  quantity: number;
  thesis: string;
  emotions: string;
  outcome?: 'win' | 'loss' | 'pending';
  createdAt: string;
}

const STORAGE_KEY = 'sp-trade-journal';

function getEntries(): JournalEntry[] {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch { return []; }
}

function saveEntries(entries: JournalEntry[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

export default function TradeJournalPage() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    symbol: '', type: 'BUY' as 'BUY' | 'SELL', price: '', quantity: '', thesis: '', emotions: '',
  });

  useEffect(() => {
    setEntries(getEntries());
  }, []);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.symbol || !form.price || !form.quantity) {
      toast.error('Fill in required fields');
      return;
    }

    const entry: JournalEntry = {
      id: crypto.randomUUID(),
      date: new Date().toISOString().split('T')[0],
      symbol: form.symbol.toUpperCase(),
      type: form.type,
      price: parseFloat(form.price),
      quantity: parseFloat(form.quantity),
      thesis: form.thesis,
      emotions: form.emotions,
      outcome: 'pending',
      createdAt: new Date().toISOString(),
    };

    const updated = [entry, ...entries];
    setEntries(updated);
    saveEntries(updated);
    setForm({ symbol: '', type: 'BUY', price: '', quantity: '', thesis: '', emotions: '' });
    setShowForm(false);
    toast.success('Journal entry added');
  };

  const handleDelete = (id: string) => {
    const updated = entries.filter((e) => e.id !== id);
    setEntries(updated);
    saveEntries(updated);
  };

  const handleOutcome = (id: string, outcome: 'win' | 'loss') => {
    const updated = entries.map((e) => e.id === id ? { ...e, outcome } : e);
    setEntries(updated);
    saveEntries(updated);
  };

  const winRate = entries.length > 0
    ? entries.filter((e) => e.outcome === 'win').length / entries.filter((e) => e.outcome !== 'pending').length
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4 sm:space-y-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Trade Journal</h1>
          <p className="mt-1 text-sm text-gray-500">Track your trades and improve your decision-making</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)}>
          {showForm ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
          {showForm ? 'Cancel' : 'New Entry'}
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <Card className="!p-3">
          <p className="text-[10px] text-gray-500 uppercase">Total Entries</p>
          <p className="text-lg font-bold text-white">{entries.length}</p>
        </Card>
        <Card className="!p-3">
          <p className="text-[10px] text-gray-500 uppercase">Win Rate</p>
          <p className={cn('text-lg font-bold', winRate > 0.5 ? 'text-green-400' : 'text-red-400')}>
            {isNaN(winRate) ? '—' : `${(winRate * 100).toFixed(0)}%`}
          </p>
        </Card>
        <Card className="!p-3">
          <p className="text-[10px] text-gray-500 uppercase">Pending</p>
          <p className="text-lg font-bold text-amber-400">{entries.filter((e) => e.outcome === 'pending').length}</p>
        </Card>
      </div>

      {/* Add Form */}
      {showForm && (
        <Card>
          <form onSubmit={handleAdd} className="space-y-3">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <Input label="Symbol" value={form.symbol} onChange={(e) => setForm((f) => ({ ...f, symbol: e.target.value.toUpperCase() }))} required />
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-400">Type</label>
                <div className="flex gap-2">
                  {(['BUY', 'SELL'] as const).map((t) => (
                    <button key={t} type="button" onClick={() => setForm((f) => ({ ...f, type: t }))}
                      className={cn('flex-1 rounded-lg py-2 text-xs font-medium border', form.type === t ? (t === 'BUY' ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-red-500/20 text-red-400 border-red-500/30') : 'bg-white/5 text-gray-500 border-white/[0.06]')}
                    >{t}</button>
                  ))}
                </div>
              </div>
              <Input label="Price" type="number" step="0.01" value={form.price} onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))} required />
              <Input label="Quantity" type="number" step="0.01" value={form.quantity} onChange={(e) => setForm((f) => ({ ...f, quantity: e.target.value }))} required />
            </div>
            <textarea
              value={form.thesis}
              onChange={(e) => setForm((f) => ({ ...f, thesis: e.target.value }))}
              placeholder="Trade thesis - why are you making this trade?"
              className="w-full rounded-lg border border-white/[0.06] bg-[#0a0a0f] p-3 text-sm text-gray-300 placeholder-gray-600 outline-none focus:border-indigo-500/30 min-h-[60px]"
            />
            <textarea
              value={form.emotions}
              onChange={(e) => setForm((f) => ({ ...f, emotions: e.target.value }))}
              placeholder="Emotional state - how are you feeling about this trade?"
              className="w-full rounded-lg border border-white/[0.06] bg-[#0a0a0f] p-3 text-sm text-gray-300 placeholder-gray-600 outline-none focus:border-indigo-500/30 min-h-[40px]"
            />
            <Button type="submit">Add Entry</Button>
          </form>
        </Card>
      )}

      {/* Entries */}
      {entries.length === 0 ? (
        <Card>
          <div className="py-12 text-center">
            <BookOpen className="mx-auto h-8 w-8 text-gray-600" />
            <p className="mt-3 text-sm text-gray-500">No journal entries yet</p>
            <p className="mt-1 text-xs text-gray-600">Start documenting your trades to spot patterns</p>
          </div>
        </Card>
      ) : (
        <div className="space-y-3">
          {entries.map((entry) => (
            <Card key={entry.id}>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Badge variant={entry.type === 'BUY' ? 'success' : 'danger'}>{entry.type}</Badge>
                  <span className="font-mono font-bold text-white">{entry.symbol}</span>
                  <span className="text-xs text-gray-500">{entry.quantity} @ {formatCurrency(entry.price)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-600">{entry.date}</span>
                  <button onClick={() => handleDelete(entry.id)} className="text-gray-600 hover:text-red-400">
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
              {entry.thesis && <p className="mt-2 text-xs text-gray-400">{entry.thesis}</p>}
              {entry.emotions && <p className="mt-1 text-xs text-gray-500 italic">{entry.emotions}</p>}
              <div className="mt-2 flex items-center gap-2">
                <span className="text-[10px] text-gray-600">Outcome:</span>
                {(['win', 'loss'] as const).map((o) => (
                  <button
                    key={o}
                    onClick={() => handleOutcome(entry.id, o)}
                    className={cn(
                      'rounded px-2 py-0.5 text-[10px] font-medium transition-colors',
                      entry.outcome === o
                        ? o === 'win' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                        : 'text-gray-600 hover:text-gray-400'
                    )}
                  >
                    {o === 'win' ? 'Win' : 'Loss'}
                  </button>
                ))}
                {entry.outcome === 'pending' && <Badge variant="warning">Pending</Badge>}
              </div>
            </Card>
          ))}
        </div>
      )}
    </motion.div>
  );
}
