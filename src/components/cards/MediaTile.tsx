import { SketchImage } from "@/components/SketchImage";
import { cn } from "@/lib/utils";
import { parseYouTubeId } from "@/lib/youtube";

/**
 * Minimal image-first tile used on Home programs and the Gallery grid.
 *
 *   ┌──────────────────────┐
 *   │                      │
 *   │       image          │ ← SketchImage with optional `badge` overlay
 *   │                      │
 *   └──────────────────────┘
 *     Title (optional)
 *     Caption (optional)
 *     [tag] [tag] (optional)
 *
 * Everything except the image is optional, so the same component covers:
 *   - Home "Active programs" cards (title + caption + numeral badge)
 *   - Gallery tiles (title + tag chips, no caption)
 *   - Bare hero tiles (image only)
 *
 * `aspect` controls the image proportions so gallery sections can mix tall
 * and wide tiles in a masonry-like grid.
 */
interface Props {
  image: string;
  alt?: string;
  imageVariant?: "default" | "alt";
  aspect?: "4/5" | "4/3" | "3/4" | "16/10" | "1/1" | "3/2";
  title?: string;
  caption?: string;
  tags?: string[];
  /** Overlay rendered inside the image (e.g. the "01" numeral on Home). */
  badge?: React.ReactNode;
  /** Tailwind grid span class — let callers stretch a tile across columns/rows. */
  className?: string;
}

const aspectClass: Record<NonNullable<Props["aspect"]>, string> = {
  "4/5": "aspect-[4/5]",
  "4/3": "aspect-[4/3]",
  "3/4": "aspect-[3/4]",
  "16/10": "aspect-[16/10]",
  "1/1": "aspect-square",
  "3/2": "aspect-[3/2]",
};

export function MediaTile({
  image,
  alt,
  imageVariant = "default",
  aspect = "4/5",
  title,
  caption,
  tags,
  badge,
  className,
}: Props) {

  const ytId = parseYouTubeId(image);
  const previewSrc = ytId
    ? `https://i.ytimg.com/vi/${ytId}/hqdefault.jpg`
    : image;

  return (
    <figure className={cn("flex flex-col", className)}>
      <SketchImage
        src={previewSrc}
        alt={alt ?? title ?? ""}
        variant={imageVariant}
        className={`${aspectClass[aspect]} w-full`}
        badge={
          ytId ? (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-ink/80 backdrop-blur-sm flex items-center justify-center">
                <svg
                  viewBox="0 0 24 24"
                  fill="white"
                  className="w-7 h-7 sm:w-8 sm:h-8 translate-x-0.5"
                  aria-hidden
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          ) : (
            badge
          )
        }
        fill
        imgClassName="object-center"
      />
      {(title || caption || (tags && tags.length > 0)) && (
        <figcaption className="pt-5 sm:pt-6">
          {title && (
            <h3 className="font-display text-xl md:text-2xl font-extrabold tracking-tight text-balance">
              {title}
            </h3>
          )}
          {caption && (
            <p className="mt-2 text-sm md:text-base text-muted-foreground leading-relaxed">
              {caption}
            </p>
          )}
          {tags && tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {tags.map((t) => (
                <span
                  key={t}
                  className="font-mono text-[9px] uppercase tracking-[0.2em] bg-ink/5 text-ink/70 border border-ink/20 px-2 py-0.5"
                >
                  {t}
                </span>
              ))}
            </div>
          )}
        </figcaption>
      )}
    </figure>
  );
}
