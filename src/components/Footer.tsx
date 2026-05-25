import { Facebook, Mail, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border mt-32">
      {/* Phone numbers intentionally omitted here — they live on the
          /contact page only, to keep the footer compact and avoid
          duplicating the same info on every page of the site. */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid sm:grid-cols-3 gap-10">
        <div className="space-y-3">
          <h4 className="font-mono text-[10px] uppercase text-muted-foreground tracking-[0.2em]">
            Head Office
          </h4>
          <p className="text-sm flex items-start gap-2">
            <MapPin size={16} className="mt-0.5 text-primary shrink-0" />
            <span>Loharpatti–2, Mahottari<br />Province 2, Nepal</span>
          </p>
        </div>
        <div className="space-y-3">
          <h4 className="font-mono text-[10px] uppercase text-muted-foreground tracking-[0.2em]">
            Branch Office
          </h4>
          <p className="text-sm flex items-start gap-2">
            <MapPin size={16} className="mt-0.5 text-primary shrink-0" />
            <span>Hadigau–5, Kathmandu, Nepal</span>
          </p>
        </div>
        <div className="space-y-3">
          <h4 className="font-mono text-[10px] uppercase text-muted-foreground tracking-[0.2em]">
            Connect
          </h4>
          <a
            href="mailto:indusahfoundation@gmail.com"
            className="flex items-start gap-2 text-sm hover:text-primary"
          >
            <Mail size={16} className="mt-0.5 text-primary shrink-0" />
            <span className="break-all">indusahfoundation@gmail.com</span>
          </a>
          <a
            href="https://www.facebook.com/indusahfoundation/"
            aria-label="Facebook"
            target="_blank"
            rel="noreferrer"
            className="flex items-start gap-2 text-sm text-muted-foreground hover:text-primary"
          >
            <Facebook size={16} className="mt-0.5 text-primary shrink-0" />
            facebook.com/indusahfoundation
          </a>
        </div>
      </div>

      <div className="border-t border-border bg-secondary/30">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row gap-3 justify-between font-display text-base md:text-lg font-semibold tracking-tight">
          <p>© {new Date().getFullYear()} Indu Sah Foundation</p>
          <p className="text-muted-foreground">Loharpatti · Mahottari · Nepal</p>
        </div>
      </div>
    </footer>
  );
}
