import { useEffect, useState } from "react";
import { useRouter } from "@tanstack/react-router";
import { useAuth } from "@/lib/auth";

// Wraps an admin page. While we wait for client hydration we render nothing.
// Once hydrated we either render the children (admin) or imperatively
// navigate to /admin/login (so SSR never has to redirect).
export function AdminGuard({ children }: { children: React.ReactNode }) {
  const { isAdmin } = useAuth();
  const [hydrated, setHydrated] = useState(false);
  const router = useRouter();

  useEffect(() => setHydrated(true), []);

  useEffect(() => {
    if (hydrated && !isAdmin) {
      router.navigate({ to: "/admin/login" });
    }
  }, [hydrated, isAdmin, router]);

  if (!hydrated || !isAdmin) {
    return (
      <div className="min-h-screen grid place-items-center bg-background">
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
          Loading admin…
        </p>
      </div>
    );
  }
  return <>{children}</>;
}
