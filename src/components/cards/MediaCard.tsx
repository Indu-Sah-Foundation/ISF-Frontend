import { SketchImage } from "@/components/SketchImage";

/**
 * Vertical stacked card - image on top inside a sketch frame, text content
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
  /** Image URL. Pass an empty string to render no image at all (the card
   *  collapses to title-and-body only — used for board members and
   *  volunteers who haven't uploaded a photo yet). */
  image: string;
  imageVariant?: "default" | "alt";
  aspect?: "4/5" | "4/3" | "16/10" | "1/1";
  title: string;
  eyebrow?: string;
  body?: string;
  footer?: React.ReactNode;
  /** Overlay rendered inside the image frame. */
  badge?: React.ReactNode;
  /** Portrait mode: skip the sketch frame and render the photo as a
   *  clean round avatar. Use for volunteers / team members so a
   *  pre-cropped circular headshot reads as deliberate rather than
   *  a misaligned upload inside a square frame. */
  circular?: boolean;
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
  circular = false,
}: Props) {
  return (
    // No outer card border. In default mode the SketchImage's frame is the
    // only border on the card; in circular mode the round avatar replaces
    // the frame entirely so pre-cropped portraits read clean.
    <article className="flex flex-col h-full items-center text-center">
      {/* No image_url? Render nothing — better than a stock photo or
          gray placeholder for board members / volunteers who haven't
          uploaded a portrait yet. */}
      {image && (circular ? (
        // Clean round avatar — no pencil corners. The square L-marks
        // don't fit a circle's shape, and the cardinal-tick alternative
        // read as too busy, so portraits render bare.
        <div className="relative w-full max-w-[220px] aspect-square">
          <div className="absolute inset-0 overflow-hidden rounded-full bg-muted">
            <img
              src={image}
              alt={title}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
            />
            {badge && <div className="absolute inset-0">{badge}</div>}
          </div>
        </div>
      ) : (
        <SketchImage
          src={image}
          alt={title}
          variant={imageVariant}
          className={`${aspectClass[aspect]} w-full`}
          badge={badge}
          fill
          imgClassName="object-center"
        />
      ))}
      <div className={`pt-4 sm:pt-5 flex flex-col flex-1 ${circular ? "items-center" : ""}`}>
        {eyebrow && (
          <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-primary mb-1.5">
            {eyebrow}
          </p>
        )}
        <h3 className="font-display text-base sm:text-lg font-extrabold tracking-tight text-balance leading-snug">
          {title}
        </h3>
        {body && (
          <p
            className={
              "mt-2 text-xs sm:text-sm text-muted-foreground leading-snug flex-1 " +
              (circular ? "" : "line-clamp-4")
            }
          >
            {body}
          </p>
        )}
        {footer && <div className="mt-3">{footer}</div>}
      </div>
    </article>
  );
}
