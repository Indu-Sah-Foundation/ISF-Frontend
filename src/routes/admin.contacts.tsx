import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Mail,
  Trash2,
  CheckCircle2,
  Circle,
  HeartHandshake,
} from "lucide-react";
import { AdminShell } from "@/components/AdminShell";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { api, type Donation } from "@/lib/api";

export const Route = createFileRoute("/admin/contacts")({
  component: AdminInboxPage,
});

type Tab = "messages" | "donations";

function money(cents: number, currency = "usd") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(cents / 100);
}

function AdminInboxPage() {
  const [tab, setTab] = useState<Tab>("messages");

  return (
    <AdminShell>
      <div className="max-w-5xl mx-auto px-5 sm:px-6 lg:px-10">
        <header className="mb-6">
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tighter">
            Activity
          </h1>
        </header>

        {/* Sub-tabs */}
        <div className="flex gap-1 border-b border-border mb-8">
          <button
            onClick={() => setTab("messages")}
            className={
              "px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.2em] inline-flex items-center gap-2 border-b-2 -mb-px transition-colors " +
              (tab === "messages"
                ? "border-primary text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground")
            }
          >
            <Mail className="size-3.5" /> Messages
          </button>
          <button
            onClick={() => setTab("donations")}
            className={
              "px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.2em] inline-flex items-center gap-2 border-b-2 -mb-px transition-colors " +
              (tab === "donations"
                ? "border-primary text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground")
            }
          >
            <HeartHandshake className="size-3.5" /> Donations
          </button>
        </div>

        {tab === "messages" ? <MessagesPanel /> : <DonationsPanel />}
      </div>
    </AdminShell>
  );
}

function MessagesPanel() {
  const qc = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["admin", "contacts"],
    queryFn: () => api.listContacts(200, 0),
    refetchOnWindowFocus: true,
  });

  const markReadMut = useMutation({
    mutationFn: ({ id, read }: { id: string; read: boolean }) =>
      api.markContactRead(id, read),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "contacts"] });
    },
  });

  const deleteMut = useMutation({
    mutationFn: (id: string) => api.deleteContact(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "contacts"] });
    },
  });

  const items = data?.items || [];
  const unread = items.filter((c) => !c.read).length;

  return (
    <>
      <p className="text-sm text-muted-foreground mb-6">
        Contact-form submissions from the public site.
        {items.length > 0 && (
          <>
            {" "}
            <span className="font-mono">{items.length}</span> total
            {unread > 0 && (
              <>
                , <span className="font-mono text-primary">{unread}</span> unread
              </>
            )}
            .
          </>
        )}
      </p>

      {isLoading && <p className="text-muted-foreground">Loading messages…</p>}
      {isError && (
        <p className="text-destructive font-mono text-sm">
          Couldn't load messages. Refresh in a moment.
        </p>
      )}

      {!isLoading && items.length === 0 && (
        <Card className="border-2 border-ink">
          <CardContent className="py-12 text-center text-muted-foreground">
            <Mail className="w-8 h-8 mx-auto mb-3 opacity-50" />
            No messages yet. New contact-form submissions will appear here.
          </CardContent>
        </Card>
      )}

      <ul className="space-y-4">
        {items.map((c) => (
          <li
            key={c.id}
            className={
              "border-2 border-ink p-5 sm:p-6 transition-colors " +
              (c.read ? "bg-cream/40" : "bg-cream")
            }
          >
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  {!c.read && (
                    <span className="font-mono text-[9px] uppercase tracking-[0.18em] bg-primary text-primary-foreground px-1.5 py-0.5">
                      New
                    </span>
                  )}
                  <a
                    href={`mailto:${c.email}?subject=Re: Your message to Indu Sah Foundation`}
                    className="font-display font-extrabold text-base sm:text-lg break-all hover:underline underline-offset-2"
                  >
                    {c.email}
                  </a>
                </div>
                <p className="font-mono text-[11px] text-muted-foreground mt-1">
                  {new Date(c.created_at).toLocaleString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                  })}
                  {c.ip && <span className="ml-2 opacity-60">· {c.ip}</span>}
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => markReadMut.mutate({ id: c.id, read: !c.read })}
                  aria-label={c.read ? "Mark unread" : "Mark read"}
                >
                  {c.read ? (
                    <Circle className="w-4 h-4" />
                  ) : (
                    <CheckCircle2 className="w-4 h-4" />
                  )}
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    if (confirm(`Delete this message from ${c.email}?`)) {
                      deleteMut.mutate(c.id);
                    }
                  }}
                  aria-label="Delete message"
                >
                  <Trash2 className="w-4 h-4 text-destructive" />
                </Button>
              </div>
            </div>

            <p className="mt-4 whitespace-pre-wrap text-sm sm:text-base leading-relaxed text-pretty">
              {c.message}
            </p>
          </li>
        ))}
      </ul>
    </>
  );
}

function DonationsPanel() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["admin", "donations"],
    queryFn: () => api.listDonations(200, 0),
    refetchOnWindowFocus: true,
  });

  const donations: Donation[] = data?.items || [];
  const paid = donations.filter((d) => d.status === "paid");

  const totalCents = paid.reduce((sum, d) => sum + d.amount_cents, 0);
  const currency = paid[0]?.currency || "usd";

  // Stripe's discounted nonprofit pricing: 2.2% + $0.30 per successful charge.
  // Fees apply per donation (the fixed 30¢ is charged once per transaction),
  // so we compute it per row and sum — not on the grand total.
  const STRIPE_PERCENT = 0.022;
  const STRIPE_FIXED_CENTS = 30;
  const netCents = paid.reduce(
    (sum, d) =>
      sum + (d.amount_cents - Math.round(d.amount_cents * STRIPE_PERCENT) - STRIPE_FIXED_CENTS),
    0,
  );

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  const stat = (label: string, value: string) => (
    <Card>
      <CardContent className="pt-6">
        <div className="font-display text-3xl font-extrabold tracking-tighter">
          {value}
        </div>
        <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          {label}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <>
      <p className="mb-6 text-muted-foreground">
        Every completed donation, newest first. Totals count paid donations only.
      </p>

      <div className="grid grid-cols-3 gap-4 mb-8">
        {stat("Total raised", money(totalCents, currency))}
        {stat("Net raised", money(netCents, currency))}
        {stat("Donations", String(paid.length))}
      </div>

      {isLoading && <p className="text-muted-foreground">Loading…</p>}
      {isError && (
        <p className="text-muted-foreground font-mono text-sm">
          Couldn't load donations.
        </p>
      )}
      {!isLoading && paid.length === 0 && !isError && (
        <p className="text-muted-foreground">No donations yet.</p>
      )}

      {paid.length > 0 && (
        <div className="border border-border overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/40 text-left">
                <th className="px-4 py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  Date
                </th>
                <th className="px-4 py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  Donor
                </th>
                <th className="px-4 py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  Email
                </th>
                <th className="px-4 py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground text-right">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody>
              {paid.map((d) => (
                <tr key={d.id} className="border-b border-border last:border-0">
                  <td className="px-4 py-3 whitespace-nowrap text-muted-foreground">
                    {formatDate(d.created_at)}
                  </td>
                  <td className="px-4 py-3 font-display">
                    {d.name || "Anonymous"}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {d.email || "—"}
                  </td>
                  <td className="px-4 py-3 text-right font-display font-bold whitespace-nowrap">
                    {money(d.amount_cents, d.currency)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
