import { V as jsxRuntimeExports } from "./server-Crqfv4f8.js";
import { L as Link } from "./router-Dv_1nnSX.js";
import { S as SiteShell } from "./SiteShell-DYXur6we.js";
import { r as roboticsImg, h as healthImg, e as eduImg, w as waterImg } from "./program-robotics-Bbjrj-hj.js";
import { w as womenImg } from "./program-women-CcB5AfoP.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./Logo-CLEyNjjI.js";
import "./x-21_LCaqm.js";
import "./createLucideIcon-DmTh2qWZ.js";
const programs = [{
  num: "01",
  title: "ISF Robotics",
  img: roboticsImg,
  desc: "Hands-on robotics, engineering design, and programming for children in impoverished areas of Nepal — igniting curiosity, creativity, and STEM potential for brighter futures."
}, {
  num: "02",
  title: "ISF SMILE — Mobile Dental Clinic",
  img: healthImg,
  desc: "Our flagship oral healthcare project. Treats over 3,000 dental patients every year across remote Nepal, from the Terai plains to the Himalayas — all care provided free in a fully-equipped mobile clinic."
}, {
  num: "03",
  title: "ISF Education: Child Abuse Prevention",
  img: eduImg,
  desc: "School-based curriculum on child safety, awareness, and safeguarding — delivered to children, parents, and teachers across Mahottari and Province 2. Over 300 children reached in a single program."
}, {
  num: "04",
  title: "Humanitarian Support — Food & Clothing",
  img: womenImg,
  desc: "Crisis response for marginalized families. 850+ families supported with food and hygiene kits during floods and lockdowns; 517 warm clothing items distributed during cold waves."
}, {
  num: "05",
  title: "Oral Health Education",
  img: waterImg,
  desc: "Free classroom education on oral health, oral cancer awareness, and dental treatment, paired with donated hygiene kits — over 1,500 people reached."
}];
function ProgramsPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(SiteShell, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "px-6 pt-20 pb-16 max-w-7xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-primary text-xs uppercase tracking-[0.2em]", children: "Programs Held" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-5xl md:text-7xl font-extrabold tracking-tighter mt-4 text-balance max-w-4xl", children: "Health, education, and dignity — delivered locally." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "px-6 max-w-7xl mx-auto pb-24 space-y-24", children: programs.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "grid md:grid-cols-12 gap-8 md:gap-12 items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `md:col-span-7 ${i % 2 ? "md:order-2" : ""}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-[4/3] overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: p.img, alt: p.title, loading: "lazy", className: "w-full h-full object-cover" }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:col-span-5 space-y-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-5xl text-primary font-extrabold", children: p.num }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl md:text-4xl font-extrabold tracking-tight", children: p.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-lg leading-relaxed", children: p.desc }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/donate", className: "inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] underline decoration-primary underline-offset-4 pt-2", children: "Support this program →" })
      ] })
    ] }, p.num)) })
  ] });
}
export {
  ProgramsPage as component
};
