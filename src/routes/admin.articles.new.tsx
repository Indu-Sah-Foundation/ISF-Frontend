import { createFileRoute } from "@tanstack/react-router";
import { AdminGuard } from "@/components/AdminGuard";
import { AdminShell } from "@/components/AdminShell";
import { ArticleEditor } from "@/components/ArticleEditor";

export const Route = createFileRoute("/admin/articles/new")({
  head: () => ({
    meta: [
      { title: "New Article · Admin" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: () => (
    <AdminGuard>
      <AdminShell>
        <ArticleEditor mode={{ kind: "create" }} />
      </AdminShell>
    </AdminGuard>
  ),
});
