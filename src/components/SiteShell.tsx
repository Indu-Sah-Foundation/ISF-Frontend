import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { cn } from "@/lib/utils";

export function SiteShell({
  children,
  fullBleed = false,
}: {
  children: React.ReactNode;
  /** Set true when the first child is a full-viewport hero (home page). */
  fullBleed?: boolean;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Nav />
      <main className={cn("flex-1", !fullBleed && "page-top-pad")}>
        {children}
      </main>
      <Footer />
    </div>
  );
}
