import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/SiteShell";
import { SketchImage } from "@/components/SketchImage";
import healthImg from "@/assets/program-health.jpg";
import eduImg from "@/assets/program-education.jpg";
import waterImg from "@/assets/program-water.jpg";
import roboticsImg from "@/assets/program-robotics.jpg";
import womenImg from "@/assets/program-women.jpg";

const teamImgs = [healthImg, eduImg, waterImg, roboticsImg, womenImg];

export const Route = createFileRoute("/volunteers")({
  head: () => ({
    meta: [
      { title: "ISF Volunteers — Indu Sah Foundation" },
      {
        name: "description",
        content:
          "Indu Sah Foundation Volunteers (#ISFVolunteers): the field team in Mahottari and the volunteering and research opportunities open to people worldwide.",
      },
    ],
  }),
  component: VolunteersPage,
});

const team = [
  {
    name: "Mahesh",
    bio: "Mahesh S. is leading the #ISFVolunteers team at Mahottari. He is a Health Assistant by profession and helps the organization know the problems of the remote village in detail so that the approach to solve them would be sustainable.",
  },
  {
    name: "Rupesh",
    bio: "Rupesh S. is another most proactive #ISFVolunteer. He loves to serve the community whenever needed. He has done certification in civil engineering and has a hobby to grow as a public speaker also. He is one of the most enthusiastic and optimistic team members.",
  },
  {
    name: "Santosh",
    bio: "Santosh R. is pursuing a Certification in Dentistry and possesses an extrovert personality. He is helping the organization in building at the local level. He loves to play cricket to stay fit. He radiates positive energy around him, which is his asset.",
  },
  {
    name: "Pappu",
    bio: "Pappu S. is one of the most vibrant #ISFVolunteers. He keeps smiling all the time that helps the team remain enthusiastic even in the most hectic schedule. He is pursuing a career in Pharmacy.",
  },
  {
    name: "Nitesh",
    bio: "Nitesh S. is one of the most hard-working #ISFVolunteers as he enjoys serving his community along with his studies. He has a dream to become prominent healthcare professional.",
  },
];

const volunteerFields = [
  "General health check-ups and treatment",
  "Oral health check-ups and treatment",
  "Oral Cancer Screening, Awareness and Education",
  "Teaching at schools where we provide free education to underprivileged children",
  "Mental Health Evaluation and Psychosocial Counselling",
];

const researchFields = [
  "Research on Oral Health Status of Remote Nepal",
  "Research program on Public Health Status of Remote Nepal",
  "Research on the Educational status of Remote Nepal",
  "Studies on Water and Sanitation of Remote Nepal",
  "Research on Farming",
];

function VolunteersPage() {
  return (
    <SiteShell>
      <header className="px-6 pb-12 max-w-7xl mx-auto">
        <span className="font-mono text-primary text-xs uppercase tracking-[0.2em]">
          ISF Volunteers
        </span>
        <h1 className="font-display text-5xl md:text-7xl font-extrabold tracking-tighter mt-4 text-balance max-w-4xl">
          Indu Sah Foundation <span className="pencil-underline">Volunteers</span>
          <span className="block text-primary mt-3 text-2xl sm:text-3xl md:text-4xl tracking-tight">
            #ISFVolunteers
          </span>
        </h1>
      </header>

      {/* Field team — sketch cards 2 per grid with images */}
      <section className="px-6 max-w-7xl mx-auto pb-20 sm:pb-24">
        <div className="grid sm:grid-cols-2 gap-8 lg:gap-10">
          {team.map((p, i) => (
            <article
              key={p.name}
              className="sketch-border pencil-shadow bg-card overflow-hidden flex flex-col"
            >
              <SketchImage
                src={teamImgs[i % teamImgs.length]}
                alt={p.name}
                variant={i % 2 === 0 ? "default" : "alt"}
                className="aspect-[16/10] w-full"
              />
              <div className="p-6 sm:p-8">
                <h3 className="font-display text-xl sm:text-2xl font-extrabold tracking-tight">
                  {p.name}
                </h3>
                <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                  {p.bio}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Volunteer / Research lists */}
      <section className="border-t border-border bg-secondary/40 px-6 py-20 sm:py-24">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 md:gap-16">
          <div>
            <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-primary">
              A
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight mt-2 mb-6">
              Volunteer with Indu Sah Foundation
            </h2>
            <p className="text-muted-foreground mb-6">
              The field of Volunteering includes the following activities and more:
            </p>
            <ul className="space-y-3">
              {volunteerFields.map((it) => (
                <li
                  key={it}
                  className="font-display text-base sm:text-lg flex items-start gap-3"
                >
                  <span className="mt-2 size-1.5 rounded-full bg-primary shrink-0" />
                  <span>{it}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-primary">
              B
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight mt-2 mb-6">
              Research with Indu Sah Foundation
            </h2>
            <ul className="space-y-3">
              {researchFields.map((it) => (
                <li
                  key={it}
                  className="font-display text-base sm:text-lg flex items-start gap-3"
                >
                  <span className="mt-2 size-1.5 rounded-full bg-primary shrink-0" />
                  <span>{it}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Combined CTA — kindly contact + ready to volunteer */}
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
