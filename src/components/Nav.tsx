import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";

const links = [
  { to: "/about", label: "About" },
  { to: "/events", label: "Projects" },
  { to: "/achievements", label: "Achievements" },
  { to: "/gallery", label: "Gallery" },
  { to: "/stories", label: "Blogs" },
  { to: "/volunteers", label: "Volunteers" },
  { to: "/contact", label: "Contact" },
] as const;

export function Nav() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastY.current;
      // Always show near top
      if (y < 80) {
        setHidden(false);
      } else if (delta > 6) {
        setHidden(true);
        setOpen(false);
      } else if (delta < -6) {
        setHidden(false);
      }
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={
        "navbar-transparent fixed top-0 z-50 w-full border-b border-border/50 transition-transform duration-300 will-change-transform " +
        (hidden ? "-translate-y-full" : "translate-y-0")
      }
    >
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-10 h-24 sm:h-28 md:h-32 lg:h-36 flex items-center justify-between gap-4">
        <Logo />

        <div className="hidden lg:flex items-center gap-6 xl:gap-9 font-display text-[12px] xl:text-[13px] font-semibold uppercase tracking-[0.18em] text-white">
          {links.map((l) => (
            <Link key={l.to} to={l.to} className="nav-link whitespace-nowrap">
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

        <button
          className="lg:hidden p-2 -mr-2 shrink-0 text-white"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border bg-background/20 backdrop-blur-lg">
          <div className="px-4 sm:px-6 py-6 flex flex-col gap-1 font-display text-sm font-semibold uppercase tracking-[0.18em] text-white">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="nav-link py-3 border-b border-border last:border-b-0 hover:text-gray-300"
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
