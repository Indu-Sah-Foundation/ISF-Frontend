import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { AdminGuard } from "@/components/AdminGuard";
import { AdminShell } from "@/components/AdminShell";
import { api } from "@/lib/api";

export const Route = createFileRoute("/admin/donations")({
  head: () => ({
    meta: [
      { title: "Donations · Admin" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: () => (
    <AdminGuard>
      <AdminShell>
        <DonationsPage />
      </AdminShell>
    </AdminGuard>
  ),
});

const STATUSES = ["", "paid", "pending", "failed", "refunded"] as const;

function DonationsPage() {
  const [status, setStatus] = useState<string>("");

  const donations = useQuery({
    queryKey: ["admin-donations", status],
    queryFn: () => api.listDonations(status, 100, 0),
  });

  const totalPaid = donations.data
    ? donations.data.items
        .filter((d) => d.status === "paid")
        .reduce((sum, d) => sum + d.amount_cents, 0)
    : 0;

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex items-end justify-between gap-4 mb-10 flex-wrap">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
            Funding
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-extrabold tracking-tighter mt-2">
            Donations
          </h1>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          {STATUSES.map((s) => {
            const active = status === s;
            return (
              <button
                key={s || "all"}
                onClick={() => setStatus(s)}
                className={`font-mono text-[10px] uppercase tracking-[0.2em] px-3 py-2 border transition-colors ${
                  active
                    ? "border-primary text-primary bg-primary/5"
                    : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
                }`}
              >
                {s || "All"}
              </button>
            );
          })}
        </div>
      </div>

      {donations.data && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          <Stat label="Showing" value={String(donations.data.count)} />
          <Stat
            label={status === "paid" ? "Total raised" : "Paid in view"}
            value={`$${(totalPaid / 100).toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}`}
          />
          <Stat
            label="Filter"
            value={status || "All statuses"}
          />
          <Stat label="Currency" value="USD" />
        </div>
      )}

      {donations.isLoading && (
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-16 bg-muted animate-pulse rounded" />
          ))}
        </div>
      )}

      {donations.isError && (
        <div className="border border-destructive/30 bg-destructive/5 p-6">
          <p className="font-mono text-sm text-destructive">
            {(donations.error as Error).message}
          </p>
        </div>
      )}

      {donations.data && donations.data.items.length === 0 && (
        <div className="border border-border p-16 text-center text-muted-foreground">
          No donations yet for this filter.
        </div>
      )}

      {donations.data && donations.data.items.length > 0 && (
        <div className="border border-border bg-card overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/40 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              <tr>
                <th className="text-left px-6 py-4">When</th>
                <th className="text-left px-6 py-4">Donor</th>
                <th className="text-left px-6 py-4">Status</th>
                <th className="text-right px-6 py-4">Amount</th>
                <th className="text-left px-6 py-4 hidden md:table-cell">
                  Stripe ID
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {donations.data.items.map((d) => (
                <tr key={d.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4 font-mono text-xs text-muted-foreground">
                    {new Date(d.created_at).toLocaleString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "numeric",
                      minute: "2-digit",
                    })}
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-display font-bold">
                      {d.name || "Anonymous"}
                    </div>
                    {d.email && (
                      <div className="text-xs text-muted-foreground font-mono">
                        {d.email}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <StatusPill status={d.status} />
                  </td>
                  <td className="px-6 py-4 text-right font-display font-bold">
                    ${(d.amount_cents / 100).toFixed(2)}
                  </td>
                  <td className="px-6 py-4 font-mono text-[10px] text-muted-foreground hidden md:table-cell">
                    {d.stripe_session_id.slice(0, 24)}…
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-border p-5 bg-card">
      <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
        {label}
      </div>
      <div className="mt-2 font-display text-2xl font-extrabold tracking-tighter">
        {value}
      </div>
    </div>
  );
}

function StatusPill({
  status,
}: {
  status: "pending" | "paid" | "failed" | "refunded";
}) {
  const styles: Record<typeof status, string> = {
    paid: "bg-primary/10 text-primary",
    pending: "bg-muted text-muted-foreground",
    failed: "bg-destructive/10 text-destructive",
    refunded: "bg-accent text-accent-foreground",
  };
  return (
    <span
      className={`inline-block font-mono text-[9px] uppercase tracking-[0.2em] px-2 py-1 ${styles[status]}`}
    >
      {status}
    </span>
  );
}
