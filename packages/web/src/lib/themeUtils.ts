export function getCSSVariable(name: string, element?: HTMLElement): string {
  const target = element ?? document.documentElement;
  return getComputedStyle(target).getPropertyValue(name).trim();
}

export function hexToHSL(hex: string): { h: number; s: number; l: number } {
  const raw = hex.replace('#', '');
  const r = parseInt(raw.slice(0, 2), 16) / 255;
  const g = parseInt(raw.slice(2, 4), 16) / 255;
  const b = parseInt(raw.slice(4, 6), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;

  if (max === min) {
    return { h: 0, s: 0, l: Math.round(l * 100) };
  }

  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

  let h: number;
  if (max === r) {
    h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
  } else if (max === g) {
    h = ((b - r) / d + 2) / 6;
  } else {
    h = ((r - g) / d + 4) / 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

export function generateColorScale(
  baseHex: string,
  steps = 10
): string[] {
  const { h, s } = hexToHSL(baseHex);
  const scale: string[] = [];
  for (let i = 0; i < steps; i++) {
    const lightness = Math.round(95 - (i / (steps - 1)) * 85);
    scale.push(`hsl(${h}, ${s}%, ${lightness}%)`);
  }
  return scale;
}
