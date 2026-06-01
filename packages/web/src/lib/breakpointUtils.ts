/**
 * Responsive breakpoint utility functions.
 */

export type BreakpointName = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

const BREAKPOINTS: Record<BreakpointName, number> = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

const ORDERED_BREAKPOINTS: BreakpointName[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];

/** Get the current breakpoint name for a given width. */
export function getBreakpoint(width: number): BreakpointName {
  for (let i = ORDERED_BREAKPOINTS.length - 1; i >= 0; i--) {
    const name = ORDERED_BREAKPOINTS[i];
    if (width >= BREAKPOINTS[name]) {
      return name;
    }
  }
  return 'xs';
}

/** Check if the current width is above (>=) a given breakpoint. */
export function isAbove(width: number, breakpoint: BreakpointName): boolean {
  return width >= BREAKPOINTS[breakpoint];
}

/** Check if the current width is below (<) a given breakpoint. */
export function isBelow(width: number, breakpoint: BreakpointName): boolean {
  return width < BREAKPOINTS[breakpoint];
}

/** Check if the current width is between two breakpoints (inclusive lower, exclusive upper). */
export function isBetween(
  width: number,
  lower: BreakpointName,
  upper: BreakpointName
): boolean {
  return width >= BREAKPOINTS[lower] && width < BREAKPOINTS[upper];
}

/** Get the pixel value for a breakpoint name. */
export function getBreakpointValue(breakpoint: BreakpointName): number {
  return BREAKPOINTS[breakpoint];
}

/** Get all breakpoint definitions. */
export function getAllBreakpoints(): Record<BreakpointName, number> {
  return { ...BREAKPOINTS };
}
