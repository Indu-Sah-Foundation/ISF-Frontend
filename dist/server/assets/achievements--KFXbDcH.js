import { V as jsxRuntimeExports } from "./server-Crqfv4f8.js";
import { L as Link } from "./router-Dv_1nnSX.js";
import { S as SiteShell } from "./SiteShell-DYXur6we.js";
import { c as createLucideIcon } from "./createLucideIcon-DmTh2qWZ.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./Logo-CLEyNjjI.js";
import "./x-21_LCaqm.js";
const __iconNode = [
  [
    "path",
    {
      d: "m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526",
      key: "1yiouv"
    }
  ],
  ["circle", { cx: "12", cy: "8", r: "6", key: "1vp47v" }]
];
const Award = createLucideIcon("award", __iconNode);
const recognitions = [{
  title: "Letter of Appreciation from Netrawati Municipality, Dhading, Nepal",
  body: ""
}, {
  title: "Letter of Appreciation for the Dental Treatment Camp Project",
  body: "The Indu Sah Foundation has received appreciation from the Ganga Jamuna Municipality for its work in the Dental Treatment Camp in Phulakharka, Ganga Jamuna, Dhading, Nepal. The Indu Sah Foundation would like to thank the Ganga Jamuna Municipality for this appreciation and we want to deliver more services to the communities of Ganga Jamuna in the near future."
}, {
  title: "Letter of Recognition from Karmalaya Foundation",
  body: ""
}];
function AchievementsPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(SiteShell, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "px-6 pt-20 pb-16 max-w-7xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-primary text-xs uppercase tracking-[0.2em]", children: "Achievements" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-5xl md:text-7xl font-extrabold tracking-tighter mt-4 text-balance max-w-4xl", children: "Recognized by the communities we serve." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "px-6 max-w-7xl mx-auto pb-24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-3 gap-6", children: recognitions.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "border border-border bg-card p-8 flex flex-col", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-10 grid place-items-center bg-primary/10 text-primary mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { size: 20 }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-extrabold tracking-tight leading-snug", children: r.title }),
      r.body && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-sm text-muted-foreground leading-relaxed", children: r.body })
    ] }, r.title)) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "border-t border-border py-20 px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl md:text-4xl font-extrabold tracking-tighter mb-6 text-balance", children: "See the work behind the recognition." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-center gap-3 flex-wrap", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/events", className: "bg-primary text-primary-foreground px-7 py-4 font-mono text-[11px] uppercase tracking-[0.2em] hover:brightness-110 transition-all", children: "Projects →" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/gallery", className: "border border-ink px-7 py-4 font-mono text-[11px] uppercase tracking-[0.2em] hover:bg-ink hover:text-cream transition-all", children: "What we do · Gallery" })
      ] })
    ] }) })
  ] });
}
export {
  AchievementsPage as component
};
