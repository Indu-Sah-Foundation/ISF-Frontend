import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { SiteShell } from "@/components/SiteShell";
import { api } from "@/lib/api";

export const Route = createFileRoute("/donate/")({
  head: () => ({
    meta: [
      { title: "Donate — Indu Sah Foundation" },
      {
        name: "description",
        content:
          "Support better health and education for children in Nepal. Every donation helps fund clinics, classrooms and clean water.",
      },
    ],
  }),
  component: DonatePage,
});

function DonatePage() {
  const amounts = useQuery({
    queryKey: ["donation-amounts"],
    queryFn: () => api.donationAmounts(),
    retry: 1,
  });

  const [selected, setSelected] = useState<number | null>(null);
  const [custom, setCustom] = useState<string>("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const fallbackAmounts = [1000, 2500, 5000, 10000, 25000];
  const choices = amounts.data?.amounts_cents ?? fallbackAmounts;
  const currency = (amounts.data?.currency ?? "usd").toUpperCase();

  const checkout = useMutation({
    mutationFn: () => {
      const cents =
        selected ?? (custom ? Math.round(parseFloat(custom) * 100) : 0);
      if (!cents || cents < 100) {
        throw new Error("Minimum donation is $1.00");
      }
      return api.checkout({
        amount_cents: cents,
        name: name || undefined,
        email: email || undefined,
      });
    },
    onSuccess: (res) => {
      window.location.href = res.url;
    },
  });

  return (
    <SiteShell>
      <header className="px-6 pt-20 pb-12 max-w-4xl mx-auto">
        <span className="font-mono text-primary text-xs uppercase tracking-[0.2em]">
          Donate
        </span>
        <h1 className="font-display text-5xl md:text-7xl font-extrabold tracking-tighter mt-4 mb-6 text-balance">
          Fund the next chapter.
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
          100% goes to programs in Nepal. Donations are processed securely via
          Stripe — you'll be redirected to a hosted checkout.
        </p>
      </header>

      <section className="px-6 max-w-3xl mx-auto pb-24">
        <div className="bg-card border border-border p-8 md:p-12 space-y-10">
          <div>
            <label className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground mb-4 block">
              Choose an amount ({currency})
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
              {choices.map((c) => {
                const active = selected === c;
                return (
                  <button
                    key={c}
                    type="button"
                    onClick={() => {
                      setSelected(c);
                      setCustom("");
                    }}
                    className={`py-4 font-display font-bold text-lg border transition-all ${
                      active
                        ? "bg-primary text-primary-foreground border-primary"
                        : "border-border hover:border-primary"
                    }`}
                  >
                    ${(c / 100).toFixed(0)}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label
              htmlFor="custom"
              className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground mb-3 block"
            >
              Or enter a custom amount
            </label>
            <div className="flex items-center border border-border focus-within:border-primary">
              <span className="px-4 font-display font-bold text-lg text-muted-foreground">
                $
              </span>
              <input
                id="custom"
                type="number"
                min="1"
                step="1"
                placeholder="0"
                value={custom}
                onChange={(e) => {
                  setCustom(e.target.value);
                  setSelected(null);
                }}
                className="w-full py-4 bg-transparent outline-none font-display font-bold text-lg"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <Field
              label="Name (optional)"
              value={name}
              onChange={setName}
              type="text"
              placeholder="Your name"
            />
            <Field
              label="Email (optional)"
              value={email}
              onChange={setEmail}
              type="email"
              placeholder="you@example.com"
            />
          </div>

          {checkout.isError && (
            <p className="text-sm text-destructive font-mono">
              {(checkout.error as Error).message}
            </p>
          )}

          <button
            onClick={() => checkout.mutate()}
            disabled={checkout.isPending}
            className="w-full bg-primary text-primary-foreground py-5 font-display font-extrabold uppercase tracking-[0.2em] text-sm hover:brightness-110 transition-all disabled:opacity-50"
          >
            {checkout.isPending ? "Redirecting..." : "Continue to checkout →"}
          </button>

          <p className="text-xs text-muted-foreground text-center font-mono">
            Secure payment via Stripe. Indu Sah Foundation, Loharpatti, Nepal.
          </p>
        </div>
      </section>
    </SiteShell>
  );
}

function Field({
  label,
  value,
  onChange,
  type,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground mb-2 block">
        {label}
      </label>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full py-3 px-4 bg-background border border-border focus:border-primary outline-none font-display"
      />
    </div>
  );
}
