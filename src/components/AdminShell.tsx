import { useEffect, useState } from "react";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import {
  LogOut,
  FileText,
  Image as ImageIcon,
  LayoutDashboard,
  Briefcase,
  Award,
  Users,
  UserSquare2,
} from "lucide-react";
import { auth, type AdminUser } from "@/lib/api";
import { Logo } from "./Logo";

const links = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/admin/articles", label: "Blogs", icon: FileText, exact: false },
  { to: "/admin/projects", label: "Projects", icon: Briefcase, exact: false },
  { to: "/admin/achievements", label: "Achievements", icon: Award, exact: false },
  { to: "/admin/team", label: "Team", icon: UserSquare2, exact: false },
  { to: "/admin/volunteers", label: "Volunteers", icon: Users, exact: false },
  { to: "/admin/gallery", label: "Gallery", icon: ImageIcon, exact: false },
] as const;

/**
 * Admin chrome — used by every admin route INSTEAD of <SiteShell>.
 *
 *  - No donor-facing public nav.
 *  - Handles the auth check + redirect once (so individual pages don't repeat
 *    the `auth.isAuthenticated()` dance).
 *  - Shows a slim top bar with admin-only links + sign out.
 */
export function AdminShell({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const router = useRouterState();
  const [ready, setReady] = useState(false);
  const [user, setUser] = useState<AdminUser | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!auth.isAuthenticated()) {
      navigate({ to: "/admin/login" });
      return;
    }
    setUser(auth.getUser());
    setReady(true);
  }, [navigate]);

  const handleLogout = () => {
    auth.clear();
    navigate({ to: "/admin/login" });
  };

  if (!ready) {
    return (
      <div className="min-h-screen grid place-items-center bg-background">
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
          Loading admin…
        </p>
      </div>
    );
  }

  const path = router.location.pathname;
  const isActive = (to: string, exact: boolean) =>
    exact ? path === to : path === to || path.startsWith(to + "/");

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <nav className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur-md border-b-2 border-ink">
        {/* Row 1 — Logo + "Admin" label + user/signout. Always single line. */}
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-10 h-16 sm:h-20 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 sm:gap-6 min-w-0">
            <Logo compact />
            <span className="hidden sm:inline font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground border-l border-ink/30 pl-4 sm:pl-6">
              Admin
            </span>
          </div>
          <div className="flex items-center gap-4 shrink-0">
            {user && (
              <span className="hidden sm:inline font-mono text-[11px] text-muted-foreground truncate max-w-[200px]">
                {user.email}
              </span>
            )}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Sign out</span>
            </button>
          </div>
        </div>

        {/* Row 2 — admin tabs. Same on every viewport; scrolls horizontally
            on narrow screens. Moved into its own row so 7 tabs + logo +
            user email never collide in the same bar. */}
        <div className="border-t border-ink/30 bg-cream/40">
          <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-10 flex gap-1 font-mono text-[11px] uppercase tracking-[0.18em] overflow-x-auto">
            {links.map((l) => {
              const Icon = l.icon;
              const active = isActive(l.to, l.exact);
              return (
                <Link
                  key={l.to}
                  to={l.to}
                  className={
                    "flex items-center gap-2 px-3 py-3 whitespace-nowrap border-b-2 transition-colors " +
                    (active
                      ? "border-primary text-foreground"
                      : "border-transparent text-muted-foreground hover:text-foreground")
                  }
                >
                  <Icon className="w-4 h-4" />
                  {l.label}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>
      <main className="flex-1 py-6 sm:py-10">{children}</main>
    </div>
  );
}
