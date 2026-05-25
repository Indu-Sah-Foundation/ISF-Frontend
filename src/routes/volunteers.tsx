import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { SiteShell } from "@/components/SiteShell";
import { MediaCard } from "@/components/cards/MediaCard";
import { api, type Volunteer } from "@/lib/api";
import healthImg from "@/assets/program-health.jpg";
import eduImg from "@/assets/program-education.jpg";
import waterImg from "@/assets/program-water.jpg";
import roboticsImg from "@/assets/program-robotics.jpg";
import womenImg from "@/assets/program-women.jpg";

// Fallback portrait pool used only when a volunteer row has no image_url set.
const fallbackImgs = [healthImg, eduImg, waterImg, roboticsImg, womenImg];

export const Route = createFileRoute("/volunteers")({
  head: () => ({
    meta: [
      { title: "ISF Volunteers - Indu Sah Foundation" },
      {
        name: "description",
        content:
          "Indu Sah Foundation Volunteers (#ISFVolunteers): the field team in Mahottari and the volunteering and research opportunities open to people worldwide.",
      },
    ],
  }),
  component: VolunteersPage,
});

function VolunteersPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["volunteers", "public"],
    queryFn: () => api.listVolunteers(),
  });

  const items = data?.items || [];
  const team = items.filter((v) => v.kind === "team");
  const volunteerFields = items.filter((v) => v.kind === "volunteer_field");
  const researchFields = items.filter((v) => v.kind === "research_field");

  return (
    <SiteShell>
      <header className="px-5 sm:px-6 pb-8 sm:pb-12 max-w-7xl mx-auto">
        <span className="font-mono text-primary text-xs uppercase tracking-[0.2em]">
          ISF Volunteers
        </span>
        <h1 className="font-display text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tighter mt-3 sm:mt-4 text-balance max-w-4xl">
          Indu Sah Foundation <span className="pencil-underline">Volunteers</span>
          <span className="block text-primary mt-2 sm:mt-3 text-xl sm:text-2xl md:text-4xl tracking-tight">
            #ISFVolunteers
          </span>
        </h1>
      </header>

      {isLoading && (
        <p className="px-6 max-w-7xl mx-auto text-muted-foreground">Loading…</p>
      )}
      {error && (
        <p className="px-6 max-w-7xl mx-auto text-muted-foreground">
          Couldn't load volunteers: {(error as Error).message}
        </p>
      )}

      {/* Field team cards - small, dense grid. 4 across on lg+, square
          portrait tiles. Bio is intentionally compact here; full bios
          live on each member's profile if we add detail pages later. */}
      {team.length > 0 && (
        <section className="px-6 max-w-7xl mx-auto pb-16 sm:pb-20">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6 lg:gap-8">
            {team.map((p, i) => (
              <MediaCard
                key={p.id}
                image={p.image_url || ""}
                imageVariant={i % 2 === 0 ? "default" : "alt"}
                aspect="1/1"
                title={p.name}
                body={p.bio}
                circular
              />
            ))}
          </div>
        </section>
      )}

      {/* Volunteer / Research field lists */}
      {(volunteerFields.length > 0 || researchFields.length > 0) && (
        <section className="border-t border-border bg-secondary/40 px-6 py-20 sm:py-24">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 md:gap-16">
            {volunteerFields.length > 0 && (
              <FieldList
                eyebrow="A"
                heading="Volunteer with Indu Sah Foundation"
                lede="The field of Volunteering includes the following activities and more:"
                items={volunteerFields}
              />
            )}
            {researchFields.length > 0 && (
              <FieldList
                eyebrow="B"
                heading="Research with Indu Sah Foundation"
                items={researchFields}
              />
            )}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="border-t border-border py-20 sm:py-24 px-6">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="font-display text-3xl md:text-5xl font-extrabold tracking-tighter text-balance">
            Ready to <span className="pencil-underline">volunteer</span>?
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            Indu Sah Foundation welcomes Volunteers from over the world
            interested in providing services to underprivileged children and
            communities. Kindly contact us to experience world-class
            volunteering opportunities.
          </p>
          <div className="pt-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 font-mono text-[11px] uppercase tracking-[0.2em] hover:brightness-110 transition-all"
            >
              Contact us →
            </Link>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}

function FieldList({
  eyebrow,
  heading,
  lede,
  items,
}: {
  eyebrow: string;
  heading: string;
  lede?: string;
  items: Volunteer[];
}) {
  return (
    <div>
      <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-primary">
        {eyebrow}
      </span>
      <h2 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight mt-2 mb-6">
        {heading}
      </h2>
      {lede && <p className="text-muted-foreground mb-6">{lede}</p>}
      <ul className="space-y-3">
        {items.map((it) => (
          <li
            key={it.id}
            className="font-display text-base sm:text-lg flex items-start gap-3"
          >
            <span className="mt-2 size-1.5 rounded-full bg-primary shrink-0" />
            <span>{it.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
