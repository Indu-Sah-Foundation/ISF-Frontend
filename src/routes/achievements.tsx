import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Award } from "lucide-react";
import { SiteShell } from "@/components/SiteShell";
import { api, type Achievement } from "@/lib/api";

export const Route = createFileRoute("/achievements")({
  head: () => ({
    meta: [
      { title: "Achievements - Indu Sah Foundation" },
      {
        name: "description",
        content:
          "Letters of appreciation and certificates received by Indu Sah Foundation from municipalities and partner organizations across Nepal.",
      },
    ],
  }),
  component: AchievementsPage,
});

function AchievementsPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["achievements", "public"],
    queryFn: () => api.listAchievements(),
  });

  const items = data?.items || [];

  return (
    <SiteShell>
      <header className="px-5 sm:px-6 pt-10 sm:pt-16 pb-8 sm:pb-12 max-w-7xl mx-auto">
        <span className="font-mono text-primary text-xs uppercase tracking-[0.2em]">
          Achievements
        </span>
        <h1 className="font-display text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tighter mt-3 sm:mt-4 text-balance max-w-4xl">
          <span className="pencil-underline">Recognized</span> by the communities we serve.
        </h1>
      </header>

      <section className="px-6 max-w-7xl mx-auto pb-20 sm:pb-24">
        {isLoading && <p className="text-muted-foreground">Loading…</p>}
        {error && (
          <p className="text-muted-foreground">
            Couldn't load achievements: {(error as Error).message}
          </p>
        )}
        {!isLoading && items.length === 0 && (
          <p className="text-muted-foreground">
            No achievements published yet - check back soon.
          </p>
        )}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {items.map((a) => (
            <CertificateCard key={a.id} achievement={a} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border py-16 sm:py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-tighter mb-6 text-balance">
            See the work behind the recognition.
          </h2>
          <div className="flex justify-center gap-3 flex-wrap">
            <Link
              to="/stories"
              className="bg-primary text-primary-foreground px-7 py-4 font-mono text-[11px] uppercase tracking-[0.2em] hover:brightness-110 transition-all"
            >
              Read our blogs →
            </Link>
            <Link
              to="/gallery"
              className="border border-ink px-7 py-4 font-mono text-[11px] uppercase tracking-[0.2em] hover:bg-ink hover:text-cream transition-all"
            >
              Visit gallery
            </Link>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}

function CertificateCard({ achievement: a }: { achievement: Achievement }) {
  return (
    <article className="flex flex-col">
      {/* "Sketchbook" frame for the certificate - offset accent + cream background */}
      <div className="relative">
        <div
          aria-hidden
          className="absolute inset-0 translate-x-2 translate-y-2 bg-primary/15 border border-primary/30 rounded-sm pointer-events-none"
        />
        <div className="relative aspect-[4/5] bg-cream border border-ink/20 rounded-sm overflow-hidden">
          {a.image_url ? (
            <img
              src={a.image_url}
              alt={`${a.title} - ${a.organization}`}
              loading="lazy"
              className="w-full h-full object-contain p-3"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground">
              <Award className="w-12 h-12 mb-3 opacity-40" />
              <p className="font-mono text-[10px] uppercase tracking-[0.2em]">
                Certificate image pending
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="pt-6 px-1">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary mb-2">
          {a.organization}
          {a.place && ` · ${a.place}`}
        </p>
        <h3 className="font-display text-xl font-extrabold tracking-tight text-balance">
          {a.title}
        </h3>
        {a.body && (
          <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
            {a.body}
          </p>
        )}
      </div>
    </article>
  );
}
