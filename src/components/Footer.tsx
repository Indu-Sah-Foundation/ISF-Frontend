import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Twitter } from "lucide-react";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="border-t border-border mt-32">
      <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-12 gap-10 md:gap-16">
        <div className="md:col-span-5 space-y-4">
          <Logo />
          <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
            For better health and education.
          </p>
        </div>

        <FooterCol
          className="md:col-span-3"
          title="Explore"
          links={[
            { to: "/about", label: "About" },
            { to: "/gallery", label: "Gallery" },
            { to: "/events", label: "Projects" },
            { to: "/stories", label: "Letters" },
            { to: "/achievements", label: "Achievements" },
            { to: "/volunteers", label: "Volunteers" },
            { to: "/contact", label: "Contact" },
            { to: "/donate", label: "Donate" },
          ]}
        />

        <div className="md:col-span-4 space-y-5">
          <h4 className="font-mono text-[10px] uppercase text-muted-foreground tracking-[0.2em]">
            Connect
          </h4>
          <p className="text-sm">
            <a
              href="mailto:indusahfoundation@gmail.com"
              className="hover:text-primary transition-colors"
            >
              indusahfoundation@gmail.com
            </a>
          </p>
          <div className="flex gap-5 pt-1">
            <a
              href="https://www.facebook.com/indusahfoundation/"
              aria-label="Facebook"
              target="_blank"
              rel="noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Facebook size={18} />
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Instagram size={18} />
            </a>
            <a
              href="#"
              aria-label="Twitter"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Twitter size={18} />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row gap-2 justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          <p>© {new Date().getFullYear()} Indu Sah Foundation</p>
          <p>Loharpatti · Mahottari · Nepal</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
  className,
}: {
  title: string;
  links: { to: string; label: string }[];
  className?: string;
}) {
  return (
    <div className={`space-y-5 ${className ?? ""}`}>
      <h4 className="font-mono text-[10px] uppercase text-muted-foreground tracking-[0.2em]">
        {title}
      </h4>
      <ul className="space-y-3 text-sm">
        {links.map((l, i) => (
          <li key={i}>
            <Link to={l.to} className="hover:text-primary transition-colors">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
