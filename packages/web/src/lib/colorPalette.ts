/**
 * Color palette generation and manipulation utilities.
 */

export interface RGB {
  r: number;
  g: number;
  b: number;
}

/** Generate a palette of evenly-spaced hues for a given saturation and lightness. */
export function generatePalette(
  count: number,
  options: { saturation?: number; lightness?: number } = {}
): string[] {
  const { saturation = 70, lightness = 50 } = options;
  const colors: string[] = [];
  for (let i = 0; i < count; i++) {
    const hue = Math.round((360 / count) * i);
    colors.push(`hsl(${hue}, ${saturation}%, ${lightness}%)`);
  }
  return colors;
}

/** Get a contrasting text color (black or white) for a given background hex color. */
export function getContrastColor(hexColor: string): '#000000' | '#ffffff' {
  const { r, g, b } = hexToRgb(hexColor);
  // Relative luminance formula
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? '#000000' : '#ffffff';
}

/** Lighten a hex color by a percentage (0-100). */
export function lighten(hex: string, percent: number): string {
  const { r, g, b } = hexToRgb(hex);
  const amount = (percent / 100) * 255;
  return rgbToHex({
    r: Math.min(255, Math.round(r + amount)),
    g: Math.min(255, Math.round(g + amount)),
    b: Math.min(255, Math.round(b + amount)),
  });
}

/** Darken a hex color by a percentage (0-100). */
export function darken(hex: string, percent: number): string {
  const { r, g, b } = hexToRgb(hex);
  const amount = (percent / 100) * 255;
  return rgbToHex({
    r: Math.max(0, Math.round(r - amount)),
    g: Math.max(0, Math.round(g - amount)),
    b: Math.max(0, Math.round(b - amount)),
  });
}

/** Convert a hex color string to RGB values. */
export function hexToRgb(hex: string): RGB {
  const cleaned = hex.replace('#', '');
  let fullHex = cleaned;

  if (cleaned.length === 3) {
    fullHex = cleaned
      .split('')
      .map((c) => c + c)
      .join('');
  }

  const num = parseInt(fullHex, 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
}

/** Convert RGB values to a hex color string. */
export function rgbToHex({ r, g, b }: RGB): string {
  const toHex = (n: number) => n.toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}
