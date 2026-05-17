import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { cn } from "@/lib/utils";

export function SiteShell({
  children,
  fullBleed = false,
  hideNav = false,
}: {
  children: React.ReactNode;
  /** Set true when the first child is a full-viewport hero (home page). */
  fullBleed?: boolean;
  /** Hide the top public nav entirely. Used on the blog detail page where
   *  a custom "← All blogs" link replaces it. */
  hideNav?: boolean;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      {!hideNav && <Nav />}
      <main
        className={cn(
          "flex-1",
          !fullBleed && !hideNav && "page-top-pad",
          hideNav && "pt-6",
        )}
      >
        {children}
      </main>
      <Footer />
    </div>
  );
}
