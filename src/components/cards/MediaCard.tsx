import { SketchImage } from "@/components/SketchImage";

/**
 * Vertical stacked card — image on top inside a sketch frame, text content
 * below in a cream panel with a clear border. Used for:
 *   - About → Board members
 *   - Volunteers → field team
 *   - any "person/thing-with-photo + caption" grid where rows wrap cleanly
 *
 *   ┌──────────────────────┐
 *   │       image          │
 *   ├──────────────────────┤
 *   │  Eyebrow (optional)  │
 *   │  Title               │
 *   │  Body (optional)     │
 *   │  Footer (optional)   │
 *   └──────────────────────┘
 */
interface Props {
  image: string;
  imageVariant?: "default" | "alt";
  aspect?: "4/5" | "4/3" | "16/10" | "1/1";
  title: string;
  eyebrow?: string;
  body?: string;
  footer?: React.ReactNode;
  /** Overlay rendered inside the image frame. */
  badge?: React.ReactNode;
}

const aspectClass: Record<NonNullable<Props["aspect"]>, string> = {
  "4/5": "aspect-[4/5]",
  "4/3": "aspect-[4/3]",
  "16/10": "aspect-[16/10]",
  "1/1": "aspect-square",
};

export function MediaCard({
  image,
  imageVariant = "default",
  aspect = "16/10",
  title,
  eyebrow,
  body,
  footer,
  badge,
}: Props) {
  return (
    // No outer card border — the SketchImage's frame is the only border on
    // the card, matching the new PersonCard / blog row style. Avoids the
    // bg-card gap between two competing sketch borders that used to show
    // up as "white leak".
    <article className="flex flex-col h-full">
      <SketchImage
        src={image}
        alt={title}
        variant={imageVariant}
        className={`${aspectClass[aspect]} w-full`}
        badge={badge}
        fill
        imgClassName="object-center"
      />
      <div className="pt-4 sm:pt-5 flex flex-col flex-1">
        {eyebrow && (
          <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-primary mb-1.5">
            {eyebrow}
          </p>
        )}
        <h3 className="font-display text-base sm:text-lg font-extrabold tracking-tight text-balance leading-snug">
          {title}
        </h3>
        {body && (
          <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-snug flex-1 line-clamp-4">
            {body}
          </p>
        )}
        {footer && <div className="mt-3">{footer}</div>}
      </div>
    </article>
  );
}
