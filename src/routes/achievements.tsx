import { createFileRoute, Link } from "@tanstack/react-router";
import { Award } from "lucide-react";
import { SiteShell } from "@/components/SiteShell";

export const Route = createFileRoute("/achievements")({
  head: () => ({
    meta: [
      { title: "Achievements — Indu Sah Foundation" },
      {
        name: "description",
        content:
          "Letters of appreciation and certificates received by Indu Sah Foundation from municipalities and partner organizations across Nepal.",
      },
    ],
  }),
  component: AchievementsPage,
});

// Each entry has a `slot` ID — drop the actual certificate scan into
// public/certificates/<slot>.jpg (or .png) and it'll render in the sketch frame.
// Until you upload one, the slot shows a hand-drawn placeholder.
const recognitions = [
  {
    slot: "netrawati",
    title: "Letter of Appreciation",
    org: "Netrawati Dabajong Municipality",
    place: "Dhading, Nepal",
    body:
      "Awarded for ISF's contribution to free dental treatment camps held in Katunje, Netrawati Dabajong in service of the local community.",
  },
  {
    slot: "ganga-jamuna",
    title: "Letter of Appreciation — Dental Treatment Camp Project",
    org: "Ganga Jamuna Municipality",
    place: "Phulakharka, Dhading, Nepal",
    body:
      "Recognition for the Dental Treatment Camp delivered to families in Phulakharka, Ganga Jamuna. The Indu Sah Foundation continues to plan further services for the communities of Ganga Jamuna.",
  },
  {
    slot: "karmalaya",
    title: "Letter of Recognition",
    org: "Karmalaya Foundation",
    place: "Nepal",
    body:
      "Acknowledged for ongoing humanitarian and healthcare work serving underserved communities across remote Nepal.",
  },
];

function AchievementsPage() {
  return (
    <SiteShell>
      <header className="px-6 pt-16 pb-12 max-w-7xl mx-auto">
        <span className="font-mono text-primary text-xs uppercase tracking-[0.2em]">
          Achievements
        </span>
        <h1 className="font-display text-5xl md:text-7xl font-extrabold tracking-tighter mt-4 text-balance max-w-4xl">
          Recognized by the communities we serve.
        </h1>
      </header>

      <section className="px-6 max-w-7xl mx-auto pb-20 sm:pb-24">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {recognitions.map((r) => (
            <CertificateCard key={r.slot} {...r} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border py-16 sm:py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-tighter mb-6 text-balance">
            See the work behind the recognition.
          </h2>
          <div className="flex justify-center gap-3 flex-wrap">
            <Link
              to="/events"
              className="bg-primary text-primary-foreground px-7 py-4 font-mono text-[11px] uppercase tracking-[0.2em] hover:brightness-110 transition-all"
            >
              Projects →
            </Link>
            <Link
              to="/gallery"
              className="border border-ink px-7 py-4 font-mono text-[11px] uppercase tracking-[0.2em] hover:bg-ink hover:text-cream transition-all"
            >
              What we do · Gallery
            </Link>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}

function CertificateCard({
  slot,
  title,
  org,
  place,
  body,
}: {
  slot: string;
  title: string;
  org: string;
  place: string;
  body: string;
}) {
  // Looks for /public/certificates/<slot>.jpg first; falls back to .png.
  // If neither exists, the broken-image fires onError and we show a sketched
  // placeholder instead.
  return (
    <article className="flex flex-col">
      {/* "Sketchbook" frame for the certificate scan.
          Uses warm cream background + offset accent rectangle (the pencil
          drawing style of the rest of the site). */}
      <div className="relative">
        {/* Offset shadow rectangle — colored-pencil accent */}
        <div
          aria-hidden
          className="absolute inset-0 translate-x-2 translate-y-2 bg-primary/15 border border-primary/30 rounded-sm pointer-events-none"
        />
        <div className="relative aspect-[4/5] bg-cream border border-ink/20 rounded-sm overflow-hidden">
          <img
            src={`/certificates/${slot}.jpg`}
            alt={`${title} — ${org}`}
            loading="lazy"
            className="w-full h-full object-contain p-3"
            onError={(e) => {
              const t = e.currentTarget;
              // Try .png, then hide the img and reveal the placeholder.
              if (t.dataset.tried !== "png") {
                t.dataset.tried = "png";
                t.src = `/certificates/${slot}.png`;
              } else {
                t.style.display = "none";
              }
            }}
          />
          {/* Hand-drawn placeholder shown if the real image isn't uploaded yet */}
          <div className="absolute inset-0 -z-10 grid place-items-center px-6 text-center">
            <div>
              <Award size={36} className="mx-auto text-primary/70 mb-3" />
              <p className="font-display font-bold text-sm tracking-tight text-foreground/70">
                Certificate
              </p>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground mt-2">
                Upload /certificates/{slot}.jpg
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Caption */}
      <div className="pt-6">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          {place}
        </span>
        <h3 className="font-display text-lg sm:text-xl font-extrabold tracking-tight mt-1">
          {org}
        </h3>
        <p className="mt-2 font-display font-semibold text-foreground/85">
          {title}
        </p>
        <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
          {body}
        </p>
      </div>
    </article>
  );
}
