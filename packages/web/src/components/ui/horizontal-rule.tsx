interface HorizontalRuleProps {
  label?: string;
  className?: string;
}

export function HorizontalRule({ label, className }: HorizontalRuleProps) {
  if (label) {
    return (
      <div className={`flex items-center gap-3 ${className ?? ''}`}>
        <div className="h-px flex-1 bg-white/[0.06]" />
        <span className="text-[10px] font-medium uppercase tracking-wider text-gray-600">
          {label}
        </span>
        <div className="h-px flex-1 bg-white/[0.06]" />
      </div>
    );
  }

  return <hr className={`border-0 h-px bg-white/[0.06] ${className ?? ''}`} />;
}
