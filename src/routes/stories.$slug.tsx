import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { marked } from "marked";
import { SiteShell } from "@/components/SiteShell";
import { api } from "@/lib/api";

export const Route = createFileRoute("/stories/$slug")({
  component: StoryPage,
  notFoundComponent: () => (
    <SiteShell>
      <div className="px-6 py-32 max-w-3xl mx-auto text-center">
        <h1 className="font-display text-5xl font-extrabold tracking-tighter mb-4">
          Story not found
        </h1>
        <p className="text-muted-foreground mb-8">
          This story may have been moved or unpublished.
        </p>
        <Link to="/stories" className="font-mono text-xs uppercase underline">
          ← Back to all stories
        </Link>
      </div>
    </SiteShell>
  ),
});

function StoryPage() {
  const { slug } = Route.useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ["article", slug],
    queryFn: async () => {
      try {
        return await api.getArticle(slug);
      } catch (e: any) {
        if (String(e?.message).startsWith("404")) throw notFound();
        throw e;
      }
    },
    retry: 1,
  });

  return (
    <SiteShell>
      <article className="px-6 pt-16 pb-24 max-w-3xl mx-auto">
        <Link
          to="/stories"
          className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground hover:text-primary"
        >
          ← All stories
        </Link>

        {isLoading && (
          <div className="mt-12 space-y-4">
            <div className="h-12 w-3/4 bg-muted animate-pulse rounded" />
            <div className="h-4 w-1/3 bg-muted animate-pulse rounded" />
            <div className="h-64 bg-muted animate-pulse rounded mt-8" />
          </div>
        )}

        {error && (
          <p className="mt-12 text-muted-foreground">
            This story couldn't load: {(error as Error).message}
          </p>
        )}

        {data && (
          <>
            <header className="mt-10 mb-12 border-b border-border pb-10">
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary">
                {data.published_at
                  ? new Date(data.published_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : "Draft"}
              </span>
              <h1 className="font-display text-4xl md:text-6xl font-extrabold tracking-tighter mt-4 leading-[1.05] text-balance">
                {data.title}
              </h1>
            </header>
            <div
              className="prose-article"
              dangerouslySetInnerHTML={{ __html: marked.parse(data.body_md) as string }}
            />
          </>
        )}
      </article>
    </SiteShell>
  );
}
