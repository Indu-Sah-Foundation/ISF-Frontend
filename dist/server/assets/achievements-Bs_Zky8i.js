import { V as jsxRuntimeExports } from "./server-cqlUrkpC.js";
import { L as Link } from "./router-Dff4uBNA.js";
import { c as createLucideIcon, S as SiteShell } from "./SiteShell-DYoRl1dq.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
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
  slot: "netrawati",
  title: "Letter of Appreciation",
  org: "Netrawati Dabajong Municipality",
  place: "Dhading, Nepal",
  body: "Awarded for ISF's contribution to free dental treatment camps held in Katunje, Netrawati Dabajong in service of the local community."
}, {
  slot: "ganga-jamuna",
  title: "Letter of Appreciation — Dental Treatment Camp Project",
  org: "Ganga Jamuna Municipality",
  place: "Phulakharka, Dhading, Nepal",
  body: "Recognition for the Dental Treatment Camp delivered to families in Phulakharka, Ganga Jamuna. The Indu Sah Foundation continues to plan further services for the communities of Ganga Jamuna."
}, {
  slot: "karmalaya",
  title: "Letter of Recognition",
  org: "Karmalaya Foundation",
  place: "Nepal",
  body: "Acknowledged for ongoing humanitarian and healthcare work serving underserved communities across remote Nepal."
}];
function AchievementsPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(SiteShell, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "px-6 pt-16 pb-12 max-w-7xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-primary text-xs uppercase tracking-[0.2em]", children: "Achievements" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-5xl md:text-7xl font-extrabold tracking-tighter mt-4 text-balance max-w-4xl", children: "Recognized by the communities we serve." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "px-6 max-w-7xl mx-auto pb-20 sm:pb-24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8", children: recognitions.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx(CertificateCard, { ...r }, r.slot)) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "border-t border-border py-16 sm:py-20 px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl md:text-4xl font-extrabold tracking-tighter mb-6 text-balance", children: "See the work behind the recognition." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-center gap-3 flex-wrap", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/events", className: "bg-primary text-primary-foreground px-7 py-4 font-mono text-[11px] uppercase tracking-[0.2em] hover:brightness-110 transition-all", children: "Projects →" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/gallery", className: "border border-ink px-7 py-4 font-mono text-[11px] uppercase tracking-[0.2em] hover:bg-ink hover:text-cream transition-all", children: "What we do · Gallery" })
      ] })
    ] }) })
  ] });
}
function CertificateCard({
  slot,
  title,
  org,
  place,
  body
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "flex flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "aria-hidden": true, className: "absolute inset-0 translate-x-2 translate-y-2 bg-primary/15 border border-primary/30 rounded-sm pointer-events-none" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-[4/5] bg-cream border border-ink/20 rounded-sm overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: `/certificates/${slot}.jpg`, alt: `${title} — ${org}`, loading: "lazy", className: "w-full h-full object-contain p-3", onError: (e) => {
          const t = e.currentTarget;
          if (t.dataset.tried !== "png") {
            t.dataset.tried = "png";
            t.src = `/certificates/${slot}.png`;
          } else {
            t.style.display = "none";
          }
        } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 -z-10 grid place-items-center px-6 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { size: 36, className: "mx-auto text-primary/70 mb-3" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-sm tracking-tight text-foreground/70", children: "Certificate" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground mt-2", children: [
            "Upload /certificates/",
            slot,
            ".jpg"
          ] })
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground", children: place }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg sm:text-xl font-extrabold tracking-tight mt-1", children: org }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 font-display font-semibold text-foreground/85", children: title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm text-muted-foreground leading-relaxed", children: body })
    ] })
  ] });
}
export {
  AchievementsPage as component
};
