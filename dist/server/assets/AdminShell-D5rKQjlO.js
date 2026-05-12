import { r as reactExports, V as jsxRuntimeExports, O as useRouter } from "./server-Crqfv4f8.js";
import { N as Navigate, L as Link } from "./router-Dv_1nnSX.js";
import { u as useAuth } from "./auth-DZM-5HgD.js";
import { L as Logo } from "./Logo-CLEyNjjI.js";
import { c as createLucideIcon } from "./createLucideIcon-DmTh2qWZ.js";
const __iconNode = [
  ["path", { d: "m16 17 5-5-5-5", key: "1bji2h" }],
  ["path", { d: "M21 12H9", key: "dn1m92" }],
  ["path", { d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4", key: "1uf3rs" }]
];
const LogOut = createLucideIcon("log-out", __iconNode);
function AdminGuard({ children }) {
  const { isAdmin } = useAuth();
  const [hydrated, setHydrated] = reactExports.useState(false);
  reactExports.useEffect(() => setHydrated(true), []);
  if (!hydrated) return null;
  if (!isAdmin) return /* @__PURE__ */ jsxRuntimeExports.jsx(Navigate, { to: "/admin/login" });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children });
}
const adminLinks = [
  { to: "/admin/articles", label: "Articles" },
  { to: "/admin/donations", label: "Donations" }
];
function AdminShell({ children }) {
  const { claims, logout } = useAuth();
  const router = useRouter();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen flex flex-col bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "sticky top-0 z-50 w-full bg-background/90 backdrop-blur-md border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-6 h-16 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Logo, { compact: true }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground hidden sm:inline", children: "Admin" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden md:flex items-center gap-6 font-mono text-[11px] uppercase tracking-[0.18em]", children: adminLinks.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: l.to,
            className: "text-muted-foreground hover:text-foreground transition-colors",
            activeProps: { className: "text-foreground" },
            children: l.label
          },
          l.to
        )) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
        claims && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline font-mono text-[11px] text-muted-foreground", children: claims.email }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: () => {
              logout();
              router.navigate({ to: "/admin/login" });
            },
            className: "flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground transition-colors",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { size: 14 }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "Sign out" })
            ]
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex-1", children })
  ] });
}
export {
  AdminGuard as A,
  AdminShell as a
};
