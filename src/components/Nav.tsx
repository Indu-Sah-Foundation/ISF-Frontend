import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
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

export function Nav({ collapsed = false }: { collapsed?: boolean }) {
  const [open, setOpen] = useState(false);
  const [homeHidden, setHomeHidden] = useState(false);

  const isHome = useRouterState({ select: (s) => s.location.pathname === "/" });

  useEffect(() => {
    if (!isHome) return;
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastY;
      if (y < 80) {
        setHomeHidden(false);
      } else if (delta > 6) {
        setHomeHidden(true);
        setOpen(false);
      } else if (delta < -6) {
        setHomeHidden(false);
      }
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  // Close the mobile menu if the bar collapses out from under it.
  useEffect(() => {
    if (collapsed) setOpen(false);
  }, [collapsed]);

  const barBg = isHome ? "navbar-transparent" : "bg-white";
  const textColor = isHome ? "text-white" : "text-zinc-900";

  const heightClasses = "h-24 sm:h-28 md:h-32 lg:h-36";

  return (
    <nav
      className={
        barBg +
        " " +
        textColor +
        " z-50 w-full " +
        (isHome
          ? 
            "fixed top-0 border-b border-border/50 transition-[transform,background-color] duration-300 will-change-transform " +
            (homeHidden ? "-translate-y-full" : "translate-y-0")
          : 
            "relative shrink-0 transition-[height] duration-300 " +
            (collapsed
              ? "h-0 overflow-hidden border-b-0"
              : heightClasses +
                " border-b border-zinc-200 shadow-sm " +
                (open ? "overflow-visible" : "overflow-hidden")))
      }
    >
      <div
        className={
          "max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-10 flex items-center justify-between gap-4 " +
          (isHome ? heightClasses : "h-full")
        }
      >
        <Logo />

        <div className="hidden xl:flex items-center gap-6 2xl:gap-9 font-display text-[12px] 2xl:text-[13px] font-semibold uppercase tracking-[0.18em]">
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
          className="xl:hidden p-2 -mr-2 shrink-0"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {open && (
        <div
          className={
            "xl:hidden border-t " +
            (isHome
              ? "border-border bg-background/20 backdrop-blur-lg"
              : "border-zinc-200 bg-white")
          }
        >
          <div className="px-4 sm:px-6 py-6 flex flex-col gap-1 font-display text-sm font-semibold uppercase tracking-[0.18em]">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="nav-link py-3 border-b border-current/15 last:border-b-0 opacity-90 hover:opacity-100"
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
