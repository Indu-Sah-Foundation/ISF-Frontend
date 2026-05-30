import { useRef, useState } from "react";
import { useRouterState } from "@tanstack/react-router";
import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { cn } from "@/lib/utils";

export function SiteShell({
  children,
  fullBleed = false,
  hideNav = false,
  hideFooter = false,
}: {
  children: React.ReactNode;
  /** Set true when the first child is a full-viewport hero (home page). */
  fullBleed?: boolean;
  /** Hide the top public nav entirely. Used on the blog detail page where
   *  a custom "← All blogs" link replaces it. */
  hideNav?: boolean;
  /** Hide the global footer. Used on /contact where the page itself
   *  already presents all the office / email info; rendering the footer
   *  on top would duplicate the same content twice in one viewport. */
  hideFooter?: boolean;
}) {
  const isHome = useRouterState({ select: (s) => s.location.pathname === "/" });
  const [navCollapsed, setNavCollapsed] = useState(false);
  const lastY = useRef(0);
  const onScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const y = e.currentTarget.scrollTop;
    const delta = y - lastY.current;
    if (y < 40) setNavCollapsed(false);
    else if (delta > 6) setNavCollapsed(true);
    else if (delta < -6) setNavCollapsed(false);
    lastY.current = y;
  };

  if (isHome || fullBleed) {
    return (
      <div className="min-h-screen flex flex-col">
        {!hideNav && <Nav />}
        <main className={cn("flex-1", hideNav && "pt-6")}>{children}</main>
        {!hideFooter && <Footer />}
      </div>
    );
  }

  // Inner pages: APP-SHELL. The nav is a non-overlapping top row; only the
  // region below it scrolls. Scrolling down collapses the nav (content fills
  // the space); scrolling up expands it (content is pushed back down). The
  // nav never covers content at any window size.
  return (
    <div className="h-dvh flex flex-col overflow-hidden">
      {!hideNav && <Nav collapsed={navCollapsed} />}
      <div
        className="flex-1 overflow-y-auto overflow-x-hidden"
        onScroll={onScroll}
      >
        <main className={cn(hideNav && "pt-6")}>{children}</main>
        {!hideFooter && <Footer />}
      </div>
    </div>
  );
}
