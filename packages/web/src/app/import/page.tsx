'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/formatters';
import { Upload, FileText, CheckCircle, AlertCircle } from 'lucide-react';

type ImportStatus = 'idle' | 'uploading' | 'processing' | 'success' | 'error';

interface ImportFormat {
  name: string;
  description: string;
  extensions: string;
  icon: string;
}

const FORMATS: ImportFormat[] = [
  { name: 'CSV', description: 'Standard comma-separated values', extensions: '.csv', icon: '📄' },
  { name: 'Robinhood', description: 'Export from Robinhood account', extensions: '.csv', icon: '🪶' },
  { name: 'TD Ameritrade', description: 'Think or Swim export format', extensions: '.csv', icon: '🟢' },
  { name: 'Fidelity', description: 'Fidelity portfolio export', extensions: '.csv', icon: '🟩' },
  { name: 'Interactive Brokers', description: 'IBKR Activity Statement', extensions: '.csv, .xml', icon: '🔴' },
  { name: 'Schwab', description: 'Charles Schwab export', extensions: '.csv', icon: '🔵' },
];

export default function ImportPage() {
  const [selectedFormat, setSelectedFormat] = useState<string | null>(null);
  const [status, setStatus] = useState<ImportStatus>('idle');
  const [dragOver, setDragOver] = useState(false);

  const handleImport = () => {
    setStatus('uploading');
    setTimeout(() => setStatus('processing'), 1000);
    setTimeout(() => setStatus('success'), 2500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl space-y-4 sm:space-y-6"
    >
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Import Data</h1>
        <p className="mt-1 text-sm text-gray-500">Import portfolio and trade data from brokerages</p>
      </div>

      {/* Format Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Select Format</CardTitle>
        </CardHeader>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {FORMATS.map((format) => (
            <button key={format.name} onClick={() => setSelectedFormat(format.name)}
              className={cn('rounded-lg border p-3 text-left transition-all', selectedFormat === format.name ? 'border-indigo-500/50 bg-indigo-500/5' : 'border-white/[0.06] bg-white/[0.02] hover:border-white/10')}
            >
              <span className="text-lg">{format.icon}</span>
              <p className="text-xs font-medium text-white mt-1">{format.name}</p>
              <p className="text-[10px] text-gray-500">{format.extensions}</p>
            </button>
          ))}
        </div>
      </Card>

      {/* Upload Area */}
      {selectedFormat && (
        <Card>
          <CardHeader>
            <CardTitle>Upload File</CardTitle>
          </CardHeader>
          <div
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={(e) => { e.preventDefault(); setDragOver(false); handleImport(); }}
            className={cn('border-2 border-dashed rounded-xl p-8 text-center transition-colors', dragOver ? 'border-indigo-500/50 bg-indigo-500/5' : 'border-white/[0.08] hover:border-white/[0.15]')}
          >
            {status === 'idle' && (
              <>
                <Upload className="h-8 w-8 text-gray-600 mx-auto mb-3" />
                <p className="text-sm text-gray-400">Drag and drop your file here</p>
                <p className="text-xs text-gray-600 mt-1">or</p>
                <Button variant="secondary" size="sm" className="mt-3" onClick={handleImport}>
                  <FileText className="h-3.5 w-3.5 mr-1.5" />
                  Browse Files
                </Button>
              </>
            )}
            {status === 'uploading' && (
              <div className="space-y-3">
                <div className="w-8 h-8 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin mx-auto" />
                <p className="text-sm text-gray-400">Uploading...</p>
              </div>
            )}
            {status === 'processing' && (
              <div className="space-y-3">
                <div className="w-8 h-8 border-2 border-amber-400 border-t-transparent rounded-full animate-spin mx-auto" />
                <p className="text-sm text-gray-400">Processing transactions...</p>
              </div>
            )}
            {status === 'success' && (
              <div className="space-y-3">
                <CheckCircle className="h-8 w-8 text-green-400 mx-auto" />
                <p className="text-sm text-green-400">Import successful!</p>
                <p className="text-xs text-gray-500">47 transactions imported</p>
                <Button variant="secondary" size="sm" onClick={() => setStatus('idle')}>Import Another</Button>
              </div>
            )}
            {status === 'error' && (
              <div className="space-y-3">
                <AlertCircle className="h-8 w-8 text-red-400 mx-auto" />
                <p className="text-sm text-red-400">Import failed</p>
                <p className="text-xs text-gray-500">Invalid file format</p>
                <Button variant="secondary" size="sm" onClick={() => setStatus('idle')}>Try Again</Button>
              </div>
            )}
          </div>
        </Card>
      )}

      {/* Expected Format */}
      <Card>
        <CardHeader>
          <CardTitle>Expected CSV Format</CardTitle>
        </CardHeader>
        <div className="rounded-lg bg-black/30 p-3 font-mono text-xs text-gray-400 overflow-x-auto">
          <p>date,symbol,action,quantity,price</p>
          <p>2024-01-15,AAPL,BUY,10,185.50</p>
          <p>2024-02-01,MSFT,BUY,5,410.20</p>
          <p>2024-02-20,AAPL,SELL,5,192.30</p>
        </div>
      </Card>
    </motion.div>
  );
}
