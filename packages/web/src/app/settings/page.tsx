'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAppStore } from '@/stores/appStore';
import { Save, Key, ExternalLink, Sun, Moon, Keyboard, Trash2, Download } from 'lucide-react';
import { cn } from '@/lib/formatters';
import Link from 'next/link';

export default function SettingsPage() {
  const { theme, setTheme } = useAppStore();
  const [keys, setKeys] = useState({
    alphaVantage: '',
    finnhub: '',
    fmp: '',
  });

  useEffect(() => {
    const stored = localStorage.getItem('sp-api-keys');
    if (stored) {
      try { setKeys((prev) => ({ ...prev, ...JSON.parse(stored) })); } catch {}
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem('sp-api-keys', JSON.stringify(keys));
    toast.success('API keys saved successfully');
  };

  const handleClearData = () => {
    if (confirm('Are you sure? This will clear all local data including API keys and preferences.')) {
      localStorage.clear();
      toast.success('Local data cleared. Reloading...');
      setTimeout(() => window.location.reload(), 1000);
    }
  };

  const handleExportData = () => {
    const data = {
      apiKeys: keys,
      alerts: localStorage.getItem('sp-alerts'),
      appStore: localStorage.getItem('sp-app-store'),
      exportedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `stockpulse-settings-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Settings exported');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl space-y-4 sm:space-y-6"
    >
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Settings</h1>
        <p className="mt-1 text-sm text-gray-500">Configure API keys and preferences</p>
      </div>

      {/* Theme */}
      <Card>
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
        </CardHeader>
        <div className="flex gap-2">
          {([
            { value: 'dark' as const, icon: Moon, label: 'Dark' },
            { value: 'light' as const, icon: Sun, label: 'Light' },
          ]).map(({ value, icon: Icon, label }) => (
            <button
              key={value}
              onClick={() => setTheme(value)}
              className={cn(
                'flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-all border',
                theme === value
                  ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30'
                  : 'bg-white/5 text-gray-500 border-white/[0.06] hover:text-gray-300'
              )}
            >
              <Icon className="h-4 w-4" />
              {label}
            </button>
          ))}
        </div>
      </Card>

      {/* Keyboard Shortcuts */}
      <Card>
        <CardHeader>
          <CardTitle>
            <Keyboard className="mr-1 inline h-4 w-4" />
            Keyboard Shortcuts
          </CardTitle>
        </CardHeader>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-400">Search stocks</span>
            <kbd className="rounded border border-white/10 bg-white/5 px-2 py-0.5 text-xs text-gray-300 font-mono">Cmd+K</kbd>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Toggle sidebar</span>
            <kbd className="rounded border border-white/10 bg-white/5 px-2 py-0.5 text-xs text-gray-300 font-mono">Cmd+B</kbd>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Toggle theme</span>
            <kbd className="rounded border border-white/10 bg-white/5 px-2 py-0.5 text-xs text-gray-300 font-mono">Cmd+Shift+D</kbd>
          </div>
        </div>
        <Link href="/shortcuts" className="mt-3 inline-flex text-xs text-indigo-400 hover:text-indigo-300">
          View all shortcuts
        </Link>
      </Card>

      {/* API Keys */}
      <Card>
        <CardHeader>
          <CardTitle>
            <Key className="mr-1 inline h-4 w-4" />
            API Keys
          </CardTitle>
        </CardHeader>

        <div className="space-y-4">
          <div>
            <Input
              label="Alpha Vantage API Key"
              type="password"
              value={keys.alphaVantage}
              onChange={(e) => setKeys((k) => ({ ...k, alphaVantage: e.target.value }))}
              placeholder="Enter your Alpha Vantage key"
            />
            <a
              href="https://www.alphavantage.co/support/#api-key"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300"
            >
              Get a free key <ExternalLink className="h-3 w-3" />
            </a>
          </div>

          <div>
            <Input
              label="Finnhub API Key"
              type="password"
              value={keys.finnhub}
              onChange={(e) => setKeys((k) => ({ ...k, finnhub: e.target.value }))}
              placeholder="Enter your Finnhub key"
            />
            <a
              href="https://finnhub.io/register"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300"
            >
              Get a free key <ExternalLink className="h-3 w-3" />
            </a>
          </div>

          <div>
            <Input
              label="Financial Modeling Prep Key"
              type="password"
              value={keys.fmp}
              onChange={(e) => setKeys((k) => ({ ...k, fmp: e.target.value }))}
              placeholder="Enter your FMP key"
            />
            <a
              href="https://financialmodelingprep.com/developer"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300"
            >
              Get a free key <ExternalLink className="h-3 w-3" />
            </a>
          </div>

          <Button onClick={handleSave}>
            <Save className="h-4 w-4" />
            Save Keys
          </Button>
        </div>
      </Card>

      {/* Data Management */}
      <Card>
        <CardHeader>
          <CardTitle>Data Management</CardTitle>
        </CardHeader>
        <div className="flex flex-wrap gap-2">
          <Button variant="secondary" onClick={handleExportData}>
            <Download className="h-4 w-4" />
            Export Settings
          </Button>
          <Button variant="danger" onClick={handleClearData}>
            <Trash2 className="h-4 w-4" />
            Clear Local Data
          </Button>
        </div>
      </Card>

      {/* About */}
      <Card>
        <CardHeader>
          <CardTitle>About StockPulse</CardTitle>
        </CardHeader>
        <p className="text-sm text-gray-400">
          StockPulse is an institutional-grade stock analysis platform featuring real-time price tracking,
          technical indicators (RSI, MACD, Bollinger Bands, SMA/EMA), fundamental analysis, and portfolio management.
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <Badge variant="info">v1.0.0</Badge>
          <Badge>Next.js 16</Badge>
          <Badge>Express</Badge>
          <Badge>PostgreSQL</Badge>
          <Badge>Redis</Badge>
        </div>
      </Card>
    </motion.div>
  );
}
