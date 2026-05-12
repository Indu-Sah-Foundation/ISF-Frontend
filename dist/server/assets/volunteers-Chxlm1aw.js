import { V as jsxRuntimeExports } from "./server-Crqfv4f8.js";
import { L as Link } from "./router-Dv_1nnSX.js";
import { S as SiteShell } from "./SiteShell-DYXur6we.js";
import { w as womenImg } from "./program-women-CcB5AfoP.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./Logo-CLEyNjjI.js";
import "./x-21_LCaqm.js";
import "./createLucideIcon-DmTh2qWZ.js";
const team = [{
  name: "Mahesh S.",
  role: "Lead — Mahottari volunteer team",
  bio: "Health Assistant who leads the volunteer team at Mahottari and helps identify village problems for sustainable solutions."
}, {
  name: "Rupesh S.",
  role: "Volunteer",
  bio: "Most proactive on the team. Civil engineering certified, with public-speaking aspirations. Known for enthusiasm and optimism."
}, {
  name: "Santosh R.",
  role: "Volunteer",
  bio: "Pursuing Dentistry certification. Extroverted; assists with local building initiatives and plays cricket for fitness."
}, {
  name: "Pappu S.",
  role: "Volunteer",
  bio: "Vibrant, with a consistent positive attitude. Currently studying Pharmacy."
}, {
  name: "Nitesh S.",
  role: "Volunteer",
  bio: "Hardworking; balances volunteering with studies. Aspires toward a healthcare profession."
}];
const opportunities = ["General health check-ups and treatment", "Oral health services", "Cancer screening awareness", "Teaching underprivileged children", "Mental health counseling"];
const research = ["Oral health", "Public health", "Education", "Water and sanitation", "Farming"];
function VolunteersPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(SiteShell, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "px-6 pt-20 pb-16 max-w-7xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-primary text-xs uppercase tracking-[0.2em]", children: "ISF Volunteers" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-5xl md:text-7xl font-extrabold tracking-tighter mt-4 text-balance max-w-4xl", children: [
        "Indu Sah Foundation Volunteers",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-primary mt-2 text-3xl md:text-4xl tracking-tight", children: "#ISFVolunteers" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "px-6 max-w-7xl mx-auto pb-24", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground mb-10", children: "Field team · Mahottari, Nepal" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-6", children: team.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "border border-border bg-card p-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl font-extrabold tracking-tight", children: p.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-[10px] uppercase tracking-[0.2em] text-primary mt-1 mb-4", children: p.role }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: p.bio })
      ] }, p.name)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-[21/8] w-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: womenImg, alt: "Community in Mahottari", className: "w-full h-full object-cover" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "px-6 max-w-5xl mx-auto py-24 grid md:grid-cols-2 gap-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-mono text-[11px] uppercase tracking-[0.25em] text-primary mb-6", children: "Volunteer opportunities" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-8 leading-relaxed", children: "ISF welcomes volunteers worldwide for the following activities:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-3", children: opportunities.map((it) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "font-display text-lg flex items-start gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary mt-2 size-1.5 rounded-full bg-primary shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: it })
        ] }, it)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-mono text-[11px] uppercase tracking-[0.25em] text-primary mb-6", children: "Research areas" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-8 leading-relaxed", children: "Research projects in remote Nepal across:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-3", children: research.map((it) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "font-display text-lg flex items-start gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary mt-2 size-1.5 rounded-full bg-primary shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: it })
        ] }, it)) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "border-t border-border py-20 px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl md:text-4xl font-extrabold tracking-tighter mb-6 text-balance", children: "Interested?" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/contact", className: "inline-flex items-center gap-2 bg-primary text-primary-foreground px-7 py-4 font-mono text-[11px] uppercase tracking-[0.2em] hover:brightness-110 transition-all", children: "Contact us →" })
    ] }) })
  ] });
}
export {
  VolunteersPage as component
};
