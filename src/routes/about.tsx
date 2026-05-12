import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/SiteShell";
import heroImg from "@/assets/program-women.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Indu Sah Foundation" },
      {
        name: "description",
        content:
          "Indu Sah Foundation: a Nepal-based non-profit established in 2018 by Lal Sah & Dr. Vijay Sah, working for the health and education of underprivileged children.",
      },
    ],
  }),
  component: AboutPage,
});

const founders = [
  {
    name: "Lal Sah",
    title: "Co-Founder · Lead Software Engineer (United States)",
    bio: "Shapes and approves the foundation's strategies, advocates for the foundation's issues, and sets overall organizational direction.",
  },
  {
    name: "Dr. Vijay Sah",
    title: "Co-Founder · Executive Director · Dental Surgeon",
    bio: "Global Goodwill Ambassador, Global Peace Ambassador, and Ambassador for Child Abuse Prevention for Nepal (Rotary International). A dentistry researcher practicing research-based dentistry in Nepal. Founded Indu Sah Foundation to enhance healthcare and education for underserved populations under the poverty line in Nepal and globally.",
    motto: "Stay humble!",
  },
  {
    name: "Shubham Sah",
    title: "President · CEO",
    bio: "High school student and FTC Documentation Lead at Rotary Club of Waukee. Competed in global competitions including FIRST Tech Challenge and FIRST Lego League. 150+ hours of community service at local food pantry. Leads and organizes ISF Robotics.",
  },
];

const advisoryInternational = [
  {
    name: "Dr. Amit Saini",
    title: "Dental Surgeon · Punjab, India",
    bio: "Karmaveer Chakra recipient (2012). Founder/President of Global Oral Health Foundation Society.",
  },
  {
    name: "Dr. Arne Drews, MD",
    title: "Co-founder, NepalMed · Germany",
    bio: "German-trained physician (University of Leipzig, 1997), specialized in respiratory and occupational medicine. Co-founded NepalMed in 2000 — a non-profit supporting Nepalese healthcare across multiple districts (medical, dental, veterinary, roads, clean water, oxygen). Author of six Nepal mystery books; book sales support charity work. nepalmed.de",
  },
  {
    name: "Dr. Darren Weiss, BDS",
    title: "Humble Smile Foundation · Australia / Israel",
    bio: "Australian-trained (University of Melbourne, 1989). 22 years private dentistry across Australia and Israel. Now corporate oral health promotion consultant at The Humble Co. Heads Humble Smile Foundation, operating in 5 countries with 120+ global members and 80+ projects in 47 countries. humblesmile.org",
  },
  {
    name: "Dr. Stephen Forrest, DDS",
    title: "Berkshire Dental · Clive, IA, USA",
    bio: "Family, cosmetic, and implant dentist.",
  },
];

const advisoryNational = [
  {
    name: "Dr. Pravin Shah",
    title: "Consultant Orthodontist · Nepal",
    bio: "",
  },
];

const board = [
  { name: "Dr. Vijay Sah", role: "President" },
  { name: "Mr. Ram Prakash Yadav", role: "Vice President" },
  { name: "Mr. Mahendra Sah", role: "Secretary" },
  { name: "Mrs. Rani Devi", role: "Deputy Secretary" },
  { name: "Mr. Raj Sah", role: "Treasurer" },
  { name: "Mr. Santosh Thakur", role: "Board Member" },
  { name: "Mrs. Rina Devi", role: "Board Member" },
  { name: "Mrs. Ram Sunar Devi", role: "Underprivileged Board Member" },
  { name: "Mr. Ram Pragash Yadav", role: "Underprivileged Board Member" },
];

