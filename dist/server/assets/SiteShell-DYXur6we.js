import { r as reactExports, V as jsxRuntimeExports } from "./server-Crqfv4f8.js";
import { L as Link } from "./router-Dv_1nnSX.js";
import { L as Logo } from "./Logo-CLEyNjjI.js";
import { X } from "./x-21_LCaqm.js";
import { c as createLucideIcon } from "./createLucideIcon-DmTh2qWZ.js";
const __iconNode$3 = [
  [
    "path",
    { d: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z", key: "1jg4f8" }
  ]
];
const Facebook = createLucideIcon("facebook", __iconNode$3);
const __iconNode$2 = [
  ["rect", { width: "20", height: "20", x: "2", y: "2", rx: "5", ry: "5", key: "2e1cvw" }],
  ["path", { d: "M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z", key: "9exkf1" }],
  ["line", { x1: "17.5", x2: "17.51", y1: "6.5", y2: "6.5", key: "r4j83e" }]
];
const Instagram = createLucideIcon("instagram", __iconNode$2);
const __iconNode$1 = [
  ["path", { d: "M4 5h16", key: "1tepv9" }],
  ["path", { d: "M4 12h16", key: "1lakjw" }],
  ["path", { d: "M4 19h16", key: "1djgab" }]
];
const Menu = createLucideIcon("menu", __iconNode$1);
const __iconNode = [
  [
    "path",
    {
      d: "M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z",
      key: "pff0z6"
    }
  ]
];
const Twitter = createLucideIcon("twitter", __iconNode);
const links = [
  { to: "/about", label: "About" },
  { to: "/gallery", label: "Gallery" },
  { to: "/events", label: "Projects" },
  { to: "/stories", label: "Articles" },
  { to: "/volunteers", label: "Volunteers" }
];
function Nav() {
  const [open, setOpen] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "sticky top-0 z-50 w-full bg-background/85 backdrop-blur-md border-b border-border", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-6 h-20 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Logo, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden md:flex items-center gap-10 font-display text-[12px] font-semibold uppercase tracking-[0.18em]", children: [
        links.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: l.to,
            className: "hover:text-primary transition-colors",
            activeProps: { className: "text-primary" },
            children: l.label
          },
          l.to
        )),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: "/donate",
            className: "bg-primary text-primary-foreground px-5 py-2.5 rounded-sm hover:brightness-110 transition-all",
            children: "Donate"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          className: "md:hidden p-2 -mr-2",
          onClick: () => setOpen((v) => !v),
          "aria-label": "Menu",
          children: open ? /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 22 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { size: 22 })
        }
      )
    ] }),
    open && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "md:hidden border-t border-border bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 py-6 flex flex-col gap-5 font-display text-sm font-semibold uppercase tracking-[0.18em]", children: [
      links.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: l.to, onClick: () => setOpen(false), children: l.label }, l.to)),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          to: "/donate",
          onClick: () => setOpen(false),
          className: "bg-primary text-primary-foreground px-5 py-3 rounded-sm text-center",
          children: "Donate"
        }
      )
    ] }) })
  ] });
}
function Footer() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("footer", { className: "border-t border-border mt-32", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-12 gap-10 md:gap-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "md:col-span-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Logo, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        FooterCol,
        {
          className: "md:col-span-3",
          title: "Explore",
          links: [
            { to: "/about", label: "About" },
            { to: "/gallery", label: "Gallery" },
            { to: "/events", label: "Projects" },
            { to: "/stories", label: "Articles" },
            { to: "/achievements", label: "Achievements" },
            { to: "/volunteers", label: "Volunteers" },
            { to: "/contact", label: "Contact" },
            { to: "/donate", label: "Donate" }
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:col-span-4 space-y-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-mono text-[10px] uppercase text-muted-foreground tracking-[0.2em]", children: "Connect" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "a",
          {
            href: "mailto:indusahfoundation@gmail.com",
            className: "hover:text-primary transition-colors",
            children: "indusahfoundation@gmail.com"
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-5 pt-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "a",
            {
              href: "https://www.facebook.com/indusahfoundation/",
              "aria-label": "Facebook",
              target: "_blank",
              rel: "noreferrer",
              className: "text-muted-foreground hover:text-primary transition-colors",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Facebook, { size: 18 })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "a",
            {
              href: "#",
              "aria-label": "Instagram",
              className: "text-muted-foreground hover:text-primary transition-colors",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Instagram, { size: 18 })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "a",
            {
              href: "#",
              "aria-label": "Twitter",
              className: "text-muted-foreground hover:text-primary transition-colors",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Twitter, { size: 18 })
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row gap-2 justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        "© ",
        (/* @__PURE__ */ new Date()).getFullYear(),
        " Indu Sah Foundation"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Loharpatti · Mahottari · Nepal" })
    ] }) })
  ] });
}
function FooterCol({
  title,
  links: links2,
  className
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `space-y-5 ${className ?? ""}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-mono text-[10px] uppercase text-muted-foreground tracking-[0.2em]", children: title }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-3 text-sm", children: links2.map((l, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: l.to, className: "hover:text-primary transition-colors", children: l.label }) }, i)) })
  ] });
}
function SiteShell({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen flex flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Nav, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex-1", children }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
}
export {
  SiteShell as S
};
