'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAppStore } from '@/stores/appStore';
import { isAxiosError } from 'axios';
import api from '@/lib/api';
import { LineChart, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/formatters';

export default function LoginPage() {
  const router = useRouter();
  const { setUser, setToken } = useAppStore();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.email) errs.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Enter a valid email';
    if (!form.password) errs.password = 'Password is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const { data } = await api.post('/api/auth/login', form);
      setToken(data.token);
      setUser(data.user);
      toast.success('Welcome back!');
      router.push('/');
    } catch (err: unknown) {
      const message = isAxiosError(err) ? err.response?.data?.error?.message || 'Login failed' : 'Login failed';
      toast.error(message);
      if (message.includes('credentials')) {
        setErrors({ password: 'Invalid email or password' });
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
          <p className="text-sm text-gray-500">Sign in to your account</p>
        </div>

        <div className="rounded-xl border border-white/[0.06] bg-[#12121a] p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email"
              type="email"
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              placeholder="you@example.com"
              error={errors.email}
              autoComplete="email"
              autoFocus
            />

            <div className="relative">
              <Input
                label="Password"
                type={showPassword ? 'text' : 'password'}
                value={form.password}
                onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                placeholder="Enter your password"
                error={errors.password}
                autoComplete="current-password"
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

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          <div className="mt-4 text-center text-sm text-gray-500">
            Don&apos;t have an account?{' '}
            <Link href="/register" className="text-indigo-400 hover:text-indigo-300">
              Create one
            </Link>
          </div>
        </div>

        {/* Demo hint */}
        <p className="mt-4 text-center text-xs text-gray-600">
          Demo mode: Any credentials will work for testing
        </p>
      </motion.div>
    </div>
  );
}
