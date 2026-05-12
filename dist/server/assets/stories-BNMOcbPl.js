import { V as jsxRuntimeExports } from "./server-Crqfv4f8.js";
import { L as Link } from "./router-Dv_1nnSX.js";
import { u as useQuery } from "./useQuery-DA2IcacT.js";
import { S as SiteShell } from "./SiteShell-DYXur6we.js";
import { a as api } from "./api-C6z2MzOX.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./Logo-CLEyNjjI.js";
import "./x-21_LCaqm.js";
import "./createLucideIcon-DmTh2qWZ.js";
function storyExcerpt(md, max = 200) {
  return (md || "").replace(/^#+\s.*$/gm, "").replace(/!\[[^\]]*\]\([^)]*\)/g, "").replace(/\[([^\]]+)\]\([^)]*\)/g, "$1").replace(/[*_`>]/g, "").replace(/\s+/g, " ").trim().slice(0, max);
}
function StoriesPage() {
  const {
    data,
    isLoading,
    isError
  } = useQuery({
    queryKey: ["articles", "all"],
    queryFn: () => api.listArticles(50, 0),
    retry: 1
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(SiteShell, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "px-6 pt-20 pb-12 max-w-7xl mx-auto border-b border-border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-primary text-xs uppercase tracking-[0.2em]", children: "Articles" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-5xl md:text-7xl font-extrabold tracking-tighter mt-4 text-balance", children: "From the field." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "px-6 max-w-7xl mx-auto py-12", children: [
      isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12", children: Array.from({
        length: 6
      }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-64 bg-muted animate-pulse" }, i)) }),
      isError && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-sm text-muted-foreground py-12", children: "Stories couldn't load right now. Please refresh in a moment." }),
      data && data.items.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground py-12", children: "No stories published yet — check back soon." }),
      data && data.items.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16", children: data.items.map((a) => /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/stories/$slug", params: {
        slug: a.slug
      }, className: "group block", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "border-t border-ink pt-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("time", { className: "font-mono text-[11px] uppercase tracking-[0.2em] text-primary", children: a.published_at ? new Date(a.published_at).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric"
        }) : "Draft" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl md:text-3xl font-extrabold tracking-tight mt-3 mb-3 group-hover:text-primary transition-colors text-balance", children: a.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground line-clamp-3", children: storyExcerpt(a.body_md) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 font-mono text-[11px] uppercase tracking-[0.18em] text-primary", children: "View details →" })
      ] }) }, a.id)) })
    ] })
  ] });
}
export {
  StoriesPage as component
};
