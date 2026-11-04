import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { EnquiryForm } from "@/components/EnquiryForm";
import { Reveal } from "@/components/Reveal";
import { COMPANY } from "@/data/company";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us | M. Irfan Brothers (MIB)" },
      {
        name: "description",
        content:
          "Contact M. Irfan Brothers (MIB) — call +92 321 4454413, WhatsApp, email m.irfanbrothers786@gmail.com or visit Shop No. 19-B, Corner Meco, Sheet Market, Landa Bazar, Lahore, Pakistan.",
      },
      { property: "og:title", content: "Contact Us | M. Irfan Brothers (MIB)" },
      {
        property: "og:description",
        content:
          "Get in touch for steel and stainless-steel material enquiries — phone, WhatsApp, email and our enquiry form.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const cards = [
    {
      icon: Phone,
      title: "Call Us",
      content: COMPANY.phoneDisplay,
      href: COMPANY.phoneHref,
      external: false,
      note: "Click to call our team directly",
    },
    {
      icon: MessageCircle,
      title: "WhatsApp",
      content: COMPANY.phoneDisplay,
      href: COMPANY.whatsappHref,
      external: true,
      note: "Chat with us on WhatsApp",
    },
    {
      icon: Mail,
      title: "Email",
      content: COMPANY.email,
      href: COMPANY.emailHref,
      external: false,
      note: "Send us your requirements by email",
    },
    {
      icon: MapPin,
      title: "Visit Us / Directions",
      content: COMPANY.addressLines.join(" "),
      href: COMPANY.mapsHref,
      external: true,
      note: "Open in Google Maps for directions",
    },
  ];

  return (
    <>
      <PageHero
        eyebrow="Contact Us"
        title="Get in Touch with M. Irfan Brothers"
        description="Reach our team by phone, WhatsApp or email, visit us at Landa Bazar, Lahore, or send your requirements through the enquiry form below."
      />

      <section className="py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-5">
          {/* Contact cards */}
          <div className="space-y-4 lg:col-span-2">
            {cards.map((card, i) => {
              const Icon = card.icon;
              return (
                <Reveal key={card.title} delay={i * 0.07}>
                  <a
                    href={card.href}
                    {...(card.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="group flex h-full items-start gap-4 rounded-2xl border border-border bg-card p-5 transition-all duration-500 hover:-translate-y-0.5 hover:border-primary/40"
                  >
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      <Icon className="h-6 w-6" />
                    </span>
                    <div className="min-w-0">
                      <h3 className="font-display text-base font-semibold text-foreground">
                        {card.title}
                      </h3>
                      <p className="mt-1 break-words text-sm font-medium text-foreground/90">
                        {card.content}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">{card.note}</p>
                    </div>
                  </a>
                </Reveal>
              );
            })}

            <Reveal delay={0.3}>
              <div className="glass-panel rounded-2xl p-5">
                <p className="text-xs font-semibold tracking-[0.2em] text-primary uppercase">
                  Company Registrations
                </p>
                <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
                  {COMPANY.registrations.map((reg) => (
                    <li key={reg.label}>
                      {reg.label}: <span className="font-medium text-foreground/90">{reg.value}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          {/* Enquiry form */}
          <div className="lg:col-span-3">
            <Reveal>
              <h2 className="font-display text-2xl font-bold tracking-tight text-foreground">
                Send an Enquiry
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Tell us what you need — our team will respond with suitable material
                solutions and pricing.
              </p>
              <div className="mt-6">
                <EnquiryForm />
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
