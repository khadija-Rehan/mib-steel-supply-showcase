import { Suspense, lazy } from "react";
import { ClientOnly } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck } from "lucide-react";
import heroBackground from "@/assets/hero-industrial.jpg";
import { COMPANY } from "@/data/company";

const SteelScene = lazy(() => import("./SteelScene"));

export function HeroSection() {
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden">
      {/* Industrial backdrop */}
      <div className="absolute inset-0">
        <img
          src={heroBackground}
          alt="Steel coils stored in an industrial warehouse"
          className="h-full w-full object-cover"
          width={1920}
          height={1080}
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-deep via-navy-deep/85 to-navy-deep/40" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-10 px-4 pt-28 pb-20 sm:px-6 lg:grid-cols-2">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold tracking-[0.25em] text-primary uppercase"
          >
            <ShieldCheck className="h-3.5 w-3.5" />
            {COMPANY.tagline}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl leading-tight font-bold tracking-tight sm:text-5xl lg:text-6xl"
          >
            <span className="text-foreground">Premium Steel Solutions.</span>{" "}
            <span className="text-gold-gradient">Built on Trust.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            M. Irfan Brothers delivers quality steel and stainless-steel materials
            for construction, engineering, manufacturing, fabrication, food
            processing and industrial applications.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.28 }}
            className="mt-3 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            We are committed to quality products, competitive pricing,
            professional services and reliable business relationships.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.38 }}
            className="mt-9 flex flex-wrap gap-4"
          >
            <Link
              to="/products"
              className="group inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-black/30 transition-transform hover:scale-[1.03]"
            >
              Explore Our Products
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-background/40 px-6 py-3 text-sm font-semibold text-foreground backdrop-blur transition-colors hover:border-primary/50 hover:text-primary"
            >
              Contact Our Team
            </Link>
          </motion.div>
        </div>

        {/* 3D metallic steel coil scene */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="relative hidden h-[420px] sm:block lg:h-[540px]"
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
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
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
