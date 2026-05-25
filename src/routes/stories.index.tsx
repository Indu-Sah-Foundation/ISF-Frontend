import { createFileRoute, useNavigate, useSearch } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { SiteShell } from "@/components/SiteShell";
import { PersonCard } from "@/components/cards/PersonCard";
import { api, type Article } from "@/lib/api";
import { readThumbnail } from "@/lib/tags";
import eduImg from "@/assets/program-education.jpg";
import healthImg from "@/assets/program-health.jpg";
import roboticsImg from "@/assets/program-robotics.jpg";
import womenImg from "@/assets/program-women.jpg";
import waterImg from "@/assets/program-water.jpg";

const blogImages = [eduImg, healthImg, roboticsImg, womenImg, waterImg];

export const Route = createFileRoute("/stories/")({
  head: () => ({
    meta: [
      { title: "Blogs - Indu Sah Foundation" },
      {
        name: "description",
        content:
          "Updates from Indu Sah Foundation: dental camps, classroom programs, and community health work across Mahottari, Nepal.",
      },
    ],
  }),

  validateSearch: (search: Record<string, any>): { page: number } => {
    const p = Number(search.page);
    return { page: Number.isFinite(p) && p >= 1 ? Math.floor(p) : 1 };
  },
  component: StoriesPage,
});

/** Strip markdown AND HTML AND our metadata comments down to a plain-text
 *  excerpt suitable for a card preview. */
function excerpt(body: string, max = 240) {
  const text = body
    // metadata comments (tags + thumbnail) we ride inside the body
    .replace(/<!--[\s\S]*?-->/g, " ")
    // strip HTML tags entirely (the WYSIWYG saves HTML, not markdown)
    .replace(/<[^>]+>/g, " ")
    // legacy markdown stripping
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/[#>*_`~]+/g, " ")
    // decode the most common HTML entities so we don't surface "&amp;"
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
  return text.length > max ? text.slice(0, max).trimEnd() + "…" : text;
}

/** Pull the first image URL from the body - used as the fallback thumbnail
 *  when the author hasn't set an explicit one. Handles both markdown
 *  `![](url)` from legacy articles AND `<img src="url">` from the new
 *  WYSIWYG editor. */
function firstImage(body: string): string | null {
  const md = body.match(/!\[[^\]]*\]\((https?:\/\/[^)]+)\)/);
  if (md) return md[1];
  const html = body.match(/<img[^>]+src=["'](https?:\/\/[^"']+)["'][^>]*>/i);
  return html ? html[1] : null;
}

function formatDate(iso: string | null) {
  if (!iso) return "Draft";
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function BlogRow({ article, idx }: { article: Article; idx: number }) {
  // Thumbnail priority: explicit admin-uploaded thumbnail → first image
  // found inside the body → local fallback program asset.
  const explicit = readThumbnail(article.body_md);
  const auto = firstImage(article.body_md);
  const fallback = blogImages[idx % blogImages.length];
  const date = formatDate(article.published_at);
  const desc = excerpt(article.body_md, 280);

  return (
    <PersonCard
      density="row"
      to="/stories/$slug"
      params={{ slug: article.slug }}
      image={explicit || auto || fallback}
      imageVariant={idx % 2 === 0 ? "default" : "alt"}
      eyebrow={date}
      title={article.title}
      body={desc}
      footer={
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary inline-flex items-center gap-1.5">
          Read blog →
        </span>
      }
    />
  );
}

const PAGE_SIZE = 10;

function StoriesPage() {
  const { page } = useSearch({ from: "/stories/" });
  const navigate = useNavigate({ from: "/stories/" });
  const setPage = (next: number) =>
    navigate({ search: { page: Math.max(1, next) } });

  const offset = (page - 1) * PAGE_SIZE;

  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: ["articles", "list", page],
    queryFn: () => api.listArticles(PAGE_SIZE, offset),
    retry: 1,
    // Keep the previous page on screen during the refetch so the list
    // doesn't blink to "Loading…" between Prev/Next clicks.
    placeholderData: (prev) => prev,
  });

  const filtered = data?.items ?? [];

  // Page navigation - the backend returns `count` (number of items in the
  // current response). When count < PAGE_SIZE we know there's no next page.
  const hasPrev = page > 1;
  const hasNext = (data?.count ?? 0) === PAGE_SIZE;

  return (
    <SiteShell>
      <header className="px-5 sm:px-6 pb-8 sm:pb-12 max-w-7xl mx-auto border-b border-border">
        <span className="font-mono text-primary text-xs uppercase tracking-[0.2em]">
          Updates from the Foundation
        </span>
        <h1 className="font-display text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tighter mt-3 sm:mt-4 text-balance">
          Our <span className="pencil-underline">work</span>.
        </h1>
        <p className="mt-5 sm:mt-6 max-w-2xl text-sm sm:text-base md:text-lg text-muted-foreground text-pretty">
          Records of our dental camps, classroom programs, and community
          health outreach across Mahottari, written by the team running them.
        </p>
      </header>

      <section className="px-6 max-w-7xl mx-auto py-12 space-y-6 sm:space-y-8">
        {isLoading && (
          <>
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="h-52 bg-muted animate-pulse rounded border-2 border-ink"
              />
            ))}
          </>
        )}

        {isError && (
          <p className="font-mono text-sm text-muted-foreground py-12">
            Blogs couldn't load right now. Please refresh in a moment.
          </p>
        )}

        {data && data.items.length === 0 && (
          <p className="text-muted-foreground py-12">
            No blogs published yet - check back soon.
          </p>
        )}

        {filtered.map((a, i) => (
          <BlogRow key={a.id} article={a} idx={i} />
        ))}

        {/* Pagination - only shown when there's actually more than one
            page (i.e. we're not on page 1 with a partial-page result). */}
        {(hasPrev || hasNext) && (
          <div className="flex items-center justify-between gap-4 pt-8 border-t-2 border-ink/20">
            <button
              type="button"
              onClick={() => setPage(page - 1)}
              disabled={!hasPrev || isFetching}
              className="font-mono text-[11px] uppercase tracking-[0.2em] px-4 py-2 border-2 border-ink/40 hover:border-ink hover:text-foreground text-muted-foreground transition-colors disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-ink/40"
            >
              ← Newer
            </button>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              {isFetching ? "Loading…" : `Page ${page}`}
            </span>
            <button
              type="button"
              onClick={() => setPage(page + 1)}
              disabled={!hasNext || isFetching}
              className="font-mono text-[11px] uppercase tracking-[0.2em] px-4 py-2 border-2 border-ink/40 hover:border-ink hover:text-foreground text-muted-foreground transition-colors disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-ink/40"
            >
              Older →
            </button>
          </div>
        )}
      </section>
    </SiteShell>
  );
}

