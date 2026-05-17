import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Logo } from "@/components/Logo";
import { api } from "@/lib/api";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/admin/login")({
  head: () => ({
    meta: [
      { title: "Admin · Sign in" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const router = useRouter();
  const { isAdmin, refresh } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isAdmin) router.navigate({ to: "/admin/articles" });
  }, [isAdmin, router]);

  const login = useMutation({
    mutationFn: () => api.login(email, password),
    onSuccess: () => {
      refresh();
      router.navigate({ to: "/admin/articles" });
    },
  });

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-12 flex flex-col items-center">
          <Logo compact />
          <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
            Administration
          </p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            login.mutate();
          }}
          className="space-y-6"
        >
          <Field
            label="Email"
            type="email"
            value={email}
            onChange={setEmail}
            autoComplete="email"
            autoFocus
            required
          />
          <Field
            label="Password"
            type="password"
            value={password}
            onChange={setPassword}
            autoComplete="current-password"
            required
          />

          {login.isError && (
            <p className="font-mono text-xs text-destructive">
              {(login.error as Error).message}
            </p>
          )}

          <button
            type="submit"
            disabled={login.isPending || !email || !password}
            className="w-full bg-primary text-primary-foreground py-4 font-display font-extrabold uppercase tracking-[0.2em] text-xs hover:brightness-110 transition-all disabled:opacity-50"
          >
            {login.isPending ? "Signing in…" : "Sign in"}
          </button>
        </form>

        <p className="mt-10 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          Restricted access
        </p>
      </div>
    </div>
  );
}

function Field({
  label,
  ...rest
}: {
  label: string;
  type: string;
  value: string;
  onChange: (v: string) => void;
  autoComplete?: string;
  autoFocus?: boolean;
  required?: boolean;
}) {
  return (
    <div>
      <label className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-2 block">
        {label}
      </label>
      <input
        {...rest}
        onChange={(e) => rest.onChange(e.target.value)}
        className="w-full py-3 px-4 bg-background border border-border focus:border-primary outline-none font-display"
      />
    </div>
  );
}
