import { createFileRoute, Link } from "@tanstack/react-router";
import { Award } from "lucide-react";
import { SiteShell } from "@/components/SiteShell";

export const Route = createFileRoute("/achievements")({
  head: () => ({
    meta: [
      { title: "Achievements — Indu Sah Foundation" },
      {
        name: "description",
        content:
          "Letters of appreciation and recognition received by Indu Sah Foundation from municipalities and partner organizations across Nepal.",
      },
    ],
  }),
  component: AchievementsPage,
});

// Verbatim from /p/achievements.html on the live site.
const recognitions = [
  {
    title: "Letter of Appreciation from Netrawati Municipality, Dhading, Nepal",
    body: "",
  },
  {
    title: "Letter of Appreciation for the Dental Treatment Camp Project",
    body:
      "The Indu Sah Foundation has received appreciation from the Ganga Jamuna Municipality for its work in the Dental Treatment Camp in Phulakharka, Ganga Jamuna, Dhading, Nepal. The Indu Sah Foundation would like to thank the Ganga Jamuna Municipality for this appreciation and we want to deliver more services to the communities of Ganga Jamuna in the near future.",
  },
  {
    title: "Letter of Recognition from Karmalaya Foundation",
    body: "",
  },
];

function AchievementsPage() {
  return (
    <SiteShell>
      <header className="px-6 pt-20 pb-16 max-w-7xl mx-auto">
        <span className="font-mono text-primary text-xs uppercase tracking-[0.2em]">
          Achievements
        </span>
        <h1 className="font-display text-5xl md:text-7xl font-extrabold tracking-tighter mt-4 text-balance max-w-4xl">
          Recognized by the communities we serve.
        </h1>
      </header>

      <section className="px-6 max-w-7xl mx-auto pb-24">
        <div className="grid md:grid-cols-3 gap-6">
          {recognitions.map((r) => (
            <article
              key={r.title}
              className="border border-border bg-card p-8 flex flex-col"
            >
              <div className="size-10 grid place-items-center bg-primary/10 text-primary mb-6">
                <Award size={20} />
              </div>
              <h3 className="font-display text-lg font-extrabold tracking-tight leading-snug">
                {r.title}
              </h3>
              {r.body && (
                <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                  {r.body}
                </p>
              )}
            </article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-tighter mb-6 text-balance">
            See the work behind the recognition.
          </h2>
          <div className="flex justify-center gap-3 flex-wrap">
            <Link
              to="/events"
              className="bg-primary text-primary-foreground px-7 py-4 font-mono text-[11px] uppercase tracking-[0.2em] hover:brightness-110 transition-all"
            >
              Projects →
            </Link>
            <Link
              to="/gallery"
              className="border border-ink px-7 py-4 font-mono text-[11px] uppercase tracking-[0.2em] hover:bg-ink hover:text-cream transition-all"
            >
              What we do · Gallery
            </Link>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
