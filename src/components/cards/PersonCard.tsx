import { useNavigate } from "@tanstack/react-router";
import { SketchImage } from "@/components/SketchImage";

/**
 * Horizontal split card - image on the left, text on the right.
 *
 * Two visual variants, picked via the `density` prop:
 *
 *  density="feature" (default)  - About-page founder/advisor card
 *  ┌──────────────┬──────────────────────────────────────────┐
 *  │              │  Eyebrow                                 │
 *  │              │  Title (large)                           │
 *  │   image      │  Extras (optional)                       │
 *  │   (4:3)      │  Body (up to 3 lines)                    │
 *  │              │  Footer (motto, chips, …)                │
 *  └──────────────┴──────────────────────────────────────────┘
 *
 *  density="row"  - compact blog list row
 *  ┌────────┬────────────────────────────────────────────────┐
 *  │  img   │  eyebrow      title (1 line)                   │
 *  │  thumb │  body (1 line) · footer                        │
 *  └────────┴────────────────────────────────────────────────┘
 *
 * Both share the sketch-border + pencil-shadow shell so the rhythm stays
 * consistent across the site; only the proportions, padding, and clamp
 * counts change.
 */
type Density = "feature" | "row";

interface Props {
  image: string;
  imageVariant?: "default" | "alt";
  title: string;
  eyebrow?: string;
  extras?: string | string[];
  body?: string;
  footer?: React.ReactNode;
  /** Layout density. "feature" = tall, "row" = compact horizontal bar. */
  density?: Density;
  /** When set, the whole card is clickable and navigates via useNavigate. */
  to?: any;
  params?: any;
  /** Portrait mode: render the photo as a clean round avatar (no sketch
   *  frame). Used for leadership / founders / advisors so the rendered
   *  shape matches the round avatars on /volunteers. */
  circular?: boolean;
}

// Per-density style table - keeps the JSX below readable.
const STYLES: Record<Density, {
  imageCol: string;
  imagePad: string;
  imageAspect: string;
  textCol: string;
  textPad: string;
  title: string;
  body: string;
  bodyMt: string;
  footerMt: string;
}> = {
  feature: {
    // Narrower image column + 1:1 portrait so founder/advisor cards feel
    // editorial rather than half-page billboards. Bio gets more room.
    imageCol: "md:col-span-3 lg:col-span-2",
    imagePad: "",
    imageAspect: "aspect-square",
    textCol: "md:col-span-9 lg:col-span-10",
    textPad: "py-1",
    title: "font-display text-xl sm:text-2xl font-extrabold tracking-tight text-balance",
    // No line-clamp on founder/advisor bios - show every word the admin
    // typed. Image column stays small (col-span-2/3) so the bio still
    // gets most of the row width.
    body: "text-sm sm:text-base text-muted-foreground leading-snug text-pretty",
    bodyMt: "mt-2",
    footerMt: "mt-3",
  },
  row: {
    imageCol: "md:col-span-3",
    imagePad: "",
    // `h-full` so the image stretches to match the text cell height
    // (set by items-stretch on the article).
    imageAspect: "h-full min-h-[8rem]",
    textCol: "md:col-span-9",
    textPad: "py-2",
    title: "font-display text-lg sm:text-xl font-extrabold tracking-tight text-balance line-clamp-1",
    body: "text-sm text-muted-foreground leading-snug text-pretty line-clamp-1",
    bodyMt: "mt-1.5",
    footerMt: "mt-2",
  },
};

export function PersonCard({
  image,
  imageVariant = "default",
  title,
  eyebrow,
  extras,
  body,
  footer,
  density = "feature",
  to,
  params,
  circular = false,
}: Props) {
  const navigate = useNavigate();
  const s = STYLES[density];

  // Imperative navigation - TanStack <Link> won't render when `to` comes
  // through a typed-`any` reusable prop. navigate() always works.
  const clickable = !!to;
  const handleClick = () => {
    if (to) navigate({ to, params });
  };
  const handleKey = (e: React.KeyboardEvent) => {
    if (!to) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      navigate({ to, params });
    }
  };

  return (
    <article
      onClick={clickable ? handleClick : undefined}
      onKeyDown={clickable ? handleKey : undefined}
      role={clickable ? "link" : undefined}
      tabIndex={clickable ? 0 : undefined}
      className={
        // No outer border on the article - the SketchImage's frame is the
        // visual anchor. Doubling them produced a visible bg-card gap
        // between the two curved borders that the user kept calling
        // "white leak". With only one border there's nothing to leak.
        "group grid md:grid-cols-12 gap-6 md:gap-8 transition-colors " +
        (clickable ? "cursor-pointer" : "")
      }
    >
      {/* `self-start` keeps the image at its own size at the top of the
          grid row instead of stretching to match the (longer) text cell
          height. Critical for `feature` density where bios can run many
          lines - without this the square photo blew up to match the bio.
          For `row` density the image still uses `h-full` from imageAspect
          so it shares height with the short text. */}
      {/* No image? Drop the image column entirely so the text spans the
          full row instead of leaving an awkward empty placeholder. */}
      {image && (
        <div className={`${s.imageCol} self-start`}>
          {circular ? (
            // Match the volunteer-page avatar style: bare round photo,
            // no sketch frame, no border. Caps at 220px so it doesn't
            // dominate the row in `feature` density.
            <div className={`${s.imageAspect} w-full max-w-[220px] relative overflow-hidden rounded-full bg-muted`}>
              <img
                src={image}
                alt={title}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          ) : (
            <SketchImage
              src={image}
              alt={title}
              variant={imageVariant}
              className={`${s.imageAspect} w-full`}
              fill
              imgClassName="object-center"
            />
          )}
        </div>
      )}
      <div className={`${s.textCol} ${s.textPad} flex flex-col min-w-0`}>
        {eyebrow && (
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary mb-1.5">
            {eyebrow}
          </p>
        )}
        <h3
          className={
            s.title + " group-hover:text-primary transition-colors"
          }
        >
          {title}
        </h3>
        {extras && (
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground mt-2 mb-3">
            {Array.isArray(extras) ? extras.join(" · ") : extras}
          </p>
        )}
        {body && <p className={`${s.body} ${s.bodyMt}`}>{body}</p>}
        {footer && <div className={s.footerMt}>{footer}</div>}
      </div>
    </article>
  );
}
