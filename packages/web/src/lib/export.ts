/**
 * Client-side export helpers for portfolio, watchlist, and screener data.
 *
 * No dependencies — produces a CSV or JSON Blob and triggers a browser
 * download. Safe to call from any client component.
 */

export type ExportRow = Record<string, string | number | boolean | null | undefined>;

export interface ExportOptions {
  /** File name without extension. Defaults to "stockpulse-export". */
  filename?: string;
  /** Column order override. If omitted, uses keys of the first row. */
  columns?: string[];
  /** Header labels keyed by column. Falls back to the column id. */
  labels?: Record<string, string>;
}

function escapeCSVCell(v: unknown): string {
  if (v === null || v === undefined) return '';
  const s = typeof v === 'string' ? v : String(v);
  // Quote whenever the cell could break CSV parsing.
  if (/[",\n\r]/.test(s)) {
    return `"${s.replace(/"/g, '""')}"`;
  }
  return s;
}

export function toCSV(rows: ExportRow[], opts: ExportOptions = {}): string {
  if (rows.length === 0) return '';
  const columns = opts.columns || Object.keys(rows[0]);
  const labels = opts.labels || {};
  const header = columns.map((c) => escapeCSVCell(labels[c] ?? c)).join(',');
  const body = rows
    .map((row) => columns.map((c) => escapeCSVCell(row[c])).join(','))
    .join('\n');
  return `${header}\n${body}`;
}

function triggerDownload(blob: Blob, filename: string): void {
  if (typeof window === 'undefined') return;
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.rel = 'noopener';
  document.body.appendChild(a);
  a.click();
  a.remove();
  // Revoke after the browser has had a chance to start the download.
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function downloadCSV(rows: ExportRow[], opts: ExportOptions = {}): void {
  const csv = toCSV(rows, opts);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
  triggerDownload(blob, `${opts.filename || 'stockpulse-export'}.csv`);
}

export function downloadJSON(data: unknown, opts: ExportOptions = {}): void {
  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: 'application/json;charset=utf-8' });
  triggerDownload(blob, `${opts.filename || 'stockpulse-export'}.json`);
}

/**
 * Copy rows to the clipboard in TSV (tab-separated) form — paste-friendly
 * for Excel, Google Sheets, and Numbers.
 */
export async function copyRowsToClipboard(rows: ExportRow[], opts: ExportOptions = {}): Promise<boolean> {
  if (typeof navigator === 'undefined' || !navigator.clipboard) return false;
  const columns = opts.columns || Object.keys(rows[0] || {});
  const labels = opts.labels || {};
  const header = columns.map((c) => labels[c] ?? c).join('\t');
  const body = rows.map((r) => columns.map((c) => r[c] ?? '').join('\t')).join('\n');
  try {
    await navigator.clipboard.writeText(`${header}\n${body}`);
    return true;
  } catch {
    return false;
  }
}
