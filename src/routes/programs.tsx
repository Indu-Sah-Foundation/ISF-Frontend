import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/SiteShell";
import eduImg from "@/assets/program-education.jpg";
import healthImg from "@/assets/program-health.jpg";
import waterImg from "@/assets/program-water.jpg";
import womenImg from "@/assets/program-women.jpg";
import roboticsImg from "@/assets/program-robotics.jpg";

export const Route = createFileRoute("/programs")({
  head: () => ({
    meta: [
      { title: "Programs — Indu Sah Foundation" },
      {
        name: "description",
        content:
          "Education, healthcare, water, women's empowerment and STEM programs run by Indu Sah Foundation in Mahottari, Nepal.",
      },
    ],
  }),
  component: ProgramsPage,
});

const programs = [
  {
    num: "01",
    title: "ISF Robotics",
    img: roboticsImg,
    desc: "Hands-on robotics, engineering design, and programming for children in impoverished areas of Nepal — igniting curiosity, creativity, and STEM potential for brighter futures.",
  },
  {
    num: "02",
    title: "ISF SMILE — Mobile Dental Clinic",
    img: healthImg,
    desc: "Our flagship oral healthcare project. Treats over 3,000 dental patients every year across remote Nepal, from the Terai plains to the Himalayas — all care provided free in a fully-equipped mobile clinic.",
  },
  {
    num: "03",
    title: "ISF Education: Child Abuse Prevention",
    img: eduImg,
    desc: "School-based curriculum on child safety, awareness, and safeguarding — delivered to children, parents, and teachers across Mahottari and Province 2. Over 300 children reached in a single program.",
  },
  {
    num: "04",
    title: "Humanitarian Support — Food & Clothing",
    img: womenImg,
    desc: "Crisis response for marginalized families. 850+ families supported with food and hygiene kits during floods and lockdowns; 517 warm clothing items distributed during cold waves.",
  },
  {
    num: "05",
    title: "Oral Health Education",
    img: waterImg,
    desc: "Free classroom education on oral health, oral cancer awareness, and dental treatment, paired with donated hygiene kits — over 1,500 people reached.",
  },
];

function ProgramsPage() {
  return (
    <SiteShell>
      <header className="px-6 pt-20 pb-16 max-w-7xl mx-auto">
        <span className="font-mono text-primary text-xs uppercase tracking-[0.2em]">
          Programs Held
        </span>
        <h1 className="font-display text-5xl md:text-7xl font-extrabold tracking-tighter mt-4 text-balance max-w-4xl">
          Health, education, and dignity — delivered locally.
        </h1>
      </header>

      <section className="px-6 max-w-7xl mx-auto pb-24 space-y-24">
        {programs.map((p, i) => (
          <article
            key={p.num}
            className="grid md:grid-cols-12 gap-8 md:gap-12 items-center"
          >
            <div className={`md:col-span-7 ${i % 2 ? "md:order-2" : ""}`}>
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={p.img}
                  alt={p.title}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="md:col-span-5 space-y-5">
              <span className="font-mono text-5xl text-primary font-extrabold">
                {p.num}
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-tight">
                {p.title}
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                {p.desc}
              </p>
              <Link
                to="/donate"
                className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] underline decoration-primary underline-offset-4 pt-2"
              >
                Support this program →
              </Link>
            </div>
          </article>
        ))}
      </section>
    </SiteShell>
  );
}
