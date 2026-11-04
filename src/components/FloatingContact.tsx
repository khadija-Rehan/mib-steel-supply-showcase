import { Link } from "@tanstack/react-router";
import { Mail, MessageCircle, Phone } from "lucide-react";
import { COMPANY } from "@/data/company";

/** Floating WhatsApp + quick contact actions, visible on every page. */
export function FloatingContact() {
  return (
    <div className="fixed right-4 bottom-4 z-50 flex flex-col items-end gap-2.5 sm:right-6 sm:bottom-6">
      <a
        href={COMPANY.emailHref}
        aria-label="Email M. Irfan Brothers"
        className="glass-panel flex h-11 w-11 items-center justify-center rounded-full text-foreground shadow-lg transition-transform hover:scale-110"
      >
        <Mail className="h-5 w-5 text-primary" />
      </a>
      <a
        href={COMPANY.phoneHref}
        aria-label={`Call ${COMPANY.phoneDisplay}`}
        className="glass-panel flex h-11 w-11 items-center justify-center rounded-full text-foreground shadow-lg transition-transform hover:scale-110"
      >
        <Phone className="h-5 w-5 text-primary" />
      </a>
      <Link
        to="/contact"
        className="rounded-full bg-primary px-4 py-2.5 text-xs font-semibold text-primary-foreground shadow-lg shadow-black/30 transition-transform hover:scale-105 sm:hidden"
      >
        Get a Quote
      </Link>
      <a
        href={COMPANY.whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-xl shadow-black/40 transition-transform hover:scale-110"
      >
        <MessageCircle className="h-7 w-7" />
      </a>
    </div>
  );
}
