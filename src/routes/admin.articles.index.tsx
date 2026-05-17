import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus, Pencil, Trash2, ExternalLink } from "lucide-react";
import { AdminGuard } from "@/components/AdminGuard";
import { AdminShell } from "@/components/AdminShell";
import { api } from "@/lib/api";

export const Route = createFileRoute("/admin/articles/")({
  head: () => ({
    meta: [
      { title: "Articles · Admin" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: () => (
    <AdminGuard>
      <AdminShell>
        <AdminArticlesPage />
      </AdminShell>
    </AdminGuard>
  ),
});

function AdminArticlesPage() {
  const qc = useQueryClient();

  const articles = useQuery({
    queryKey: ["admin-articles"],
    queryFn: () => api.listArticlesAdmin(100, 0),
  });

  const del = useMutation({
    mutationFn: (id: string) => api.deleteArticle(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-articles"] }),
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-10 sm:py-12">
      <div className="flex items-end justify-between gap-4 mb-10 flex-wrap">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
            Content
          </span>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tighter mt-2">
            Articles
          </h1>
        </div>
        <Link
          to="/admin/articles/new"
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-3 font-mono text-[11px] uppercase tracking-[0.2em] hover:brightness-110 transition-all"
        >
          <Plus size={14} />
          New article
        </Link>
      </div>

      {articles.isLoading && (
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-20 bg-muted animate-pulse" />
          ))}
        </div>
      )}

      {articles.isError && (
        <div className="border border-destructive/30 bg-destructive/5 p-6">
          <p className="font-mono text-sm text-destructive">
            {(articles.error as Error).message}
          </p>
        </div>
      )}

      {articles.data && articles.data.items.length === 0 && (
        <div className="border border-border p-16 text-center">
          <p className="text-muted-foreground mb-6">No articles yet.</p>
          <Link
            to="/admin/articles/new"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-3 font-mono text-[11px] uppercase tracking-[0.2em]"
          >
            <Plus size={14} /> Write the first one
          </Link>
        </div>
      )}

      {articles.data && articles.data.items.length > 0 && (
        <div className="border border-border bg-card divide-y divide-border">
          {articles.data.items.map((a) => (
            <div
              key={a.id}
              className="flex items-center justify-between gap-4 px-4 sm:px-6 py-4 sm:py-5 hover:bg-muted/50 transition-colors"
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-3 flex-wrap">
                  <h3 className="font-display font-bold text-base sm:text-lg truncate">
                    {a.title}
                  </h3>
                  <StatusBadge published={!!a.published_at} />
                </div>
                <div className="mt-1 flex items-center gap-3 sm:gap-4 text-xs text-muted-foreground font-mono flex-wrap">
                  <span>/{a.slug}</span>
                  <span className="hidden sm:inline">·</span>
                  <span>
                    {new Date(a.updated_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1 sm:gap-3 shrink-0">
                {a.published_at && (
                  <a
                    href={`/stories/${a.slug}`}
                    target="_blank"
                    rel="noreferrer"
                    title="View public page"
                    className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <ExternalLink size={16} />
                  </a>
                )}
                <Link
                  to="/admin/articles/$id"
                  params={{ id: a.id }}
                  title="Edit"
                  className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Pencil size={16} />
                </Link>
                <button
                  onClick={() => {
                    if (confirm(`Delete "${a.title}"? This can't be undone.`))
                      del.mutate(a.id);
                  }}
                  disabled={del.isPending}
                  title="Delete"
                  className="p-2 text-muted-foreground hover:text-destructive transition-colors disabled:opacity-50"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function StatusBadge({ published }: { published: boolean }) {
  return (
    <span
      className={`inline-block font-mono text-[9px] uppercase tracking-[0.2em] px-2 py-1 ${
        published
          ? "bg-primary/10 text-primary"
          : "bg-muted text-muted-foreground"
      }`}
    >
      {published ? "Published" : "Draft"}
    </span>
  );
}
