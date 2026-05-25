import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { SiteShell } from "@/components/SiteShell";
import { SketchImage } from "@/components/SketchImage";
import { MediaCard } from "@/components/cards/MediaCard";
import { PersonCard } from "@/components/cards/PersonCard";
import { api, type TeamMember, type TeamKind } from "@/lib/api";
import heroImg from "@/assets/front.png";
import eduImg from "@/assets/program-education.jpg";
import healthImg from "@/assets/program-health.jpg";
import waterImg from "@/assets/program-water.jpg";
import roboticsImg from "@/assets/program-robotics.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About - Indu Sah Foundation" },
      {
        name: "description",
        content:
          "Indu Sah Foundation: a Nepal-based non-profit established December 24, 2018 by Lal Sah and Dr. Vijay Sah for the health and education of underprivileged children.",
      },
      { property: "og:title", content: "About - Indu Sah Foundation" },
    ],
  }),
  component: AboutPage,
});

// Fallback portrait pool - used when a team member has no image_url set so
// the cards still look complete during seeding.
const fallbackImgs = [healthImg, eduImg, waterImg, roboticsImg, heroImg];
const pickImg = (i: number) => fallbackImgs[i % fallbackImgs.length];

function AboutPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["team", "public"],
    queryFn: () => api.listTeam(),
  });

  const items = data?.items || [];
  const byKind = (k: TeamKind) => items.filter((m) => m.kind === k);

  return (
    <SiteShell>
      <header className="px-5 sm:px-6 pb-8 sm:pb-12 max-w-5xl mx-auto">
        <span className="font-mono text-primary text-xs uppercase tracking-[0.2em]">
          About Us
        </span>
        <h1 className="font-display text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tighter mt-3 sm:mt-4 text-balance">
          Who <span className="pencil-underline">we are</span>.
        </h1>
      </header>

      <div className="px-6 max-w-7xl mx-auto">
        {/* Hero - fixed tall height instead of an extreme aspect ratio so
            the image is never letterboxed or weirdly cropped. */}
        <SketchImage
          src={heroImg}
          alt="Community in Nepal"
          className="h-[22rem] sm:h-[28rem] md:h-[34rem] w-full"
          loading="eager"
          fill
          imgClassName="object-center"
        />
      </div>

      {/* Mission */}
      <section className="px-6 max-w-3xl mx-auto py-20 sm:py-24 space-y-6 text-base sm:text-lg leading-relaxed text-pretty">
        <h2 className="font-mono text-[11px] uppercase tracking-[0.25em] text-primary">
          Our Mission
        </h2>
        <p>
          Indu Sah Foundation is an emerging non-profit organization established
          on December 24, 2018, registered under section 4 of act 2034 of The
          Government of Nepal, and affiliated with the Social Welfare Council.
          We are based in Loharpatti, Mahottari, Nepal - 250 kilometers south
          of Kathmandu and 7 kilometers west of Janakpur Dham.
        </p>
        <p>
          The organization is non-profit, non-religious, non-political, and
          non-governmental. It works for health, education, livelihood, water,
          sanitation, hygiene, gender equality and social inclusion through
          operation, research, advocacy, and capacity enhancement.
        </p>
        <p className="font-display text-xl sm:text-2xl font-semibold tracking-tight border-l-4 border-primary pl-6 italic">
          The Core Mission of the Indu Sah Foundation is to help underprivileged
          children for better health and education.
        </p>
      </section>

      {/* Local leadership stat */}
      <section className="border-y border-border bg-secondary/40 py-14 px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-baseline gap-4 sm:gap-8 justify-center text-center sm:text-left">
          <div className="font-display text-6xl md:text-7xl font-extrabold tracking-tighter">
            100%
          </div>
          <div className="font-mono text-[11px] uppercase text-muted-foreground tracking-[0.18em] max-w-md">
            Local leadership - the foundation is run by, and for, the
            communities of Mahottari.
          </div>
        </div>
      </section>

      {isLoading && (
        <p className="px-6 max-w-7xl mx-auto py-12 text-muted-foreground">
          Loading team…
        </p>
      )}
      {error && (
        <p className="px-6 max-w-7xl mx-auto py-12 text-muted-foreground">
          Couldn't load team: {(error as Error).message}
        </p>
      )}

      <PeopleSection
        eyebrow="Leadership"
        title="Founders"
        people={byKind("founder")}
      />
      <PeopleSection
        eyebrow="Advisory Board"
        title="International"
        people={byKind("advisor_intl")}
        tone="alt"
        imgOffset={2}
      />
      <PeopleSection
        eyebrow="Advisory Board"
        title="National"
        people={byKind("advisor_nat")}
      />

      {/* Board Members - 2 per row using MediaCard */}
      {byKind("board").length > 0 && (
        <section className="border-t border-border py-20 sm:py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-primary mb-3 block">
              Governance
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-extrabold tracking-tight mb-12">
              Board Members
            </h2>
            <div className="grid sm:grid-cols-2 gap-8 lg:gap-10">
              {byKind("board").map((b, i) => (
                <MediaCard
                  key={b.id}
                  image={b.image_url || ""}
                  imageVariant={i % 2 === 0 ? "default" : "alt"}
                  aspect="1/1"
                  title={b.name}
                  eyebrow={b.role}
                  circular
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </SiteShell>
  );
}

function PeopleSection({
  eyebrow,
  title,
  people,
  tone = "default",
  imgOffset = 0,
}: {
  eyebrow: string;
  title: string;
  people: TeamMember[];
  tone?: "default" | "alt";
  imgOffset?: number;
}) {
  if (people.length === 0) return null;
  return (
    <section
      className={
        "border-t border-border py-20 sm:py-24 px-6 " +
        (tone === "alt" ? "bg-secondary/40" : "")
      }
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-primary">
            {eyebrow}
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-extrabold tracking-tighter mt-3">
            {title}
          </h2>
        </div>

        <div className="space-y-10">
          {people.map((p, i) => (
            <PersonCard
              key={p.id}
              image={p.image_url || ""}
              imageVariant={i % 2 === 0 ? "default" : "alt"}
              title={p.name}
              eyebrow={p.role}
              extras={p.extras}
              body={p.bio}
              footer={
                p.motto ? (
                  <p className="font-display italic text-foreground">"{p.motto}"</p>
                ) : undefined
              }
              circular
            />
          ))}
        </div>
      </div>
    </section>
  );
}
