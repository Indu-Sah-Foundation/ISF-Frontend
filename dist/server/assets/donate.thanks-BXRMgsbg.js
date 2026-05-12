import { V as jsxRuntimeExports } from "./server-Crqfv4f8.js";
import { a as Route, L as Link } from "./router-Dv_1nnSX.js";
import { S as SiteShell } from "./SiteShell-DYXur6we.js";
import { c as createLucideIcon } from "./createLucideIcon-DmTh2qWZ.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./Logo-CLEyNjjI.js";
import "./x-21_LCaqm.js";
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
];
const CircleCheck = createLucideIcon("circle-check", __iconNode);
function ThanksPage() {
  const {
    session_id
  } = Route.useSearch();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(SiteShell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "px-6 pt-32 pb-24 max-w-3xl mx-auto text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex items-center justify-center size-16 rounded-full bg-primary/10 text-primary mb-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { size: 32 }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-primary text-xs uppercase tracking-[0.2em]", children: "Donation Received" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-5xl md:text-7xl font-extrabold tracking-tighter mt-4 mb-6 text-balance", children: "Thank you." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg md:text-xl text-muted-foreground max-w-xl mx-auto leading-relaxed", children: "Your gift will fund clinics, classrooms, and clean water in Mahottari. A receipt is on its way to your inbox." }),
    session_id && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-10 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground", children: [
      "Reference · ",
      session_id.slice(0, 24),
      "…"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-12 flex gap-4 justify-center flex-wrap", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/stories", className: "bg-primary text-primary-foreground px-6 py-3 font-mono text-[11px] uppercase tracking-[0.2em] hover:brightness-110 transition-all", children: "Read our stories" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "border border-border px-6 py-3 font-mono text-[11px] uppercase tracking-[0.2em] hover:border-primary transition-all", children: "Back to home" })
    ] })
  ] }) });
}
export {
  ThanksPage as component
};
