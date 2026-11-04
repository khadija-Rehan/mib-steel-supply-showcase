import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, BadgeCheck, Check } from "lucide-react";
import steelCoils from "@/assets/steel-coils.jpg";
import stainlessSheets from "@/assets/stainless-steel-sheets.jpg";
import steelPipes from "@/assets/steel-pipes.jpg";
import { HeroSection } from "@/components/hero/HeroSection";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import {
  ABOUT_PARAGRAPHS,
  BUSINESS_ASSOCIATES,
  COMPANY,
  WHY_CHOOSE_MIB,
} from "@/data/company";
import { CATEGORY_A, CATEGORY_B, CATEGORY_C } from "@/data/products";
import { INDUSTRIES, INDUSTRIES_INTRO } from "@/data/industries";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "M. Irfan Brothers (MIB) | Premium Steel Solutions. Built on Trust.",
      },
      {
        name: "description",
        content:
          "M. Irfan Brothers delivers quality steel and stainless-steel materials for construction, engineering, manufacturing, fabrication, food processing and industrial applications.",
      },
      {
        property: "og:title",
        content: "M. Irfan Brothers (MIB) | Premium Steel Solutions. Built on Trust.",
      },
      {
        property: "og:description",
        content:
          "Steel trading and industrial material supply in Lahore, Pakistan — stainless steel, sheets, coils, pipes, plates, galvanized products and structural steel.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const CATEGORY_CARDS = [
  { category: CATEGORY_A, image: steelCoils },
  { category: CATEGORY_B, image: stainlessSheets },
  { category: CATEGORY_C, image: steelPipes },
];

function Index() {
  return (
    <>
      <HeroSection />

      {/* About preview */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2">
          <Reveal>
            <p className="mb-3 text-xs font-semibold tracking-[0.3em] uppercase text-primary">
              About Us
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              About M. Irfan Brothers
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              {ABOUT_PARAGRAPHS[0]}
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              {ABOUT_PARAGRAPHS[3]}
            </p>
            <div className="mt-6 flex flex-wrap gap-2.5">
              {COMPANY.registrations.map((reg) => (
                <span
                  key={reg.label}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-medium text-foreground/90"
                >
                  <BadgeCheck className="h-3.5 w-3.5 text-primary" />
                  {reg.label}: {reg.value}
                </span>
              ))}
            </div>
            <Link
              to="/about"
              className="group mt-7 inline-flex items-center gap-2 text-sm font-semibold text-primary"
            >
              Read our full company profile
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>

          <Reveal delay={0.1} className="grid grid-cols-2 gap-4">
            <div className="rounded-2xl border border-border overflow-hidden">
              <img src={steelCoils} alt="Steel coils" loading="lazy" width={1280} height={854} className="h-40 w-full object-cover sm:h-56" />
            </div>
            <div className="rounded-2xl border border-border overflow-hidden mt-8">
              <img src={stainlessSheets} alt="Stainless steel sheets" loading="lazy" width={1280} height={854} className="h-40 w-full object-cover sm:h-56" />
            </div>
            <div className="rounded-2xl border border-border overflow-hidden">
              <img src={steelPipes} alt="MS pipes" loading="lazy" width={1280} height={854} className="h-40 w-full object-cover sm:h-56" />
            </div>
            <div className="glass-panel mt-8 flex flex-col justify-center rounded-2xl p-5">
              <p className="font-display text-2xl font-bold text-primary">{COMPANY.shortName}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Premium Quality. Nationwide Service. Trusted Partnerships.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Product categories */}
      <section className="border-y border-border bg-navy-deep/60 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="Our Products"
            title="A Complete Steel Product Range"
            description="From Hot Rolled Coils and MS Plates to Stainless Steel special grades, Structural Steel and Solar mounting materials — under one roof."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {CATEGORY_CARDS.map(({ category, image }, i) => (
              <Reveal key={category.id} delay={i * 0.1}>
                <Link
                  to="/products"
                  className="group block overflow-hidden rounded-2xl border border-border bg-card transition-all duration-500 hover:-translate-y-1.5 hover:border-primary/40"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={image}
                      alt={category.label}
                      loading="lazy"
                      width={1280}
                      height={854}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-lg font-semibold text-foreground">
                      {category.label}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {category.products.length} product lines
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                      View catalogue
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Industries preview */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading eyebrow="Industries" title="Industries We Serve" description={INDUSTRIES_INTRO} />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {INDUSTRIES.map((industry, i) => (
              <Reveal key={industry.name} delay={i * 0.08}>
                <Link
                  to="/industries"
                  className="group relative block h-56 overflow-hidden rounded-2xl border border-border"
                >
                  <img
                    src={industry.image}
                    alt={industry.name}
                    loading="lazy"
                    width={1280}
                    height={854}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/40 to-transparent" />
                  <p className="absolute bottom-4 left-4 right-4 font-display text-sm font-semibold text-foreground">
                    {industry.name}
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Business associates */}
      <section className="border-y border-border bg-navy-deep/60 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="Partnerships"
            title="Our Valued Business Associates"
            description="MIB values its professional business relationships and commercial connections with organizations operating in different industrial, engineering and manufacturing sectors."
          />
          <div className="mt-12 flex flex-wrap justify-center gap-3">
            {BUSINESS_ASSOCIATES.map((name, i) => (
              <Reveal key={name} delay={Math.min(i * 0.05, 0.4)}>
                <motion.div
                  whileHover={{ y: -3 }}
                  className="rounded-xl border border-border bg-card px-5 py-3 text-sm font-medium text-foreground/90"
                >
                  {name}
                </motion.div>
              </Reveal>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link to="/associates" className="text-sm font-semibold text-primary hover:underline">
              See our business relationship approach →
            </Link>
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading eyebrow="Why Choose Us" title="Why Choose MIB?" />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {WHY_CHOOSE_MIB.map((point, i) => (
              <Reveal key={point} delay={Math.min(i * 0.06, 0.4)}>
                <div className="flex h-full items-start gap-3 rounded-xl border border-border bg-card p-4">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  <p className="text-sm font-medium leading-relaxed text-foreground/90">
                    {point}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Commitment + CTA */}
      <section className="relative overflow-hidden border-t border-border bg-navy-deep py-20 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <Reveal>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Our Commitment
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              At M. Irfan Brothers, we are committed to delivering reliable steel and
              stainless-steel material solutions, maintaining professional business
              relationships and supporting the industrial and commercial requirements of
              our valued customers.
            </p>
            <p className="mt-6 font-display text-lg font-semibold text-gold-gradient">
              {COMPANY.tagline}
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-4">
              <Link
                to="/contact"
                className="rounded-lg bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-black/30 transition-transform hover:scale-[1.03]"
              >
                Get a Quote
              </Link>
              <a
                href={COMPANY.phoneHref}
                className="rounded-lg border border-border px-7 py-3 text-sm font-semibold text-foreground transition-colors hover:border-primary/50 hover:text-primary"
              >
                Call {COMPANY.phoneDisplay}
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
