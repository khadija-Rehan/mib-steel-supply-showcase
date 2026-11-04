import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { INDUSTRIES, INDUSTRIES_INTRO } from "@/data/industries";

export const Route = createFileRoute("/industries")({
  head: () => ({
    meta: [
      { title: "Industries We Serve | M. Irfan Brothers (MIB)" },
      {
        name: "description",
        content:
          "MIB supplies steel and stainless-steel materials to construction, engineering & manufacturing, food processing, industrial & fabrication and the solar energy sector across Pakistan.",
      },
      {
        property: "og:title",
        content: "Industries We Serve | M. Irfan Brothers (MIB)",
      },
      {
        property: "og:description",
        content:
          "Steel material solutions for construction, engineering, manufacturing, food processing, fabrication and solar energy.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: IndustriesPage,
});

function IndustriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Sectors"
        title="Industries We Serve"
        description={INDUSTRIES_INTRO}
      />

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl space-y-16 px-4 sm:px-6">
          {INDUSTRIES.map((industry, i) => (
            <Reveal key={industry.name}>
              <div
                className={`grid items-center gap-8 lg:grid-cols-2 ${
                  i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                <div className="group relative overflow-hidden rounded-2xl border border-border">
                  <img
                    src={industry.image}
                    alt={industry.name}
                    loading={i < 2 ? "eager" : "lazy"}
                    width={1280}
                    height={854}
                    className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/60 to-transparent" />
                </div>
                <div>
                  <span className="font-display text-sm font-bold text-primary">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                    {industry.name}
                  </h2>
                  <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
                    {industry.description}
                  </p>
                  <Link
                    to="/contact"
                    className="group mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary"
                  >
                    Enquire about materials for this sector
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
