import { createFileRoute } from "@tanstack/react-router";
import { Handshake, Link2 } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import {
  ASSOCIATES_APPROACH,
  ASSOCIATES_INTRO,
  BUSINESS_ASSOCIATES,
} from "@/data/company";

export const Route = createFileRoute("/associates")({
  head: () => ({
    meta: [
      { title: "Our Valued Business Associates | M. Irfan Brothers (MIB)" },
      {
        name: "description",
        content:
          "MIB's valued business associates across industrial, engineering and manufacturing sectors — built on mutual trust, professional coordination and long-term business development.",
      },
      {
        property: "og:title",
        content: "Our Valued Business Associates | M. Irfan Brothers (MIB)",
      },
      {
        property: "og:description",
        content:
          "Strengthening business connections and creating mutually beneficial opportunities across Pakistan.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AssociatesPage,
});

function AssociatesPage() {
  return (
    <>
      <PageHero
        eyebrow="Partnerships"
        title="Our Valued Business Associates"
        description={ASSOCIATES_INTRO}
      />

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {BUSINESS_ASSOCIATES.map((name, i) => (
              <Reveal key={name} delay={Math.min(i * 0.05, 0.4)}>
                <div className="group flex h-full items-center gap-4 rounded-2xl border border-border bg-card p-5 transition-all duration-500 hover:-translate-y-1 hover:border-primary/40">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-primary/30 bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Link2 className="h-5 w-5" />
                  </span>
                  <p className="font-display text-base font-semibold text-foreground">
                    {name}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2}>
            <div className="mt-14 rounded-2xl border border-primary/25 bg-card p-8">
              <div className="flex items-center gap-3">
                <Handshake className="h-6 w-6 text-primary" />
                <h2 className="font-display text-xl font-bold text-foreground">
                  Our Business Relationship Approach
                </h2>
              </div>
              <div className="mt-5 grid gap-4 lg:grid-cols-2">
                {ASSOCIATES_APPROACH.map((p) => (
                  <p key={p.slice(0, 40)} className="text-base leading-relaxed text-muted-foreground">
                    {p}
                  </p>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
