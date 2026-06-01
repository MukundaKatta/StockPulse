/**
 * Feature flag utility functions for controlling feature rollout.
 */

export interface FeatureFlag {
  name: string;
  enabled: boolean;
  variant?: string;
  percentage?: number;
  metadata?: Record<string, unknown>;
}

export interface FeatureFlagProvider {
  flags: Map<string, FeatureFlag>;
  isEnabled(name: string): boolean;
  getVariant(name: string): string | undefined;
  setFlag(flag: FeatureFlag): void;
  removeFlag(name: string): void;
  getAllFlags(): FeatureFlag[];
}

/** Check if a feature is enabled in a given set of flags. */
export function isFeatureEnabled(
  flags: FeatureFlag[],
  name: string,
  userId?: string
): boolean {
  const flag = flags.find((f) => f.name === name);
  if (!flag) return false;
  if (!flag.enabled) return false;

  // Percentage-based rollout
  if (flag.percentage !== undefined && userId) {
    const hash = simpleHash(userId + name);
    return (hash % 100) < flag.percentage;
  }

  return true;
}

/** Get the variant of a feature flag. */
export function getFeatureVariant(
  flags: FeatureFlag[],
  name: string
): string | undefined {
  const flag = flags.find((f) => f.name === name);
  if (!flag || !flag.enabled) return undefined;
  return flag.variant;
}

/** Create an in-memory feature flag provider. */
export function createFeatureFlagProvider(
  initialFlags: FeatureFlag[] = []
): FeatureFlagProvider {
  const flags = new Map<string, FeatureFlag>();

  for (const flag of initialFlags) {
    flags.set(flag.name, flag);
  }

  return {
    flags,

    isEnabled(name: string): boolean {
      const flag = flags.get(name);
      return flag?.enabled ?? false;
    },

    getVariant(name: string): string | undefined {
      const flag = flags.get(name);
      return flag?.enabled ? flag.variant : undefined;
    },

    setFlag(flag: FeatureFlag): void {
      flags.set(flag.name, flag);
    },

    removeFlag(name: string): void {
      flags.delete(name);
    },

    getAllFlags(): FeatureFlag[] {
      return Array.from(flags.values());
    },
  };
}

function simpleHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash + char) | 0;
  }
  return Math.abs(hash);
}
