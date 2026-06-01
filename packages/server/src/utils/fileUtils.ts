import fs from 'fs/promises';
import path from 'path';
import os from 'os';
import crypto from 'crypto';

export async function readJsonFile<T = unknown>(filePath: string): Promise<T> {
  const content = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(content) as T;
}

export async function writeJsonFile(filePath: string, data: unknown, pretty = true): Promise<void> {
  const dir = path.dirname(filePath);
  await ensureDir(dir);
  const content = pretty ? JSON.stringify(data, null, 2) : JSON.stringify(data);
  await fs.writeFile(filePath, content, 'utf-8');
}

export async function ensureDir(dirPath: string): Promise<void> {
  await fs.mkdir(dirPath, { recursive: true });
}

export async function tempFile(extension = '.tmp'): Promise<{ path: string; cleanup: () => Promise<void> }> {
  const name = `stockpulse-${crypto.randomBytes(8).toString('hex')}${extension}`;
  const filePath = path.join(os.tmpdir(), name);
  await fs.writeFile(filePath, '', 'utf-8');
  return {
    path: filePath,
    cleanup: async () => {
      try {
        await fs.unlink(filePath);
      } catch {
        // Ignore if already deleted
      }
    },
  };
}
