import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { Check, Package, ShieldCheck, Truck } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { BUSINESS_STRENGTHS, COMPANY, WHY_CHOOSE_MIB } from "@/data/company";

export const Route = createFileRoute("/why-choose-us")({
  head: () => ({
    meta: [
      { title: "Why Choose MIB | M. Irfan Brothers" },
      {
        name: "description",
        content:
          "Premium-quality steel material options, an extensive product range under one roof, stainless steel special grades, competitive market pricing, professional dealings and nationwide delivery arrangements.",
      },
      { property: "og:title", content: "Why Choose MIB | M. Irfan Brothers" },
      {
        property: "og:description",
        content:
          "Customer-focused services, industrial and commercial product solutions, strong business relationships and commitment to continuous improvement.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: WhyChooseUsPage,
});

const STRENGTH_ICONS = [ShieldCheck, Package, Truck];

function WhyChooseUsPage() {
  return (
    <>
      <PageHero
        eyebrow="Why Choose Us"
        title="Why Choose MIB?"
        description="Ten reasons customers across Pakistan choose M. Irfan Brothers for steel and stainless-steel material supply."
      />

      {/* 10 reasons */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {WHY_CHOOSE_MIB.map((point, i) => (
              <Reveal key={point} delay={Math.min(i * 0.06, 0.4)}>
                <div className="flex h-full items-start gap-4 rounded-2xl border border-border bg-card p-5 transition-all duration-500 hover:-translate-y-1 hover:border-primary/40">
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                    <Check className="h-4 w-4" />
                  </span>
                  <div>
                    <span className="font-display text-xs font-bold tracking-widest text-primary/60">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="mt-1 text-sm font-medium leading-relaxed text-foreground/90">
                      {point}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Strengths */}
      <section className="border-y border-border bg-navy-deep/60 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="Quality Management"
            title="Quality Management & Business Strengths"
          />
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {BUSINESS_STRENGTHS.map((strength, i) => {
              const Icon = STRENGTH_ICONS[i % STRENGTH_ICONS.length];
              return (
                <Reveal key={strength.title} delay={i * 0.1}>
                  <div className="h-full rounded-2xl border border-border bg-card p-7">
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 text-primary">
                      <Icon className="h-6 w-6" />
                    </span>
                    <h3 className="mt-5 font-display text-lg font-semibold text-foreground">
                      {strength.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {strength.description}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Commitment */}
      <section className="relative overflow-hidden py-20 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <Reveal>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Our Commitment
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              {COMPANY.tagline}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Thank You for Your Trust & Cooperation.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-4">
              <Link
                to="/contact"
                className="rounded-lg bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-black/30 transition-transform hover:scale-[1.03]"
              >
                Get a Quote
              </Link>
              <Link
                to="/products"
                className="rounded-lg border border-border px-7 py-3 text-sm font-semibold text-foreground transition-colors hover:border-primary/50 hover:text-primary"
              >
                Explore Our Products
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
