import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { BadgeCheck, Quote } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import {
  ABOUT_PARAGRAPHS,
  BUSINESS_ACTIVITIES,
  BUSINESS_PHILOSOPHY,
  BUSINESS_STRENGTHS,
  CEO_MESSAGE,
  CEO_NAME,
  COMPANY,
  CORE_VALUES,
  MISSION,
  VISION,
  WHO_WE_ARE,
} from "@/data/company";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About M. Irfan Brothers | Steel Trading & Industrial Material Supply" },
      {
        name: "description",
        content:
          "About M. Irfan Brothers (MIB) — a Lahore-based steel trading and industrial material supply business. NTN 2873893-4, GST 0309730022791, Chamber Membership 62358-A.",
      },
      {
        property: "og:title",
        content: "About M. Irfan Brothers | Steel Trading & Industrial Material Supply",
      },
      {
        property: "og:description",
        content:
          "Comprehensive steel material solutions from Landa Bazar, Lahore — quality products, competitive pricing and reliable business relationships.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="About M. Irfan Brothers"
        description={ABOUT_PARAGRAPHS[0]}
      />

      {/* Full company description */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Reveal>
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                {ABOUT_PARAGRAPHS.slice(1, 4).map((p) => (
                  <p key={p.slice(0, 40)}>{p}</p>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="mt-8 grid gap-3 rounded-2xl border border-border bg-card p-6 sm:grid-cols-3">
                {COMPANY.registrations.map((reg) => (
                  <div key={reg.label} className="flex items-start gap-3">
                    <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <div>
                      <p className="text-xs tracking-wide text-muted-foreground uppercase">{reg.label}</p>
                      <p className="mt-0.5 font-display text-base font-semibold text-foreground">
                        {reg.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="mt-6 text-base leading-relaxed text-muted-foreground">
                {ABOUT_PARAGRAPHS[4]}
              </p>
            </Reveal>
          </div>

          {/* Who we are */}
          <Reveal delay={0.1}>
            <div className="glass-panel rounded-2xl p-6">
              <h3 className="font-display text-lg font-semibold text-primary">Who We Are</h3>
              <div className="mt-4 space-y-3.5 text-sm leading-relaxed text-muted-foreground">
                {WHO_WE_ARE.map((p) => (
                  <p key={p.slice(0, 40)}>{p}</p>
                ))}
              </div>
              <h3 className="mt-7 font-display text-lg font-semibold text-primary">
                Our Business Philosophy
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {BUSINESS_PHILOSOPHY}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Business activities */}
      <section className="border-y border-border bg-navy-deep/60 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="Business Profile"
            title="Our Business Activities"
            align="left"
          />
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {BUSINESS_ACTIVITIES.map((activity, i) => (
              <Reveal key={activity} delay={Math.min(i * 0.05, 0.35)}>
                <div className="flex h-full items-center gap-3 rounded-xl border border-border bg-card px-5 py-4">
                  <span className="font-display text-sm font-bold text-primary">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-sm font-medium text-foreground/90">{activity}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CEO message */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <SectionHeading eyebrow="Leadership" title="Message from Our CEO" />
          <Reveal delay={0.1}>
            <div className="relative mt-10 rounded-2xl border border-primary/25 bg-card p-8 sm:p-10">
              <Quote className="absolute -top-5 left-8 h-10 w-10 rounded-full bg-primary p-2 text-primary-foreground" />
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                {CEO_MESSAGE.map((p) => (
                  <p key={p.slice(0, 40)}>{p}</p>
                ))}
              </div>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="mt-8 border-t border-border pt-5"
              >
                <p className="font-display text-lg font-semibold text-foreground">{CEO_NAME}</p>
                <p className="text-sm text-muted-foreground">Chief Executive Officer, M. Irfan Brothers</p>
              </motion.div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="border-y border-border bg-navy-deep/60 py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-2xl border border-primary/25 bg-card p-8">
              <h3 className="font-display text-xl font-bold tracking-[0.2em] text-primary uppercase">
                Our Vision
              </h3>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">{VISION}</p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="h-full rounded-2xl border border-border bg-card p-8">
              <h3 className="font-display text-xl font-bold tracking-[0.2em] text-primary uppercase">
                Our Mission
              </h3>
              <div className="mt-4 space-y-3 text-base leading-relaxed text-muted-foreground">
                {MISSION.map((p) => (
                  <p key={p.slice(0, 40)}>{p}</p>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Core values */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading eyebrow="What Drives Us" title="Our Core Values" />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {CORE_VALUES.map((value, i) => (
              <Reveal key={value.title} delay={i * 0.08}>
                <div className="h-full rounded-2xl border border-border bg-card p-6 transition-all duration-500 hover:-translate-y-1 hover:border-primary/40">
                  <span className="font-display text-3xl font-bold text-primary/25">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 font-display text-lg font-semibold text-foreground">
                    {value.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                    {value.description}
                  </p>
                </div>
              </Reveal>
            ))}
            <Reveal delay={0.4}>
              <div className="glass-panel flex h-full flex-col justify-center rounded-2xl p-6">
                <p className="font-display text-lg font-semibold text-gold-gradient">
                  {COMPANY.tagline}
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Quality management & strengths */}
      <section className="border-t border-border bg-navy-deep/60 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="Quality Management"
            title="Business Strengths"
            description="Premium quality products, an extensive range and nationwide delivery arrangements."
          />
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {BUSINESS_STRENGTHS.map((strength, i) => (
              <Reveal key={strength.title} delay={i * 0.1}>
                <div className="h-full rounded-2xl border border-border bg-card p-7">
                  <h3 className="font-display text-lg font-semibold text-primary">
                    {strength.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {strength.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
