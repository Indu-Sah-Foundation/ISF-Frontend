import { V as jsxRuntimeExports } from "./server-Crqfv4f8.js";
import { u as useQueryClient, L as Link } from "./router-Dv_1nnSX.js";
import { u as useQuery } from "./useQuery-DA2IcacT.js";
import { u as useMutation } from "./useMutation-C2_EPMqf.js";
import { A as AdminGuard, a as AdminShell } from "./AdminShell-D5rKQjlO.js";
import { a as api } from "./api-C6z2MzOX.js";
import { c as createLucideIcon } from "./createLucideIcon-DmTh2qWZ.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./auth-DZM-5HgD.js";
import "./Logo-CLEyNjjI.js";
const __iconNode$3 = [
  ["path", { d: "M15 3h6v6", key: "1q9fwt" }],
  ["path", { d: "M10 14 21 3", key: "gplh6r" }],
  ["path", { d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6", key: "a6xqqp" }]
];
const ExternalLink = createLucideIcon("external-link", __iconNode$3);
const __iconNode$2 = [
  [
    "path",
    {
      d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
      key: "1a8usu"
    }
  ],
  ["path", { d: "m15 5 4 4", key: "1mk7zo" }]
];
const Pencil = createLucideIcon("pencil", __iconNode$2);
const __iconNode$1 = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "M12 5v14", key: "s699le" }]
];
const Plus = createLucideIcon("plus", __iconNode$1);
const __iconNode = [
  ["path", { d: "M10 11v6", key: "nco0om" }],
  ["path", { d: "M14 11v6", key: "outv1u" }],
  ["path", { d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6", key: "miytrc" }],
  ["path", { d: "M3 6h18", key: "d0wm0j" }],
  ["path", { d: "M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2", key: "e791ji" }]
];
const Trash2 = createLucideIcon("trash-2", __iconNode);
function AdminArticlesPage() {
  const qc = useQueryClient();
  const articles = useQuery({
    queryKey: ["admin-articles"],
    queryFn: () => api.listArticlesAdmin(100, 0)
  });
  const del = useMutation({
    mutationFn: (id) => api.deleteArticle(id),
    onSuccess: () => qc.invalidateQueries({
      queryKey: ["admin-articles"]
    })
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AdminShell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-6 py-12", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end justify-between gap-4 mb-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground", children: "Content" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl md:text-5xl font-extrabold tracking-tighter mt-2", children: "Articles" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/admin/articles/new", className: "inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-3 font-mono text-[11px] uppercase tracking-[0.2em] hover:brightness-110 transition-all", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 14 }),
        "New Article"
      ] })
    ] }),
    articles.isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: Array.from({
      length: 4
    }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-20 bg-muted animate-pulse rounded" }, i)) }),
    articles.isError && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border border-destructive/30 bg-destructive/5 p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-sm text-destructive", children: articles.error.message }) }),
    articles.data && articles.data.items.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-border p-16 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-6", children: "No articles yet." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/admin/articles/new", className: "inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-3 font-mono text-[11px] uppercase tracking-[0.2em]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 14 }),
        " Write the first one"
      ] })
    ] }),
    articles.data && articles.data.items.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border border-border bg-card divide-y divide-border", children: articles.data.items.map((a) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-4 px-6 py-5 hover:bg-muted/50 transition-colors", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-lg truncate", children: a.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { published: !!a.published_at })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 flex items-center gap-4 text-xs text-muted-foreground font-mono", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "/",
            a.slug
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "·" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: new Date(a.updated_at).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric"
          }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 shrink-0", children: [
        a.published_at && /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: `/stories/${a.slug}`, target: "_blank", rel: "noreferrer", title: "View public page", className: "p-2 text-muted-foreground hover:text-foreground transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { size: 16 }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin/articles/$id", params: {
          id: a.id
        }, title: "Edit", className: "p-2 text-muted-foreground hover:text-foreground transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { size: 16 }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
          if (confirm(`Delete "${a.title}"? This can't be undone.`)) del.mutate(a.id);
        }, disabled: del.isPending, title: "Delete", className: "p-2 text-muted-foreground hover:text-destructive transition-colors disabled:opacity-50", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 16 }) })
      ] })
    ] }, a.id)) })
  ] }) });
}
function StatusBadge({
  published
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `inline-block font-mono text-[9px] uppercase tracking-[0.2em] px-2 py-1 ${published ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`, children: published ? "Published" : "Draft" });
}
const SplitComponent = () => /* @__PURE__ */ jsxRuntimeExports.jsx(AdminGuard, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(AdminArticlesPage, {}) });
export {
  SplitComponent as component
};
