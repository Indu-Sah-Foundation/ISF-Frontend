import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { SiteShell } from "@/components/SiteShell";
import { MediaTile } from "@/components/cards/MediaTile";
import { api, type GalleryItem, type GallerySize } from "@/lib/api";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Indu Sah Foundation" },
      {
        name: "description",
        content:
          "Photos from the field — moments captured across Indu Sah Foundation programs in Nepal.",
      },
    ],
  }),
  component: GalleryPage,
});

// Per-size layout: aspect ratio + grid span. Admin picks the size on upload.
const SIZE_LAYOUT: Record<GallerySize, { aspect: "1/1" | "4/5" | "4/3" | "3/2"; span: string }> = {
  S:  { aspect: "1/1", span: "" },
  M:  { aspect: "4/5", span: "" },
  L:  { aspect: "4/3", span: "sm:col-span-2" },
  // XL takes the FULL row width on every breakpoint — a true hero tile.
  XL: { aspect: "3/2", span: "col-span-full" },
};

function itemTags(item: GalleryItem): string[] {
  return item.tags && item.tags.length > 0 ? item.tags : [];
}

function GalleryPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["gallery", "public"],
    queryFn: () => api.listGallery(),
  });
  const items = data?.items || [];

  // Group items by tag. An item with multiple tags appears in each group.
  // Items without tags fall into "Untagged" so they're still visible.
  const groups = useMemo(() => {
    const map = new Map<string, GalleryItem[]>();
    for (const it of items) {
      const tags = itemTags(it);
      const buckets = tags.length > 0 ? tags : ["Untagged"];
      for (const t of buckets) {
        if (!map.has(t)) map.set(t, []);
        map.get(t)!.push(it);
      }
    }
    return Array.from(map.entries());
  }, [items]);

  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const scrollTo = (tag: string) => {
    sectionRefs.current[tag]?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <SiteShell>
      <header className="px-6 pt-16 pb-12 max-w-7xl mx-auto">
        <span className="font-mono text-primary text-xs uppercase tracking-[0.2em]">
          Gallery
        </span>
        <h1 className="font-display text-5xl md:text-7xl font-extrabold tracking-tighter mt-4 text-balance max-w-4xl">
          Moments from the <span className="pencil-underline">field</span>.
        </h1>
      </header>

      {groups.length > 0 && (
        <div className="sticky top-0 z-30 bg-background/95 backdrop-blur-md border-y border-border">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-2 overflow-x-auto">
            {groups.map(([tag, list]) => (
              <button
                key={tag}
                onClick={() => scrollTo(tag)}
                className="font-mono text-[10px] uppercase tracking-[0.2em] px-3 py-2 border-2 border-ink/40 hover:border-ink hover:text-foreground text-muted-foreground transition-colors whitespace-nowrap"
              >
                {tag} ({list.length})
              </button>
            ))}
          </div>
        </div>
      )}

      <section className="px-6 max-w-7xl mx-auto py-12 sm:py-16">
        {isLoading ? (
          <p className="text-muted-foreground font-mono text-sm">Loading…</p>
        ) : items.length === 0 ? (
          <p className="text-muted-foreground font-mono text-sm">
            The gallery is empty. Admins can add photos from{" "}
            <span className="underline">/admin/gallery</span>.
          </p>
        ) : (
          <div className="space-y-16 sm:space-y-20">
            {groups.map(([tag, list]) => (
              <section
                key={tag}
                ref={(el) => {
                  sectionRefs.current[tag] = el;
                }}
                id={`tag-${tag.toLowerCase()}`}
                className="scroll-mt-24"
              >
                <div className="flex items-end justify-between gap-4 mb-8 border-b-2 border-ink pb-4">
                  <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tighter">
                    {tag}
                  </h2>
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    {list.length} {list.length === 1 ? "photo" : "photos"}
                  </span>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 auto-rows-auto gap-6 lg:gap-8">
                  {list.map((it, i) => {
                    const layout = SIZE_LAYOUT[it.size || "M"];
                    return (
                      <div
                        key={`${tag}-${it.id}`}
                        className={"gallery-tile " + layout.span}
                      >
                        <MediaTile
                          image={it.src}
                          alt={it.title}
                          imageVariant={i % 2 === 0 ? "default" : "alt"}
                          aspect={layout.aspect}
                          title={it.title}
                          caption={it.caption}
                          tags={itemTags(it)}
                        />
                      </div>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>
        )}
      </section>
    </SiteShell>
  );
}
