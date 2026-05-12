import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, MapPin, Phone, User } from "lucide-react";
import { SiteShell } from "@/components/SiteShell";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Indu Sah Foundation" },
      {
        name: "description",
        content:
          "Get in touch with Indu Sah Foundation — partnerships, press, and program inquiries.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <SiteShell>
      <header className="px-6 pt-20 pb-12 max-w-7xl mx-auto">
        <span className="font-mono text-primary text-xs uppercase tracking-[0.2em]">
          Contact
        </span>
        <h1 className="font-display text-5xl md:text-7xl font-extrabold tracking-tighter mt-4 mb-6 text-balance">
          Let's talk.
        </h1>
      </header>

      <section className="px-6 max-w-7xl mx-auto pb-24 grid md:grid-cols-12 gap-12">
        <aside className="md:col-span-4 space-y-10">
          <div>
            <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground mb-3">
              Head Office
            </h3>
            <p className="font-display text-lg flex items-start gap-3">
              <MapPin size={18} className="mt-1 text-primary shrink-0" />
              <span>
                Loharpatti–2, Mahottari
                <br />
                Province 2, Nepal
              </span>
            </p>
          </div>
          <div>
            <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground mb-3">
              Branch Office
            </h3>
            <p className="font-display text-lg flex items-start gap-3">
              <MapPin size={18} className="mt-1 text-primary shrink-0" />
              <span>Hadigau–5, Kathmandu, Nepal</span>
            </p>
          </div>
          <div>
            <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground mb-3">
              Phone
            </h3>
            <p className="font-display text-lg flex items-center gap-3">
              <Phone size={18} className="text-primary shrink-0" />
              <span>
                <a href="tel:+9779841256519" className="hover:text-primary">+977-9841256519</a>
                <br />
                <a href="tel:+9779805171027" className="hover:text-primary">+977-9805171027</a>
                <span className="block text-xs font-mono text-muted-foreground mt-1">
                  WhatsApp / Viber: +977-9805171027
                </span>
              </span>
            </p>
          </div>
          <div>
            <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground mb-3">
              Email
            </h3>
            <p className="font-display text-lg flex items-center gap-3">
              <Mail size={18} className="text-primary shrink-0" />
              <a href="mailto:indusahfoundation@gmail.com" className="underline underline-offset-4 decoration-primary break-all">
                indusahfoundation@gmail.com
              </a>
            </p>
          </div>
          <div>
            <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground mb-3">
              Founders
            </h3>
            <ul className="space-y-3 font-display">
              <li className="flex items-start gap-3">
                <User size={18} className="mt-1 text-primary shrink-0" />
                <span>
                  Dr. Vijay Sah
                  <span className="block text-xs font-mono text-muted-foreground">
                    President & Executive Director
                  </span>
                </span>
              </li>
              <li className="flex items-start gap-3">
                <User size={18} className="mt-1 text-primary shrink-0" />
                <span>
                  Lal Babu Sah
                  <span className="block text-xs font-mono text-muted-foreground">
                    Co-founder
                  </span>
                </span>
              </li>
            </ul>
          </div>
        </aside>

        <div className="md:col-span-8">
          {sent ? (
            <div className="bg-secondary p-12 text-center border border-border">
              <h2 className="font-display text-3xl font-extrabold mb-3">
                Thank you.
              </h2>
              <p className="text-muted-foreground">
                We've received your note and will be in touch soon.
              </p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                // TODO: wire to backend mailing-list endpoint when available
                setSent(true);
              }}
              className="space-y-6"
            >
              <div>
                <label
                  htmlFor="email"
                  className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground mb-2 block"
                >
                  Your email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full py-3 px-4 bg-background border border-border focus:border-primary outline-none font-display"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground mb-2 block"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={8}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full py-3 px-4 bg-background border border-border focus:border-primary outline-none font-display resize-y"
                />
              </div>
              <button
                type="submit"
                className="bg-primary text-primary-foreground px-8 py-4 font-display font-extrabold uppercase tracking-[0.2em] text-xs hover:brightness-110 transition-all"
              >
                Send message
              </button>
            </form>
          )}
        </div>
      </section>
    </SiteShell>
  );
}
