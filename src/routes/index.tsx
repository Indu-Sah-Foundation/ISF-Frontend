import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { SiteShell } from "@/components/SiteShell";
import { SketchImage } from "@/components/SketchImage";
import { api } from "@/lib/api";
import heroImg from "@/assets/hero.jpg";
import eduImg from "@/assets/program-education.jpg";
import healthImg from "@/assets/program-health.jpg";
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

const programs = [
  { num: "01", title: "ISF SMILE", desc: "Oral healthcare project educating and treating dental patients across underserved communities in Nepal — over 3,000 patients served free of cost.", img: healthImg },
  { num: "02", title: "ISF Robotics", desc: "Hands-on robotics and engineering education to ignite curiosity, creativity, and STEM potential in children from impoverished communities.", img: roboticsImg },
  { num: "03", title: "ISF EDC", desc: "Education and Child Abuse Prevention programs run in partnership with local schools across Mahottari and Province 2.", img: eduImg },
];

function HomePage() {
  const articles = useQuery({
    queryKey: ["articles", "home"],
    queryFn: () => api.listArticles(3, 0),
    retry: 1,
  });

  return (
    <SiteShell fullBleed>
      {/* Hero — full viewport on load */}
      <section className="relative h-screen min-h-[640px] w-full flex flex-col justify-end p-6 md:p-12 overflow-hidden">
        <img
          src={heroImg}
          alt="Children in a Nepali classroom"
          className="absolute inset-0 w-full h-full object-cover"
          width={1920}
          height={1280}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/40 to-ink/20" />
        <div className="relative z-10 max-w-6xl animate-reveal">
          <span className="inline-block font-mono text-[11px] uppercase tracking-[0.25em] text-cream/80 mb-6 border border-cream/30 px-3 py-1.5">
            Loharpatti, Nepal
          </span>
          <h1 className="font-display font-extrabold text-cream tracking-tighter leading-[0.95] mb-10 text-balance whitespace-normal text-[clamp(2.25rem,6.5vw,6rem)]">
            For better <span className="pencil-underline">health</span>{" "}
            <span className="italic font-light">&amp;</span>{" "}
            <span className="pencil-underline">education</span>.
          </h1>
        </div>
      </section>

      {/* Mission */}
      <section className="py-24 md:py-32 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-12 gap-12">
          <div className="md:col-span-4">
            <span className="font-mono text-primary text-xs font-medium uppercase tracking-[0.2em]">
              Our Commitment
            </span>
          </div>
          <div className="md:col-span-8">
            <p className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight leading-[1.15] text-pretty">
              Indu Sah Foundation is a non-profit, non-political, non-religious
              organization based 250km south of Kathmandu. Our core mission is
              to help underprivileged children for{" "}
              <span className="text-primary italic">better health and education.</span>
            </p>
          </div>
        </div>
      </section>

      {/* Impact */}
      <section className="border-y border-border py-20 bg-secondary/40">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <span className="font-mono text-primary text-xs font-medium uppercase tracking-[0.2em] mb-10 block">
            Impact
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 justify-items-center">
            {[
              { v: "3,000+", l: "Dental Patients Served" },
              { v: "6+", l: "Years on the Ground" },
            ].map((s) => (
              <div key={s.l} className="space-y-2 text-center">
                <div className="font-display text-6xl md:text-7xl font-extrabold tracking-tighter">
                  {s.v}
                </div>
                <div className="font-mono text-[11px] uppercase text-muted-foreground tracking-[0.18em]">
                  {s.l}
                </div>
              </div>
            ))}
          </div>
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
              Active <span className="pencil-underline">programs</span>
            </h2>
          </div>
          <Link
            to="/events"
            className="font-mono text-xs uppercase underline underline-offset-4 decoration-primary inline-flex items-center gap-1.5"
          >
            View all <ArrowUpRight size={14} />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {programs.map((p, i) => (
            <article
              key={p.num}
              className="flex flex-col"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <SketchImage
                src={p.img}
                alt={p.title}
                variant={i % 2 === 0 ? "default" : "alt"}
                className="aspect-[4/5]"
                badge={
                  <span className="absolute top-4 left-4 font-mono text-5xl md:text-6xl text-cream/60 font-extrabold mix-blend-overlay">
                    {p.num}
                  </span>
                }
              />
              <div className="pt-6">
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
                Recent
              </span>
              <h2 className="font-display text-4xl md:text-5xl font-extrabold tracking-tighter text-balance">
                Blogs
              </h2>
            </div>
            <Link
              to="/stories"
              className="font-mono text-xs uppercase underline underline-offset-4 decoration-primary inline-flex items-center gap-1.5"
            >
              Read more <ArrowUpRight size={14} />
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
              {articles.data.items.map((a, i) => (
                <Link
                  key={a.id}
                  to="/stories/$slug"
                  params={{ slug: a.slug }}
                  className="group block border-t border-ink pt-6"
                >
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    Story · {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display text-2xl font-extrabold tracking-tight mt-3 mb-3 group-hover:text-primary transition-colors text-balance">
                    {a.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {a.published_at
                      ? new Date(a.published_at).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      : "Draft"}
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
