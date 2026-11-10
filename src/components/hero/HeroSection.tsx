import { Suspense, lazy } from "react";
import { ClientOnly } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";

const instant = { initial: { opacity: 1, y: 0 }, animate: { opacity: 1, y: 0 } };
const fadeOnly = (delay = 0) => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.3, delay },
});
import { ArrowRight, ShieldCheck } from "lucide-react";
import heroBackground from "@/assets/hero-industrial.jpg";
import { COMPANY } from "@/data/company";

const SteelScene = lazy(() => import("./SteelScene"));

export function HeroSection() {
  return (
    <section className="relative flex min-h-[90svh] items-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={heroBackground}
          alt="Steel coils stored in an industrial warehouse"
          className="h-full w-full object-cover"
          width={1920}
          height={1080}
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-deep via-navy-deep/90 to-navy-deep/35" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-navy-deep/25" />
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-5 px-4 pt-28 pb-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-2">
        <div className="max-w-2xl">
          <motion.p
            {...fadeOnly(0)}
            className="mb-7 inline-flex items-center gap-3 border-l-2 border-primary pl-4 text-xs font-semibold text-primary uppercase"
          >
            <ShieldCheck className="h-3.5 w-3.5" />
            {COMPANY.tagline}
          </motion.p>

          <motion.h1
            {...fadeOnly(0.05)}
            className="max-w-[14ch] text-5xl leading-[1.08] font-bold"
          >
            <span className="block text-foreground">Industrial Steel</span>
            <span className="block text-foreground">Supply.</span>
            <span className="mt-2 block text-gold-gradient">Forged in Trust.</span>
          </motion.h1>

          <motion.p
            {...fadeOnly(0.1)}
            className="mt-7 max-w-xl text-base leading-relaxed text-foreground/85 sm:text-lg"
          >
            M. Irfan Brothers delivers quality steel and stainless-steel materials
            for construction, engineering, manufacturing, fabrication, food
            processing and industrial applications.
          </motion.p>
          <motion.p
            {...fadeOnly(0.12)}
            className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            We are committed to quality products, competitive pricing,
            professional services and reliable business relationships.
          </motion.p>

          <motion.div
            {...fadeOnly(0.15)}
            className="mt-8 flex flex-wrap gap-3"
          >
            <Link
              to="/products"
              className="group inline-flex min-h-12 items-center gap-3 border border-primary bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-gold-soft"
            >
              Explore Our Products
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex min-h-12 items-center gap-2 border border-foreground/40 bg-background/35 px-6 py-3 text-sm font-semibold text-foreground backdrop-blur transition-colors hover:border-primary hover:text-primary"
            >
              Contact Our Team
            </Link>
          </motion.div>
        </div>

        {/* 3D metallic steel coil scene */}
        <motion.div
          {...fadeOnly(0.2)}
          className="relative hidden h-[400px] sm:block lg:h-[550px]"
        >
          <ClientOnly fallback={null}>
            <Suspense fallback={null}>
              <SteelScene />
            </Suspense>
          </ClientOnly>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        {...fadeOnly(0.5)}
        className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 sm:block"
        aria-hidden
      >
        <div className="h-10 w-6 rounded-full border border-border p-1">
          <motion.div
            className="mx-auto h-2 w-1 rounded-full bg-primary"
            animate={{ y: [0, 14, 0] }}
            transition={{ repeat: Infinity, duration: 1.8 }}
          />
        </div>
      </motion.div>
    </section>
  );
}
