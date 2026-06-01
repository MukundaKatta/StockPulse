export function parseCSV(input: string, delimiter: string = ','): string[][] {
  const rows: string[][] = [];
  const lines = input.split('\n');

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed === '') continue;

    const cells: string[] = [];
    let current = '';
    let inQuotes = false;

    for (let i = 0; i < trimmed.length; i++) {
      const char = trimmed[i];
      if (inQuotes) {
        if (char === '"' && trimmed[i + 1] === '"') {
          current += '"';
          i++;
        } else if (char === '"') {
          inQuotes = false;
        } else {
          current += char;
        }
      } else {
        if (char === '"') {
          inQuotes = true;
        } else if (char === delimiter) {
          cells.push(current);
          current = '';
        } else {
          current += char;
        }
      }
    }
    cells.push(current);
    rows.push(cells);
  }

  return rows;
}

export function parseCSVToObjects(input: string, delimiter: string = ','): Record<string, string>[] {
  const rows = parseCSV(input, delimiter);
  if (rows.length < 2) return [];

  const headers = rows[0];
  return rows.slice(1).map((row) => {
    const obj: Record<string, string> = {};
    headers.forEach((header, i) => {
      obj[header] = row[i] ?? '';
    });
    return obj;
  });
}

export function generateCSV(data: Record<string, unknown>[], delimiter: string = ','): string {
  if (data.length === 0) return '';

  const headers = Object.keys(data[0]);
  const lines: string[] = [headers.join(delimiter)];

  for (const row of data) {
    const values = headers.map((header) => {
      const value = String(row[header] ?? '');
      if (value.includes(delimiter) || value.includes('"') || value.includes('\n')) {
        return `"${value.replace(/"/g, '""')}"`;
      }
      return value;
    });
    lines.push(values.join(delimiter));
  }

  return lines.join('\n');
}
