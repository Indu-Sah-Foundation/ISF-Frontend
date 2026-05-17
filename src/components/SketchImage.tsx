import { cn } from "@/lib/utils";

type Variant = "default" | "alt";

/**
 * Reusable framed image with the colored-pencil aesthetic.
 *
 * Two sizing modes:
 *
 *   default (fill={false})  — frame sizes itself to the image's NATURAL
 *                             aspect ratio. The whole image is always
 *                             visible, no crop, no whitespace. Use this
 *                             anywhere you'd rather show the entire
 *                             photo than enforce a uniform card height.
 *
 *   fill={true}             — outer frame is whatever size className
 *                             tells it (typically aspect-[X/Y] or fixed
 *                             h-XX), and the image fills it via
 *                             object-cover (cropping if needed). Use this
 *                             for editorial heroes / banners where the
 *                             frame shape is the design constraint.
 */
export function SketchImage({
  src,
  alt,
  className,
  imgClassName,
  variant = "default",
  badge,
  loading = "lazy",
  width,
  height,
  contained = false,
  fill = false,
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  variant?: Variant;
  badge?: React.ReactNode;
  loading?: "lazy" | "eager";
  width?: number;
  height?: number;
  /** Tuck pencil corners INSIDE the frame so the image sits cleanly
   *  inside a parent card. Also drops the outer pencil-shadow. */
  contained?: boolean;
  /** Force the image to fill the frame via object-cover (with cropping).
   *  Default false → frame adapts to image's natural aspect. */
  fill?: boolean;
}) {
  return (
    <div
      className={cn(
        "sketch-frame group relative bg-card",
        variant === "alt" ? "sketch-border-alt" : "sketch-border",
        contained ? "" : "pencil-shadow",
        "animate-sketch-in",
        className,
      )}
    >
      <span className="sketch-corner sketch-corner--tl" aria-hidden />
      <span className="sketch-corner sketch-corner--tr" aria-hidden />
      <span className="sketch-corner sketch-corner--bl" aria-hidden />
      <span className="sketch-corner sketch-corner--br" aria-hidden />

      {fill ? (
        // FILL mode: frame is whatever size the className says; image
        // fills it via object-cover. Absolute inset-0 wrapper because the
        // frame's height usually comes from aspect-ratio, which makes
        // percent heights resolve to 0 on direct children.
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={src}
            alt={alt}
            loading={loading}
            width={width}
            height={height}
            className={cn(
              "w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]",
              imgClassName,
            )}
          />
          {badge}
        </div>
      ) : (
        // NATURAL mode (default): frame sizes itself to the image's
        // intrinsic aspect ratio so we get neither crop nor letterboxing.
        // The image is a block-level child with width:100% and
        // height:auto — the wrapper then tracks its rendered height.
        <div className="relative overflow-hidden">
          <img
            src={src}
            alt={alt}
            loading={loading}
            width={width}
            height={height}
            className={cn(
              "block w-full h-auto transition-transform duration-700 group-hover:scale-[1.04]",
              imgClassName,
            )}
          />
          {badge}
        </div>
      )}
    </div>
  );
}
