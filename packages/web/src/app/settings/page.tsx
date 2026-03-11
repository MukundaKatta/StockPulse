'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Save, Key, ExternalLink } from 'lucide-react';

export default function SettingsPage() {
  const [keys, setKeys] = useState({
    alphaVantage: '',
    finnhub: '',
    fmp: '',
  });
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    // In a real app, this would save to the backend
    localStorage.setItem('sp-api-keys', JSON.stringify(keys));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl space-y-6"
    >
      <div>
        <h1 className="font-display text-2xl font-bold text-white">Settings</h1>
        <p className="mt-1 text-sm text-gray-500">Configure API keys and preferences</p>
      </div>

      {/* API Keys */}
      <Card>
        <CardHeader>
          <CardTitle>
            <Key className="mr-1 inline h-4 w-4" />
            API Keys
          </CardTitle>
          {saved && <Badge variant="success">Saved!</Badge>}
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

      {/* About */}
      <Card>
        <CardHeader>
          <CardTitle>About StockPulse</CardTitle>
        </CardHeader>
        <p className="text-sm text-gray-400">
          StockPulse is an institutional-grade stock analysis platform featuring real-time price tracking,
          technical indicators (RSI, MACD, Bollinger Bands, SMA/EMA), fundamental analysis, and portfolio management.
        </p>
        <div className="mt-3 flex gap-2">
          <Badge variant="info">v1.0.0</Badge>
          <Badge>Next.js 14</Badge>
          <Badge>Express</Badge>
          <Badge>PostgreSQL</Badge>
          <Badge>Redis</Badge>
        </div>
      </Card>
    </motion.div>
  );
}
