'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { usePortfolioStore } from '@/stores/portfolioStore';
import { cn } from '@/lib/formatters';

interface AddTradeModalProps {
  portfolioId: string;
  isOpen: boolean;
  onClose: () => void;
}

export function AddTradeModal({ portfolioId, isOpen, onClose }: AddTradeModalProps) {
  const { addTrade } = usePortfolioStore();
  const [form, setForm] = useState({
    symbol: '',
    type: 'BUY' as 'BUY' | 'SELL',
    quantity: '',
    price: '',
    fee: '',
    date: new Date().toISOString().split('T')[0],
    notes: '',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!form.symbol.trim()) newErrors.symbol = 'Symbol is required';
    if (!form.quantity || parseFloat(form.quantity) <= 0) newErrors.quantity = 'Must be positive';
    if (!form.price || parseFloat(form.price) <= 0) newErrors.price = 'Must be positive';
    if (form.fee && parseFloat(form.fee) < 0) newErrors.fee = 'Cannot be negative';
    if (!form.date) newErrors.date = 'Date is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      await addTrade(portfolioId, {
        symbol: form.symbol.toUpperCase(),
        type: form.type,
        quantity: parseFloat(form.quantity),
        price: parseFloat(form.price),
        fee: form.fee ? parseFloat(form.fee) : 0,
        date: form.date,
        notes: form.notes || undefined,
      });
      onClose();
      setForm({ symbol: '', type: 'BUY', quantity: '', price: '', fee: '', date: new Date().toISOString().split('T')[0], notes: '' });
      setErrors({});
    } catch (err) {
      toast.error('Failed to add trade');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-xl border border-white/10 bg-[#12121a] p-5 sm:p-6 shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-label="Add trade"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-lg font-bold text-white">Add Trade</h2>
              <button onClick={onClose} className="rounded p-1 text-gray-500 hover:text-gray-300" aria-label="Close">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex gap-2">
                {(['BUY', 'SELL'] as const).map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setForm((f) => ({ ...f, type }))}
                    className={cn(
                      'flex-1 rounded-lg py-2 text-sm font-medium transition-all',
                      form.type === type
                        ? type === 'BUY' ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-red-500/20 text-red-400 border border-red-500/30'
                        : 'bg-white/5 text-gray-500 border border-white/[0.06]'
                    )}
                  >
                    {type}
                  </button>
                ))}
              </div>

              <Input
                label="Symbol"
                value={form.symbol}
                onChange={(e) => setForm((f) => ({ ...f, symbol: e.target.value.toUpperCase() }))}
                placeholder="AAPL"
                required
                error={errors.symbol}
                maxLength={10}
              />
              <div className="grid grid-cols-2 gap-3">
                <Input label="Quantity" type="number" step="0.01" min="0.01" value={form.quantity} onChange={(e) => setForm((f) => ({ ...f, quantity: e.target.value }))} required error={errors.quantity} />
                <Input label="Price" type="number" step="0.01" min="0.01" value={form.price} onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))} required error={errors.price} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Input label="Fee" type="number" step="0.01" min="0" value={form.fee} onChange={(e) => setForm((f) => ({ ...f, fee: e.target.value }))} placeholder="0.00" error={errors.fee} />
                <Input label="Date" type="date" value={form.date} onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))} required error={errors.date} />
              </div>
              <Input label="Notes" value={form.notes} onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))} placeholder="Optional notes..." />

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Adding...' : `Add ${form.type} Trade`}
              </Button>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
