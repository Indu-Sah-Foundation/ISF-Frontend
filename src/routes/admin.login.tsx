import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { api, auth } from "@/lib/api";
import { SiteShell } from "@/components/SiteShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/admin/login")({
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (auth.isAuthenticated()) navigate({ to: "/admin" });
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      const res = await api.login(email, password);
      auth.setSession(res.token, res.user);
      navigate({ to: "/admin" });
    } catch (err: any) {
      setError(err?.message || "Login failed");
      setIsLoading(false);
    }
  };

  return (
    <SiteShell>
      <div className="px-6 max-w-md mx-auto">
        <Card className="border-2 border-ink pencil-shadow">
          <CardHeader>
            <CardTitle className="font-display text-3xl font-extrabold tracking-tighter">
              Admin Sign In
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-2">
              Sign in with your ISF admin credentials to manage blogs.
            </p>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert className="mb-6 border-red-200 bg-red-50">
                <AlertDescription className="text-red-800">{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@isf.org"
                  required
                  disabled={isLoading}
                />
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  disabled={isLoading}
                />
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={isLoading || !email || !password}
              >
                {isLoading ? "Signing in…" : "Sign In"}
              </Button>

              <p className="text-xs text-muted-foreground pt-2">
                Admin accounts are bootstrapped on the backend — there is no
                public registration.
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </SiteShell>
  );
}
