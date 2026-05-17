import { SketchImage } from "@/components/SketchImage";
import { cn } from "@/lib/utils";

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
  return (
    <figure className={cn("flex flex-col", className)}>
      <SketchImage
        src={image}
        alt={alt ?? title ?? ""}
        variant={imageVariant}
        className={`${aspectClass[aspect]} w-full`}
        badge={badge}
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
