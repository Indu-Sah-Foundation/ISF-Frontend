import { V as jsxRuntimeExports, r as reactExports, a1 as notFound } from "./server-Crqfv4f8.js";
import { R as Route, L as Link } from "./router-Dv_1nnSX.js";
import { u as useQuery } from "./useQuery-DA2IcacT.js";
import { g } from "./marked.esm-B4UrYOZM.js";
import { S as SiteShell } from "./SiteShell-DYXur6we.js";
import { a as api } from "./api-C6z2MzOX.js";
import { c as createLucideIcon } from "./createLucideIcon-DmTh2qWZ.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./Logo-CLEyNjjI.js";
import "./x-21_LCaqm.js";
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20", key: "13o1zl" }],
  ["path", { d: "M2 12h20", key: "9i4pu4" }]
];
const Globe = createLucideIcon("globe", __iconNode);
const FEATURED = ["en", "es", "fr", "hi", "ne", "ar", "zh-Hans", "pt"];
function LanguagePicker({ value, onChange }) {
  const { data } = useQuery({
    queryKey: ["languages"],
    queryFn: () => api.languages(),
    staleTime: 1e3 * 60 * 60,
    // 1h — language list rarely changes
    retry: 1
  });
  const featured = FEATURED.filter((c) => c !== "en").map((c) => ({ code: c, label: data?.[c]?.nativeName ?? c })).filter((o) => !!o.label);
  const rest = data ? Object.entries(data).filter(([c]) => !FEATURED.includes(c)).map(([c, info]) => ({ code: c, label: info.nativeName })).sort((a, b) => a.label.localeCompare(b.label)) : [];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "inline-flex items-center gap-2 border border-border bg-card px-3 py-2 cursor-pointer hover:border-primary transition-colors", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { size: 14, className: "text-muted-foreground" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "select",
      {
        value,
        onChange: (e) => onChange(e.target.value),
        className: "bg-transparent outline-none font-mono text-[11px] uppercase tracking-[0.15em] cursor-pointer",
        "aria-label": "Translate this story",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Original (English)" }),
          featured.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("optgroup", { label: "Featured", children: featured.map((o) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: o.code, children: o.label }, o.code)) }),
          rest.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("optgroup", { label: "All languages", children: rest.map((o) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: o.code, children: o.label }, o.code)) })
        ]
      }
    )
  ] });
}
function StoryPage() {
  const {
    slug
  } = Route.useParams();
  const [lang, setLang] = reactExports.useState("");
  const {
    data,
    isLoading,
    error
  } = useQuery({
    queryKey: ["article", slug, lang],
    queryFn: async () => {
      try {
        return await api.getArticle(slug, lang || void 0);
      } catch (e) {
        if (e?.status === 404 || String(e?.message).startsWith("404")) {
          throw notFound();
        }
        throw e;
      }
    },
    retry: 1
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(SiteShell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "px-6 pt-16 pb-24 max-w-3xl mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-4 flex-wrap", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/stories", className: "font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground hover:text-primary", children: "← All stories" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(LanguagePicker, { value: lang, onChange: setLang })
    ] }),
    isLoading && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-12 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-12 w-3/4 bg-muted animate-pulse rounded" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-4 w-1/3 bg-muted animate-pulse rounded" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-64 bg-muted animate-pulse rounded mt-8" })
    ] }),
    error && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-12 text-muted-foreground", children: [
      "This story couldn't load: ",
      error.message
    ] }),
    data && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "mt-10 mb-12 border-b border-border pb-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-[11px] uppercase tracking-[0.2em] text-primary", children: [
          data.published_at ? new Date(data.published_at).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric"
          }) : "Draft",
          lang && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            " · ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Translated" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl md:text-6xl font-extrabold tracking-tighter mt-4 leading-[1.05] text-balance", children: data.title })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "prose-article", dangerouslySetInnerHTML: {
        __html: g.parse(data.body_md)
      } })
    ] })
  ] }) });
}
export {
  StoryPage as component
};
