import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/SiteShell";
import roboticsImg from "@/assets/program-robotics.jpg";
import healthImg from "@/assets/program-health.jpg";
import eduImg from "@/assets/program-education.jpg";
import womenImg from "@/assets/program-women.jpg";

export const Route = createFileRoute("/events")({
  head: () => ({
    meta: [
      { title: "Projects — Indu Sah Foundation" },
      {
        name: "description",
        content:
          "Current and upcoming projects of Indu Sah Foundation — ISF Robotics, ISF SMILE Mobile Dental Clinic, and health, education, and hygiene programs for underprivileged communities in Nepal.",
      },
    ],
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
  return (
    <SiteShell>
      <header className="px-6 pt-16 pb-12 max-w-7xl mx-auto">
        <span className="font-mono text-primary text-xs uppercase tracking-[0.2em]">
          Projects
        </span>
        <h1 className="font-display text-5xl md:text-7xl font-extrabold tracking-tighter mt-4 text-balance max-w-4xl">
          Current &amp; upcoming work.
        </h1>
      </header>

      {/* CURRENT — ISF ROBOTICS */}
      <section className="px-6 pb-16 max-w-7xl mx-auto">
        <ProjectHeading label="Current Project" title="ISF Robotics" img={roboticsImg} />
        <div className="grid md:grid-cols-3 gap-10 mt-12">
          <Lede>
            ISF Robotics is the current project to provide underprivileged
            children in impoverished areas of Nepal with education in the form
            of robotics to ignite their curiosity, creativity, and potential
            for brighter futures for themselves and those around them.
          </Lede>
          <div className="md:col-span-2 space-y-10">
            <Block heading="The Vision · We plan to teach them">
              <BulletList
                items={[
                  "Fundamentals of the engineering design process",
                  "Fundamentals of programming",
                  "Solve real-world problems through innovation",
                  "Soft skills that include teamwork, critical thinking, and leadership",
                ]}
              />
            </Block>

            <Block heading="Impact · By introducing STEM and robotics to underprivileged children in Nepal, we hope to">
              <BulletList
                items={[
                  "Inspire future innovators — a generation of curious, creative minds passionate about improving and advancing the world",
                  "Access to Educational Opportunities — quality STEM and robotics education that exposes them to a wide variety of future career paths",
                  "Community development — involving parents and community leaders to strengthen the community and foster innovation and education",
                  "Sustainability — exposing the community to STEM education lays a foundation for educational development",
                  "Gender Equality — encouraging girls, still the least educated population, to pursue STEM and education to break down gender barriers",
                ]}
              />
            </Block>

            <Block heading="The Plan">
              <BulletList
                items={[
                  "Utilize LEGO Spike Prime Robots to provide a simple and effective way for hands-on learning",
                  "Establish FIRST Lego League (FLL) teams in Nepal through the FIRST organization, immersing children in STEM with practical experiences",
                  "Engage them in complex problem-solving through designing, engineering, and programming the Spike Prime robot to complete FLL game-field tasks",
                  "Foster Innovation by challenging them to identify a specific problem in their community and solve it innovatively — then present it to FLL judges",
                ]}
              />
            </Block>
          </div>
        </div>
      </section>

      {/* CURRENT — ISF SMILE */}
      <section className="border-t border-border bg-secondary/40 py-16 sm:py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <ProjectHeading label="Current Project" title="ISF SMILE" img={healthImg} />
          <div className="grid md:grid-cols-3 gap-10 mt-12">
            <Lede>
              ISF SMILE is the current project through which we are committed
              to providing oral healthcare services to 3,000 underserved
              community members, including children. The project is located in
              the Mahottari district of Nepal — 10 km west of Janakpurdham, the
              historic place of Mithila.
            </Lede>
            <div className="md:col-span-2 space-y-10">
              <Block heading="Concept &amp; Execution">
                <p>
                  The project is the concept of Dr. Vijay Sah, the president of
                  Indu Sah Foundation, who has been dreaming of serving his
                  community. ISF SMILE provides all possible treatments through
                  a MOBILE DENTAL CLINIC — free of cost. The program strictly
                  follows all COVID-19 guidelines.
                </p>
              </Block>

              <Block heading="Services provided">
                <BulletList
                  items={[
                    "Oral Health education and awareness program",
                    "Oral Health Screening",
                    "Extraction of the hopeless teeth",
                    "ART where needed",
                    "Minor surgeries such as mucoceles, abscess drainage",
                    "Distribution of Toothbrushes",
                    "Fluoride application in children for caries prevention",
                    "Teaching toothbrushing techniques",
                    "Distribution of necessary medications",
                    "Referral of the cases when needed",
                  ]}
                />
              </Block>

              <Block heading="Duration">
                <p>
                  The program runs for 15 days, including travel. Duration may
                  be modified according to the situation.
                </p>
              </Block>

              <Block heading="Who provides the services">
                <BulletList
                  items={[
                    "Licensed Dental Surgeons",
                    "Licensed Dental Assistants",
                    "Health Assistants",
                    "Other volunteering bodies",
                  ]}
                />
                <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                  Supervised by the president and members of the organization.
                </p>
              </Block>

              <Block heading="Why participate">
                <BulletList
                  items={[
                    "Gain clinical experience",
                    "Understand the situation of oral health in remote Nepal",
                    "Have a glimpse of the plain region and Janaki Temple",
                    "Help the needy people",
                    "Prove yourself that you are there for your community",
                  ]}
                />
              </Block>

              <Block heading="What we look for in candidates">
                <BulletList
                  items={[
                    "Confident enough to work independently",
                    "Good and swift at extractions",
                    "Swift at managing cases",
                    "Great patient counseling skill",
                    "Multilingual (Maithili preferred)",
                    "Experience managing and conducting dental camps",
                    "Can manage ART cases and knows Fluoride application",
                  ]}
                />
              </Block>

              <Block heading="When &amp; how">
                <p>
                  Started in May 2021 (delayed due to the nationwide COVID-19
                  lockdown). All COVID-19 guidelines are strictly followed.
                </p>
                <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                  Questions about the project? Contact us by email.
                </p>
              </Block>
            </div>
          </div>
        </div>
      </section>

      {/* UPCOMING */}
      <section className="px-6 py-16 sm:py-24 max-w-7xl mx-auto">
        <h2 className="font-mono text-[11px] uppercase tracking-[0.25em] text-primary mb-3">
          Upcoming Projects
        </h2>
        <h3 className="font-display text-3xl md:text-4xl font-extrabold tracking-tight mb-10 max-w-3xl text-balance">
          What we plan to launch next.
        </h3>

        <div className="space-y-12">
          <UpcomingCard
            num="01"
            title="Empowerment of underprivileged Children's Health Status and Education"
            img={eduImg}
            items={[
              "Annual enrollment of 5 underprivileged children in English School for better education",
              "Regular health check-up of underprivileged children every 6 months",
              "Oral hygiene maintenance instruction program",
              "Distribution of Oral Hygiene Kits",
              "Distribution of Albendazole",
              "Awareness of Vaccination Programs",
            ]}
          />

          <UpcomingCard
            num="02"
            title="Empowerment of underprivileged Women's Health"
            img={womenImg}
            items={[
              "Oral Health Awareness Programs",
              "Oral Hygiene Instruction Program",
              "Distribution of Oral Hygiene Kits",
              "General Health and Hygiene awareness Program",
              "Awareness about menstruation-related hygiene",
              "Distribution of Sanitary Pads among 3,000 women",
            ]}
          />

          <UpcomingCard
            num="03"
            title="Health Camps and Training Program — Health for All"
            img={healthImg}
            subSections={[
              {
                heading: "A · General Health Camp",
                items: [
                  "Awareness program on Diabetes",
                  "Awareness program on Hypertension and Heart Disease",
                  "Diabetes Screening test",
                  "Blood Pressure measurement training",
                  "Blood pressure measurement",
                  "Medicine Distribution Program",
                ],
              },
              {
                heading: "B · Awareness of Mosquito-related diseases",
                items: [
                  "Awareness about Hygiene Maintenance",
                  "Awareness and Prevention Program on Malaria, Dengue",
                  "Mosquito Net Distribution",
                ],
              },
              {
                heading: "C · Oral Healthcare and Education Program",
                items: [
                  "Oral health check-up and Awareness program",
                  "Oral Hygiene Instruction Program",
                  "Awareness on Oral Cancer and Possible Prevention",
                  "Dental Treatment Program",
                ],
              },
            ]}
          />
        </div>
      </section>

      {/* CTA — see articles */}
      <section className="border-t border-border py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-tighter mb-6 text-balance">
            See the work behind the projects.
          </h2>
          <Link
            to="/stories"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-7 py-4 font-mono text-[11px] uppercase tracking-[0.2em] hover:brightness-110 transition-all"
          >
            Letters from the foundation →
          </Link>
        </div>
      </section>
    </SiteShell>
  );
}

/* ---------- helpers ---------- */

function ProjectHeading({
  label,
  title,
  img,
}: {
  label: string;
  title: string;
  img: string;
}) {
  return (
    <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-end">
      <div className="md:col-span-7">
        <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-primary">
          {label}
        </span>
        <h2 className="font-display text-4xl md:text-6xl font-extrabold tracking-tighter mt-3 text-balance">
          {title}
        </h2>
      </div>
      <div className="md:col-span-5">
        <div className="aspect-[4/3] overflow-hidden">
          <img
            src={img}
            alt={title}
            loading="lazy"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}

function Lede({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-base sm:text-lg leading-relaxed text-pretty md:sticky md:top-32 md:self-start">
      {children}
    </p>
  );
}

function Block({
  heading,
  children,
}: {
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h4 className="font-mono text-[11px] uppercase tracking-[0.22em] text-primary mb-4">
        {heading}
      </h4>
      <div className="text-base leading-relaxed text-muted-foreground space-y-3">
        {children}
      </div>
    </div>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((it) => (
        <li key={it} className="flex items-start gap-3 text-foreground">
          <span className="mt-2 size-1.5 rounded-full bg-primary shrink-0" />
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}

function UpcomingCard({
  num,
  title,
  img,
  items,
  subSections,
}: {
  num: string;
  title: string;
  img: string;
  items?: string[];
  subSections?: { heading: string; items: string[] }[];
}) {
  return (
    <article className="grid md:grid-cols-12 gap-6 md:gap-10 border border-border bg-card overflow-hidden">
      <div className="md:col-span-4">
        <div className="aspect-[4/3] md:h-full overflow-hidden">
          <img
            src={img}
            alt={title}
            loading="lazy"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <div className="md:col-span-8 p-6 sm:p-8 md:py-10 md:pr-10">
        <span className="font-mono text-5xl md:text-6xl text-primary font-extrabold leading-none">
          {num}
        </span>
        <h3 className="font-display text-2xl md:text-3xl font-extrabold tracking-tight mt-3 mb-6 text-balance">
          {title}
        </h3>
        {items && <BulletList items={items} />}
        {subSections && (
          <div className="space-y-6">
            {subSections.map((s) => (
              <div key={s.heading}>
                <h4 className="font-mono text-[11px] uppercase tracking-[0.22em] text-primary mb-3">
                  {s.heading}
                </h4>
                <BulletList items={s.items} />
              </div>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
