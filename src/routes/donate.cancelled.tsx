import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/SiteShell";

export const Route = createFileRoute("/donate/cancelled")({
  head: () => ({
    meta: [
      { title: "Donation cancelled - Indu Sah Foundation" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: CancelledPage,
});

function CancelledPage() {
  return (
    <SiteShell>
      <section className="px-6 max-w-3xl mx-auto py-24 sm:py-32 text-center">
        <span className="font-mono text-muted-foreground text-xs uppercase tracking-[0.25em]">
          No charge made
        </span>
        <h1 className="font-display text-4xl md:text-6xl font-extrabold tracking-tighter mt-4 text-balance">
          Your donation was <span className="pencil-underline">cancelled</span>.
        </h1>

        <p className="mt-8 text-base sm:text-lg text-muted-foreground leading-relaxed text-pretty">
          You closed the payment page before it was complete, so nothing was
          charged to your card. If something went wrong on our end, please
          let us know - we're a small team and we read everything.
        </p>

        <div className="mt-12 flex flex-wrap justify-center gap-3">
          <Link
            to="/donate"
            className="bg-primary text-primary-foreground px-7 py-4 font-mono text-[11px] uppercase tracking-[0.2em] hover:brightness-110 transition-all"
          >
            Try again
          </Link>
          <Link
            to="/contact"
            className="border border-ink px-7 py-4 font-mono text-[11px] uppercase tracking-[0.2em] hover:bg-ink hover:text-cream transition-all"
          >
            Contact us
          </Link>
        </div>
      </section>
    </SiteShell>
  );
}
