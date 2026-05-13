import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/SiteShell";
import { SketchImage } from "@/components/SketchImage";
import heroImg from "@/assets/program-women.jpg";
import eduImg from "@/assets/program-education.jpg";
import healthImg from "@/assets/program-health.jpg";
import waterImg from "@/assets/program-water.jpg";
import roboticsImg from "@/assets/program-robotics.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Indu Sah Foundation" },
      {
        name: "description",
        content:
          "Indu Sah Foundation: a Nepal-based non-profit established December 24, 2018 by Lal Sah and Dr. Vijay Sah for the health and education of underprivileged children.",
      },
      { property: "og:title", content: "About — Indu Sah Foundation" },
    ],
  }),
  component: AboutPage,
});

const imagePool = [healthImg, eduImg, waterImg, roboticsImg, heroImg];
const pickImg = (i: number) => imagePool[i % imagePool.length];

const founders = [
  {
    name: "Lal Sah",
    role: "Co-Founder · Lead Software Engineer, United States",
    bio: "Lal Sah, Lead Software Engineer in the United States of America, shapes and approves foundation strategies, advocates for the foundation's issues, and sets the organization's overall direction.",
  },
  {
    name: "Dr. Vijay Sah",
    role: "Co-Founder · Executive Director · Dental Surgeon",
    extras:
      "Global Goodwill Ambassador · Global Peace Ambassador · Ambassador, Child Abuse Prevention for Nepal (Rotary International)",
    bio: "Dr. Vijay Sah is a Dental Surgeon who practices research-based dentistry in Nepal. He believes that serving as a healthcare professional is the most honorable profession one can have, and dentistry is one of the best ways to bring a smile to your face. He leads the foundation's efforts to promote the Healthcare and Education of all the people under the poverty line in Nepal & around the world.",
    motto: "Stay Humble!",
  },
  {
    name: "Shubham Sah",
    role: "President · CEO",
    extras: "FTC Documentation Lead, Rotary Club of Waukee · Highschool Student",
    bio: "Shubham Sah is a high school student who believes that helping others is a must. He has competed in and succeeded in global competitions like FIRST Tech Challenge, and FIRST Lego League. He leads and organizes educational projects like ISF Robotics.",
  },
];

const advisoryIntl = [
  { name: "Dr. Amit Saini", role: "Dental Surgeon, Punjab, India", extras: "Karmaveer Chakra, 2012 · Founder/President: Global Oral Health Foundation Society", bio: "" },
  { name: "Dr. Arne Drews, MD", role: "Co-founder, NepalMed · Germany", bio: "Arne grew up in Germany and attained his medical degree at the University of Leipzig in 1997. Since 2008 he has run a private practice in respiratory and occupational medicine. In 2000 he co-founded NepalMed, supporting Nepalese activities in healthcare." },
  { name: "Dr. Darren Weiss, BDS", role: "Head, Humble Smile Foundation", bio: "Darren grew up in Australia and attained his Bachelor of Dental Science from the University of Melbourne in 1989. Today he heads the Humble Smile Foundation, a non-profit organization committed to helping people in the most vulnerable areas of the world to care for themselves." },
  { name: "Dr. Stephen Forrest, DDS", role: "Family, Cosmetic, and Implant Dentist", extras: "Berkshire Dental, Clive, IA, USA", bio: "" },
];

const advisoryNat = [
  { name: "Dr. Pravin Shah", role: "Consultant Orthodontist, Nepal", bio: "" },
];

const board = [
  { name: "Dr. Vijay Sah", role: "Current President" },
  { name: "Mr. Ram Prakash Yadav", role: "Vice President" },
  { name: "Mr. Mahendra Sah", role: "Secretary" },
  { name: "Mrs. Rani Devi", role: "Deputy Secretary" },
  { name: "Mr. Raj Sah", role: "Treasurer" },
  { name: "Mr. Santosh Thakur", role: "Board Member" },
  { name: "Mrs. Rina Devi", role: "Board Member" },
  { name: "Mrs. Ram Sunar Devi (Dalit)", role: "Board Member · Underprivileged" },
  { name: "Mr. Ram Pragash Yadav", role: "Board Member · Underprivileged" },
];

function AboutPage() {
  return (
    <SiteShell>
      <header className="px-6 pb-12 max-w-5xl mx-auto">
        <span className="font-mono text-primary text-xs uppercase tracking-[0.2em]">
          About Us
        </span>
        <h1 className="font-display text-5xl md:text-7xl font-extrabold tracking-tighter mt-4 text-balance">
          A foundation rooted in <span className="pencil-underline">Mahottari</span>.
        </h1>
      </header>

      <div className="px-6 max-w-7xl mx-auto">
        <SketchImage
          src={heroImg}
          alt="Community in Nepal"
          className="aspect-[21/9] w-full"
          loading="eager"
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
          We are based in Loharpatti, Mahottari, Nepal — 250 kilometers south
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
            Local leadership — the foundation is run by, and for, the
            communities of Mahottari.
          </div>
        </div>
      </section>

      <PeopleSection eyebrow="Leadership" title="Founders" people={founders} />
      <PeopleSection eyebrow="Advisory Board" title="International" people={advisoryIntl} tone="alt" />
      <PeopleSection eyebrow="Advisory Board" title="National" people={advisoryNat} />

      {/* Board Members — 2 per row, with images */}
      <section className="border-t border-border py-20 sm:py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-primary mb-3 block">
            Governance
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-extrabold tracking-tight mb-12">
            Board Members
          </h2>
          <div className="grid sm:grid-cols-2 gap-8 lg:gap-10">
            {board.map((b, i) => (
              <article
                key={b.name + b.role}
                className="sketch-border pencil-shadow bg-card overflow-hidden flex flex-col"
              >
                <SketchImage
                  src={pickImg(i)}
                  alt={b.name}
                  variant={i % 2 === 0 ? "default" : "alt"}
                  className="aspect-[16/10] w-full"
                />
                <div className="p-6 sm:p-8">
                  <h3 className="font-display text-xl sm:text-2xl font-extrabold tracking-tight">
                    {b.name}
                  </h3>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary mt-2">
                    {b.role}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}

function PeopleSection({
  eyebrow,
  title,
  people,
  tone = "default",
}: {
  eyebrow: string;
  title: string;
  people: { name: string; role: string; extras?: string; bio?: string; motto?: string }[];
  tone?: "default" | "alt";
}) {
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
            <article
              key={p.name}
              className="sketch-border pencil-shadow bg-card overflow-hidden grid md:grid-cols-12 gap-0"
            >
              <div className="md:col-span-5">
                <SketchImage
                  src={pickImg(i + (tone === "alt" ? 2 : 0))}
                  alt={p.name}
                  variant={i % 2 === 0 ? "default" : "alt"}
                  className="aspect-[4/3] md:aspect-auto md:h-full w-full"
                />
              </div>
              <div className="md:col-span-7 p-6 sm:p-10">
                <h3 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight">
                  {p.name}
                </h3>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary mt-2 mb-2">
                  {p.role}
                </p>
                {p.extras && (
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground mb-4">
                    {p.extras}
                  </p>
                )}
                {p.bio && (
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    {p.bio}
                  </p>
                )}
                {p.motto && (
                  <p className="mt-4 font-display italic text-foreground">
                    "{p.motto}"
                  </p>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
