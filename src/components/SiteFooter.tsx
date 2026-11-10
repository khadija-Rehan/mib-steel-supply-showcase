import { Link } from "@tanstack/react-router";
import { BrandLogo } from "@/components/BrandLogo";
import { COMPANY } from "@/data/company";

const QUICK_LINKS = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/about" },
  { label: "Products", to: "/products" },
  { label: "Industries", to: "/industries" },
  { label: "Business Associates", to: "/associates" },
  { label: "Contact Us", to: "/contact" },
] as const;

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-navy-deep">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3">
        <div>
          <div className="flex flex-col items-start gap-3">
            <Link to="/" aria-label="Muhammad Irfans Brothers – Home">
              <BrandLogo
                iconClassName="h-10 sm:h-11"
                textClassName="text-[13px] sm:text-sm"
              />
            </Link>
            <div className="leading-tight">
              <p className="text-xs text-muted-foreground">
                Steel Trading & Industrial Material Supply
              </p>
            </div>
          </div>
          <p className="mt-5 text-sm font-medium text-primary">
            {COMPANY.tagline}
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            {COMPANY.location}
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold tracking-[0.2em] text-foreground uppercase">
            Quick Links
          </h3>
          <ul className="mt-5 space-y-2.5">
            {QUICK_LINKS.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold tracking-[0.2em] text-foreground uppercase">
            Contact Details
          </h3>
          <ul className="mt-5 space-y-3.5 text-sm">
            <li>
              <a
                href={COMPANY.phoneHref}
                className="flex items-center gap-3 text-muted-foreground transition-colors hover:text-primary"
              >

                {COMPANY.phoneDisplay}
              </a>
            </li>
            <li>
              <a
                href={COMPANY.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-muted-foreground transition-colors hover:text-primary"
              >

                WhatsApp: {COMPANY.phoneDisplay}
              </a>
            </li>
            <li>
              <a
                href={COMPANY.emailHref}
                className="flex items-center gap-3 break-all text-muted-foreground transition-colors hover:text-primary"
              >
                <Mail className="h-4 w-4 shrink-0 text-primary" />
                {COMPANY.email}
              </a>
            </li>
            <li>
              <a
                href={COMPANY.mapsHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 text-muted-foreground transition-colors hover:text-primary"
              >
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>
                  {COMPANY.addressLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-5 text-xs text-muted-foreground sm:flex-row sm:px-6">
          <p>© {new Date().getFullYear()} M. Irfan Brothers (MIB). All rights reserved.</p>
          <div className="flex gap-4">
            {COMPANY.registrations.map((reg) => (
              <span key={reg.label}>
                {reg.label}: {reg.value}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
