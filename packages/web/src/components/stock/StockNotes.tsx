'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StickyNote, Save, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

const STORAGE_KEY = 'sp-stock-notes';

interface StockNotesProps {
  symbol: string;
}

function getNotes(): Record<string, string> {
  if (typeof window === 'undefined') return {};
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

function saveNotes(notes: Record<string, string>): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

export function StockNotes({ symbol }: StockNotesProps) {
  const [note, setNote] = useState('');
  const [saved, setSaved] = useState(true);

  useEffect(() => {
    const notes = getNotes();
    setNote(notes[symbol] || '');
    setSaved(true);
  }, [symbol]);

  const handleSave = () => {
    const notes = getNotes();
    if (note.trim()) {
      notes[symbol] = note;
    } else {
      delete notes[symbol];
    }
    saveNotes(notes);
    setSaved(true);
    toast.success('Note saved');
  };

  const handleClear = () => {
    const notes = getNotes();
    delete notes[symbol];
    saveNotes(notes);
    setNote('');
    setSaved(true);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <StickyNote className="h-4 w-4 text-amber-400" />
          Notes
          {!saved && <span className="text-[10px] text-amber-400 font-normal">(unsaved)</span>}
        </CardTitle>
      </CardHeader>
      <textarea
        value={note}
        onChange={(e) => { setNote(e.target.value); setSaved(false); }}
        placeholder={`Add your notes about ${symbol}...`}
        className="w-full resize-none rounded-lg border border-white/[0.06] bg-[#0a0a0f] p-3 text-sm text-gray-300 placeholder-gray-600 outline-none focus:border-indigo-500/30 min-h-[80px]"
        rows={4}
      />
      <div className="mt-2 flex gap-2">
        <Button variant="secondary" onClick={handleSave} disabled={saved}>
          <Save className="h-3.5 w-3.5" />
          Save
        </Button>
        {note && (
          <Button variant="secondary" onClick={handleClear}>
            <Trash2 className="h-3.5 w-3.5" />
            Clear
          </Button>
        )}
      </div>
    </Card>
  );
}
