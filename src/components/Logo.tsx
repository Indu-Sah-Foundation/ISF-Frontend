import { Link, useRouterState } from "@tanstack/react-router";
import logoMark from "@/assets/isf-logo.png";
import logoHome from "@/assets/isf-home.png";

export function Logo({ compact = false }: { compact?: boolean }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isHome = pathname === "/";

  const src = isHome ? logoHome : logoMark;

  const imgSize = isHome
    ? compact
      ? "h-20 sm:h-24 md:h-28 w-auto object-contain shrink-0 "
      : "h-32 sm:h-36 md:h-40 lg:h-48 xl:h-56 w-auto object-contain shrink-0"
    : compact
      ? "h-20 sm:h-24 md:h-28 w-auto object-contain shrink-0 -my-2"
      : "h-32 sm:h-36 md:h-40 lg:h-48 xl:h-56 w-auto object-contain shrink-0 -my-2";

  const linkClass = isHome
    ? "flex items-center group shrink-0 mt-6"
    : "flex items-center group shrink-0 -mt-2";

  return (
    <Link to="/" className={linkClass} aria-label="Indu Sah Foundation - home">
      <img src={src} alt="Indu Sah Foundation" className={imgSize} />
    </Link>
  );
}
