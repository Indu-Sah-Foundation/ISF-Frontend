import { V as jsxRuntimeExports } from "./server-Crqfv4f8.js";
import { L as Link } from "./router-Dv_1nnSX.js";
import { u as useQuery } from "./useQuery-DA2IcacT.js";
import { S as SiteShell } from "./SiteShell-DYXur6we.js";
import { a as api } from "./api-C6z2MzOX.js";
import { r as roboticsImg, h as healthImg, e as eduImg, w as waterImg } from "./program-robotics-Bbjrj-hj.js";
import { w as womenImg } from "./program-women-CcB5AfoP.js";
import { c as createLucideIcon } from "./createLucideIcon-DmTh2qWZ.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./Logo-CLEyNjjI.js";
import "./x-21_LCaqm.js";
const __iconNode$1 = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "m12 5 7 7-7 7", key: "xquz4c" }]
];
const ArrowRight = createLucideIcon("arrow-right", __iconNode$1);
const __iconNode = [
  ["path", { d: "M7 7h10v10", key: "1tivn9" }],
  ["path", { d: "M7 17 17 7", key: "1vkiza" }]
];
const ArrowUpRight = createLucideIcon("arrow-up-right", __iconNode);
const heroImg = "/assets/hero-lFF4froF.jpg";
function excerpt(md, max = 180) {
  return (md || "").replace(/^#+\s.*$/gm, "").replace(/!\[[^\]]*\]\([^)]*\)/g, "").replace(/\[([^\]]+)\]\([^)]*\)/g, "$1").replace(/[*_`>]/g, "").replace(/\s+/g, " ").trim().slice(0, max);
}
const programs = [{
  num: "01",
  title: "ISF Robotics",
  desc: "Robotics & STEM for children in impoverished communities.",
  img: roboticsImg
}, {
  num: "02",
  title: "ISF SMILE — Mobile Dental Clinic",
  desc: "Free dental care across remote Nepal — 3,000+ patients/year.",
  img: healthImg
}, {
  num: "03",
  title: "Education: Child Abuse Prevention",
  desc: "Safeguarding & awareness programs in local schools.",
  img: eduImg
}, {
  num: "04",
  title: "Humanitarian Support",
  desc: "Food, clothing, and crisis response for families across Mahottari.",
  img: womenImg
}, {
  num: "05",
  title: "Oral Health Education",
  desc: "Free oral-health classes and hygiene kits for 1,500+ people.",
  img: waterImg
}];
function HomePage() {
  const articles = useQuery({
    queryKey: ["articles", "home"],
    queryFn: () => api.listArticles(3, 0),
    retry: 1
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(SiteShell, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative h-[92vh] min-h-[640px] flex flex-col justify-end p-6 md:p-12 overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: heroImg, alt: "Children in a Nepali classroom", className: "absolute inset-0 w-full h-full object-cover", width: 1920, height: 1280 }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/40 to-ink/20" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 max-w-4xl animate-reveal", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-5xl md:text-7xl lg:text-8xl font-extrabold text-cream tracking-tighter leading-[0.92] mb-10 text-balance", children: [
          "For better health ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", { className: "hidden md:block" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "italic font-light", children: "&" }),
          " education."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/donate", className: "inline-flex items-center gap-2 bg-primary text-primary-foreground px-7 py-4 font-display font-bold uppercase text-xs tracking-[0.2em] hover:brightness-110 transition-all", children: [
            "Support our work ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 14 })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/programs", className: "inline-flex items-center gap-2 bg-cream/10 backdrop-blur text-cream border border-cream/30 px-7 py-4 font-display font-bold uppercase text-xs tracking-[0.2em] hover:bg-cream/20 transition-all", children: "Explore programs" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "border-y border-border py-16 bg-secondary/40", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-3 gap-8", children: [{
      v: "3,000+",
      l: "Dental patients served / year"
    }, {
      v: "1,500+",
      l: "Educated on oral health"
    }, {
      v: "850+",
      l: "Families supported in crises"
    }].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-5xl md:text-6xl font-extrabold tracking-tighter", children: s.v }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-[11px] uppercase text-muted-foreground tracking-[0.18em]", children: s.l })
    ] }, s.l)) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "py-24 md:py-32 px-6 max-w-7xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-16 flex items-end justify-between gap-6 flex-wrap", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-primary text-xs font-medium uppercase tracking-[0.2em] mb-3 block", children: "Our Work" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-4xl md:text-5xl font-extrabold tracking-tighter", children: "Programs held" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/programs", className: "font-mono text-xs uppercase underline underline-offset-4 decoration-primary inline-flex items-center gap-1.5", children: [
          "View all ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { size: 14 })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-6", children: programs.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "group cursor-pointer animate-reveal flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm hover:shadow-lg transition-shadow", style: {
        animationDelay: `${i * 80}ms`
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative overflow-hidden aspect-[4/5]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: p.img, alt: p.title, loading: "lazy", className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-4 left-4 font-mono text-5xl md:text-6xl text-cream/40 font-extrabold mix-blend-overlay", children: p.num })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 flex-1 flex flex-col", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl md:text-2xl font-extrabold mb-2 tracking-tight", children: p.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm md:text-base", children: p.desc })
        ] })
      ] }, p.num)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-24 px-6 bg-secondary/40 border-y border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-12 flex items-end justify-between gap-6 flex-wrap", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-primary text-xs font-medium uppercase tracking-[0.2em] mb-3 block", children: "Latest" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-4xl md:text-5xl font-extrabold tracking-tighter", children: "Articles" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/stories", className: "font-mono text-xs uppercase underline underline-offset-4 decoration-primary inline-flex items-center gap-1.5", children: [
          "All articles ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { size: 14 })
        ] })
      ] }),
      articles.isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-3 gap-8", children: [0, 1, 2].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-48 bg-muted animate-pulse rounded" }, i)) }),
      articles.isError && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-mono text-sm", children: "Stories are temporarily unavailable. Check back soon." }),
      articles.data && articles.data.items.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "No stories published yet." }),
      articles.data && articles.data.items.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-3 gap-8", children: articles.data.items.map((a) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/stories/$slug", params: {
        slug: a.slug
      }, className: "group block border-t border-ink pt-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[11px] uppercase tracking-[0.2em] text-primary", children: a.published_at ? new Date(a.published_at).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric"
        }) : "Draft" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-2xl font-extrabold tracking-tight mt-3 mb-3 group-hover:text-primary transition-colors text-balance", children: a.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground line-clamp-3", children: excerpt(a.body_md) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 font-mono text-[11px] uppercase tracking-[0.2em] text-primary", children: "View details →" })
      ] }, a.id)) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-primary text-primary-foreground py-24 md:py-32", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-6 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-5xl md:text-7xl font-extrabold tracking-tighter mb-8 text-balance", children: "Every child deserves a healthy start." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg md:text-xl text-primary-foreground/85 max-w-xl mx-auto mb-12", children: "Your support builds clinics, fills classrooms, and keeps the next generation of Nepal in school." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/donate", className: "inline-flex items-center gap-2 bg-cream text-primary px-12 py-5 font-display font-extrabold uppercase tracking-[0.18em] text-sm hover:brightness-95 transition-all", children: [
        "Donate now ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 16 })
      ] })
    ] }) })
  ] });
}
export {
  HomePage as component
};
