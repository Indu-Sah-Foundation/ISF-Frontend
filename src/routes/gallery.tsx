import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { X } from "lucide-react";
import { SiteShell } from "@/components/SiteShell";
import { MediaTile } from "@/components/cards/MediaTile";
import { api, type GalleryItem, type GallerySize } from "@/lib/api";
import { parseYouTubeId } from "@/lib/youtube";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery - Indu Sah Foundation" },
      {
        name: "description",
        content:
          "Photos from the field - moments captured across Indu Sah Foundation programs in Nepal.",
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
  // XL takes the FULL row width on every breakpoint - a true hero tile.
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

  // The curated tag list from the admin panel. The public page filters
  // image groups against this so deleted tags (and any stray free-text
  // tags written before tags were admin-curated) don't leak through.
  const { data: tagsData } = useQuery({
    queryKey: ["gallery", "tags"],
    queryFn: () => api.listGalleryTags(),
  });
  const allowedTags = useMemo(
    () => (tagsData?.items || []).map((t) => t.name),
    [tagsData],
  );
  const allowedSet = useMemo(() => new Set(allowedTags), [allowedTags]);

  // Group items by tag, but ONLY into buckets that exist in the
  // admin-curated list. An image with multiple tags appears in each
  // bucket it belongs to. An image whose tags are all unrecognized
  // (or untagged entirely) is hidden from the public page — the admin
  // can fix it by editing the image and assigning a current tag.
  const groups = useMemo(() => {
    const map = new Map<string, GalleryItem[]>();
    for (const it of items) {
      for (const t of itemTags(it)) {
        if (!allowedSet.has(t)) continue;
        if (!map.has(t)) map.set(t, []);
        map.get(t)!.push(it);
      }
    }
    // Render in the admin-defined order so tag chips on the public
    // page match the position the admin set in /admin/gallery.
    return allowedTags
      .filter((name) => map.has(name))
      .map((name) => [name, map.get(name)!] as const);
  }, [items, allowedSet, allowedTags]);

  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const scrollTo = (tag: string) => {
    sectionRefs.current[tag]?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Lightbox state — clicking a tile opens a fullscreen modal with the
  // full-size image. Closed via X button, backdrop click, or Escape key.
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null);
  const closeLightbox = useCallback(() => setLightbox(null), []);
  useEffect(() => {
    if (!lightbox) return;
    // Lock body scroll while modal is open.
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [lightbox, closeLightbox]);

  return (
    <SiteShell>
      <header className="px-5 sm:px-6 pt-10 sm:pt-16 pb-8 sm:pb-12 max-w-7xl mx-auto">
        <span className="font-mono text-primary text-xs uppercase tracking-[0.2em]">
          Gallery
        </span>
        <h1 className="font-display text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tighter mt-3 sm:mt-4 text-balance max-w-4xl">
          Photos from our <span className="pencil-underline">programs</span>.
        </h1>
      </header>

      {groups.length > 0 && (
        <div className="border-y border-border">
          {/* Chip nav wraps to multiple rows so long tag names like
              "FREE DENTAL CAMP NETRAWATI, DHADING" stay fully visible
              without horizontal scrolling. Each individual chip still
              uses `whitespace-nowrap` so a single tag never breaks
              across two lines — only the row of chips wraps.
              Not sticky — scrolls away with the rest of the page so it
              doesn't take up viewport real estate while readers browse
              the photo grid. */}
          <div className="max-w-7xl mx-auto px-5 sm:px-6 py-2.5 sm:py-4 flex flex-wrap items-center gap-1.5 sm:gap-2">
            {groups.map(([tag, list]) => (
              <button
                key={tag}
                onClick={() => scrollTo(tag)}
                className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.18em] sm:tracking-[0.2em] px-2 py-1 sm:px-3 sm:py-2 border-2 border-ink/40 hover:border-ink hover:text-foreground text-muted-foreground transition-colors whitespace-nowrap"
              >
                {tag} ({list.length})
              </button>
            ))}
          </div>
        </div>
      )}

      <section className="px-5 sm:px-6 max-w-7xl mx-auto py-8 sm:py-12 lg:py-16">
        {isLoading ? (
          <p className="text-muted-foreground font-mono text-sm">Loading…</p>
        ) : items.length === 0 ? (
          <p className="text-muted-foreground font-mono text-sm">
            The gallery is empty. Admins can add photos from{" "}
            <span className="underline">/admin/gallery</span>.
          </p>
        ) : (
          <div className="space-y-12 sm:space-y-16 lg:space-y-20">
            {groups.map(([tag, list]) => (
              <section
                key={tag}
                ref={(el) => {
                  sectionRefs.current[tag] = el;
                }}
                id={`tag-${tag.toLowerCase()}`}
                className="scroll-mt-24"
              >
                <div className="flex items-end justify-between gap-3 mb-6 sm:mb-8 border-b-2 border-ink pb-3 sm:pb-4 flex-wrap">
                  <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tighter text-balance flex-1 min-w-0">
                    {tag}
                  </h2>
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground shrink-0">
                    {list.length} {list.length === 1 ? "photo" : "photos"}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 auto-rows-auto gap-3 sm:gap-6 lg:gap-8">
                  {list.map((it, i) => {
                    const layout = SIZE_LAYOUT[it.size || "M"];
                    return (
                      <button
                        key={`${tag}-${it.id}`}
                        type="button"
                        onClick={() => setLightbox(it)}
                        aria-label={`View ${it.title || "image"} full size`}
                        className={"gallery-tile cursor-zoom-in block text-left " + layout.span}
                      >
                        <MediaTile
                          image={it.src}
                          alt={it.title}
                          imageVariant={i % 2 === 0 ? "default" : "alt"}
                          aspect={layout.aspect}
                          // The per-image title / caption / tag pills are
                          // intentionally omitted — the section heading
                          // above already names the group, so repeating
                          // it on every tile is visual noise. Title is
                          // still on the <img alt> for screen readers.
                        />
                      </button>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>
        )}
      </section>

      {/* Lightbox modal — fullscreen full-quality view of a single tile.
          Backdrop click and Escape both close it; the X button is for
          touch users who can't easily tap outside the image on phones.
          The inner <img> uses object-contain so the entire photo is
          visible regardless of aspect ratio. */}
      {lightbox && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={lightbox.title || "Gallery image"}
          onClick={closeLightbox}
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/90 backdrop-blur-sm p-4 sm:p-8 animate-in fade-in duration-150"
        >
          <button
            type="button"
            onClick={closeLightbox}
            aria-label="Close"
            className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10 inline-flex items-center justify-center w-10 h-10 rounded-full bg-cream/10 text-cream hover:bg-cream/20 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          {(() => {
            const ytId = parseYouTubeId(lightbox.src);
            if (ytId) {
              return (
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="w-full max-w-5xl aspect-video"
                >
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${ytId}?autoplay=1&rel=0`}
                    title={lightbox.title || "YouTube video"}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full border-0"
                  />
                </div>
              );
            }
            return (
              <img
                src={lightbox.src}
                alt={lightbox.title || ""}
                onClick={(e) => e.stopPropagation()}
                className="max-h-full max-w-full object-contain cursor-zoom-out"
              />
            );
          })()}
          {(lightbox.title || lightbox.caption) && (
            <div
              onClick={(e) => e.stopPropagation()}
              className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 text-center text-cream font-mono text-xs sm:text-sm tracking-wide"
            >
              {lightbox.title && <div className="font-semibold">{lightbox.title}</div>}
              {lightbox.caption && <div className="text-cream/70 mt-0.5">{lightbox.caption}</div>}
            </div>
          )}
        </div>
      )}
    </SiteShell>
  );
}
