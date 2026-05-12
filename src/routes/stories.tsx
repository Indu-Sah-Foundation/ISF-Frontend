import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { SiteShell } from "@/components/SiteShell";
import { api } from "@/lib/api";

export const Route = createFileRoute("/stories")({
  head: () => ({
    meta: [
      { title: "Letters — Indu Sah Foundation" },
      {
        name: "description",
        content:
          "Letters from the field — dispatches, reflections, and reports from the work of Indu Sah Foundation in Nepal.",
      },
    ],
  }),
  component: StoriesPage,
});

function StoriesPage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["articles", "all"],
    queryFn: () => api.listArticles(50, 0),
    retry: 1,
  });

  return (
    <SiteShell>
      <header className="px-6 pt-16 pb-12 max-w-7xl mx-auto border-b border-border">
        <span className="font-mono text-primary text-xs uppercase tracking-[0.2em]">
          Letters from the Foundation
        </span>
        <h1 className="font-display text-5xl md:text-7xl font-extrabold tracking-tighter mt-4 text-balance">
          From the field.
        </h1>
      </header>

      <section className="px-6 max-w-7xl mx-auto py-12">
        {isLoading && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-64 bg-muted animate-pulse" />
            ))}
          </div>
        )}

        {isError && (
          <p className="font-mono text-sm text-muted-foreground py-12">
            Stories couldn't load right now. Please refresh in a moment.
          </p>
        )}

        {data && data.items.length === 0 && (
          <p className="text-muted-foreground py-12">
            No stories published yet — check back soon.
          </p>
        )}

        {data && data.items.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {data.items.map((a, i) => (
              <Link
                key={a.id}
                to="/stories/$slug"
                params={{ slug: a.slug }}
                className="group block"
              >
                <div className="border-t border-ink pt-5">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    {String(i + 1).padStart(3, "0")} ·{" "}
                    {a.published_at
                      ? new Date(a.published_at).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })
                      : "Draft"}
                  </span>
                  <h2 className="font-display text-2xl md:text-3xl font-extrabold tracking-tight mt-4 mb-3 group-hover:text-primary transition-colors text-balance">
                    {a.title}
                  </h2>
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-primary">
                    Read story →
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </SiteShell>
  );
}
