import { useQuery } from "@tanstack/react-query";
import { Globe } from "lucide-react";
import { api } from "@/lib/api";

const FEATURED = ["en", "es", "fr", "hi", "ne", "ar", "zh-Hans", "pt"] as const;

interface Props {
  value: string;
  onChange: (lang: string) => void;
}

// Compact dropdown styled to match the editorial design system.
// Empty value ("") = original source language.
export function LanguagePicker({ value, onChange }: Props) {
  const { data } = useQuery({
    queryKey: ["languages"],
    queryFn: () => api.languages(),
    staleTime: 1000 * 60 * 60, // 1h — language list rarely changes
    retry: 1,
  });

  const featured = FEATURED.filter((c) => c !== "en")
    .map((c) => ({ code: c, label: data?.[c]?.nativeName ?? c }))
    .filter((o) => !!o.label);

  const rest = data
    ? Object.entries(data)
        .filter(([c]) => !FEATURED.includes(c as any))
        .map(([c, info]) => ({ code: c, label: info.nativeName }))
        .sort((a, b) => a.label.localeCompare(b.label))
    : [];

  return (
    <label className="inline-flex items-center gap-2 border border-border bg-card px-3 py-2 cursor-pointer hover:border-primary transition-colors">
      <Globe size={14} className="text-muted-foreground" />
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-transparent outline-none font-mono text-[11px] uppercase tracking-[0.15em] cursor-pointer"
        aria-label="Translate this story"
      >
        <option value="">Original (English)</option>
        {featured.length > 0 && (
          <optgroup label="Featured">
            {featured.map((o) => (
              <option key={o.code} value={o.code}>
                {o.label}
              </option>
            ))}
          </optgroup>
        )}
        {rest.length > 0 && (
          <optgroup label="All languages">
            {rest.map((o) => (
              <option key={o.code} value={o.code}>
                {o.label}
              </option>
            ))}
          </optgroup>
        )}
      </select>
    </label>
  );
}
