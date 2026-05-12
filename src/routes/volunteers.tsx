import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/SiteShell";
import womenImg from "@/assets/program-women.jpg";

export const Route = createFileRoute("/volunteers")({
  head: () => ({
    meta: [
      { title: "ISF Volunteers — Indu Sah Foundation" },
      {
        name: "description",
        content:
          "Indu Sah Foundation Volunteers (#ISFVolunteers): the on-the-ground team in Mahottari and the volunteer & research opportunities open to people worldwide.",
      },
    ],
  }),
  component: VolunteersPage,
});

const team = [
  {
    name: "Mahesh S.",
    role: "Lead — Mahottari volunteer team",
    bio: "Health Assistant who leads the volunteer team at Mahottari and helps identify village problems for sustainable solutions.",
  },
  {
    name: "Rupesh S.",
    role: "Volunteer",
    bio: "Most proactive on the team. Civil engineering certified, with public-speaking aspirations. Known for enthusiasm and optimism.",
  },
  {
    name: "Santosh R.",
    role: "Volunteer",
    bio: "Pursuing Dentistry certification. Extroverted; assists with local building initiatives and plays cricket for fitness.",
  },
  {
    name: "Pappu S.",
    role: "Volunteer",
    bio: "Vibrant, with a consistent positive attitude. Currently studying Pharmacy.",
  },
  {
    name: "Nitesh S.",
    role: "Volunteer",
    bio: "Hardworking; balances volunteering with studies. Aspires toward a healthcare profession.",
  },
];

// Verbatim list from the live site.
const opportunities = [
  "General health check-ups and treatment",
  "Oral health services",
  "Cancer screening awareness",
  "Teaching underprivileged children",
  "Mental health counseling",
];

const research = [
  "Oral health",
  "Public health",
  "Education",
  "Water and sanitation",
  "Farming",
];

function VolunteersPage() {
  return (
    <SiteShell>
      <header className="px-6 pt-20 pb-16 max-w-7xl mx-auto">
        <span className="font-mono text-primary text-xs uppercase tracking-[0.2em]">
          ISF Volunteers
        </span>
        <h1 className="font-display text-5xl md:text-7xl font-extrabold tracking-tighter mt-4 text-balance max-w-4xl">
          Indu Sah Foundation Volunteers
          <span className="block text-primary mt-2 text-3xl md:text-4xl tracking-tight">
            #ISFVolunteers
          </span>
        </h1>
      </header>

      {/* Team */}
      <section className="px-6 max-w-7xl mx-auto pb-24">
        <h2 className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground mb-10">
          Field team · Mahottari, Nepal
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {team.map((p) => (
            <article
              key={p.name}
              className="border border-border bg-card p-8"
            >
              <h3 className="font-display text-xl font-extrabold tracking-tight">
                {p.name}
              </h3>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary mt-1 mb-4">
                {p.role}
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {p.bio}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Visual break */}
      <div className="aspect-[21/8] w-full overflow-hidden">
        <img
          src={womenImg}
          alt="Community in Mahottari"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Opportunities (verbatim from live site) */}
      <section className="px-6 max-w-5xl mx-auto py-24 grid md:grid-cols-2 gap-12">
        <div>
          <h2 className="font-mono text-[11px] uppercase tracking-[0.25em] text-primary mb-6">
            Volunteer opportunities
          </h2>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            ISF welcomes volunteers worldwide for the following activities:
          </p>
          <ul className="space-y-3">
            {opportunities.map((it) => (
              <li
                key={it}
                className="font-display text-lg flex items-start gap-3"
              >
                <span className="text-primary mt-2 size-1.5 rounded-full bg-primary shrink-0" />
                <span>{it}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="font-mono text-[11px] uppercase tracking-[0.25em] text-primary mb-6">
            Research areas
          </h2>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            Research projects in remote Nepal across:
          </p>
          <ul className="space-y-3">
            {research.map((it) => (
              <li
                key={it}
                className="font-display text-lg flex items-start gap-3"
              >
                <span className="text-primary mt-2 size-1.5 rounded-full bg-primary shrink-0" />
                <span>{it}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Contact */}
      <section className="border-t border-border py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-tighter mb-6 text-balance">
            Interested?
          </h2>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-7 py-4 font-mono text-[11px] uppercase tracking-[0.2em] hover:brightness-110 transition-all"
          >
            Contact us →
          </Link>
        </div>
      </section>
    </SiteShell>
  );
}
