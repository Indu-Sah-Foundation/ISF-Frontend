import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { AdminGuard } from "@/components/AdminGuard";
import { AdminShell } from "@/components/AdminShell";
import { ArticleEditor } from "@/components/ArticleEditor";
import { api } from "@/lib/api";

export const Route = createFileRoute("/admin/articles/$id")({
  head: () => ({
    meta: [
      { title: "Edit Article · Admin" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: () => (
    <AdminGuard>
      <AdminShell>
        <EditWrapper />
      </AdminShell>
    </AdminGuard>
  ),
});

function EditWrapper() {
  const { id } = Route.useParams();

  // The admin list passes the article ID. Backend get-by-slug requires the
  // slug, so we look it up from the list cache, then re-fetch fresh by slug.
  const list = useQuery({
    queryKey: ["admin-articles"],
    queryFn: () => api.listArticlesAdmin(100, 0),
  });

  const article = list.data?.items.find((a) => a.id === id);

  const fresh = useQuery({
    queryKey: ["article", article?.slug],
    queryFn: () => api.getArticle(article!.slug),
    enabled: !!article?.slug,
  });

  if (list.isLoading || (article && fresh.isLoading)) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="space-y-4">
          <div className="h-12 w-1/2 bg-muted animate-pulse" />
          <div className="h-96 bg-muted animate-pulse mt-8" />
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-32 text-center">
        <h1 className="font-display text-3xl font-extrabold tracking-tighter mb-4">
          Article not found
        </h1>
        <p className="text-muted-foreground">
          It may have been deleted, or this link is wrong.
        </p>
      </div>
    );
  }

  return <ArticleEditor mode={{ kind: "edit", article: fresh.data || article }} />;
}
