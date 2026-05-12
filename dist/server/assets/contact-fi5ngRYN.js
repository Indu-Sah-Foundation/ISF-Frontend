import { r as reactExports, V as jsxRuntimeExports } from "./server-Crqfv4f8.js";
import { S as SiteShell } from "./SiteShell-DYXur6we.js";
import { M as MapPin } from "./map-pin-DsAIt71z.js";
import { c as createLucideIcon } from "./createLucideIcon-DmTh2qWZ.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./router-Dv_1nnSX.js";
import "./Logo-CLEyNjjI.js";
import "./x-21_LCaqm.js";
const __iconNode$2 = [
  ["path", { d: "m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7", key: "132q7q" }],
  ["rect", { x: "2", y: "4", width: "20", height: "16", rx: "2", key: "izxlao" }]
];
const Mail = createLucideIcon("mail", __iconNode$2);
const __iconNode$1 = [
  [
    "path",
    {
      d: "M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384",
      key: "9njp5v"
    }
  ]
];
const Phone = createLucideIcon("phone", __iconNode$1);
const __iconNode = [
  ["path", { d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2", key: "975kel" }],
  ["circle", { cx: "12", cy: "7", r: "4", key: "17ys0d" }]
];
const User = createLucideIcon("user", __iconNode);
function ContactPage() {
  const [email, setEmail] = reactExports.useState("");
  const [message, setMessage] = reactExports.useState("");
  const [sent, setSent] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(SiteShell, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "px-6 pt-20 pb-12 max-w-7xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-primary text-xs uppercase tracking-[0.2em]", children: "Contact" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-5xl md:text-7xl font-extrabold tracking-tighter mt-4 mb-6 text-balance", children: "Let's talk." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "px-6 max-w-7xl mx-auto pb-24 grid md:grid-cols-12 gap-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "md:col-span-4 space-y-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground mb-3", children: "Head Office" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-display text-lg flex items-start gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { size: 18, className: "mt-1 text-primary shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "Loharpatti–2, Mahottari",
              /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
              "Province 2, Nepal"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground mb-3", children: "Branch Office" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-display text-lg flex items-start gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { size: 18, className: "mt-1 text-primary shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Hadigau–5, Kathmandu, Nepal" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground mb-3", children: "Phone" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-display text-lg flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { size: 18, className: "text-primary shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "tel:+9779841256519", className: "hover:text-primary", children: "+977-9841256519" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
              /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "tel:+9779805171027", className: "hover:text-primary", children: "+977-9805171027" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-xs font-mono text-muted-foreground mt-1", children: "WhatsApp / Viber: +977-9805171027" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground mb-3", children: "Email" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-display text-lg flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { size: 18, className: "text-primary shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "mailto:indusahfoundation@gmail.com", className: "underline underline-offset-4 decoration-primary break-all", children: "indusahfoundation@gmail.com" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground mb-3", children: "Founders" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-3 font-display", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(User, { size: 18, className: "mt-1 text-primary shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                "Dr. Vijay Sah",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-xs font-mono text-muted-foreground", children: "President & Executive Director" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(User, { size: 18, className: "mt-1 text-primary shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                "Lal Babu Sah",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-xs font-mono text-muted-foreground", children: "Co-founder" })
              ] })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "md:col-span-8", children: sent ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-secondary p-12 text-center border border-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl font-extrabold mb-3", children: "Thank you." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "We've received your note and will be in touch soon." })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: (e) => {
        e.preventDefault();
        setSent(true);
      }, className: "space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "email", className: "font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground mb-2 block", children: "Your email" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { id: "email", type: "email", required: true, value: email, onChange: (e) => setEmail(e.target.value), className: "w-full py-3 px-4 bg-background border border-border focus:border-primary outline-none font-display" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "message", className: "font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground mb-2 block", children: "Message" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { id: "message", required: true, rows: 8, value: message, onChange: (e) => setMessage(e.target.value), className: "w-full py-3 px-4 bg-background border border-border focus:border-primary outline-none font-display resize-y" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", className: "bg-primary text-primary-foreground px-8 py-4 font-display font-extrabold uppercase tracking-[0.2em] text-xs hover:brightness-110 transition-all", children: "Send message" })
      ] }) })
    ] })
  ] });
}
export {
  ContactPage as component
};
