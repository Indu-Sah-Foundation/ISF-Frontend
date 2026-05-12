import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
import { SiteShell } from "@/components/SiteShell";

export const Route = createFileRoute("/donate/thanks")({
  head: () => ({
    meta: [
      { title: "Thank you — Indu Sah Foundation" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ThanksPage,
  validateSearch: (search) =>
    ({ session_id: typeof search.session_id === "string" ? search.session_id : "" }),
});

function ThanksPage() {
  const { session_id } = Route.useSearch();

  return (
    <SiteShell>
      <section className="px-6 pt-32 pb-24 max-w-3xl mx-auto text-center">
        <div className="inline-flex items-center justify-center size-16 rounded-full bg-primary/10 text-primary mb-8">
          <CheckCircle2 size={32} />
        </div>
        <span className="font-mono text-primary text-xs uppercase tracking-[0.2em]">
          Donation Received
        </span>
        <h1 className="font-display text-5xl md:text-7xl font-extrabold tracking-tighter mt-4 mb-6 text-balance">
          Thank you.
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto leading-relaxed">
          Your gift will fund clinics, classrooms, and clean water in Mahottari.
          A receipt is on its way to your inbox.
        </p>

        {session_id && (
          <p className="mt-10 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            Reference · {session_id.slice(0, 24)}…
          </p>
        )}

        <div className="mt-12 flex gap-4 justify-center flex-wrap">
          <Link
            to="/stories"
            className="bg-primary text-primary-foreground px-6 py-3 font-mono text-[11px] uppercase tracking-[0.2em] hover:brightness-110 transition-all"
          >
            Read our stories
          </Link>
          <Link
            to="/"
            className="border border-border px-6 py-3 font-mono text-[11px] uppercase tracking-[0.2em] hover:border-primary transition-all"
          >
            Back to home
          </Link>
        </div>
      </section>
    </SiteShell>
  );
}
