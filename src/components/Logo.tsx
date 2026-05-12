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
            ? "h-20 sm:h-24 md:h-28 w-auto object-contain shrink-0"
            : "h-32 sm:h-36 md:h-40 lg:h-48 xl:h-56 w-auto object-contain shrink-0"
        }
      />
    </Link>
  );
}