function AboutPage() {
  return (
    <SiteShell>
      {/* Header */}
      <header className="px-6 pt-20 pb-12 max-w-5xl mx-auto">
        <span className="font-mono text-primary text-xs uppercase tracking-[0.2em]">
          About
        </span>
        <h1 className="font-display text-5xl md:text-7xl font-extrabold tracking-tighter mt-4 text-balance">
          A foundation rooted in Mahottari.
        </h1>
      </header>

      <div className="aspect-[21/9] w-full overflow-hidden">
        <img
          src={heroImg}
          alt="Community in Nepal"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Mission */}
      <section className="px-6 max-w-3xl mx-auto py-24 space-y-6 text-lg leading-relaxed text-pretty">
        <h2 className="font-mono text-[11px] uppercase tracking-[0.25em] text-primary">
          Our Mission
        </h2>
        <p>
          Indu Sah Foundation is an emerging non-profit organization established
          on December 24, 2018, registered under section 4 of act 2034 of the
          Government of Nepal, and affiliated with the Social Welfare Council.
          Based in Loharpatti, Mahottari (250 km south of Kathmandu and 7 km
          west of Janakpur Dham), the organization is non-profit, non-religious,
          non-political, and non-governmental.
        </p>
        <p>
          The organization works for health, education, livelihood, water,
          sanitation, and hygiene as well as construction, gender equality and
          social inclusion, human rights, and governance — through operation,
          research, advocacy, and capacity enhancement.
        </p>
        <p className="font-display text-2xl font-semibold tracking-tight border-l-4 border-primary pl-6 italic">
          Our core mission is to help underprivileged children for better health
          and education.
        </p>
      </section>

      {/* Letter from Founders */}
      <section className="border-t border-border bg-secondary/40 py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-mono text-[11px] uppercase tracking-[0.25em] text-primary mb-6">
            Letter from the Founders
          </h2>
          <div className="space-y-6 text-lg leading-relaxed text-pretty">
            <p>
              We grew up doing charity work — first at our high school, then in
              the village of Madhepura where we always found happiness in
              helping disadvantaged communities. After losing our mother, we
              proposed the Indu Sah Foundation in her name.
            </p>
            <p>
              We chose healthcare and education as our core areas. We partner
              with multiple organizations and donors to address healthcare and
              education for people living in extreme poverty across Nepal — with
              a vision that extends globally.
            </p>
            <p>
              Our strategy is to promote health and health education for families
              and children in Nepal, starting from Mahottari, where we grew up.
              We will keep adjusting our approach and sharing results so the work
              can benefit more people.
            </p>
            <p className="font-display font-semibold pt-4">
              — Lal Sah &amp; Dr. Vijay Sah
            </p>
          </div>
        </div>
      </section>

      {/* President Statement */}
      <section className="py-24 px-6 max-w-3xl mx-auto">
        <h2 className="font-mono text-[11px] uppercase tracking-[0.25em] text-primary mb-6">
          From the President
        </h2>
        <div className="space-y-6 text-lg leading-relaxed text-pretty">
          <p>
            I started participating in life-changing programs like FIRST when I
            was eight years old. Those experiences gave me both technical and
            soft skills I would not have had otherwise.
          </p>
          <p>
            With the support of my uncle and father, I want to bring those same
            kinds of programs to underprivileged populations — and improve
            others' lives through health and education.
          </p>
          <p className="font-display font-semibold pt-4">— Shubham Sah</p>
        </div>
      </section>

      {/* Founders & Leadership */}
      <section className="border-t border-border py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-mono text-[11px] uppercase tracking-[0.25em] text-primary mb-10">
            Leadership · Founders
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {founders.map((f) => (
              <article
                key={f.name}
                className="border border-border bg-card p-8"
              >
                <h3 className="font-display text-2xl font-extrabold tracking-tight">
                  {f.name}
                </h3>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary mt-1 mb-4">
                  {f.title}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {f.bio}
                </p>
                {f.motto && (
                  <p className="mt-4 font-display italic text-foreground">
                    "{f.motto}"
                  </p>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Advisory Board */}
      <section className="border-t border-border bg-secondary/40 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-mono text-[11px] uppercase tracking-[0.25em] text-primary mb-10">
            Advisory Board
          </h2>

          <h3 className="font-display text-xl font-extrabold tracking-tight mb-6">
            International
          </h3>
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {advisoryInternational.map((p) => (
              <article
                key={p.name}
                className="border border-border bg-card p-8"
              >
                <h4 className="font-display text-xl font-extrabold tracking-tight">
                  {p.name}
                </h4>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary mt-1 mb-4">
                  {p.title}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {p.bio}
                </p>
              </article>
            ))}
          </div>

          <h3 className="font-display text-xl font-extrabold tracking-tight mb-6">
            National
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {advisoryNational.map((p) => (
              <article
                key={p.name}
                className="border border-border bg-card p-8"
              >
                <h4 className="font-display text-xl font-extrabold tracking-tight">
                  {p.name}
                </h4>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary mt-1">
                  {p.title}
                </p>
                {p.bio && (
                  <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                    {p.bio}
                  </p>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Board Members */}
      <section className="py-24 px-6 max-w-5xl mx-auto">
        <h2 className="font-mono text-[11px] uppercase tracking-[0.25em] text-primary mb-10">
          Board Members
        </h2>
        <ul className="border-t border-border divide-y divide-border">
          {board.map((b) => (
            <li
              key={b.name + b.role}
              className="py-5 flex items-center justify-between gap-4"
            >
              <span className="font-display text-lg font-bold tracking-tight">
                {b.name}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground text-right">
                {b.role}
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* CTA */}
      <section className="border-t border-border py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-3xl md:text-5xl font-extrabold tracking-tighter mb-8 text-balance">
            Become part of the work.
          </h2>
          <div className="flex justify-center gap-3 flex-wrap">
            <Link
              to="/donate"
              className="bg-primary text-primary-foreground px-8 py-4 font-mono text-[11px] uppercase tracking-[0.2em]"
            >
              Donate
            </Link>
            <Link
              to="/contact"
              className="border border-ink px-8 py-4 font-mono text-[11px] uppercase tracking-[0.2em] hover:bg-ink hover:text-cream transition-colors"
            >
              Contact us
            </Link>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
