import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { api, type Article } from "@/lib/api";
import { AdminShell } from "@/components/AdminShell";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { CreditCard as Edit, Trash2, Plus, ArrowLeft, ExternalLink } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export const Route = createFileRoute("/admin/articles")({
  component: ArticlesPage,
});

function ArticlesPage() {
  const navigate = useNavigate();
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDeletingId, setIsDeletingId] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const ADMIN_PAGE_SIZE = 20;
  const hasPrev = page > 1;
  const [hasNext, setHasNext] = useState(false);

  useEffect(() => {
    loadArticles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const loadArticles = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await api.listAllArticles(ADMIN_PAGE_SIZE, (page - 1) * ADMIN_PAGE_SIZE);
      setArticles(res.items);
      // A full page means there's *potentially* another after — backend
      // doesn't return a total count, so this is the cheapest signal.
      setHasNext(res.count === ADMIN_PAGE_SIZE);
    } catch (e: any) {
      const msg = e?.message || "Failed to load blogs";
      setError(msg);
      if (msg === "Not authenticated") navigate({ to: "/admin/login" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    setIsDeletingId(id);
    try {
      await api.deleteArticle(id);
      setArticles((prev) => prev.filter((a) => a.id !== id));
    } catch (e: any) {
      setError(e?.message || "Delete failed");
    } finally {
      setIsDeletingId(null);
    }
  };

  const handleTogglePublish = async (a: Article) => {
    try {
      const updated = await api.updateArticle(a.id, { publish: !a.published_at });
      setArticles((prev) => prev.map((x) => (x.id === a.id ? updated : x)));
    } catch (e: any) {
      setError(e?.message || "Update failed");
    }
  };

  const formatDate = (d: string | null) =>
    !d
      ? "Draft"
      : new Date(d).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        });

  return (
    <AdminShell>
      <div className="px-4 sm:px-6 lg:px-10 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate({ to: "/admin" })}
              className="flex items-center gap-2 text-muted-foreground hover:text-primary text-sm"
              aria-label="Back to admin"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <h1 className="font-display text-4xl font-extrabold tracking-tighter">
              All Blogs
            </h1>
          </div>
          <Button asChild>
            <Link to="/admin/editor">
              <Plus className="w-4 h-4 mr-2" />
              New Blog
            </Link>
          </Button>
        </div>

        {error && (
          <p className="font-mono text-sm text-destructive mb-6">{error}</p>
        )}

        {isLoading ? (
          <p className="text-muted-foreground">Loading blogs…</p>
        ) : articles.length === 0 ? (
          <Card className="border-2 border-ink pencil-shadow">
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground mb-4">No blogs yet</p>
              <Button asChild>
                <Link to="/admin/editor">Create your first blog</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Card className="border-2 border-ink pencil-shadow">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Slug</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Published</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {articles.map((article) => (
                      <TableRow key={article.id}>
                        <TableCell className="font-medium">{article.title}</TableCell>
                        <TableCell className="font-mono text-sm text-muted-foreground">
                          {article.slug}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={article.published_at ? "default" : "secondary"}
                          >
                            {article.published_at ? "Published" : "Draft"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {formatDate(article.published_at)}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            {article.published_at && (
                              <Button
                                size="sm"
                                variant="ghost"
                                asChild
                                aria-label="View on public site"
                                title="View on public site"
                              >
                                <a
                                  href={`/stories/${article.slug}`}
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  <ExternalLink className="w-4 h-4" />
                                </a>
                              </Button>
                            )}
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleTogglePublish(article)}
                              className="text-xs uppercase tracking-wider"
                            >
                              {article.published_at ? "Unpublish" : "Publish"}
                            </Button>
                            <Button size="sm" variant="ghost" asChild>
                              <Link
                                to="/admin/editor"
                                search={{ slug: article.slug }}
                                aria-label="Edit"
                              >
                                <Edit className="w-4 h-4" />
                              </Link>
                            </Button>

                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  disabled={isDeletingId === article.id}
                                  aria-label="Delete"
                                >
                                  <Trash2 className="w-4 h-4 text-destructive" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogTitle>Delete Blog</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete "{article.title}"?
                                  This action cannot be undone.
                                </AlertDialogDescription>
                                <div className="flex gap-3 justify-end">
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => handleDelete(article.id)}
                                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                  >
                                    Delete
                                  </AlertDialogAction>
                                </div>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        )}

        {(hasPrev || hasNext) && (
          <div className="flex items-center justify-between gap-4 mt-6">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={!hasPrev || isLoading}
            >
              ← Previous
            </Button>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              {isLoading ? "Loading…" : `Page ${page}`}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => p + 1)}
              disabled={!hasNext || isLoading}
            >
              Next →
            </Button>
          </div>
        )}
      </div>
    </AdminShell>
  );
}
