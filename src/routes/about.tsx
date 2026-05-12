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
          "Indu Sah Foundation: a Nepal-based non-profit established December 24, 2018 by Lal Sah and Dr. Vijay Sah for the health and education of underprivileged children.",
      },
      { property: "og:title", content: "About — Indu Sah Foundation" },
    ],
  }),
  component: AboutPage,
});

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
    bio: "Dr. Vijay Sah is a Dental Surgeon who practices research-based dentistry in Nepal. Dr. Sah believes that serving as a healthcare professional is the most honorable profession one can have, and dentistry is one of the best ways to bring a smile to your face, which we all seek through various activities. He has been involved in many dentistry studies and continues working hard to upgrade dental education through research and volunteering. In addition to his mainstream profession, he founded the Indu Sah Foundation, a nonprofit in Nepal, which works for the underserved to enhance their healthcare and education. Dr. Sah leads the foundation's efforts to promote the Healthcare and Education of all the people under the poverty line in Nepal & around the world.",
    motto: "Stay Humble!",
  },
  {
    name: "Shubham Sah",
    role: "President · CEO",
    extras:
      "FTC Documentation Lead, Rotary Club of Waukee · Highschool Student",
    bio: "Shubham Sah is a high school student who believes that helping others is a must. He has competed in and succeeded in global competitions like FIRST Tech Challenge, and FIRST Lego League. He is strongly passionate about community service, with over 150+ hours at his local food pantry, and he serves as a presidential assistant at the Rotary Club of Waukee. He leads and organizes educational projects like ISF Robotics.",
  },
];

const advisoryIntl = [
  {
    name: "Dr. Amit Saini",
    role: "Dental Surgeon, Punjab, India",
    extras:
      "Karmaveer Chakra, 2012 · Founder/President: Global Oral Health Foundation Society",
    bio: "",
  },
  {
    name: "Dr. Arne Drews, MD",
    role: "Co-founder, NepalMed · Germany",
    bio: "Arne grew up in Germany and attained his medical degree at the University of Leipzig in 1997. Working in teaching hospitals for ten years, he specialized in respiratory medicine and occupational medicine. Since 2008, he has been working as a physician in his private practice. In 2000, he co-founded NepalMed, a non-profit organization, supporting Nepalese activities in healthcare. Besides continuous medical, dental, and veterinary projects in several districts of Nepal, NepalMed also invests in related infrastructure like road access, clean water, oxygen production as well as disaster relief, and even developed the Gorkha Heritage Trek. Arne is the author of six Nepal mystery books, available in German, English, and Nepali. Revenue of the sales goes into the charity work. Further info: nepalmed.de",
  },
  {
    name: "Dr. Darren Weiss, BDS",
    role: "Head, Humble Smile Foundation",
    bio: "Darren grew up in Australia and attained his Bachelor of Dental Science from the University of Melbourne in 1989. After 2 years in private practice, Darren relocated to Israel where he continued to practice private dentistry for another 20 years. In 2011 Darren sold his practice and embarked on a new career as a corporate oral health promotion consultant, first at Procter & Gamble, and since 2015 at The Humble Co. Today Darren heads the Humble Smile Foundation, a non-profit organization of health and development professionals committed to helping people in the most vulnerable areas of the world to care for themselves. The organization has staff in South Africa, India, Sweden, Italy, and Israel and over 120 active members globally. To date, Humble Smile Foundation has promoted healthy lifestyles in over 80 projects in 47 countries. Further info: humblesmile.org",
  },
  {
    name: "Dr. Stephen Forrest, DDS",
    role: "Family, Cosmetic, and Implant Dentist",
    extras: "Berkshire Dental, Clive, IA, USA",
    bio: "",
  },
];

