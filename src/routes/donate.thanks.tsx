import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/SiteShell";
import { Heart } from "lucide-react";

export const Route = createFileRoute("/donate/thanks")({
  head: () => ({
    meta: [
      { title: "Thank you — Indu Sah Foundation" },
      {
        name: "description",
        content:
          "Thank you for your donation to Indu Sah Foundation. Your gift directly funds health and education programs for children in Mahottari, Nepal.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ThanksPage,
});

function ThanksPage() {
  return (
    <SiteShell>
      <section className="px-6 max-w-3xl mx-auto py-24 sm:py-32 text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-8">
          <Heart className="w-10 h-10 text-primary" fill="currentColor" />
        </div>
        <div>
          <span className="font-mono text-primary text-xs uppercase tracking-[0.25em]">
            Donation received
          </span>
        </div>
        <h1 className="font-display text-5xl md:text-7xl font-extrabold tracking-tighter mt-4 text-balance">
          Thank <span className="pencil-underline">you</span>.
        </h1>

        <p className="mt-8 text-base sm:text-lg text-muted-foreground leading-relaxed text-pretty">
          Your gift directly funds dental camps, classroom programs, and
          community health outreach in Mahottari, Nepal. Every dollar shows up
          as toothbrushes, school supplies, mobile clinic fuel, and the
          stipends of volunteers doing the work on the ground.
        </p>

        <p className="mt-6 text-sm text-muted-foreground">
          A receipt has been emailed to you by Stripe. If you don't see it,
          please check your spam folder or{" "}
          <Link to="/contact" className="underline text-primary">
            reach out
          </Link>{" "}
          and we'll resend it.
        </p>

        <div className="mt-12 flex flex-wrap justify-center gap-3">
          <Link
            to="/stories"
            className="bg-primary text-primary-foreground px-7 py-4 font-mono text-[11px] uppercase tracking-[0.2em] hover:brightness-110 transition-all"
          >
            Read what we've been up to →
          </Link>
          <Link
            to="/"
            className="border border-ink px-7 py-4 font-mono text-[11px] uppercase tracking-[0.2em] hover:bg-ink hover:text-cream transition-all"
          >
            Back to home
          </Link>
        </div>
      </section>
    </SiteShell>
  );
}
