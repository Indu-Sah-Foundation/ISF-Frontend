import { Link } from "@tanstack/react-router";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-3 group">
      <span className="grid place-items-center size-9 bg-primary text-primary-foreground font-display font-extrabold text-sm tracking-tight rounded-sm">
        ISF
      </span>
      {!compact && (
        <span className="hidden sm:inline font-display font-extrabold text-[13px] tracking-[0.18em] uppercase">
          Indu Sah Foundation
        </span>
      )}
    </Link>
  );
}
