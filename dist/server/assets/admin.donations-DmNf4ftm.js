import { V as jsxRuntimeExports, r as reactExports } from "./server-Crqfv4f8.js";
import { u as useQuery } from "./useQuery-DA2IcacT.js";
import { A as AdminGuard, a as AdminShell } from "./AdminShell-D5rKQjlO.js";
import { a as api } from "./api-C6z2MzOX.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./router-Dv_1nnSX.js";
import "./auth-DZM-5HgD.js";
import "./Logo-CLEyNjjI.js";
import "./createLucideIcon-DmTh2qWZ.js";
const STATUSES = ["", "paid", "pending", "failed", "refunded"];
function DonationsPage() {
  const [status, setStatus] = reactExports.useState("");
  const donations = useQuery({
    queryKey: ["admin-donations", status],
    queryFn: () => api.listDonations(status, 100, 0)
  });
  const totalPaid = donations.data ? donations.data.items.filter((d) => d.status === "paid").reduce((sum, d) => sum + d.amount_cents, 0) : 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-6 py-12", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end justify-between gap-4 mb-10 flex-wrap", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground", children: "Funding" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl md:text-5xl font-extrabold tracking-tighter mt-2", children: "Donations" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-3 flex-wrap", children: STATUSES.map((s) => {
        const active = status === s;
        return /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setStatus(s), className: `font-mono text-[10px] uppercase tracking-[0.2em] px-3 py-2 border transition-colors ${active ? "border-primary text-primary bg-primary/5" : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"}`, children: s || "All" }, s || "all");
      }) })
    ] }),
    donations.data && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "Showing", value: String(donations.data.count) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: status === "paid" ? "Total raised" : "Paid in view", value: `$${(totalPaid / 100).toLocaleString(void 0, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      })}` }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "Filter", value: status || "All statuses" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "Currency", value: "USD" })
    ] }),
    donations.isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: Array.from({
      length: 5
    }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-16 bg-muted animate-pulse rounded" }, i)) }),
    donations.isError && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border border-destructive/30 bg-destructive/5 p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-sm text-destructive", children: donations.error.message }) }),
    donations.data && donations.data.items.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border border-border p-16 text-center text-muted-foreground", children: "No donations yet for this filter." }),
    donations.data && donations.data.items.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border border-border bg-card overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-muted/40 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-6 py-4", children: "When" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-6 py-4", children: "Donor" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-6 py-4", children: "Status" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-6 py-4", children: "Amount" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-6 py-4 hidden md:table-cell", children: "Stripe ID" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-border", children: donations.data.items.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "hover:bg-muted/30 transition-colors", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-4 font-mono text-xs text-muted-foreground", children: new Date(d.created_at).toLocaleString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "numeric",
          minute: "2-digit"
        }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-6 py-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display font-bold", children: d.name || "Anonymous" }),
          d.email && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground font-mono", children: d.email })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusPill, { status: d.status }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-6 py-4 text-right font-display font-bold", children: [
          "$",
          (d.amount_cents / 100).toFixed(2)
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-6 py-4 font-mono text-[10px] text-muted-foreground hidden md:table-cell", children: [
          d.stripe_session_id.slice(0, 24),
          "…"
        ] })
      ] }, d.id)) })
    ] }) })
  ] });
}
function Stat({
  label,
  value
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-border p-5 bg-card", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 font-display text-2xl font-extrabold tracking-tighter", children: value })
  ] });
}
function StatusPill({
  status
}) {
  const styles = {
    paid: "bg-primary/10 text-primary",
    pending: "bg-muted text-muted-foreground",
    failed: "bg-destructive/10 text-destructive",
    refunded: "bg-accent text-accent-foreground"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `inline-block font-mono text-[9px] uppercase tracking-[0.2em] px-2 py-1 ${styles[status]}`, children: status });
}
const SplitComponent = () => /* @__PURE__ */ jsxRuntimeExports.jsx(AdminGuard, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(AdminShell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DonationsPage, {}) }) });
export {
  SplitComponent as component
};
