import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { BrandLogo } from "@/components/BrandLogo";
import { COMPANY } from "@/data/company";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/about" },
  { label: "Products", to: "/products" },
  { label: "Industries", to: "/industries" },
  { label: "Business Associates", to: "/associates" },
  { label: "Why Choose Us", to: "/why-choose-us" },
  { label: "Contact Us", to: "/contact" },
] as const;

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header className={cn(
      "fixed inset-x-0 top-0 z-70 w-full transition-all duration-500 bg-background",
      scrolled
        ? "border-b shadow-lg shadow-black/20"
        : "border-b border-transparent",

    )}>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:h-20 sm:px-6">
        <Link to="/" className="flex shrink-0 items-center" aria-label="Muhammad Irfans Brothers – Home">
          <BrandLogo />
        </Link>

        <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Main navigation">
          {NAV_LINKS.map((link) => {
            const active =
              link.to === "/" ? pathname === "/" : pathname.startsWith(link.to);
            return (
              <Link
                key={link.to}
                to={link.to}
                className={cn(
                  "relative rounded-md px-2 py-2 text-sm font-medium transition-colors xl:px-2.5",
                  active
                    ? "text-primary"
                    : "text-foreground/80 hover:text-foreground",
                )}
              >
                {link.label}
                {active ? (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-primary"
                  />
                ) : null}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="rounded-lg border border-border p-2 text-foreground z-50 lg:hidden"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.25 }}
              className="fixed top-0 right-0 z-50 h-full w-4/5 max-w-sm bg-background/95 backdrop-blur-md shadow-2xl overflow-y-auto border-l border-border"
            >
              <nav className="flex flex-col min-h-full p-6" aria-label="Mobile navigation">
                <div className="flex items-center justify-between pb-6 mb-4 border-b border-border">
                  <span className="font-semibold text-foreground text-sm tracking-wide uppercase">Menu</span>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="rounded-lg p-2 text-foreground/80 hover:text-foreground hover:bg-accent transition-colors"
                    aria-label="Close menu"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <div className="flex flex-col gap-1">
                  {NAV_LINKS.map((link) => {
                    const active =
                      link.to === "/" ? pathname === "/" : pathname.startsWith(link.to);
                    return (
                      <Link
                        key={link.to}
                        to={link.to}
                        className={cn(
                          "rounded-lg px-4 py-3 text-base font-medium transition-colors",
                          active
                            ? "bg-primary/10 text-primary font-semibold"
                            : "text-foreground/90 hover:bg-accent hover:text-foreground"
                        )}
                        onClick={() => setOpen(false)}
                      >
                        {link.label}
                      </Link>
                    );
                  })}
                </div>
                <div className="mt-auto pt-8">
                  <Link
                    to="/contact"
                    className="block w-full rounded-xl bg-primary py-3.5 text-center text-sm font-semibold text-primary-foreground shadow-lg hover:bg-primary/90 transition-colors"
                    onClick={() => setOpen(false)}
                  >
                    Get a Quote
                  </Link>
                </div>
              </nav>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </header>
  );
}
