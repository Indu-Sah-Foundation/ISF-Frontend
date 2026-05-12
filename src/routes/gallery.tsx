import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/SiteShell";
import healthImg from "@/assets/program-health.jpg";
import waterImg from "@/assets/program-water.jpg";
import womenImg from "@/assets/program-women.jpg";
import eduImg from "@/assets/program-education.jpg";
import roboticsImg from "@/assets/program-robotics.jpg";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "What We Do · Gallery — Indu Sah Foundation" },
      {
        name: "description",
        content:
          "Gallery of healthcare and education initiatives by Indu Sah Foundation across Mahottari, Dhading, and rural Nepal.",
      },
    ],
  }),
  component: GalleryPage,
});

// Verbatim list from /p/our-work.html on the live site.
const sections = [
  {
    heading: "Dental Healthcare Initiatives",
    items: [
      { name: "Free Dental Camp in Netrawati, Dhading", img: healthImg },
      { name: "Dental Treatment Camp at Ganga Jamuna", img: healthImg },
      { name: "Dental Work Camp in Dhading, Nepal", img: healthImg },
      { name: "Oral Health Camp in Mahottari, Nepal", img: healthImg },
      {
        name: "ISF SMILE — Mobile Dental Clinic",
        img: healthImg,
        note: "3,000 dental patients served free / year",
      },
    ],
  },
  {
    heading: "Preventive Health Programs",
    items: [
      {
        name: "Hand Washing Technique Training Program",
        img: waterImg,
        note: "Mahottari, Nepal",
      },
      { name: "Child Abuse Prevention Program", img: eduImg },
    ],
  },
  {
    heading: "Pandemic Relief",
    items: [
      {
        name: "COVID-19 Assistance · 2021",
        img: waterImg,
        note: "Sukhainiya village, Mahottari · rice, dal, potato, salt, oil, soybean",
      },
    ],
  },
  {
    heading: "Educational Initiatives",
    items: [
      {
        name: "ISF Robotics",
        img: roboticsImg,
        note: "STEM education for underprivileged children in impoverished areas of Nepal",
      },
    ],
  },
  {
    heading: "Humanitarian Support",
    items: [
      {
        name: "Cold Wave Distribution",
        img: womenImg,
        note: "120+ families · 517 warm clothing items",
      },
      {
        name: "Food & Clothing for Marginalized Families",
        img: womenImg,
        note: "850+ families supported across Mahottari",
      },
    ],
  },
];

const regions = [
  "Dhading District",
  "Mahottari District",
  "Rural Nepal communities",
  "Remote Himalayan regions",
];

function GalleryPage() {
  return (
    <SiteShell>
      <header className="px-6 pt-20 pb-16 max-w-7xl mx-auto">
        <span className="font-mono text-primary text-xs uppercase tracking-[0.2em]">
          What We Do · Gallery
        </span>
        <h1 className="font-display text-5xl md:text-7xl font-extrabold tracking-tighter mt-4 text-balance max-w-4xl">
          The work, by the field.
        </h1>
      </header>

      {/* Sections */}
      <section className="px-6 max-w-7xl mx-auto pb-24 space-y-20">
        {sections.map((s) => (
          <div key={s.heading}>
            <h2 className="font-mono text-[11px] uppercase tracking-[0.25em] text-primary mb-8">
              {s.heading}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {s.items.map((it) => (
                <figure
                  key={it.name}
                  className="border border-border bg-card overflow-hidden"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={it.img}
                      alt={it.name}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <figcaption className="p-5">
                    <h3 className="font-display font-extrabold text-lg leading-snug tracking-tight">
                      {it.name}
                    </h3>
                    {it.note && (
                      <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                        {it.note}
                      </p>
                    )}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Geographic coverage */}
      <section className="border-t border-border bg-secondary/40 py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-mono text-[11px] uppercase tracking-[0.25em] text-primary mb-8">
            Geographic coverage
          </h2>
          <ul className="grid sm:grid-cols-2 gap-y-3 gap-x-8">
            {regions.map((r) => (
              <li
                key={r}
                className="font-display text-xl font-semibold tracking-tight border-l-2 border-primary pl-4"
              >
                {r}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </SiteShell>
  );
}
