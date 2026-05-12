import { V as jsxRuntimeExports } from "./server-Crqfv4f8.js";
import { u as useQuery } from "./useQuery-DA2IcacT.js";
import { A as AdminGuard, a as AdminShell } from "./AdminShell-D5rKQjlO.js";
import { A as ArticleEditor } from "./ArticleEditor-r4CqCHbL.js";
import { a as api } from "./api-C6z2MzOX.js";
import { b as Route } from "./router-Dv_1nnSX.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./auth-DZM-5HgD.js";
import "./Logo-CLEyNjjI.js";
import "./createLucideIcon-DmTh2qWZ.js";
import "./useMutation-C2_EPMqf.js";
import "./marked.esm-B4UrYOZM.js";
import "./x-21_LCaqm.js";
function EditWrapper() {
  const {
    id
  } = Route.useParams();
  const list = useQuery({
    queryKey: ["admin-articles"],
    queryFn: () => api.listArticlesAdmin(100, 0)
  });
  const article = list.data?.items.find((a) => a.id === id);
  const fresh = useQuery({
    queryKey: ["article", article?.slug],
    queryFn: () => api.getArticle(article.slug),
    enabled: !!article?.slug
  });
  if (list.isLoading || article && fresh.isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-6 py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-12 w-1/2 bg-muted animate-pulse rounded" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-96 bg-muted animate-pulse rounded mt-8" })
    ] }) });
  }
  if (!article) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto px-6 py-32 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-extrabold tracking-tighter mb-4", children: "Article not found" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "It may have been deleted, or this link is wrong." })
    ] });
  }
  if (fresh.data) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(ArticleEditor, { mode: {
      kind: "edit",
      article: fresh.data
    } });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ArticleEditor, { mode: {
    kind: "edit",
    article
  } });
}
const SplitComponent = () => /* @__PURE__ */ jsxRuntimeExports.jsx(AdminGuard, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(AdminShell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(EditWrapper, {}) }) });
export {
  SplitComponent as component
};
