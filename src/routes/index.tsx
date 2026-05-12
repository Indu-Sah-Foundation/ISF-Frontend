import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { SiteShell } from "@/components/SiteShell";
import { api } from "@/lib/api";
import heroImg from "@/assets/hero.jpg";
import eduImg from "@/assets/program-education.jpg";
import healthImg from "@/assets/program-health.jpg";
import waterImg from "@/assets/program-water.jpg";
import womenImg from "@/assets/program-women.jpg";
import roboticsImg from "@/assets/program-robotics.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Indu Sah Foundation — For Better Health & Education" },
      {
        name: "description",
        content:
          "A Nepal-based non-profit working at the intersection of children's health and education in Mahottari and beyond.",
      },
    ],
  }),
  component: HomePage,
});

// Strip markdown headings/syntax to get a short, clean excerpt for cards.
function excerpt(md: string, max = 180): string {
  return (md || "")
    .replace(/^#+\s.*$/gm, "")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/[*_`>]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, max);
}

// One-line teasers. Full descriptions live on /programs.
const programs = [
  { num: "01", title: "ISF Robotics", desc: "Robotics & STEM for children in impoverished communities.", img: roboticsImg },
  { num: "02", title: "ISF SMILE — Mobile Dental Clinic", desc: "Free dental care across remote Nepal — 3,000+ patients/year.", img: healthImg },
  { num: "03", title: "Education: Child Abuse Prevention", desc: "Safeguarding & awareness programs in local schools.", img: eduImg },
  { num: "04", title: "Humanitarian Support", desc: "Food, clothing, and crisis response for families across Mahottari.", img: womenImg },
  { num: "05", title: "Oral Health Education", desc: "Free oral-health classes and hygiene kits for 1,500+ people.", img: waterImg },
];

function HomePage() {
  const articles = useQuery({
    queryKey: ["articles", "home"],
    queryFn: () => api.listArticles(3, 0),
    retry: 1,
  });

  return (
    <SiteShell>
      {/* Hero */}
      <section className="relative h-[92vh] min-h-[640px] flex flex-col justify-end p-6 md:p-12 overflow-hidden">
        <img
          src={heroImg}
          alt="Children in a Nepali classroom"
          className="absolute inset-0 w-full h-full object-cover"
          width={1920}
          height={1280}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/40 to-ink/20" />
        <div className="relative z-10 max-w-4xl animate-reveal">
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-extrabold text-cream tracking-tighter leading-[0.92] mb-10 text-balance">
            For better health <br className="hidden md:block" />
            <span className="italic font-light">&amp;</span> education.
          </h1>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/donate"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-7 py-4 font-display font-bold uppercase text-xs tracking-[0.2em] hover:brightness-110 transition-all"
            >
              Support our work <ArrowRight size={14} />
            </Link>
            <Link
              to="/programs"
              className="inline-flex items-center gap-2 bg-cream/10 backdrop-blur text-cream border border-cream/30 px-7 py-4 font-display font-bold uppercase text-xs tracking-[0.2em] hover:bg-cream/20 transition-all"
            >
              Explore programs
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-border py-16 bg-secondary/40">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-3 gap-8">
          {[
            { v: "3,000+", l: "Dental patients served / year" },
            { v: "1,500+", l: "Educated on oral health" },
            { v: "850+", l: "Families supported in crises" },
          ].map((s) => (
            <div key={s.l} className="space-y-1">
              <div className="font-display text-5xl md:text-6xl font-extrabold tracking-tighter">
                {s.v}
              </div>
              <div className="font-mono text-[11px] uppercase text-muted-foreground tracking-[0.18em]">
                {s.l}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Programs */}
      <section className="py-24 md:py-32 px-6 max-w-7xl mx-auto">
        <div className="mb-16 flex items-end justify-between gap-6 flex-wrap">
          <div>
            <span className="font-mono text-primary text-xs font-medium uppercase tracking-[0.2em] mb-3 block">
              Our Work
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-extrabold tracking-tighter">
              Programs held
            </h2>
          </div>
          <Link
            to="/programs"
            className="font-mono text-xs uppercase underline underline-offset-4 decoration-primary inline-flex items-center gap-1.5"
          >
            View all <ArrowUpRight size={14} />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {programs.map((p, i) => (
            <article
              key={p.num}
              className="group cursor-pointer animate-reveal flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm hover:shadow-lg transition-shadow"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="relative overflow-hidden aspect-[4/5]">
                <img
                  src={p.img}
                  alt={p.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 font-mono text-5xl md:text-6xl text-cream/40 font-extrabold mix-blend-overlay">
                  {p.num}
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="font-display text-xl md:text-2xl font-extrabold mb-2 tracking-tight">
                  {p.title}
                </h3>
                <p className="text-muted-foreground text-sm md:text-base">
                  {p.desc}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Stories from backend */}
      <section className="py-24 px-6 bg-secondary/40 border-y border-border">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 flex items-end justify-between gap-6 flex-wrap">
            <div>
              <span className="font-mono text-primary text-xs font-medium uppercase tracking-[0.2em] mb-3 block">
                Latest
              </span>
              <h2 className="font-display text-4xl md:text-5xl font-extrabold tracking-tighter">
                Articles
              </h2>
            </div>
            <Link
              to="/stories"
              className="font-mono text-xs uppercase underline underline-offset-4 decoration-primary inline-flex items-center gap-1.5"
            >
              All articles <ArrowUpRight size={14} />
            </Link>
          </div>

          {articles.isLoading && (
            <div className="grid md:grid-cols-3 gap-8">
              {[0, 1, 2].map((i) => (
                <div key={i} className="h-48 bg-muted animate-pulse rounded" />
              ))}
            </div>
          )}

          {articles.isError && (
            <p className="text-muted-foreground font-mono text-sm">
              Stories are temporarily unavailable. Check back soon.
            </p>
          )}

          {articles.data && articles.data.items.length === 0 && (
            <p className="text-muted-foreground">No stories published yet.</p>
          )}

          {articles.data && articles.data.items.length > 0 && (
            <div className="grid md:grid-cols-3 gap-8">
              {articles.data.items.map((a) => (
                <Link
                  key={a.id}
                  to="/stories/$slug"
                  params={{ slug: a.slug }}
                  className="group block border-t border-ink pt-6"
                >
                  <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary">
                    {a.published_at
                      ? new Date(a.published_at).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      : "Draft"}
                  </span>
                  <h3 className="font-display text-2xl font-extrabold tracking-tight mt-3 mb-3 group-hover:text-primary transition-colors text-balance">
                    {a.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {excerpt(a.body_md)}
                  </p>
                  <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.2em] text-primary">
                    View details →
                  </p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary text-primary-foreground py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="font-display text-5xl md:text-7xl font-extrabold tracking-tighter mb-8 text-balance">
            Every child deserves a healthy start.
          </h2>
          <p className="text-lg md:text-xl text-primary-foreground/85 max-w-xl mx-auto mb-12">
            Your support builds clinics, fills classrooms, and keeps the next
            generation of Nepal in school.
          </p>
          <Link
            to="/donate"
            className="inline-flex items-center gap-2 bg-cream text-primary px-12 py-5 font-display font-extrabold uppercase tracking-[0.18em] text-sm hover:brightness-95 transition-all"
          >
            Donate now <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </SiteShell>
  );
}
