import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";

const links = [
  { to: "/about", label: "About" },
  { to: "/gallery", label: "Gallery" },
  { to: "/events", label: "Projects" },
  { to: "/stories", label: "Letters" },
  { to: "/volunteers", label: "Volunteers" },
  { to: "/contact", label: "Contact" },
] as const;

export function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="navbar-transparent top-0 z-50 w-full border-b border-border/50">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-10 h-24 sm:h-28 md:h-32 lg:h-36 flex items-center justify-between gap-4">
        {/* Logo on the far left, big and dynamic */}
        <Logo />

        {/* Desktop / large-tablet links */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-9 font-display text-[12px] xl:text-[13px] font-semibold uppercase tracking-[0.18em]">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="hover:text-primary transition-colors whitespace-nowrap"
              activeProps={{ className: "text-primary" }}
            >
              {l.label}
            </Link>
          ))}
          <Link
            to="/donate"
            className="bg-primary text-primary-foreground px-5 xl:px-6 py-2.5 rounded-sm hover:brightness-110 transition-all whitespace-nowrap"
          >
            Donate
          </Link>
        </div>

        {/* Mobile / tablet hamburger */}
        <button
          className="lg:hidden p-2 -mr-2 shrink-0"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border bg-background">
          <div className="px-4 sm:px-6 py-6 flex flex-col gap-1 font-display text-sm font-semibold uppercase tracking-[0.18em]">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="py-3 border-b border-border last:border-b-0 hover:text-primary"
                activeProps={{ className: "text-primary" }}
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/donate"
              onClick={() => setOpen(false)}
              className="mt-4 bg-primary text-primary-foreground px-5 py-4 rounded-sm text-center"
            >
              Donate
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