const advisoryNat = [
  {
    name: "Dr. Pravin Shah",
    role: "Consultant Orthodontist, Nepal",
    bio: "",
  },
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
      <header className="px-6 pt-16 pb-12 max-w-5xl mx-auto">
        <span className="font-mono text-primary text-xs uppercase tracking-[0.2em]">
          About Us
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
      <section className="px-6 max-w-3xl mx-auto py-20 sm:py-24 space-y-6 text-base sm:text-lg leading-relaxed text-pretty">
        <h2 className="font-mono text-[11px] uppercase tracking-[0.25em] text-primary">
          Our Mission
        </h2>
        <p>
          Indu Sah Foundation is an emerging non-profit organization established
          on December 24, 2018, registered under section 4 of act 2034 of The
          Government of Nepal, and affiliated with the Social Welfare Council.
          We are based in Loharpatti, Mahottari, Nepal which is 250 kilometers
          south of Kathmandu, the capital city of Nepal, and 7 kilometers west
          of Janakpur Dham, the capital city of Province 2, Nepal.
        </p>
        <p>
          The organization is a nonprofit making, non-religious, non-political,
          and non-governmental organization. The organization works for health,
          education, livelihood, water, sanitation, and hygiene as well as
          construction, gender equality and social inclusion, human rights, and
          governance through operation, research, advocacy, and capacity
          enhancement.
        </p>
        <p className="font-display text-xl sm:text-2xl font-semibold tracking-tight border-l-4 border-primary pl-6 italic">
          The Core Mission of the Indu Sah Foundation is to help underprivileged
          children for better health and education.
        </p>
      </section>

      {/* Letter from Founders */}
      <section className="border-t border-border bg-secondary/40 py-20 sm:py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-mono text-[11px] uppercase tracking-[0.25em] text-primary mb-6">
            Letter from Founders
          </h2>
          <div className="space-y-6 text-base sm:text-lg leading-relaxed text-pretty">
            <p>
              My brother and I were discussing doing some charity work in the
              school where we were once students in high school. I had a thought
              about charity from the very beginning of my childhood. I used to
              feel happier throughout the day when I used to get many chances
              to do things for the disadvantaged community in my village
              Madhepura. We lost our mother in our childhood so I proposed the
              idea of Indu Sah (our late mother) Foundation (ISF).
            </p>
            <p>
              We agreed on healthcare and education. Our foundation is teaming
              up with multiple helping hands, foundations, donors, and human
              resources in Nepal and around the world to take on some tough
              challenges: better healthcare and education for all the
              resourceless people under the extreme poverty line in every
              region of Nepal. Our vision is to help people all around the
              world. We focus on only a few issues because we think that's the
              best way to have a great impact, and we focus on these issues in
              particular because we think they are the biggest barriers that
              prevent people from making the most of their lives.
            </p>
            <p>
              The core strategy of our foundation will be promoting health, and
              providing health education for a better future for the family,
              and the children in Nepal. We started from southern Nepal,
              Mahottari, where we grew up. As we learn which bets pay off, we
              must adjust our strategies and share the results so everyone can
              benefit.
            </p>
            <p>
              We're optimistic and believe deeply in philanthropy. We believe
              by doing these things — promoting, and educating for better
              health — we can help every person get the chance to live a
              healthy and productive life.
            </p>
            <p className="font-display font-semibold pt-4">
              — Lal Sah &amp; Dr. Vijay Sah, <span className="text-muted-foreground">Founders</span>
            </p>
          </div>
        </div>
      </section>

      {/* From the President */}
      <section className="py-20 sm:py-24 px-6 max-w-3xl mx-auto">
        <h2 className="font-mono text-[11px] uppercase tracking-[0.25em] text-primary mb-6">
          From the President
        </h2>
        <div className="space-y-6 text-base sm:text-lg leading-relaxed text-pretty">
          <p>
            I have had life-changing experiences through programs like FIRST,
            which I joined when I was 8 years old, in which I learned many
            essential soft and technical skills that have profoundly impacted
            who I am today. I want to bring this program and others like it to
            the less fortunate to give them the same life-changing experience.
          </p>
          <p>
            With the help of my Uncle and Father, I want to make the lives of
            others better through health and education.
          </p>
          <p className="font-display font-semibold pt-4">
            — Shubham Sah, <span className="text-muted-foreground">President &amp; CEO</span>
          </p>
        </div>
      </section>

      {/* Leadership · Founders */}
      <section className="border-t border-border py-20 sm:py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-mono text-[11px] uppercase tracking-[0.25em] text-primary mb-3">
            Leadership
          </h2>
          <h3 className="font-display text-2xl font-extrabold tracking-tight mb-10">
            Founders
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {founders.map((f) => (
              <article
                key={f.name}
                className="border border-border bg-card p-6 sm:p-8"
              >
                <h4 className="font-display text-xl sm:text-2xl font-extrabold tracking-tight">
                  {f.name}
                </h4>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary mt-1 mb-3">
                  {f.role}
                </p>
                {f.extras && (
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground mb-4">
                    {f.extras}
                  </p>
                )}
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
      <section className="border-t border-border bg-secondary/40 py-20 sm:py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-mono text-[11px] uppercase tracking-[0.25em] text-primary mb-3">
            Advisory Board
          </h2>

          <h3 className="font-display text-xl font-extrabold tracking-tight mb-6 mt-6">
            International
          </h3>
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {advisoryIntl.map((p) => (
              <PersonCard key={p.name} {...p} />
            ))}
          </div>

          <h3 className="font-display text-xl font-extrabold tracking-tight mb-6">
            National
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {advisoryNat.map((p) => (
              <PersonCard key={p.name} {...p} />
            ))}
          </div>
        </div>
      </section>

      {/* Board Members */}
      <section className="py-20 sm:py-24 px-6 max-w-5xl mx-auto">
        <h2 className="font-mono text-[11px] uppercase tracking-[0.25em] text-primary mb-10">
          Board Members
        </h2>
        <ul className="border-t border-border divide-y divide-border">
          {board.map((b) => (
            <li
              key={b.name + b.role}
              className="py-5 flex items-start sm:items-center justify-between gap-4 flex-col sm:flex-row"
            >
              <span className="font-display text-base sm:text-lg font-bold tracking-tight">
                {b.name}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground sm:text-right">
                {b.role}
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* CTA */}
      <section className="border-t border-border py-16 sm:py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-3xl md:text-5xl font-extrabold tracking-tighter mb-6 text-balance">
            Become part of the work.
          </h2>
          <div className="flex justify-center gap-3 flex-wrap">
            <Link
              to="/donate"
              className="bg-primary text-primary-foreground px-7 sm:px-8 py-4 font-mono text-[11px] uppercase tracking-[0.2em] hover:brightness-110 transition-all"
            >
              Donate
            </Link>
            <Link
              to="/contact"
              className="border border-ink px-7 sm:px-8 py-4 font-mono text-[11px] uppercase tracking-[0.2em] hover:bg-ink hover:text-cream transition-colors"
            >
              Contact us
            </Link>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}

function PersonCard({
  name,
  role,
  extras,
  bio,
}: {
  name: string;
  role: string;
  extras?: string;
  bio?: string;
}) {
  return (
    <article className="border border-border bg-card p-6 sm:p-8">
      <h4 className="font-display text-lg sm:text-xl font-extrabold tracking-tight">
        {name}
      </h4>
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary mt-1">
        {role}
      </p>
      {extras && (
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground mt-1">
          {extras}
        </p>
      )}
      {bio && (
        <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
          {bio}
        </p>
      )}
    </article>
  );
}
