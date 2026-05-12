import { V as jsxRuntimeExports } from "./server-cqlUrkpC.js";
import { L as Link } from "./router-Dff4uBNA.js";
import { u as useQuery, a as api } from "./api-CN7HS6fA.js";
import { c as createLucideIcon, S as SiteShell } from "./SiteShell-DYoRl1dq.js";
import { h as healthImg, r as roboticsImg, e as eduImg } from "./program-education-Cq8pBwtq.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
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
const programs = [{
  num: "01",
  title: "ISF SMILE",
  desc: "Oral healthcare project educating and treating dental patients across underserved communities in Nepal — over 3,000 patients served free of cost.",
  img: healthImg
}, {
  num: "02",
  title: "ISF Robotics",
  desc: "Hands-on robotics and engineering education to ignite curiosity, creativity, and STEM potential in children from impoverished communities.",
  img: roboticsImg
}, {
  num: "03",
  title: "ISF EDC",
  desc: "Education and Child Abuse Prevention programs run in partnership with local schools across Mahottari and Province 2.",
  img: eduImg
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
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block font-mono text-[11px] uppercase tracking-[0.25em] text-cream/80 mb-6 border border-cream/30 px-3 py-1.5", children: "Loharpatti, Nepal" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-5xl md:text-7xl lg:text-8xl font-extrabold text-cream tracking-tighter leading-[0.92] mb-10 text-balance", children: [
          "For better health ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", { className: "hidden md:block" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "italic font-light", children: "&" }),
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "pencil-underline", children: "education" }),
          "."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/programs", className: "inline-flex items-center gap-2 bg-primary text-primary-foreground px-7 py-4 font-display font-bold uppercase text-xs tracking-[0.2em] hover:brightness-110 transition-all", children: [
            "Explore projects ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 14 })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/donate", className: "inline-flex items-center gap-2 bg-cream/10 backdrop-blur text-cream border border-cream/30 px-7 py-4 font-display font-bold uppercase text-xs tracking-[0.2em] hover:bg-cream/20 transition-all", children: "Donate" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-24 md:py-32 px-6 max-w-7xl mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-12 gap-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "md:col-span-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-primary text-xs font-medium uppercase tracking-[0.2em]", children: "Our Commitment" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "md:col-span-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-display text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight leading-[1.15] text-pretty", children: [
        "Indu Sah Foundation is a non-profit, non-political, non-religious organization based 250km south of Kathmandu. Our core mission is to help underprivileged children for",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary italic", children: "better health and education." })
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "border-y border-border py-16 bg-secondary/40", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-3 gap-8", children: [{
      v: "3,000+",
      l: "Dental Patients Served"
    }, {
      v: "6+",
      l: "Years on the Ground"
    }, {
      v: "100%",
      l: "Local Leadership"
    }].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-5xl md:text-6xl font-extrabold tracking-tighter", children: s.v }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-[11px] uppercase text-muted-foreground tracking-[0.18em]", children: s.l })
    ] }, s.l)) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "py-24 md:py-32 px-6 max-w-7xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-16 flex items-end justify-between gap-6 flex-wrap", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-primary text-xs font-medium uppercase tracking-[0.2em] mb-3 block", children: "Our Work" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-4xl md:text-5xl font-extrabold tracking-tighter", children: [
            "Active ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "pencil-underline", children: "programs" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/programs", className: "font-mono text-xs uppercase underline underline-offset-4 decoration-primary inline-flex items-center gap-1.5", children: [
          "View all ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { size: 14 })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-8", children: programs.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "group cursor-pointer animate-reveal flex flex-col overflow-hidden bg-card sketch-border pencil-shadow transition-transform hover:-translate-y-1", style: {
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
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-primary text-xs font-medium uppercase tracking-[0.2em] mb-3 block", children: "Recent" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-4xl md:text-5xl font-extrabold tracking-tighter text-balance", children: "Letters from the foundation" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/stories", className: "font-mono text-xs uppercase underline underline-offset-4 decoration-primary inline-flex items-center gap-1.5", children: [
          "Read more ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { size: 14 })
        ] })
      ] }),
      articles.isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-3 gap-8", children: [0, 1, 2].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-48 bg-muted animate-pulse rounded" }, i)) }),
      articles.isError && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-mono text-sm", children: "Stories are temporarily unavailable. Check back soon." }),
      articles.data && articles.data.items.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "No stories published yet." }),
      articles.data && articles.data.items.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-3 gap-8", children: articles.data.items.map((a, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/stories/$slug", params: {
        slug: a.slug
      }, className: "group block border-t border-ink pt-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground", children: [
          "Story · ",
          String(i + 1).padStart(2, "0")
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-2xl font-extrabold tracking-tight mt-3 mb-3 group-hover:text-primary transition-colors text-balance", children: a.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: a.published_at ? new Date(a.published_at).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric"
        }) : "Draft" })
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
