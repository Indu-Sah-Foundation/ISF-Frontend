import { Link, useRouter } from "@tanstack/react-router";
import { LogOut } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { Logo } from "./Logo";

const adminLinks = [
  { to: "/admin/articles", label: "Articles" },
  { to: "/admin/donations", label: "Donations" },
] as const;

export function AdminShell({ children }: { children: React.ReactNode }) {
  const { claims, logout } = useAuth();
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <nav className="sticky top-0 z-50 w-full bg-background/90 backdrop-blur-md border-b border-border">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-10 h-20 sm:h-24 flex items-center justify-between gap-4">
          <div className="flex items-center gap-6 sm:gap-10">
            <Logo compact />
            <span className="hidden sm:inline font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
              Admin
            </span>
            <div className="hidden md:flex items-center gap-6 font-mono text-[11px] uppercase tracking-[0.18em]">
              {adminLinks.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  activeProps={{ className: "text-foreground" }}
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-4">
            {claims && (
              <span className="hidden sm:inline font-mono text-[11px] text-muted-foreground truncate max-w-[200px]">
                {claims.email}
              </span>
            )}
            <button
              onClick={() => {
                logout();
                router.navigate({ to: "/admin/login" });
              }}
              className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground transition-colors"
            >
              <LogOut size={14} />
              <span className="hidden sm:inline">Sign out</span>
            </button>
          </div>
        </div>

        {/* Mobile-only admin tab strip */}
        <div className="md:hidden border-t border-border bg-background">
          <div className="max-w-screen-2xl mx-auto px-4 flex gap-4 font-mono text-[11px] uppercase tracking-[0.18em] overflow-x-auto">
            {adminLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="py-3 text-muted-foreground hover:text-foreground"
                activeProps={{ className: "text-foreground border-b-2 border-primary" }}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>
      <main className="flex-1">{children}</main>
    </div>
  );
}
