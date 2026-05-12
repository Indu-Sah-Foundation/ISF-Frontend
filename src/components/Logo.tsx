import { Link } from "@tanstack/react-router";
import logoMark from "@/assets/isf-logo.png";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link
      to="/"
      className="flex items-center group shrink-0 -my-2"
      aria-label="Indu Sah Foundation — home"
    >
      <img
        src={logoMark}
        alt="Indu Sah Foundation"
        className={
          compact
            ? "h-16 sm:h-20 md:h-24 w-auto object-contain shrink-0"
            : "h-24 sm:h-28 md:h-32 lg:h-36 xl:h-40 w-auto object-contain shrink-0"
        }
      />
    </Link>
  );
}
