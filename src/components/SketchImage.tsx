import { cn } from "@/lib/utils";

type Variant = "default" | "alt";

/**
 * Reusable framed image with the colored-pencil aesthetic:
 * - irregular sketch border
 * - pencil-shadow stack
 * - 4 corner pencil ticks
 * - subtle on-load reveal animation
 *
 * Use everywhere instead of bare <img> for editorial photos.
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
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  variant?: Variant;
  /** optional overlay (e.g. project number) */
  badge?: React.ReactNode;
  loading?: "lazy" | "eager";
  width?: number;
  height?: number;
}) {
  return (
    <div
      className={cn(
        "sketch-frame group relative bg-card",
        variant === "alt" ? "sketch-border-alt" : "sketch-border",
        "pencil-shadow animate-sketch-in",
        className,
      )}
    >
      {/* corner pencil ticks */}
      <span className="sketch-corner sketch-corner--tl" aria-hidden />
      <span className="sketch-corner sketch-corner--tr" aria-hidden />
      <span className="sketch-corner sketch-corner--bl" aria-hidden />
      <span className="sketch-corner sketch-corner--br" aria-hidden />

      <div className="relative overflow-hidden h-full w-full">
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
    </div>
  );
}
