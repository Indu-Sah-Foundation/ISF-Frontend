import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { SiteShell } from "@/components/SiteShell";
import { api, ApiError } from "@/lib/api";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact - Indu Sah Foundation" },
      {
        name: "description",
        content:
          "Get in touch with Indu Sah Foundation - partnerships, press, and program inquiries.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await api.sendContact({ email, message });
      setSent(true);
      setEmail("");
      setMessage("");
    } catch (err: unknown) {
      // 404 = endpoint not deployed yet, or the backend doesn't know
      // about /contacts. Give a clearer note than the generic "we
      // couldn't find what you were looking for" copy.
      if (err instanceof ApiError && err.status === 404) {
        setError(
          "Our message form is temporarily unavailable. Please email indusahfoundation@gmail.com directly.",
        );
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(
          "Something went wrong sending your message. Please try again.",
        );
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SiteShell hideFooter>
      <header className="px-6 pt-10 sm:pt-16 pb-12 max-w-7xl mx-auto">
        <span className="font-mono text-primary text-xs uppercase tracking-[0.2em]">
          Contact
        </span>
        <h1 className="font-display text-5xl md:text-7xl font-extrabold tracking-tighter mt-4 mb-6 text-balance">
          Get <span className="pencil-underline">involved</span>.
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
              Email
            </h3>
            <p className="font-display text-lg flex items-center gap-3">
              <Mail size={18} className="text-primary shrink-0" />
              <a href="mailto:indusahfoundation@gmail.com" className="underline underline-offset-4 decoration-primary break-all">
                indusahfoundation@gmail.com
              </a>
            </p>
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
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="border border-destructive/40 bg-destructive/5 text-destructive text-sm px-4 py-3 font-mono">
                  {error}
                </div>
              )}
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
                disabled={submitting}
                className="bg-primary text-primary-foreground px-8 py-4 font-display font-extrabold uppercase tracking-[0.2em] text-xs hover:brightness-110 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submitting ? "Sending…" : "Send message"}
              </button>
            </form>
          )}
        </div>
      </section>
    </SiteShell>
  );
}
