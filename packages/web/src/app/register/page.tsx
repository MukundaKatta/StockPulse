'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAppStore } from '@/stores/appStore';
import api from '@/lib/api';
import { LineChart, Eye, EyeOff, Check } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/formatters';

const PASSWORD_REQUIREMENTS = [
  { test: (p: string) => p.length >= 8, label: 'At least 8 characters' },
  { test: (p: string) => /[A-Z]/.test(p), label: 'One uppercase letter' },
  { test: (p: string) => /[0-9]/.test(p), label: 'One number' },
];

export default function RegisterPage() {
  const router = useRouter();
  const { setUser, setToken } = useAppStore();
  const [form, setForm] = useState({ email: '', password: '', name: '' });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.email) errs.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Enter a valid email';
    if (!form.password) errs.password = 'Password is required';
    else if (form.password.length < 8) errs.password = 'Must be at least 8 characters';
    if (!form.name.trim()) errs.name = 'Name is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const { data } = await api.post('/api/auth/register', form);
      setToken(data.token);
      setUser(data.user);
      toast.success('Account created! Welcome to StockPulse.');
      router.push('/');
    } catch (err: any) {
      const message = err?.response?.data?.error?.message || 'Registration failed';
      toast.error(message);
      if (message.includes('already')) {
        setErrors({ email: 'This email is already registered' });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0a0a0f] p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm"
      >
        {/* Logo */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 mb-2">
            <LineChart className="h-8 w-8 text-indigo-500" />
            <span className="font-display text-2xl font-bold text-white">StockPulse</span>
          </div>
          <p className="text-sm text-gray-500">Create your free account</p>
        </div>

        <div className="rounded-xl border border-white/[0.06] bg-[#12121a] p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Name"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              placeholder="Your name"
              error={errors.name}
              autoFocus
            />

            <Input
              label="Email"
              type="email"
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              placeholder="you@example.com"
              error={errors.email}
              autoComplete="email"
            />

            <div className="relative">
              <Input
                label="Password"
                type={showPassword ? 'text' : 'password'}
                value={form.password}
                onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                placeholder="Create a password"
                error={errors.password}
                autoComplete="new-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-8 text-gray-500 hover:text-gray-300"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>

            {/* Password strength indicators */}
            {form.password && (
              <div className="space-y-1">
                {PASSWORD_REQUIREMENTS.map(({ test, label }) => (
                  <div key={label} className={cn('flex items-center gap-2 text-xs', test(form.password) ? 'text-green-400' : 'text-gray-600')}>
                    <Check className="h-3 w-3" />
                    {label}
                  </div>
                ))}
              </div>
            )}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Creating account...' : 'Create Account'}
            </Button>
          </form>

          <div className="mt-4 text-center text-sm text-gray-500">
            Already have an account?{' '}
            <Link href="/login" className="text-indigo-400 hover:text-indigo-300">
              Sign in
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
