import { cn } from '@/lib/formatters';

interface GradientTextProps {
  children: React.ReactNode;
  from?: string;
  via?: string;
  to?: string;
  className?: string;
  as?: 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

const presets: Record<string, { from: string; via?: string; to: string }> = {
  indigo: { from: 'from-indigo-400', to: 'to-purple-400' },
  sunset: { from: 'from-orange-400', via: 'via-pink-500', to: 'to-purple-500' },
  ocean: { from: 'from-cyan-400', to: 'to-blue-500' },
  emerald: { from: 'from-emerald-400', to: 'to-teal-500' },
  fire: { from: 'from-yellow-400', via: 'via-orange-500', to: 'to-red-500' },
};

export function GradientText({
  children,
  from = 'from-indigo-400',
  via,
  to = 'to-purple-400',
  className,
  as: Component = 'span',
}: GradientTextProps) {
  return (
    <Component
      className={cn(
        'bg-gradient-to-r bg-clip-text text-transparent',
        from,
        via,
        to,
        className
      )}
    >
      {children}
    </Component>
  );
}

// Convenience export for preset gradients
export function PresetGradientText({
  preset = 'indigo',
  children,
  className,
  as,
}: {
  preset?: keyof typeof presets;
  children: React.ReactNode;
  className?: string;
  as?: 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}) {
  const p = presets[preset] ?? presets.indigo;
  return (
    <GradientText from={p.from} via={p.via} to={p.to} className={className} as={as}>
      {children}
    </GradientText>
  );
}
