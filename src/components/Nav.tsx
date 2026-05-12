import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";

const links = [
  { to: "/about", label: "About" },
  { to: "/gallery", label: "Gallery" },
  { to: "/events", label: "Projects" },
  { to: "/stories", label: "Articles" },
  { to: "/volunteers", label: "Volunteers" },
] as const;

export function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="sticky top-0 z-50 w-full bg-background/85 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Logo />
        <div className="hidden md:flex items-center gap-10 font-display text-[12px] font-semibold uppercase tracking-[0.18em]">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="hover:text-primary transition-colors"
              activeProps={{ className: "text-primary" }}
            >
              {l.label}
            </Link>
          ))}
          <Link
            to="/donate"
            className="bg-primary text-primary-foreground px-5 py-2.5 rounded-sm hover:brightness-110 transition-all"
          >
            Donate
          </Link>
        </div>
        <button
          className="md:hidden p-2 -mr-2"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="px-6 py-6 flex flex-col gap-5 font-display text-sm font-semibold uppercase tracking-[0.18em]">
            {links.map((l) => (
              <Link key={l.to} to={l.to} onClick={() => setOpen(false)}>
                {l.label}
              </Link>
            ))}
            <Link
              to="/donate"
              onClick={() => setOpen(false)}
              className="bg-primary text-primary-foreground px-5 py-3 rounded-sm text-center"
            >
              Donate
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
