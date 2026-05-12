import { V as jsxRuntimeExports } from "./server-Crqfv4f8.js";
import { S as SiteShell } from "./SiteShell-DYXur6we.js";
import { h as healthImg, w as waterImg, e as eduImg, r as roboticsImg } from "./program-robotics-Bbjrj-hj.js";
import { w as womenImg } from "./program-women-CcB5AfoP.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./router-Dv_1nnSX.js";
import "./Logo-CLEyNjjI.js";
import "./x-21_LCaqm.js";
import "./createLucideIcon-DmTh2qWZ.js";
const sections = [{
  heading: "Dental Healthcare Initiatives",
  items: [{
    name: "Free Dental Camp in Netrawati, Dhading",
    img: healthImg
  }, {
    name: "Dental Treatment Camp at Ganga Jamuna",
    img: healthImg
  }, {
    name: "Dental Work Camp in Dhading, Nepal",
    img: healthImg
  }, {
    name: "Oral Health Camp in Mahottari, Nepal",
    img: healthImg
  }, {
    name: "ISF SMILE — Mobile Dental Clinic",
    img: healthImg,
    note: "3,000 dental patients served free / year"
  }]
}, {
  heading: "Preventive Health Programs",
  items: [{
    name: "Hand Washing Technique Training Program",
    img: waterImg,
    note: "Mahottari, Nepal"
  }, {
    name: "Child Abuse Prevention Program",
    img: eduImg
  }]
}, {
  heading: "Pandemic Relief",
  items: [{
    name: "COVID-19 Assistance · 2021",
    img: waterImg,
    note: "Sukhainiya village, Mahottari · rice, dal, potato, salt, oil, soybean"
  }]
}, {
  heading: "Educational Initiatives",
  items: [{
    name: "ISF Robotics",
    img: roboticsImg,
    note: "STEM education for underprivileged children in impoverished areas of Nepal"
  }]
}, {
  heading: "Humanitarian Support",
  items: [{
    name: "Cold Wave Distribution",
    img: womenImg,
    note: "120+ families · 517 warm clothing items"
  }, {
    name: "Food & Clothing for Marginalized Families",
    img: womenImg,
    note: "850+ families supported across Mahottari"
  }]
}];
const regions = ["Dhading District", "Mahottari District", "Rural Nepal communities", "Remote Himalayan regions"];
function GalleryPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(SiteShell, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "px-6 pt-20 pb-16 max-w-7xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-primary text-xs uppercase tracking-[0.2em]", children: "What We Do · Gallery" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-5xl md:text-7xl font-extrabold tracking-tighter mt-4 text-balance max-w-4xl", children: "The work, by the field." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "px-6 max-w-7xl mx-auto pb-24 space-y-20", children: sections.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-mono text-[11px] uppercase tracking-[0.25em] text-primary mb-8", children: s.heading }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-6", children: s.items.map((it) => /* @__PURE__ */ jsxRuntimeExports.jsxs("figure", { className: "border border-border bg-card overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-[4/3] overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: it.img, alt: it.name, loading: "lazy", className: "w-full h-full object-cover" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("figcaption", { className: "p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-extrabold text-lg leading-snug tracking-tight", children: it.name }),
          it.note && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground", children: it.note })
        ] })
      ] }, it.name)) })
    ] }, s.heading)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "border-t border-border bg-secondary/40 py-20 px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-mono text-[11px] uppercase tracking-[0.25em] text-primary mb-8", children: "Geographic coverage" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "grid sm:grid-cols-2 gap-y-3 gap-x-8", children: regions.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "font-display text-xl font-semibold tracking-tight border-l-2 border-primary pl-4", children: r }, r)) })
    ] }) })
  ] });
}
export {
  GalleryPage as component
};
