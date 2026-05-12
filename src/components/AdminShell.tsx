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
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-10">
            <Logo compact />
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground hidden sm:inline">
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
              <span className="hidden sm:inline font-mono text-[11px] text-muted-foreground">
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
      </nav>
      <main className="flex-1">{children}</main>
    </div>
  );
}
