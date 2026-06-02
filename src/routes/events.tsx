import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { SiteShell } from "@/components/SiteShell";
import { SketchImage } from "@/components/SketchImage";
import { api, type Project, type ProjectBlock } from "@/lib/api";

export const Route = createFileRoute("/events")({
  head: () => ({
    meta: [
      { title: "Projects - Indu Sah Foundation" },
      {
        name: "description",
        content:
          "Current and upcoming projects of Indu Sah Foundation - ISF Robotics, ISF SMILE Mobile Dental Clinic, and health, education, and hygiene programs for underprivileged communities in Nepal.",
      },
    ],
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["projects", "public"],
    queryFn: () => api.listProjects(),
  });

  const projects = data?.items || [];
  const current = projects.filter((p) => p.kind === "current");
  const upcoming = projects.filter((p) => p.kind === "upcoming");

  useEffect(() => {
    if (!projects.length) return;
    const id = window.location.hash.slice(1);
    if (!id) return;
    const el = document.getElementById(id);
    if (el) {
      requestAnimationFrame(() =>
        el.scrollIntoView({ behavior: "smooth", block: "start" }),
      );
    }
  }, [projects.length]);

  return (
    <SiteShell>
      <header className="px-6 pt-10 sm:pt-16 pb-12 max-w-7xl mx-auto">
        <span className="font-mono text-primary text-xs uppercase tracking-[0.2em]">
          Projects
        </span>
        <h1 className="font-display text-5xl md:text-7xl font-extrabold tracking-tighter mt-4 text-balance max-w-4xl">
          Current &amp; <span className="pencil-underline">upcoming</span> work.
        </h1>
      </header>

      {isLoading && (
        <p className="px-6 max-w-7xl mx-auto text-muted-foreground">Loading…</p>
      )}
      {error && (
        <p className="px-6 max-w-7xl mx-auto text-muted-foreground">
          Couldn't load projects: {(error as Error).message}
        </p>
      )}

      {/* CURRENT PROJECTS - each gets a full feature section, alternating tone */}
      {current.map((p, i) => (
        <section
          key={p.id}
          id={p.slug}
          className={
            "px-6 pb-16 scroll-mt-28 sm:scroll-mt-32 " +
            (i % 2 === 1 ? "border-t border-border bg-secondary/40 py-16 sm:py-20" : "")
          }
        >
          <div className="max-w-7xl mx-auto">
            <ProjectHeading project={p} />
            <div className="grid md:grid-cols-3 gap-10 mt-12">
              {p.lede && <Lede>{p.lede}</Lede>}
              <div className={p.lede ? "md:col-span-2 space-y-10" : "md:col-span-3 space-y-10"}>
                {p.blocks.map((b, j) => (
                  <BlockRenderer key={j} block={b} />
                ))}
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* UPCOMING PROJECTS */}
      {upcoming.length > 0 && (
        <section className="px-6 py-16 sm:py-24 max-w-7xl mx-auto border-t border-border">
          <h2 className="font-mono text-[11px] uppercase tracking-[0.25em] text-primary mb-3">
            Upcoming Projects
          </h2>
          <h3 className="font-display text-3xl md:text-4xl font-extrabold tracking-tight mb-12 max-w-3xl text-balance">
            What we plan to launch <span className="pencil-underline">next</span>.
          </h3>

          <div className="grid gap-12 md:gap-16">
            {upcoming.map((p, i) => (
              <UpcomingCard key={p.id} project={p} flip={i % 2 === 1} />
            ))}
          </div>
        </section>
      )}

      {!isLoading && projects.length === 0 && (
        <p className="px-6 max-w-7xl mx-auto pb-24 text-muted-foreground">
          No projects published yet - check back soon.
        </p>
      )}
    </SiteShell>
  );
}

/* ---------- pieces ---------- */

function ProjectHeading({ project }: { project: Project }) {
  const hasImage = !!project.image_url?.trim();
  return (
    <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-end">
      <div className={hasImage ? "md:col-span-7" : "md:col-span-12"}>
        <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-primary">
          {project.label || "Project"}
        </span>
        <h2 className="font-display text-4xl md:text-6xl font-extrabold tracking-tighter mt-3 text-balance">
          {project.title}
        </h2>
      </div>
      {hasImage && (
        <div className="md:col-span-5">
          <SketchImage
            src={project.image_url}
            alt={project.title}
            variant={project.image_variant}
            className="aspect-[4/3] w-full"
            fill
            imgClassName="object-center"
          />
        </div>
      )}
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

/** Render a single body block - paragraph / bullets / subsections. */
function BlockRenderer({ block }: { block: ProjectBlock }) {
  if (block.type === "paragraph") {
    return (
      <div>
        {block.heading && (
          <h4 className="font-mono text-[11px] uppercase tracking-[0.22em] text-primary mb-4">
            {block.heading}
          </h4>
        )}
        <p className="text-base leading-relaxed text-muted-foreground">{block.body}</p>
      </div>
    );
  }

  if (block.type === "bullets") {
    return (
      <div>
        {block.heading && (
          <h4 className="font-mono text-[11px] uppercase tracking-[0.22em] text-primary mb-4">
            {block.heading}
          </h4>
        )}
        <BulletList items={block.items} />
      </div>
    );
  }

  // subsections
  return (
    <div>
      {block.heading && (
        <h4 className="font-mono text-[11px] uppercase tracking-[0.22em] text-primary mb-4">
          {block.heading}
        </h4>
      )}
      <div className="space-y-6">
        {block.items.map((s, i) => (
          <div key={i}>
            <h5 className="font-mono text-[11px] uppercase tracking-[0.22em] text-primary mb-3">
              {s.heading}
            </h5>
            <BulletList items={s.items} />
          </div>
        ))}
      </div>
    </div>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((it, i) => (
        <li key={i} className="flex items-start gap-3 text-foreground">
          <span className="mt-2 size-1.5 rounded-full bg-primary shrink-0" />
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}

function UpcomingCard({
  project,
  flip,
}: {
  project: Project;
  flip: boolean;
}) {
  const hasImage = !!project.image_url?.trim();
  return (
    <article
      className={
        "border-2 border-ink pencil-shadow bg-card overflow-hidden grid gap-0 " +
        (hasImage ? "md:grid-cols-12" : "md:grid-cols-1")
      }
    >
      {hasImage && (
        <div
          className={
            "md:col-span-5 p-5 md:p-6 " + (flip ? "md:order-2" : "md:order-1")
          }
        >
          <SketchImage
            src={project.image_url}
            alt={project.title}
            variant={flip ? "alt" : "default"}
            className="aspect-[4/3] w-full"
            fill
            imgClassName="object-center"
          />
        </div>
      )}
      <div
        className={
          (hasImage
            ? "md:col-span-7 " + (flip ? "md:order-1" : "md:order-2") + " "
            : "") +
          "p-6 sm:p-8 md:py-10 md:px-10 min-w-0"
        }
      >
        {project.label && (
          <span className="font-mono text-5xl md:text-6xl text-primary font-extrabold leading-none">
            {project.label}
          </span>
        )}
        <h3 className="font-display text-2xl md:text-3xl font-extrabold tracking-tight mt-3 mb-6 text-balance">
          {project.title}
        </h3>
        {project.blocks.map((b, j) => (
          <div key={j} className={j > 0 ? "mt-6" : ""}>
            <BlockRenderer block={b} />
          </div>
        ))}
      </div>
    </article>
  );
}
