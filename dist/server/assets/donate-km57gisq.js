import { r as reactExports, V as jsxRuntimeExports } from "./server-Crqfv4f8.js";
import { u as useQuery } from "./useQuery-DA2IcacT.js";
import { u as useMutation } from "./useMutation-C2_EPMqf.js";
import { S as SiteShell } from "./SiteShell-DYXur6we.js";
import { a as api } from "./api-C6z2MzOX.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./router-Dv_1nnSX.js";
import "./Logo-CLEyNjjI.js";
import "./x-21_LCaqm.js";
import "./createLucideIcon-DmTh2qWZ.js";
function DonatePage() {
  const amounts = useQuery({
    queryKey: ["donation-amounts"],
    queryFn: () => api.donationAmounts(),
    retry: 1
  });
  const [selected, setSelected] = reactExports.useState(null);
  const [custom, setCustom] = reactExports.useState("");
  const [name, setName] = reactExports.useState("");
  const [email, setEmail] = reactExports.useState("");
  const fallbackAmounts = [1e3, 2500, 5e3, 1e4, 25e3];
  const choices = amounts.data?.amounts_cents ?? fallbackAmounts;
  const currency = (amounts.data?.currency ?? "usd").toUpperCase();
  const checkout = useMutation({
    mutationFn: () => {
      const cents = selected ?? (custom ? Math.round(parseFloat(custom) * 100) : 0);
      if (!cents || cents < 100) {
        throw new Error("Minimum donation is $1.00");
      }
      return api.checkout({
        amount_cents: cents,
        name: name || void 0,
        email: email || void 0
      });
    },
    onSuccess: (res) => {
      window.location.href = res.url;
    }
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(SiteShell, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "px-6 pt-20 pb-12 max-w-4xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-primary text-xs uppercase tracking-[0.2em]", children: "Donate" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-5xl md:text-7xl font-extrabold tracking-tighter mt-4 mb-6 text-balance", children: "Fund the next chapter." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg md:text-xl text-muted-foreground max-w-2xl", children: "100% goes to programs in Nepal. Donations are processed securely via Stripe — you'll be redirected to a hosted checkout." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "px-6 max-w-3xl mx-auto pb-24", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border p-8 md:p-12 space-y-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground mb-4 block", children: [
          "Choose an amount (",
          currency,
          ")"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 sm:grid-cols-5 gap-2", children: choices.map((c) => {
          const active = selected === c;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => {
            setSelected(c);
            setCustom("");
          }, className: `py-4 font-display font-bold text-lg border transition-all ${active ? "bg-primary text-primary-foreground border-primary" : "border-border hover:border-primary"}`, children: [
            "$",
            (c / 100).toFixed(0)
          ] }, c);
        }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "custom", className: "font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground mb-3 block", children: "Or enter a custom amount" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center border border-border focus-within:border-primary", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-4 font-display font-bold text-lg text-muted-foreground", children: "$" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { id: "custom", type: "number", min: "1", step: "1", placeholder: "0", value: custom, onChange: (e) => {
            setCustom(e.target.value);
            setSelected(null);
          }, className: "w-full py-4 bg-transparent outline-none font-display font-bold text-lg" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Name (optional)", value: name, onChange: setName, type: "text", placeholder: "Your name" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Email (optional)", value: email, onChange: setEmail, type: "email", placeholder: "you@example.com" })
      ] }),
      checkout.isError && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-destructive font-mono", children: checkout.error.message }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => checkout.mutate(), disabled: checkout.isPending, className: "w-full bg-primary text-primary-foreground py-5 font-display font-extrabold uppercase tracking-[0.2em] text-sm hover:brightness-110 transition-all disabled:opacity-50", children: checkout.isPending ? "Redirecting..." : "Continue to checkout →" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground text-center font-mono", children: "Secure payment via Stripe. Indu Sah Foundation, Loharpatti, Nepal." })
    ] }) })
  ] });
}
function Field({
  label,
  value,
  onChange,
  type,
  placeholder
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground mb-2 block", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type, value, placeholder, onChange: (e) => onChange(e.target.value), className: "w-full py-3 px-4 bg-background border border-border focus:border-primary outline-none font-display" })
  ] });
}
export {
  DonatePage as component
};
