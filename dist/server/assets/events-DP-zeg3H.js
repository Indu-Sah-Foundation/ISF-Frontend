import { V as jsxRuntimeExports } from "./server-Crqfv4f8.js";
import { L as Link } from "./router-Dv_1nnSX.js";
import { S as SiteShell } from "./SiteShell-DYXur6we.js";
import { h as healthImg, w as waterImg, e as eduImg, r as roboticsImg } from "./program-robotics-Bbjrj-hj.js";
import { w as womenImg } from "./program-women-CcB5AfoP.js";
import { c as createLucideIcon } from "./createLucideIcon-DmTh2qWZ.js";
import { M as MapPin } from "./map-pin-DsAIt71z.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./Logo-CLEyNjjI.js";
import "./x-21_LCaqm.js";
const __iconNode$1 = [
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }],
  ["path", { d: "M3 10h18", key: "8toen8" }]
];
const Calendar = createLucideIcon("calendar", __iconNode$1);
const __iconNode = [
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["path", { d: "M16 3.128a4 4 0 0 1 0 7.744", key: "16gr8j" }],
  ["path", { d: "M22 21v-2a4 4 0 0 0-3-3.87", key: "kshegd" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }]
];
const Users = createLucideIcon("users", __iconNode);
const events = [{
  title: "ISF SMILE — Serves 3,000 Dental Patients for Free",
  date: "May 2021 · 15-day camp (incl. travel)",
  location: "Mahottari district · 10 km west of Janakpurdham",
  impact: "3,000 underserved community members including children",
  body: "Mobile dental clinic providing free oral healthcare: screenings, extractions, fluoride applications, oral-health education, and minor surgeries. Staffed by licensed dental surgeons, dental assistants, health assistants, and volunteers.",
  img: healthImg
}, {
  title: "ISF COVID-19 Help",
  date: "June 12, 2021",
  location: "Sukhainiya village, Mahottari district",
  impact: "A whole small village supported with one month of staples",
  body: "During Nepal's second nationwide lockdown, ISF volunteers — partnering with NepalMed — distributed rice, dal, potatoes, salt, oil, and soybeans to families in Sukhainiya.",
  img: waterImg
}, {
  title: "Humanitarian Effort — Cold Wave Distribution",
  date: "Winter 2022",
  location: "Mahottari district, Nepal",
  impact: "120+ families · 517 warm clothing items distributed",
  body: "Emergency winter response in the Terai. Warm clothing distributed to families most affected by cold-wave conditions.",
  img: womenImg
}, {
  title: "ISF Education — Child Abuse Prevention Awareness",
  date: "March 2023",
  location: "Rajbiraj, Nepal",
  impact: "300 children reached",
  body: "Child abuse has been one of the prime issues in Nepal — 8 out of 10 children suffer from different types of abuse. ISF delivered awareness curriculum addressing the issue at the school level.",
  img: eduImg
}, {
  title: "ISF Robotics",
  date: "January 2024",
  location: "Mahottari, Nepal",
  impact: "STEM education for children in impoverished communities",
  body: "Robotics education to provide underprivileged children with curiosity, creativity, and STEM potential — building the foundation for brighter futures in regions where engineering exposure is scarce.",
  img: roboticsImg
}, {
  title: '6th Anniversary — "Your Smile is Our Priority"',
  date: "December 20, 2024",
  location: "Angels School, Janakpur, Nepal",
  impact: "200+ school children",
  body: "On the occasion of its 6th anniversary, Indu Sah Foundation organized an impactful educational dental program at Angels School in Janakpur — bringing together students, families, and ISF volunteers.",
  img: healthImg
}];
function EventsPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(SiteShell, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "px-6 pt-20 pb-16 max-w-7xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-primary text-xs uppercase tracking-[0.2em]", children: "Projects" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-5xl md:text-7xl font-extrabold tracking-tighter mt-4 text-balance max-w-4xl", children: "Camps, distributions, and outreach." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "px-6 max-w-7xl mx-auto pb-24 space-y-20", children: events.map((e, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "grid md:grid-cols-12 gap-8 md:gap-12 items-start", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `md:col-span-6 ${i % 2 ? "md:order-2" : ""}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-[4/3] overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: e.img, alt: e.title, loading: "lazy", className: "w-full h-full object-cover" }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:col-span-6 space-y-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl md:text-4xl font-extrabold tracking-tight text-balance", children: e.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { size: 13, className: "text-primary shrink-0" }),
            e.date
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { size: 13, className: "text-primary shrink-0" }),
            e.location
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { size: 13, className: "text-primary shrink-0 mt-1" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: e.impact })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-base leading-relaxed", children: e.body }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/stories", className: "inline-block font-mono text-[11px] uppercase tracking-[0.2em] underline decoration-primary underline-offset-4 pt-2", children: "Read articles →" })
      ] })
    ] }, e.title)) })
  ] });
}
export {
  EventsPage as component
};
