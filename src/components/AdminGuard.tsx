import { useEffect, useState } from "react";
import { Navigate } from "@tanstack/react-router";
import { useAuth } from "@/lib/auth";

// Wrap any admin page with this. Redirects to /admin/login if not authed.
// Renders nothing during the brief client-only check (SSR returns
// unauthenticated; we only know after hydration).
export function AdminGuard({ children }: { children: React.ReactNode }) {
  const { isAdmin } = useAuth();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => setHydrated(true), []);

  if (!hydrated) return null;
  if (!isAdmin) return <Navigate to="/admin/login" />;
  return <>{children}</>;
}
